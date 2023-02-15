package org.ksmart.death.deathregistry.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import java.util.List;
import javax.swing.text.Document;
/*
     * Creates main model class  
     * Jasmine on 7.02.2023      
*/

@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryDtl {


     @JsonProperty("InformationDeath")
     private DeathRegistryBasicInfo deathBasicInfo;

    @JsonProperty("AddressOfDeceased")
    private DeathRegistryAddressInfo deathAddressInfo;    

    @JsonProperty("FamilyInformationDeath")
    private DeathRegistryFamilyInfo deathFamilyInfo;

    @JsonProperty("StatisticalInfo")
    private DeathRegistryStatisticalInfo  deathStatisticalInfo;

    @JsonProperty("InformantDetails")
    private DeathRegistryInformantDtls deathInformantDtls;

    @JsonProperty("AuditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("applicationType")
    private String applicationType;

    @JsonProperty("applicationStatus")
    private String applicationStatus;

    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("action")
    private String action;

    @JsonProperty("assignee")
    private List<String> assignees;

    @JsonProperty("workflowcode")
    private String workflowcode;

    private String assignuser;
    private String comment;
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;
    public void setStatus(String s) {
    }
}