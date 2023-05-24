CREATE TABLE IF NOT EXISTS public.eg_fm_draftreference
(

    id character varying(64) ,
    tenantid character varying(15),
    filecode character varying(20) ,
    draftid character varying(64) ,
    referencetext character varying(64) ,
    status character varying(10) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint,

    CONSTRAINT eg_fm_draftreference_log_pkey PRIMARY KEY (id),
    CONSTRAINT eg_fm_draftreference_fkey FOREIGN KEY (draftid)
    REFERENCES public.eg_fm_drafting (id)
    )