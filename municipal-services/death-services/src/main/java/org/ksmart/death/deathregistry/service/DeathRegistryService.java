package org.ksmart.death.deathregistry.service;

import java.util.List;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.enrichment.DeathRegistryEnrichment;
import org.ksmart.death.deathregistry.kafka.producer.DeathRegistryProducer;
import org.ksmart.death.deathregistry.repository.DeathRegistryRepository;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
     * Creates CrDeathService
     * Jasmine IKM
     * on 07.02.2023
     * DeathRegistryService create Rakhi S on 09.02.2023
     */
 @Service
 
public class DeathRegistryService {

     private final DeathRegistryProducer producer;
     private final DeathRegistryConfiguration deathConfig;
     private final DeathRegistryRepository repository;
     private final DeathRegistryEnrichment enrichmentService;
   
    // private final CrDeathRegistryMdmsUtil util;
    // private final RegistryMDMSValidator mdmsValidator;
    // private final CrDeathRegistryValidator validatorService;

    @Autowired
    DeathRegistryService(DeathRegistryProducer producer,DeathRegistryConfiguration deathConfig 
                                        ,DeathRegistryRepository repository,
                                        DeathRegistryEnrichment enrichmentService ){
    //  ,,
    // CrDeathRegistryMdmsUtil util,RegistryMDMSValidator mdmsValidator,
    // CrDeathRegistryValidator validatorService){
         this.producer = producer;
         this.deathConfig = deathConfig;
         this.repository=repository;
         this.enrichmentService = enrichmentService;
    
    //     this.util=util;
    //     this.mdmsValidator=mdmsValidator;
    //     this.validatorService=validatorService;
    }
    //Rakhi S ikm on 09.02.2023
    public List<DeathRegistryDtl> create(DeathRegistryRequest request) {
      // RAkhi S IKM validate mdms data       
     //  Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getTenantId());
     //  mdmsValidator.validateMDMSData(request,mdmsData);

       // enrich request
       enrichmentService.enrichCreate(request);
       //IDGen call
       //enrichmentService.setIdgenIds(request);  
       //Rakhi S on 10.02.2023  
       enrichmentService.setRegistrationNumberDetails(request); 
       enrichmentService.setCertificateNumberDetails(request);
       producer.push(deathConfig.getSaveDeathRegistryDetailsTopic(), request);
       return request.getDeathCertificateDtls();
   }

      //UPDATE BEGIN Jasmine 7.03.2023
      public List<DeathRegistryDtl> update(DeathRegistryRequest request) {

       String regNo = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getRegistrationNo();

       String tenantId = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId();

        // List<DeathRegistryDtl> searchResult = repository.getDeathApplication(DeathRegistryCriteria
        //                                                                       .builder()
        //                                                                       .tenantId(tenantId)
        //                                                                       .registrationNo(regNo)
        //                                                                       .build());

        producer.push(deathConfig.getUpdateDeathRegistryTopic(), request);

        return request.getDeathCertificateDtls();
      }
    //Search  Jasmine 08.03.2023
     public List<DeathRegistryDtl> search(DeathRegistryCriteria criteria, RequestInfo requestInfo) {

		    return repository.getDeathApplication(criteria);
     }
 //Certificate download Rakhi S IKM on 10.02.2023
 public DeathCertificate download(DeathRegistryCriteria criteria, RequestInfo requestInfo) {
    try{
        DeathCertificate deathCertificate = new DeathCertificate();
        deathCertificate.setSource(criteria.getSource().toString());
        deathCertificate.setDeathDtlId(criteria.getId());
        deathCertificate.setTenantId(criteria.getTenantId());
        DeathCertRequest deathCertRequest = DeathCertRequest.builder().deathCertificate(deathCertificate).requestInfo(requestInfo).build();
        List<DeathRegistryDtl> deathDtls = repository.getDeathApplication(criteria);     

        DeathPdfApplicationRequest applicationRequest = DeathPdfApplicationRequest.builder().requestInfo(requestInfo).deathCertificate(deathDtls).build();
        if(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateDate()!=0){
          
        }
        else{
          Long currentTime = Long.valueOf(System.currentTimeMillis());
          applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().setCertificateDate(currentTime);          
        }       
        DeathPdfResp pdfResp = repository.saveDeathCertPdf(applicationRequest);
        deathCertificate.setEmbeddedUrl(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getEmbeddedUrl());
        deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getDateofissue());
        deathCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
        deathCertificate.setApplicationStatus(DeathCertificate.StatusEnum.FREE_DOWNLOAD);  
        deathCertificate.setAckNo(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getDeathACKNo());
        deathCertificate.setAuditDetails(applicationRequest.getDeathCertificate().get(0).getDeathAuditDetails());
        deathCertificate.setCounter(1);
        deathCertificate.setDeathcertificateno(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateNo());
        if(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateDate()!=0){
            deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateDate());
        }
        else
        {
          Long currentTime = Long.valueOf(System.currentTimeMillis());
          deathCertificate.setDateofissue(currentTime);
        }
        // List<DeathCertificate> deathCertSearch = repository.searchCertificate(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getId());
        
        // if (null != deathCertSearch && !deathCertSearch.isEmpty()){
        //   repository.updateCertificate(deathCertRequest);
        // }
        // else{
        //   deathCertificate.setId(UUID.randomUUID().toString());
        //   repository.save(deathCertRequest);
        // }
        return deathCertificate;
      }
      catch(Exception e) {
          e.printStackTrace();
          throw new CustomException("DOWNLOAD_ERROR","Error in Downloading Certificate");
    }
 }
    
}
