package org.ksmart.death.crdeathregistry.repository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.crdeath.kafka.producer.CrDeathProducer;
import org.ksmart.death.crdeath.util.CrDeathConstants;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.ksmart.death.crdeathregistry.repository.querybuilder.CrDeathRgistryQueryBuilder;
import org.ksmart.death.crdeathregistry.repository.rowmapper.CrDeathRegistryRowMapper;
import org.ksmart.death.crdeathregistry.repository.rowmapper.DeathCertificateRowMapper;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryConstants;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryMdmsUtil;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathPdfResp;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;

import ch.qos.logback.core.joran.conditional.ThenAction;
import lombok.extern.slf4j.Slf4j;

/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on 05.12.2022
     */
@Slf4j
@Repository
public class CrDeathRegistryRepository {
    
    private final JdbcTemplate jdbcTemplate;
    private final CrDeathRgistryQueryBuilder queryBuilder;
    private final CrDeathRegistryRowMapper rowMapper;
    private final DeathCertificateRowMapper deathCertRowMapper;
    //RAkhi S on 19.12.2022
    private final CrDeathProducer producer;

    @Autowired
	private CrDeathRegistryConfiguration config;

    @Autowired
    private RestTemplate restTemplate;

    //rakhi s on 23.12.2022
    @Autowired
    CrDeathRegistryMdmsUtil util;

    @Autowired
    CrDeathRegistryRepository(JdbcTemplate jdbcTemplate, CrDeathRgistryQueryBuilder queryBuilder,
                            CrDeathRegistryRowMapper rowMapper,CrDeathProducer producer,
                            CrDeathRegistryMdmsUtil util,DeathCertificateRowMapper deathCertRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.producer = producer;
        this.util = util;
        this.deathCertRowMapper = deathCertRowMapper;
        
    }

    public List<CrDeathRegistryDtl> getDeathApplication(CrDeathRegistryCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<CrDeathRegistryDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
       // System.out.println("Output"+result);
        return result; // NOPMD
    }
    //UPDATE
    // public String getDeathRegNoold(String tenantId,int  Year) {
        
    //    List<Object> preparedStmtValues = new ArrayList<>();
    //    String result=null;

    //    String query = queryBuilder.getDeathRegNoIdQuery(tenantId, String.valueOf(Year),preparedStmtValues);
    //    List<Map<String,Object>> regno= jdbcTemplate.queryForList(query);
    //    if (regno.size()>1) {
    //      result=String.valueOf(regno.get(0).get("regno"))+"/"+String.valueOf(Year);
    //    }
    //    else{
    //      result="1/"+String.valueOf(Year);
    //    }
    //    System.out.println("JasmineRegNo"+regno);
    //   // regno.put("result",result);
    //    return result; 
    // }

    public List<Map<String, Object>>  getDeathRegDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
       // String query = queryBuilder.getDeathRegNoIdQuery(tenantId, String.valueOf(Year),preparedStmtValues);
       String query = queryBuilder.getDeathRegNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
       // List<> regDetails = jdbcTemplate.query(query, preparedStmtValues.toArray());
        return regDetails; 
     }

     //Rakhi S on 16.12.2022
    public DeathPdfResp saveDeathCertPdf(DeathPdfApplicationRequest pdfApplicationRequest) {
        DeathPdfResp  result= new DeathPdfResp();
        try {
            SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");	
			pdfApplicationRequest.getDeathCertificate().forEach(cert-> {
				String uiHost = config.getUiAppHost();
				String deathCertPath = config.getDeathCertLink();
				deathCertPath = deathCertPath.replace("$id",cert.getId());
				deathCertPath = deathCertPath.replace("$tenantId",cert.getTenantId());
				deathCertPath = deathCertPath.replace("$regNo",cert.getRegistrationNo());
				deathCertPath = deathCertPath.replace("$dateofdeath",format.format(cert.getDateOfDeath()));
				deathCertPath = deathCertPath.replace("$gender",cert.getDeceasedGender().toString());
                
                // cert.setDeathACKNo("DR/CRT/01/2022");
				// deathCertPath = deathCertPath.replace("$deathcertificateno",cert.getDeathACKNo());
                deathCertPath = deathCertPath.replace("$deathcertificateno",cert.getCertificateNo());

				String finalPath = uiHost + deathCertPath;
                //RAkhi S on 23.12.2022 MDMS Call
                Object mdmsData = util.mDMSCallCertificate(pdfApplicationRequest.getRequestInfo()
                                , cert.getTenantId()
                                , cert.getAddressInfo().getPresentAddress().getDistrictId()
                                , cert.getAddressInfo().getPresentAddress().getStateId()
                                , cert.getAddressInfo().getPresentAddress().getCountryId()
                                , cert.getAddressInfo().getPresentAddress().getPostofficeId());
                //Rakhi S on 24.12.2022
                 Map<String,List<String>> masterData = getAttributeValues(mdmsData);

                 String lbName = masterData.get(CrDeathRegistryConstants.TENANTS).toString();
                 lbName = lbName.replaceAll("[\\[\\]\\(\\)]", "");
                 cert.setLocalBodyName(lbName);    
                 
                 //Rakhi S on 24.01.2023 
                 Object mdmsDistrict = util.mDMSCallCertificateLBDistrict(pdfApplicationRequest.getRequestInfo()
                            , cert.getTenantId());
                 Map<String,List<String>> masterDataDistrict = getAttributeValuesVehicle(mdmsDistrict);

                 String lbDistrictMaster = masterDataDistrict.get(CrDeathRegistryConstants.TENANTS).toString();
                 lbDistrictMaster = lbDistrictMaster.replaceAll("[\\[\\]\\(\\)]", "");
                
                 Object mdmsDistrictEn = util.mDMSCallCertificateLBDistrictEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getTenantId()
                                      ,lbDistrictMaster);
                 Map<String,List<String>> masterDataDistrictEn = getAttributeValues(mdmsDistrictEn);

                 String lbDistrictEn = masterDataDistrictEn.get(CrDeathRegistryConstants.DISTRICT).toString();
                 lbDistrictEn = lbDistrictEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.setLbDistrictEn(lbDistrictEn);

                 Object mdmsDistrictMl = util.mDMSCallCertificateLBDistrictMl(pdfApplicationRequest.getRequestInfo()
                                        , cert.getTenantId()
                                        ,lbDistrictMaster);

                 Map<String,List<String>> masterDataDistrictMl = getAttributeValues(mdmsDistrictMl);

                 String lbDistrictMl = masterDataDistrictMl.get(CrDeathRegistryConstants.DISTRICT).toString();
                 lbDistrictMl = lbDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.setLbDistrictMl(lbDistrictMl);


                 Object mdmsTaluk = util.mDMSCallCertificateLBTaluk(pdfApplicationRequest.getRequestInfo()
                            , cert.getTenantId());
                 Map<String,List<String>> masterDataTaluk = getAttributeValuesVehicle(mdmsTaluk);

                 String lbTalukMaster = masterDataTaluk.get(CrDeathRegistryConstants.TENANTS).toString();
                 lbTalukMaster = lbTalukMaster.replaceAll("[\\[\\]\\(\\)]", "");

                 Object mdmsTalukEn = util.mDMSCallCertificateLBTalukEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getTenantId()
                                      ,lbTalukMaster);
                 Map<String,List<String>> masterDataTalukEn = getAttributeValues(mdmsTalukEn);

                 String lbTalukEn = masterDataTalukEn.get(CrDeathRegistryConstants.TALUK).toString();
                 lbTalukEn = lbTalukEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.setLbTalukEn(lbTalukEn);

                 Object mdmsTalukMl = util.mDMSCallCertificateLBTalukMl(pdfApplicationRequest.getRequestInfo()
                                      , cert.getTenantId()
                                      ,lbTalukMaster);

                Map<String,List<String>> masterDataTalukMl = getAttributeValues(mdmsTalukMl);

                String lbTalukMl = masterDataTalukMl.get(CrDeathRegistryConstants.TALUK).toString();
                lbTalukMl = lbTalukMl.replaceAll("[\\[\\]\\(\\)]", "");

                cert.setLbTalukMl(lbTalukMl);
                     
                 //End District and Taluk of LB

                 //RAkhi S on 07.01.2023 MDMS Call Malayalam fields 
                Object mdmsDataMl = util.mDMSCallCertificateMl(pdfApplicationRequest.getRequestInfo()
                                , cert.getTenantId()
                                , cert.getAddressInfo().getPresentAddress().getDistrictId()
                                , cert.getAddressInfo().getPresentAddress().getStateId()
                                , cert.getAddressInfo().getPresentAddress().getCountryId()
                                , cert.getAddressInfo().getPresentAddress().getPostofficeId());
                Map<String,List<String>> masterDataMl = getAttributeValuesMl(mdmsDataMl);

                String lbNameMl = masterDataMl.get(CrDeathRegistryConstants.TENANTS).toString();
                lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.setLocalBodyNameMl(lbNameMl);

                //RAkhi S on 09.01.2023 MDMS Call English
                String presentAddDistrict = masterData.get(CrDeathRegistryConstants.DISTRICT).toString();
                presentAddDistrict = presentAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPresentAddress().setDistrictId(presentAddDistrict);

                //Rakhi S on 11.01.2023
                String presentAddState = masterData.get(CrDeathRegistryConstants.STATE).toString();
                presentAddState = presentAddState.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPresentAddress().setStateId(presentAddState);

                String presentAddCountry = masterData.get(CrDeathRegistryConstants.COUNTRY).toString();
                presentAddCountry = presentAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPresentAddress().setCountryId(presentAddCountry);  
                
                //RAkhi S on 24.01.2023

                String presentAddPO = masterData.get(CrDeathRegistryConstants.POSTOFFICE).toString();
                presentAddPO = presentAddPO.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddPO && !presentAddPO.isEmpty()){
                     presentAddPO=presentAddPO+" "+CrDeathRegistryConstants.PO_EN;
                    if(cert.getAddressInfo().getPresentAddress().getPincode() != 0){
                        presentAddPO = presentAddPO+" "+cert.getAddressInfo().getPresentAddress().getPincode();
                    }
                     cert.getAddressInfo().getPresentAddress().setPostofficeNameEn(presentAddPO);
                }

                String presentAddPOMl = masterDataMl.get(CrDeathRegistryConstants.POSTOFFICE).toString();
                presentAddPOMl = presentAddPOMl.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddPOMl && !presentAddPOMl.isEmpty()){
                    presentAddPOMl=presentAddPOMl+" "+CrDeathRegistryConstants.PO_ML;
                    if(cert.getAddressInfo().getPresentAddress().getPincode() != 0){
                        presentAddPOMl = presentAddPOMl+" "+cert.getAddressInfo().getPresentAddress().getPincode();
                    }
                     cert.getAddressInfo().getPresentAddress().setPostofficeNameMl(presentAddPOMl);
                }

                //RAkhi S on 11.01.2023 MDMS Call Malayalam
                String presentAddDistrictMl = masterDataMl.get(CrDeathRegistryConstants.DISTRICT).toString();
                presentAddDistrictMl = presentAddDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPresentAddress().setDistrictMl(presentAddDistrictMl);

                String presentAddStateMl = masterDataMl.get(CrDeathRegistryConstants.STATE).toString();
                presentAddStateMl = presentAddStateMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPresentAddress().setStateMl(presentAddStateMl);
                
                String presentAddCountryMl = masterDataMl.get(CrDeathRegistryConstants.COUNTRY).toString();
                presentAddCountryMl = presentAddCountryMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPresentAddress().setCountryMl(presentAddCountryMl);

                 //Rakhi S on 12.01.2023 

                 Object mdmsDataPermanent = util.mDMSCallCertificateP(pdfApplicationRequest.getRequestInfo()     
                                , cert.getTenantId()                           
                                , cert.getAddressInfo().getPermanentAddress().getDistrictId()
                                , cert.getAddressInfo().getPermanentAddress().getStateId()
                                , cert.getAddressInfo().getPermanentAddress().getCountryId()
                                , cert.getAddressInfo().getPermanentAddress().getPostofficeId());
                Map<String,List<String>> masterDataPermanent = getAttributeValues(mdmsDataPermanent);

                Object mdmsDataPermanentMl = util.mDMSCallCertificatePMl(pdfApplicationRequest.getRequestInfo()     
                                , cert.getTenantId()                           
                                , cert.getAddressInfo().getPermanentAddress().getDistrictId()
                                , cert.getAddressInfo().getPermanentAddress().getStateId()
                                , cert.getAddressInfo().getPermanentAddress().getCountryId()
                                , cert.getAddressInfo().getPermanentAddress().getPostofficeId());
                Map<String,List<String>> masterDataPermanentMl = getAttributeValues(mdmsDataPermanentMl);

                String permanentAddDistrict = masterDataPermanent.get(CrDeathRegistryConstants.DISTRICT).toString();
                permanentAddDistrict = permanentAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPermanentAddress().setDistrictId(permanentAddDistrict);

                String permanentAddState = masterDataPermanent.get(CrDeathRegistryConstants.STATE).toString();
                permanentAddState = permanentAddState.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPermanentAddress().setStateId(permanentAddState);

                String permanentAddCountry = masterDataPermanent.get(CrDeathRegistryConstants.COUNTRY).toString();
                permanentAddCountry = permanentAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPermanentAddress().setCountryId(permanentAddCountry);

                String permanentAddDistrictMl = masterDataPermanentMl.get(CrDeathRegistryConstants.DISTRICT).toString();
                permanentAddDistrictMl = permanentAddDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPermanentAddress().setDistrictMl(permanentAddDistrictMl);

                String permanentAddStateMl = masterDataPermanentMl.get(CrDeathRegistryConstants.STATE).toString();
                permanentAddStateMl = permanentAddStateMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPermanentAddress().setStateMl(permanentAddStateMl);

                String permanentAddCountryMl = masterDataPermanentMl.get(CrDeathRegistryConstants.COUNTRY).toString();
                permanentAddCountryMl = permanentAddCountryMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getAddressInfo().getPermanentAddress().setCountryMl(permanentAddCountryMl);

                String permanentAddPO = masterDataPermanent.get(CrDeathRegistryConstants.POSTOFFICE).toString();
                permanentAddPO = permanentAddPO.replaceAll("[\\[\\]\\(\\)]", "");

                if (null != permanentAddPO && !permanentAddPO.isEmpty()){
                    permanentAddPO=permanentAddPO+" "+CrDeathRegistryConstants.PO_EN;
                   if(cert.getAddressInfo().getPermanentAddress().getPincode() != 0){
                    permanentAddPO = permanentAddPO+" "+cert.getAddressInfo().getPermanentAddress().getPincode();
                   }
                    cert.getAddressInfo().getPermanentAddress().setPostofficeNameEn(permanentAddPO);
               }
               String permanentAddPOMl = masterDataPermanentMl.get(CrDeathRegistryConstants.POSTOFFICE).toString();
               permanentAddPOMl = permanentAddPOMl.replaceAll("[\\[\\]\\(\\)]", "");

               if (null != permanentAddPOMl && !permanentAddPOMl.isEmpty()){
                permanentAddPOMl=permanentAddPOMl+" "+CrDeathRegistryConstants.PO_ML;
                if(cert.getAddressInfo().getPermanentAddress().getPincode() != 0){
                    permanentAddPOMl = permanentAddPOMl+" "+cert.getAddressInfo().getPermanentAddress().getPincode();
                }
                 cert.getAddressInfo().getPermanentAddress().setPostofficeNameMl(permanentAddPOMl);
              }

                //RAkhi S on 25.01.2023
                if(cert.getDeceasedFirstNameMl()!=null){}
                else {               
                    cert.setDeceasedFirstNameMl("");
                }
                if(cert.getDeceasedMiddleNameMl()!=null){}
                else {               
                    cert.setDeceasedMiddleNameMl("");
                }
                if(cert.getDeceasedLastNameMl()!=null){}
                else {               
                    cert.setDeceasedLastNameMl("");
                }

                if(cert.getDeceasedFirstNameEn()!=null){}
                else {               
                    cert.setDeceasedFirstNameEn("");
                }
                if(cert.getDeceasedMiddleNameEn()!=null){}
                else {               
                    cert.setDeceasedMiddleNameEn("");
                }
                if(cert.getDeceasedLastNameEn()!=null){}
                else {               
                    cert.setDeceasedLastNameEn("");
                }
                //Rakhi S on 16.12.2022
                cert.setFullName(
                                cert.getDeceasedFirstNameMl() + " "+
                                cert.getDeceasedMiddleNameMl() + " "+
                                cert.getDeceasedLastNameMl() + " / " +
                                cert.getDeceasedFirstNameEn() +" "+
                                cert.getDeceasedMiddleNameEn() +" "+
                                cert.getDeceasedLastNameEn() );

                cert.setGender(cert.getDeceasedGender());
                //Rakhi S on 21.01.2023
                String spouseMl = "";
                String spouseEn = "";    

                if(cert.getSpouseUnavailable()!=1){
                    // if(cert.getSpouseType()!=null){
                        if(cert.getSpouseType().equals(CrDeathRegistryConstants.WIFE.toString())){
                            spouseMl = CrDeathRegistryConstants.WIFE_ML.toString();
                            spouseEn = CrDeathRegistryConstants.WIFE_EN.toString();
                        }
                        else if(cert.getSpouseType().equals(CrDeathRegistryConstants.HUSBAND.toString())){
                            spouseMl = CrDeathRegistryConstants.MALE_DEPENDENT_HUSBAND_ML.toString();
                            spouseEn = CrDeathRegistryConstants.MALE_DEPENDENT_HUSBAND_EN.toString();
                        }
                
                        cert.setSpouseName(cert.getSpouseNameMl()+ spouseMl+" / "+
                        cert.getSpouseNameEn()+ spouseEn);
                    // }
                }
                else{
                    cert.setSpouseName(CrDeathRegistryConstants.NOT_RECORDED_ML+" / "+
                    CrDeathRegistryConstants.NOT_RECORDED_EN);
                }
                // if(cert.getFemaleDependentTitle()!=null){
                // cert.setMotherName(cert.getFemaleDependentTitle()+" "+
                //                     cert.getFemaleDependentNameMl()+CrDeathRegistryConstants.FEMALE_DEPENDENT_ML.toString()+" / "+
                //                     cert.getFemaleDependentNameEn()+CrDeathRegistryConstants.FEMALE_DEPENDENT_EN.toString());  
                // }
                // else{
                    if(cert.getFemaleDependentUnavailable() != 1){
                        cert.setMotherName(cert.getFemaleDependentNameMl()+CrDeathRegistryConstants.FEMALE_DEPENDENT_ML.toString()+" / "+
                        cert.getFemaleDependentNameEn()+CrDeathRegistryConstants.FEMALE_DEPENDENT_EN.toString()); 
                    }
                    else{
                        cert.setMotherName(CrDeathRegistryConstants.NOT_RECORDED_ML+" / "+
                        CrDeathRegistryConstants.NOT_RECORDED_EN);
                    }
                // }     
                String maleDependentMl = "";
                String maleDependentEn = "";    
                
                // if(cert.getMaleDependentType().equals(CrDeathRegistryConstants.MALE_DEPENDENT_FATHER.toString())){
                     maleDependentMl = CrDeathRegistryConstants.MALE_DEPENDENT_FATHER_ML.toString();
                     maleDependentEn = CrDeathRegistryConstants.MALE_DEPENDENT_FATHER_EN.toString();
                // }
                // else if(cert.getMaleDependentType().equals(CrDeathRegistryConstants.MALE_DEPENDENT_HUSBAND.toString())){
                //      maleDependentMl = CrDeathRegistryConstants.MALE_DEPENDENT_HUSBAND_ML.toString();
                //      maleDependentEn = CrDeathRegistryConstants.MALE_DEPENDENT_HUSBAND_EN.toString();
                // }
                // if(cert.getMaleDependentTitle()!=null){
                // cert.setMaledependentname(cert.getMaleDependentTitle()+" "+
                //                             cert.getMaleDependentNameMl()+ maleDependentMl+" / "+
                //                             cert.getMaleDependentNameEn() + maleDependentEn);
                // }
                // else{
                if(cert.getMaleDependentUnavailable() != 1){
                    cert.setMaledependentname(cert.getMaleDependentNameMl()+ maleDependentMl+" / "+
                                            cert.getMaleDependentNameEn()+ maleDependentEn);
                }
                else{
                    cert.setMaledependentname(CrDeathRegistryConstants.NOT_RECORDED_ML+" / "+
                    CrDeathRegistryConstants.NOT_RECORDED_EN);
                }

                // }

                if(cert.getAddressInfo().getPresentAddress().getResidenceAsscNo() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setResidenceAsscNo("");
                }
                if(cert.getAddressInfo().getPresentAddress().getHouseNo() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setHouseNo("");
                }
                if(cert.getAddressInfo().getPresentAddress().getHoueNameEn() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setHoueNameEn("");
                }
                if(cert.getAddressInfo().getPresentAddress().getHoueNameMl() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setHoueNameMl("");
                }
                if(cert.getAddressInfo().getPresentAddress().getStreetNameEn() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setStreetNameEn("");
                }
                if(cert.getAddressInfo().getPresentAddress().getStreetNameMl() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setStreetNameMl("");
                }
                if(cert.getAddressInfo().getPresentAddress().getCityEn() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setCityEn("");
                }
                if(cert.getAddressInfo().getPresentAddress().getCityMl() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setCityMl("");
                }
                if(cert.getAddressInfo().getPresentAddress().getLocalityEn() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setLocalityEn("");
                }
                if(cert.getAddressInfo().getPresentAddress().getLocalityMl() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setLocalityMl("");
                }
                if(cert.getAddressInfo().getPresentAddress().getPostofficeNameEn() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setPostofficeNameEn("");
                }
                if(cert.getAddressInfo().getPresentAddress().getPostofficeNameMl() != null){}
                else{
                    cert.getAddressInfo().getPresentAddress().setPostofficeNameMl("");
                }
                if(cert.getAddressInfo().getPresentAddress().getPincode() != 0){}// && cert.getAddressInfo().getPresentAddress().getPincode() != 0){}
                else{
                    cert.getAddressInfo().getPresentAddress().setPincode(0);
                }

                //permanant
                if(cert.getAddressInfo().getPermanentAddress().getResidenceAsscNo() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setResidenceAsscNo("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getHouseNo() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setHouseNo("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getHoueNameEn() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setHoueNameEn("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getHoueNameMl() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setHoueNameMl("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getStreetNameEn() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setStreetNameEn("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getStreetNameMl() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setStreetNameMl("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getCityEn() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setCityEn("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getCityMl() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setCityMl("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getLocalityEn() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setLocalityEn("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getLocalityMl() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setLocalityMl("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getPostofficeNameEn() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setPostofficeNameEn("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getPostofficeNameMl() != null){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setPostofficeNameMl("");
                }
                if(cert.getAddressInfo().getPermanentAddress().getPincode() != 0){}
                else{
                    cert.getAddressInfo().getPermanentAddress().setPincode(0);
                }
                //end
                cert.setPresentAddressFullEn(cert.getAddressInfo().getPresentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPresentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getHoueNameEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStreetNameEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCityEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getLocalityEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getPostofficeNameEn()+ " "+
                                            // CrDeathRegistryConstants.PO_EN +" - "+
                                            // cert.getAddressInfo().getPresentAddress().getPincode()+" "+
                                            cert.getAddressInfo().getPresentAddress().getDistrictId()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStateId()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCountryId());  

                cert.setPresentAddressFullMl(cert.getAddressInfo().getPresentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPresentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getHoueNameMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStreetNameMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCityMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getLocalityMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getPostofficeNameMl()+ " "+
                                            // cert.getAddressInfo().getPresentAddress().getPincode()+" "+
                                            cert.getAddressInfo().getPresentAddress().getDistrictMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStateMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCountryMl());
                                            
                cert.setPermanentAddressFullEn(cert.getAddressInfo().getPermanentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPermanentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getHoueNameEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStreetNameEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCityEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getLocalityEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getPostofficeNameEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getDistrictId()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStateId()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCountryId());

                cert.setPermanentAddressFullMl(cert.getAddressInfo().getPermanentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPermanentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getHoueNameMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStreetNameMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCityMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getLocalityMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getPostofficeNameMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getDistrictMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStateMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCountryMl());
                //Rakhi S 13.01.2023 
                // place of death HOME
                if(CrDeathRegistryConstants.DEATH_PLACE_HOME.toString().equals(cert.getDeathPlace())){

                    Object mdmsDataHome = util.mDMSCallCertificateHome(pdfApplicationRequest.getRequestInfo()     
                                    , cert.getTenantId()                           
                                    , cert.getAddressInfo().getDeathplaceAddress().getDistrictId()
                                    , cert.getAddressInfo().getDeathplaceAddress().getStateId()
                                    , cert.getAddressInfo().getDeathplaceAddress().getCountryId()
                                    , cert.getAddressInfo().getDeathplaceAddress().getPostofficeId());
                    Map<String,List<String>> masterDataHome = getAttributeValues(mdmsDataHome);

                    Object mdmsDataHomeMl = util.mDMSCallCertificateHomeMl(pdfApplicationRequest.getRequestInfo()     
                                    , cert.getTenantId()                           
                                    , cert.getAddressInfo().getDeathplaceAddress().getDistrictId()
                                    , cert.getAddressInfo().getDeathplaceAddress().getStateId()
                                    , cert.getAddressInfo().getDeathplaceAddress().getCountryId()
                                    , cert.getAddressInfo().getDeathplaceAddress().getPostofficeId());
                    Map<String,List<String>> masterDataHomeML = getAttributeValues(mdmsDataHomeMl);

                    String deathPlaceAddDistrict = masterDataHome.get(CrDeathRegistryConstants.DISTRICT).toString();
                    deathPlaceAddDistrict = deathPlaceAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getAddressInfo().getDeathplaceAddress().setDistrictId(deathPlaceAddDistrict);

                    String deathPlaceAddState = masterDataHome.get(CrDeathRegistryConstants.STATE).toString();
                    deathPlaceAddState = deathPlaceAddState.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getAddressInfo().getDeathplaceAddress().setStateId(deathPlaceAddState);

                    String deathPlaceAddCountry = masterDataHome.get(CrDeathRegistryConstants.COUNTRY).toString();
                    deathPlaceAddCountry = deathPlaceAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getAddressInfo().getDeathplaceAddress().setCountryId(deathPlaceAddCountry);               

                    String deathPlaceAddDistrictMl = masterDataHomeML.get(CrDeathRegistryConstants.DISTRICT).toString();
                    deathPlaceAddDistrictMl = deathPlaceAddDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getAddressInfo().getDeathplaceAddress().setDistrictMl(deathPlaceAddDistrictMl);

                    String deathPlaceAddStateMl = masterDataHomeML.get(CrDeathRegistryConstants.STATE).toString();
                    deathPlaceAddStateMl = deathPlaceAddStateMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getAddressInfo().getDeathplaceAddress().setStateMl(deathPlaceAddStateMl);
                
                    String deathPlaceCountryMl = masterDataHomeML.get(CrDeathRegistryConstants.COUNTRY).toString();
                    deathPlaceCountryMl = deathPlaceCountryMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getAddressInfo().getDeathplaceAddress().setCountryMl(deathPlaceCountryMl);    
                    
                    //RAkhi S on 28.01.2023
                    String deathPlacePO = masterDataHome.get(CrDeathRegistryConstants.POSTOFFICE).toString();
                    deathPlacePO = deathPlacePO.replaceAll("[\\[\\]\\(\\)]", "");
    
                    if (null != deathPlacePO && !deathPlacePO.isEmpty()){
                        deathPlacePO=deathPlacePO+" "+CrDeathRegistryConstants.PO_EN;
                       if(cert.getAddressInfo().getDeathplaceAddress().getPincode() != 0){
                        deathPlacePO = deathPlacePO+" "+cert.getAddressInfo().getDeathplaceAddress().getPincode();
                       }
                        cert.getAddressInfo().getDeathplaceAddress().setPostofficeNameEn(deathPlacePO);
                   }

                    String deathPlacePOMl = masterDataHomeML.get(CrDeathRegistryConstants.POSTOFFICE).toString();
                    deathPlacePOMl = deathPlacePOMl.replaceAll("[\\[\\]\\(\\)]", "");

                    if (null != deathPlacePOMl && !deathPlacePOMl.isEmpty()){
                        deathPlacePOMl=deathPlacePOMl+" "+CrDeathRegistryConstants.PO_ML;
                        if(cert.getAddressInfo().getDeathplaceAddress().getPincode() != 0){
                            deathPlacePOMl = deathPlacePOMl+" "+cert.getAddressInfo().getDeathplaceAddress().getPincode();
                        }
                        cert.getAddressInfo().getDeathplaceAddress().setPostofficeNameMl(deathPlacePOMl);
                    }

                    if(cert.getAddressInfo().getDeathplaceAddress().getResidenceAsscNo() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setResidenceAsscNo("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getHouseNo() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setHouseNo("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getHoueNameEn() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setHoueNameEn("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getHoueNameMl() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setHoueNameMl("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getStreetNameEn() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setStreetNameEn("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getStreetNameMl() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setStreetNameMl("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getCityEn() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setCityEn("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getCityMl() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setCityMl("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getLocalityEn() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setLocalityEn("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getLocalityMl() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setLocalityMl("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getPostofficeNameEn() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setPostofficeNameEn("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getPostofficeNameMl() != null){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setPostofficeNameMl("");
                    }
                    if(cert.getAddressInfo().getDeathplaceAddress().getPincode() != 0){}
                    else{
                        cert.getAddressInfo().getDeathplaceAddress().setPincode(0);
                    }

                    //End
                    cert.setPlaceofDeath(cert.getAddressInfo().getDeathplaceAddress().getResidenceAsscNo() + " "+
                        cert.getAddressInfo().getDeathplaceAddress().getHouseNo()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getHoueNameMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getStreetNameMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getCityMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getLocalityMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getPostofficeNameMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getDistrictMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getStateMl()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getCountryMl()+" / "+

                        cert.getAddressInfo().getDeathplaceAddress().getResidenceAsscNo() + " "+
                        cert.getAddressInfo().getDeathplaceAddress().getHouseNo()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getHoueNameEn()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getStreetNameEn()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getCityEn()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getLocalityEn()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getPostofficeNameEn()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getDistrictId()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getStateId()+ " "+
                        cert.getAddressInfo().getDeathplaceAddress().getCountryId());
                }
                
                //Place of Death Hospital
                else if(CrDeathRegistryConstants.DEATH_PLACE_HOSPITAL.toString().equals(cert.getDeathPlace())){
                     Object mdmsDataHospital = util.mDMSCallCertificateHospital(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getTenantId()                           
                                            , cert.getDeathPlaceType());
                    Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                    Object mdmsDataHospitalMl = util.mDMSCallCertificateHospitalMl(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getTenantId()                           
                                            , cert.getDeathPlaceType());
                    Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                    String deathPlaceHospital = masterDataHospital.get(CrDeathRegistryConstants.HOSPITAL_LIST).toString();
                    deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                    String deathPlaceHospitalMl = masterDataHospitalMl.get(CrDeathRegistryConstants.HOSPITAL_LIST).toString();
                    deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.setPlaceofDeath(deathPlaceHospitalMl+" / "+deathPlaceHospital);
                }
                //Place of Death Institution
                else if(CrDeathRegistryConstants.DEATH_PLACE_INSTITUTION.toString().equals(cert.getDeathPlace())){
                    Object mdmsDataInstitution = util.mDMSCallCertificateInstitution(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getTenantId()                           
                                            , cert.getDeathPlaceInstId());
                    Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                    Object mdmsDataInstitutionMl = util.mDMSCallCertificateInstitutionMl(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getTenantId()                           
                                            , cert.getDeathPlaceInstId());
                    Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                    String deathPlaceInstitution = masterDataInstitution.get(CrDeathRegistryConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                    String deathPlaceInstitutionMl = masterDataInstitutionMl.get(CrDeathRegistryConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                    cert.setPlaceofDeath(deathPlaceInstitutionMl+" / "+deathPlaceInstitution);
                }
                //Place of Death Vehicle
                else if(CrDeathRegistryConstants.DEATH_PLACE_VEHICLE.toString().equals(cert.getDeathPlace())){
                    // Object mdmsDatavehicleFirstHalt = util.mDMSCallCertificateVehicle(pdfApplicationRequest.getRequestInfo()     
                    //                         , cert.getVehicleFirstHalt()                   
                    //                         );
                    // Map<String,List<String>> masterDataVehicle = getAttributeValuesVehicle(mdmsDatavehicleFirstHalt);

                    // Object mdmsDatavehicleFirstHaltMl = util.mDMSCallCertificateVehicleMl(pdfApplicationRequest.getRequestInfo()     
                    //                         , cert.getVehicleFirstHalt()                   
                    //                          );
                    // Map<String,List<String>> masterDataVehicleMl = getAttributeValuesVehicle(mdmsDatavehicleFirstHaltMl);

                    // String vehicleFirstHalt = masterDataVehicle.get(CrDeathRegistryConstants.TENANTS).toString();
                    // vehicleFirstHalt = vehicleFirstHalt.replaceAll("[\\[\\]\\(\\)]", "");  
                    
                   
                    // String vehicleFirstHaltMl = masterDataVehicleMl.get(CrDeathRegistryConstants.TENANTS).toString();
                    // vehicleFirstHaltMl = vehicleFirstHaltMl.replaceAll("[\\[\\]\\(\\)]", "");

                    // cert.setPlaceofDeath(CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION1.toString()+cert.getVehicleFromplaceMl()+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+" "+cert.getVehicleToPlaceMl()+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION3.toString()+" "+vehicleFirstHaltMl+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION4.toString()
                    // +" / "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION5.toString()+cert.getVehicleFromplaceEn()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION7.toString()+cert.getVehicleToPlaceEn()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION6.toString()+vehicleFirstHalt+".");
                    if(cert.getVehicleFromplaceEn() != null){
                        cert.setPlaceofDeath(CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION1.toString()+cert.getVehicleFromplaceMl()+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+" "+cert.getVehicleToPlaceMl()+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION3.toString()+" "+lbNameMl+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION4.toString()
                        +" / "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION5.toString()+cert.getVehicleFromplaceEn()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION7.toString()+cert.getVehicleToPlaceEn()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION6.toString()+lbName+".");
                    }
                    else{
                        cert.setPlaceofDeath(cert.getDeathPlaceOtherMl()+" / "+cert.getDeathPlaceOtherEn());
                    }
                }
                //Place of Death Other
                else if(CrDeathRegistryConstants.DEATH_PLACE_OTHER_PLACES.toString().equals(cert.getDeathPlace())){
                    Object mdmsDataOtherPlace = util.mDMSCallCertificateOther(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathPlaceType()                   
                                            );
                    Map<String,List<String>> masterDataOtherPlace = getAttributeValuesOther(mdmsDataOtherPlace);
                    String OtherPlace = masterDataOtherPlace.get(CrDeathRegistryConstants.OTHER_PLACE_TYPE).toString();
                    OtherPlace = OtherPlace.replaceAll("[\\[\\]\\(\\)]", ""); 

                    //RAkhi S on 28.01.2023
                    Object mdmsDataOtherPlaceMl = util.mDMSCallCertificateOtherMl(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathPlaceType()                   
                                            );
                    Map<String,List<String>> masterDataOtherPlaceMl = getAttributeValuesOther(mdmsDataOtherPlaceMl);
                    String OtherPlaceMl = masterDataOtherPlaceMl.get(CrDeathRegistryConstants.OTHER_PLACE_TYPE).toString();
                    OtherPlaceMl = OtherPlaceMl.replaceAll("[\\[\\]\\(\\)]", ""); 

                    if(OtherPlace != null){
                        cert.setPlaceofDeath(OtherPlaceMl+" / "+OtherPlace);
                    }
                    else{
                        cert.setPlaceofDeath(cert.getDeathPlaceOtherMl()+" / "+cert.getDeathPlaceOtherEn());
                    }
                }

                //Rakhi S on 18.01.2023
               if(cert.getDeceasedGender().equals(CrDeathRegistryConstants.GENDER_MALE.toString())){
                    cert.setDeceasedGender(CrDeathRegistryConstants.GENDER_MALE_CAPTION.toString());
               }
               else if(cert.getDeceasedGender().equals(CrDeathRegistryConstants.GENDER_FEMALE.toString())){
                     cert.setDeceasedGender(CrDeathRegistryConstants.GENDER_FEMALE_CAPTION.toString());
               }
               else if(cert.getDeceasedGender().equals(CrDeathRegistryConstants.TRANSGENDER.toString())){
                cert.setDeceasedGender(CrDeathRegistryConstants.TRANSGENDER_CAPTION.toString());
               }

            //    System.out.println("getCertificateDate"+cert.getCertificateDate());
                cert.setCertificateDate(cert.getCertificateDate());
                cert.setRegistrationDate(cert.getRegistrationDate());
                cert.setLocalBodyName(cert.getLocalBodyName());
                cert.setEmbeddedUrl(getShortenedUrl(finalPath));

            });
            
            // log.info(new Gson().toJson(pdfApplicationRequest));

            DeathPdfApplicationRequest req = DeathPdfApplicationRequest.builder().deathCertificate(pdfApplicationRequest.getDeathCertificate()).requestInfo(pdfApplicationRequest.getRequestInfo()).build();
                 /********************************************* */

        //   try {
        //       ObjectMapper mapper = new ObjectMapper();
        //       Object obj = req;
        //       mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //     System.out.println("pdfrequest: "+ mapper.writeValueAsString(obj));
        //       }catch(Exception e) {
        //         // log.error("Exception while fetching from searcher: ",e);
        //       }


              /********************************************** */
            pdfApplicationRequest.getDeathCertificate().forEach(cert-> {
            String uiHost = config.getEgovPdfHost();
            String deathCertPath = config.getEgovPdfDeathEndPoint();
            String tenantId = cert.getTenantId().split("\\.")[0];
            deathCertPath = deathCertPath.replace("$tenantId",tenantId);
            String pdfFinalPath = uiHost + deathCertPath;
            DeathPdfResp response = restTemplate.postForObject(pdfFinalPath, req, DeathPdfResp.class);

            if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                        "No file store id found from pdf service");
            }
            result.setFilestoreIds(response.getFilestoreIds());
			});	
        }
        catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("PDF_ERROR","Error in generating PDF");
		}
		return result;
  
    }
    //Rakhi S on 16.12.2022
    public String getShortenedUrl(String url){
		HashMap<String,String> body = new HashMap<>();
		body.put("url",url);
		StringBuilder builder = new StringBuilder(config.getUrlShortnerHost());
		builder.append(config.getUrlShortnerEndpoint());
		String res = restTemplate.postForObject(builder.toString(), body, String.class);
		if(StringUtils.isEmpty(res)){
			log.error("URL_SHORTENING_ERROR","Unable to shorten url: "+url);
			return url;
		}
		else return res;
	}

    //Rakhi S IKM on 19.12.2022
    public void save(DeathCertRequest deathCertRequest) {
  	    producer.push(config.getSaveDeathTopic(), deathCertRequest);
	}
    //Rakhi S ikm on 24.12.2022
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.TENANT_JSONPATH, 
        CrDeathRegistryConstants.COMMON_MASTER_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    //Rakhi S ikm on 07.01.2023
    private Map<String, List<String>> getAttributeValuesMl(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.TENANT_JSONPATH, 
        CrDeathRegistryConstants.COMMON_MASTER_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathMl"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    //Rakhi S on 13.01.2023
    private Map<String, List<String>> getAttributeValuesHospital(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.EGOV_LOCATION_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathbnd"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }

    private Map<String, List<String>> getAttributeValuesVehicle(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathvehicle"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    private Map<String, List<String>> getAttributeValuesOther(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathOther"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    //Rakhi S on 18.01.2023
    public List<DeathCertificate> searchCertificate(String id) {
		try {

            List<Object> preparedStmtValues = new ArrayList<>();
            String queryCert = queryBuilder.getDeathCertificateSearchQuery(id, preparedStmtValues, Boolean.FALSE);
            List<DeathCertificate> deathCerts = jdbcTemplate.query(queryCert, preparedStmtValues.toArray(), deathCertRowMapper);
			if (null != deathCerts && !deathCerts.isEmpty()) {				
                return deathCerts;
			}
            else{
                return deathCerts;
            }
		}catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("invalid_data","Invalid Data");
		}
		
	}
//RAkhi S on 23.01.2023
    public List<Map<String, Object>>  getDeathCertificate(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathCertIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return regDetails; 
     }
  public void updateCertificate(DeathCertRequest deathCertRequest) {
        producer.push(config.getUpdateDeathCertificateTopic(), deathCertRequest);
  }

}
