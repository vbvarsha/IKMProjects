package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.REQUIRED;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ServiceDetailsRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;

@Component
public class ServiceDetailsValidator {

    /**
     * Validate create.
     *
     * @param request the request
     */
    public void validateCreate(ServiceDetailsRequest request) {
        if (CollectionUtils.isEmpty(request.getServiceDetails())) {
            throw new CustomException(REQUIRED.getCode(), "Atleast one applicant service is required.");
        }
    }

    /**
     * Validate update.
     *
     * @param request      the {@link ServiceDetailsRequest}
     * @param searchResult the search result
     */
    public void validateUpdate(ServiceDetailsRequest request, List<ApplicantServiceDetail> searchResult) {
        List<ApplicantServiceDetail> applicantServices = request.getServiceDetails();

        if (CollectionUtils.isEmpty(applicantServices)) {
            throw new CustomException(REQUIRED.getCode(), "Atleast one applicant service is required.");
        }

        if (applicantServices.size() != searchResult.size()) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Applicant Service(s) not found in database.");
        }
    }

}
