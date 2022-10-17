package org.egov.filemgmnt.web.models;

import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the  data for a Service Document Details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantServiceDocuments {

    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Size(max = 64)
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Size(max = 64)
    @JsonProperty("serviceDetailsId")
    private String serviceDetailsId;

    @Size(max = 64)
    @JsonProperty("documentTypeId")
    private String documentTypeId;

    @Size(max = 64)
    @JsonProperty("fileStoreId")
    private String fileStoreId;

    @Size(max = 64)
    @JsonProperty("active")
    private String active;

    @Size(max = 64)
    @JsonProperty("documentNumber")
    private String documentNumber;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
