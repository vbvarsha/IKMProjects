package org.ksmart.death.crdeath.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Component
public class CrDeathConfiguration {

    //Persister Config
    @Value("${persister.save.crdeath.topic}")
    private String saveDeathDetailsTopic;


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

    //UPDATE     

    @Value("${persister.update.crdeath.topic}")
    private String updateDeathDetailsTopic;

    //Rakhi S on 24.12.2022 
    @Value("${egov.state.level.tenant.id}")
    private String egovStateLevelTenant;

    //Jasmine 07.01.2023

    @Value("${citizen.allowed.search.params}")
    private String allowedCitizenSearchParams;

    @Value("${employee.allowed.search.params}")
    private String allowedEmployeeSearchParams;

    public String getWfHost() {
        return null;
    }

    public String getWfTransitionPath() {
        return null;
    }

}
