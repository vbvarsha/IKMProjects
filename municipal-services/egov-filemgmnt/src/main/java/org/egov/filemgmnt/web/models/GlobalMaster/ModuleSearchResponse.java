package org.egov.filemgmnt.web.models.GlobalMaster;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Module Serach Response")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModuleSearchResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ModuleDetails")
    private List<ModuleDetails> moduleDetails;

    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public ModuleSearchResponse addModuleDetails(final ModuleDetails moduleDetail) {
        if (moduleDetails == null) {
            moduleDetails = new ArrayList<>();
        }
        moduleDetails.add(moduleDetail);
        return this;
    }

}
