package org.ksmart.death.deathapplication.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.ksmart.death.deathapplication.repository.querybuilder.DeathApplnQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathApplnRowMapper;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
     * Creates repository
     * Jasmine 
     * on 06/02/2023
     */
@Repository
public class DeathApplnRepository {

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    
    private final JdbcTemplate jdbcTemplate;
    private final DeathApplnQueryBuilder queryBuilder;
    private final DeathApplnRowMapper rowMapper;

    @Autowired
    DeathApplnRepository(JdbcTemplate jdbcTemplate, DeathApplnQueryBuilder queryBuilder,
                        DeathApplnRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }
     //Jasmine on 07.02.2023
    public List<DeathDtl> getDeathApplication(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);

        List<DeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {

                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();
                //deathBasicDtls.setDeceasedAadharNumber(encryptionDecryptionUtil.decryptObject(deathBasicDtls.getDeceasedAadharNumber(), "BndDetail", DeathBasicInfo.class,requestInfo));
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());
                DeathFamilyInfo deathFamilyDtls =deathDtl.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyDcr = encryptionDecryptionUtil.decryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class,requestInfo);
                deathFamilyDtls.setFatherAadharNo(deathFamilyDcr.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyDcr.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyDcr.getSpouseAadhaar()); 
    
              System.out.println("deathBasicDcr"+dec);

			});
        }
        return result; 
    }
     //Rakhi S on 08.02.2023
     public List<Map<String, Object>>  getDeathACKDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathAckNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> ackDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return ackDetails; 
     }
    
}
