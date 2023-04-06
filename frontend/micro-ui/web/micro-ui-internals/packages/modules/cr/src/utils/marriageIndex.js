import get from "lodash/get";
import set from "lodash/set";

/*   method to check not null  if not returns false*/
export const checkForNotNull = (value = "") => {
  return value && value != null && value != undefined && value != "" ? true : false;
};

export const convertDotValues = (value = "") => {
  return (
    (checkForNotNull(value) && ((value.replaceAll && value.replaceAll(".", "_")) || (value.replace && stringReplaceAll(value, ".", "_")))) || "NA"
  );
};

export const sortDropdownNames = (options, optionkey, locilizationkey) => {
  return options.sort((a, b) => locilizationkey(a[optionkey]).localeCompare(locilizationkey(b[optionkey])));
};

export const convertToLocale = (value = "", key = "") => {
  let convertedValue = convertDotValues(value);
  if (convertedValue == "NA") {
    return "PT_NA";
  }
  return `${key}_${convertedValue}`;
};

export const getPropertyTypeLocale = (value = "") => {
  return convertToLocale(value, "COMMON_PROPTYPE");
};

export const getPropertyUsageTypeLocale = (value = "") => {
  return convertToLocale(value, "COMMON_PROPUSGTYPE");
};

export const getPropertySubUsageTypeLocale = (value = "") => {
  return convertToLocale(value, "COMMON_PROPSUBUSGTYPE");
};
export const getPropertyOccupancyTypeLocale = (value = "") => {
  return convertToLocale(value, "PROPERTYTAX_OCCUPANCYTYPE");
};

export const getMohallaLocale = (value = "", tenantId = "") => {
  let convertedValue = convertDotValues(tenantId);
  if (convertedValue == "NA" || !checkForNotNull(value)) {
    return "PT_NA";
  }
  convertedValue = convertedValue.toUpperCase();
  return convertToLocale(value, `${convertedValue}_REVENUE`);
};

export const getCityLocale = (value = "") => {
  let convertedValue = convertDotValues(value);
  if (convertedValue == "NA" || !checkForNotNull(value)) {
    return "PT_NA";
  }
  convertedValue = convertedValue.toUpperCase();
  return convertToLocale(convertedValue, `TENANT_TENANTS`);
};

export const getPropertyOwnerTypeLocale = (value = "") => {
  return convertToLocale(value, "PROPERTYTAX_OWNERTYPE");
};

export const getFixedFilename = (filename = "", size = 5) => {
  if (filename.length <= size) {
    return filename;
  }
  return `${filename.substr(0, size)}...`;
};

export const shouldHideBackButton = (config = []) => {
  return config.filter((key) => window.location.href.includes(key.screenPath)).length > 0 ? true : false;
};

/*   style to keep the body height fixed across screens */
export const cardBodyStyle = {
  maxHeight: "calc(100vh - 20em)",
  overflowY: "auto",
};

export const propertyCardBodyStyle = {
  maxHeight: "calc(100vh - 10em)",
  overflowY: "auto",
};

export const getTransaltedLocality = (data) => {
  let localityVariable = data?.tenantId?.replaceAll(".", "_") || stringReplaceAll(data?.tenantId, ".", "_");
  return localityVariable.toUpperCase() + "_REVENUE_" + data?.locality?.code;
};

export const setAddressDetails = (data) => {
  let { address } = data;

  let propAddress = {
    ...address,
    pincode: address?.pincode,
    landmark: address?.landmark,
    city: address?.city?.name,
    doorNo: address?.doorNo,
    street: address?.street,
    locality: {
      code: address?.locality?.code || "NA",
      area: address?.locality?.name,
    },
  };

  data.address = propAddress;
  return data;
};

export const getownerarray = (data) => {
  const ownersData = data?.owners?.owners;
  const res = ownersData?.map((ob) => ({
    mobileNumber: ob.mobilenumber,
    name: ob.name,
    fatherOrHusbandName: ob?.fatherOrHusbandName,
    relationship: ob?.relationship?.code,
    dob: null,
    gender: ob?.gender?.code,
    permanentAddress: data?.owners?.permanentAddress,
    emailId: ob?.emailId,
  }));
  return res;
};

export const gettradeownerarray = (data) => {
  let tradeownerarray = [];
  const isEditRenew = window.location.href.includes("renew-trade");
  data.tradeLicenseDetail.owners.map((oldowner) => {
    data?.owners?.owners.map((newowner) => {
      if (oldowner.id === newowner.id) {
        if (
          oldowner.name !== newowner.name ||
          oldowner.gender !== newowner?.gender?.code ||
          oldowner.mobileNumber !== newowner.mobilenumber ||
          oldowner.permanentAddress !== data?.owners?.permanentAddress ||
          oldowner.relationship !== newowner.relationship?.code ||
          oldowner.fatherOrHusbandName !== newowner.fatherOrHusbandName
        ) {
          if (oldowner.name !== newowner.name) {
            oldowner.name = newowner.name;
          }
          if (oldowner.gender !== newowner.gender?.code) {
            oldowner.gender = newowner.gender?.code;
          }
          if (oldowner.mobileNumber !== newowner.mobilenumber) {
            oldowner.mobileNumber = newowner.mobilenumber;
          }
          if (oldowner.permanentAddress !== data?.owners?.permanentAddress) {
            oldowner.permanentAddress = data?.owners?.permanentAddress;
          }
          if (oldowner.relationship !== newowner.relationship?.code) {
            oldowner.relationship = newowner.relationship?.code;
          }
          if (oldowner.fatherOrHusbandName !== newowner.fatherOrHusbandName) {
            oldowner.fatherOrHusbandName = newowner.fatherOrHusbandName;
          }
          let found = tradeownerarray.length > 0 ? tradeownerarray.some((el) => el.id === oldowner.id) : false;
          if (!found) tradeownerarray.push(oldowner);
        } else {
          let found = tradeownerarray.length > 0 ? tradeownerarray.some((el) => el.id === oldowner.id) : false;
          if (!found) tradeownerarray.push(oldowner);
        }
      }
    });
  });
  !isEditRenew &&
    !window.location.href.includes("edit-application") &&
    data.tradeLicenseDetail.owners.map((oldowner) => {
      let found = tradeownerarray.length > 0 ? tradeownerarray.some((el) => el.id === oldowner.id) : false;
      if (!found) tradeownerarray.push({ ...oldowner, active: false });
    });
  data?.owners?.owners.map((ob) => {
    if (!ob.id) {
      tradeownerarray.push({
        mobileNumber: ob.mobilenumber,
        name: ob.name,
        fatherOrHusbandName: "",
        relationship: "",
        dob: null,
        gender: ob?.gender?.code || null,
        permanentAddress: data?.owners?.permanentAddress,
        ...(data?.ownershipCategory?.code.includes("INSTITUTIONAL") && { uuid: data?.tradeLicenseDetail?.owners?.[0]?.uuid }),
      });
    }
  });
  return tradeownerarray;
};

export const gettradeunits = (data) => {
  let tradeunits = [];
  data?.TradeDetails?.units.map((ob) => {
    tradeunits.push({ tradeType: ob.tradesubtype.code, uom: ob.unit, uomValue: ob.uom });
  });
  return tradeunits;
};

export const gettradeupdateunits = (data) => {
  let TLunits = [];
  const isEditRenew = window.location.href.includes("renew-trade");
  data.tradeLicenseDetail.tradeUnits.map((oldunit) => {
    data.TradeDetails.units.map((newunit) => {
      if (oldunit.id === newunit.id) {
        if (oldunit.tradeType !== newunit.tradesubtype.code) {
          oldunit.tradeType = newunit.tradesubtype.code;
          TLunits.push(oldunit);
        } else {
          let found = TLunits.length > 0 ? TLunits.some((el) => el.id === oldunit.id) : false;
          if (!found) TLunits.push(oldunit);
        }
      } else {
        if (!isEditRenew) {
          let found = TLunits.length > 0 ? TLunits.some((el) => el.id === oldunit.id) : false;
          if (!found) TLunits.push({ ...oldunit, active: false });
        }
      }
    });
  });
  data.TradeDetails.units.map((ob) => {
    if (!ob.id) {
      TLunits.push({ tradeType: ob.tradesubtype.code, uom: ob.unit, uomValue: ob.uom });
    }
  });
  return TLunits;
};

export const getaccessories = (data) => {
  let tradeaccessories = [];
  data?.TradeDetails?.accessories.map((ob) => {
    tradeaccessories.push({ uom: ob.unit, accessoryCategory: ob.accessory.code, uomValue: ob.uom ? ob.uom : null, count: ob.accessorycount });
  });
  return tradeaccessories;
};

export const gettradeupdateaccessories = (data) => {
  let TLaccessories = [];
  const isEditRenew = window.location.href.includes("renew-trade");
  if (data?.TradeDetails?.isAccessories?.i18nKey.includes("NO")) {
    data?.tradeLicenseDetail?.accessories &&
      data.tradeLicenseDetail.accessories.map((oldunit) => {
        TLaccessories.push({ ...oldunit, active: false });
      });
  } else {
    data?.tradeLicenseDetail?.accessories &&
      data.tradeLicenseDetail.accessories.map((oldunit) => {
        data.TradeDetails.accessories.map((newunit) => {
          if (oldunit.id === newunit.id) {
            if (oldunit.accessoryCategory !== newunit.accessory.code) {
              oldunit.accessoryCategory = newunit.accessory.code;
              TLaccessories.push(oldunit);
            } else {
              let found = TLaccessories.length > 0 ? TLaccessories.some((el) => el.id === oldunit.id) : false;
              if (!found) TLaccessories.push(oldunit);
            }
          } else {
            if (!isEditRenew) {
              let found = TLaccessories.length > 0 ? TLaccessories.some((el) => el.id === oldunit.id) : false;
              if (!found) TLaccessories.push({ ...oldunit, active: false });
            }
          }
        });
      });
    data.TradeDetails.accessories.map((ob) => {
      if (!ob.id) {
        TLaccessories.push({ uom: ob.unit, accessoryCategory: ob.accessory.code, uomValue: ob.uom ? ob.uom : null, count: ob.accessorycount });
      }
    });
  }
  return TLaccessories;
};

export const getwfdocuments = (data) => {
  let wfdoc = [];
  let doc = data ? data.owners.documents : [];
  doc["OwnerPhotoProof"] &&
    wfdoc.push({
      fileName: doc["OwnerPhotoProof"].name,
      fileStoreId: doc["OwnerPhotoProof"].fileStoreId,
      documentType: "OWNERPHOTO",
      tenantId: data?.tenantId,
    });
  doc["ProofOfIdentity"] &&
    wfdoc.push({
      fileName: doc["ProofOfIdentity"].name,
      fileStoreId: doc["ProofOfIdentity"].fileStoreId,
      documentType: "OWNERIDPROOF",
      tenantId: data?.tenantId,
    });
  doc["ProofOfOwnership"] &&
    wfdoc.push({
      fileName: doc["ProofOfOwnership"].name,
      fileStoreId: doc["ProofOfOwnership"].fileStoreId,
      documentType: "OWNERSHIPPROOF",
      tenantId: data?.tenantId,
    });
  return wfdoc;
};

export const getEditTradeDocumentUpdate = (data) => {
  let updateddocuments = [];
  let doc = data ? data.owners.documents : [];
  data?.tradeLicenseDetail?.applicationDocuments?.map((olddoc) => {
    if (
      (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId === data.owners.documents["OwnerPhotoProof"].fileStoreId) ||
      (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId == data.owners.documents["ProofOfOwnership"].fileStoreId) ||
      (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId === data.owners.documents["ProofOfIdentity"].fileStoreId)
    ) {
      updateddocuments.push(olddoc);
    } else {
      if (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId !== data.owners.documents["OwnerPhotoProof"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["OwnerPhotoProof"].name,
          fileStoreId: doc["OwnerPhotoProof"].fileStoreId,
          documentType: "OWNERPHOTO",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId !== data.owners.documents["ProofOfOwnership"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfOwnership"].name,
          fileStoreId: doc["ProofOfOwnership"].fileStoreId,
          documentType: "OWNERSHIPPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId !== data.owners.documents["ProofOfIdentity"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfIdentity"].name,
          fileStoreId: doc["ProofOfIdentity"].fileStoreId,
          documentType: "OWNERIDPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
    }
  });
  return updateddocuments;
};

export const convertToMarriageRegistration = (data = {}) => {
  console.log(data, "data from marriageIndex");
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const formData = {
    MarriageDetails: [
      {
        id: null,
        marriageDOM: Date.parse(data?.MarriageDetails?.marriageDOM),
        marriageDOR: Date.parse(today),
        marriageDistrictid: data?.MarriageDetails?.marriageDistrictid?.code,
        marriageTalukID: data?.MarriageDetails?.marriageTalukID?.code,
        marriageVillageName: data?.MarriageDetails?.marriageVillageName?.code,
        marriageVillageId: "1",
        marriageLBtype: data?.MarriageDetails?.marriageLBtype?.code,
        marriageTenantid: data?.MarriageDetails?.marriageTenantid?.code,
        marriageWardCode: data?.MarriageDetails?.marriageWardCode?.code,
        marriagePlacetype: data?.MarriageDetails?.marriagePlacetype?.code,
        placeid: data?.MarriageDetails?.placeid,
        marriagePlacenameEn: data?.MarriageDetails?.marriagePlacenameEn,
        marriagePlacenameMl: data?.MarriageDetails?.marriagePlacenameMl,
        marriageLocalityEn: data?.MarriageDetails?.marriageStreetEn,
        marriageLocalityMl: data?.MarriageDetails?.marriageLocalityMl,
        marriageStreetEn: data?.MarriageDetails?.marriageStreetEn,
        marriageStreetMl: data?.MarriageDetails?.marriageStreetMl,
        marriageLandmark: data?.MarriageDetails?.marriageLandmark,
        marriagePublicOrPrivateNamePlaceEn: data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn,
        marriagePublicOrPrivateNamePlaceMl: data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn,
        marriageHouseNoAndNameEn: data?.MarriageDetails?.marriageHouseNoAndNameEn,
        marriageHouseNoAndNameMl: data?.MarriageDetails?.marriageHouseNoAndNameMl,
        marriageType: data?.MarriageDetails?.marriageType,
        applicationType: "new",
        businessService: null,
        workflowCode: null,
        action: "INITIATE",
        registration_date: null,
        registrationNumber: null,
        status: "INITIATED",
        modulecode: "CRMRNR",
        GroomDetails: {
          groomResidentShip: data?.GroomDetails?.groomResidentShip,
          groomAadharNo: data?.GroomDetails?.groomAadharNo,
          groomPassportNo: data?.GroomDetails?.groomPassportNo,
          groomSocialSecurityNo: data?.GroomDetails?.groomSocialSecurityNo,
          groomFirstnameEn: data?.GroomDetails?.groomFirstnameEn,
          groomFirstnameMl: data?.GroomDetails?.groomFirstnameMl,
          groomMiddlenameEn: data?.GroomDetails?.groomMiddlenameEn,
          groomMiddlenameMl: data?.GroomDetails?.groomMiddlenameMl,
          groomLastnameEn: data?.GroomDetails?.groomLastnameEn,
          groomLastnameMl: data?.GroomDetails?.groomLastnameMl,
          groomMobile: data?.GroomDetails?.groomMobile,
          groomEmailid: data?.GroomDetails?.groomEmailid,
          groomGender: data?.GroomDetails?.groomGender?.code,
          groomDOB: data?.GroomDetails?.groomDOB,
          groomAge: data?.GroomDetails?.groomAge,
          groomParentGuardian: data?.GroomDetails?.groomParentGuardian,
          groomFathernameEn: data?.GroomDetails?.groomFathernameEn,
          groomFathernameMl: data?.GroomDetails?.groomFathernameMl,
          groomMothernameEn: data?.GroomDetails?.groomMothernameEn,
          groomMothernameMl: data?.GroomDetails?.groomMothernameMl,
          groomFatherAadharNo: data?.GroomDetails?.groomFatherAadharNo,
          groomMotherAadharNo: data?.GroomDetails?.groomMotherAadharNo,
          groomGuardiannameEn: data?.GroomDetails?.groomGuardiannameEn,
          groomGuardiannameMl: data?.GroomDetails?.groomGuardiannameMl,
          groomGuardianAadharNo: data?.GroomDetails?.groomGuardianAadharNo,
          groomMaritalstatusID: data?.GroomDetails?.groomMaritalstatusID,
          groomIsSpouseLiving: data?.GroomDetails?.groomIsSpouseLiving,
          groomNoOfSpouse: data?.GroomDetails?.groomNoOfSpouse,
        },
        BrideDetails: {
          brideResidentShip: data?.BrideDetails?.brideResidentShip,
          brideAadharNo: data?.BrideDetails?.brideAadharNo,
          bridePassportNo: data?.BrideDetails?.bridePassportNo,
          brideSocialSecurityNo: data?.BrideDetails?.brideSocialSecurityNo,
          brideFirstnameEn: data?.BrideDetails?.brideFirstnameEn,
          brideFirstnameMl: data?.BrideDetails?.brideFirstnameMl,
          brideMiddlenameEn: data?.BrideDetails?.brideMiddlenameEn,
          brideMiddlenameMl: data?.BrideDetails?.brideMiddlenameMl,
          brideLastnameEn: data?.BrideDetails?.brideLastnameEn,
          brideLastnameMl: data?.BrideDetails?.brideLastnameMl,
          brideMobile: data?.BrideDetails?.brideMobile,
          brideEmailid: data?.BrideDetails?.brideEmailid,
          brideGender: data?.BrideDetails?.brideGender,
          brideDOB: data?.BrideDetails?.brideDOB,
          brideAge: data?.BrideDetails?.brideAge,
          brideParentGuardian: data?.BrideDetails?.brideParentGuardian,
          brideFathernameEn: data?.BrideDetails?.brideFathernameEn,
          brideFathernameMl: data?.BrideDetails?.brideFathernameMl,
          brideMothernameEn: data?.BrideDetails?.brideMothernameEn,
          brideMothernameMl: data?.BrideDetails?.brideMothernameMl,
          brideFatherAadharNo: data?.BrideDetails?.brideFatherAadharNo,
          brideMotherAadharNo: data?.BrideDetails?.brideMotherAadharNo,
          brideGuardiannameEn: data?.BrideDetails?.brideGuardiannameEn,
          brideGuardiannameMl: data?.BrideDetails?.brideGuardiannameMl,
          brideGuardianAadharNo: data?.BrideDetails?.brideGuardianAadharNo,
          brideMaritalstatusID: data?.BrideDetails?.brideMaritalstatusID,
          brideIsSpouseLiving: data?.BrideDetails?.brideIsSpouseLiving,
          brideNoOfSpouse: data?.BrideDetails?.brideNoOfSpouse,
        },
        WitnessDetails: {
          witness1AadharNo: data?.WitnessDetails?.witness1AadharNo,
          witness1NameEn: data?.WitnessDetails?.witness1NameEn,
          witness1NameMl: data?.WitnessDetails?.witness1NameMl,
          witness1Age: data?.WitnessDetails?.witness1Age,
          witness1AddresSEn: data?.WitnessDetails?.witness1AddresSEn,
          witness1AddressMl: data?.WitnessDetails?.witness1AddressMl,
          witness1Mobile: data?.WitnessDetails?.witness1Mobile,
          witness1Esigned: data?.WitnessDetails?.witness1Esigned,
          witness2AadharNo: data?.WitnessDetails?.witness2AadharNo,
          witness2NameEn: data?.WitnessDetails?.witness2NameEn,
          witness2NameMl: data?.WitnessDetails?.witness2NameMl,
          witness2Age: data?.WitnessDetails?.witness2Age,
          witness2AddressEn: data?.WitnessDetails?.witness2AddressEn,
          witness2AddressMl: data?.WitnessDetails?.witness2AddressMl,
          witness2Mobile: data?.WitnessDetails?.witness2Mobile,
          witness2Esigned: data?.WitnessDetails?.witness2Esigned,
        },
        BrideAddressDetails: {
          presentaddressCountry: data?.BrideAddressDetails?.presentaddressCountry?.code,
          presentaddressStateName: data?.BrideAddressDetails?.presentaddressStateName?.code,
          presentInsideKeralaLBName: data?.BrideAddressDetails?.presentInsideKeralaLBName.code,
          presentInsideKeralaDistrict: data?.BrideAddressDetails?.presentInsideKeralaDistrict.code,
          presentInsideKeralaTaluk: data?.BrideAddressDetails?.presentInsideKeralaTaluk.code,
          presentInsideKeralaVillage: data?.BrideAddressDetails?.presentInsideKeralaVillage.code,
          presentInsideKeralaLocalityNameEn: data?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.BrideAddressDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.BrideAddressDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.BrideAddressDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.BrideAddressDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPostOffice: data?.BrideAddressDetails?.presentInsideKeralaPostOffice.code,
          presentWardNo: data?.BrideAddressDetails?.presentWardNo.code,
          presentOutsideKeralaDistrict: data?.BrideAddressDetails?.presentOutsideKeralaDistrict.code,
          presentOutsideKeralaTaluk: data?.BrideAddressDetails?.presentOutsideKeralaTaluk.code,
          presentOutsideKeralaVillage: data?.BrideAddressDetails?.presentOutsideKeralaVillage.code,
          presentOutsideKeralaCityVilgeEn: data?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.BrideAddressDetails?.presentOutsideKeralaPincode.code,
          presentOutsideKeralaPostOfficeEn: data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn,
          presentOutsideKeralaPostOfficeMl: data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl,
          presentOutsideKeralaLocalityNameEn: data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn,
          presentOutsideKeralaStreetNameEn: data?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn,
          presentOutsideKeralaHouseNameEn: data?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn,
          presentOutsideKeralaStreetNameMl: data?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl,
          presentOutsideKeralaHouseNameMl: data?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl,
          presentOutSideIndiaAdressEn: data?.BrideAddressDetails?.presentOutSideIndiaAdressEn,
          presentOutSideIndiaAdressMl: data?.BrideAddressDetails?.presentOutSideIndiaAdressMl,
          presentOutSideIndiaAdressEnB: data?.BrideAddressDetails?.presentOutSideIndiaAdressEnB,
          presentOutSideIndiaAdressMlB: data?.BrideAddressDetails?.presentOutSideIndiaAdressMlB,
          presentOutSideIndiaProvinceEn: data?.BrideAddressDetails?.presentOutSideIndiaProvinceEn,
          presentOutSideCountry: data?.BrideAddressDetails?.presentOutSideCountry.code,
          presentOutSideIndiaadrsVillage: data?.BrideAddressDetails?.presentOutSideIndiaadrsVillage.code,
          isPermanentAddress: data?.BrideAddressDetails?.isPermanentAddress,
          permtaddressCountry: data?.BrideAddressDetails?.permtaddressCountry.code,
          permtaddressStateName: data?.BrideAddressDetails?.permtaddressStateName,
          permntInKeralaAdrLBName: data?.BrideAddressDetails?.permntInKeralaAdrLBName.code,
          permntInKeralaAdrDistrict: data?.BrideAddressDetails?.permntInKeralaAdrDistrict.code,
          permntInKeralaAdrTaluk: data?.BrideAddressDetails?.permntInKeralaAdrTaluk.code,
          permntInKeralaAdrVillage: data?.BrideAddressDetails?.permntInKeralaAdrVillage.code,
          permntInKeralaAdrLocalityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrHouseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.BrideAddressDetails?.permntInKeralaAdrPincode.code,
          permntInKeralaAdrPostOffice: data?.BrideAddressDetails?.permntInKeralaAdrPostOffice.code,
          permntInKeralaWardNo: data?.BrideAddressDetails?.permntInKeralaWardNo.code,
          permntOutsideKeralaDistrict: data?.BrideAddressDetails?.permntOutsideKeralaDistrict.code,
          permntOutsideKeralaTaluk: data?.BrideAddressDetails?.permntOutsideKeralaTaluk.code,
          permntOutsideKeralaVillage: data?.BrideAddressDetails?.permntOutsideKeralaVillage.code,
          permntOutsideKeralaCityVilgeEn: data?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn,
          permntOutsideKeralaPincode: data?.BrideAddressDetails?.permntOutsideKeralaPincode,
          permntOutsideKeralaLocalityNameEn: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn,
          permntOutsideKeralaStreetNameEn: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn,
          permntOutsideKeralaHouseNameEn: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn,
          permntOutsideKeralaLocalityNameMl: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl,
          permntOutsideKeralaStreetNameMl: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl,
          permntOutsideKeralaHouseNameMl: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl,
          permntOutsideKeralaPostOfficeEn: data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn,
          permntOutsideKeralaPostOfficeMl: data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl,
          permntOutsideIndiaLineoneEn: data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn,
          permntOutsideIndiaLineoneMl: data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl,
          permntOutsideIndiaLinetwoEn: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn,
          permntOutsideIndiaLinetwoMl: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl,
          permntOutsideIndiaprovinceEn: data?.BrideAddressDetails?.permntOutsideIndiaprovinceEn,
          permntOutsideIndiaVillage: data?.BrideAddressDetails?.permntOutsideIndiaVillage,
          permntOutsideIndiaCityTown: data?.BrideAddressDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.BrideAddressDetails?.permanentOutsideIndiaPostCode,
        },
        GroomAddressDetails: {
          presentaddressCountry: data?.GroomAddressDetails?.presentaddressCountry?.code,
          presentaddressStateName: data?.GroomAddressDetails?.presentaddressStateName.code,
          presentInsideKeralaLBName: data?.GroomAddressDetails?.presentInsideKeralaLBName.code,
          presentInsideKeralaDistrict: data?.GroomAddressDetails?.presentInsideKeralaDistrict.code,
          presentInsideKeralaTaluk: data?.GroomAddressDetails?.presentInsideKeralaTaluk.code,
          presentInsideKeralaVillage: data?.GroomAddressDetails?.presentInsideKeralaVillage.code,
          presentInsideKeralaLocalityNameEn: data?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.GroomAddressDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.GroomAddressDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.GroomAddressDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.GroomAddressDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPostOffice: data?.GroomAddressDetails?.presentInsideKeralaPostOffice.code,
          presentWardNo: data?.GroomAddressDetails?.presentWardNo.code,
          presentOutsideKeralaDistrict: data?.GroomAddressDetails?.presentOutsideKeralaDistrict.code,
          presentOutsideKeralaTaluk: data?.GroomAddressDetails?.presentOutsideKeralaTaluk.code,
          presentOutsideKeralaVillage: data?.GroomAddressDetails?.presentOutsideKeralaVillage.code,
          presentOutsideKeralaCityVilgeEn: data?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.GroomAddressDetails?.presentOutsideKeralaPincode.code,
          presentOutsideKeralaPostOfficeEn: data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn,
          presentOutsideKeralaPostOfficeMl: data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl,
          presentOutsideKeralaLocalityNameEn: data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn,
          presentOutsideKeralaStreetNameEn: data?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn,
          presentOutsideKeralaHouseNameEn: data?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn,
          presentOutsideKeralaStreetNameMl: data?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl,
          presentOutsideKeralaHouseNameMl: data?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl,
          presentOutSideIndiaAdressEn: data?.GroomAddressDetails?.presentOutSideIndiaAdressEn,
          presentOutSideIndiaAdressMl: data?.GroomAddressDetails?.presentOutSideIndiaAdressMl,
          presentOutSideIndiaAdressEnB: data?.GroomAddressDetails?.presentOutSideIndiaAdressEnB,
          presentOutSideIndiaAdressMlB: data?.GroomAddressDetails?.presentOutSideIndiaAdressMlB,
          presentOutSideIndiaProvinceEn: data?.GroomAddressDetails?.presentOutSideIndiaProvinceEn,
          presentOutSideCountry: data?.GroomAddressDetails?.presentOutSideCountry.code,
          presentOutSideIndiaadrsVillage: data?.GroomAddressDetails?.presentOutSideIndiaadrsVillage.code,
          isPermanentAddress: data?.GroomAddressDetails?.isPermanentAddress,
          permtaddressCountry: data?.GroomAddressDetails?.permtaddressCountry.code,
          permtaddressStateName: data?.GroomAddressDetails?.permtaddressStateName,
          permntInKeralaAdrLBName: data?.GroomAddressDetails?.permntInKeralaAdrLBName.code,
          permntInKeralaAdrDistrict: data?.GroomAddressDetails?.permntInKeralaAdrDistrict.code,
          permntInKeralaAdrTaluk: data?.GroomAddressDetails?.permntInKeralaAdrTaluk.code,
          permntInKeralaAdrVillage: data?.GroomAddressDetails?.permntInKeralaAdrVillage.code,
          permntInKeralaAdrLocalityNameEn: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrHouseNameEn: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.GroomAddressDetails?.permntInKeralaAdrPincode.code,
          permntInKeralaAdrPostOffice: data?.GroomAddressDetails?.permntInKeralaAdrPostOffice.code,
          permntInKeralaWardNo: data?.GroomAddressDetails?.permntInKeralaWardNo.code,
          permntOutsideKeralaDistrict: data?.GroomAddressDetails?.permntOutsideKeralaDistrict.code,
          permntOutsideKeralaTaluk: data?.GroomAddressDetails?.permntOutsideKeralaTaluk.code,
          permntOutsideKeralaVillage: data?.GroomAddressDetails?.permntOutsideKeralaVillage.code,
          permntOutsideKeralaCityVilgeEn: data?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn,
          permntOutsideKeralaPincode: data?.GroomAddressDetails?.permntOutsideKeralaPincode,
          permntOutsideKeralaLocalityNameEn: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn,
          permntOutsideKeralaStreetNameEn: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn,
          permntOutsideKeralaHouseNameEn: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn,
          permntOutsideKeralaLocalityNameMl: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl,
          permntOutsideKeralaStreetNameMl: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl,
          permntOutsideKeralaHouseNameMl: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl,
          permntOutsideKeralaPostOfficeEn: data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn,
          permntOutsideKeralaPostOfficeMl: data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl,
          permntOutsideIndiaLineoneEn: data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn,
          permntOutsideIndiaLineoneMl: data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl,
          permntOutsideIndiaLinetwoEn: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn,
          permntOutsideIndiaLinetwoMl: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl,
          permntOutsideIndiaprovinceEn: data?.GroomAddressDetails?.permntOutsideIndiaprovinceEn,
          permntOutsideIndiaVillage: data?.GroomAddressDetails?.permntOutsideIndiaVillage.code,
          permntOutsideIndiaCityTown: data?.GroomAddressDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.GroomAddressDetails?.permanentOutsideIndiaPostCode,
        },
      },
    ],
  };
};

export const getEditRenewTradeDocumentUpdate = (data, datafromflow) => {
  let updateddocuments = [];
  let doc = datafromflow ? datafromflow.owners.documents : [];
  data.tradeLicenseDetail.applicationDocuments.map((olddoc) => {
    if (
      (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId === datafromflow.owners.documents["OwnerPhotoProof"].fileStoreId) ||
      (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId == datafromflow.owners.documents["ProofOfOwnership"].fileStoreId) ||
      (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId === datafromflow.owners.documents["ProofOfIdentity"].fileStoreId)
    ) {
      updateddocuments.push(olddoc);
    } else {
      if (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId !== datafromflow.owners.documents["OwnerPhotoProof"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["OwnerPhotoProof"].name,
          fileStoreId: doc["OwnerPhotoProof"].fileStoreId,
          documentType: "OWNERPHOTO",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId !== datafromflow.owners.documents["ProofOfOwnership"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfOwnership"].name,
          fileStoreId: doc["ProofOfOwnership"].fileStoreId,
          documentType: "OWNERSHIPPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId !== datafromflow.owners.documents["ProofOfIdentity"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfIdentity"].name,
          fileStoreId: doc["ProofOfIdentity"].fileStoreId,
          documentType: "OWNERIDPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
    }
  });
  return updateddocuments;
};

export const convertToUpdateTrade = (data = {}, datafromflow, tenantId) => {
  const isEdit = window.location.href.includes("renew-trade");
  let formdata1 = {
    Licenses: [],
  };
  formdata1.Licenses[0] = {
    ...data.Licenses[0],
  };
  formdata1.Licenses[0].action = "APPLY";
  formdata1.Licenses[0].wfDocuments = formdata1.Licenses[0].wfDocuments ? formdata1.Licenses[0].wfDocuments : getwfdocuments(datafromflow);
  formdata1.Licenses[0].tradeLicenseDetail.applicationDocuments = !isEdit
    ? formdata1.Licenses[0].tradeLicenseDetail.applicationDocuments
      ? formdata1.Licenses[0].tradeLicenseDetail.applicationDocuments
      : getwfdocuments(datafromflow)
    : getEditRenewTradeDocumentUpdate(data?.Licenses[0], datafromflow);
  return formdata1;
};

export const getvalidfromdate = (date, fy) => {
  let temp = parseInt(fy[0].id);
  let object;
  fy &&
    fy.map((ob) => {
      if (parseInt(ob.id) > temp) {
        object = ob;
        temp = parseInt(ob.id);
      }
    });
  return object;
};

export const getvalidTodate = (date, fy) => {
  let temp = parseInt(fy[0].id);
  let object;
  fy &&
    fy.map((ob) => {
      if (parseInt(ob.id) > temp) {
        object = ob;
        temp = parseInt(ob.id);
      }
    });
  return object;
};

export const stringToBoolean = (value) => {
  if (value) {
    switch (value.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(value);
    }
  } else {
    return Boolean(value);
  }
};

//FinancialYear
export const convertToEditTrade = (data, fy = []) => {
  const currrentFYending = fy?.filter((item) => item?.code === data?.financialYear)?.[0]?.endingDate;
  const nextFinancialYearForRenewal = fy?.filter((item) => item?.startingDate === currrentFYending)?.[0]?.code;
  let isDirectrenewal = stringToBoolean(sessionStorage.getItem("isDirectRenewal"));
  let formdata = {
    Licenses: [
      {
        id: data?.id,
        tenantId: data?.address?.city?.code,
        businessService: data?.businessService,
        licenseType: data?.licenseType,
        applicationType: "RENEWAL",
        workflowCode: isDirectrenewal ? "DIRECTRENEWAL" : "EDITRENEWAL",
        licenseNumber: data?.licenseNumber,
        applicationNumber: data?.applicationNumber,
        tradeName: data?.tradeName,
        applicationDate: data?.applicationDate,
        commencementDate: data?.commencementDate,
        issuedDate: data?.issuedDate,
        financialYear: nextFinancialYearForRenewal || "2020-21",
        validFrom: data?.validFrom,
        validTo: data?.validTo,
        action: "INITIATE",
        wfDocuments: data?.wfDocuments,
        status: data?.status,
        tradeLicenseDetail: {
          address: data.tradeLicenseDetail.address,
          applicationDocuments: data.tradeLicenseDetail.applicationDocuments,
          accessories: isDirectrenewal ? data.tradeLicenseDetail.accessories : gettradeupdateaccessories(data),
          owners: isDirectrenewal ? data.tradeLicenseDetail.owners : gettradeownerarray(data),
          structureType: isDirectrenewal
            ? data.tradeLicenseDetail.structureType
            : data?.TradeDetails?.VehicleType
            ? data?.TradeDetails?.VehicleType.code
            : data?.TradeDetails?.BuildingType.code,
          subOwnerShipCategory: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
            ? data?.owners?.owners?.[0]?.subOwnerShipCategory.code
            : data?.ownershipCategory?.code,
          tradeUnits: gettradeupdateunits(data),
          additionalDetail: data.tradeLicenseDetail.additionalDetail,
          auditDetails: data.tradeLicenseDetail.auditDetails,
          channel: data.tradeLicenseDetail.channel,
          id: data.tradeLicenseDetail.id,
          ...(data?.ownershipCategory?.code.includes("INSTITUTIONAL") && {
            institution: {
              designation: data?.owners?.owners?.[0]?.designation,
              ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
              mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
              instituionName: data?.owners?.owners?.[0]?.institutionName,
              name: data?.owners?.owners?.[0]?.name,
            },
          }),
        },
        calculation: null,
        auditDetails: data?.auditDetails,
        accountId: data?.accountId,
      },
    ],
  };
  return formdata;
};

//FinancialYear
export const convertToResubmitTrade = (data) => {
  let formdata = {
    Licenses: [
      {
        id: data?.id,
        tenantId: data?.address?.city?.code,
        businessService: data?.businessService,
        licenseType: data?.licenseType,
        applicationType: data.applicationType,
        workflowCode: data.workflowCode,
        licenseNumber: data?.licenseNumber,
        applicationNumber: data?.applicationNumber,
        tradeName: data?.tradeName,
        applicationDate: data?.applicationDate,
        commencementDate: data?.commencementDate,
        issuedDate: data?.issuedDate,
        financialYear: data?.financialYear,
        validFrom: data?.validFrom,
        validTo: data?.validTo,
        action: "FORWARD",
        wfDocuments: data?.wfDocuments,
        status: data?.status,
        tradeLicenseDetail: {
          address: data.tradeLicenseDetail.address,
          applicationDocuments: getEditTradeDocumentUpdate(data),
          accessories: gettradeupdateaccessories(data),
          owners: gettradeownerarray(data),
          structureType: data?.TradeDetails?.VehicleType ? data?.TradeDetails?.VehicleType.code : data?.TradeDetails?.BuildingType.code,
          subOwnerShipCategory: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
            ? data?.owners?.owners?.[0]?.subOwnerShipCategory.code
            : data?.ownershipCategory?.code,
          tradeUnits: gettradeupdateunits(data),
          additionalDetail: data.tradeLicenseDetail.additionalDetail,
          auditDetails: data.tradeLicenseDetail.auditDetails,
          channel: data.tradeLicenseDetail.channel,
          id: data.tradeLicenseDetail.id,
          institution: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
            ? {
                designation: data?.owners?.owners?.[0]?.designation,
                ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
                mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
                instituionName: data?.owners?.owners?.[0]?.institutionName,
                name: data?.owners?.owners?.[0]?.name,
              }
            : null,
        },
        calculation: null,
        auditDetails: data?.auditDetails,
        accountId: data?.accountId,
      },
    ],
  };
  return formdata;
};

/*   method to check value  if not returns NA*/

export const convertEpochToDateCitizen = (dateEpoch) => {
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

export const checkForNA = (value = "") => {
  return checkForNotNull(value) ? value : "PT_NA";
};

export const getCommencementDataFormat = (date) => {
  let newDate =
    new Date(date).getFullYear().toString() + "-" + (new Date(date).getMonth() + 1).toString() + "-" + new Date(date).getDate().toString();
  return newDate;
};

/*   method to check value  if not returns NA*/
export const isPropertyVacant = (value = "") => {
  return checkForNotNull(value) && value.includes("VACANT") ? true : false;
};

/*   method to check value equal to flat / part of building if not returns NA  */
export const isPropertyFlatorPartofBuilding = (value = "") => {
  return checkForNotNull(value) && value.includes("SHAREDPROPERTY") ? true : false;
};

export const isPropertyIndependent = (value = "") => {
  return checkForNotNull(value) && value.includes("INDEPENDENT") ? true : false;
};

export const isthere1Basement = (value = "") => {
  return checkForNotNull(value) && value.includes("ONE") ? true : false;
};

export const isthere2Basement = (value = "") => {
  return checkForNotNull(value) && value.includes("TWO") ? true : false;
};

export const isPropertyselfoccupied = (value = "") => {
  return checkForNotNull(value) && value.includes("SELFOCCUPIED") ? true : false;
};

export const isPropertyPartiallyrented = (value = "") => {
  return checkForNotNull(value) && value.includes("PARTIALLY") ? true : false;
};

export const ispropertyunoccupied = (value = "") => {
  return checkForNotNull(value) && value.includes("YES") ? true : false;
};
/*   method to get required format from fielstore url*/
export const pdfDownloadLink = (documents = {}, fileStoreId = "", format = "") => {
  /* Need to enhance this util to return required format*/

  let downloadLink = documents[fileStoreId] || "";
  let differentFormats = downloadLink?.split(",") || [];
  let fileURL = "";
  differentFormats.length > 0 &&
    differentFormats.map((link) => {
      if (!link.includes("large") && !link.includes("medium") && !link.includes("small")) {
        fileURL = link;
      }
    });
  return fileURL;
};

/*   method to get filename  from fielstore url*/
export const pdfDocumentName = (documentLink = "", index = 0) => {
  let documentName = decodeURIComponent(documentLink.split("?")[0].split("/").pop().slice(13)) || `Document - ${index + 1}`;
  return documentName;
};

/* methid to get date from epoch */
export const convertEpochToDate = (dateEpoch) => {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${year}-${month}-${day}`; //`${day}/${month}/${year}`;
  } else {
    return null;
  }
};

export const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

export const checkIsAnArray = (obj = []) => {
  return obj && Array.isArray(obj) ? true : false;
};
export const checkArrayLength = (obj = [], length = 0) => {
  return checkIsAnArray(obj) && obj.length > length ? true : false;
};

export const getWorkflow = (data = {}) => {
  return {
    action: data?.isEditProperty ? "REOPEN" : "OPEN",
    businessService: `PT.${getCreationReason(data)}`,
    moduleName: "PT",
  };
};

export const getCreationReason = (data = {}) => {
  return data?.isUpdateProperty ? "UPDATE" : "CREATE";
};

export const getUniqueItemsFromArray = (data, identifier) => {
  const uniqueArray = [];
  const map = new Map();
  for (const item of data) {
    if (!map.has(item[identifier])) {
      map.set(item[identifier], true); // set any value to Map
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
};

export const commonTransform = (object, path) => {
  let data = get(object, path);
  let transformedData = {};
  data.map((a) => {
    const splitList = a.code.split(".");
    let ipath = "";
    for (let i = 0; i < splitList.length; i += 1) {
      if (i != splitList.length - 1) {
        if (!(splitList[i] in (ipath === "" ? transformedData : get(transformedData, ipath)))) {
          set(transformedData, ipath === "" ? splitList[i] : ipath + "." + splitList[i], i < splitList.length - 2 ? {} : []);
        }
      } else {
        get(transformedData, ipath).push(a);
      }
      ipath = splitList.slice(0, i + 1).join(".");
    }
  });
  set(object, path, transformedData);
  return object;
};

export const convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
  //example input format : "2018-10-02"
  try {
    const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
    DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
    if (dayStartOrEnd === "dayend") {
      DateObj.setHours(DateObj.getHours() + 24);
      DateObj.setSeconds(DateObj.getSeconds() - 1);
    }
    return DateObj.getTime();
  } catch (e) {
    return dateString;
  }
};

export const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
        let [key, value] = param.split("=");
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
        return params;
      }, {})
    : {};
};

export const getPattern = (type) => {
  switch (type) {
    case "Name":
      return /^[^{0-9}^\$\"<>?\\\\~!@#$%^()+={}\[\]*,/_:;“”‘’]{1,50}$/i;
    case "MobileNo":
      return /^[6789][0-9]{9}$/i;
    case "Amount":
      return /^[0-9]{0,8}$/i;
    case "NonZeroAmount":
      return /^[1-9][0-9]{0,7}$/i;
    case "DecimalNumber":
      return /^\d{0,8}(\.\d{1,2})?$/i;
    //return /(([0-9]+)((\.\d{1,2})?))$/i;
    case "Email":
      return /^(?=^.{1,64}$)((([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/i;
    case "Address":
      return /^[^\$\"<>?\\\\~`!@$%^()+={}\[\]*:;“”‘’]{1,500}$/i;
    case "PAN":
      return /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/i;
    case "TradeName":
      return /^[-@.\/#&+\w\s]*$/;
    //return /^[^\$\"'<>?\\\\~`!@#$%^()+={}\[\]*,.:;“”‘’]{1,100}$/i;
    case "Date":
      return /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/i;
    case "UOMValue":
      return /^(0)*[1-9][0-9]{0,5}$/i;
    case "OperationalArea":
      return /^(0)*[1-9][0-9]{0,6}$/i;
    case "NoOfEmp":
      return /^(0)*[1-9][0-9]{0,6}$/i;
    case "GSTNo":
      return /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/i;
    case "DoorHouseNo":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*:;“”‘’]{1,50}$/i;
    case "BuildingStreet":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,64}$/i;
    case "Pincode":
      return /^[1-9][0-9]{5}$/i;
    case "Landline":
      return /^[0-9]{11}$/i;
    case "PropertyID":
      return /^[a-zA-z0-9\s\\/\-]$/i;
    case "ElectricityConnNo":
      return /^.{1,15}$/i;
    case "DocumentNo":
      return /^[0-9]{1,15}$/i;
    case "eventName":
      return /^[^\$\"<>?\\\\~`!@#$%^()+={}\[\]*,.:;“”]{1,65}$/i;
    case "eventDescription":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,500}$/i;
    case "cancelChallan":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,100}$/i;
    case "FireNOCNo":
      return /^[a-zA-Z0-9-]*$/i;
    case "consumerNo":
      return /^[a-zA-Z0-9/-]*$/i;
    case "AadharNo":
      //return /^\d{4}\s\d{4}\s\d{4}$/;
      return /^([0-9]){12}$/;
    case "ChequeNo":
      return /^(?!0{6})[0-9]{6}$/;
    case "Comments":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,50}$/i;
    case "OldLicenceNo":
      return /^[a-zA-Z0-9-/]{0,64}$/;
  }
};

export const checkForEmployee = (role) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser();
  const rolearray = userInfo?.info?.roles.filter((item) => {
    if (item.code == role && item.tenantId === tenantId) return true;
  });
  return rolearray?.length;
};

export const convertEpochToDateDMY = (dateEpoch) => {
  if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
    return "NA";
  }
  const dateFromApi = new Date(dateEpoch);
  let month = dateFromApi.getMonth() + 1;
  let day = dateFromApi.getDate();
  let year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return `${day}/${month}/${year}`;
};
