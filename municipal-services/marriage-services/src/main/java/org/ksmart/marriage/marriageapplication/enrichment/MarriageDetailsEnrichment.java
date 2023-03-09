package org.ksmart.marriage.marriageapplication.enrichment;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.common.repository.IdGenRepository;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.utils.IDGenerator;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.enums.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.IdGenerator;

import java.util.List;
import java.util.ListIterator;
import java.util.UUID;
@Component
public class MarriageDetailsEnrichment implements BaseEnrichment {
    @Autowired
    MarriageApplicationConfiguration config;
    @Autowired
    IdGenRepository idGenRepository;
    @Autowired
    IDGenerator idGenerator;

    public void enrichCreate(MarriageDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getMarriageDetails().forEach(marriage -> {

            marriage.setId(UUID.randomUUID().toString());

            marriage.setAuditDetails(auditDetails);
            marriage.getBrideDetails().setId(UUID.randomUUID().toString());
            marriage.getGroomDetails().setId(UUID.randomUUID().toString());
            marriage.getPermanent().setId(UUID.randomUUID().toString());
            marriage.getPresent().setId(UUID.randomUUID().toString());
            marriage.getWitness().setId(UUID.randomUUID().toString());

        });
        setApplicationNumbers(request);


    }

    private void setApplicationNumbers(MarriageDetailsRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<MarriageApplicationDetail> marriageDetails = request.getMarriageDetails();
        String tenantId = marriageDetails.get(0)
                .getTenantid();
        List<String> filecodes = getIds(requestInfo,
                tenantId,
                config.getMarriageApplNumberIdName(),
                request.getMarriageDetails().get(0).getApplicationtype(),
                "AK",
                marriageDetails.size());
        validateFileCodes(filecodes, marriageDetails.size());

        ListIterator<String> itr = filecodes.listIterator();
        request.getMarriageDetails()
                .forEach(marriage -> {
                    marriage.setApplicationnumber(itr.next());
                });
    }




//        private void setApplicationNumbers(MarriageDetailsRequest request) {
//            Long currentTime = Long.valueOf(System.currentTimeMillis());
//            String id = idGenerator.setIDGeneratorStill(request, MarriageConstants.FUN_MODULE_NEW,MarriageConstants.APP_NUMBER_CAPTION);
//            request.getMarriageDetails()
//                    .forEach(marriage -> {
//                        marriage.setApplicationnumber(id);
//                        marriage.
//                    setDateofreporting(currentTime);
//                    });
//        }



    public void enrichUpdate(MarriageDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        request.getMarriageDetails()
                .forEach(marriage -> marriage.setAuditDetails(auditDetails));
    }

    private List<String> getIds(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String fnType, int count) {
        return idGenRepository.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
    }

    private void validateFileCodes(List<String> fileCodes, int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(ErrorCodes.IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

    }
}
