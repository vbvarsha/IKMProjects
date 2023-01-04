package org.ksmart.birth.birthapplication.repository.rowmapper;

import org.ksmart.birth.birthapplication.model.birth.BirthPermanentAddress;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BirthPermanentAddressRowMapper {

    default BirthPermanentAddress getBirthPermanentAddress(ResultSet rs) throws SQLException {
        return BirthPermanentAddress.builder()
                .id(rs.getString("id"))
                //.re(rs.getString("resdnce_addr_type"))
                .buildingNo(rs.getString("buildingno"))
                .houseNo(rs.getString("houseno"))
                .resAssoNo(rs.getString("res_asso_no"))
                .houseNameEn(rs.getString("housename_en"))
                .houseNameMl(rs.getString("housename_ml"))
                .otAddress1En(rs.getString("ot_address1_en"))
                .otAddress1Ml(rs.getString("ot_address1_ml"))
                .otAddress2En(rs.getString("ot_address2_en"))
                .otAddress2Ml(rs.getString("ot_address2_ml"))
                .localityEn(rs.getString("locality_en"))
                .localityMl(rs.getString("locality_ml"))
                .cityEn(rs.getString("city_en"))
                .cityMl(rs.getString("city_ml"))
                .villageId(rs.getString("villageid"))
                .tenantId(rs.getString("tenantid"))
                .talukId(rs.getString("talukid"))
                .districtId(rs.getString("districtid"))
                .stateId(rs.getString("stateid"))
                .poId(rs.getString("poid"))
                .pinNo(rs.getString("pinno"))
                .otStateRegionProvinceEn(rs.getString("ot_state_region_province_en"))
                .otStateRegionProvinceMl(rs.getString("ot_state_region_province_ml"))
                .countryId(rs.getString("countryid"))
                .birthDtlId(rs.getString("birthdtlid"))
                .sameAsPermanent(rs.getInt("same_as_permanent"))
                .build();
    }
}
