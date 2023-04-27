package org.egov.filemgmnt.web.models.masterdata;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Service master data details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceDetails {

    @Schema(type = "string", format = "uuid", description = "Service details id")
    @Size(max = 64, message = "Service details id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Service code")
    @NotBlank(message = "Service code is required")
    @Size(max = 20, message = "Service details code length cannot exceed 20 characters")
    @JsonProperty("serviceCode")
    private String serviceCode;

    @Schema(type = "string", format = "uuid", description = "Sub function id")
    @NotBlank(message = "Sub function id is required")
    @Size(max = 64, message = "Sub function id length cannot exceed 64 characters")
    @JsonProperty("subFunctionId")
    private String subFunctionId;

    @Schema(type = "string", description = "Service name english")
    @NotBlank(message = "Service name in english is required")
    @Size(max = 64, message = "Service name english length cannot exceed 64 characters")
    @JsonProperty("serviceNameEnglish")
    private String serviceNameEnglish;

    @Schema(type = "string", description = "Service name malayalam")
    @NotBlank(message = "Service name in malayalam is required")
    @Size(max = 64, message = "Service name malayalam length cannot exceed 64 characters")
    @JsonProperty("serviceNameMalayalam")
    private String serviceNameMalayalam;

    @Schema(type = "string", description = "status")
    @Size(max = 10, message = "status length cannot exceed 10 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
