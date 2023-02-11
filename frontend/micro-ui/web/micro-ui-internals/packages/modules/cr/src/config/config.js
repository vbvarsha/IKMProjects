export const newConfig = [
  {
    head: "",
    body: [
      {
        type: "component",
        component: "TLInfoLabel",
        key: "tradedetils1",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_COMMON_TR_DETAILS",
    body: [
      {
        type: "component",
        component: "TLTradeDetailsEmployee",
        key: "tradedetils",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_TRADE_UNITS_HEADER",
    body: [
      {
        type: "component",
        component: "TLTradeUnitsEmployee",
        key: "tradeUnits",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_NEW_TRADE_DETAILS_HEADER_ACC",
    body: [
      {
        type: "component",
        component: "TLAccessoriesEmployee",
        key: "accessories",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_NEW_APPLICATION_PROPERTY",
    body: [
      {
        component: "CPTPropertySearchNSummary",
        withoutLabel: true,
        key: "cpt",
        type: "component",
        hideInCitizen: true
      },
    ],
  },
  {
    "head": "ES_NEW_APPLICATION_LOCATION_DETAILS",
    "body": [
      {
        "route": "map",
        component: "TLSelectGeolocation",
        nextStep: "tladdress",
        hideInEmployee: true,
        key: "address",
        withoutLabel: true,
        texts: {
          header: "TL_GEOLOACTION_HEADER",
          cardText: "TL_GEOLOCATION_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipAndContinueText: "CORE_COMMON_SKIP_CONTINUE"
        }
      },
      {
        route: "pincode",
        component: "TLSelectPincode",
        texts: {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_PINCODE_HEADER",
          "cardText": "TL_PINCODE_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT",
          "skipText": "CORE_COMMON_SKIP_CONTINUE"
        },
        withoutLabel: true,
        key: "address",
        nextStep: "address",
        type: "component"
      },
      {
        "route": "tladdress",
        "component": "SelectTradeAddress",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_ADDRESS_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "address",
        "nextStep": "street",
        "isMandatory": true,
        "type": "component"
      },
      {
        "route": "address",
        "component": "TLSelectAddress",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_ADDRESS_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "address",
        "nextStep": "street",
        "isMandatory": true,
        "type": "component"
      },
      {
        "type": "component",
        "route": "street",
        "component": "SelectStreet",
        "key": "address",
        "withoutLabel": true,
        "hideInEmployee": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_STREET_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "inputs": [
          {
            "label": "TL_LOCALIZATION_STREET_NAME",
            "type": "text",
            "name": "street",
            "disable": "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          },
          {
            "label": "TL_LOCALIZATION_BUILDING_NO",
            "type": "text",
            "name": "doorNo",
            "disable": "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          }
        ],
        "nextStep": "landmark"
      },
      {
        "type": "component",
        "component": "SelectStreet",
        "key": "address",
        "withoutLabel": true,
        "hideInCitizen": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_STREET_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "inputs": [
          {
            "label": "TL_LOCALIZATION_BUILDING_NO",
            "type": "text",
            "name": "doorNo",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          },
          {
            "label": "TL_LOCALIZATION_STREET_NAME",
            "type": "text",
            "name": "street",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          }
        ]
      },
      {
        "type": "component",
        "route": "landmark",
        "component": "SelectLandmark",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
          "cardText": "TL_LANDMARK_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT",
          "skipText": "CORE_COMMON_SKIP_CONTINUE"
        },
        "key": "address",
        "nextStep": "owner-ship-details",
        "hideInEmployee": true
      },
      {
        "type": "component",
        "route": "proof",
        "component": "Proof",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_OWNERS_DETAILS",
          "header": "TL_OWNERS_PHOTOGRAPH_HEADER",
          "cardText": "",
          "nextText": "CS_COMMON_NEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "owners",
        "nextStep": null,
        "hideInEmployee": true
      }
    ]
  },
  {
    head: "Birth Routing",
    body: [
      {
        type: "component",
        route: "child-details",
        isMandatory: true,
        component: "ChildDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "ChildDetails",
        withoutLabel: true,
        nextStep: "parents-details",
        hideInEmployee: false,
      },
      {
        route: "parents-details",
        component: "ParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "ParentsDetails",
        type: "component",
        nextStep: "address-birth",
        hideInEmployee: false,
      },
      {
        route: "address-birth",
        component: "AddressBirth",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressBirthDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "address-permanent",
        component: "AddressPermanent",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressPermanentDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: false,
      },
    
    
      {
        route: "address-insidekerala",
        component: "AddressInsideKerala",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressInsideKeralaDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "address-permanent-insidekerala",
        component: "AddressPermanentInsideKerala",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressPermntInsideKeralaDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "address-outside-kerala",
        component: "AddressOutsideKerala",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressOutsideKeralaDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "address-permanent-outside-kerala",
        component: "AddressPermanentOutsideKerala",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressPermanentOutsideKeralaDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: false,
      },
     
      {
        route: "addressbrith-outside-india",
        component: "AddressBrOutsideIndia",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressBrOutsideIndiaDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "address-permanent-outside-india",
        component: "AddressPermanentOutsideIndia",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressPermanentOutsideIndiaDetails",
        nextStep: "null",
        type: "component",
        hideInEmployee: true,
      },



      // {
      //   route: "address-inside-india",
      //   component: "AddressInsideIndia",
      //   texts: {
      //     headerCaption: "",
      //     header: "",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   withoutLabel: true,
      //   key: "AddressInsideIndiaDetails",
      //   nextStep: "statistical-information",
      //   type: "component",
      //   hideInEmployee: false,
      // },



      
   
      {
        route: "multiple-birth",
        component: "MultipleBirth",
        texts: {
          headerCaption: "",
          header: "CR_MULTIPLE_BIRTH",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "MultipleBirthDetails",
        nextStep: "hospital-details",
        type: "component",
        hideInEmployee: false,
      },   

     
    ],
  },

  {
    head: "Adoption Routing",
    body: [
      {
        type: "component",
        route: "adoption-details",
        isMandatory: true,
        component: "AdoptionDetails",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "AdoptionDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "adopted-Parents-information",
      },


      // {
      //   route: "adopted-mother-information",
      //   component: "AdoptionMotherInformation",
      //   texts: {
      //     headerCaption: "",
      //     header: "Adopted - Mother Information",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   key: "AdoptionMotherInfoDetails",
      //   withoutLabel: true,
      //   hideInEmployee: false,
      //   nextStep: "adopted-father-information",
      // },    


      {
        route: "adopted-Parents-information",
        component: "AdoptiveParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        key: "AdoptionParentsDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "adopted-parents-address",
      },
      {
        route: "adopted-parents-address",
        component: "AdoptionParentsAddress",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        key: "AdoptionParentsAddressDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "birth-mother-information",
      },

      // {
      //   route: "birth-mother-information",
      //   component: "BirthMotherInformation",
      //   texts: {
      //     headerCaption: "",
      //     header: "Birth - Mother's Information",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   key: "BirthMotherInfoDetails",
      //   withoutLabel: true,
      //   hideInEmployee: false,
      //   nextStep: "birth-father-information",
      // },
      // {
      //   route: "birth-father-information",
      //   component: "BirthFatherInformation",
      //   texts: {
      //     headerCaption: "",
      //     header: "Birth - Father's Information",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   key: "BirthFatherInfoDetails",
      //   withoutLabel: true,
      //   hideInEmployee: false,
      //   nextStep: "birth-parents-address",
      // },
      // {
      //   route: "birth-parents-address",
      //   component: "BirthParentsAddress",
      //   texts: {
      //     headerCaption: "",
      //     header: "Birth Parents Address",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   key: "BirthParentsAddress",
      //   withoutLabel: true,
      //   hideInEmployee: false,
      //   nextStep: "adoption-statistical-information",
      // },

      // {
      //   route: "adoption-statistical-information",
      //   component: "AdoptionStatisticalInformation",
      //   texts: {
      //     headerCaption: "",
      //     header: "Adoption - Statistical Information",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   key: "AdoptionStatisticalInfoDetails",
      //   withoutLabel: true,
      //   hideInEmployee: false,
      //   nextStep: "AdoptionStatisticalInformation",
      // },


    ],
  },

  {
    head: "Death Routing",
    body: [
      {
        type: "component",
        route: "information-death",
        isMandatory: true,
        component: "InformationDeath",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "InformationDeath",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "family-information",
      },
      {
        route: "family-information",
        component: "FamilyInformationDeath",
        texts: {
          headerCaption: "",
          // header: "CR_FAMILY_INFO",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeath",
        nextStep: "address-of-decesed",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "address-of-decesed",
        isMandatory: true,
        component: "InsideIndia",
        texts: {
          headerCaption: "",
          // header: "CR_ADDRESS_DECESED",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        key: "AddressOfDecesed",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "family-information",
      },
      {
        route: "family-information",
        component: "FamilyInformationDeath",
        texts: {
          headerCaption: "",
          // header: "CR_FAMILY_INFO",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "FamilyInformationDeath",
        nextStep: "statistical-info-continue",
        type: "component",
        hideInEmployee: true,
      },

      {
        route: "place-death-home",
        component: "PlaceOfDeathHome",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH_HOME",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathHome",
        nextStep: "address-of-decese",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "hospital-details-death",
        component: "PlaceOfDeathHospital",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH_HOSPITAL",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathHospital",
        nextStep: "address-of-decese",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "institution-details-death",
        component: "PlaceOfDeathInstitution",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH_INSTITUTION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathInstitution",
        nextStep: "address-of-decese",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-of-death-other",
        component: "PlaceOfDeathOther",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH_OTHER",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathOther",
        nextStep: "address-of-",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-of-death-vehicle",
        component: "PlaceOfDeathVehicle",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH_VECHICLE",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathVehicle",
        nextStep: "address-of-decesd",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "Informant-Details",
        component: "InformentAddress",
        texts: {
          headerCaption: "",
          // header: "CR_INFORMANT_ADDRESS",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "InformentAddress",
        // nextStep: "statistical-info-continue",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "hospital",
        isMandatory: true,
        component: "Hospital",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "Hospital",
        nextStep: "address-of-decesed",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "institution",
        isMandatory: true,
        component: "Institution",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "Institution",
        nextStep: "address-of-decesed",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "death-place-home",
        isMandatory: true,
        component: "DeathPlaceHome",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "DeathPlaceHome",
        nextStep: "address-of-decesed",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "death-place-vehicle",
        isMandatory: true,
        component: "DeathPlaceVehicle",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "DeathPlaceVehicle",
        nextStep: "place-of-death",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "death-public-place",
        isMandatory: true,
        component: "DeathPublicPlace",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        nextStep: "place-of-death",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "death-outside-jurisdiction",
        isMandatory: true,
        component: "DeathOutsideJurisdiction",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "DeathOutsideJurisdiction",
        nextStep: "place-of-death",
        type: "component",
        hideInEmployee: true,
      },
      
      // {
      //   route: "statistical-info",
      //   component: "StatisticalInfo",
      //   texts: {
      //     headerCaption: "",
      //     header: "CR_STATISTICAL_INFORMATION",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   withoutLabel: true,
      //   key: "StatisticalInfo",
      //   nextStep: "statistical-info-continue",
      //   type: "component",
      //   hideInEmployee: true,
      // },
      {
        route: "statistical-info-continue",
        component: "StatisticalInfoContinue",
        texts: {
          headerCaption: "",
          // header: "CR_STATISTICAL_INFORMATION_CONTINUE",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StatisticalInfoContinue",
        nextStep: "general-remarks",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "applicant-details",
        component: "ApplicantDetails",
        texts: {
          headerCaption: "",
          // header: "CR_APPLICANT_DETAILS",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "ApplicantDetails",
        nextStep: "",
        type: "component",
        hideInEmployee: true,
      },

      {
        route: "general-remarks",
        component: "GeneralRemarks",
        texts: {
          headerCaption: "",
          // header: "CR_GENERAL_REMARKS",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "GeneralRemarks",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
      },
    ]
  },
  {
    head: "Marriage Routing",
    body: [
      {
        type: "component",
        route: "groom-details",
        isMandatory: true,
        component: "GroomDetails",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "GroomKeyDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "place-of-death",
      },
      {
        route: "place-of-death",
        isMandatory: true,
        component: "PlaceOfDeath",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeath",
        nextStep: "address-of-decese",
        type: "component",
        hideInEmployee: true,
      },
    ]
  },
  {
    head: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "owner-ship-details",
        isMandatory: true,
        component: "SelectOwnerShipDetails",
        texts: {
          headerCaption: "TL_TRADE_OWNERSHIP_CAPTION",
          header: "TL_PROVIDE_OWNERSHIP_DETAILS",
          cardText: "TL_PROVIDE_OWNERSHI_DETAILS_SUB_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "ownershipCategory",
        withoutLabel: true,
        nextStep: "owner-details",
      },
      {
        isMandatory: true,
        type: "component",
        route: "owner-details",
        key: "owners",
        component: "SelectOwnerDetails",
        texts: {
          headerCaption: "",
          header: "TL_OWNERSHIP_INFO_SUB_HEADER",
          cardText: "TL_OWNER_DETAILS_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        nextStep: "owner-address",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "owner-address",
        isMandatory: true,
        component: "SelectOwnerAddress",
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_OWNERS_ADDRESS",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "proof-of-identity",
        hideInEmployee: true,
      },
      /* {
          type: "component",
          component: "SelectAltContactNumber",
          key: "owners",
          withoutLabel: true,
          hideInEmployee: true,
        }, */
      {
        type: "component",
        route: "proof-of-identity",
        isMandatory: true,
        component: "SelectProofIdentity",
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_PROOF_IDENTITY_HEADER",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          addMultipleText: "PT_COMMON_ADD_APPLICANT_LABEL",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "ownership-proof",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "ownership-proof",
        isMandatory: true,
        component: "SelectOwnershipProof",
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_OWNERSHIP_DOCUMENT",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "proof",
        hideInEmployee: true,
      },
      {
        type: "component",
        component: "TLOwnerDetailsEmployee",
        key: "owners",
        withoutLabel: true,
        hideInCitizen: true,
      },
    ],
  },
  {
    head: "",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "know-your-property",
        isMandatory: true,
        component: "CPTKnowYourProperty",
        texts: {
          header: "PT_DO_YOU_KNOW_YOUR_PROPERTY",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "knowyourproperty",
        isCreateEnabled: true,
        withoutLabel: true,
        nextStep: {
          TL_COMMON_YES: "search-property",
          TL_COMMON_NO: "create-property",
        },
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-property",
        isMandatory: true,
        component: "CPTSearchProperty",
        key: "cptsearchproperty",
        withoutLabel: true,
        nextStep: 'search-results',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-results",
        isMandatory: true,
        component: "CPTSearchResults",
        key: "cptsearchresults",
        withoutLabel: true,
        nextStep: 'property-details',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "create-property",
        isMandatory: true,
        component: "CPTCreateProperty",
        key: "cptcreateproperty",
        withoutLabel: true,
        isSkipEnabled: true,
        nextStep: 'acknowledge-create-property',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "acknowledge-create-property",
        isMandatory: true,
        component: "CPTAcknowledgement",
        key: "cptacknowledgement",
        withoutLabel: true,
        nextStep: 'property-details',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "property-details",
        isMandatory: true,
        component: "CPTPropertyDetails",
        key: "propertydetails",
        withoutLabel: true,
        nextStep: 'owner-ship-details',
        hideInEmployee: true,
      },
    ],
  },
  {
    head: "TL_NEW_APPLICATION_DOCUMENTS_REQUIRED",
    body: [
      {
        component: "TLDocumentsEmployee",
        withoutLabel: true,
        key: "documents",
        type: "component",
        hideInCitizen: true
      },
    ],
  },
];
