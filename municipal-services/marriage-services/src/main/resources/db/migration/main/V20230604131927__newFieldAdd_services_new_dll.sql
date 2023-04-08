ALTER TABLE public.eg_marriage_details
  ADD COLUMN module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_details_audit
  ADD COLUMN module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details
  ADD COLUMN module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details_audit
  ADD COLUMN module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_bride_groom_details
 ALTER COLUMN father_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN mother_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN guardian_aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_bride_groom_details_audit
 ALTER COLUMN father_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN mother_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN guardian_aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_bride_groom_details
 ALTER COLUMN father_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN mother_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN guardian_aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_bride_groom_details_audit
 ALTER COLUMN father_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN mother_aadharno TYPE character varying(200) COLLATE pg_catalog."default",
 ALTER COLUMN guardian_aadharno TYPE character varying(200) COLLATE pg_catalog."default";