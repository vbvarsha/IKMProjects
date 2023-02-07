package org.ksmart.death.deathapplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.enrichment.DeathEnrichment;
import org.ksmart.death.deathapplication.kafka.producer.DeathProducer;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.validators.DeathApplnValidator;
import org.ksmart.death.deathapplication.validators.MDMSValidator;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.workflow.WorkflowIntegrator;
import org.egov.common.contract.request.RequestInfo;

/**
     * Creates DeathService
     * Jasmine on 06.02.2023
     * 
     */

@Service
public class DeathApplnService {

   //  private final DeathProducer producer;
   //  private final DeathConfiguration deathConfig;
   //  private final DeathEnrichment enrichmentService;
   //  private final DeathMdmsUtil util;
   //  private final WorkflowIntegrator workflowIntegrator;
   //  private final MDMSValidator mdmsValidator;
  //   private final DeathApplnValidator validatorService;
     private final DeathApplnRepository repository;

     @Autowired
     DeathApplnService(DeathApplnRepository repository){
          
     // DeathProducer producer,DeathConfiguration deathConfig,
     //             DeathEnrichment enrichmentService,DeathMdmsUtil util,MDMSValidator mdmsValidator,
     //             DeathApplnValidator validatorService,,WorkflowIntegrator workflowIntegrator){
       //  this.producer = producer;
        // this.deathConfig = deathConfig;
      //   this.workflowIntegrator = workflowIntegrator;
       //  this.enrichmentService = enrichmentService;
       //  this.util = util;
       //  this.mdmsValidator = mdmsValidator;
       //  this.validatorService = validatorService;
         this.repository = repository;
     }

     //RAkhi S ikm  on 06.02.2023
     public List<DeathDtl> create(DeathDtlRequest request) {
          return request.getDeathCertificateDtls();
     }

    //Jasmine 06.02.2023
    public List<DeathDtl> search(DeathSearchCriteria criteria, RequestInfo requestInfo) {
     return repository.getDeathApplication(criteria);
     }
    
}
