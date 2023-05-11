package org.ksmart.marriage.common.services;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
 
import org.egov.tracer.model.CustomException;
import org.json.JSONObject;
import org.ksmart.marriage.common.calculation.collections.models.PaymentDetail;
import org.ksmart.marriage.common.calculation.collections.models.PaymentRequest;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
//import org.ksmart.marriage.utils.BirthUtils;
//import org.ksmart.marriage.web.model.SearchCriteria;
//import org.ksmart.marriage.web.model.newbirth.NewBirthApplication;
//import org.ksmart.marriage.web.model.newbirth.NewBirthDetailRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;

import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// import static org.ksmart.marriage.utils.MarriageConstants;
@Service
@Slf4j
public class PaymentUpdateService {

	private MarriageApplicationService marriageService;
	
	private MarriageApplicationConfiguration config;

    private MarriageApplicationSearchCriteria searchCriteria;
	
	private WorkflowIntegrator wfIntegrator;
	
	private MarriageDetailsEnrichment enrichmentService;

//	@Autowired
//	private objectMapper mapper;
	
	//private BirthUtils util;
	
	public PaymentUpdateService(MarriageApplicationService marriageService,MarriageApplicationConfiguration config, 
					            WorkflowIntegrator wfIntegrator,MarriageDetailsEnrichment enrichmentService)
			//BirthUtils util, NewBirthRepository repository,) 
			{
				this.marriageService=marriageService;
				this.config=config;
				this.wfIntegrator=wfIntegrator;
				this.enrichmentService= enrichmentService;		
	}
	
	final String tenantId = "tenantId";

	final String businessService = "businessService";

	final String consumerCode = "consumerCode";
	
	
	/**
	 * Process the message from kafka and updates the status to paid
	 * 
	 * @param record The incoming message from receipt create consumer
	 */
	public void process(HashMap<String, Object> record) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			PaymentRequest paymentRequest = mapper.convertValue(record, PaymentRequest.class);
			RequestInfo requestInfo = paymentRequest.getRequestInfo();
			
			List<PaymentDetail> paymentDetails = paymentRequest.getPayment().getPaymentDetails();
			String tenantId = paymentRequest.getPayment().getTenantId();
			for (PaymentDetail paymentDetail : paymentDetails) {
			MarriageApplicationSearchCriteria searchCriteria = new MarriageApplicationSearchCriteria();
			searchCriteria.setTenantId(tenantId);
			 
			searchCriteria.setApplicationNo(paymentDetail.getBill().getConsumerCode());
			searchCriteria.setBusinessService(paymentDetail.getBusinessService());
//			System.out.println(" payment detail tenantId:"+tenantId);
//			System.out.println(" payment detail tenantId:"+paymentDetail.getBill().getConsumerCode());
//			System.out.println(" payment detail tenantId:"+paymentDetail.getBusinessService());
			List<MarriageApplicationDetails> marriage = marriageService.searchMarriageDetails(searchCriteria,requestInfo);
			if(null!=marriage && marriage.size()==1){
				System.out.println("Search application size>1...................>");
				if(marriage.get(0).getStatus().equals(MarriageConstants.STATUS_FOR_PAYMENT)){
					System.out.println("Inside status -PAY...................>");
					marriage.get(0).setAction(MarriageConstants.ACTION_PAY);
				}
			}
			MarriageDetailsRequest updateRequest = MarriageDetailsRequest.builder().requestInfo(requestInfo)
												   .marriageDetails(marriage).build();
			//System.out.println(" payment detail updateRequest:"+updateRequest);
			wfIntegrator.callWorkFlow(updateRequest);
			}
			

		} catch (Exception e) {
			log.error("KAFKA_PROCESS_ERROR", e);
		}

	}

}
