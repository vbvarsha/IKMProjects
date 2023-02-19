package org.ksmart.death.deathapplication.enrichment;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.util.IDGenerator;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

/**
     * Creates DeathEnrichment for UUID ,Audit details and IDGeneration
     * Rakhi S IKM
     * on 08.02.2023
     */
@Slf4j
@Component
public class DeathEnrichment implements BaseEnrichment{
    //Jasmine 16.02.2023
    private IDGenerator idGenerator;

    //Rakhi S on 08.02.2023
    @Autowired
	ServiceRequestRepository serviceRequestRepository;

    @Autowired
    DeathApplnRepository repository;

    @Autowired
    DeathMdmsUtil util;
    //Jasmine 8.02.2023
    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;
    
    @Autowired
    public DeathEnrichment( IDGenerator idGenerator) {

        this.idGenerator = idGenerator;
    }

    //Rakhi S on 08.02.2023
    public void enrichCreate(DeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);                
                //Rakhi S on 09.02.2023 //Validation Jasmine 11.02.2023
                DeathAddressInfo  addressinfo = deathdtls.getDeathAddressInfo();
                if (addressinfo!=null){
                    addressinfo.setPresentAddrId(UUID.randomUUID().toString());
                    addressinfo.setPermanentAddrId(UUID.randomUUID().toString());
                }
                DeathStatisticalInfo  statisticalInfo = deathdtls.getDeathStatisticalInfo();
                if (statisticalInfo!=null){
                    statisticalInfo.setStatisticalId(UUID.randomUUID().toString()); 
                } 
                //Jasmine informant and initiator 11.02.2023
                // DeathInformantDtls  informantInfo = deathdtls.getDeathInformantDtls();
                // if (informantInfo!=null){
                //     informantInfo.setInformantAddrId(UUID.randomUUID().toString());  
                // }
                // DeathInitiatorDtls  initiatorInfo = deathdtls.getDeathInitiatorDtls();
                // if (initiatorInfo!=null){
                //     initiatorInfo.setInitiatorAddrId(UUID.randomUUID().toString());  
                // }                  
                //Encryption Jasmine 10.02.2023
                // request.getDeathCertificateDtls().get(0)
                DeathBasicInfo deathBasicDtls =deathdtls.getDeathBasicInfo();
                DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                DeathFamilyInfo deathFamilyDtls =deathdtls.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
            });
        }  
    //Rakhi S on 08.02.2023 ACK no formating
    public void setACKNumber(DeathDtlRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR) ;
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = requestInfo.getUserInfo().getTenantId();
        List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);

        request.getDeathCertificateDtls()
        .forEach(deathdtls -> {    
            // String ackNo=null;
            // Long ackNoId=null;
            // //Rakhi S on 08.02.2023 mdms call for tenand idgencode and lbtypecode
            // Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
            //                     , request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

            // Map<String,List<String>> masterData = getAttributeValues(mdmsData);

            // String idgenCode = masterData.get(DeathConstants.TENANTS).toString();
            // idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

            // Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
            //                 , request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

            // Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

            // String lbType = masterDataLBType.get(DeathConstants.TENANTS).toString();
            // lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

            // String lbTypeCode = "";

            // if(lbType.equals(DeathConstants.LB_TYPE_CORPORATION.toString())){
            //     lbTypeCode=DeathConstants.LB_TYPE_CORPORATION_CAPTION.toString();
            // }
            // else if(lbType.equals(DeathConstants.LB_TYPE_MUNICIPALITY.toString())){
            //     lbTypeCode=DeathConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
            // }
            // //end
            // System.out.println("ackNo"+ackNoDetails);
            // if (ackNoDetails.size()>=1) {
            //     //Ackno new format decision by Domain team created by Rakhi S                       
            //     ackNo=String.valueOf(DeathConstants.ACK_NUMBER_CAPTION+"-"+ackNoDetails.get(0).get("ackno"))+"-"+String.valueOf(Year)+"-"+deathdtls.getDeathBasicInfo().getFuncionUID()+"-"+lbTypeCode+"-"+idgenCode+"-"+DeathConstants.STATE_CODE.toString();
            //     ackNoId=Long.parseLong(String.valueOf(ackNoDetails.get(0).get("ackno")));
            // }
            // else{
            //     ackNo=DeathConstants.ACK_NUMBER_CAPTION+"-"+DeathConstants.ACK_NUMBER_FIRST+"-"+String.valueOf(Year)+"-"+deathdtls.getDeathBasicInfo().getFuncionUID()+"-"+lbTypeCode+"-"+idgenCode+"-"+DeathConstants.STATE_CODE.toString();
            //     ackNoId=Long.parseLong(DeathConstants.ACK_NUMBER_FIRST);
            // }
            //Jasmine 16/02/2023
            String IDGenerated = null;
                IDGenerated = idGenerator.setIDGenerator(request, DeathConstants.FUN_MODULE_NEWAPPLN,
                                DeathConstants.ACK_NUMBER_CAPTION);
            Long ackNoId=null;
            String inputString = IDGenerated; 
            String[] ackNoIdArray= inputString.split("-");
            for (int i=0; i < 1; i++){
                ackNoId=Long.parseLong(ackNoIdArray[1]);
            }
                deathdtls.getDeathBasicInfo().setDeathACKNo(IDGenerated);
                deathdtls.getDeathBasicInfo().setAckNoID(ackNoId);
                deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);
        });

    }
    //Rakhi S ikm on 08.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                    DeathConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
        //UPDATE  BEGIN Jasmine 8.02.2023
        public void enrichUpdate(DeathDtlRequest request) {

            RequestInfo requestInfo = request.getRequestInfo();
            User userInfo = requestInfo.getUserInfo();
            AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
//Jasmine Encryption 10.02.2023
             request.getDeathCertificateDtls()
                     .forEach(deathDtls -> {
                        DeathBasicInfo deathBasicDtls = deathDtls.getDeathBasicInfo();
                        DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                        deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                        DeathFamilyInfo deathFamilyDtls =deathDtls.getDeathFamilyInfo() ;
                        DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                        deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                        deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                        deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
                        deathDtls.setDeathAuditDetails(auditDetails);
                    } );        
        }//UPDATE END

//Rakhi S on 16.02.2023
        public void setPresentAddress(DeathDtlRequest request) {
            request.getDeathCertificateDtls()
                    .forEach(death -> {
                    if (death.getDeathAddressInfo() != null) {

                     if (death.getDeathAddressInfo().getPresentaddressCountry() != null && death.getDeathAddressInfo().getPresentaddressStateName() != null) {
                        if (death.getDeathAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(death.getDeathAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());    
                                death.getDeathAddressInfo().setPresentAddrStateId(death.getDeathAddressInfo().getPresentaddressStateName());    
                                death.getDeathAddressInfo().setPresentAddrDistrictId(death.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                death.getDeathAddressInfo().setPresentAddrVillageId(death.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                death.getDeathAddressInfo().setPresentAddrWardId(death.getDeathAddressInfo().getPresentWardNo());
                                death.getDeathAddressInfo().setPresentAddrPostofficeId(death.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                                death.getDeathAddressInfo().setPresentAddrPincode(death.getDeathAddressInfo().getPresentInsideKeralaPincode());
                                death.getDeathAddressInfo().setPresentAddrLocalityEn(death.getDeathAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                death.getDeathAddressInfo().setPresentAddrLocalityMl(death.getDeathAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentInsideKeralaStreetNameEn());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentInsideKeralaStreetNameMl());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentInsideKeralaHouseNameEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentInsideKeralaHouseNameMl());
                            } else{

                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());
                                death.getDeathAddressInfo().setPresentAddrStateId(death.getDeathAddressInfo().getPresentaddressStateName());    
                                death.getDeathAddressInfo().setPresentAddrDistrictId(death.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                death.getDeathAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                death.getDeathAddressInfo().setPresentAddrTownOrVillage(death.getDeathAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                death.getDeathAddressInfo().setPresentAddrPincode(death.getDeathAddressInfo().getPresentOutsideKeralaPincode());
                                death.getDeathAddressInfo().setPresentAddrLocalityEn(death.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                death.getDeathAddressInfo().setPresentAddrLocalityMl(death.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentOutsideKeralaHouseNameMl());
                               
                            }
                        } else{

                            if (death.getDeathAddressInfo().getPresentOutSideCountry() != null) {
                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentOutSideCountry());
                                death.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(death.getDeathAddressInfo().getPresentOutSideIndiaProvinceEn());
                                death.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(death.getDeathAddressInfo().getPresentOutSideIndiaProvinceMl());
                                death.getDeathAddressInfo().setPresentAddrTownOrVillage(death.getDeathAddressInfo().getPresentOutSideIndiaadrsVillage());
                                death.getDeathAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentOutSideIndiaAdressEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentOutSideIndiaAdressMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentOutSideIndiaAdressEnB());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentOutSideIndiaAdressMlB()); 
                            }
                        }
                    }
                }
             });
        }
        //Rakhi S on 16.02.2023
        public void setPermanentAddress(DeathDtlRequest request) {
            request.getDeathCertificateDtls()
                    .forEach(death -> {
                    if (death.getDeathAddressInfo() != null) {
                        death.getDeathAddressInfo().setIsPrsentAddressInt(death.getDeathAddressInfo().getIsPrsentAddress() == true ? 1 : 0);

                        if(death.getDeathAddressInfo().getIsPrsentAddress()){
                            death.getDeathAddressInfo().setPermtaddressCountry(death.getDeathAddressInfo().getPresentaddressCountry());
                            death.getDeathAddressInfo().setPermtaddressStateName(death.getDeathAddressInfo().getPresentaddressStateName());                            
                        }
                        if (death.getDeathAddressInfo().getPermtaddressCountry() != null && death.getDeathAddressInfo().getPermtaddressStateName() != null) {

                            if (death.getDeathAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                                if (death.getDeathAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
                                    death.getDeathAddressInfo().setPermanentAddrStateId(death.getDeathAddressInfo().getPermtaddressStateName());
                                    death.getDeathAddressInfo().setPermanentAddrDistrictId(death.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                    death.getDeathAddressInfo().setPermanentAddrVillageId(death.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                    death.getDeathAddressInfo().setPermanentAddrTalukId(death.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityEn(death.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityMl(death.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrPincode(death.getDeathAddressInfo().getPermntInKeralaAdrPincode());
                                }else{
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
                                    death.getDeathAddressInfo().setPermanentAddrStateId(death.getDeathAddressInfo().getPermtaddressStateName());
                                    death.getDeathAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                    death.getDeathAddressInfo().setPermanentAddrTownOrVillage(death.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                    death.getDeathAddressInfo().setPermanentAddrDistrictId(death.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                    death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPermntOutsideKeralaTaluk());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityEn(death.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityMl(death.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrPincode(death.getDeathAddressInfo().getPermntOutsideKeralaPincode());
                                }
        
                            } else{
                                if (death.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null) {
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                    death.getDeathAddressInfo().setPermanentAddrTownOrVillage(death.getDeathAddressInfo().getPermntOutsideIndiaVillage());
                                    death.getDeathAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntOutsideIndiaLineoneEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntOutsideIndiaLineoneMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntOutsideIndiaLinetwoMl()); 
                                }
                            }
                        }
                    }
                });
        }

}
