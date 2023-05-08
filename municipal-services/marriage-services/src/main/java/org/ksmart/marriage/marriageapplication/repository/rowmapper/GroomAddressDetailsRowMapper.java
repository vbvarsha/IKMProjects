package org.ksmart.marriage.marriageapplication.repository.rowmapper;

//import org.ksmart.marriage.marriageapplication.web.model.marriage.PresentAddressDetails;

import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomAddressDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface GroomAddressDetailsRowMapper {
    default GroomAddressDetails getGroomAddressDetailsRowMapper (ResultSet rs) throws SQLException {

        return GroomAddressDetails.builder()

        .countryIdPresent(rs.getString("GPSA_countryid"))
        .stateIdPresent(rs.getString("GPSA_stateid"))
        .districtIdPresent(rs.getString("GPSA_districtid"))
        .poNoPresent(rs.getString("GPSA_poid"))
        .pinNoPresent(rs.getString("GPSA_pinno"))
        .localityEnPresent(rs.getString("GPSA_locality_en"))
        .localityMlPresent(rs.getString("GPSA_locality_ml"))
        .streetNameEnPresent(rs.getString("GPSA_street_name_en"))
        .streetNameMlPresent(rs.getString("GPSA_street_name_ml"))
        .houseNameNoEnPresent(rs.getString("GPSA_housename_en"))
        .houseNameNoMlPresent(rs.getString("GPSA_housename_ml"))
        .presentInsideKeralaTaluk(rs.getString("GPSA_talukid"))
        .presentInsideKeralaVillage(rs.getString("GPSA_villageid"))
        .villageNamePresent(rs.getString("GPSA_village_name"))
        .presentInsideKeralaLBName(rs.getString("GPSA_present_tenentid"))
        .presentWardNo(rs.getString("GPSA_ward_code"))
        .presentInsideKeralaPostOffice(rs.getString("GPSA_poid"))
        .presentUuid(rs.getString("GPSA_id"))
        .presentOutsideKeralaTalukName(rs.getString("GPSA_taluk_name"))
        .townOrVillagePresent(rs.getString("GPSA_city_town_village"))
        .presentOutsideKeralaCityVilgeNameEn(rs.getString("GPSA_village_name"))
        .presentOutsideKeralaPostOfficeEn(rs.getString("GPSA_poname_en"))
        .presentOutsideKeralaPostOfficeMl(rs.getString("GPSA_poname_ml"))
        .presentOthrIndiaAdressEn(rs.getString("GPSA_ot_address1_en"))
        .presentOthrIndiaAdressMl(rs.getString("GPSA_ot_address1_ml"))
        .presentOthrIndiaAdressEnB(rs.getString("GPSA_ot_address2_en"))
        .presentOthrIndiaAdressMlB(rs.getString("GPSA_ot_address2_ml"))
        .presentOthrIndiaProvinceEn(rs.getString("GPSA_ot_state_region_province_en"))
        .presentOthrIndiaProvinceMl(rs.getString("GPSA_ot_state_region_province_ml"))
        .outSideIndiaPostCodePresent(rs.getString("GPSA_ot_zipcode"))
        .brideGroomPresent(rs.getString("GPSA_bride_groom"))

  //PERMANENT

        .countryIdPermanent(rs.getString("GPMA_countryid"))
        .stateIdPermanent(rs.getString("GPMA_stateid"))
        .districtIdPermanent(rs.getString("GPMA_districtid"))
        .poNoPermanent(rs.getString("GPMA_poid"))
        .pinNoPermanent(rs.getString("GPMA_pinno"))
        .localityEnPermanent(rs.getString("GPMA_locality_en"))
        .localityMlPermanent(rs.getString("GPMA_locality_ml"))
        .streetNameEnPermanent(rs.getString("GPMA_street_name_en"))
        .streetNameMlPermanent(rs.getString("GPMA_street_name_ml"))
        .houseNameNoEnPermanent(rs.getString("GPMA_housename_en"))
        .houseNameNoMlPermanent(rs.getString("GPMA_housename_ml"))
        .villageNamePermanent(rs.getString("GPMA_village_name"))
        .permanentUuid(rs.getString("GPMA_id"))
        .permntInKeralaAdrLBName(rs.getString("GPMA_permanent_tenentid"))
        .townOrVillagePermanent(rs.getString("GPMA_city_town_village"))
        .permntInKeralaAdrTaluk(rs.getString("GPMA_talukid"))
        .permntInKeralaAdrVillage(rs.getString("GPMA_villageid"))
        .permntInKeralaAdrPostOffice(rs.getString("GPMA_poid"))
        .permntInKeralaWardNo(rs.getString("GPMA_ward_code"))
        .permntOutsideKeralaCityVilgeEn(rs.getString("GPMA_village_name"))
        .permntOutsideKeralaPostOfficeEn(rs.getString("GPMA_poname_en"))
        .permntOutsideKeralaPostOfficeMl(rs.getString("GPMA_poname_ml"))
        .permntOthrIndiaLineoneEn(rs.getString("GPMA_ot_address1_en"))
        .permntOthrIndiaLineoneMl(rs.getString("GPMA_ot_address1_ml"))
        .permntOthrIndiaLinetwoEn(rs.getString("GPMA_ot_address2_en"))
        .permntOthrIndiaLinetwoMl(rs.getString("GPMA_ot_address2_ml"))
        .permntOthrIndiaprovinceEn(rs.getString("GPMA_ot_state_region_province_en"))
        .permntOthrIndiaprovinceMl(rs.getString("GPMA_ot_state_region_province_ml"))
        .outSideIndiaPostCodePermanent(rs.getString("GPMA_ot_zipcode"))
        .brideGroomPermanent(rs.getString("GPMA_bride_groom"))
        .build();

// //              PRESENT
//                 .countryIdPresent(rs.getString("GPSA_countryid"))
//                 .stateIdPresent(rs.getString("GPSA_stateid"))
//                 .districtIdPresent(rs.getString("GPSA_districtid"))
//                 .poNoPresent(rs.getString("GPSA_poid"))
//                 .pinNoPresent(rs.getString("GPSA_pinno"))
//                 .localityEnPresent(rs.getString("GPSA_locality_en"))
//                 .localityMlPresent(rs.getString("GPSA_locality_ml"))
//                 .streetNameEnPresent(rs.getString("GPSA_street_name_en"))
//                 .streetNameMlPresent(rs.getString("GPSA_street_name_ml"))
//                 .houseNameNoEnPresent(rs.getString("GPSA_housename_en"))
//                 .houseNameNoMlPresent(rs.getString("GPSA_housename_ml"))
//                 .villageNamePresent(rs.getString("GPSA_village_name"))
//                 .townOrVillagePresent(rs.getString("GPSA_city_town_village"))
//                 .presentInsideKeralaLBName(rs.getString("GPSA_tenantid"))
//                 .presentUuid(rs.getString("GPSA_id"))
//                // .presentaddressCountry(rs.getString("GPSA_countryid"))
//               //  .presentaddressStateName(rs.getString("GPSA_stateid"))
//                // .presentInsideKeralaLBName(rs.getString("GPSA_tenantid"))
//                // .presentInsideKeralaDistrict(rs.getString("GPSA_districtid"))
//                 .presentInsideKeralaTaluk(rs.getString("GPSA_talukid"))
//                 .presentInsideKeralaVillage(rs.getString("GPSA_villageid"))
//                // .presentInsideKeralaLocalityNameEn(rs.getString("GPSA_locality_en"))
//                 //.presentInsideKeralaStreetNameEn(rs.getString("GPSA_street_name_en"))
//               // .presentInsideKeralaHouseNameEn(rs.getString("GPSA_housename_en"))
//                // .presentInsideKeralaLocalityNameMl(rs.getString("GPSA_locality_ml"))
//                // .presentInsideKeralaStreetNameMl(rs.getString("GPSA_street_name_ml"))
//                // .presentInsideKeralaHouseNameMl(rs.getString("GPSA_housename_ml"))
//                // .presentInsideKeralaPincode(rs.getString("GPSA_pinno"))
//                 .presentInsideKeralaPostOffice(rs.getString("GPSA_poid"))
//                 .presentWardNo(rs.getString("GPSA_ward_code"))
//               //  .presentOutsideKeralaDistrict(rs.getString("GPSA_districtid"))
//                 .presentOutsideKeralaTalukName(rs.getString("GPSA_taluk_name"))
//                 .presentOutsideKeralaCityVilgeNameEn(rs.getString("GPSA_village_name"))
//               //  .presentOutsideKeralaPincode(rs.getString("GPSA_pinno"))
//                 .presentOutsideKeralaPostOfficeEn(rs.getString("GPSA_poname_en"))
//                 .presentOutsideKeralaPostOfficeMl(rs.getString("GPSA_poname_ml"))
//               //  .presentOutsideKeralaLocalityNameEn(rs.getString("GPSA_locality_en"))
//                 //.presentOutsideKeralaStreetNameEn(rs.getString("GPSA_street_name_en"))
//                 //.presentOutsideKeralaHouseNameEn(rs.getString("GPSA_housename_en"))
//                // .presentOutsideKeralaLocalityNameMl(rs.getString("GPSA_locality_ml"))
//                // .presentOutsideKeralaStreetNameMl(rs.getString("GPSA_street_name_en"))
//                // .presentOutsideKeralaHouseNameMl(rs.getString("GPSA_housename_ml"))
//                 .presentOutSideIndiaAdressEn(rs.getString("GPSA_ot_address1_en"))
//                 .presentOutSideIndiaAdressMl(rs.getString("GPSA_ot_address1_ml"))
//                 .presentOutSideIndiaAdressEnB(rs.getString("GPSA_ot_address2_en"))
//                 .presentOutSideIndiaAdressMlB(rs.getString("GPSA_ot_address2_ml"))
// //                .presentOutSideIndiaadrsCityTown(rs.getString("GPSA_city_town_village"))
//                .presentOutSideIndiaadrsVillage(rs.getString("GPSA_village_name"))
//                 .presentOutSideIndiaProvinceEn(rs.getString("GPSA_ot_state_region_province_en"))
//                 .presentOutSideIndiaProvinceMl(rs.getString("GPSA_ot_state_region_province_ml"))
//                 .presentOutSideIndiaPostCode(rs.getString("GPSA_ot_zipcode"))
//                 .brideGroomPresent(rs.getString("GPSA_bride_groom"))




// //                PERMANENT

//                 .countryIdPermanent(rs.getString("GPMA_countryid"))
//                 .stateIdPermanent(rs.getString("GPMA_stateid"))
//                 .districtIdPermanent(rs.getString("GPMA_districtid"))
//                 .poNoPermanent(rs.getString("GPMA_poid"))
//                 .pinNoPermanent(rs.getString("GPMA_pinno"))
//                 .localityEnPermanent(rs.getString("GPMA_locality_en"))
//                 .localityMlPermanent(rs.getString("GPMA_locality_ml"))
//                 .streetNameEnPermanent(rs.getString("GPMA_street_name_en"))
//                 .streetNameMlPermanent(rs.getString("GPMA_street_name_ml"))
//                 .houseNameNoEnPermanent(rs.getString("GPMA_housename_en"))
//                 .houseNameNoMlPermanent(rs.getString("GPMA_housename_ml"))
//                 .villageNamePermanent(rs.getString("GPMA_village_name"))
//                 .permanentUuid(rs.getString("GPMA_id"))
//                 .townOrVillagePermanent(rs.getString("GPMA_city_town_village"))

//                 //.permtaddressCountry(rs.getString("GPMA_countryid"))
//                 //.permtaddressStateName(rs.getString("GPMA_stateid"))
//                 .permntInKeralaAdrLBName(rs.getString("GPMA_tenantid"))
//                 //.permntInKeralaAdrDistrict(rs.getString("GPMA_districtid"))
//                 .permntOutsideKeralaCityVilgeEn(rs.getString("GPMA_village_name"))
//                 .permntInKeralaAdrTaluk(rs.getString("GPMA_talukid"))
//                 .permntInKeralaAdrVillage(rs.getString("GPMA_villageid"))
//                // .permntInKeralaAdrLocalityNameEn(rs.getString("GPMA_locality_en"))
//               //  .permntInKeralaAdrStreetNameEn(rs.getString("GPMA_street_name_en"))
//                // .permntInKeralaAdrHouseNameEn(rs.getString("GPMA_housename_en"))
//                 //.permntInKeralaAdrLocalityNameMl(rs.getString("GPMA_locality_en"))
//                // .permntInKeralaAdrStreetNameMl(rs.getString("GPMA_street_name_ml"))
//                // .permntInKeralaAdrHouseNameMl(rs.getString("GPMA_housename_ml"))
//               //  .permntInKeralaAdrPincode(rs.getString("GPMA_pinno"))
//                 .permntInKeralaAdrPostOffice(rs.getString("GPMA_poid"))
//                 .permntInKeralaWardNo(rs.getString("GPMA_ward_code"))
//               //  .permntOutsideKeralaDistrict(rs.getString("GPMA_districtid"))
//                 .permntOutsideKeralaTaluk(rs.getString("GPMA_taluk_name"))
// //                .permntOutsideKeralaVillageorTwon(rs.getString("GPMA_city_town_village"))
// //                .permntOutsideKeralaPincode(rs.getString("GPMA_pinno"))
//                 //.permntOutsideKeralaLocalityNameEn(rs.getString("GPMA_locality_en"))
//                 //.permntOutsideKeralaStreetNameEn(rs.getString("GPMA_street_name_en"))
//           //      .permntOutsideKeralaHouseNameEn(rs.getString("GPMA_housename_en"))
//                // .permntOutsideKeralaLocalityNameMl(rs.getString("GPMA_locality_en"))
//                // .permntOutsideKeralaStreetNameMl(rs.getString("GPMA_street_name_ml"))
//                // .permntOutsideKeralaHouseNameMl(rs.getString("GPMA_housename_ml"))
//                 .permntOutsideKeralaPostOfficeEn(rs.getString("GPMA_poname_en"))
//                 .permntOutsideKeralaPostOfficeMl(rs.getString("GPMA_poname_ml"))
//                 .permntOutsideIndiaLineoneEn(rs.getString("GPMA_ot_address1_en"))
//                 .permntOutsideIndiaLineoneMl(rs.getString("GPMA_ot_address1_ml"))
//                 .permntOutsideIndiaLinetwoEn(rs.getString("GPMA_ot_address2_en"))
//                 .permntOutsideIndiaLinetwoMl(rs.getString("GPMA_ot_address2_ml"))
// //                .permntOutsideIndiaVillage(rs.getString(""))
//                 .permanentOutsideIndiaPostCode(rs.getString("GPMA_ot_zipcode"))
//                 .permntOutSideIndiaProvinceMl(rs.getString("GPMA_ot_state_region_province_ml"))
//                 .permntOutSideIndiaProvinceEn(rs.getString("GPMA_ot_state_region_province_en"))
//                 .brideGroomPermanent(rs.getString("GPMA_bride_groom"))
//                 .permntOutsideKeralaCityVilgeEn(rs.getString("GPMA_village_name"))
// //                .permntOutsideIndiaCityTown(rs.getString("GPMA_city_town_village"))

// //                .isPermanentAddress(rs.getInt("GPMA_same_as_present")==1?true:false)
// //                .isPermanentAddressInt(rs.getInt("GPMA_same_as_present"))
//                 .build();
    }
}
