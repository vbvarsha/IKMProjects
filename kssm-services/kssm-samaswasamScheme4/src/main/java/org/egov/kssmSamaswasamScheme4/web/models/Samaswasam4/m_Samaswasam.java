package org.egov.kssmSamaswasamScheme4.web.models.Samaswasam4;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Schema(description = "A Object holds the breg_noasic data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class m_Samaswasam {

@JsonProperty("intid")
private long intid;

@JsonProperty("numkssmpensionerid")
private long numkssmpensionerid;

@JsonProperty("scheme_id")
private int scheme_id;

@JsonProperty("district")
private int district;

@JsonProperty("application_no")
private long application_no;

@JsonProperty("reg_no")
private long reg_no;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("application_date")
private Date application_date;

@JsonProperty("office_typeid")
private int office_typeid;

@JsonProperty("office_nameid")
private int office_nameid;

@JsonProperty("applicant_nameeng")
private String applicant_nameeng;

@JsonProperty("applicant_namemal")
private String applicant_namemal;

@JsonProperty("applicant_houseno")
private String applicant_houseno;

@JsonProperty("applicant_wardno")
private int applicant_wardno;

@JsonProperty("applicant_housenameeng")
private String applicant_housenameeng;

@JsonProperty("applicant_housenamemal")
private String applicant_housenamemal;

@JsonProperty("applicant_streetnameeng")
private String applicant_streetnameeng;

@JsonProperty("applicant_streetnamemal")
private String applicant_streetnamemal;

@JsonProperty("applicant_mainplacenameeng")
private String applicant_mainplacenameeng;

@JsonProperty("applicant_mainplacenamemal")
private String applicant_mainplacenamemal;

@JsonProperty("applicant_postofficeid")
private int applicant_postofficeid;

@JsonProperty("applicant_pincode")
private int applicant_pincode;

@JsonProperty("applicant_district_id")
private int applicant_district_id;

@JsonProperty("applicant_lbid")
private int applicant_lbid;

@JsonProperty("applicant_blockid")
private int applicant_blockid;

@JsonProperty("village_id_applicant")
private int village_id_applicant;

@JsonProperty("taluk_id_applicant")
private int taluk_id_applicant;

@JsonProperty("applicantlandphone_no")
private String applicantlandphone_no;

@JsonProperty("applicantmobile_no")
private String applicantmobile_no;


@JsonProperty("applicant_age")
private int applicant_age;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("applicant_dob")
private Date applicant_dob;

@JsonProperty("applicant_genderid")
private int applicant_genderid;

@JsonProperty("applicant_religionid")
private int applicant_religionid;

@JsonProperty("applicant_religionotherseng")
private String applicant_religionotherseng;

@JsonProperty("applicant_religionothersmal")
private String applicant_religionothersmal;

@JsonProperty("applicant_casteeng")
private String applicant_casteeng;

@JsonProperty("applicant_castemal")
private String applicant_castemal;

@JsonProperty("castecertificate_no")
private String castecertificate_no;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("castecertificate_date")
private Date castecertificate_date;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("medicalcertificate_no")
private String medicalcertificate_no;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("medicalcertificate_date")
private Date medicalcertificate_date;

@JsonProperty("annual_income")
private int annual_income;

@JsonProperty("memberbpl")
private int memberbpl;

@JsonProperty("rationcard_no")
private String rationcard_no;

@JsonProperty("bplcertificate_no")
private String bplcertificate_no;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("bplcertificate_date")
private Date bplcertificate_date;

@JsonProperty("incomecertificate_no")
private String incomecertificate_no;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("incomecertificate_date")
private Date incomecertificate_date;

@JsonProperty("applicant_bankaccountno")
private String applicant_bankaccountno;

@JsonProperty("applicant_bank")
private int applicant_bank;

@JsonProperty("applicant_bank_branch")
private int applicant_bank_branch;

@JsonProperty("applicant_ifsccode")
private String applicant_ifsccode;

@JsonProperty("applicant_aadharno")
private long applicant_aadharno;

@JsonProperty("applicant_eidno")
private String applicant_eidno;

@JsonProperty("file_status")
private int file_status;

@JsonProperty("sourceid")
private int sourceid;

@JsonProperty("user_id")
private int user_id;

@JsonProperty("icdsofficer_id")
private int icdsofficer_id;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("fieldenquiry_date")
private Date fieldenquiry_date;

@JsonProperty("icdsremarks")
private String icdsremarks;

@JsonProperty("icdseligibility_id")
private int icdseligibility_id;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("cdporec_date")
private Date cdporec_date;

@JsonProperty("cdpoeligibility_id")
private int cdpoeligibility_id;

@JsonProperty("remarks")
private String remarks;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("cdposubmit_date")
private Date cdposubmit_date;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("dtdecision_date")
private Date dtdecision_date;

@JsonProperty("chvreason")
private String chvreason;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("penstart_date")
private Date penstart_date;

@JsonProperty("verifier_id")
private int verifier_id;

@JsonProperty("verifierremarks")
private String verifierremarks;

@JsonProperty("approver_id")
private int approver_id;

@JsonProperty("approverremarks")
private String approverremarks;

@JsonProperty("numkssmefileid")
private long numkssmefileid;



 
}
