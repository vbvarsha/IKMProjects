package org.ksmart.marriage.marriageapplication.repository;

// import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.common.producer.BndProducer;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.contract.EncryptionDecryptionUtil;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
//import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDocument;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WitnessDetails;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageApplicationRowMapper;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageDocumentRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;

import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class MarriageApplicationRepository {
    private final MarriageProducer producer;
    private final MarriageApplicationQueryBuilder marriageQueryBuilder;
    private final MarriageApplicationRowMapper marriageApplicationRowMapper;
    private final JdbcTemplate jdbcTemplate;
    private final MarriageDocumentRowMapper marriagedocumentRowMapper;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    @Autowired
    MarriageMdmsUtil util;
    
    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration,
                                         JdbcTemplate jdbcTemplate, 
                                         MarriageApplicationQueryBuilder marriageQueryBuilder,
                                         MarriageApplicationRowMapper marriageApplicationRowMapper,
                                         MarriageDocumentRowMapper marriagedocumentRowMapper) {
        this.producer = producer;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.marriagedocumentRowMapper = marriagedocumentRowMapper;
    }
    //Jasmine 31.03.2023

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        if (preparedStmtValues.size() == 0) {
            throw new CustomException(ErrorCodes.NOT_FOUND.getCode(), "No result found.");
        } else {
            List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
            if (result != null) {
                result.forEach(marriage -> {
//Jasmine 03.05.2023 - MDMS for Summery Page
                    Object mdmsData = util.mDMSSearch(requestInfo, marriage.getTenantid());
                    //WARD DETAILS-MDMS Location Call
                    Object mdmsDataLocation = util.mdmsCallForLocation(requestInfo, marriage.getTenantid());

                    //   Marriage DistrictId
                    if (marriage.getDistrictid() != null) {
                        String marriageDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getDistrictid());
                        marriage.setMarriageDistrictEn(marriageDistNameEn);

                        String marriageDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getDistrictid());
                        marriage.setMarriageDistrictMl(marriageDistNameMl);
                    }
                    //Marriage Village
                    if (marriage.getVillageId() != null) {
                        String marriageVillageEn = util.getVillageNameEn(mdmsData, marriage.getVillageId());
                        marriage.setMarriageVillageNameEn(marriageVillageEn);

                        String marriageVillageMl = util.getVillageNameMl(mdmsData, marriage.getVillageId());
                        marriage.setMarriageVillageNameMl(marriageVillageMl);
                    }
                    if (marriage.getVillageName() != null) {
                        String marriageVillageEn = util.getVillageNameEn(mdmsData, marriage.getVillageName());
                        marriage.setMarriageVillageNameEn(marriageVillageEn);

                        String marriageVillageMl = util.getVillageNameMl(mdmsData, marriage.getVillageName());
                        marriage.setMarriageVillageNameMl(marriageVillageMl);
                    }
                    //Marriage Taluk
                    if (marriage.getTalukid() != null) {
                        String marriageTalukNameEn = util.getTalukNameEn(mdmsData, marriage.getTalukid());
                        marriage.setMarriageTalukNameEn(marriageTalukNameEn);

                        String marriageTalukNameMl = util.getTalukNameMl(mdmsData, marriage.getTalukid());
                        marriage.setMarriageTalukNameMl(marriageTalukNameMl);
                    }

                    //Marriage LB Type
                    if (marriage.getLbtype() != null) {
                        String marriageLBtypeEn = util.getMarriageLbtypeEn(mdmsData, marriage.getLbtype());
                        marriage.setMarriageLBtypeEn(marriageLBtypeEn);

                        String marriageLBtypeMl = util.getMarriageLbtypeMl(mdmsData, marriage.getLbtype());
                        marriage.setMarriageLBtypeMl(marriageLBtypeMl);
                    }
                    //Marriage Place Type name
                   if (marriage.getPlacetype() != null) {
                        String marriagePlaceTypenameEn = util.getPlaceTypeNameEn(mdmsData, marriage.getPlacetype());
                        marriage.setMarriagePlaceTypenameEn(marriagePlaceTypenameEn);

                        String marriagePlaceTypenameMl = util.getPlaceTypeNameMl(mdmsData, marriage.getPlacetype());
                        marriage.setMarriagePlaceTypenameMl(marriagePlaceTypenameMl);
                    }
                    //Marriage Type name
                    if (marriage.getMarriageType() != null) {
                        String marriageTypeEn = util.getMarriageTypeEn(mdmsData, marriage.getMarriageType());
                        marriage.setMarriageTypeEn(marriageTypeEn);

                        String marriageTypeMl = util.getMarriageTypeMl(mdmsData, marriage.getMarriageType());
                        marriage.setMarriageTypeMl(marriageTypeMl);
                    }
                    //Marriage WardCode
                    if (marriage.getWardCode() != null) {
                        String marriageWardCodeEn = util.getWardNameEn(mdmsDataLocation, marriage.getWardCode());
                        marriage.setMarriageWardCodeEn(marriageWardCodeEn);

                        String marriageWardCodeMl = util.getWardNameMl(mdmsDataLocation, marriage.getWardCode());
                        marriage.setMarriageWardCodeMl(marriageWardCodeMl);
                    }
                    //Marriage PlaceId
                    if (marriage.getPlaceid() != null) {
                        String marriagePlaceIdEn = util.getMarriagePlaceIdEn(mdmsDataLocation, marriage.getPlaceid());
                        marriage.setMarriagePlaceIdEn(marriagePlaceIdEn);

                        String marriagePlaceIdMl = util.getMarriagePlaceIdMl(mdmsDataLocation, marriage.getPlaceid());
                        marriage.setMarriagePlaceIdMl(marriagePlaceIdMl);
                    }
//PRESENT ADDRESS DETAILS -BRIDE
System.out.println("InsideCountry and state!=null"+marriage.getBrideAddressDetails().getCountryIdPresent());
System.out.println("InsideCountry and state!=null"+marriage.getBrideAddressDetails().getStateIdPresent());
                    if (marriage.getBrideAddressDetails().getCountryIdPresent()!=null && marriage.getBrideAddressDetails().getStateIdPresent()!=null){
                       //INSIDE INDIA
                       System.out.println("InsideCountry and state!=null");
                        if (marriage.getBrideAddressDetails().getCountryIdPresent().equals(MarriageConstants.COUNTRY_CODE)){
                            System.out.println("InsideCountry!=null"+marriage.getBrideAddressDetails().getCountryIdPresent());
                            //INSIDE KERALA-PRESENT
                            if (marriage.getBrideAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)){
                                System.out.println("Insidestate!=null"+marriage.getBrideAddressDetails().getStateIdPresent());
                                //PRESENT-INSIDE INDIA-INSIDE KERALA
                                marriage.getBrideAddressDetails().setPresentaddressCountry(marriage.getBrideAddressDetails().getCountryIdPresent());
                                 
                                if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                                }
                                //PRESENT-STATE
                                   marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                                }
                                //PRESENT-DISTRICT
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaDistrict(marriage.getBrideAddressDetails().getDistrictIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict() != null) {
                                    String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
            
                                    String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                                }
                               // PRESENT-TALUK
                               
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk() != null) {
                                    String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                                    String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                                }
                                //PRESENT-VILLAGE
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaVillage() != null) {
                                    String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaVillage());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);

                                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaVillage());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
                                }
                                //PRESENT -WARD
                                if (marriage.getBrideAddressDetails().getPresentWardNo() != null) {
                                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getBrideAddressDetails().getPresentWardNo());
                                    marriage.getBrideAddressDetails().setPresentWardNoEn(presentWardNoEn);

                                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getBrideAddressDetails().getPresentWardNo());
                                    marriage.getBrideAddressDetails().setPresentWardNoMl(presentWardNoMl);
                                }
                                //PRESENT-POST OFFICE
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice() != null) {
                                    String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                                    String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                                }

                                marriage.getBrideAddressDetails().setPresentInsideKeralaLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPresent());
                                marriage.getBrideAddressDetails().setPresentInsideKeralaLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentInsideKeralaStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPresent());
                                marriage.getBrideAddressDetails().setPresentInsideKeralaStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentInsideKeralaHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPresent());
                                marriage.getBrideAddressDetails().setPresentInsideKeralaHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentInsideKeralaPincode(marriage.getBrideAddressDetails().getPinNoPresent());


                            }
                            //OUTSIDE KERALA-PRESENT
                            else{
                                //PRESENT-COUNTRY
                                marriage.getBrideAddressDetails().setPresentaddressCountry(marriage.getBrideAddressDetails().getCountryIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                                }
                                //PRESENT-STATE
                                marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                                }
                                
                                //PRESENT-OUTSIDE KERALA-DISTRICT
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrict(marriage.getBrideAddressDetails().getDistrictIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict() != null) {
                                    String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                                    String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                                }

                                marriage.getBrideAddressDetails().setPresentOutsideKeralaVillageName(marriage.getBrideAddressDetails().getVillageNamePresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaTalukName(marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());

                                marriage.getBrideAddressDetails().setPresentOutsideKeralaLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaCityVilgeEn(marriage.getBrideAddressDetails().getTownOrVillagePresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaPincode(marriage.getBrideAddressDetails().getPinNoPresent());

                            }
                        }
                        //OUTSIDE INDIA
                        else{
                            //PRESENT-OUTSIDE COUNTRY
                            marriage.getBrideAddressDetails().setPresentOutSideCountry(marriage.getBrideAddressDetails().getCountryIdPresent());
                            if (marriage.getBrideAddressDetails().getPresentOutSideCountry() != null) {
                                String presentOutSideCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutSideCountry());
                                marriage.getBrideAddressDetails().setPresentOutSideCountryNameEn(presentOutSideCountryNameEn);

                                String presentOutSideCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutSideCountry());
                                marriage.getBrideAddressDetails().setPresentOutSideCountryNameMl(presentOutSideCountryNameMl);
                            }
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaadrsVillage(marriage.getBrideAddressDetails().getVillageNamePresent());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaadrsCityTown(marriage.getBrideAddressDetails().getTownOrVillagePresent());
                            
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaPostCode(marriage.getGroomAddressDetails().getOutSideIndiaPostCodePresent());

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressEn());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressMl());

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressEnB());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressMlB());

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOthrIndiaProvinceEn());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOthrIndiaProvinceMl());
                        }
                    }
                   // PERMANENT ADDRESS DETAILS -BRIDE
                    if (marriage.getBrideAddressDetails().getCountryIdPermanent()!=null && marriage.getBrideAddressDetails().getStateIdPermanent()!=null){
                        //INSIDE INDIA
                        if (marriage.getBrideAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)){
                            //INSIDE KERALA-PERMANENT
                            if (marriage.getBrideAddressDetails().getStateIdPermanent().equals(MarriageConstants.STATE_CODE_SMALL)){
                            //PERMANENT-COUNTRY
                               marriage.getBrideAddressDetails().setPermtaddressCountry(marriage.getBrideAddressDetails().getCountryIdPermanent());
                               if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                                String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                                String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                               }
                            //PERMANENT-STATE
                               marriage.getBrideAddressDetails().setPermtaddressStateName(marriage.getBrideAddressDetails().getStateIdPermanent());
                               if (marriage.getBrideAddressDetails().getPermtaddressStateName() != null) {
                                String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                marriage.getBrideAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                                String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                marriage.getBrideAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                              }
                            //PERMANENT-DISTRICT
                            marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrict(marriage.getBrideAddressDetails().getDistrictIdPermanent());
                            if (marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict() != null) {
                                String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                                String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                              }
                            //PERMANENT-TALUK 
                            if (marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk() != null) {
                                String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                                String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                            }
                            //PERMANENT-VILLAGE 
                            if (marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage() != null) {
                                String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                                String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                            }
                            //PERMANENT-POSTOFFICE 
                            marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOffice(marriage.getBrideAddressDetails().getPoNoPermanent());
                            if (marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                                String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                                String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                            }
                            //PERMANENT-WARD 
                            if (marriage.getBrideAddressDetails().getPermntInKeralaWardNo() != null) {
                                String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getBrideAddressDetails().getPermntInKeralaWardNo());
                                marriage.getBrideAddressDetails().setPrmttWardNoEn(prmttWardNoEn);

                                String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getBrideAddressDetails().getPermntInKeralaWardNo());
                                marriage.getBrideAddressDetails().setPrmttWardNoMl(prmttWardNoMl);
                            }
                            marriage.getBrideAddressDetails().setPermntInKeralaAdrLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPermanent());
                            marriage.getBrideAddressDetails().setPermntInKeralaAdrLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPermanent());

                            marriage.getBrideAddressDetails().setPermntInKeralaAdrStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPermanent());
                            marriage.getBrideAddressDetails().setPermntInKeralaAdrStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPermanent());

                            marriage.getBrideAddressDetails().setPermntInKeralaAdrHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPermanent());
                            marriage.getBrideAddressDetails().setPermntInKeralaAdrHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPermanent());

                            marriage.getBrideAddressDetails().setPermntInKeralaAdrPincode(marriage.getBrideAddressDetails().getPinNoPermanent());

                        }
                        //PERMANENT-INSIDE INDIA-OUTSIDE KERALA
                        else{
                            //PERMANENT-COUNTRY
                            marriage.getBrideAddressDetails().setPermtaddressCountry(marriage.getBrideAddressDetails().getCountryIdPermanent());
                            if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                             String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                             marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                             String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                             marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                            }
                            //PERMANENT-STATE
                            marriage.getBrideAddressDetails().setPermtaddressStateName(marriage.getBrideAddressDetails().getStateIdPermanent());
                            if (marriage.getBrideAddressDetails().getPermtaddressStateName() != null) {
                             String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                             marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                             String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                             marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                            }
                            //PERMANENT-DISTRICT
                            if (marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict() != null) {
                                String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                                String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                            }
                            marriage.getBrideAddressDetails().setPermntOutsideKeralaVillage(marriage.getBrideAddressDetails().getVillageNamePermanent());
                            marriage.getBrideAddressDetails().setPermntOutsideKeralaTaluk(marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());

                            marriage.getBrideAddressDetails().setPermntOutsideKeralaLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPermanent());
                            marriage.getBrideAddressDetails().setPermntOutsideKeralaLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPermanent());

                            marriage.getBrideAddressDetails().setPresentOutsideKeralaStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPermanent());
                            marriage.getBrideAddressDetails().setPresentOutsideKeralaStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPermanent());

                            marriage.getBrideAddressDetails().setPresentOutsideKeralaHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPermanent());
                            marriage.getBrideAddressDetails().setPresentOutsideKeralaHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPermanent());

                            marriage.getBrideAddressDetails().setPermntOutsideKeralaCityVilgeEn(marriage.getBrideAddressDetails().getTownOrVillagePermanent());
                            marriage.getBrideAddressDetails().setPermntOutsideKeralaPincode(marriage.getBrideAddressDetails().getPinNoPermanent());

                            marriage.getBrideAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriage.getBrideAddressDetails().getTownOrVillagePermanent());
                            marriage.getBrideAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriage.getBrideAddressDetails().getPinNoPermanent());
                            
                        }
                    }
                    //PERMANENT-OUTSIDE INDIA
                    else{

                        if (marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry() != null) {
                            String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                            marriage.getBrideAddressDetails().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);

                            String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                            marriage.getBrideAddressDetails().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                        }
                        marriage.getBrideAddressDetails().setPresentOutSideIndiaadrsVillage(marriage.getBrideAddressDetails().getVillageNamePermanent());
                        marriage.getBrideAddressDetails().setPresentOutSideIndiaadrsCityTown(marriage.getBrideAddressDetails().getTownOrVillagePermanent());
                        
                        marriage.getBrideAddressDetails().setPresentOutSideIndiaPostCode(marriage.getGroomAddressDetails().getOutSideIndiaPostCodePermanent());

                        marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressEn(marriage.getGroomAddressDetails().getPermntOthrIndiaLineoneEn());
                        marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressMl(marriage.getGroomAddressDetails().getPermntOthrIndiaLineoneMl());

                        marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressEnB(marriage.getGroomAddressDetails().getPermntOthrIndiaLinetwoEn());
                        marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressMlB(marriage.getGroomAddressDetails().getPermntOthrIndiaLinetwoMl());

                        marriage.getBrideAddressDetails().setPresentOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPermntOthrIndiaprovinceEn());
                        marriage.getBrideAddressDetails().setPresentOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPermntOthrIndiaprovinceMl());

                    }
                }

                    GroomDetails groomDetails = marriage.getGroomDetails();
                    GroomDetails groomDetailsDec = encryptionDecryptionUtil.decryptObject(groomDetails, "BndDetail", GroomDetails.class, requestInfo);
                    groomDetails.setAadharno(groomDetailsDec.getAadharno());
                    if (groomDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {

                        groomDetails.setMotherAadharno(groomDetailsDec.getMotherAadharno());
                        groomDetails.setFatherAadharno(groomDetailsDec.getFatherAadharno());
                    } else if (groomDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                        groomDetails.setGuardianAadharno(groomDetailsDec.getGuardianAadharno());
                    }
                    BrideDetails brideDetails = marriage.getBrideDetails();
                    BrideDetails brideDetailsDec = encryptionDecryptionUtil.decryptObject(brideDetails, "BndDetail", BrideDetails.class, requestInfo);
                    brideDetails.setAadharno(brideDetailsDec.getAadharno());
                    if (brideDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {
                        brideDetails.setMotherAadharno(brideDetailsDec.getMotherAadharno());
                        brideDetails.setFatherAadharno(brideDetailsDec.getFatherAadharno());
                    } else if (brideDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                        brideDetails.setGuardianAadharno(brideDetailsDec.getGuardianAadharno());
                    }
                    WitnessDetails witnessDetails = marriage.getWitnessDetails();
                    WitnessDetails witnessDetailsDec = encryptionDecryptionUtil.decryptObject(witnessDetails, "BndDetail", WitnessDetails.class, requestInfo);
                    witnessDetails.setWitness1AadharNo(witnessDetailsDec.getWitness1AadharNo());
                    witnessDetails.setWitness2AadharNo(witnessDetailsDec.getWitness2AadharNo());
                    criteria.setApplicationType(marriage.getApplicationtype());
                    criteria.setApplicationNo(marriage.getApplicationNumber());
                    criteria.setTenantId(marriage.getTenantid());
                    List<MarriageDocument> completeDocumentDetails = getDocumentSearchDetails(criteria, requestInfo);
                    marriage.setMarriageDocuments(completeDocumentDetails);
                });
            }
            return result;
        }
    }

        public List<MarriageDocument> getDocumentDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageDocumentQuery( criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagedocumentRowMapper);
            return result;
        }   

        public List<MarriageDocument> getDocumentSearchDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageDocumentSearchQuery( criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagedocumentRowMapper); 
            return result;
        }  

        public List<MarriageApplicationDetails> getMarriageApplication(MarriageApplicationSearchCriteria criteria, RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
            return result;
        }

        public int getMarriageCount(MarriageApplicationSearchCriteria criteria) {
            List<Object> preparedStmtList = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageCountQuery(criteria, preparedStmtList, Boolean.FALSE);
          // System.out.println("searchQuery"+query);
            int MarriageCount = jdbcTemplate.queryForObject(query,preparedStmtList.toArray(),Integer.class);
            return MarriageCount;
        }

    }
