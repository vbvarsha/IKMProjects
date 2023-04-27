package org.egov.filemgmnt.web.models.GlobalMaster;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Sub function response for create and update")
@Validated

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubFunctionDetailsResponse {
    @JsonProperty("RequestInfo")
    ResponseInfo responseInfo;

    @JsonProperty("SubFunctionDetails")
    private SubFunctionDetails subFunctionDetails;
}
