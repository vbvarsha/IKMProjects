package org.egov.filemgmnt.web.models.GlobalMaster;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "Major Function search results")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorFunctionSearchResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("MajorFunctionDetails")
    private List<MajorFunctionDetails> majorFunctionDetails;

    public MajorFunctionSearchResponse addMFDetails(final MajorFunctionDetails majorFunctionDetail) {
        if (majorFunctionDetails == null) {
            majorFunctionDetails = new ArrayList<>();
        }
        majorFunctionDetails.add(majorFunctionDetail);
        return this;
    }

}
