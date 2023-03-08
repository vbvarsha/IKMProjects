package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrideDetails {

    @Size(max = 64)
    @JsonProperty("id")
    private String id;
    @Size(max = 64)
    @JsonProperty("brideResidentShip")
    private String residentship;

    @Size(max = 15)
    @JsonProperty("brideAdharNo")
    private String adharno;



    @Size(max = 1000)
    @JsonProperty("bridePassportNo")
    private String passportno;

    @Size(max = 64)
    @JsonProperty("brideSocialSecurityNo")
    private String socialsecurityno;

    @Size(max = 200)
    @JsonProperty("brideFirstnameEn")
    private String firstname_en;

    @Size(max = 200)
    @JsonProperty("brideFirstnameMal")
    private String firstname_mal;

    @Size(max = 200)
    @JsonProperty("brideMiddlenameEn")
    private String middlename_en;

    @Size(max = 200)
    @JsonProperty("brideMiddlenameMal")
    private String middlename_mal;



    @Size(max = 200)
    @JsonProperty("brideLastnameEn")
    private String lastname_en;

    @Size(max = 200)
    @JsonProperty("brideLastnameMal")
    private String lastname_mal;

    @Size(max = 150)
    @JsonProperty("brideMobile")
    private String mobile;

    @Size(max = 300)
    @JsonProperty("brideEmailid")
    private String emailid;

    @Size(max = 20)
    @JsonProperty("brideGender")
    private String gender;


    @JsonProperty("brideDOB")
    private long dateofbirth;



    @JsonProperty("brideAge")
    private Integer age;

    @Size(max = 64)
    @JsonProperty("brideParentGuardian")
    private String parent_guardian;

    @Size(max = 200)
    @JsonProperty("brideFathernameEn")
    private String fathername_en;

    @Size(max = 200)
    @JsonProperty("brideFathernameMal")
    private String fathername_mal;

    @Size(max = 200)
    @JsonProperty("brideMothernameEn")
    private String mothername_en;

    @Size(max = 200)
    @JsonProperty("brideMothernameMal")
    private String mothername_mal;

    @Size(max = 15)
    @JsonProperty("brideFatherAdharNo")
    private String father_adharno;

    @Size(max = 15)
    @JsonProperty("brideMotherAdharNo")
    private String mother_adharno;



    @Size(max = 200)
    @JsonProperty("brideGuardiannameEn")
    private String guardianname_en;

    @Size(max = 200)
    @JsonProperty("brideGuardiannameMal")
    private String guardianname_mal;

    @Size(max = 15)
    @JsonProperty("brideGardianAdhar")
    private String guardian_adhar;


    @Size(max = 200)
    @JsonProperty("brideProfessionEn")
    private String profession_en;

    @Size(max = 200)
    @JsonProperty("brideProfessionMal")
    private String profession_mal;

    @Size(max = 64)
    @JsonProperty("brideMaritalstatusID")
    private String maritalstatusid;



    @JsonProperty("brideSpouseLiving")
    private Boolean is_spouse_living;


    @JsonProperty("brideNoOfSpouse")
    private Boolean no_of_spouse_living;


    @Size(max = 150)
    @JsonProperty("bridePhotoUrl")
    private String photo_url;

    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;



}
