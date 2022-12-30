
alter table eg_birth_certificate_request add  CONSTRAINT eg_birth_certificate_request_pkey PRIMARY KEY (id);

alter table eg_birth_certificate_request add CONSTRAINT eg_birth_certificate_request_fkey FOREIGN KEY (registrydetailsid)
    REFERENCES public.eg_register_birth_details (id) MATCH SIMPLE
    ON UPDATE CASCADE
       ON DELETE CASCADE;