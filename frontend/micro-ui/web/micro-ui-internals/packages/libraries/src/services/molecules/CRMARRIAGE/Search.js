import cloneDeep from "lodash/cloneDeep";
import { CRMarriageService } from "../../elements/CRMARRIAGE";
// import { convertEpochToDateDMY } from  "../../utils";

const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

/* method to get date from epoch */
const convertEpochToDate = (dateEpoch) => {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  } else {
    return null;
  }
};
// const getAddress = (address, t) => {
//   return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
//     address?.landmark ? `${address?.landmark}, ` : ""
//   }${t(Digit.Utils.pt.getMohallaLocale(address?.locality.code, address?.tenantId))}, ${t(Digit.Utils.pt.getCityLocale(address?.tenantId))}${
//     address?.pincode && t(address?.pincode) ? `, ${address.pincode}` : " "
//   }`;
// };
export const CRSearchMarriage = {
  all: async (tenantId, filters = {}) => {
    const response = await CRMarriageService.CRMarriagesearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRMarriageService.CRMarriagesearch({ tenantId, filters });
    return response.MarriageDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRMarriageService.CRMarriagesearch({ tenantId, filters });
    return response.MarriageDetails;
  },

  applicationDetails: async (t, tenantId, applicationNo, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNo };
    const response = await CRSearchMarriage.application(tenantId, filter);
    console.log({ response });
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const marriageNumbers = response?.applicationNumber;
      const filters = { marriageNumbers, offset: 0 };
      numOfApplications = await CRMarriageService.numberOfApplications(tenantId, filters);
    }
    let employeeResponse = [];
    const MarriageSummaryDetails = {
      title: "CR_MARRIAGE_SUMMARY_DETAILS",
      asSectionHeader: true,
    };

    const MarriageDetails = {
      title: "CR_MARRIAGE_REGISTRATION_DETAILS",
      asSectionHeader: true,
      values: [
        { title: `${t("CR_SEARCH_APP_NO_LABEL")}`, value: response?.applicationNumber || "NA" },
        { title: `${t("CR_DATE_OF_MARRIAGE")}`, value: convertEpochToDate(response?.marriageDOM) || "NA" },
        { title: `${t("CS_COMMON_DISTRICT")}`, value: `${response?.marriageDistrictEn} / ${response?.marriageDistrictEn}`},
        { title: `${t("CS_COMMON_TALUK")}`, value: `${response?.marriageTalukNameEn} / ${response?.marriageTalukNameMl}` },
        { title: `${t("CS_COMMON_VILLAGE")}`, value: `${response?.marriageVillageNameEn} / ${response?.marriageVillageNameMl}` },
        { title: `${t("CS_LBTYPE")}`, value: response?.marriageLBtype || "NA" },
        { title: `${t("CS_LB")}`, value: response?.marriageTenantid || "NA" },
        { title: `${t("CS_COMMON_WARD")}`, value: response?.marriageWardCode || "NA" },
        { title: `${t("CR_MARRIAGE_PLACE_TYPE")}`, value: response?.marriagePlacetype || "NA" },
        {
          title: `${t("CR_MARRIAGE_TYPE")}`,
          value: response?.marriageType,
        },
      ],
    };

    if (
      response?.marriagePlacetype === "RELIGIOUS_INSTITUTION" ||
      response?.marriagePlacetype === "MANDAPAM_HALL_AND_OTHER" ||
      response?.marriagePlacetype === "SUB_REGISTRAR_OFFICE"
    ) {
      MarriageDetails.values.push({
        title: `${t("CR_NAME_OF_PLACE_EN")}/${t("CR_NAME_OF_PLACE_MAL")}`,
        value: `${response?.placeid}`,
      });
    } else if (response?.marriagePlacetype === "OTHER") {
      MarriageDetails.values.push(
        {
          title: `${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}/${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`,
          value: `${response?.marriagePlacenameEn}/${response?.marriagePlacenameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")}/${t("CR_STREET_NAME_ML")}`,
          value: `${response?.marriageStreetEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")}/${t("CR_LOCALITY_ML")}`,
          value: `${response?.marriageLocalityEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LANDMARK")}`,
          value: response?.marriageLandmark,
        }
      );
    } else if (response?.marriagePlacetype === "HOUSE") {
      MarriageDetails.values.push(
        {
          title: `${t("CR_HOUSE_NO_AND_NAME_EN")}/${t("CR_HOUSE_NO_AND_NAME_MAL")}`,
          value: `${response?.marriageHouseNoAndNameEn}/${response?.marriageHouseNoAndNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")}/${t("CR_STREET_NAME_ML")}`,
          value: `${response?.marriageStreetEn || "NA"} / ${response?.marriageStreetMl|| "NA"}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")}/${t("CR_LOCALITY_ML")}`,
          value: `${response?.marriageLocalityEn}/${response?.marriageLocalityMl}`,
        },
        {
          title: `${t("CR_LANDMARK")}`,
          value: response?.marriageLandmark,
        }
      );
    } else if (response?.marriagePlacetype === "PUBLIC_PLACE" || response?.marriagePlacetype === "PRIVATE_PLACE") {
      MarriageDetails.values.push(
        {
          title: `${t("CR_PUBLIC_PRIVATE_PLACE_EN")}/${t("CR_PUBLIC_PRIVATE_PLACE_ML")}`,
          value: `${response?.marriagePublicOrPrivateNamePlaceEn}/${response?.marriagePublicOrPrivateNamePlaceMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")}/${t("CR_STREET_NAME_ML")}`,
          value: `${response?.marriageStreetEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")}/${t("CR_LOCALITY_ML")}`,
          value: `${response?.marriageLocalityEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LANDMARK")}`,
          value: response?.marriageLandmark,
        }
      );
    }

    const GroomDetails = {
      title: "CR_GROOM_DETAILS",
      asSectionHeader: true,
      values: [
        {
          title: `${t("CR_GROOM_NATIONALITY_AND_RESIDENTSHIP")}`,
          value: response?.GroomDetails?.groomResidentShip || "NA",
        },
        {
          title: `${t("CR_GROOM_NAME_EN")} / ${t("CR_GROOM_NAME_ML")}`,
          value: `${response?.GroomDetails?.groomFirstnameEn ? response?.GroomDetails?.groomFirstnameEn : ""} ${
            response?.GroomDetails?.groomMiddlenameEn ? response?.GroomDetails?.groomMiddlenameEn : ""
          } ${response?.GroomDetails?.groomLastnameEn ? response?.GroomDetails?.groomLastnameEn : ""} / ${
            response?.GroomDetails?.groomFirstnameMl ? response?.GroomDetails?.groomFirstnameMl : ""
          } ${response?.GroomDetails?.groomMiddlenameMl ? response?.GroomDetails?.groomMiddlenameMl : ""} ${
            response?.GroomDetails?.groomLastnameMl ? response?.GroomDetails?.groomLastnameMl : ""
          }`,
        },
        {
          title: `${t("CR_GROOM_MOBILE_NO")}`,
          value: response?.GroomDetails?.groomMobile || "NA",
        },
        {
          title: `${t("CR_GROOM_EMAIL")}`,
          value: response?.GroomDetails?.groomEmailid || "NA",
        },
        {
          title: `${t("CR_GROOM_GENDER")}`,
          value: response?.GroomDetails?.groomGender || "NA",
        },
        {
          title: `${t("CR_GROOM_DATE_OF_BIRTH")}`,
          value: convertEpochToDate(response?.GroomDetails?.groomDOB) || "NA",
        },
        {
          title: `${t("CR_GROOM_AGE")}`,
          value: response?.GroomDetails?.groomAge || "NA",
        },
      ],
    };
    if (response?.GroomDetails?.groomResidentShip === "NRI" || response?.GroomDetails?.groomResidentShip === "FOREIGN") {
      GroomDetails.values.push(
        {
          title: `${t("CR_GROOM_PASSPORT_NO")}`,
          value: response?.GroomDetails?.groomPassportNo || "NA",
        },
        {
          title: `${t("CR_GROOM_SOCIAL_SECURITY_NO")}`,
          value: response?.GroomDetails?.groomSocialSecurityNo || "NA",
        }
      );
    } else if (response?.GroomDetails?.groomResidentShip === "INDIAN") {
      GroomDetails.values.push({
        title: `${t("CR_GROOM_AADHAR_NO")}`,
        value: response?.GroomDetails?.groomAadharNo || "NA",
      });
    }
    if (response?.GroomDetails?.groomMaritalstatusID === "MARRIED") {
      GroomDetails.values.push({
        title: `${t("CR_ANY_SPOUSE_LIVING")}`,
        value: response?.GroomDetails?.groomIsSpouseLiving ? "Yes" : "No",
      });
    }
    if (response?.GroomDetails?.groomMaritalstatusID === "MARRIED" && response?.GroomDetails?.groomIsSpouseLiving) {
      GroomDetails.values.push({ title: `${t("CR_NUMBER_OF_SPOUSE_LIVING")}`, value: response?.GroomDetails?.groomNoOfSpouse || "NA" });
    }
    if (response?.GroomDetails?.groomParentGuardian === "PARENT") {
      GroomDetails.values.push(
        {
          title: `${t("CR_GROOM_FATHER_AADHAR_NO")}`,
          value: response?.GroomDetails?.groomFatherAadharNo || "NA",
        },
        {
          title: `${t("CR_GROOM_FATHER_NAME_EN")} / ${t("CR_GROOM_FATHER_NAME_ML")}`,
          value: `${response?.GroomDetails?.groomFathernameEn} / ${response?.GroomDetails?.groomFathernameMl}`,
        },
        {
          title: `${t("CR_GROOM_MOTHER_AADHAR_NO")}`,
          value: response?.GroomDetails?.groomMotherAadharNo || "NA",
        },
        {
          title: `${t("CR_GROOM_MOTHER_NAME_EN")} / ${t("CR_GROOM_MOTHER_NAME_EN")}`,
          value: `${response?.GroomDetails?.groomMothernameEn} / ${response?.GroomDetails?.groomMothernameMl}`,
        }
      );
    } else if (response?.GroomDetails?.groomParentGuardian === "GUARDIAN") {
      GroomDetails.values.push(
        ({
          title: `${t("CR_GROOM_GUARDIAN_AADHAR_NO")}`,
          value: response?.GroomDetails?.groomGuardianAadharNo || "NA",
        },
        {
          title: `${t("CR_GROOM_GUARDIAN_NAME_EN")} / ${t("CR_GROOM_GUARDIAN_NAME_ML")}`,
          value: `${response?.GroomDetails?.groomGuardiannameEn} / ${response?.GroomDetails?.groomGuardiannameMl}`,
        })
      );
    }

    const GroomPresentAddressDetails = {
      title: "CR_GROOM_PRESENT_ADDRESS_DETAILS",
      asSectionHeader: true,
      values: [],
    };
    if (response?.GroomAddressDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.GroomAddressDetails?.presentaddressStateName === "kl") {
      GroomPresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: `${response?.GroomAddressDetails?.presentaddressCountryNameEn} / ${response?.GroomAddressDetails?.presentaddressCountryNameMl}`,
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: `${response?.GroomAddressDetails?.presentaddressStateNameEn} / ${response?.GroomAddressDetails?.presentaddressStateNameMl}`,
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaDistrictEn} / ${response?.GroomAddressDetails?.presentInsideKeralaDistrictMl}`,
        },
        {
          title: `${t("CS_COMMON_TALUK")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaTalukEn} / ${response?.GroomAddressDetails?.presentInsideKeralaTalukMl}`,
        },
        {
          title: `${t("CS_COMMON_VILLAGE")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaVillage} / ${response?.GroomAddressDetails?.presentInsideKeralaVillage}`,
        },
        {
          title: `${t("CS_COMMON_LB_NAME")}`,
          value: response?.GroomAddressDetails?.presentInsideKeralaLBName ? response?.GroomAddressDetails?.presentInsideKeralaLBName : "NA",
        },
        {
          title: `${t("CS_COMMON_WARD")}`,
          value: `${response?.GroomAddressDetails?.presentWardNoEn} / ${response?.GroomAddressDetails?.presentWardNoMl}`,
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaPostOfficeEn} / ${response?.GroomAddressDetails?.presentInsideKeralaPostOfficeMl}`,
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.GroomAddressDetails?.presentInsideKeralaPincode || "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn} / ${response?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_ML")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaStreetNameEn} / ${response?.GroomAddressDetails?.presentInsideKeralaStreetNameMl}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.GroomAddressDetails?.presentInsideKeralaHouseNameEn} / ${response?.GroomAddressDetails?.presentInsideKeralaHouseNameMl}`,
        }
      );
    } else if (
      response?.GroomAddressDetails?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.GroomAddressDetails?.presentaddressStateName !== "kl"
    ) {
      GroomPresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: `${response?.GroomAddressDetails?.presentaddressCountryNameEn} / ${response?.GroomAddressDetails?.presentaddressCountryNameMl}`,
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: `${response?.GroomAddressDetails?.presentaddressStateNameEn} / ${response?.GroomAddressDetails?.presentaddressStateNameMl}`,
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaDistrictEn} / ${response?.GroomAddressDetails?.presentOutsideKeralaDistrictMl}`,
        },
        {
          title: `${t("CR_TALUK_TEHSIL")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaTalukEn} / ${response?.GroomAddressDetails?.presentOutsideKeralaTalukMl}`,
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaVillageEn} / ${response?.GroomAddressDetails?.presentOutsideKeralaVillageMl}`,
        },
        {
          title: `${t("CR_CITY_VILLAGE_NAME_EN")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn || "NA"}`,
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.GroomAddressDetails?.presentOutsideKeralaPincode || "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn} / ${response?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn} / ${response?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_EN")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn || "NA"} / ${response?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl || "NA"}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn} / ${response?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl}`,
        }
      );
    } else if (response?.GroomAddressDetails?.presentaddressCountry !== "COUNTRY_INDIA") {
      GroomPresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.GroomAddressDetails?.presentaddressCountry ? response?.GroomAddressDetails?.presentaddressCountry : "NA",
        },
        {
          title: `${t("CR_STATE_REGION_PROVINCE_EN")} / ${t("CR_STATE_REGION_PROVINCE_ML")}`,
          value: `${response?.GroomAddressDetails?.presentOutSideIndiaProvinceEn} / ${response?.GroomAddressDetails?.presentOutSideIndiaProvinceMl}`,
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: `${response?.GroomAddressDetails?.presentOutSideIndiaadrsVillageEn} / ${response?.GroomAddressDetails?.presentOutSideIndiaadrsVillageMl}`,
          value: response?.GroomAddressDetails?.presentOutSideIndiaadrsVillage ? response?.GroomAddressDetails?.presentOutSideIndiaadrsVillage : "NA",
        },
        {
          title: `${t("CR_CITY_TOWN_EN")}`,
          value: response?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
            ? response?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
            : "NA",
        },
        {
          title: `${t("CR_ZIP_CODE")}`,
          value: response?.GroomAddressDetails?.presentOutSideIndiaPostCode ? response?.GroomAddressDetails?.presentOutSideIndiaPostCode : "NA",
        },
        {
          title: `${t("CR_ADDRES_LINE_ONE_EN")} / ${t("CR_ADDRES_LINE_ONE_ML")}`,
          value: `${response?.GroomAddressDetails?.presentOutSideIndiaAdressEn} / ${response?.GroomAddressDetails?.presentOutSideIndiaAdressMl}`,
        },
        {
          title: `${t("CR_ADDRES_LINE_TWO_EN")} / ${t("CR_ADDRES_LINE_TWO_ML")}`,
          value: `${response?.GroomAddressDetails?.presentOutSideIndiaAdressEnB} / ${response?.GroomAddressDetails?.presentOutSideIndiaAdressMlB}`,
        }
      );
    }

    const GroomPermanentAddressDetails = {
      title: "CR_GROOM_PERMANENT_ADDRESS_DETAILS",
      asSectionHeader: true,
      values: [],
    };
    if (response?.GroomAddressDetails?.permtaddressCountry === "COUNTRY_INDIA" && response?.GroomAddressDetails?.permtaddressStateName === "kl") {
      GroomPermanentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.GroomAddressDetails?.permtaddressCountry ? response?.GroomAddressDetails?.permtaddressCountry : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.GroomAddressDetails?.permtaddressStateName ? response?.GroomAddressDetails?.permtaddressStateName : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.GroomAddressDetails?.permntInKeralaAdrDistrict ? response?.GroomAddressDetails?.permntInKeralaAdrDistrict : "NA",
        },
        {
          title: `${t("CS_COMMON_TALUK")}`,
          value: response?.GroomAddressDetails?.permntInKeralaAdrTaluk ? response?.GroomAddressDetails?.permntInKeralaAdrTaluk : "NA",
        },
        {
          title: `${t("CS_COMMON_VILLAGE")}`,
          value: response?.GroomAddressDetails?.permntInKeralaAdrVillage ? response?.GroomAddressDetails?.permntInKeralaAdrVillage : "NA",
        },
        {
          title: `${t("CS_COMMON_LB_NAME")}`,
          value: response?.GroomAddressDetails?.presentInsideKeralaLBName ? response?.GroomAddressDetails?.presentInsideKeralaLBName : "NA",
        },
        {
          title: `${t("CS_COMMON_WARD")}`,
          value: response?.GroomAddressDetails?.permntInKeralaWardNo ? response?.GroomAddressDetails?.permntInKeralaWardNo : "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: response?.GroomAddressDetails?.permntInKeralaAdrPostOffice ? response?.GroomAddressDetails?.permntInKeralaAdrPostOffice : "NA",
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.GroomAddressDetails?.permntInKeralaAdrPincode ? response?.GroomAddressDetails?.permntInKeralaAdrPincode : "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn} / ${response?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_ML")}`,
          value: `${response?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn || "NA"} / ${response?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl || "NA"}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn} / ${response?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn}`,
        }
      );
    } else if (
      response?.GroomAddressDetails?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.GroomAddressDetails?.presentaddressStateName !== "kl"
    ) {
      GroomPresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.GroomAddressDetails?.permtaddressCountry ? response?.GroomAddressDetails?.permtaddressCountry : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.GroomAddressDetails?.permtaddressStateName ? response?.GroomAddressDetails?.permtaddressStateName : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.GroomAddressDetails?.permntOutsideKeralaDistrict ? response?.GroomAddressDetails?.permntOutsideKeralaDistrict : "NA",
        },
        {
          title: `${t("CR_TALUK_TEHSIL")}`,
          value: response?.GroomAddressDetails?.permntOutsideKeralaTaluk ? response?.GroomAddressDetails?.permntOutsideKeralaTaluk : "NA",
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: response?.GroomAddressDetails?.permntOutsideKeralaVillage ? response?.GroomAddressDetails?.permntOutsideKeralaVillage : "NA",
        },
        {
          title: `${t("CR_CITY_VILLAGE_NAME_EN")}`,
          value: response?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn ? response?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn : "NA",
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.GroomAddressDetails?.permntOutsideKeralaPincode ? response?.GroomAddressDetails?.permntOutsideKeralaPincode : "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: response?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
            ? response?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
            : "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn} / ${response?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_EN")}`,
          value: `${response?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn} / ${response?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn} / ${response?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl}`,
        }
      );
    } else if (response?.GroomAddressDetails?.permtaddressCountry !== "COUNTRY_INDIA") {
      GroomPresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.GroomAddressDetails?.permtaddressCountry ? response?.GroomAddressDetails?.permtaddressCountry : "NA",
        },
        {
          title: `${t("CR_STATE_REGION_PROVINCE_EN")} / ${t("CR_STATE_REGION_PROVINCE_ML")}`,
          value: `${response?.GroomAddressDetails?.permntOutsideIndiaprovinceEn} / ${response?.GroomAddressDetails?.permntOutsideIndiaprovinceMl}`,
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: response?.GroomAddressDetails?.permntOutsideIndiaVillage ? response?.GroomAddressDetails?.permntOutsideIndiaVillage : "NA",
        },
        {
          title: `${t("CR_CITY_TOWN_EN")}`,
          value: response?.GroomAddressDetails?.permntOutsideIndiaCityTown ? response?.GroomAddressDetails?.permntOutsideIndiaCityTown : "NA",
        },
        {
          title: `${t("CR_ZIP_CODE")}`,
          value: response?.GroomAddressDetails?.permanentOutsideIndiaPostCode ? response?.GroomAddressDetails?.permanentOutsideIndiaPostCode : "NA",
        },
        {
          title: `${t("CR_ADDRES_LINE_ONE_EN")} / ${t("CR_ADDRES_LINE_ONE_ML")}`,
          value: `${response?.GroomAddressDetails?.permntOutsideIndiaLineoneEn} / ${response?.GroomAddressDetails?.permntOutsideIndiaLineoneMl}`,
        },
        {
          title: `${t("CR_ADDRES_LINE_TWO_EN")} / ${t("CR_ADDRES_LINE_TWO_ML")}`,
          value: `${response?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn} / ${response?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl}`,
        }
      );
    }

    const BrideDetails = {
      title: "CR_BRIDE_DETAILS",
      asSectionHeader: true,
      values: [
        {
          title: `${t("CR_BRIDE_NATIONALITY_AND_RESIDENTSHIP")}`,
          value: response?.BrideDetails?.brideResidentShip ? response?.BrideDetails?.brideResidentShip : "NA",
        },
        {
          title: `${t("CR_BRIDE_NAME_EN")} / ${t("CR_BRIDE_NAME_ML")}`,
          value: `${response?.BrideDetails?.brideFirstnameEn ? response?.BrideDetails?.brideFirstnameEn : ""} ${
            response?.BrideDetails?.brideMiddlenameEn ? response?.BrideDetails?.brideMiddlenameEn : ""
          } ${response?.BrideDetails?.brideLastnameEn ? response?.BrideDetails?.brideLastnameEn : ""} / ${
            response?.BrideDetails?.brideFirstnameMl ? response?.BrideDetails?.brideFirstnameMl : ""
          } ${response?.BrideDetails?.brideMiddlenameMl ? response?.BrideDetails?.brideMiddlenameMl : ""} ${
            response?.BrideDetails?.brideLastnameMl ? response?.BrideDetails?.brideLastnameMl : ""
          }`,
        },
        {
          title: `${t("CR_BRIDE_MOBILE_NO")}`,
          value: response?.BrideDetails?.brideMobile,
        },
        {
          title: `${t("CR_BRIDE_EMAIL")}`,
          value: response?.BrideDetails?.brideEmailid,
        },
        {
          title: `${t("CR_BRIDE_GENDER")}`,
          value: response?.BrideDetails?.brideGender,
        },
        {
          title: `${t("CR_BRIDE_DATE_OF_BIRTH")}`,
          value: response?.BrideDetails?.brideDOB,
        },
        {
          title: `${t("CR_BRIDE_AGE")}`,
          value: response?.BrideDetails?.brideAge,
        },
      ],
    };
    if (response?.BrideDetails?.brideResidentShip === "NRI" || response?.BrideDetails?.brideResidentShip === "FOREIGN") {
      BrideDetails.values.push(
        {
          title: `${t("CR_BRIDE_PASSPORT_NO")}`,
          value: response?.BrideDetails?.bridePassportNo ? response?.BrideDetails?.bridePassportNo : "NA",
        },
        {
          title: `${t("CR_BRIDE_SOCIAL_SECURITY_NO")}`,
          value: response?.BrideDetails?.brideSocialSecurityNo ? response?.BrideDetails?.brideSocialSecurityNo : "NA",
        }
      );
    } else if (response?.BrideDetails?.brideResidentShip === "INDIAN") {
      BrideDetails.values.push({
        title: `${t("CR_BRIDE_AADHAR_NO")}`,
        value: response?.BrideDetails?.brideAadharNo ? response?.BrideDetails?.brideAadharNo : "NA",
      });
    }
    if (response?.BrideDetails?.brideMaritalstatusID === "MARRIED") {
      BrideDetails.values.push({
        title: `${t("CR_ANY_SPOUSE_LIVING")}`,
        value: response?.BrideDetails?.brideIsSpouseLiving ? "Yes" : "No",
      });
    }
    if (response?.BrideDetails?.brideMaritalstatusID === "MARRIED" && response?.BrideDetails?.brideIsSpouseLiving) {
      BrideDetails.values.push({ title: `${t("CR_NUMBER_OF_SPOUSE_LIVING")}`, value: response?.BrideDetails?.brideNoOfSpouse });
    }
    if (response?.BrideDetails?.brideParentGuardian === "PARENT") {
      BrideDetails.values.push(
        {
          title: `${t("CR_BRIDE_FATHER_AADHAR_NO")}`,
          value: response?.BrideDetails?.brideFatherAadharNo,
        },
        {
          title: `${t("CR_BRIDE_FATHER_NAME_EN")} / ${t("CR_BRIDE_FATHER_NAME_ML")}`,
          value: `${response?.BrideDetails?.brideFathernameEn} / ${response?.BrideDetails?.brideFathernameMl}`,
        },
        {
          title: `${t("CR_BRIDE_MOTHER_AADHAR_NO")}`,
          value: response?.BrideDetails?.brideMotherAadharNo,
        },
        {
          title: `${t("CR_BRIDE_MOTHER_NAME_EN")} / ${t("CR_BRIDE_MOTHER_NAME_ML")}`,
          value: `${response?.BrideDetails?.brideMothernameEn} / ${response?.BrideDetails?.brideMothernameMl}`,
        }
      );
    } else if (response?.BrideDetails?.brideParentGuardian === "GUARDIAN") {
      BrideDetails.values.push(
        {
          title: `${t("CR_BRIDE_GUARDIAN_AADHAR_NO")}`,
          value: response?.BrideDetails?.brideGuardianAadharNo,
        },
        {
          title: `${t("CR_BRIDE_GUARDIAN_NAME_EN")} / ${t("CR_BRIDE_GUARDIAN_NAME_ML")}`,
          value: `${response?.BrideDetails?.brideGuardiannameEn} / ${response?.BrideDetails?.brideGuardiannameMl}`,
        }
      );
    }

    const BridePresentAddressDetails = {
      title: "CR_BRIDE_PRESENT_ADDRESS_DETAILS",
      asSectionHeader: true,
      values: [],
    };
    if (response?.BrideAddressDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.BrideAddressDetails?.presentaddressStateName === "kl") {
      BridePresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.BrideAddressDetails?.presentaddressCountry ? response?.BrideAddressDetails?.presentaddressCountry : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.BrideAddressDetails?.presentaddressStateName ? response?.BrideAddressDetails?.presentaddressStateName : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaDistrict ? response?.BrideAddressDetails?.presentInsideKeralaDistrict : "NA",
        },
        {
          title: `${t("CS_COMMON_TALUK")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaTaluk ? response?.BrideAddressDetails?.presentInsideKeralaTaluk : "NA",
        },
        {
          title: `${t("CS_COMMON_VILLAGE")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaVillage ? response?.BrideAddressDetails?.presentInsideKeralaVillage : "NA",
        },
        {
          title: `${t("CS_COMMON_LB_NAME")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaLBName ? response?.BrideAddressDetails?.presentInsideKeralaLBName : "NA",
        },
        {
          title: `${t("CS_COMMON_WARD")}`,
          value: response?.BrideAddressDetails?.presentWardNo ? response?.BrideAddressDetails?.presentWardNo : "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaPostOffice ? response?.BrideAddressDetails?.presentInsideKeralaPostOffice : "NA",
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaPincode ? response?.BrideAddressDetails?.presentInsideKeralaPincode : "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn} / ${response?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_ML")}`,
          value: `${response?.BrideAddressDetails?.presentInsideKeralaStreetNameEn} / ${response?.BrideAddressDetails?.presentInsideKeralaStreetNameMl}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.BrideAddressDetails?.presentInsideKeralaHouseNameEn} / ${response?.BrideAddressDetails?.presentInsideKeralaHouseNameMl}`,
        }
      );
    } else if (
      response?.BrideAddressDetails?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.BrideAddressDetails?.presentaddressStateName !== "kl"
    ) {
      BridePresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.BrideAddressDetails?.presentaddressCountry ? response?.BrideAddressDetails?.presentaddressCountry : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.BrideAddressDetails?.presentaddressStateName ? response?.BrideAddressDetails?.presentaddressStateName : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.BrideAddressDetails?.presentOutsideKeralaDistrict ? response?.BrideAddressDetails?.presentOutsideKeralaDistrict : "NA",
        },
        {
          title: `${t("CR_TALUK_TEHSIL")}`,
          value: response?.BrideAddressDetails?.presentOutsideKeralaTaluk ? response?.BrideAddressDetails?.presentOutsideKeralaTaluk : "NA",
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: response?.BrideAddressDetails?.presentOutsideKeralaVillage ? response?.BrideAddressDetails?.presentOutsideKeralaVillage : "NA",
        },
        {
          title: `${t("CR_CITY_VILLAGE_NAME_EN")}`,
          value: response?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
            ? response?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
            : "NA",
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.BrideAddressDetails?.presentOutsideKeralaPincode ? response?.BrideAddressDetails?.presentOutsideKeralaPincode : "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: response?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
            ? response?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
            : "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn} / ${response?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_EN")}`,
          value: `${response?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn} / ${response?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn} / ${response?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl}`,
        }
      );
    } else if (response?.BrideAddressDetails?.presentaddressCountry !== "COUNTRY_INDIA") {
      BridePresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.BrideAddressDetails?.presentaddressCountry ? response?.BrideAddressDetails?.presentaddressCountry : "NA",
        },
        {
          title: `${t("CR_STATE_REGION_PROVINCE_EN")} / ${t("CR_STATE_REGION_PROVINCE_ML")}`,
          value: `${response?.BrideAddressDetails?.presentOutSideIndiaProvinceEn} / ${response?.BrideAddressDetails?.presentOutSideIndiaProvinceMl}`,
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: response?.BrideAddressDetails?.presentOutSideIndiaadrsVillage ? response?.BrideAddressDetails?.presentOutSideIndiaadrsVillage : "NA",
        },
        {
          title: `${t("CR_CITY_TOWN_EN")}`,
          value: response?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
            ? response?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
            : "NA",
        },
        {
          title: `${t("CR_ZIP_CODE")}`,
          value: response?.BrideAddressDetails?.presentOutSideIndiaPostCode ? response?.BrideAddressDetails?.presentOutSideIndiaPostCode : "NA",
        },
        {
          title: `${t("CR_ADDRES_LINE_ONE_EN")} / ${t("CR_ADDRES_LINE_ONE_ML")}`,
          value: `${response?.BrideAddressDetails?.presentOutSideIndiaAdressEn} / ${response?.BrideAddressDetails?.presentOutSideIndiaAdressMl}`,
        },
        {
          title: `${t("CR_ADDRES_LINE_TWO_EN")} / ${t("CR_ADDRES_LINE_TWO_ML")}`,
          value: `${response?.BrideAddressDetails?.presentOutSideIndiaAdressEnB} / ${response?.BrideAddressDetails?.presentOutSideIndiaAdressMlB}`,
        }
      );
    }

    const BridePermanentAddressDetails = {
      title: "CR_BRIDE_PERMANENT_ADDRESS_DETAILS",
      asSectionHeader: true,
      values: [],
    };
    if (response?.BrideAddressDetails?.permtaddressCountry === "COUNTRY_INDIA" && response?.BrideAddressDetails?.permtaddressStateName === "kl") {
      BridePermanentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.BrideAddressDetails?.permtaddressCountry ? response?.BrideAddressDetails?.permtaddressCountry : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.BrideAddressDetails?.permtaddressStateName ? response?.BrideAddressDetails?.permtaddressStateName : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.BrideAddressDetails?.permntInKeralaAdrDistrict ? response?.BrideAddressDetails?.permntInKeralaAdrDistrict : "NA",
        },
        {
          title: `${t("CS_COMMON_TALUK")}`,
          value: response?.BrideAddressDetails?.permntInKeralaAdrTaluk ? response?.BrideAddressDetails?.permntInKeralaAdrTaluk : "NA",
        },
        {
          title: `${t("CS_COMMON_VILLAGE")}`,
          value: response?.BrideAddressDetails?.permntInKeralaAdrVillage ? response?.BrideAddressDetails?.permntInKeralaAdrVillage : "NA",
        },
        {
          title: `${t("CS_COMMON_LB_NAME")}`,
          value: response?.BrideAddressDetails?.presentInsideKeralaLBName ? response?.BrideAddressDetails?.presentInsideKeralaLBName : "NA",
        },
        {
          title: `${t("CS_COMMON_WARD")}`,
          value: response?.BrideAddressDetails?.permntInKeralaWardNo ? response?.BrideAddressDetails?.permntInKeralaWardNo : "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: response?.BrideAddressDetails?.permntInKeralaAdrPostOffice ? response?.BrideAddressDetails?.permntInKeralaAdrPostOffice : "NA",
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.BrideAddressDetails?.permntInKeralaAdrPincode ? response?.BrideAddressDetails?.permntInKeralaAdrPincode : "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn} / ${response?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_ML")}`,
          value: `${response?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn} / ${response?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn} / ${response?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn}`,
        }
      );
    } else if (
      response?.BrideAddressDetails?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.BrideAddressDetails?.presentaddressStateName !== "kl"
    ) {
      BridePresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.BrideAddressDetails?.permtaddressCountry ? response?.BrideAddressDetails?.permtaddressCountry : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.BrideAddressDetails?.permtaddressStateName ? response?.BrideAddressDetails?.permtaddressStateName : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.BrideAddressDetails?.permntOutsideKeralaDistrict ? response?.BrideAddressDetails?.permntOutsideKeralaDistrict : "NA",
        },
        {
          title: `${t("CR_TALUK_TEHSIL")}`,
          value: response?.BrideAddressDetails?.permntOutsideKeralaTaluk ? response?.BrideAddressDetails?.permntOutsideKeralaTaluk : "NA",
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: response?.BrideAddressDetails?.permntOutsideKeralaVillage ? response?.BrideAddressDetails?.permntOutsideKeralaVillage : "NA",
        },
        {
          title: `${t("CR_CITY_VILLAGE_NAME_EN")}`,
          value: response?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn ? response?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn : "NA",
        },
        {
          title: `${t("CS_COMMON_PIN_CODE")}`,
          value: response?.BrideAddressDetails?.permntOutsideKeralaPincode ? response?.BrideAddressDetails?.permntOutsideKeralaPincode : "NA",
        },
        {
          title: `${t("CS_COMMON_POST_OFFICE")}`,
          value: response?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
            ? response?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
            : "NA",
        },
        {
          title: `${t("CR_LOCALITY_EN")} / ${t("CR_LOCALITY_ML")}`,
          value: `${response?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn} / ${response?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")} / ${t("CR_STREET_NAME_EN")}`,
          value: `${response?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn} / ${response?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl}`,
        },
        {
          title: `${t("CR_HOUSE_NAME_EN")} / ${t("CR_HOUSE_NAME_ML")}`,
          value: `${response?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn} / ${response?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl}`,
        }
      );
    } else if (response?.BrideAddressDetails?.permtaddressCountry !== "COUNTRY_INDIA") {
      BridePresentAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.BrideAddressDetails?.permtaddressCountry ? response?.BrideAddressDetails?.permtaddressCountry : "NA",
        },
        {
          title: `${t("CR_STATE_REGION_PROVINCE_EN")} / ${t("CR_STATE_REGION_PROVINCE_ML")}`,
          value: `${response?.BrideAddressDetails?.permntOutsideIndiaprovinceEn} / ${response?.BrideAddressDetails?.permntOutsideIndiaprovinceMl}`,
        },
        {
          title: `${t("CR_TOWN_VILLAGE_EN")}`,
          value: response?.BrideAddressDetails?.permntOutsideIndiaVillage ? response?.BrideAddressDetails?.permntOutsideIndiaVillage : "NA",
        },
        {
          title: `${t("CR_CITY_TOWN_EN")}`,
          value: response?.BrideAddressDetails?.permntOutsideIndiaCityTown ? response?.BrideAddressDetails?.permntOutsideIndiaCityTown : "NA",
        },
        {
          title: `${t("CR_ZIP_CODE")}`,
          value: response?.BrideAddressDetails?.permanentOutsideIndiaPostCode ? response?.BrideAddressDetails?.permanentOutsideIndiaPostCode : "NA",
        },
        {
          title: `${t("CR_ADDRES_LINE_ONE_EN")} / ${t("CR_ADDRES_LINE_ONE_ML")}`,
          value: `${response?.BrideAddressDetails?.permntOutsideIndiaLineoneEn} / ${response?.BrideAddressDetails?.permntOutsideIndiaLineoneMl}`,
        },
        {
          title: `${t("CR_ADDRES_LINE_TWO_EN")} / ${t("CR_ADDRES_LINE_TWO_ML")}`,
          value: `${response?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn} / ${response?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl}`,
        }
      );
    }

    const WitnessDetails = {
      title: "CR_WITNESS_DETAILS",
      asSectionHeader: true,
      values: [
        {
          title: `${t("CR_WITNESS1_ADHAR_NO")}`,
          value: response?.WitnessDetails?.witness1AadharNo ? response?.WitnessDetails?.witness1AadharNo : "NA",
        },
        {
          title: `${t("CR_WITNESS1_NAME")}`,
          value: response?.WitnessDetails?.witness1NameEn ? response?.WitnessDetails?.witness1NameEn : "NA",
        },
        {
          title: `${t("CR_WITNESS1_AGE")}`,
          value: response?.WitnessDetails?.witness1Age ? response?.WitnessDetails?.witness1Age : "NA",
        },
        {
          title: `${t("CR_WITNESS1_ADDRESS")}`,
          value: response?.WitnessDetails?.witness1AddresSEn ? response?.WitnessDetails?.witness1AddresSEn : "NA",
        },
        {
          title: `${t("CR_WITNESS1_MOBILE_NO")}`,
          value: response?.WitnessDetails?.witness1Mobile ? response?.WitnessDetails?.witness1Mobile : "NA",
        },
        {
          title: `${t("CR_WITNESS2_ADHAR_NO")}`,
          value: response?.WitnessDetails?.witness2AadharNo ? response?.WitnessDetails?.witness2AadharNo : "NA",
        },
        {
          title: `${t("CR_WITNESS2_NAME")}`,
          value: response?.WitnessDetails?.witness2NameEn ? response?.WitnessDetails?.witness2NameEn : "NA",
        },
        {
          title: `${t("CR_WITNESS2_AGE")}`,
          value: response?.WitnessDetails?.witness2Age ? response?.WitnessDetails?.witness2Age : "NA",
        },
        {
          title: `${t("CR_WITNESS2_ADDRESS")}`,
          value: response?.WitnessDetails?.witness2AddresSEn ? response?.WitnessDetails?.witness2AddresSEn : "NA",
        },
        {
          title: `${t("CR_WITNESS2_MOBILE_NO")}`,
          value: response?.WitnessDetails?.witness2Mobile ? response?.WitnessDetails?.witness2Mobile : "NA",
        },
      ],
    };

    //Groom groom GROOM
    // if (response?.workflowCode == "NewTL" && response?.status !== "APPROVED") {
    //   const details = {
    //     title: "",
    //     values: [
    //       { title: "TL_COMMON_TABLE_COL_APP_NO", value: response?.applicationNumber || "NA" },
    //       {
    //         title: "TL_APPLICATION_CHALLAN_LABEL",
    // value: (response?.tradeLicenseDetail?.channel && `TL_CHANNEL_${response?.tradeLicenseDetail?.channel}`) || "NA",
    //       },
    //     ],
    //   };
    //   response && employeeResponse.push(details);
    // }
    response && employeeResponse.push(MarriageSummaryDetails);
    response && employeeResponse.push(MarriageDetails);
    response && employeeResponse.push(GroomDetails);
    response && employeeResponse.push(GroomPresentAddressDetails);
    response && employeeResponse.push(GroomPermanentAddressDetails);
    response && employeeResponse.push(BrideDetails);
    response && employeeResponse.push(BridePresentAddressDetails);
    response && employeeResponse.push(BridePermanentAddressDetails);
    response && employeeResponse.push(WitnessDetails);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};

// /${response?.placeidMl}`,
