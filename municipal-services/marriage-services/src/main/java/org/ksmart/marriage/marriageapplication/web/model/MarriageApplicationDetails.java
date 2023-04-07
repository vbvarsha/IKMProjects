package org.ksmart.marriage.marriageapplication.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.*;
//import org.ksmart.marriage.common.model.AuditDetails;
//import org.ksmart.marriage.common.model.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import javax.swing.text.Document;
import javax.validation.Valid;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationDetails {

    @NotNull
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @JsonProperty("marriageDOM")
    private Long dateofmarriage;

    @JsonProperty("marriageDOR")
    private Long dateofreporting;



    @Size(max = 64)
    @JsonProperty("marriageDistrictid")
    private String districtid;

    @Size(max = 64)
    @JsonProperty("marriageLBtype")
    private String lbtype;


    @Size(max = 64)
    @JsonProperty("marriageTenantid")
    private String tenantid;

    @Size(max = 64)
    @JsonProperty("marriagePlacetype")
    private String placetype;

    @Size(max = 1000)
    @JsonProperty("marriagePlacenameEn")
    private String placenameEn;
    @Size(max = 1000)
    @JsonProperty("marriagePlacenameMl")
    private String placenameMl;

    @Size(max = 64)
    @JsonProperty("marriageWardCode")
    private String wardCode;


    @Size(max = 1000)
    @JsonProperty("marriageStreetEn")
    private String streetNameEn;

    @Size(max = 1000)
    @JsonProperty("marriageStreetMl")
    private String streetNameMl;

    @Size(max = 64)
    @JsonProperty("marriageTalukID")
    private String talukid;

    @Size(max = 64)
    @JsonProperty("marriageVillageName")
    private String villageName;

    @Size(max = 1000)
    @JsonProperty("marriageLandmark")
    private String landmark;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityEn")
    private String localityEn;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityMl")
    private String localityMl;

    @Size(max = 64)
    @JsonProperty("marriageType")
    private String marriageType;

    @Size(max = 200)
    @JsonProperty("othMarriageType")
    private String othMarriageType;

    @Size(max = 64)
    @JsonProperty("registrationNo")
    private String registrationNo;

    @JsonProperty("registrationDate")
    private Long registrationDate;

    @Size(max = 1000)
    @JsonProperty("placeid")
    private String placeid;

    @Size(max = 2500)
    @JsonProperty("marriageHouseNoAndNameEn")
    private String marriageHouseNoAndNameEn;
    @Size(max = 2500)
    @JsonProperty("marriageHouseNoAndNameMl")
    private String marriageHouseNoAndNameMl;

    @Size(max = 64)
    @JsonProperty("applicationNumber")
    private String applicationNumber;
    
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("BrideDetails")
    private BrideDetails brideDetails;

    @JsonProperty("GroomDetails")
    private GroomDetails groomDetails;
    
    @JsonProperty("BrideAddressDetails")
    private BrideAddressDetails brideAddressDetails;

    @JsonProperty("GroomAddressDetails")
    private GroomAddressDetails groomAddressDetails;

    @JsonProperty("WitnessDetails")
    private WitnessDetails witnessDetails;

    //Workflow 29/03.2023 Jasmine
    @Size(max = 64)
    @JsonProperty("action")
    private String action;

    @Size(max = 64)
    @JsonProperty("status")
    private String status;

    @Size(max = 64)
    @JsonProperty("villageId")
    private String villageId;

    @Size(max = 1000)
    @JsonProperty("talukName")
    private String talukName;

    @JsonProperty("assignee")
    private List<String> assignees;

    
    @NotNull
    @Size(max = 64)
    @JsonProperty("applicationType")
    private String applicationtype;

    @JsonProperty("modulecode")
    private String modulecode;

    @NotNull
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessservice;

    @NotNull
    @Size(max = 64)
    @JsonProperty("workflowCode")
    private String workflowcode;

    @JsonProperty("isWorkflow")
    private boolean isWorkflow;

    private String assignuser;

    // @Size(max = 200)
    // @JsonProperty("brideurl")
    // private String brideurl;

    // @Size(max = 200)
    // @JsonProperty("groomurl")
    // private String groomurl;

    // @Size(max = 64)
    // @JsonProperty("imageuuid")
    // private String imageuuid;

    // @Size(max = 256)
    // @JsonProperty("brideFilestoreid")
    // private String brideFilestoreid;

    // @Size(max = 256)
    // @JsonProperty("groomFilestoreid")
    // private String groomFilestoreid;

    // @JsonProperty("brideExpired")
    // private String brideExpired;

    // @JsonProperty("groomExpired")
    // private String groomExpired;

    @Size(max = 128)
    // @Html
    private String comment;

    @Valid
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;

    @JsonProperty("MarriageDocuments")
    @Valid
    private List<MarriageDocument> MarriageDocuments = null;

    // public void setStatus(String s) {
    // }

}

