package org.ksmart.death.crdeath.validators;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.crdeath.util.CrDeathConstants;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;
    
    /**
     * Creates MDMSValidator 
     * Rakhi S IKM
     * on 26.11.2022
     */
@Component
@Slf4j
public class MDMSValidator {
    

    public void validateMDMSData(CrDeathDtlRequest request,Object mdmsdata){
        Map<String,String> errorMap = new HashMap<>();
        Map<String,List<String>> masterData = getAttributeValues(mdmsdata);
        
        String[] masterArray = {CrDeathConstants.TENANTS,CrDeathConstants.GENDERTYPE
                            ,CrDeathConstants.DEATH_PLACE_LIST,CrDeathConstants.DEATH_CAUSE_MAIN
                            ,CrDeathConstants.DEATH_CAUSE_SUB};
        validateIfMasterPresent(masterArray,masterData);

        if(!masterData.get(CrDeathConstants.TENANTS)
                .contains(request.getDeathCertificateDtls().get(0).getTenantId()))
        errorMap.put("INVALID TENAND ID", "The tenand id  "+ request.getDeathCertificateDtls().get(0).getTenantId() +
                    " does not exists");

        if(request.getDeathCertificateDtls().get(0).getDeceasedGender() != null) {   
            if(!masterData.get(CrDeathConstants.GENDERTYPE)
                    .contains(request.getDeathCertificateDtls().get(0).getDeceasedGender()))
            errorMap.put("INVALID GENDER TYPE", "The gender of the deceased " +
                        request.getDeathCertificateDtls().get(0).getDeceasedGender()+ " is invalid");     
        }  

        if(!masterData.get(CrDeathConstants.DEATH_PLACE_LIST)
                        .contains(request.getDeathCertificateDtls().get(0).getDeathPlace()))
            errorMap.put("DEATH PLACE DETAILS INVALID", "The deceased death place details " +
                            request.getDeathCertificateDtls().get(0).getDeathPlace()+ " is invalid");
        //RAkhi S on 07.12.2022
        if(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseMain() != null) {        
            if(!masterData.get(CrDeathConstants.DEATH_CAUSE_MAIN)
                            .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseMain()))
                errorMap.put("DEATH CAUSE MAIN INVALID", "The deceased death cause main details " +
                                request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseMain()+ " is invalid");
        }
        if(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseSub() != null) {    
            if(!masterData.get(CrDeathConstants.DEATH_CAUSE_SUB)
                                .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseSub()))
                    errorMap.put("DEATH CAUSE SUB INVALID", "The deceased death cause sub details " +
                                    request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseSub()+ " is invalid");
        }
        if(request.getDeathCertificateDtls().get(0).getAgeUnit() != null) {   
            if(!masterData.get(CrDeathConstants.AGE_UNIT)
                                        .contains(request.getDeathCertificateDtls().get(0).getAgeUnit()))
                            errorMap.put("AGE UNIT INVALID", "The deceased age unit details " +
                request.getDeathCertificateDtls().get(0).getAgeUnit()+ " is invalid");
        }

        if(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getMedicalAttentionType() != null) {
            if(!masterData.get(CrDeathConstants.MEDICAL_ATTENTION_TYPE)
                                    .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getMedicalAttentionType()))
                        errorMap.put("MEDICAL ATTENTION TYPE INVALID", "The deceased medical attention  details " +
                request.getDeathCertificateDtls().get(0).getStatisticalInfo().getMedicalAttentionType()+ " is invalid");
        }
        if(!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }

    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathConstants.TENANT_JSONPATH, 
                                    CrDeathConstants.COMMON_MASTER_JSONPATH,
                                    CrDeathConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                                CrDeathConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    private void validateIfMasterPresent(String[] masterNames, Map<String, List<String>> codes){
        // System.out.println("codescheck"+codes);
        Map<String,String> errorMap = new HashMap<>();
        for(String masterName : masterNames){
            // System.out.println("masterName"+masterName);
            // System.out.println("codesfound1"+codes.containsKey(masterName));
            // if(CollectionUtils.isEmpty(codes.get(masterName))){
                if(!codes.containsKey(masterName)){
                errorMap.put("MDMS DATA ERROR ","Unable to fetch "+ masterName + " codes from MDMS ");
            }
        }
        if(!errorMap.isEmpty())
            throw new CustomException(errorMap);
    }
    
   
}
