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

@Schema(description = "Sub function master data details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubFunctionDetails {

    @Schema(type = "string", format = "uuid", description = "Sub function id")
    @Size(max = 64, message = "Sub function id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Sub function code")
    @NotBlank(message = "Sub function code is required")
    @Size(max = 20, message = "Sub function code length cannot exceed 20 characters")
    @JsonProperty("subFunctionCode")
    private String subFunctionCode;

    @Schema(type = "string", format = "uuid", description = "Major function id")
    @NotBlank(message = "Major function id is required")
    @Size(max = 64, message = "Major function id length cannot exceed 64 characters")
    @JsonProperty("majorFunctionId")
    private String majorFunctionId;

    @Schema(type = "string", description = "Sub function name english")
    @NotBlank(message = "Sub function name in english is required")
    @Size(max = 64, message = "Sub function name english length cannot exceed 64 characters")
    @JsonProperty("subFunctionNameEnglish")
    private String subFunctionNameEnglish;

    @Schema(type = "string", description = "Sub function name malayalam")
    @NotBlank(message = "Sub function name in malayalam is required")
    @Size(max = 64, message = "Sub function name malayalam length cannot exceed 64 characters")
    @JsonProperty("subFunctionNameMalayalam")
    private String subFunctionNameMalayalam;

    @Schema(type = "string", description = "status")
    @Size(max = 10, message = "status length cannot exceed 10 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
