package org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3;

import javax.validation.constraints.Size;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Schema(description = "A Object holds the breg_noasic data for kssmSamaswasamScheme3")
@Validated


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_Samaswasam {

@JsonProperty("intid")
private	Integer	intid;

@JsonProperty("numkssmpensionerid")
private	Integer	numkssmpensionerid	;

@JsonProperty("scheme_id")
private	Integer	scheme_id	;

@JsonProperty("district")
private	Integer	district	;

@JsonProperty("application_no")
private	Integer	application_no	;

@JsonProperty("reg_no")
private	Integer	reg_no;


@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("application_date")
private	String	application_date	;

@JsonProperty("office_typeid")
private	Integer	office_typeid	;

@JsonProperty("office_nameid")
private	Integer	office_nameid	;

@JsonProperty("applicant_nameeng")
private	String	applicant_nameeng	;

@JsonProperty("applicant_namemal")
private	String	applicant_namemal	;

@JsonProperty("applicant_houseno")
private	String	applicant_houseno	;

@JsonProperty("applicant_wardno")
private	Integer	applicant_wardno	;

@JsonProperty("applicant_housenameeng")
private	String	applicant_housenameeng	;

@JsonProperty("applicant_housenamemal")
private	String	applicant_housenamemal	;

@JsonProperty("applicant_streetnameeng")
private	String	applicant_streetnameeng	;

@JsonProperty("applicant_streetnamemal")
private	String	applicant_streetnamemal	;

@JsonProperty("applicant_mainplacenameeng")
private	String	applicant_mainplacenameeng	;

@JsonProperty("applicant_mainplacenamemal")
private	String	applicant_mainplacenamemal	;

@JsonProperty("applicant_postofficeid")
private	Integer	applicant_postofficeid	;

@JsonProperty("applicant_pincode")
private	Integer	applicant_pincode	;

@JsonProperty("applicant_district_id")
private	Integer	applicant_district_id	;

@JsonProperty("applicant_lbid")
private	Integer	applicant_lbid	;

@JsonProperty("applicant_blockid")
private	Integer	applicant_blockid	;

@JsonProperty("village_id_applicant")
private	Integer	village_id_applicant	;

@JsonProperty("taluk_id_applicant")
private	Integer	taluk_id_applicant	;

@JsonProperty("applicantlandphone_no")
private	String	applicantlandphone_no	;

@JsonProperty("applicantmobile_no")
private	String	applicantmobile_no	;

@JsonProperty("applicant_age")
private	Integer	applicant_age	;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("applicant_dob")
private	String	applicant_dob	;

@JsonProperty("applicant_genderid")
private	Integer	applicant_genderid	;

@JsonProperty("applicant_heamo_center_eng")
private	String	applicant_heamo_center_eng	;

@JsonProperty("applicant_heamo_center_mal")
private	String	applicant_heamo_center_mal	;

@JsonProperty("applicant_heamo_doctor_eng")
private	String	applicant_heamo_doctor_eng	;

@JsonProperty("applicant_heamo_doctor_mal")
private	String	applicant_heamo_doctor_mal	;

@JsonProperty("applicant_bankaccountno")
private	String	applicant_bankaccountno	;

@JsonProperty("applicant_bank")
private	Integer	applicant_bank	;

@JsonProperty("applicant_bank_branch")
private	Integer	applicant_bank_branch	;

@JsonProperty("applicant_ifsccode")
private	String	applicant_ifsccode	;

@JsonProperty("applicant_aadharno")
private	Integer	applicant_aadharno	;

@JsonProperty("applicant_eidno")
private	String	applicant_eidno	;

@JsonProperty("file_status")
private	Integer	file_status	;

@JsonProperty("sourceid")
private	Integer	sourceid	;

@JsonProperty("user_id")
private	Integer	user_id	;

@JsonProperty("icdsofficer_id")
private	Integer	icdsofficer_id	;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("fieldenquiry_date")
private	String	fieldenquiry_date	;

@JsonProperty("icdsremarks")
private	String	icdsremarks	;

@JsonProperty("icdseligibility_id")
private	Integer	icdseligibility_id	;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("cdporec_date")
private	String	cdporec_date	;

@JsonProperty("cdpoeligibility_id")
private	Integer	cdpoeligibility_id	;

@JsonProperty("remarks")
private	String	remarks	;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("cdposubmit_date")
private	String	cdposubmit_date	;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("dtdecision_date")
private	String	dtdecision_date	;

@JsonProperty("chvreason")
private	String	chvreason	;

@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("penstart_date")
private	String	penstart_date	;

@JsonProperty("verifier_id")
private	Integer	verifier_id	;

@JsonProperty("verifierremarks")
private	String	verifierremarks	;

@JsonProperty("approver_id")
private	Integer	approver_id	;

@JsonProperty("approverremarks")
private	String	approverremarks	;

@JsonProperty("numkssmefileid")
private	Integer	numkssmefileid	;


}
