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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
  },
  {
    head: "TL_NEW_APPLICATION_PROPERTY",
    body: [
      {
        component: "CPTPropertySearchNSummary",
        withoutLabel: true,
        key: "cpt",
        type: "component",
        hideInCitizen: true,
      },
    ],
  },
  {
    head: "ES_NEW_APPLICATION_LOCATION_DETAILS",
    body: [
      {
        route: "map",
        component: "TLSelectGeolocation",
        nextStep: "tladdress",
        hideInEmployee: true,
        key: "address",
        withoutLabel: true,
        texts: {
          header: "TL_GEOLOACTION_HEADER",
          cardText: "TL_GEOLOCATION_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipAndContinueText: "CORE_COMMON_SKIP_CONTINUE",
        },
      },
      {
        route: "pincode",
        component: "TLSelectPincode",
        texts: {
          headerCaption: "TL_LOCATION_CAPTION",
          header: "TL_PINCODE_HEADER",
          cardText: "TL_PINCODE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        withoutLabel: true,
        key: "address",
        nextStep: "address",
        type: "component",
      },
      {
        route: "tladdress",
        component: "SelectTradeAddress",
        withoutLabel: true,
        texts: {
          headerCaption: "TL_LOCATION_CAPTION",
          header: "TL_ADDRESS_HEADER",
          cardText: "TL_ADDRESS_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "address",
        nextStep: "street",
        isMandatory: true,
        type: "component",
      },
      {
        route: "address",
        component: "TLSelectAddress",
        withoutLabel: true,
        texts: {
          headerCaption: "TL_LOCATION_CAPTION",
          header: "TL_ADDRESS_HEADER",
          cardText: "TL_ADDRESS_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "address",
        nextStep: "street",
        isMandatory: true,
        type: "component",
      },
      {
        type: "component",
        route: "street",
        component: "SelectStreet",
        key: "address",
        withoutLabel: true,
        hideInEmployee: true,
        texts: {
          headerCaption: "TL_LOCATION_CAPTION",
          header: "TL_ADDRESS_HEADER",
          cardText: "TL_STREET_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        inputs: [
          {
            label: "TL_LOCALIZATION_STREET_NAME",
            type: "text",
            name: "street",
            disable: "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          },
          {
            label: "TL_LOCALIZATION_BUILDING_NO",
            type: "text",
            name: "doorNo",
            disable: "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          },
        ],
        nextStep: "landmark",
      },
      {
        type: "component",
        component: "SelectStreet",
        key: "address",
        withoutLabel: true,
        hideInCitizen: true,
        texts: {
          headerCaption: "TL_LOCATION_CAPTION",
          header: "TL_ADDRESS_HEADER",
          cardText: "TL_STREET_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        inputs: [
          {
            label: "TL_LOCALIZATION_BUILDING_NO",
            type: "text",
            name: "doorNo",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          },
          {
            label: "TL_LOCALIZATION_STREET_NAME",
            type: "text",
            name: "street",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          },
        ],
      },
      {
        type: "component",
        route: "landmark",
        component: "SelectLandmark",
        withoutLabel: true,
        texts: {
          headerCaption: "TL_LOCATION_CAPTION",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
          cardText: "TL_LANDMARK_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        key: "address",
        nextStep: "owner-ship-details",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "proof",
        component: "Proof",
        withoutLabel: true,
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_OWNERS_PHOTOGRAPH_HEADER",
          cardText: "",
          nextText: "CS_COMMON_NEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        nextStep: null,
        hideInEmployee: true,
      },
    ],
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
        component: "AddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressBirthDetails",
        nextStep: "initiator-details",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "initiator-details",
        component: "InitiatorDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "InitiatorinfoDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
        hideInCitizen: false,
      },
      {
        route: "informer-details",
        component: "InformarHospitalInstitution",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "InformarHosInstDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
        hideInCitizen: true,
      },
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
    head: "StillBirth Routing",
    body: [
      {
        type: "component",
        route: "stillbirth-child-details",
        isMandatory: true,
        component: "StillBirthChildDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "StillBirthChildDetails",
        withoutLabel: true,
        nextStep: "stillbirth-parents-details",
        hideInEmployee: false,
      },
      {
        route: "stillbirth-parents-details",
        component: "StillBirthParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StillBirthParentsDetails",
        type: "component",
        nextStep: "stillbirth-address",
        hideInEmployee: false,
      },
      {
        route: "stillbirth-address",
        component: "AddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressBirthDetails",
        nextStep: "stillbirth-initiator-details",
        type: "component",
        hideInEmployee: false,
      },

      {
        route: "stillbirth-initiator-details",
        component: "StillBirthInitiatorDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StillBirthInitiatorDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
        hideInCitizen: false,
      },
      {
        route: "stillbirth-informer-details",
        component: "StillBirthInformarDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StillBirthInformarDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
        hideInCitizen: true,
      },
    ],
  },
  {
    head: "BornOutsideIndia Routing",
    body: [
      {
        type: "component",
        route: "born-outside-child-details",
        isMandatory: true,
        component: "BornOutsideChildDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "BornOutsideChildDetails",
        withoutLabel: true,
        nextStep:" born-outside-parents-details",
        hideInEmployee: false,
      },
      {
        route: "born-outside-parents-details",
        component: "BornOutsideParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BornOutsideParentsDetails",
        nextStep: null,
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
        nextStep: "address-death",
      },
      {
        route: "address-death",
        component: "AddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressBirthDetails",
        nextStep: "family-information",
        type: "component",
        hideInEmployee: false,
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
        nextStep: "statistical-info",

        // nextStep: "statistical-info",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "statistical-info",
        component: "StatisticalInfo",
        texts: {
          headerCaption: "",
          // header: "CR_STATISTICAL_INFORMATION_CONTINUE",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StatisticalInfo",
        nextStep: "initiator",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "initiator",
        isMandatory: true,
        component: "Initiater",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "Initiator",
        nextStep: "informer",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "informer",
        isMandatory: true,
        component: "Informer",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "InformantDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
      },
      ////////////////////Death-Stop////////////////////////
      ////////////////////Death-Child-Pages-Stop////////////////////////
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
        nextStep: "address-death",
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
        nextStep: "address-death",
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
        nextStep: "address-death",
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
        nextStep: "address-death",
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
        nextStep: "address-death",
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
        nextStep: "address-death",
        type: "component",
        hideInEmployee: true,
      },
    ],
  },
  ////////////////////Death-Stop////////////////////////

  {
    head: "Marriage Routing",
    body: [
      {
        type: "component",
        route: "marriage-registration",
        isMandatory: true,
        component: "MarriageRegistration",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "MarriageKeyRegistration",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "marriage-institution",
      },
      {
        type: "component",
        route: "marriage-institution",
        isMandatory: true,
        component: "MarriageInstitution",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "MarriageInstitution",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "marriage-publicplace",
      },
      {
        type: "component",
        route: "marriage-publicplace",
        isMandatory: true,
        component: "MarriagePublicPlace",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "MarriagePublicPlace",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "house-registration",
      },
      {
        type: "component",
        route: "house-registration",
        isMandatory: true,
        component: "HouseMarriageRegistration",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "HouseMarriageRegistration",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "groom-details",
      },
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
        key: "GroomDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "bride-details",
      },
      {
        type: "component",
        route: "bride-details",
        isMandatory: true,
        component: "BrideDetails",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "BrideDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "place-of-death",
      },
      {
        type: "component",
        route: "witness-details",
        isMandatory: true,
        component: "witnessdetails",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "witnessdetails",
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
    ],
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
        nextStep: "search-results",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-results",
        isMandatory: true,
        component: "CPTSearchResults",
        key: "cptsearchresults",
        withoutLabel: true,
        nextStep: "property-details",
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
        nextStep: "acknowledge-create-property",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "acknowledge-create-property",
        isMandatory: true,
        component: "CPTAcknowledgement",
        key: "cptacknowledgement",
        withoutLabel: true,
        nextStep: "property-details",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "property-details",
        isMandatory: true,
        component: "CPTPropertyDetails",
        key: "propertydetails",
        withoutLabel: true,
        nextStep: "owner-ship-details",
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
        hideInCitizen: true,
      },
    ],
  },
];
