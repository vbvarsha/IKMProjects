package org.ksmart.birth.newbirth.repository;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.birth.birthregistry.model.RegisterBirthDetail;
import org.ksmart.birth.birthregistry.model.RegisterBirthDetailsRequest;
import org.ksmart.birth.birthregistry.repository.rowmapperforapplication.RegisterRowMapperForApp;
import org.ksmart.birth.birthregistry.service.MdmsDataService;
import org.ksmart.birth.common.producer.BndProducer;
import org.ksmart.birth.config.BirthConfiguration;
import org.ksmart.birth.newbirth.enrichment.NewBirthEnrichment;
import org.ksmart.birth.newbirth.repository.querybuilder.NewBirthQueryBuilder;
import org.ksmart.birth.newbirth.repository.rowmapper.BirthApplicationRowMapper;
import org.ksmart.birth.newbirth.service.MdmsForNewBirthService;
import org.ksmart.birth.utils.BirthConstants;
import org.ksmart.birth.utils.MdmsUtil;
import org.ksmart.birth.web.model.SearchCriteria;
import org.ksmart.birth.web.model.newbirth.NewBirthApplication;
import org.ksmart.birth.web.model.newbirth.NewBirthDetailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class NewBirthRepository {
    private final BndProducer producer;
    private final NewBirthEnrichment ksmartBirthEnrichment;
    private final BirthConfiguration birthDeathConfiguration;
    private final JdbcTemplate jdbcTemplate;
    private final NewBirthQueryBuilder birthQueryBuilder;
    private final BirthApplicationRowMapper ksmartBirthApplicationRowMapper;
    private final MdmsForNewBirthService mdmsBirthService;
    private final  MdmsUtil mdmsUtil;
    private final RegisterRowMapperForApp registerRowMapperForApp;



    @Autowired
    NewBirthRepository(JdbcTemplate jdbcTemplate, NewBirthEnrichment ksmartBirthEnrichment, BirthConfiguration birthDeathConfiguration,
                       BndProducer producer, NewBirthQueryBuilder birthQueryBuilder, BirthApplicationRowMapper ksmartBirthApplicationRowMapper,
                       MdmsForNewBirthService mdmsBirthService, MdmsUtil mdmsUtil, RegisterRowMapperForApp registerRowMapperForApp) {
        this.jdbcTemplate = jdbcTemplate;
        this.ksmartBirthEnrichment = ksmartBirthEnrichment;
        this.birthDeathConfiguration = birthDeathConfiguration;
        this.producer = producer;
        this.birthQueryBuilder = birthQueryBuilder;
        this.ksmartBirthApplicationRowMapper = ksmartBirthApplicationRowMapper;
        this.mdmsBirthService = mdmsBirthService;
        this.mdmsUtil = mdmsUtil;
        this.registerRowMapperForApp = registerRowMapperForApp;
    }

    public List<NewBirthApplication> saveKsmartBirthDetails(NewBirthDetailRequest request) {
        ksmartBirthEnrichment.enrichCreate(request);
        producer.push(birthDeathConfiguration.getSaveKsmartBirthApplicationTopic(), request);
        return request.getNewBirthDetails();
    }

    public List<NewBirthApplication> updateKsmartBirthDetails(NewBirthDetailRequest request) {
        ksmartBirthEnrichment.enrichUpdate(request);
        producer.push(birthDeathConfiguration.getUpdateKsmartBirthApplicationTopic(), request);
        return request.getNewBirthDetails();
    }
//
//    public String getBirthQuery(SearchCriteria criteria) {
//        List<Object> preparedStmtValues = new ArrayList<>();
//        String query = birthQueryBuilder.getNewBirthApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
//        return query;
//    }
public RegisterBirthDetailsRequest searchBirthDetailsForRegister(NewBirthDetailRequest requestApplication) {
    List<Object> preparedStmtValues = new ArrayList<>();
    RegisterBirthDetailsRequest request = new RegisterBirthDetailsRequest();
    RegisterBirthDetail register = new RegisterBirthDetail();
    SearchCriteria criteria = new SearchCriteria();
    if(requestApplication.getNewBirthDetails().size() > 0) {
        criteria.setApplicationNumber(requestApplication.getNewBirthDetails().get(0).getApplicationNo());
        criteria.setTenantId(requestApplication.getNewBirthDetails().get(0).getTenantId());

        String query = birthQueryBuilder.getApplicationSearchQueryForRegistry(criteria, preparedStmtValues);
        List<RegisterBirthDetail> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), registerRowMapperForApp);
    }
    return request;
//    List<NewBirthApplication> result = new ArrayList<>();
//    List<NewBirthApplication> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), ksmartBirthApplicationRowMapper);
//    String query = birthQueryBuilder.getNewBirthApplicationSearchQuery(criteria, request, preparedStmtValues, Boolean.FALSE);
//    List<NewBirthApplication> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), ksmartBirthApplicationRowMapper);
}

    public List<NewBirthApplication> searchKsmartBirthDetails(NewBirthDetailRequest request, SearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = birthQueryBuilder.getNewBirthApplicationSearchQuery(criteria, request, preparedStmtValues, Boolean.FALSE);
        List<NewBirthApplication> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), ksmartBirthApplicationRowMapper);
        result.forEach(birth -> {
            if(birth.getPlaceofBirthId()!=null){
                Object mdmsData = mdmsUtil.mdmsCallForLocation(request.getRequestInfo(), birth.getTenantId());
                mdmsBirthService.setLocationDetails(birth, mdmsData);
                Object mdmsDataComm = mdmsUtil.mdmsCall(request.getRequestInfo());
                mdmsBirthService.setInstitutionDetails(birth, mdmsDataComm);
            }
            if (birth.getParentAddress().getCountryIdPermanent() != null && birth.getParentAddress().getStateIdPermanent() != null) {
                if (birth.getParentAddress().getCountryIdPermanent().contains(BirthConstants.COUNTRY_CODE)) {
                    if (birth.getParentAddress().getStateIdPermanent().contains(BirthConstants.STATE_CODE_SMALL)) {
                        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());
                        mdmsBirthService.setTenantDetails(birth, mdmsData);
                        birth.getParentAddress().setPermtaddressCountry(birth.getParentAddress().getCountryIdPermanent());

                        birth.getParentAddress().setPermtaddressStateName(birth.getParentAddress().getStateIdPermanent());

                        birth.getParentAddress().setPermntInKeralaAdrDistrict(birth.getParentAddress().getDistrictIdPermanent());

                        birth.getParentAddress().setPermntInKeralaAdrLocalityNameEn(birth.getParentAddress().getLocalityEnPermanent());
                        birth.getParentAddress().setPermntInKeralaAdrLocalityNameMl(birth.getParentAddress().getLocalityMlPermanent());

                        birth.getParentAddress().setPermntInKeralaAdrStreetNameEn(birth.getParentAddress().getStreetNameEnPermanent());
                        birth.getParentAddress().setPermntInKeralaAdrStreetNameMl(birth.getParentAddress().getStreetNameMlPermanent());

                        birth.getParentAddress().setPermntInKeralaAdrHouseNameEn(birth.getParentAddress().getHouseNameNoEnPermanent());
                        birth.getParentAddress().setPermntInKeralaAdrHouseNameMl(birth.getParentAddress().getHouseNameNoMlPermanent());

                        birth.getParentAddress().setPermntInKeralaAdrPostOffice(birth.getParentAddress().getPoNoPermanent());

                    }else{
                        birth.getParentAddress().setPermtaddressCountry(birth.getParentAddress().getCountryIdPermanent());

                        birth.getParentAddress().setPermtaddressStateName(birth.getParentAddress().getStateIdPermanent());
                        birth.getParentAddress().setPermntOutsideKeralaDistrict(birth.getParentAddress().getDistrictIdPermanent());

                        birth.getParentAddress().setPermntOutsideKeralaVillage(birth.getParentAddress().getVillageNamePermanent());

                        birth.getParentAddress().setPermntOutsideKeralaLocalityNameEn(birth.getParentAddress().getLocalityEnPermanent());
                        birth.getParentAddress().setPermntOutsideKeralaLocalityNameMl(birth.getParentAddress().getLocalityMlPermanent());

                        birth.getParentAddress().setPermntOutsideKeralaStreetNameEn(birth.getParentAddress().getStreetNameEnPermanent());
                        birth.getParentAddress().setPermntOutsideKeralaStreetNameMl(birth.getParentAddress().getStreetNameMlPermanent());

                        birth.getParentAddress().setPermntOutsideKeralaHouseNameEn(birth.getParentAddress().getHouseNameNoEnPermanent());
                        birth.getParentAddress().setPermntOutsideKeralaHouseNameMl(birth.getParentAddress().getHouseNameNoMlPermanent());

                    }
                }else{
                    birth.getParentAddress().setPermntOutsideIndiaCountry(birth.getParentAddress().getCountryIdPermanent());
                    birth.getParentAddress().setPermntOutsideKeralaVillage(birth.getParentAddress().getVillageNamePermanent());
                }
            }
            if(birth.getParentAddress().getCountryIdPresent()!=null && birth.getParentAddress().getStateIdPresent()!=null) {
                if (birth.getParentAddress().getCountryIdPresent().contains(BirthConstants.COUNTRY_CODE)) {
                    if (birth.getParentAddress().getStateIdPresent().contains(BirthConstants.STATE_CODE_SMALL)) {

                        birth.getParentAddress().setPresentaddressCountry(birth.getParentAddress().getCountryIdPresent());

                        birth.getParentAddress().setPresentaddressStateName(birth.getParentAddress().getStateIdPresent());

                        birth.getParentAddress().setPresentInsideKeralaDistrict(birth.getParentAddress().getDistrictIdPresent());

                        birth.getParentAddress().setPresentInsideKeralaLBName(birth.getParentAddress().getPermntInKeralaAdrLBName());

                        //birth.getParentAddress().setPresentInsideKeralaVillage(birth.getParentAddress().getVillageNamePresent());

                        birth.getParentAddress().setPresentInsideKeralaLocalityNameEn(birth.getParentAddress().getLocalityEnPresent());
                        birth.getParentAddress().setPresentInsideKeralaLocalityNameMl(birth.getParentAddress().getLocalityMlPresent());

                        birth.getParentAddress().setPresentInsideKeralaStreetNameEn(birth.getParentAddress().getStreetNameEnPermanent());
                        birth.getParentAddress().setPresentInsideKeralaStreetNameMl(birth.getParentAddress().getStreetNameMlPermanent());

                        birth.getParentAddress().setPresentInsideKeralaHouseNameEn(birth.getParentAddress().getHouseNameNoEnPresent());
                        birth.getParentAddress().setPresentInsideKeralaHouseNameMl(birth.getParentAddress().getHouseNameNoMlPresent());

                        birth.getParentAddress().setPresentInsideKeralaPincode(birth.getParentAddress().getPinNoPresent());

                        //birth.getParentAddress().setPresentOutsideKeralaCityVilgeEn(birth.getParentAddress().getTownOrVillagePresent());

                        birth.getParentAddress().setPresentInsideKeralaPostOffice(birth.getParentAddress().getPresentInsideKeralaPostOffice());

                    }else{
                        birth.getParentAddress().setPresentaddressCountry(birth.getParentAddress().getCountryIdPresent());

                        birth.getParentAddress().setPresentaddressStateName(birth.getParentAddress().getStateIdPresent());

                        birth.getParentAddress().setPresentOutsideKeralaDistrict(birth.getParentAddress().getDistrictIdPresent());

                        birth.getParentAddress().setPresentOutsideKeralaVillageName(birth.getParentAddress().getVillageNamePresent());

                        birth.getParentAddress().setPresentOutsideKeralaPincode(birth.getParentAddress().getPinNoPresent());

                        birth.getParentAddress().setPresentOutsideKeralaLocalityNameEn(birth.getParentAddress().getLocalityEnPresent());
                        birth.getParentAddress().setPresentOutsideKeralaLocalityNameMl(birth.getParentAddress().getLocalityMlPresent());

                        birth.getParentAddress().setPresentOutsideKeralaStreetNameEn(birth.getParentAddress().getStreetNameEnPresent());
                        birth.getParentAddress().setPresentOutsideKeralaStreetNameMl(birth.getParentAddress().getStreetNameMlPresent());

                        birth.getParentAddress().setPresentOutsideKeralaHouseNameEn(birth.getParentAddress().getHouseNameNoEnPresent());
                        birth.getParentAddress().setPresentOutsideKeralaHouseNameMl(birth.getParentAddress().getHouseNameNoMlPresent());

                        birth.getParentAddress().setPresentOutsideKeralaCityVilgeEn(birth.getParentAddress().getTownOrVillagePresent());

                    }
                } else{
                    birth.getParentAddress().setPresentOutSideCountry(birth.getParentAddress().getCountryIdPresent());
                    birth.getParentAddress().setPresentOutSideIndiaadrsVillage(birth.getParentAddress().getVillageNamePresent());
                    birth.getParentAddress().setPresentOutSideIndiaadrsCityTown(birth.getParentAddress().getTownOrVillagePresent());
                }
            }
        });

        return result;
    }
}

