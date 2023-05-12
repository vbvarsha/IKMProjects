package org.ksmart.death.deathregistry.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryStatisticalInfo {
    @Size(max = 64)
    @JsonProperty("StatisticalId")
    private String statisticalId;

    @JsonProperty("DeathDtlId")
    private String deathDtlId ; 

    @JsonProperty("TenantId")
    private String tenantId;

    @JsonProperty("MedicalAttentionType")
    private String medicalAttentionType;

    @JsonProperty("IsAutopsyPerformed")
    private String isAutopsyPerformed;

    @JsonProperty("IsAutopsyCompleted")
    private String isAutopsyCompleted;

    @JsonProperty("MannerOfDeath")
    private String mannerOfDeath;

    @JsonProperty("DeathMedicallyCertified")
    private String deathMedicallyCertified;

    @JsonProperty("DeathCauseMain")
    private String deathCauseMain;

    @JsonProperty("DeathCauseMainCustom")
    private String deathCauseMainCustom;

    @JsonProperty("DeathCauseMainInterval")
    private Integer deathCauseMainInterval;

    @JsonProperty("DeathCauseMainTimeUnit")
    private  String deathCauseMainTimeUnit;

    @JsonProperty("DeathCauseSub")
    private String deathCauseSub;

    @JsonProperty("DeathCauseSubCustom")
    private String deathCauseSubCustom;

    @JsonProperty("DeathCauseSubInterval")
    private Integer deathCauseSubInterval;

    @JsonProperty("DeathCauseSubTimeUnit")
    private String deathCauseSubTimeUnit;

    @JsonProperty("DeathCauseSub2")
    private String deathCauseSub2;

    @JsonProperty("DeathCauseSubCustom2")
    private String deathCauseSubCustom2;

    @JsonProperty("DeathCauseSubInterval2")
    private Integer deathCauseSubInterval2;

    @JsonProperty("DeathCauseSubTimeUnit2")
    private String deathCauseSubTimeUnit2;

    @JsonProperty("DeathCauseOther")
    private String deathCauseOther;
    
    @JsonProperty("IsdeceasedPregnant")
    private String isdeceasedPregnant;

    @JsonProperty("IsDelivery")
    private String isDelivery;

    @JsonProperty("DeathDuringDelivery")
    private String deathDuringDelivery;

    @JsonProperty("SmokingType")
    private String smokingType;

    @JsonProperty("TobaccoType")
    private String tobaccoType;

    @JsonProperty("AlcoholType")
    private String alcoholType;

    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("smokingNumYears")
    private Integer smokingNumYears;

    @JsonProperty("tobaccoNumYears")
    private Integer tobaccoNumYears;

    @JsonProperty("alcoholNumYears")
    private Integer alcoholNumYears;
    
}
