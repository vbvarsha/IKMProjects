V20221210114700__crdeath_n_registry_ddl.sql





-- Table Migration Script for Death-Service [10.12.2022 by Rakhi S IKM]

-- Table public.eg_death_dtls
ALTER TABLE eg_death_dtls RENAME TO eg_death_dtls_old;

DROP TABLE IF EXISTS public.eg_death_dtls;

CREATE TABLE IF NOT EXISTS public.eg_death_dtls
(
    id character varying(64)  NOT NULL,
    registrationunit character varying(64) ,
    tenantid character varying(50)  NOT NULL,
    correct_death_date_known smallint,
    dateofdeath bigint,
    time_of_death integer,
    timeofdeath_unit character varying(50),
    date_of_death_to bigint,
    time_of_death_to integer,
    timeofdeath_unit_to character varying(50),
    deceased_identified smallint,
    deceased_title character varying(64) ,
    deceased_firstname_en character varying(64),
    deceased_firstname_ml character varying(64) ,
    deceased_middlename_en character varying(64),
    deceased_middlename_ml character varying(64),
    deceased_lastname_en character varying(64),
    deceased_lastname_ml character varying(64),
    deceased_aadhar_number character varying(64),
    deceased_gender character varying(64),
    age integer,
    age_unit character varying(64),
    dateofbirth bigint,
    death_place character varying(64),
    death_place_inst_type character varying(64),
    death_place_inst_id character varying(64),
    death_place_office_name character varying(200),
    death_place_other_ml character varying(200),
    death_place_other_en character varying(200),
    informant_title character varying(64),
    informant_name_en character varying(64),
    informant_name_ml character varying(64),
    informant_aadhar_submitted smallint,
    informant_aadhar_no character varying(64),
    informant_mobile_no character varying(64),
    general_remarks character varying(500),
    application_status character varying(64),
    submitted_on bigint,
    created_by character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    place_burial character varying(64),
    place_burial_institution_type character varying(64),
    place_burial_institution_name character varying(64),
    registration_no character varying(64),
    ip_no character varying(64),
    op_no character varying(64),
    male_dependent_type character varying(64),
    male_dependent_title character varying(64),
    male_dependent_name_en character varying(64),
    male_dependent_name_ml character varying(64),
    male_dependent_aadharno character varying(64),
    male_dependent_mobileno character varying(64),
    male_dependent_mailid character varying(64),
    female_dependent_type character varying(64),
    female_dependent_title character varying(64),
    female_dependent_name_en character varying(64),
    female_dependent_name_ml character varying(64),
    female_dependent_aadharno character varying(64),
    female_dependent_mobileno character varying(64),
    female_dependent_mailid character varying(64),
    isvehicle smallint,
    vehicle_hospital_ml character varying(200),
    vehicle_hospital_en character varying(200),
    vehicle_fromplace_ml character varying(200),
    vehicle_fromplace_en character varying(200),
    vehicle_toplace_ml character varying(200),
    vehicle_toplace_en character varying(200),
    vehicle_number character varying(64),
    death_place_ward_id character varying(64),
    informant_age character varying(64),
    vehicle_driver_licenceno character varying(64),
    death_signed_officer_designation character varying(64),
    death_place_officer_mobile character varying(64),
    death_place_officer_aadhaar character varying(64),
    deseased_passportno character varying(64),
    application_no character varying(64),
    file_no character varying(64),
    ack_no character varying(64),
	dateofreport bigint,
	CONSTRAINT eg_death_dtls_pkey1 PRIMARY KEY (id)
);

-- Table: public.eg_death_statistical_dtls

DROP TABLE IF EXISTS public.eg_death_statistical_dtls;

CREATE TABLE IF NOT EXISTS public.eg_death_statistical_dtls
(
    id character varying(64) NOT NULL,
    death_dtl_id character varying(64),
    tenantid character varying(50) NOT NULL,
    residencelocalbody character varying(75),
    residence_place_type character varying(200),
    residencedistrict character varying(250),
    residencestate character varying(100),
    religion character varying(200),
    religion_other character varying(100),
    occupation character varying(100),
    occupation_other character varying(500),
    medical_attention_type character varying(500),
    death_medically_certified smallint,
    death_cause_main character varying(200),
    death_cause_sub character varying(200),
    death_cause_other character varying(200),
    death_during_delivery integer,
    smoking_num_years integer,
    tobacco_num_years integer,
    arecanut_num_years integer,
    alcohol_num_years integer,
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    nationality character varying(200),
	CONSTRAINT eg_death_statistical_dtls_pkey PRIMARY KEY (id),
    CONSTRAINT fk_eg_death_dtls FOREIGN KEY (death_dtl_id)
        REFERENCES public.eg_death_dtls (id)
);

-- Table: public.eg_death_address_dtls

DROP TABLE IF EXISTS public.eg_death_address_dtls;

CREATE TABLE IF NOT EXISTS public.eg_death_address_dtls
(
    id character varying(64) NOT NULL,
    death_dtl_id character varying(64),
    tenantid character varying(50) NOT NULL,
    addr_typeid character varying(50),
    house_no character varying(100),
    residence_assc_no character varying(100),
    streetname_en character varying(200),
    streetname_ml character varying(200),
    locality_en character varying(200),
    locality_ml character varying(200),
    city_en character varying(200),
    city_ml character varying(200),
    ward_id character varying(100),
    taluk_id character varying(100),
    village_id character varying(200),
    postoffice_id character varying(200),
    pincode bigint,
    district_id character varying(100),
    state_id character varying(100),
    country_id character varying(100),
    taluk_name_en character varying(200),
    taluk_name_ml character varying(200),
    village_name_en character varying(200),
    village_name_ml character varying(200),
    postoffice_name_en character varying(200),
    postoffice_name_ml character varying(200),
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    location_type character varying(150),
    houename_ml character varying(200),
    houename_en character varying(200),
	CONSTRAINT eg_death_address_dtls_pkey PRIMARY KEY (id),
    CONSTRAINT fk_eg_death_dtls FOREIGN KEY (death_dtl_id)
        REFERENCES public.eg_death_dtls (id)
);

-- Table public.eg_death_dtls_registry

DROP TABLE IF EXISTS public.eg_death_dtls_registry;

CREATE TABLE IF NOT EXISTS public.eg_death_dtls_registry
(
    id character varying(64)  NOT NULL,
    registrationunit character varying(64) ,
    tenantid character varying(50)  NOT NULL,
    correct_death_date_known smallint,
    dateofdeath bigint,
    time_of_death integer,
    timeofdeath_unit character varying(50),
    date_of_death_to bigint,
    time_of_death_to integer,
    timeofdeath_unit_to character varying(50),
    deceased_identified smallint,
    deceased_title character varying(64) ,
    deceased_firstname_en character varying(64),
    deceased_firstname_ml character varying(64) ,
    deceased_middlename_en character varying(64),
    deceased_middlename_ml character varying(64),
    deceased_lastname_en character varying(64),
    deceased_lastname_ml character varying(64),
    deceased_aadhar_number character varying(64),
    deceased_gender character varying(64),
    age integer,
    age_unit character varying(64),
    dateofbirth bigint,
    death_place character varying(64),
    death_place_inst_type character varying(64),
    death_place_inst_id character varying(64),
    death_place_office_name character varying(200),
    death_place_other_ml character varying(200),
    death_place_other_en character varying(200),
    informant_title character varying(64),
    informant_name_en character varying(64),
    informant_name_ml character varying(64),
    informant_aadhar_submitted smallint,
    informant_aadhar_no character varying(64),
    informant_mobile_no character varying(64),
    general_remarks character varying(500),
    application_status character varying(64),
    submitted_on bigint,
    created_by character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    place_burial character varying(64),
    place_burial_institution_type character varying(64),
    place_burial_institution_name character varying(64),
    registration_no character varying(64),
    ip_no character varying(64),
    op_no character varying(64),
    male_dependent_type character varying(64),
    male_dependent_title character varying(64),
    male_dependent_name_en character varying(64),
    male_dependent_name_ml character varying(64),
    male_dependent_aadharno character varying(64),
    male_dependent_mobileno character varying(64),
    male_dependent_mailid character varying(64),
    female_dependent_type character varying(64),
    female_dependent_title character varying(64),
    female_dependent_name_en character varying(64),
    female_dependent_name_ml character varying(64),
    female_dependent_aadharno character varying(64),
    female_dependent_mobileno character varying(64),
    female_dependent_mailid character varying(64),
    isvehicle smallint,
    vehicle_hospital_ml character varying(200),
    vehicle_hospital_en character varying(200),
    vehicle_fromplace_ml character varying(200),
    vehicle_fromplace_en character varying(200),
    vehicle_toplace_ml character varying(200),
    vehicle_toplace_en character varying(200),
    vehicle_number character varying(64),
    death_place_ward_id character varying(64),
    informant_age character varying(64),
    vehicle_driver_licenceno character varying(64),
    death_signed_officer_designation character varying(64),
    death_place_officer_mobile character varying(64),
    death_place_officer_aadhaar character varying(64),
    deseased_passportno character varying(64),
    application_no character varying(64),
    file_no character varying(64),
    ack_no character varying(64),
	dateofreport bigint,
	CONSTRAINT eg_death_dtls_registry_pkey PRIMARY KEY (id)
);

-- Table: public.eg_death_statistical_registry

DROP TABLE IF EXISTS public.eg_death_statistical_registry;

CREATE TABLE IF NOT EXISTS public.eg_death_statistical_registry
(
    id character varying(64) NOT NULL,
    death_dtl_id character varying(64),
    tenantid character varying(50) NOT NULL,
    residencelocalbody character varying(75),
    residence_place_type character varying(200),
    residencedistrict character varying(250),
    residencestate character varying(100),
    religion character varying(200),
    religion_other character varying(100),
    occupation character varying(100),
    occupation_other character varying(500),
    medical_attention_type character varying(500),
    death_medically_certified smallint,
    death_cause_main character varying(200),
    death_cause_sub character varying(200),
    death_cause_other character varying(200),
    death_during_delivery integer,
    smoking_num_years integer,
    tobacco_num_years integer,
    arecanut_num_years integer,
    alcohol_num_years integer,
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    nationality character varying(200),
	CONSTRAINT eg_death_statistical_registry_pkey PRIMARY KEY (id),
    CONSTRAINT fk_eg_death_dtls_registry FOREIGN KEY (death_dtl_id)
        REFERENCES public.eg_death_dtls_registry (id)
);

-- Table: public.eg_death_address_registry

DROP TABLE IF EXISTS public.eg_death_address_registry;

CREATE TABLE IF NOT EXISTS public.eg_death_address_registry
(
    id character varying(64) NOT NULL,
    death_dtl_id character varying(64),
    tenantid character varying(50) NOT NULL,
    addr_typeid character varying(50),
    house_no character varying(100),
    residence_assc_no character varying(100),
    streetname_en character varying(200),
    streetname_ml character varying(200),
    locality_en character varying(200),
    locality_ml character varying(200),
    city_en character varying(200),
    city_ml character varying(200),
    ward_id character varying(100),
    taluk_id character varying(100),
    village_id character varying(200),
    postoffice_id character varying(200),
    pincode bigint,
    district_id character varying(100),
    state_id character varying(100),
    country_id character varying(100),
    taluk_name_en character varying(200),
    taluk_name_ml character varying(200),
    village_name_en character varying(200),
    village_name_ml character varying(200),
    postoffice_name_en character varying(200),
    postoffice_name_ml character varying(200),
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    location_type character varying(150),
    houename_ml character varying(200),
    houename_en character varying(200),
	CONSTRAINT eg_death_address_registry_pkey PRIMARY KEY (id),
    CONSTRAINT fk_eg_death_address_registry FOREIGN KEY (death_dtl_id)
        REFERENCES public.eg_death_dtls_registry (id)
);
