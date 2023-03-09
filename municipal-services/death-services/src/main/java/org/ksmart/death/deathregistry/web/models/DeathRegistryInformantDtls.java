package org.ksmart.death.deathregistry.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
/*
     * Creates main model class  
     * Jasmine on 7.02.2023      
*/
@Schema(name = "Death Registration Request", description = "An Object holds the  informant details of death ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryInformantDtls {

    // @Size(max = 64)
    // @JsonProperty("InitiatorRelation")
    // private String initiatorRelation ;

    // @JsonProperty("InitiatorAadhaar")
    // private String initiatorAadhaar ;

    // @JsonProperty("InitiatorName")
    // private String initiatorName ;

    // @JsonProperty("InitiatorMobile")
    // private String initiatorMobile ;

    @JsonProperty("InformantAadharNo")
    private String informantAadharNo ;

    @JsonProperty("InformantNameEn")
    private String informantNameEn ;

    @JsonProperty("DeathSignedOfficerDesignation")
    private String deathSignedOfficerDesignation ;

    @JsonProperty("InformantMobileNo")
    private Long informantMobileNo ;

    @JsonProperty("InformantAddress")
    private String informantAddress ;

    @JsonProperty("IsDeclarationInformant")
    private boolean isDeclarationInformant ;

    // @JsonProperty("InformantAddrId")
    // private String informantAddrId;

    // @JsonProperty("InformantAddrDeathDtlId")
    // private String informantAddrDeathDtlId ;

    // @JsonProperty("InformantAddrTenantId")
    // private String informantAddrTenantId ;

    // @JsonProperty("InformantAddrTypeId")
    // private String informantAddrTypeId ;

    // @JsonProperty("InformantAddrLocationType")
    // private String informantAddrLocationType ;

    // @JsonProperty("InformantAddrCountryId")
    // private String informantAddrCountryId ;

    // @JsonProperty("InformantAddrStateId")
    // private String informantAddrStateId ;

    // @JsonProperty("InformantAddrDistrictId")
    // private String informantAddrDistrictId ;

    // @JsonProperty("InformantAddrTalukId")
    // private String informantAddrTalukId ;

    // @JsonProperty("InformantAddrVillageId")
    // private String informantAddrVillageId ;

    // @JsonProperty("InformantAddrLbType")
    // private String informantAddrLbType ;

    // @JsonProperty("InformantAddrWardId")
    // private String informantAddrWardId ;

    // @JsonProperty("InformantAddrPostofficeId")
    // private String informantAddrPostofficeId ;

    // @JsonProperty("InformantAddrPincode")
    // private Long informantAddrPincode ;

    // @JsonProperty("InformantAddrLocalityEn")
    // private String informantAddrLocalityEn ;

    // @JsonProperty("InformantAddrLocalityMl")
    // private String informantAddrLocalityMl ;

    // @JsonProperty("InformantAddrStreetNameEn")
    // private String informantAddrStreetNameEn ;

    // @JsonProperty("InformantAddrStreetNameMl")
    // private String informantAddrStreetNameMl ;

    // @JsonProperty("InformantAddrHoueNameEn")
    // private String informantAddrHoueNameEn ;

    // @JsonProperty("InformantAddrHoueNameMl")
    // private String informantAddrHoueNameMl ;

    // @JsonProperty("InformantAddrPostalCode")
    // private String informantAddrPostalCode ;

    @JsonProperty("DocumentId")
    private String documentId ;

    @JsonProperty("DocumentDeathDtlId")
    private String documentDeathDtlId ;

    @JsonProperty("DocumentTenantId")
    private String documentTenantId ;

    @JsonProperty("DocumentAckNo")
    private String documentAckNo ;

    @JsonProperty("DocumentType")
    private String documentType ;

    @JsonProperty("DocumentUserType")
    private String documentUserType ;

    @JsonProperty("DocumentFileStoreId")
    private String documentFileStoreId ;

//Rakhi  S ikm on 08.03.2023
    @JsonProperty("InformantOfficeAuthority")
    private String informantOfficeAuthority ;

    @JsonProperty("InformantDesignation")
    private String informantDesignation ;

    @JsonProperty("InformantName")
    private String informantName ;

    @JsonProperty("InformantPENNo")
    private String informantPENNo ;
    
    @JsonProperty("InformantOfficeAddress")
    private String informantOfficeAddress ;

  
}
