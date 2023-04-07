export const newConfig = [
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
    head: "Birth-NAC Routing",
    body: [
      {
        type: "component",
        route: "nac-download-details",
        isMandatory: true,
        component: "BirthNACDownloadPage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "BirthNACDownloadPage",
        withoutLabel: true,
        nextStep: "nac-child-details",
        hideInEmployee: false,
      },
      {
        route: "nac-child-details",
        component: "BirthNACDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BirthNACDetails",
        type: "component",
        nextStep: "nac-parents-details",
        hideInEmployee: false,
      },
      {
        route: "nac-parents-details",
        component: "BirthNACParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BirthNACParentsDetails",
        type: "component",
        nextStep: "nac-address-details",
        hideInEmployee: false,
      },
      {
        route: "nac-address-details",
        component: "AddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BirthNACAddressPage",
        nextStep: "nac-initiator-details",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "nac-initiator-details",
        component: "BirthNACInitiator",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BirthNACInitiator",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
      }
    ],
  },
  {
    head: "Death-NAC Routing",
    body: [
      {
        type: "component",
        route: "nac-death-download-details",
        isMandatory: true,
        component: "DeathNACDownloadPage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "DeathNACDownloadPage",
        withoutLabel: true,
        nextStep: "nac-death-details",
        hideInEmployee: false,
      },
      {
        type: "component",
        route: "nac-death-details",
        isMandatory: true,
        component: "DeathNACDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "DeathNACDetails",
        withoutLabel: true,
        nextStep: "nac-death-address-details",
        hideInEmployee: false,
      },
      {
        route: "nac-death-address-details",
        component: "DeathNACAddressPage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "DeathNACAddressPage",
        type: "component",
        nextStep: "nac-death-family-details",
        hideInEmployee: false,
      },
      {
        route: "nac-death-family-details",
        component: "DeathNACParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "DeathNACParentsDetails",
        nextStep: "nac-death-informant-details",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "nac-death-informant-details",
        component: "DeathNACInitiator",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "DeathNACInitiator",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
      },
    ],
  },
  {
    head: "Adoption Routing",
    body: [
      {
        type: "component",
        route: "adoption-child-details",
        isMandatory: true,
        component: "AdoptionChildDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "AdoptionChildDetails",
        withoutLabel: true,
        nextStep: "adoption-parents-details",
        hideInEmployee: false,
      },
      {
        route: "adoption-parents-details",
        component: "AdoptionParentsDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AdoptionParentsDetails",
        type: "component",
        nextStep: "adoption-address-birth",
        hideInEmployee: false,
      },
      {
        route: "adoption-address-birth",
        component: "AdoptionAddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AdoptionAddressBasePage",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
      },
      // {
      //   route: "adoption-initiator-details",
      //   component: "AdoptionInitiatorDetails",
      //   texts: {
      //     headerCaption: "",
      //     header: "",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     skipText: "",
      //   },
      //   withoutLabel: true,
      //   key: "AdoptionInitiatorDetails",
      //   nextStep: null,
      //   type: "component",
      //   hideInEmployee: true,
      //   hideInCitizen: false,
      // },
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
        nextStep: "born-outside-parents-details",
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
        nextStep: "born-outside-address",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "born-outside-address",
        component: "BornOutsideAddressPage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BornOutsideAddressBirthDetails",
        nextStep: "born-outside-static-infn",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "born-outside-static-infn",
        component: "BornOutsideStaticInfn",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BornOutsideStaticInfn",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
      },
    ],
  },
  {
    head: "AbandonedBirth Routing",
    body: [
      {
        type: "component",
        route: "abandoned-child-details",
        isMandatory: true,
        component: "AbandonedChildDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "AbandonedChildDetails",
        withoutLabel: true,
        nextStep: "abandoned-birth-informar-details",
        hideInEmployee: false,
      },
      {
        route: "abandoned-birth-informar-details",
        component: "AbandonedBirthInformarDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AbandonedBirthInformarDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
      },
    ],
  },
  {
    head: "Death Routing",
    body: [
      {
        type: "component",
        route: "information-death",
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
        hideInEmployee: true,
        hideInCitizen: false,
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
        hideInCitizen: true,
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
    head: "Abandoned-Death Routing",
    body: [
      {
        type: "component",
        route: "abandoned-information-death",
        component: "InformationDeathAband",
        texts: {
          headerCaption: "",
          // header: "CR_LEGAL_INFORMATION",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "InformationDeathAband",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "family-information",
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
        key: "MarriageDetails",
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
        nextStep: "address-groom",
      },
      {
        type: "component",
        route: "address-groom",
        component: "MarriageAddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "GroomAddressDetails",
        nextStep: "bride-details",
        hideInEmployee: false,
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
        nextStep: "address-bride",
      },
      {
        type: "component",
        route: "address-bride",
        component: "MarriageAddressBasePage",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BrideAddressDetails",
        nextStep: "witness-details",
        hideInEmployee: false,
      },
      // {
      //   type: "component",
      //   route: "witness-details",
      //   isMandatory: true,
      //   component: "Witnessdetails",
      //   texts: {
      //     headerCaption: "",
      //     // header: "CR_LEGAL_INFORMATION",
      //     header: "",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //   },
      //   key: "witnessdetails",
      //   withoutLabel: true,
      //   hideInEmployee: false,
      //   nextStep: "null",
      // },
      {
        route: "witness-details",
        isMandatory: true,
        component: "Witnessdetails",
        texts: {
          headerCaption: "",
          // header: "CR_PLACE_OF_DEATH",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "Witnessdetails",
        nextStep: null,
        type: "component",
        hideInEmployee: false,
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
