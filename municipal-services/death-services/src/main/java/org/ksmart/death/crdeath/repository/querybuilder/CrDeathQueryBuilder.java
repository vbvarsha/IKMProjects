package org.ksmart.death.crdeath.repository.querybuilder;


import java.util.List;

import javax.validation.constraints.NotNull;

import org.ksmart.death.crdeath.web.models.CrDeathSearchCriteria;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathQueryBuilder
     * Rakhi S IKM
     * on  05/12/2022
     */
@Component
public class CrDeathQueryBuilder extends BaseQueryBuilder {
    
     //Rakhi S on 08.12.2022
     // private static final String QUERY = new StringBuilder().append("SELECT dt.id, dt.registrationunit, dt.tenantid, dt.correct_death_date_known, dt.dateofdeath, dt.time_of_death, dt.timeofdeath_unit, dt.date_of_death_to, dt.time_of_death_to, dt.timeofdeath_unit_to, dt.deceased_identified") 
     //                                                        .append("      , dt.deceased_title, dt.deceased_firstname_en, dt.deceased_firstname_ml, dt.deceased_middlename_en, dt.deceased_middlename_ml, dt.deceased_lastname_en, dt.deceased_lastname_ml, dt.deceased_aadhar_number, dt.deceased_gender, dt.age, dt.age_unit, dt.dateofbirth")   
     //                                                        .append("      , dt.death_place, dt.death_place_inst_type, dt.death_place_inst_id, dt.death_place_office_name, dt.death_place_other_ml, dt.death_place_other_en")        
     //                                                        // .append("      , dt.death_place, dt.death_place_inst_type, dt.death_place_inst_id, dt.death_place_office_name, dt.death_place_other_ml, dt.death_place_other_en")
     //                                                        .append("      , dt.informant_title, dt.informant_name_en, dt.informant_name_ml, dt.informant_aadhar_submitted, dt.informant_aadhar_no, dt.informant_mobile_no, dt.general_remarks")
     //                                                        .append("      , dt.application_status, dt.submitted_on, dt.created_by, dt.createdtime, dt.lastmodifiedby, dt.lastmodifiedtime")
     //                                                        .append("      , dt.place_burial, dt.place_burial_institution_type, dt.place_burial_institution_name, dt.registration_no, dt.ip_no, dt.op_no")
     //                                                        .append("      , dt.male_dependent_type, dt.male_dependent_title, dt.male_dependent_name_en, dt.male_dependent_name_ml, dt.male_dependent_aadharno, dt.male_dependent_mobileno, dt.male_dependent_mailid")
     //                                                        .append("      , dt.female_dependent_type, dt.female_dependent_title, dt.female_dependent_name_en, dt.female_dependent_name_ml, dt.female_dependent_aadharno, dt.female_dependent_mobileno, dt.female_dependent_mailid")
     //                                                        .append("      , dt.isvehicle, dt.vehicle_hospital_ml, dt.vehicle_hospital_en, dt.vehicle_fromplace_ml, dt.vehicle_fromplace_en, dt.vehicle_toplace_ml, dt.vehicle_toplace_en, dt.vehicle_number, dt.death_place_ward_id, dt.informant_age, dt.vehicle_driver_licenceno")
     //                                                        .append("      , dt.death_signed_officer_designation, dt.death_place_officer_mobile, dt.death_place_officer_aadhaar, dt.deseased_passportno, dt.application_no, dt.file_no, dt.ack_no")
     //                                                        .append("      , stat.id statid, stat.death_dtl_id, stat.tenantid stattenantid, stat.residencelocalbody, stat.residence_place_type, stat.residencedistrict, stat.residencestate, stat.religion, stat.religion_other, stat.occupation, stat.occupation_other, stat.medical_attention_type")
     //                                                        .append("      , stat.death_medically_certified, stat.death_cause_main, stat.death_cause_sub, stat.death_cause_other, stat.death_during_delivery, stat.smoking_num_years, stat.tobacco_num_years, stat.arecanut_num_years, stat.alcohol_num_years")
     //                                                        .append("      , stat.createdby, stat.createdtime, stat.lastmodifiedby, stat.lastmodifiedtime, stat.nationality")
     //                                                        .append(" FROM eg_death_dtls dt") 
     //                                                        .append(" INNER JOIN eg_death_statistical_dtls stat ON dt.id = stat.death_dtl_id AND dt.tenantid = stat.tenantid")
     //                                                  .toString();
     //Jasmine
      private static final String QUERY = new StringBuilder()
                                                  .append("SELECT dt.id, dt.registrationunit, dt.tenantid, dt.death_date_unavailable, dt.dateofdeath, dt.time_of_death, dt.timeofdeath_unit, dt.date_of_death_to, dt.time_of_death_to, dt.timeofdeath_unit_to, dt.deceased_unidentified") 
                                                  .append("      , dt.deceased_title, dt.deceased_firstname_en, dt.deceased_firstname_ml, dt.deceased_middlename_en, dt.deceased_middlename_ml, dt.deceased_lastname_en, dt.deceased_lastname_ml, dt.deceased_aadhar_number, dt.deceased_gender, dt.age, dt.age_unit, dt.dateofbirth")   
                                                  .append("      , dt.death_place, dt.death_place_inst_type, dt.death_place_inst_id, dt.death_place_officer_name, dt.death_place_other_ml, dt.death_place_other_en")        
                                                  .append("      , dt.informant_title, dt.informant_name_en, dt.informant_name_ml, dt.informant_aadhar_submitted, dt.informant_aadhar_no, dt.informant_mobile_no, dt.general_remarks")
                                                  .append("      , dt.status, dt.submitted_on, dt.created_by, dt.createdtime, dt.lastmodifiedby, dt.lastmodifiedtime")
                                                  .append("      , dt.burial_district, dt.burial_lbtype, dt.burial_lbname, dt.registration_no, dt.ip_no, dt.op_no")
                                                  .append("      , dt.male_dependent_type, dt.male_dependent_title, dt.male_dependent_name_en, dt.male_dependent_name_ml, dt.male_dependent_aadharno, dt.male_dependent_mobileno, dt.male_dependent_mailid")
                                                  .append("      , dt.female_dependent_type, dt.female_dependent_title, dt.female_dependent_name_en, dt.female_dependent_name_ml, dt.female_dependent_aadharno, dt.female_dependent_mobileno, dt.female_dependent_mailid")
                                                  .append("      , dt.isvehicle, dt.vehicle_hospital_ml, dt.vehicle_hospital_en, dt.vehicle_fromplace_ml, dt.vehicle_fromplace_en, dt.vehicle_toplace_ml, dt.vehicle_toplace_en, dt.vehicle_number, dt.death_place_ward_id, dt.informant_age, dt.vehicle_driver_licenceno")
                                                  .append("      , dt.death_signed_officer_designation, dt.death_place_officer_mobile, dt.death_place_officer_aadhaar, dt.deceased_idprooftype, dt.application_no, dt.file_no, dt.ack_no , dt.deceased_idproofno")
                                                  //Rakhi S on 21.01.2023
                                                  .append("      , dt.vehicle_first_halt,dt.male_dependent_unavailable,dt.female_dependent_unavailable,dt.spouse_name_en,dt.spouse_name_ml,dt.spouse_unavailable,dt.spouse_type,dt.spouse_emailid,dt.spouse_aadhaar,dt.spouse_mobileno,,dt.funcion_uid")
                                                  .append("      , stat.id statid, stat.death_dtl_id, stat.tenantid stattenantid, stat.residencelocalbody, stat.residence_place_type, stat.residencedistrict, stat.residencestate, stat.religion, stat.religion_other, stat.occupation, stat.occupation_other, stat.medical_attention_type")
                                                  .append("      , stat.death_medically_certified, stat.death_cause_main, stat.death_cause_sub, stat.death_cause_other, stat.death_during_delivery, stat.smoking_num_years, stat.tobacco_num_years, stat.arecanut_num_years, stat.alcohol_num_years")
                                                  .append("      , stat.createdby, stat.createdtime, stat.lastmodifiedby, stat.lastmodifiedtime, stat.nationality ,dt.burial_state,stat.occupation_sub, stat.occupation_minor, stat.education_main, stat.education_sub, stat.residencelbtype")
                                                  //Rakhi S on 21.01.2023
                                                  .append("      , stat.smoking_type,stat.tobacco_type,stat.arecanut_type,stat.alcohol_type")
                                                  .append(" ,presentaddress.death_dtl_id  as P_death_dtl_id") 
                                                  .append(" ,presentaddress.tenantid as P_tenantid") 
                                                  .append(" ,presentaddress.addr_typeid as P_addr_typeid") 
                                                  .append(" ,presentaddress.house_no as P_house_no") 
                                                  .append(" ,presentaddress.residence_assc_no as P_residence_assc_no") 
                                                  .append(" ,presentaddress.streetname_en as P_streetname_en") 
                                                  .append(" ,presentaddress.streetname_ml as P_streetname_ml")  
                                                  .append(" ,presentaddress.locality_en as P_locality_en") 
                                                  .append(" ,presentaddress.locality_ml as P_locality_ml") 
                                                  .append(" ,presentaddress.city_en as P_city_en")  
                                                  .append(" ,presentaddress.city_ml as P_city_ml") 
                                                  .append(" ,presentaddress.ward_id as P_ward_id")  
                                                  .append(" ,presentaddress.taluk_id as P_taluk_id") 
                                                  .append(" ,presentaddress.village_id as P_village_id") 
                                                  .append(" ,presentaddress.postoffice_id as P_postoffice_id") 
                                                  .append(" ,presentaddress.pincode as P_pincode")  
                                                  .append(" ,presentaddress.district_id as P_district_id") 
                                                  .append(" ,presentaddress.state_id as P_state_id")  
                                                  .append(" ,presentaddress.country_id as P_country_id") 
                                                  .append(" ,presentaddress.taluk_name_en as P_taluk_name_en") 
                                                  .append(" ,presentaddress.taluk_name_ml as  P_taluk_name_ml") 
                                                  .append(" ,presentaddress.village_name_en as  P_village_name_en")  
                                                  .append(" ,presentaddress.village_name_ml as  P_village_name_ml") 
                                                  .append(" ,presentaddress.postoffice_name_en as  P_postoffice_name_en") 
                                                  .append(" ,presentaddress.postoffice_name_ml as  P_postoffice_name_ml") 
                                                  .append(" ,permanentAddress.death_dtl_id  as R_death_dtl_id")  
                                                  .append(" ,permanentAddress.tenantid as R_tenantid") 
                                                  .append(" ,permanentAddress.addr_typeid as R_addr_typeid")  
                                                  .append(" ,permanentAddress.house_no as R_house_no") 
                                                  .append(" ,permanentAddress.residence_assc_no as R_residence_assc_no")  
                                                  .append(" ,permanentAddress.streetname_en as R_streetname_en") 
                                                  .append(" ,permanentAddress.streetname_ml as R_streetname_ml")  
                                                  .append(" ,permanentAddress.locality_en as R_locality_en")
                                                  .append(" ,permanentAddress.locality_ml as R_locality_ml")  
                                                  .append(" ,permanentAddress.city_en as R_city_en")
                                                  .append(" ,permanentAddress.city_ml as R_city_ml") 
                                                  .append(" ,permanentAddress.ward_id as R_ward_id")
                                                  .append(" ,permanentAddress.taluk_id as R_taluk_id")  
                                                  .append(" ,permanentAddress.village_id as R_village_id")
                                                  .append(" ,permanentAddress.postoffice_id as R_postoffice_id")  
                                                  .append(" ,permanentAddress.pincode as R_pincode")
                                                  .append(" ,permanentAddress.district_id as R_district_id") 
                                                  .append(" ,permanentAddress.state_id as R_state_id")
                                                  .append(" ,permanentAddress.country_id as R_country_id")  
                                                  .append(" ,permanentAddress.taluk_name_en as R_taluk_name_en")
                                                  .append(" ,permanentAddress.taluk_name_ml as  R_taluk_name_ml") 
                                                  .append(" ,permanentAddress.village_name_en as  R_village_name_en")
                                                  .append(" ,permanentAddress.village_name_ml as  R_village_name_ml")
                                                  .append(" ,permanentAddress.postoffice_name_en as  R_postoffice_name_en")
                                                  .append(" ,permanentAddress.postoffice_name_ml as  R_postoffice_name_ml")
                                                  .append(" ,informantAddress.death_dtl_id  as I_death_dtl_id") 
                                                  .append(" ,informantAddress.tenantid as I_tenantid") 
                                                  .append(" ,informantAddress.addr_typeid as I_addr_typeid") 
                                                  .append(" ,informantAddress.house_no as I_house_no")
                                                  .append(" ,informantAddress.residence_assc_no as I_residence_assc_no") 
                                                  .append(" ,informantAddress.streetname_en as I_streetname_en") 
                                                  .append(" ,informantAddress.streetname_ml as I_streetname_ml ") 
                                                  .append(" ,informantAddress.locality_en as I_locality_en")
                                                  .append(" ,informantAddress.locality_ml as I_locality_ml ") 
                                                  .append(" ,informantAddress.city_en as I_city_en") 
                                                  .append(" ,informantAddress.city_ml as I_city_ml") 
                                                  .append(" ,informantAddress.ward_id as I_ward_id") 
                                                  .append(" ,informantAddress.taluk_id as I_taluk_id") 
                                                  .append(" ,informantAddress.village_id as I_village_id")
                                                  .append(" ,informantAddress.postoffice_id as I_postoffice_id") 
                                                  .append(" ,informantAddress.pincode as I_pincode") 
                                                  .append(" ,informantAddress.district_id as I_district_id") 
                                                  .append(" ,informantAddress.state_id as I_state_id") 
                                                  .append(" ,informantAddress.country_id as I_country_id") 
                                                  .append(" ,informantAddress.taluk_name_en as I_taluk_name_en")
                                                  .append(" ,informantAddress.taluk_name_ml as  I_taluk_name_ml") 
                                                  .append(" ,informantAddress.village_name_en as  I_village_name_en") 
                                                  .append(" ,informantAddress.village_name_ml as  I_village_name_ml") 
                                                  .append(" ,informantAddress.postoffice_name_en as  I_postoffice_name_en")
                                                  .append(" ,informantAddress.postoffice_name_ml as  I_postoffice_name_ml") 
                                                  .append(" ,deathplaceAddress.death_dtl_id  as D_death_dtl_id") 
                                                  .append(" ,deathplaceAddress.tenantid as D_tenantid") 
                                                  .append(" ,deathplaceAddress.addr_typeid as D_addr_typeid") 
                                                  .append(" ,deathplaceAddress.house_no as D_house_no") 
                                                  .append(" ,deathplaceAddress.residence_assc_no as D_residence_assc_no") 
                                                  .append(" ,deathplaceAddress.streetname_en as D_streetname_en") 
                                                  .append(" ,deathplaceAddress.streetname_ml as D_streetname_ml") 
                                                  .append(" ,deathplaceAddress.locality_en as D_locality_en ") 
                                                  .append(" ,deathplaceAddress.locality_ml as D_locality_ml")
                                                  .append(" ,deathplaceAddress.city_en as D_city_en") 
                                                  .append(" ,deathplaceAddress.city_ml as D_city_ml")
                                                  .append(" ,deathplaceAddress.ward_id as D_ward_id ") 
                                                  .append(" ,deathplaceAddress.taluk_id as D_taluk_id")
                                                  .append(" ,deathplaceAddress.village_id as D_village_id") 
                                                  .append(" ,deathplaceAddress.postoffice_id as D_postoffice_id")
                                                  .append(" ,deathplaceAddress.pincode as D_pincode") 
                                                  .append(" ,deathplaceAddress.district_id as D_district_id") 
                                                  .append(" ,deathplaceAddress.state_id as D_state_id") 
                                                  .append(" ,deathplaceAddress.country_id as D_country_id")
                                                  .append(" ,deathplaceAddress.taluk_name_en as D_taluk_name_en ") 
                                                  .append(" ,deathplaceAddress.taluk_name_ml as  D_taluk_name_ml")
                                                  .append(" ,deathplaceAddress.village_name_en as  D_village_name_en") 
                                                  .append(" ,deathplaceAddress.village_name_ml as  D_village_name_ml") 
                                                  .append(" ,deathplaceAddress.postoffice_name_en as  D_postoffice_name_en") 
                                                  .append(" ,deathplaceAddress.postoffice_name_ml as  D_postoffice_name_ml")
                                                  .append(" ,applicantAddress.death_dtl_id  as A_death_dtl_id") 
                                                  .append(" ,applicantAddress.tenantid as A_tenantid") 
                                                  .append(" ,applicantAddress.addr_typeid as A_addr_typeid") 
                                                  .append(" ,applicantAddress.house_no as A_house_no")
                                                  .append(" ,applicantAddress.residence_assc_no as A_residence_assc_no") 
                                                  .append(" ,applicantAddress.streetname_en as A_streetname_en") 
                                                  .append(" ,applicantAddress.streetname_ml as A_streetname_ml ") 
                                                  .append(" ,applicantAddress.locality_en as A_locality_en")
                                                  .append(" ,applicantAddress.locality_ml as A_locality_ml ") 
                                                  .append(" ,applicantAddress.city_en as A_city_en")
                                                  .append(" ,applicantAddress.city_ml as A_city_ml") 
                                                  .append(" ,applicantAddress.ward_id as A_ward_id")
                                                  .append(" ,applicantAddress.taluk_id as A_taluk_id") 
                                                  .append(" ,applicantAddress.village_id as A_village_id")
                                                  .append(" ,applicantAddress.postoffice_id as A_postoffice_id") 
                                                  .append(" ,applicantAddress.pincode as A_pincode") 
                                                  .append(" ,applicantAddress.district_id as A_district_id") 
                                                  .append(" ,applicantAddress.state_id as A_state_id") 
                                                  .append(" ,applicantAddress.country_id as A_country_id") 
                                                  .append(" ,applicantAddress.taluk_name_en as A_taluk_name_en")
                                                  .append(" ,applicantAddress.taluk_name_ml as  A_taluk_name_ml") 
                                                  .append(" ,applicantAddress.village_name_en as  A_village_name_en") 
                                                  .append(" ,applicantAddress.village_name_ml as  A_village_name_ml") 
                                                  .append(" ,applicantAddress.postoffice_name_en as  A_postoffice_name_en")
                                                  .append(" ,applicantAddress.postoffice_name_ml as  A_postoffice_name_ml")
                                                  .append(" FROM eg_death_dtls dt ") 
                                                  .append("LEFT OUTER JOIN eg_death_statistical_dtls stat ON stat.death_dtl_id = dt.id  AND dt.tenantid = stat.tenantid ")
                                                  .append("LEFT OUTER JOIN eg_death_address_dtls presentaddress ON ")
                                                  .append("presentaddress.death_dtl_id = dt.id ")
                                                  .append(" AND  presentaddress.addr_typeid='P'")
                                                  .append(" LEFT OUTER JOIN eg_death_address_dtls permanentAddress ON ")
                                                  .append(" permanentAddress.death_dtl_id = dt.id")
                                                  .append(" AND  permanentaddress.addr_typeid='R'")
                                                  .append(" LEFT OUTER JOIN eg_death_address_dtls informantAddress ON ")
                                                  .append(" informantAddress.death_dtl_id = dt.id ")
                                                  .append(" AND  informantAddress.addr_typeid='I' ")
                                                  .append(" LEFT OUTER JOIN eg_death_address_dtls deathplaceAddress ON ")
                                                  .append(" deathplaceAddress.death_dtl_id = dt.id ")
                                                  .append(" AND  deathplaceAddress.addr_typeid='D' ")
                                                  .append(" LEFT OUTER JOIN eg_death_address_dtls applicantAddress ON ") 
                                                  .append(" applicantAddress.death_dtl_id = dt.id ")
                                                  .append(" AND  applicantAddress.addr_typeid='A' ")
                                                  .toString();


    public String getDeathSearchQuery(@NotNull CrDeathSearchCriteria criteria,
                                                           @NotNull List<Object> preparedStmtValues, Boolean isCount) {
         
         StringBuilder query = new StringBuilder(QUERY);
         addFilter("dt.id", criteria.getId(), query, preparedStmtValues);
         addFilter("dt.tenantid", criteria.getTenantId(), query, preparedStmtValues);
         addFilter("dt.application_no", criteria.getDeathApplicationNo(), query, preparedStmtValues);  
         addFilter("dt.ack_no", criteria.getDeathACKNo(), query, preparedStmtValues);  
         addFilter("dt.deceased_firstname_en", criteria.getDeceasedFirstNameEn(), query, preparedStmtValues);  
         addDateRangeFilter("dt.dateofdeath",
         criteria.getFromDate(),
         criteria.getToDate(),
         query,
         preparedStmtValues);
         return query.toString();
       }    
       
       public String getDeathSearchQueryforRegistry(@NotNull String deathId,
       @NotNull List<Object> preparedStmtValues, Boolean isCount) {

          StringBuilder query = new StringBuilder(QUERY);
          addFilter("dt.id", deathId, query, preparedStmtValues);
          return query.toString();
     }  
    
       //Rakhi S on 21.01.2023
       private static final String ACKNOQUERY = new StringBuilder()
                                             .append("Select A.ackNo , A.applnYear , A.tenantId from ")
                                             .append("(SELECT MAX(COALESCE(ack_no_id,0))+1 as ackNo,EXTRACT(year from to_timestamp( application_date/1000)::date ) AS applnYear ")
                                             .append(",tenantId FROM eg_death_dtls dt group by applnYear,tenantId )A ") 
                                             .toString();

       public String getDeathAckNoIdQuery(@NotNull String tenantId ,int Year ,@NotNull List<Object> preparedStmtValues) {
          StringBuilder query = new StringBuilder(ACKNOQUERY);
          addFilter("A.tenantId",tenantId , query, preparedStmtValues);
          addFilter("A.applnYear", Year, query, preparedStmtValues);                                          
          return query.toString();
        }  
}
