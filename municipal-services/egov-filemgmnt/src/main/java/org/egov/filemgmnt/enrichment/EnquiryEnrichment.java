package org.egov.filemgmnt.enrichment;

import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.enquiry.EnquiryRequest;
import org.springframework.stereotype.Component;

@Component
public class EnquiryEnrichment extends BaseEnrichment {

    public void enrichCreate(final EnquiryRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getEnquiryList()
               .forEach(enquiry -> {
                   enquiry.setId(UUID.randomUUID()
                                     .toString());
                   enquiry.setAuditDetails(auditDetails);
               });

    }

}
