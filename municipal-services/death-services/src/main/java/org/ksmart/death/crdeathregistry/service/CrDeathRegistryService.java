package org.ksmart.death.crdeathregistry.service;

import java.util.List;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.crdeath.kafka.producer.CrDeathProducer;
import org.ksmart.death.crdeath.validators.CrDeathValidator;
import org.ksmart.death.crdeath.validators.MDMSValidator;
import org.ksmart.death.crdeathregistry.repository.CrDeathRegistryRepository;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryMdmsUtil;
import org.ksmart.death.crdeathregistry.validators.CrDeathRegistryValidator;
import org.ksmart.death.crdeathregistry.validators.RegistryMDMSValidator;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.ksmart.death.crdeathregistry.enrichment.CrDeathRegistryEnrichment;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathPdfResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on 28.11.2022
     */
 @Service
 
public class CrDeathRegistryService {

    private final CrDeathProducer producer;
    private final CrDeathRegistryConfiguration deathConfig;
    private final CrDeathRegistryEnrichment enrichmentService;
    private final CrDeathRegistryRepository repository;
    private final CrDeathRegistryMdmsUtil util;
    private final RegistryMDMSValidator mdmsValidator;
    private final CrDeathRegistryValidator validatorService;

    @Autowired
    CrDeathRegistryService(CrDeathProducer producer,CrDeathRegistryConfiguration deathConfig,
    CrDeathRegistryEnrichment enrichmentService ,CrDeathRegistryRepository repository ,
    CrDeathRegistryMdmsUtil util,RegistryMDMSValidator mdmsValidator,
    CrDeathRegistryValidator validatorService){
        this.producer = producer;
        this.deathConfig = deathConfig;
        this.enrichmentService = enrichmentService;
        this.repository=repository;
        this.util=util;
        this.mdmsValidator=mdmsValidator;
        this.validatorService=validatorService;
    }

    public List<CrDeathRegistryDtl> create(CrDeathRegistryRequest request) {
      // validate request
       // validatorService.validateCreate(request);
       // RAkhi S IKM validate mdms data       
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getTenantId());
 
      //  mdmsValidator.validateMDMSData(request,mdmsData);

        // enrich request
        enrichmentService.enrichCreate(request);
        //IDGen call
        //enrichmentService.setIdgenIds(request);    
        enrichmentService.setRegistrationNumberDetails(request); 
        //Rakhi S on 23.01.2023
        enrichmentService.setCertificateNumberDetails(request);

        producer.push(deathConfig.getSaveDeathRegistryTopic(), request);

        return request.getDeathCertificateDtls();
    }
      //UPDATE BEGIN Jasmine
      public List<CrDeathRegistryDtl> update(CrDeathRegistryRequest request) {
      
        //Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getTenantId());
          
        //Jasmine on 21.01.2023
       String regNo = request.getDeathCertificateDtls().get(0).getRegistrationNo();

       String tenantId = request.getDeathCertificateDtls().get(0).getTenantId();

       // System.out.println("RegNo"+regNo);

        List<CrDeathRegistryDtl> searchResult = repository.getDeathApplication(CrDeathRegistryCriteria
                                                                              .builder()
                                                                              .tenantId(tenantId)
                                                                              .registrationNo(regNo)
                                                                              .build());

       //System.out.println("RegistryUpdate-Searchresult "+searchResult);
        
        validatorService.validateUpdate(request, searchResult);

       // mdmsValidator.validateMDMSData(request,mdmsData);

        enrichmentService.enrichUpdate(request);

        producer.push(deathConfig.getUpdateDeathRegistryTopic(), request);

        return request.getDeathCertificateDtls();
      }
    //Search  
     public List<CrDeathRegistryDtl> search(CrDeathRegistryCriteria criteria, RequestInfo requestInfo) {
	      // validatorService.validateSearch(requestInfo, criteria);
		    return repository.getDeathApplication(criteria);
     }
     
     //Certificate download Rakhi S IKM on 15.12.2022
     public DeathCertificate download(CrDeathRegistryCriteria criteria, RequestInfo requestInfo) {
      try{
          DeathCertificate deathCertificate = new DeathCertificate();
          deathCertificate.setSource(criteria.getSource().toString());
          deathCertificate.setDeathDtlId(criteria.getId());
          deathCertificate.setTenantId(criteria.getTenantId());
          DeathCertRequest deathCertRequest = DeathCertRequest.builder().deathCertificate(deathCertificate).requestInfo(requestInfo).build();
          List<CrDeathRegistryDtl> deathDtls = repository.getDeathApplication(criteria);     

        DeathPdfApplicationRequest applicationRequest = DeathPdfApplicationRequest.builder().requestInfo(requestInfo).deathCertificate(deathDtls).build();
        if(applicationRequest.getDeathCertificate().get(0).getCertificateDate()!=0){
          // applicationRequest.getDeathCertificate().get(0).setDateofissue(applicationRequest.getDeathCertificate().get(0).getCertificateDate());
        }
        else{
          Long currentTime = Long.valueOf(System.currentTimeMillis());
          applicationRequest.getDeathCertificate().get(0).setCertificateDate(currentTime);          
        }
        DeathPdfResp pdfResp = repository.saveDeathCertPdf(applicationRequest);
        //Rakhi S on 19.12.2022
        deathCertificate.setEmbeddedUrl(applicationRequest.getDeathCertificate().get(0).getEmbeddedUrl());
        deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getDateofissue());
        deathCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
        deathCertificate.setApplicationStatus(DeathCertificate.StatusEnum.FREE_DOWNLOAD);
        //Rakhi S on 21.12.2022        
        deathCertificate.setAckNo(applicationRequest.getDeathCertificate().get(0).getDeathACKNo());
        deathCertificate.setAuditDetails(applicationRequest.getDeathCertificate().get(0).getAuditDetails());
        deathCertificate.setCounter(1);
        deathCertificate.setDeathcertificateno(applicationRequest.getDeathCertificate().get(0).getCertificateNo());
        if(applicationRequest.getDeathCertificate().get(0).getCertificateDate()!=0){
             deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getCertificateDate());
        }
        else
        {
          Long currentTime = Long.valueOf(System.currentTimeMillis());
          deathCertificate.setDateofissue(currentTime);
        }
        List<DeathCertificate> deathCertSearch = repository.searchCertificate(applicationRequest.getDeathCertificate().get(0).getId());
        
        if (null != deathCertSearch && !deathCertSearch.isEmpty()){
          repository.updateCertificate(deathCertRequest);
        }
        else{
          deathCertificate.setId(UUID.randomUUID().toString());
          repository.save(deathCertRequest);
        }
        return deathCertificate;
      }
		  catch(Exception e) {
          e.printStackTrace();
          throw new CustomException("DOWNLOAD_ERROR","Error in Downloading Certificate");
		}
     }

     //Rakhi S IKM on 18.01.2022
     public List<DeathCertificate> searchCertificate(CrDeathRegistryCriteria criteria) {      
      List<CrDeathRegistryDtl> obj = repository.getDeathApplication(criteria);     
      return repository.searchCertificate(obj.get(0).getId());
    }
    
}
