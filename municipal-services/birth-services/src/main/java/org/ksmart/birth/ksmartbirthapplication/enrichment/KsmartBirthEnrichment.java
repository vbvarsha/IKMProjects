package org.ksmart.birth.ksmartbirthapplication.enrichment;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.ksmart.birth.birthapplication.enrichment.BaseEnrichment;
import org.ksmart.birth.birthapplication.repository.querybuilder.BirthApplicationQueryBuilder;
import org.ksmart.birth.common.model.AuditDetails;
import org.ksmart.birth.config.BirthConfiguration;
import org.ksmart.birth.ksmartbirthapplication.model.newbirth.KsmartBirthDetailsRequest;
import org.ksmart.birth.utils.BirthConstants;
import org.ksmart.birth.utils.IDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class KsmartBirthEnrichment implements BaseEnrichment {
    @Autowired
    BirthConfiguration config;
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    BirthApplicationQueryBuilder birthApplicationQueryBuilder;

    @Autowired
    IDGenerator generator;

    public void enrichCreate(KsmartBirthDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getKsmartBirthDetails().forEach(birth -> {

            birth.setId(UUID.randomUUID().toString());

            birth.setAuditDetails(auditDetails);

            birth.setBirthPlaceUuid(UUID.randomUUID().toString());

            birth.getParentsDetails().setFatherUuid(UUID.randomUUID().toString());

            birth.getParentsDetails().setMotherUuid(UUID.randomUUID().toString());

            birth.getParentAddress().setPermanentUuid(UUID.randomUUID().toString());

            birth.getParentAddress().setPresentUuid(UUID.randomUUID().toString());

            birth.setBirthStatisticsUuid(UUID.randomUUID().toString());
            birth.setBirthInitiatorUuid(UUID.randomUUID().toString());

        });
        setApplicationNumbers(request);
        setFileNumbers(request);
        setPresentAddress(request);
        setPermanentAddress(request);
    }

    public void enrichUpdate(KsmartBirthDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        request.getKsmartBirthDetails()
                .forEach(birth -> birth.setAuditDetails(auditDetails));
        setRegistrationNumber(request);
        setPresentAddress(request);
        setPermanentAddress(request);
    }

    private void setApplicationNumbers(KsmartBirthDetailsRequest request) {
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String id = generator.setIDGenerator(request, BirthConstants.FUN_MODULE_NEW,BirthConstants.APP_NUMBER_CAPTION);
        request.getKsmartBirthDetails()
                .forEach(birth -> {
                    birth.setApplicationNo(id);
                    birth.setApplicationType("ACTIVE");
                    birth.setDateOfReport(currentTime);
                });
    }

    private void setFileNumbers(KsmartBirthDetailsRequest request) {
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String id = generator.setIDGenerator(request, BirthConstants.FUN_MODULE_NEW,BirthConstants.FILE_NUMBER_CAPTION);
        request.getKsmartBirthDetails()
                .forEach(birth -> {
                    birth.setFileNumber(id);
                    birth.setFileDate(currentTime);
                });
    }

    private void setRegistrationNumber(KsmartBirthDetailsRequest request) {
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String id = generator.setIDGenerator(request, BirthConstants.FUN_MODULE_NEW,BirthConstants.REGY_NUMBER_CAPTION);
        request.getKsmartBirthDetails()
                .forEach(birth -> {
                    if((birth.getStatus() == "APPROVED") && (birth.getAction() == "APPROVE")) {
                        birth.setRegistrationNo(id);
                        birth.setRegistrationDate(currentTime);
                    }
                });
    }

    private void setPresentAddress(KsmartBirthDetailsRequest request) {
        request.getKsmartBirthDetails()
                .forEach(birth -> {
                    if (birth.getParentAddress().getPresentaddressCountry().contains(BirthConstants.COUNTRY_CODE)) {
                        if(birth.getParentAddress().getPresentaddressStateName().contains(BirthConstants.STATE_CODE_SMALL)) {
                            birth.getParentAddress().setCountryIdPresent(birth.getParentAddress().getPresentaddressCountry());

                            birth.getParentAddress().setStateIdPresent(birth.getParentAddress().getPresentaddressStateName());

                            birth.getParentAddress().setDistrictIdPresent(birth.getParentAddress().getPresentInsideKeralaDistrict());

                            birth.getParentAddress().setLocalityEnPresent(birth.getParentAddress().getPresentInsideKeralaLocalityNameEn());
                            birth.getParentAddress().setLocalityMlPresent(birth.getParentAddress().getPresentInsideKeralaLocalityNameMl());

                            birth.getParentAddress().setStreetNameEnPresent(birth.getParentAddress().getPresentInsideKeralaStreetNameEn());
                            birth.getParentAddress().setStreetNameMlPresent(birth.getParentAddress().getPresentInsideKeralaStreetNameMl());

                            birth.getParentAddress().setHouseNameNoEnPresent(birth.getParentAddress().getPresentInsideKeralaHouseNameEn());
                            birth.getParentAddress().setHouseNameNoMlPresent(birth.getParentAddress().getPresentInsideKeralaHouseNameMl());
                            birth.getParentAddress().setPinNoPresent(birth.getParentAddress().getPresentInsideKeralaPincode());
                        } else{
                            birth.getParentAddress().setCountryIdPresent(birth.getParentAddress().getPresentaddressCountry());

                            birth.getParentAddress().setStateIdPresent(birth.getParentAddress().getPresentaddressStateName());

                            birth.getParentAddress().setDistrictIdPresent(birth.getParentAddress().getPresentOutsideKeralaDistrict());

                            birth.getParentAddress().setLocalityEnPresent(birth.getParentAddress().getPresentOutsideKeralaLocalityNameEn());
                            birth.getParentAddress().setLocalityMlPresent(birth.getParentAddress().getPresentOutsideKeralaLocalityNameMl());

                            birth.getParentAddress().setStreetNameEnPresent(birth.getParentAddress().getPresentOutsideKeralaStreetNameEn());
                            birth.getParentAddress().setStreetNameMlPresent(birth.getParentAddress().getPresentOutsideKeralaStreetNameMl());

                            birth.getParentAddress().setHouseNameNoEnPresent(birth.getParentAddress().getPresentOutsideKeralaHouseNameEn());
                            birth.getParentAddress().setHouseNameNoMlPresent(birth.getParentAddress().getPresentOutsideKeralaHouseNameMl());

                            birth.getParentAddress().setVillageNamePresent(birth.getParentAddress().getPresentOutsideKeralaVillageName());

                            birth.getParentAddress().setPinNoPresent(birth.getParentAddress().getPresentOutsideKeralaPincode());

                        }
                    } else{
                        birth.getParentAddress().setCountryIdPresent(birth.getParentAddress().getPresentOutSideCountry());
                        birth.getParentAddress().setVillageNamePresent(birth.getParentAddress().getPresentOutSideIndiaadrsVillage());
                    }
                });
    }
    private void setPermanentAddress(KsmartBirthDetailsRequest request) {
        request.getKsmartBirthDetails()
                .forEach(birth -> {
                    if (birth.getParentAddress().getPermtaddressCountry().contains(BirthConstants.COUNTRY_CODE)) {
                        if (birth.getParentAddress().getPermtaddressStateName().contains(BirthConstants.STATE_CODE_SMALL)) {
                            birth.getParentAddress().setCountryIdPermanent(birth.getParentAddress().getPermtaddressCountry());

                            birth.getParentAddress().setStateIdPermanent(birth.getParentAddress().getPermtaddressStateName());

                            birth.getParentAddress().setDistrictIdPermanent(birth.getParentAddress().getPermntInKeralaAdrDistrict());

                            birth.getParentAddress().setLocalityEnPermanent(birth.getParentAddress().getPermntInKeralaAdrLocalityNameEn());
                            birth.getParentAddress().setLocalityMlPermanent(birth.getParentAddress().getPermntInKeralaAdrLocalityNameMl());

                            birth.getParentAddress().setStreetNameEnPermanent(birth.getParentAddress().getPermntInKeralaAdrStreetNameEn());
                            birth.getParentAddress().setStreetNameMlPermanent(birth.getParentAddress().getPermntInKeralaAdrStreetNameMl());

                            birth.getParentAddress().setHouseNameNoEnPermanent(birth.getParentAddress().getPermntInKeralaAdrHouseNameEn());
                            birth.getParentAddress().setHouseNameNoMlPermanent(birth.getParentAddress().getPermntInKeralaAdrHouseNameMl());

                            birth.getParentAddress().setPinNoPermanent(birth.getParentAddress().getPermntInKeralaAdrPincode());
                        }else{
                            birth.getParentAddress().setCountryIdPermanent(birth.getParentAddress().getPermtaddressCountry());

                            birth.getParentAddress().setStateIdPermanent(birth.getParentAddress().getPermtaddressStateName());

                            birth.getParentAddress().setDistrictIdPermanent(birth.getParentAddress().getPermntOutsideKeralaDistrict());

                            birth.getParentAddress().setLocalityEnPermanent(birth.getParentAddress().getPermntOutsideKeralaLocalityNameEn());
                            birth.getParentAddress().setLocalityMlPermanent(birth.getParentAddress().getPermntOutsideKeralaLocalityNameMl());

                            birth.getParentAddress().setStreetNameEnPermanent(birth.getParentAddress().getPermntOutsideKeralaStreetNameEn());
                            birth.getParentAddress().setStreetNameMlPermanent(birth.getParentAddress().getPermntOutsideKeralaStreetNameMl());

                            birth.getParentAddress().setHouseNameNoEnPermanent(birth.getParentAddress().getPermntOutsideKeralaHouseNameEn());
                            birth.getParentAddress().setHouseNameNoMlPermanent(birth.getParentAddress().getPermntOutsideKeralaHouseNameMl());

                            birth.getParentAddress().setPinNoPermanent(birth.getParentAddress().getPermntOutsideKeralaPincode());
                        }

                    } else{
                        birth.getParentAddress().setCountryIdPresent(birth.getParentAddress().getPermntOutsideIndiaCountry());
                        birth.getParentAddress().setVillageNamePresent(birth.getParentAddress().getPresentOutSideIndiaadrsVillage());
                    }
                });
    }
}
