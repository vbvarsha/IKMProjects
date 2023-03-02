-- Table: public.tr_snehapoorvam

-- DROP TABLE IF EXISTS public.tr_snehapoorvam;


CREATE TABLE IF NOT EXISTS public.tr_efile_aswasakiranam
(
    intid bigserial,
    numkssmpensionerid numeric NOT NULL,
    scheme_id integer,
    district integer,
    application_no numeric,
    reg_no numeric,
    application_date date,
    office_typeid integer,
    office_nameid integer,
    applicant_namemal character varying(1000) COLLATE pg_catalog."default",
    applicant_nameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_houseno character varying(15) COLLATE pg_catalog."default",
    applicant_wardno integer,
    applicant_housenamemal character varying(1000) COLLATE pg_catalog."default",
    applicant_housenameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_streetnamemal character varying(1000) COLLATE pg_catalog."default",
    applicant_streetnameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_mainplacenamemal character varying(1000) COLLATE pg_catalog."default",
    applicant_mainplacenameeng character varying(1000) COLLATE pg_catalog."default",
    applicantlandphone_no character varying(11) COLLATE pg_catalog."default",
    applicantmobile_no character varying(10) COLLATE pg_catalog."default",
    applicant_district_id integer,
    applicant_lbid integer,
    applicant_blockid integer,
    village_id_applicant integer,
    taluk_id_applicant integer,
    applicant_postofficeid integer,
    applicant_pincode integer,
    applicant_genderid integer,
    applicant_age integer,
    applicant_dob date,
    pensioner_namemal character varying(1000) COLLATE pg_catalog."default",
    pensioner_nameeng character varying(1000) COLLATE pg_catalog."default",
    pensioner_houseno character varying(15) COLLATE pg_catalog."default",
    pensioner_housenamemal character varying(1000) COLLATE pg_catalog."default",
    pensioner_housenameeng character varying(1000) COLLATE pg_catalog."default",
    pensioner_streetnamemal character varying(1000) COLLATE pg_catalog."default",
    pensioner_streetnameeng character varying(1000) COLLATE pg_catalog."default",
    pensioner_mainplacenamemal character varying(1000) COLLATE pg_catalog."default",
    pensioner_mainplacenameeng character varying(1000) COLLATE pg_catalog."default",
    pensioner_landphoneno character varying(11) COLLATE pg_catalog."default",
    pensioner_mobileno character varying(10) COLLATE pg_catalog."default",
    districtid_pensioner integer,
    pensioner_lbid integer,
    pensioner_wardno integer,
    pensioner_postofficeid integer,
    pensioner_pincode integer,
    pensioner_genderid integer,
    pensioner_age integer,
    pensioner_dob date,
    relationship_pensioner integer,
    relation_detmal character varying(1000) COLLATE pg_catalog."default",
    relation_deteng character varying(1000) COLLATE pg_catalog."default",
    memberasharaya_bpl integer,
    member_category integer,
    incomecertificate_no character varying(50) COLLATE pg_catalog."default",
    incomecertificate_date date,
    rationcard_no character varying(50) COLLATE pg_catalog."default",
    bplcertificate_no character varying(50) COLLATE pg_catalog."default",
    bplcertificate_date date,
    categoryremarksmal character varying(1000) COLLATE pg_catalog."default",
    categoryremarkseng character varying(1000) COLLATE pg_catalog."default",
    pensioner_disabled integer,
    disabilty_details integer,
    disabiltyother_detmal character varying(1000) COLLATE pg_catalog."default",
    disabiltyother_deteng character varying(1000) COLLATE pg_catalog."default",
    applicant_employed integer,
    applicant_employmenttype integer,
    applicant_income integer,
    applicant_getpension integer,
    applicant_pensiontype integer,
    applicant_pensionamount integer,
    intfamily_income integer,
    intaccounttype_bank_post integer,
    applicant_accountno character varying(50) COLLATE pg_catalog."default",
    applicant_pincodeacc integer,
    applicant_accpostofficeid integer,
    applicant_emocode character varying(100) COLLATE pg_catalog."default",
    applicant_bankaccountno character varying(50) COLLATE pg_catalog."default",
    applicant_bank integer,
    applicant_bank_branch integer,
    applicant_ifsccode character varying(500) COLLATE pg_catalog."default",
    applicant_aadharno numeric,
    applicant_eidno character varying(50) COLLATE pg_catalog."default",
    file_status integer,
    sourceid integer,
    user_id integer,
    icdsofficer_id integer,
    fieldenquiry_date date,
    icdsremarks character varying(1000) COLLATE pg_catalog."default",
    icdseligibility_id integer,
    cdporec_date date,
    cdpoeligibility_id integer,
    remarks character varying(1000) COLLATE pg_catalog."default",
    cdposubmit_date date,
    dtdecision_date timestamp without time zone,
    chvreason character varying(250) COLLATE pg_catalog."default",
    penstart_date date,
    verifierremarks character varying(1000) COLLATE pg_catalog."default",
    approverremarks character varying(1000) COLLATE pg_catalog."default",
    verifier_id integer,
    approver_id integer,
    numkssmliveid numeric,
    CONSTRAINT tr_efile_aswasakiranam_pkey PRIMARY KEY (intid, numkssmpensionerid)
)
