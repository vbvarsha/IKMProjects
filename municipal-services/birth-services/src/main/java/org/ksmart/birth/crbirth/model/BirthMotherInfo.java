package org.ksmart.birth.crbirth.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BirthMotherInfo {

    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Size(max = 1000)
    @JsonProperty("firstname_en")
    private String firstNameEn;

    @Size(max = 1000)
    @JsonProperty("firstname_ml")
    private String firstNameMl;

    @Size(max = 1000)
    @JsonProperty("middlename_en")
    private String middleNameEn;

    @Size(max = 1000)
    @JsonProperty("middlename_ml")
    private String middleNameMl;

    @Size(max = 1000)
    @JsonProperty("lastname_en")
    private String lastNameEn;

    @Size(max = 1000)
    @JsonProperty("lastname_ml")
    private String lastNameMl;

    @Size(max = 15)
    @JsonProperty("aadharno")
    private String aadharNo;

    @Size(max = 64)
    @JsonProperty("ot_passportno")
    private String passportNo;

    @Size(max = 300)
    @JsonProperty("emailid")
    private String emailId;

    @Size(max = 12)
    @JsonProperty("mobileno")
    private String mobileNo;

    @Size(max = 64)
    @JsonProperty("birthdtlid")
    private String birthDtlId;

}
