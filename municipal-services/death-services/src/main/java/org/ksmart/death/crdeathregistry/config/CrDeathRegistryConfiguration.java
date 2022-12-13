package org.ksmart.death.crdeathregistry.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Component
public class CrDeathRegistryConfiguration {
   
      //Persister Config
    @Value("${persister.save.crdeathregistry.topic}")
    private String saveDeathRegistryTopic;

    @Value("${persister.update.crdeathregistry.topic}")
    private String updateDeathRegistryTopic;

    
    //MDMS
    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsEndPoint;

    //IDGen

    @Value("${egov.idgen.host}")
    private String idGenHost;

    @Value("${egov.idgen.path}")
    private String idGenPath;

    
    @Value("${egov.idgen.deathapplfilecode.name}")
    private String deathApplnFileCodeName;

    @Value("${egov.idgen.deathapplfilecode.format}")
    private String deathApplnFileCodeFormat;


    @Value("${egov.idgen.deathackno.name}")
    private String deathAckName;

    @Value("${egov.idgen.deathackno.format}")
    private String deathACKFormat;



}
