package org.ksmart.marriage.marriageregistry.repository.rowmapper;

//import org.ksmart.marriage.marriageapplication.web.model.marriage.PresentAddressDetails;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.marriage.marriageregistry.web.model.GroomRegistryAddressDetails;

public interface GroomRegistryAddressRowMapper {
    default GroomRegistryAddressDetails getGroomAddressDetails (ResultSet rs) throws SQLException {

        return GroomRegistryAddressDetails.builder()

//              PRESENT

                .presentUuid(rs.getString("GPSA_id"))
                .presentaddressCountry(rs.getString("GPSA_countryid"))
                .presentaddressStateName(rs.getString("GPSA_stateid"))
                .presentInsideKeralaLBName(rs.getString("GPSA_tenantid"))
                .presentInsideKeralaDistrict(rs.getString("GPSA_districtid"))
                .presentInsideKeralaTaluk(rs.getString("GPSA_talukid"))
                .presentInsideKeralaVillage(rs.getString("GPSA_villageid"))
                .presentInsideKeralaLocalityNameEn(rs.getString("GPSA_locality_en"))
                .presentInsideKeralaStreetNameEn(rs.getString("GPSA_street_name_en"))
                .presentInsideKeralaHouseNameEn(rs.getString("GPSA_housename_en"))
                .presentInsideKeralaLocalityNameMl(rs.getString("GPSA_locality_ml"))
                .presentInsideKeralaStreetNameMl(rs.getString("GPSA_street_name_ml"))
                .presentInsideKeralaHouseNameMl(rs.getString("GPSA_housename_ml"))
                .presentInsideKeralaPincode(rs.getString("GPSA_pinno"))
                .presentInsideKeralaPostOffice(rs.getString("GPSA_poid"))
                .presentWardNo(rs.getString("GPSA_ward_code"))
                .presentOutsideKeralaDistrict(rs.getString("GPSA_districtid"))
                .presentOutsideKeralaTalukName(rs.getString("GPSA_taluk_name"))
                //.presentOutsideKeralaCityVilgeEn(rs.getString("GPSA_village_name "))
                .presentOutsideKeralaPincode(rs.getString("GPSA_pinno"))
                .presentOutsideKeralaPostOfficeEn(rs.getString("GPSA_poname_en"))
                .presentOutsideKeralaPostOfficeMl(rs.getString("GPSA_poname_ml"))
                .presentOutsideKeralaLocalityNameEn(rs.getString("GPSA_locality_en"))
                .presentOutsideKeralaStreetNameEn(rs.getString("GPSA_street_name_en"))
                .presentOutsideKeralaHouseNameEn(rs.getString("GPSA_housename_en"))
                .presentOutsideKeralaLocalityNameMl(rs.getString("GPSA_locality_ml"))
                .presentOutsideKeralaStreetNameMl(rs.getString("GPSA_street_name_en"))
                .presentOutsideKeralaHouseNameMl(rs.getString("GPSA_housename_ml"))
                .presentOutSideIndiaAdressEn(rs.getString("GPSA_ot_address1_en"))
                .presentOutSideIndiaAdressMl(rs.getString("GPSA_ot_address1_ml"))
                .presentOutSideIndiaAdressEnB(rs.getString("GPSA_ot_address2_en"))
                .presentOutSideIndiaAdressMlB(rs.getString("GPSA_ot_address2_ml"))
                .presentOutSideIndiaProvinceEn(rs.getString("GPSA_ot_state_region_province_en"))
                .presentOutSideIndiaProvinceMl(rs.getString("GPSA_ot_state_region_province_ml"))
                .presentOutSideIndiaPostCode(rs.getString("GPSA_ot_zipcode"))




//                PERMANENT


                .permanentUuid(rs.getString("GPMA_id"))
                .permtaddressCountry(rs.getString("GPMA_countryid"))
                .permtaddressStateName(rs.getString("GPMA_stateid"))
                .permntInKeralaAdrLBName(rs.getString("GPMA_tenantid"))
                .permntInKeralaAdrDistrict(rs.getString("GPMA_districtid"))
             //   .permntOutsideKeralaCityVilgeEn(rs.getString("GPMA_village_name "))
                .permntInKeralaAdrTaluk(rs.getString("GPMA_talukid"))
                .permntInKeralaAdrVillage(rs.getString("GPMA_villageid"))
                .permntInKeralaAdrLocalityNameEn(rs.getString("GPMA_locality_en"))
                .permntInKeralaAdrStreetNameEn(rs.getString("GPMA_street_name_en"))
                .permntInKeralaAdrHouseNameEn(rs.getString("GPMA_housename_en"))
                .permntInKeralaAdrLocalityNameMl(rs.getString("GPMA_locality_en"))
                .permntInKeralaAdrStreetNameMl(rs.getString("GPMA_street_name_ml"))
                .permntInKeralaAdrHouseNameMl(rs.getString("GPMA_housename_ml"))
                .permntInKeralaAdrPincode(rs.getString("GPMA_pinno"))
                .permntInKeralaAdrPostOffice(rs.getString("GPMA_poid"))
                .permntInKeralaWardNo(rs.getString("GPMA_ward_code"))
                .permntOutsideKeralaDistrict(rs.getString("GPMA_districtid"))
                .permntOutsideKeralaTaluk(rs.getString("GPMA_taluk_name"))
                .permntOutsideKeralaVillage(rs.getString("GPMA_village_name"))
                .permntOutsideKeralaPincode(rs.getString("GPMA_pinno"))
                .permntOutsideKeralaLocalityNameEn(rs.getString("GPMA_locality_en"))
                .permntOutsideKeralaStreetNameEn(rs.getString("GPMA_street_name_en"))
                .permntOutsideKeralaHouseNameEn(rs.getString("GPMA_housename_en"))
                .permntOutsideKeralaLocalityNameMl(rs.getString("GPMA_locality_en"))
                .permntOutsideKeralaStreetNameMl(rs.getString("GPMA_street_name_ml"))
                .permntOutsideKeralaHouseNameMl(rs.getString("GPMA_housename_ml"))
                .permntOutsideKeralaPostOfficeEn(rs.getString("GPMA_poname_en"))
                .permntOutsideKeralaPostOfficeMl(rs.getString("GPMA_poname_ml"))
                .permntOutsideIndiaLineoneEn(rs.getString("GPMA_ot_address1_en"))
                .permntOutsideIndiaLineoneMl(rs.getString("GPMA_ot_address1_ml"))
                .permntOutsideIndiaLinetwoEn(rs.getString("GPMA_ot_address2_en"))
                .permntOutsideIndiaLinetwoMl(rs.getString("GPMA_ot_address2_ml"))
                //  .permntOutsideIndiaVillage(rs.getString(""))
                // .permntOutsideIndiaCityTown(rs.getString(""))
                .permanentOutsideIndiaPostCode(rs.getString("GPMA_ot_zipcode"))
                .permntOutSideIndiaProvinceMl(rs.getString("GPMA_ot_state_region_province_ml"))
                .permntOutSideIndiaProvinceEn(rs.getString("GPMA_ot_state_region_province_en"))

//                .isPermanentAddress(rs.getInt("GPMA_same_as_present")==1?true:false)
//                .isPermanentAddressInt(rs.getInt("GPMA_same_as_present"))
                .build();
    }
}
