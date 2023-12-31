package org.ksmart.death.death.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.ksmart.death.common.Idgen.IdResponse;
import org.ksmart.death.common.model.Amount;
import org.ksmart.death.common.model.AuditDetails;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.config.BirthDeathConfiguration;
import org.ksmart.death.death.certmodel.DeathCertRequest;
import org.ksmart.death.death.certmodel.DeathCertificate;
import org.ksmart.death.utils.CommonUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.utils.BirthDeathConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.jayway.jsonpath.JsonPath;

@Service
public class EnrichmentServiceDeath {

	@Autowired
    CommonUtils commUtils;
	
	@Autowired
	IdGenRepository idGenRepository;
	
	@Autowired
	BirthDeathConfiguration config;
	
	@Autowired
	ServiceRequestRepository serviceRequestRepository;
	
    public void enrichCreateRequest(DeathCertRequest deathCertRequest) {
        RequestInfo requestInfo = deathCertRequest.getRequestInfo();
        String uuid = requestInfo.getUserInfo().getUuid();
        AuditDetails auditDetails = commUtils.getAuditDetails(uuid, true);
        DeathCertificate deathCert = deathCertRequest.getDeathCertificate();
        deathCert.setAuditDetails(auditDetails);
        deathCert.setId(UUID.randomUUID().toString());
    }

    private List<String> getIdList(RequestInfo requestInfo, String tenantId, String idKey,
                                   String idformat, int count) {
        List<IdResponse> idResponses = idGenRepository.getId(requestInfo, tenantId, idKey, idformat, count).getIdResponses();

        if (CollectionUtils.isEmpty(idResponses))
            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");

        return idResponses.stream()
                .map(IdResponse::getId).collect(Collectors.toList());
    }

    public void setIdgenIds(DeathCertRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        String tenantId = request.getDeathCertificate().getTenantId();
        DeathCertificate deathCert = request.getDeathCertificate();
        String applNo = getIdList(requestInfo, tenantId, config.getDeathApplNumberIdgenName(), config.getDeathApplNumberIdgenFormat(), 1).get(0);
        deathCert.setDeathCertificateNo(applNo);
    }

	public void setGLCode(DeathCertRequest request) {
		RequestInfo requestInfo = request.getRequestInfo();
		DeathCertificate deathCert = request.getDeathCertificate();
		String tenantId = deathCert.getTenantId();
		ModuleDetail glCodeRequest = getGLCodeRequest(); 
		List<ModuleDetail> moduleDetails = new LinkedList<>();
		moduleDetails.add(glCodeRequest);
		MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId)
				.build();
		MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
				.requestInfo(requestInfo).build();

		StringBuilder url = new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());

		Object result = serviceRequestRepository.fetchResult(url, mdmsCriteriaReq);
		String jsonPath = BirthDeathConstants.GL_CODE_JSONPATH_CODE.replace("{}",deathCert.getBusinessService());
		List<Map<String,Object>> jsonOutput =  JsonPath.read(result, jsonPath);
		if(!jsonOutput.isEmpty()) {
			Map<String,Object> glCodeObj = jsonOutput.get(0);
			deathCert.setAdditionalDetail(glCodeObj);
		}
	}

	private ModuleDetail getGLCodeRequest() {
		List<MasterDetail> masterDetails = new ArrayList<>();
		masterDetails.add(MasterDetail.builder().name(BirthDeathConstants.GL_CODE_MASTER).build());
		return ModuleDetail.builder().masterDetails(masterDetails)
				.moduleName(BirthDeathConstants.BILLING_SERVICE).build();
	}

	public void setDemandParams(DeathCertRequest deathCertRequest) {
		DeathCertificate deathCert = deathCertRequest.getDeathCertificate();
		deathCert.setBusinessService(BirthDeathConstants.DEATH_CERT);
		ArrayList<Amount> amounts = new ArrayList<>();
		Amount amount=new Amount();
		amount.setTaxHeadCode(BirthDeathConstants.DEATH_CERT_FEE);
		amount.setAmount(new BigDecimal(50));
		amounts.add(amount);
		deathCert.setAmount(amounts);
		deathCert.setCitizen(deathCertRequest.getRequestInfo().getUserInfo());
		deathCert.setTaxPeriodFrom(System.currentTimeMillis());
		deathCert.setTaxPeriodTo(System.currentTimeMillis()+86400000);
	}

}
