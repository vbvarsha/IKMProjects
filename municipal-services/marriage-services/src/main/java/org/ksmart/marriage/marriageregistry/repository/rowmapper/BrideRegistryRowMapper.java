package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.ksmart.marriage.marriageregistry.model.BrideRegistryDetails;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
        
@Component
public interface BrideRegistryRowMapper {
    default BrideRegistryDetails getBrideDetails (ResultSet rs) throws SQLException{

      return BrideRegistryDetails.builder()
      .residentship(rs.getString("BD_residentship"))
      .adharno(rs.getString("BD_aadharno"))
      .passportno(rs.getString("BD_passportno"))
      .socialsecurityno(rs.getString("BD_socialsecurityno"))
      .firstname_en(rs.getString("BD_firstname_en"))
      .firstname_ml(rs.getString("BD_firstname_ml"))
      .middlename_en(rs.getString("BD_middlename_en"))
      .middlename_ml(rs.getString("BD_middlename_ml"))
      .lastname_en(rs.getString("BD_lastname_en"))
      .lastname_ml(rs.getString("BD_lastname_ml"))
      .mobile(rs.getString("BD_mobile"))
      .emailid(rs.getString("BD_emailid"))
      .gender(rs.getString("BD_gender"))
      .dateofbirth(rs.getLong("BD_dateofbirth"))
      .age(rs.getInt("BD_age"))
      .parent_guardian(rs.getString("BD_parent_guardian"))
      .fathername_en(rs.getString("BD_fathername_en"))
      .fathername_ml(rs.getString("BD_fathername_ml"))
      .mothername_en(rs.getString("BD_mothername_en"))
      .mothername_ml(rs.getString("BD_mothername_ml"))
      .father_adharno(rs.getString("BD_father_aadharno"))
      .mother_adharno(rs.getString("BD_mother_aadharno"))
      .guardianname_en(rs.getString("BD_guardianname_en"))
      .guardianname_ml(rs.getString("BD_guardianname_ml"))
      .guardian_adhar(rs.getString("BD_guardian_aadharno"))
      .maritalstatusid(rs.getString("BD_maritalstatusid"))
      //.is_spouse_living(Boolean.valueOf(rs.getString("BD_is_spouse_living")))
      .no_of_spouse_living(Integer.valueOf(rs.getString("BD_livingspouseNo")))
      //.photo_url(rs.getString("BD_photo_url"))
    //  .marriageid(rs.getString("BD_marriageid"))
      .build();




    }
}
