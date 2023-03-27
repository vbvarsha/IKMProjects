-- Table: public.tr_live_samaswasam1

-- DROP TABLE IF EXISTS public.tr_live_samaswasam1;

CREATE TABLE IF NOT EXISTS public.tr_live_samaswasam1
(
    intid SERIAL NOT NULL,
    numkssmpensionerid numeric NOT NULL,
    scheme_id integer,
    district integer,
    application_no numeric,
    reg_no numeric,
    application_date date,
    office_typeid integer,
    office_nameid integer,
    applicant_nameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_namemal character varying(1000) COLLATE pg_catalog."default",
    applicant_houseno character varying(15) COLLATE pg_catalog."default",
    applicant_wardno integer,
    applicant_housenameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_housenamemal character varying(1000) COLLATE pg_catalog."default",
    applicant_streetnameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_streetnamemal character varying(1000) COLLATE pg_catalog."default",
    applicant_mainplacenameeng character varying(1000) COLLATE pg_catalog."default",
    applicant_mainplacenamemal character varying(1000) COLLATE pg_catalog."default",
    applicant_postofficeid integer,
    applicant_pincode integer,
    applicant_district_id integer,
    applicant_lbid integer,
    applicant_blockid integer,
    village_id_applicant integer,
    taluk_id_applicant integer,
    applicantlandphone_no character varying(11) COLLATE pg_catalog."default",
    applicantmobile_no character varying(10) COLLATE pg_catalog."default",
    applicant_age integer,
    applicant_dob date,
    applicant_genderid integer,
    memberbpl integer,
    rationcard_no character varying(50) COLLATE pg_catalog."default",
    bplcertificate_no character varying(15) COLLATE pg_catalog."default",
    bplcertificate_date date,
    applicant_dialysis_centereng character varying(1000) COLLATE pg_catalog."default",
    applicant_dialysis_centermal character varying(1000) COLLATE pg_catalog."default",
    applicant_dialysis_doctoreng character varying(1000) COLLATE pg_catalog."default",
    applicant_dialysis_doctormal character varying(1000) COLLATE pg_catalog."default",
    applicant_dialysis_date date,
    applicant_dialysis_count integer,
    applicant_bankaccountno character varying(50) COLLATE pg_catalog."default",
    applicant_bank integer,
    applicant_bank_branch integer,
    applicant_ifsccode character varying(50) COLLATE pg_catalog."default",
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
    chvreason character varying(1000) COLLATE pg_catalog."default",
    penstart_date date,
    verifier_id integer,
    verifierremarks character varying(1000) COLLATE pg_catalog."default",
    approver_id integer,
    approverremarks character varying(1000) COLLATE pg_catalog."default",
    numkssmefileid numeric,
    CONSTRAINT tr_live_samaswasam1_pkey PRIMARY KEY (intid, numkssmpensionerid)
)
