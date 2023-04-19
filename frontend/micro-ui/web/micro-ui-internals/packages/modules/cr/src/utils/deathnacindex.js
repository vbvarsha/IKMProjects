import _ from "lodash";
import get from "lodash/get";
import set from "lodash/set";

export const DeathNACRegistrationData = (data = {}) => {
    console.log(data, "data  in json field");
    const {DeathNACDetails = {}, DeceasedMiddleNameMl="", Id=null, DeathNACAddressPage={}, DeathNACInitiator={}, DeathNACParentsDetails
={}} = data;

    let InformationDeath={
        Id,
        TenantId:_.get(DeathNACDetails, "tenantid",""),
        DeceasedFirstNameEn:_.get(DeathNACDetails, "DeceasedFirstNameEn",""),
        DeceasedMiddleNameEn:_.get(DeathNACDetails, "DeceasedMiddleNameEn",""),
        DeceasedLastNameEn:_.get(DeathNACDetails, "DeceasedLastNameEn",""),
        DeceasedFirstNameMl:_.get(DeathNACDetails, "DeceasedFirstNameMl",""),
        DeceasedMiddleNameMl:_.get(DeathNACDetails, "DeceasedMiddleNameMl",""),
        DeceasedLastNameMl:_.get(DeathNACDetails, "DeceasedLastNameMl",""),
        DeceasedGender:_.get(DeathNACDetails, "DeceasedGender.code",""),
        DateOfDeath:Date.parse(_.get(DeathNACDetails, "DateOfDeath",null)),
        DeceasedAadharNotAvailable:_.get(DeathNACDetails, "DeceasedAadharNotAvailable",false),
        DeceasedAadharNumber:_.get(DeathNACDetails, "DeceasedAadharNumber",""),
        DeathPlace:_.get(DeathNACDetails, "DeathPlace.code",""),
        DeathPlaceType:_.get(DeathNACDetails, "DeathPlaceType.code",""),

        DeathPlaceInstId:null,
        VehicleHospitalEn:null,
        VehicleNumber:null,
        VehicleFromplaceEn:null,
        VehicleFromplaceMl:null,
        VehicleToPlaceEn:null,
        VehicleToPlaceMl:null,
        VehicleFirstHaltEn:null,
        VehicleFirstHaltMl:null,
        DeathPlaceWardId:null,

        DeathPlaceCountry:_.get(DeathNACDetails, "DeathPlaceCountry.code",""),
        DeathPlaceLocalityEn:_.get(DeathNACDetails, "DeathPlaceLocalityEn",null),
        DeathPlaceLocalityMl:_.get(DeathNACDetails, "DeathPlaceLocalityMl",null),
        DeathPlaceStreetEn:_.get(DeathNACDetails, "DeathPlaceStreetEn",null),
        DeathPlaceStreetMl:_.get(DeathNACDetails, "DeathPlaceStreetMl",null),
        DeathPlaceHomeWardId:_.get(DeathNACDetails, "DeathPlaceHomeWardId",null),
        DeathPlaceHomePostofficeId: data.DeathNACDetails.DeathPlace.code === "HOME" ? _.get(DeathNACDetails, "DeathPlaceHomePostofficeId.code",null) : _.get(DeathNACDetails, "DeathPlaceHomePostofficeId",null),
        DeathPlaceHomepincode:_.get(DeathNACDetails, "DeathPlaceHomepincode",null),
        DeathPlaceHomeLocalityEn:_.get(DeathNACDetails, "DeathPlaceHomeLocalityEn",null),
        DeathPlaceHomeLocalityMl:_.get(DeathNACDetails, "DeathPlaceHomeLocalityMl",null),
        DeathPlaceHomeStreetNameEn:_.get(DeathNACDetails, "DeathPlaceHomeStreetNameEn",null),
        DeathPlaceHomeStreetNameMl:_.get(DeathNACDetails, "DeathPlaceHomeStreetNameMl",null),
        DeathPlaceHomeHoueNameEn:_.get(DeathNACDetails, "DeathPlaceHomeHoueNameEn",null),
        DeathPlaceHomeHoueNameMl:_.get(DeathNACDetails, "DeathPlaceHomeHoueNameMl",null),
        PlaceOfBurialEn:_.get(DeathNACDetails, "placeofBurial",null),


        SpouseUnavailable:null,
        SpouseType:_.get(DeathNACParentsDetails, "SpouseType",null),
        SpouseNameEn:_.get(DeathNACParentsDetails, "SpouseNameEN",null),
        SpouseNameML:_.get(DeathNACParentsDetails, "SpouseNameMl",null),
        SpouseAadhaar:_.get(DeathNACParentsDetails, "SpouseAadhaar",null),
        FatherUnavailable:false,
        FatherNameEn:_.get(DeathNACParentsDetails, "fatherFirstNameEn",null),
        FatherNameMl:_.get(DeathNACParentsDetails, "fatherFirstNameMl",null),
        FatherAadharNo:_.get(DeathNACParentsDetails, "fatherAadhar",null),
        MotherUnavailable:false,
        MotherNameEn:_.get(DeathNACParentsDetails, "motherFirstNameEn",null),
        MotherNameMl:_.get(DeathNACParentsDetails, "motherFirstNameMl",null),
        MotherAadharNo:_.get(DeathNACParentsDetails, "motherAadhar",null),
        DeathACKNo:false,
        funcionUID:"CRDRNA",

    };
    let AddressBirthDetails = {
        PresentAddrTypeId: null,
        presentaddressCountry: _.get(DeathNACAddressPage, "presentaddressCountry.code", ""),
        presentaddressStateName: _.get(DeathNACAddressPage, "presentaddressStateName.statecode", ""),
        presentInsideKeralaLBName: _.get(DeathNACAddressPage, "presentInsideKeralaLBName.code", ""),
        presentInsideKeralaDistrict: _.get(DeathNACAddressPage, "presentInsideKeralaDistrict.code", ""),
        presentInsideKeralaTaluk: _.get(DeathNACAddressPage, "presentInsideKeralaTaluk.code", ""),
        presentInsideKeralaVillage: _.get(DeathNACAddressPage, "presentInsideKeralaVillage.code", ""),
        presentInsideKeralaLocalityNameEn: _.get(DeathNACAddressPage, "presentInsideKeralaLocalityNameEn", ""),
        presentInsideKeralaStreetNameEn: _.get(DeathNACAddressPage, "presentInsideKeralaStreetNameEn", ""),
        presentInsideKeralaHouseNameEn: _.get(DeathNACAddressPage, "presentInsideKeralaHouseNameEn", ""),
        presentInsideKeralaLocalityNameMl: _.get(DeathNACAddressPage, "presentInsideKeralaLocalityNameMl", ""),
        presentInsideKeralaStreetNameMl: _.get(DeathNACAddressPage, "presentInsideKeralaStreetNameMl", ""),
        presentInsideKeralaHouseNameMl: _.get(DeathNACAddressPage, "presentInsideKeralaHouseNameMl", ""),
        presentInsideKeralaPostOffice: _.get(DeathNACAddressPage, "presentInsideKeralaPostOffice.code", ""),
        presentInsideKeralaPincode: _.get(DeathNACAddressPage, "presentInsideKeralaPincode", ""),
        presentWardNo: _.get(DeathNACAddressPage, "presentWardNo.code", ""),
        presentOutsideKeralaDistrict: _.get(DeathNACAddressPage, "presentOutsideKeralaDistrict", ""),
        presentOutsideKeralaTaluk: _.get(DeathNACAddressPage, "presentOutsideKeralaTaluk", ""),
        presentOutsideKeralaVillage: _.get(DeathNACAddressPage, "presentOutsideKeralaVillage", ""),
        presentOutsideKeralaCityVilgeEn: _.get(DeathNACAddressPage, "presentOutsideKeralaCityVilgeEn", ""),
        presentOutsideKeralaPincode: _.get(DeathNACAddressPage, "presentOutsideKeralaPincode", ""),
        presentOutsideKeralaPostOfficeEn: _.get(DeathNACAddressPage, "presentOutsideKeralaPostOfficeEn", ""),
        presentOutsideKeralaPostOfficeMl: _.get(DeathNACAddressPage, "presentOutsideKeralaPostOfficeMl", ""),
        presentOutsideKeralaLocalityNameEn: _.get(DeathNACAddressPage, "presentOutsideKeralaLocalityNameEn", ""),
        presentOutsideKeralaStreetNameEn: _.get(DeathNACAddressPage, "presentOutsideKeralaStreetNameEn", ""),
        presentOutsideKeralaHouseNameEn: _.get(DeathNACAddressPage, "presentOutsideKeralaHouseNameEn", ""),
        presentOutsideKeralaStreetNameMl: _.get(DeathNACAddressPage, "presentOutsideKeralaStreetNameMl", ""),
        presentOutsideKeralaHouseNameMl: _.get(DeathNACAddressPage, "presentOutsideKeralaHouseNameMl", ""),
        presentOutSideIndiaAdressEn: _.get(DeathNACAddressPage, "presentOutSideIndiaAdressEn", ""),
        presentOutSideIndiaAdressMl: _.get(DeathNACAddressPage, "presentOutSideIndiaAdressMl", ""),
        presentOutSideIndiaAdressEnB: _.get(DeathNACAddressPage, "presentOutSideIndiaAdressEnB", ""),
        presentOutSideIndiaAdressMlB: _.get(DeathNACAddressPage, "presentOutSideIndiaAdressMlB", ""),
        presentOutSideIndiaProvinceEn: _.get(DeathNACAddressPage, "presentOutSideIndiaProvinceEn", ""),

        presentOutSideIndiaProvinceMl: null,
        presentOutSideIndiaadrsCityTown: null,
        presentOutSideCountry: null,
        presentOutSideIndiaadrsVillage: null,
        presentOutSideIndiaPostCode: null,

        isPrsentAddress: _.get(DeathNACAddressPage, "isPrsentAddress", false),

        PermanentAddrTypeId: null,
        permtaddressCountry: _.get(DeathNACAddressPage, "permtaddressCountry.code", ""),
        permtaddressStateName: _.get(DeathNACAddressPage, "permtaddressStateName.code", ""),
        permntInKeralaAdrLBName: _.get(DeathNACAddressPage, "permntInKeralaAdrLBName.code", ""),
        permntInKeralaAdrDistrict: _.get(DeathNACAddressPage, "permntInKeralaAdrDistrict.code", ""),
        permntInKeralaAdrTaluk: _.get(DeathNACAddressPage, "permntInKeralaAdrTaluk.code", ""),
        permntInKeralaAdrVillage: _.get(DeathNACAddressPage, "permntInKeralaAdrVillage.code", ""),
        permntInKeralaAdrLocalityNameEn: _.get(DeathNACAddressPage, "permntInKeralaAdrLocalityNameEn", ""),
        permntInKeralaAdrLocalityNameMl: _.get(DeathNACAddressPage, "permntInKeralaAdrLocalityNameMl", ""),
        permntInKeralaAdrHouseNameEn: _.get(DeathNACAddressPage, "permntInKeralaAdrHouseNameEn", ""),
        permntInKeralaAdrHouseNameMl: _.get(DeathNACAddressPage, "permntInKeralaAdrHouseNameMl", ""),
        permntInKeralaAdrStreetNameEN: _.get(DeathNACAddressPage, "permntInKeralaAdrStreetNameEn", ""),
        permntInKeralaAdrStreetNameMl: _.get(DeathNACAddressPage, "permntInKeralaAdrStreetNameML", ""),
        permntInKeralaAdrPostOffice: _.get(DeathNACAddressPage, "permntInKeralaAdrPostOffice.code", ""),
        permntInKeralaAdrPincode: _.get(DeathNACAddressPage, "permntInKeralaAdrPincode", ""),
        permntInKeralaWardNo: _.get(DeathNACAddressPage, "permntInKeralaWardNo.code", ""),
        permntOutsideKeralaDistrict: _.get(DeathNACAddressPage, "permntOutsideKeralaDistrict", ""),
        permntOutsideKeralaTaluk: _.get(DeathNACAddressPage, "permntOutsideKeralaTaluk", ""),
        permntOutsideKeralaVillage: _.get(DeathNACAddressPage, "permntOutsideKeralaVillage", ""),
        permntOutsideKeralaCityVilgeEn: _.get(DeathNACAddressPage, "permntOutsideKeralaCityVilgeEn", ""),
        permntOutsideKeralaPincode: _.get(DeathNACAddressPage, "permntOutsideKeralaPincode", ""),
        permntOutsideKeralaLocalityNameEn: _.get(DeathNACAddressPage, "permntOutsideKeralaLocalityNameEn", ""),
        permntOutsideKeralaStreetNameEn: _.get(DeathNACAddressPage, "permntOutsideKeralaStreetNameEn", ""),
        permntOutsideKeralaHouseNameEn: _.get(DeathNACAddressPage, "permntOutsideKeralaHouseNameEn", ""),
        permntOutsideKeralaLocalityNameMl: _.get(DeathNACAddressPage, "permntOutsideKeralaLocalityNameMl", ""),
        permntOutsideKeralaStreetNameMl: _.get(DeathNACAddressPage, "permntOutsideKeralaStreetNameMl", ""),
        permntOutsideKeralaHouseNameMl: _.get(DeathNACAddressPage, "permntOutsideKeralaHouseNameMl", ""),
        permntOutsideKeralaPostOfficeEn: _.get(DeathNACAddressPage, "permntOutsideKeralaPostOfficeEn", ""),
        permntOutsideKeralaPostOfficeMl: _.get(DeathNACAddressPage, "permntOutsideKeralaPostOfficeMl", ""),
        PermntOutsideIndiaLineoneEn: null,
        PermntOutsideIndiaLineoneMl: null,
        PermntOutsideIndiaLinetwoEn: null,
        PermntOutsideIndiaLinetwoMl: null,
        PermntOutsideIndiaprovinceEn: null,
        PermntOutsideIndiaprovinceMl: null,
        PermntOutsideIndiaVillage:  _.get(DeathNACAddressPage, "permntOutsideIndiaVillage", ""),
        PermntOutsideIndiaCityTown:  _.get(DeathNACAddressPage, "permntOutsideIndiaCityTown", ""),
        PermanentOutsideIndiaPostCode:  _.get(DeathNACAddressPage, "permanentOutsideIndiaPostCode", ""),

    };
    let DeathApplicantDtls = {
        ApplicantName : _.get(DeathNACInitiator, "initiatorNameEn", ""),
        ApplicantAadhaarSubmitted : true,
        ApplicantAadhaarNo : _.get(DeathNACInitiator, "initiatorAadhar", ""),
        ApplicantRelation : _.get(DeathNACInitiator, "RelationwithDeceased", ""),
        ApplicantAddress : _.get(DeathNACInitiator, "initiatorAddress", ""),
        ApplicantMobileNo : _.get(DeathNACInitiator, "initiatorMobile", ""),
        ApplicantEmail : _.get(DeathNACInitiator, "initiatorEmail", ""),
    };
    let AuditDetails = {
        createdBy : null,
        createdTime : null,
        lastModifiedBy : null,
        lastModifiedTime : null,
    }
    let  DeathNACDocuments = [
                {
                    DocumentType: _.get(DeathNACInitiator, "docType1", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile", ""),
                },
                {
                    DocumentType: _.get(DeathNACInitiator, "docType2", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile1", ""),
                },
                {
                    DocumentType: _.get(DeathNACInitiator, "docType3", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile2", ""),
                },
                {
                    DocumentType: _.get(DeathNACInitiator, "docType4", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile3", ""),
                },
                {
                    DocumentType: _.get(DeathNACInitiator, "docType5", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile4", ""),
                },
                {
                    DocumentType: _.get(DeathNACInitiator, "docType6", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile5", ""),
                },
                {
                    DocumentType: _.get(DeathNACInitiator, "docType7", ""),
                    filestoreId: _.get(DeathNACInitiator, "uploadedFile6", ""),
                },
        
            ]

    const response = {
        "deathNACDtls": [
            {
            InformationDeath,
            AddressBirthDetails,
            DeathApplicantDtls,
            DeathNACDocuments,
            AuditDetails,
            "applicationType": "nac",
            "applicationStatus": null,
            "businessService": "CR",
            "action": "INITIATE",
            "assignee": [],
            "workflowcode": "WFDEATH21DAYSHOME",
            "wfDocuments": null
        }
        ]
    }

  return  response;

};