import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import Hospital from "./Hospital";
import Institution from "./Institution";
import DeathPlaceHome from "./DeathPlaceHome";
import DeathPlaceVehicle from "./DeathPlaceVehicle";
import DeathPublicPlace from "./DeathPublicPlace";
import DeathOutsideJurisdiction from "./DeathOutsideJurisdiction ";
// import _ from "lodash";
// import { STATE_CODE } from "../../config/constants";

const InformationDeath = ({ config, onSelect, userType, formData, isEditDeath  = false }) => {
 // console.log(formData);
  // console.log(isEditDeath);
  console.log(JSON.stringify(formData));  
  sessionStorage.removeItem("applicationNumber");
  const [isEditDeathPageComponents, setIsEditDeathPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? isEditDeath : false);
  const stateId = Digit.ULBService.getStateId();
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [workFlowCode, setWorkFlowCode] = useState(formData?.InformationDeath?.workFlowCode);
  const [workFlowAmount, setWorkFlowAmount] = useState(formData?.InformationDeath?.workFlowAmount);
  const [isPayment, setIsPayment] = useState(formData?.InformationDeath?.isPayment);

  const { uuid: uuid } = Digit.UserService.getUser().info;
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  // const [cmbAgeUnitFilter, setcmbAgeUnitFilter] = useState();

  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId,"birth-death-service","WorkFlowDeath");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "IdProofDetails");
  const { data: AgeUnitvalue = {}, isAgeUnitLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AgeUnit");
  const { data: Profession = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: State = {}, isStateLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const convertEpochToDate = (dateEpoch) => {
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch); 
      let month = dateFromApi.getMonth() + 1;
      console.log(month);
      let day = dateFromApi.getDate();
      console.log(day);
      let year = dateFromApi.getFullYear()
      console.log(year );;
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
  
  let workFlowData = [];
  let cmbAgeUnit = [];
  let cmbPlace = [];
  let cmbNation = [];
  let cmbReligion = [];
  let cmbOccupationMain = [];
  let menu = [];
  let cmbDocumentType = [];
  let cmbState = [];
  let DeathPlaceTypecode = "";
  let institutionNameCode = "";
  let naturetypecmbvalue = null;
  const maxDate = new Date();
  let Difference_In_DaysRounded = "";
  let cmbfilterNation = [];
  let cmbfilterReligion = [];
  let cmbfilterAgeUnit = [];
  let naturetype = null;
  let cmbfilterNationI = [];
  let cmbFilterState = [];
  let validFlag = true;
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowDeath &&
    WorkFlowDetails["birth-death-service"].WorkFlowDeath.map((ob) => {
      workFlowData.push(ob);
    });
  place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
      cmbPlace.push(ob);
    });
  AgeUnitvalue &&
    AgeUnitvalue["birth-death-service"] &&
    AgeUnitvalue["birth-death-service"].AgeUnit &&
    AgeUnitvalue["birth-death-service"].AgeUnit.map((ob) => {
      cmbAgeUnit.push(ob);
    });
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  religion &&
    religion["common-masters"] &&
    religion["common-masters"].Religion &&
    religion["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbOccupationMain.push(ob);
    });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  documentType &&
    documentType["birth-death-service"] &&
    documentType["birth-death-service"].IdProofDetails &&
    documentType["birth-death-service"].IdProofDetails.map((ob) => {
      cmbDocumentType.push(ob);
    });
  State &&
    State["common-masters"] &&
    State["common-masters"].State &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  const [DateOfDeath, setDateOfDeath] = useState(
    isEditDeath &&
      isEditDeathPageComponents === false &&
      (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeath?.DateOfDeath)
      : formData?.InformationDeath?.DateOfDeath
  );
console.log(convertEpochToDate(formData?.InformationDeath?.DateOfDeath));
  const [FromDate, setFromDate] = useState(
    isEditDeath &&
      isEditDeathPageComponents === false &&
      (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeath?.FromDate)
      : formData?.InformationDeath?.FromDate
  );
  const handleFromTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const [DeathTimeFrom, setDeathTimeFrom] = useState(
    isEditDeathPageComponents === false &&
      (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeath?.DeathTimeFrom)
      : formData?.InformationDeath?.DeathTimeFrom
  );

  const handleToTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const [DeathTimeTo, setDeathTimeTo] = useState(
    isEditDeathPageComponents === false &&
      (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeath?.setDeathTimeTo)
      : formData?.InformationDeath?.setDeathTimeTo
  );

  const [ToDate, setToDate] = useState(
    isEditDeathPageComponents === false &&
      (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeath?.ToDate)
      : formData?.InformationDeath?.ToDate
  );

  // const [DeathTime, setDeathTime] = useState("");
  const [DeathDateUnavailable, setChecked] = useState(
    formData?.InformationDeath?.DeathDateUnavailable
      ? formData?.InformationDeath?.DeathDateUnavailable
      : formData?.InformationDeath?.DeathDateUnavailable
      ? formData?.InformationDeath?.DeathDateUnavailable
      : false
  );
  const [TimeOfDeath, setDeathTime] = useState("");
  const [DeceasedAadharNotAvailable, setDeceasedAadharNotAvailable] = useState(
    formData?.InformationDeath?.DeceasedAadharNotAvailable ? formData?.InformationDeath?.DeceasedAadharNotAvailable : false
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.InformationDeath?.DeceasedAadharNumber ? formData?.InformationDeath?.DeceasedAadharNumber : null);
   
  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const [DeceasedIdproofType, setSelectedDeceasedIdproofType] = useState(
    formData?.InformationDeath?.DeceasedIdproofType ? formData?.InformationDeath?.DeceasedIdproofType : null
  );
  const [DeceasedIdproofNo, setDeceasedIdproofNo] = useState(
    formData?.InformationDeath?.DeceasedIdproofNo ? formData?.InformationDeath?.DeceasedIdproofNo : null
  );

  const handleDropdownChange = () => {
    setIsTextboxEnabled(true);
  };
  const [DeceasedFirstNameEn, setDeceasedFirstNameEn] = useState(
    formData?.InformationDeath?.DeceasedFirstNameEn ? formData?.InformationDeath?.DeceasedFirstNameEn : ""
  );
  const [DeceasedMiddleNameEn, setDeceasedMiddleNameEn] = useState(
    formData?.InformationDeath?.DeceasedMiddleNameEn ? formData?.InformationDeath?.DeceasedMiddleNameEn : ""
  );
  const [DeceasedLastNameEn, setDeceasedLastNameEn] = useState(
    formData?.InformationDeath?.DeceasedLastNameEn ? formData?.InformationDeath?.DeceasedLastNameEn : ""
  );
  const [DeceasedFirstNameMl, setDeceasedFirstNameMl] = useState(
    formData?.InformationDeath?.DeceasedFirstNameMl ? formData?.InformationDeath?.DeceasedFirstNameMl : ""
  );
  const [DeceasedMiddleNameMl, setDeceasedMiddleNameMl] = useState(
    formData?.InformationDeath?.DeceasedMiddleNameMl ? formData?.InformationDeath?.DeceasedMiddleNameMl : ""
  );
  const [DeceasedLastNameMl, setDeceasedLastNameMl] = useState(
    formData?.InformationDeath?.DeceasedLastNameMl ? formData?.InformationDeath?.DeceasedLastNameMl : ""
  );
  const [Age, setAge] = useState(formData?.InformationDeath?.Age ? formData?.InformationDeath?.Age : "");

  // useEffect(()=>{
  //   getAgeUnitOptions
  // },[Age])

  const getAgeUnitOptions = () => {
    if (Age <= 11) {
      return cmbAgeUnit;
    } else if (Age > 11 && Age <= 23) {
      return cmbAgeUnit.filter(
        (cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS" || cmbAgeUnit.code === "AGE_UNIT_DAYS" || cmbAgeUnit.code === "AGE_UNIT_HOURS"
      );
    } else if (Age > 23 && Age <= 29) {
      return cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS" || cmbAgeUnit.code === "AGE_UNIT_DAYS");
    } else if (Age > 29 && Age <= 120) {
      return cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS");
    }
  };

  const [Nationality, setSelectedNationality] = useState(
    formData?.InformationDeath?.Nationality?.code
      ? formData?.InformationDeath?.Nationality
      : formData?.InformationDeath?.Nationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
      : ""
  );
  const [Religion, setSelectedReligion] = useState(
    formData?.InformationDeath?.Religion?.code
      ? formData?.InformationDeath?.Religion
      : formData?.InformationDeath?.Religion
      ? cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.InformationDeath?.Religion)[0]
      : ""
    // formData?.InformationDeath?.Religion?.code
    //   ? formData?.InformationDeath?.Religion
    //   : formData?.InformationDeath?.Religion
    //   ? cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.InformationDeath?.Religion)[0]
    //   : ""
  );
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.InformationDeath?.DifferenceInTime);
  const [DifferenceInDaysRounded, setDifferenceInDaysRounded] = useState();

  const [CommencementDate, setCommencementDate] = useState(
    formData?.InformationDeath?.CommencementDate ? formData?.InformationDeath?.CommencementDate : ""
  );

  const [AgeUnit, setSelectedAgeUnit] = useState(
    formData?.InformationDeath?.AgeUnit?.code
      ? formData?.InformationDeath?.AgeUnit
      : formData?.InformationDeath?.AgeUnit
      ? cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.AgeUnit)[0]
      : ""
  );

  const [DeceasedGender, setselectedDeceasedGender] = useState(
    formData?.InformationDeath?.DeceasedGender?.code
      ? formData?.InformationDeath?.DeceasedGender
      : formData?.InformationDeath?.DeceasedGender
      ? menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]
      : ""
  );
  const [Occupation, setSelectedOccupation] = useState(
    formData?.InformationDeath?.Occupation?.code
      ? formData?.InformationDeath?.Occupation
      : formData?.InformationDeath?.Occupation
      ? cmbOccupationMain.filter((cmbOccupationMain) => cmbOccupationMain.code === formData?.InformationDeath?.Occupation)[0]
      : ""
  );
  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.InformationDeath?.DeathPlace?.code
      ? formData?.InformationDeath?.DeathPlace
      : formData?.InformationDeath?.DeathPlace
      ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]
      : ""
  );

  // const [DeathPlace, setselectDeathPlace] = useState(cmbPlace?(cmbPlace.filter(cmbPlace=>cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]) :formData?.InformationDeath?.DeathPlace) ;
  //Hospital, Intitution, vehicle, Public Place {DeathPlaceType}
  const [DeathPlaceType, selectDeathPlaceType] = useState(
    formData?.InformationDeath?.DeathPlaceType?.code
      ? formData?.InformationDeath?.DeathPlaceType
      : formData?.InformationDeath?.DeathPlaceType
      ? ""
      : ""
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(
    formData?.InformationDeathails?.HospitalNameMl?.code
      ? formData?.InformationDeath?.HospitalNameMl
      : formData?.InformationDeath?.HospitalNameMl
      ? ""
      : ""
  );
   const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.InformationDeath?.DeathPlaceInstId ? formData?.InformationDeath?.DeathPlaceInstId : null
  );
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.InformationDeath?.DeathPlaceInstId);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  // Home
  const [DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId] = useState(
    formData?.InformationDeath?.DeathPlaceHomePostofficeId ? formData?.InformationDeath?.DeathPlaceHomePostofficeId : null
  );
  const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(
    formData?.InformationDeath?.DeathPlaceHomepincode ? formData?.InformationDeath?.DeathPlaceHomepincode : null
  );

  const [DeathPlaceHomeHoueNameEn, setDeathPlaceHomehoueNameEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeHoueNameEn ? formData?.InformationDeath?.DeathPlaceHomeHoueNameEn : null
  );
  const [DeathPlaceHomeLocalityEn, setDeathPlaceHomelocalityEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeLocalityEn ? formData?.InformationDeath?.DeathPlaceHomeLocalityEn : null
  );
  const [DeathPlaceHomeLocalityMl, setDeathPlaceHomelocalityMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeLocalityMl ? formData?.InformationDeath?.DeathPlaceHomeLocalityMl : null
  );
  const [DeathPlaceHomeStreetNameEn, setDeathPlaceHomestreetNameEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeStreetNameEn ? formData?.InformationDeath?.DeathPlaceHomeStreetNameEn : null
  );
  const [DeathPlaceHomeStreetNameMl, setDeathPlaceHomestreetNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeStreetNameMl ? formData?.InformationDeath?.DeathPlaceHomeStreetNameMl : null
  );
  const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomehoueNameMl ? formData?.InformationDeath?.DeathPlaceHomehoueNameMl : null
  );
  //Vehicle home OutsideJurisdiction{DeathPlaceWardId} Publicplace OutsideJurisdiction {GeneralRemarks} Publicplace {DeathPlaceWardId}
  //
  const [VehicleNumber, setVehicleNumber] = useState(formData?.InformationDeath?.VehicleNumber);
  const [VehicleFromplaceEn, setVehicleFromplaceEn] = useState(formData?.InformationDeath?.VehicleFromplaceEn);
  const [VehicleToPlaceEn, setVehicleToPlaceEn] = useState(formData?.InformationDeath?.VehicleToPlaceEn);
  const [VehicleFromplaceMl, setVehicleFromplaceMl] = useState(formData?.InformationDeath?.VehicleFromplaceMl);
  const [VehicleToPlaceMl, setVehicleToPlaceMl] = useState(formData?.InformationDeath?.VehicleToPlaceMl);
  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.InformationDeath?.GeneralRemarks);
  const [VehicleFirstHaltEn, setVehicleFirstHaltEn] = useState(formData?.InformationDeath?.VehicleFirstHaltEn);
  const [VehicleFirstHaltMl, setVehicleFirstHaltMl] = useState(formData?.InformationDeath?.VehicleFirstHaltMl);
  const [VehicleHospitalEn, setSelectedVehicleHospitalEn] = useState(formData?.InformationDeath?.VehicleHospitalEn);
  const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData?.InformationDeath?.DeathPlaceWardId);
  //Public Place

  const [DeathPlaceLocalityEn, setDeathPlaceLocalityEn] = useState(
    formData?.InformationDeath?.DeathPlaceLocalityEn ? formData?.InformationDeath?.DeathPlaceLocalityEn : ""
  );
  const [DeathPlaceLocalityMl, setDeathPlaceLocalityMl] = useState(
    formData?.InformationDeath?.DeathPlaceLocalityMl ? formData?.InformationDeath?.DeathPlaceLocalityMl : ""
  );
  const [DeathPlaceStreetEn, setDeathPlaceStreetEn] = useState(
    formData?.InformationDeath?.DeathPlaceStreetEn ? formData?.InformationDeath?.DeathPlaceStreetEn : ""
  );
  const [DeathPlaceStreetMl, setDeathPlaceStreetMl] = useState(
    formData?.InformationDeath?.DeathPlaceStreetMl ? formData?.InformationDeath?.DeathPlaceStreetMl : ""
  );

  //DeathOutsideJurisdiction
  const [DeathPlaceCountry, setSelectDeathPlaceCountry] = useState(formData?.InformationDeath?.DeathPlaceCountry);
  const [DeathPlaceState, SelectDeathPlaceState] = useState(formData?.InformationDeath?.DeathPlaceState);
  const [DeathPlaceDistrict, SelectDeathPlaceDistrict] = useState(formData?.InformationDeath?.DeathPlaceDistrict);
  const [DeathPlaceCity, SelectDeathPlaceCity] = useState(formData?.InformationDeath?.DeathPlaceCity);
  const [DeathPlaceRemarksEn, SelectDeathPlaceRemarksEn] = useState(formData?.InformationDeath?.DeathPlaceRemarksEn);
  const [DeathPlaceRemarksMl, SelectDeathPlaceRemarksMl] = useState(formData?.InformationDeath?.DeathPlaceRemarksMl);
  const [PlaceOfBurialEn, SelectPlaceOfBurialEn] = useState(formData?.InformationDeath?.PlaceOfBurialEn);
  const [PlaceOfBurialMl, SelectPlaceOfBurialMl] = useState(formData?.InformationDeath?.PlaceOfBurialMl);

  const [toast, setToast] = useState(false);
  const [value, setValue] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);

  const [sexError, setsexError] = useState(formData?.InformationDeath?.sexError ? false : false);
  const [DOBError, setDOBError] = useState(formData?.InformationDeath?.ChildDOB ? false : false);
  const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);
  const [DeceasedFirstNameEnError, setDeceasedFirstNameEnError] = useState(formData?.InformationDeath?.DeceasedFirstNameEn ? false : false);
  const [DeceasedFirstNameMlError, setDeceasedFirstNameMlError] = useState(formData?.InformationDeath?.DeceasedFirstNameMl ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.InformationDeath?.DeathPlaceType ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.InformationDeath?.DeathPlaceType ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.InformationDeath?.DeathPlaceInstId ? false : false);
  const [AgeError, setAgeError] = useState(formData?.InformationDeath?.Age ? false : false);
  const [WardNameError, setWardNameError] = useState(formData?.InformationDeath?.DeathPlaceWardId ? false : false);

  const [DeathPlaceHomelocalityEnError, setDeathPlaceHomelocalityEnError] = useState(formData?.InformationDeath?.DeathPlaceHomeLocalityEn ? false : false);
  const [DeathPlaceHomehoueNameEnError, setDeathPlaceHomehoueNameEnError] = useState(formData?.InformationDeath?.DeathPlaceHomehoueNameEn ? false : false);
  const [DeathPlaceHomeStreetNameEnError, setDeathPlaceHomeStreetNameEnError] = useState(formData?.InformationDeath?.DeathPlaceHomestreetNameEn ? false : false);
  const [DeathPlaceHomelocalityMlError, setDeathPlaceHomelocalityMlError] = useState(formData?.InformationDeath?.DeathPlaceHomelocalityMl ? false : false);
  const [DeathPlaceHomestreetNameMlError, setDeathPlaceHomestreetNameMlError] = useState(formData?.InformationDeath?.DeathPlaceHomestreetNameMl ? false : false);
  const [DeathPlaceHomehoueNameMlError, setDeathPlaceHomehoueNameMlError] = useState(formData?.InformationDeath?.DeathPlaceHomehoueNameMl ? false : false);
  const [VehicleFromplaceEnError, setVehicleFromplaceEnError] = useState(formData?.InformationDeath?.VehicleFromplaceEn ? false : false);
  const [VehicleToPlaceEnError, setVehicleToPlaceEnError] = useState(formData?.InformationDeath?.setVehicleToPlaceEn ? false : false);
  const [VehicleNumberError, setvVehicleNumberError] = useState(formData?.InformationDeath?.VehicleNumber ? false : false);
  const [DeathPlaceTypeError, setDeathPlaceTypeError] = useState(formData?.InformationDeath?.DeathPlaceType ? false : false);
  const [VehicleFirstHaltEnError, setvehicleHaltPlaceError] = useState(formData?.InformationDeath?.VehicleFirstHaltEn ? false : false);
  const [GeneralRemarksError, setGeneralRemarksError] = useState(formData?.InformationDeath?.GeneralRemarks ? false : false);
  const [VehicleHospitalEnError, setVehicleHospitalEnError] = useState(formData?.InformationDeath?.VehicleHospitalEn ? false : false);
  const [DeathPlaceLocalityEnError, setDeathPlaceLocalityEnError] = useState(formData?.InformationDeath?.DeathPlaceLocalityEn ? false : false);
  const [DeathPlaceLocalityMlError, setDeathPlaceLocalityMlError] = useState(formData?.InformationDeath?.DeathPlaceLocalityMl ? false : false);
  
  const onSkip = () => onSelect();
  useEffect(() => {
    if (isInitialRender) {
      if (Nationality == null || Nationality == "") {
        if (stateId === "kl" && cmbNation.length > 0) {
          cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
          setSelectedNationality(cmbfilterNation[0]);
        }
      }

      // if (Religion == null || Religion == "") {
      //   if (stateId === "kl" && cmbReligion.length > 0) {
      //     cmbfilterReligion = cmbReligion.filter((cmbReligion) => cmbReligion.name.includes("No Religion"));
      //     setSelectedReligion(cmbfilterReligion[0]);
      //   }
      // }

      // }

      if (DeathPlaceCountry == null || DeathPlaceCountry == "") {
        if (stateId === "kl" && cmbNation.length > 0) {
          cmbfilterNationI = cmbNation.filter((cmbNation) => cmbNation.name.includes("India"));
          setSelectDeathPlaceCountry(cmbfilterNationI[0]);
        }
      }
      if (DeathPlaceState == null || DeathPlaceState == "") {
        if (stateId === "kl" && cmbState.length > 0) {
          cmbFilterState = cmbState.filter((cmbState) => cmbState.name != "Kerala");
          SelectDeathPlaceState(cmbFilterState);
        }
      }
    }
  }, [Nation, isInitialRender]);

  // cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
  // setAdrsStateName(cmbFilterState[0]);

  // if (isInitialRender) {
  //   if (formData?.InformationDeath?.ischeckedAdhar  != null) {
  //     setIsInitialRender(false);
  //     setisCheckedAdhar(formData?.InformationDeath?.ischeckedAdhar );
  //   }
  // }
  React.useEffect(() => {
    if (isInitialRenderDeathPlace) {
      if (DeathPlace) {
        setIsInitialRender(false);
        naturetype = DeathPlace.code;
        setValue(naturetype);
        if (naturetype === "HOSPITAL") {
          <Hospital DeathPlaceType={DeathPlaceType} 
          HospitalNameMl={HospitalNameMl} />;
        }
        if (naturetype === "INSTITUTION") {
          <Institution
            DeathPlaceType={DeathPlaceType}
            DeathPlaceInstId={DeathPlaceInstId}
            InstitutionIdMl={InstitutionIdMl}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (naturetype === "HOME") {
          <DeathPlaceHome
            DeathPlaceWardId={DeathPlaceWardId}
            DeathPlaceType={DeathPlaceType}
            DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
            DeathPlaceHomepincode={DeathPlaceHomepincode}
            DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
            DeathPlaceHomehoueNameMl={DeathPlaceHomehoueNameMl}
            DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
            DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
            DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
            DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
            PostOfficevalues={PostOfficevalues}
          />;
        }
        if (naturetype === "VEHICLE") {
          <DeathPlaceVehicle
            DeathPlaceType={DeathPlaceType}
            VehicleNumber={VehicleNumber}
            VehicleFromplaceEn={VehicleFromplaceEn}
            VehicleToPlaceEn={VehicleToPlaceEn}
            GeneralRemarks={GeneralRemarks}
            VehicleFirstHaltEn={VehicleFirstHaltEn}
            VehicleFirstHaltMl={VehicleFirstHaltMl}
            VehicleHospitalEn={VehicleHospitalEn}
            DeathPlaceWardId={DeathPlaceWardId}
            VehicleFromplaceMl={VehicleFromplaceMl}
            VehicleToPlaceMl={VehicleToPlaceMl}
          />;
        }
        if (naturetype === "PUBLIC_PLACES") {
          <DeathPublicPlace
            DeathPlaceType={DeathPlaceType}
            DeathPlaceLocalityEn={DeathPlaceLocalityEn}
            DeathPlaceLocalityMl={DeathPlaceLocalityMl}
            DeathPlaceStreetEn={DeathPlaceStreetEn}
            DeathPlaceStreetMl={DeathPlaceStreetMl}
            DeathPlaceWardId={DeathPlaceWardId}
            GeneralRemarks={GeneralRemarks}
          />;
        }
        if (naturetype === "OUTSIDE_JURISDICTION") {
          <DeathOutsideJurisdiction
            DeathPlaceCountry={DeathPlaceCountry}
            DeathPlaceState={DeathPlaceState}
            DeathPlaceDistrict={DeathPlaceDistrict}
            DeathPlaceCity={DeathPlaceCity}
            DeathPlaceRemarksEn={DeathPlaceRemarksEn}
            DeathPlaceRemarksMl={DeathPlaceRemarksMl}
            PlaceOfBurialMl={PlaceOfBurialMl}
            PlaceOfBurialEn={PlaceOfBurialEn}
            GeneralRemarks={GeneralRemarks}
            DeathPlaceWardId={DeathPlaceWardId}
          />;
        }
      }
    }
  }, [isInitialRenderDeathPlace]);
  function setCheckedDate(e) {
    if (e.target.checked === true) {
      setChecked(e.target.checked);
      setFromDate("");
      setToDate("");
    } else {
      setChecked(e.target.checked);
      setDateOfDeath("");
      setDeathTime("");
    }
  }
  // function setChecked(e) {
  //   if (e.target.checked === true) {
  //     checked(e.target.checked);
  //     setFromDate("");
  //     setToDate("");
  //   } else {
  //     setDateOfDeath("");
  //   }
  // }
  function selectFromDate(value) {
    setFromDate(value);
    const today = new Date();
    const deathDate = new Date(value);
    if (deathDate.getTime() <= today.getTime()) {
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = Math.floor(Difference_In_Days);
    }
    // else {
    //   setFromDate(null);
    //   setDOBError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 3000);
    // }
  }
  function selectToDate(value) {
    setToDate(value);

    const today = new Date();
    const toDate = new Date(value);
    const fromDate = new Date(DateOfDeath);

    if (toDate.getTime() <= today.getTime()) {
      if (fromDate && toDate.getTime() < fromDate.getTime()) {
        setToDate(null);
        setDOBError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      } else {
        let Difference_In_Time = today.getTime() - toDate.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      }
    } else {
      setToDate(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }

  // function selectToDate(value) {
  //   setToDate(value);
  //   const today = new Date();
  //   const deathDate = new Date(value);
  //   if (deathDate.getTime() <= today.getTime()) {
  //     let Difference_In_Time = today.getTime() - deathDate.getTime();
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     Difference_In_DaysRounded = Math.floor(Difference_In_Days);
  //   } else {
  //     setToDate(null);
  //     setDOBError(true);
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 3000);
  //   }

  // }
  function selectDeathDate(value) {
    setDateOfDeath(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deathDate = new Date(value);
    deathDate.setHours(0, 0, 0, 0);

    if (deathDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      // console.log("Difference_In_Time" + Difference_In_Time);
      setDifferenceInTime(today.getTime() - deathDate.getTime());
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      if (DeathPlace) {
        let currentWorgFlow = workFlowData.filter(
          (workFlowData) =>
            workFlowData.BirtPlace === DeathPlace.code &&
            workFlowData.startdateperiod <= DifferenceInTime &&
            workFlowData.enddateperiod >= DifferenceInTime

        );
        // console.log("currentWorgFlowDOB" + currentWorgFlow);
        if (currentWorgFlow.length > 0) {
          // console.log(currentWorgFlow[0].WorkflowCode);
          setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
          setIsPayment(currentWorgFlow[0].payment);
          setWorkFlowAmount(currentWorgFlow[0].amount);

        }
      }
    }
  }
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  function setCheckSpecialCharSpace(e) {
    let pattern = /^[a-zA-Z-.`' ]*$/;
    if (!(e.key.match(pattern)) && e.code === 'Space') {
      e.preventDefault();
    }
  }
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function selectReligion(value) {
    setSelectedReligion(value);
  }
  function selectNationality(value) {
    setSelectedNationality(value);
  }
  function selectDeceasedGender(value) {
    setselectedDeceasedGender(value);
  }
  function setSelectDeceasedLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedLastNameMl("");
    } else {
      setDeceasedLastNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedMiddleNameMl("");
    } else {
      setDeceasedMiddleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedFirstNameMl("");
    } else {
      setDeceasedFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

 
  function setSelectDeceasedFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setDeceasedFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setDeceasedMiddleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setDeceasedLastNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  // function setSelectAge(e) {
  //   getAgeUnitOptions(e.target.value);
  // }
  // function setSelectDeceasedAadharNumber(e) {
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       setAadharError(true);
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setAadharError(true);
  //       setDeceasedAadharNumber(e.target.value);
  //       return false;
  //     } else {
  //       setAadharError(false);
  //       setDeceasedAadharNumber(e.target.value);
  //       return true;
  //     }
  //   } else {
  //     setAadharError(false);
  //     setDeceasedAadharNumber(e.target.value);
  //     return true;
  //   }
  // }

  function setSelectDeceasedAadharNumber(e) {
    if (e.target.value.trim().length >= 0) {
      setDeceasedAadharNumber(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectDeceasedIdproofNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ]*$") != null) {
      setDeceasedIdproofNo(e.target.value.length <= 16 ? e.target.value : e.target.value.substring(0, 16));
    }
  }
  function selectOccupation(value) {
    setSelectedOccupation(value);
  }
 


  // function selectDateOfDeath(value) {
  //   setDateOfDeath(value);
  //   const today = new Date();
  //   const deathDate = new Date(value);
  //   if (deathDate.getTime() <= today.getTime()) {
  //     let Difference_In_Time = today.getTime() - deathDate.getTime();
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     Difference_In_DaysRounded = Math.floor(Difference_In_Days);
  //   } else {
  //     setDateOfDeath(null);
  //     setDOBError(true);
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 3000);
  //   }
  // }
  function selectDeathPlace(value) {
    setselectDeathPlace(value);
    setValue(value.code);
    let currentWorgFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.BirtPlace === value.code && workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime
    );
    // console.log(currentWorgFlow);
    if (currentWorgFlow.length > 0) {
      // console.log(currentWorgFlow[0].WorkflowCode);
      setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      setIsPayment(currentWorgFlow[0].payment);
      setWorkFlowAmount(currentWorgFlow[0].amount);
    }
    // if (value.code === "HOSPITAL") {
    //   //Institution
    //   setSelectedDeathPlaceInstId(null);
    //   setInstitutionIdMl(null);
    //   setInstitutionFilterList(null);
    //   // setIsInitialRenderInstitutionList
    //   //Home
    //   setDeathPlaceHomepostofficeId(null);
    //   setDeathPlaceHomepincode(null);
    //   setDeathPlaceHomehoueNameEn(null);
    //   setDeathPlaceHomehoueNameMl(null);
    //   setDeathPlaceHomelocalityEn(null);
    //   setDeathPlaceHomelocalityMl(null);
    //   setDeathPlaceHomestreetNameEn(null);
    //   setDeathPlaceHomestreetNameMl(null);
    //   setDeathPlaceWardId(null);
    //   setPostOfficevalues(null);
    //   //Vehicle
    //   setVehicleNumber(null);
    //   setVehicleFromplaceEn(null);
    //   setVehicleToPlaceEn(null);
    //   setGeneralRemarks(null);
    //   setVehicleFirstHaltEn(null);
    //   setVehicleFirstHaltMl(null);
    //   setSelectedVehicleHospitalEn(null);
    //   setVehicleFromplaceMl(null);
    //   setVehicleToPlaceMl(null);
    //   //PublicPlace
    //   setDeathPlaceLocalityEn(null);
    //   setDeathPlaceLocalityMl(null);
    //   setDeathPlaceStreetEn(null);
    //   setDeathPlaceStreetMl(null);
    //   //DeathOutsideJurisdiction
    //   setSelectDeathPlaceCountry(null);
    //   SelectDeathPlaceState(null);
    //   SelectDeathPlaceDistrict(null);
    //   SelectDeathPlaceCity(null);
    //   SelectDeathPlaceRemarksEn(null);
    //   SelectDeathPlaceRemarksMl(null);
    //   SelectPlaceOfBurialEn(null);
    //   SelectPlaceOfBurialMl(null);
    // } else if (value.code === "INSTITUTION") {
    //   //Hospital
    //   selectHospitalNameMl(null);
    //   //Home
    //   setDeathPlaceHomepostofficeId(null);
    //   setDeathPlaceHomepincode(null);
    //   setDeathPlaceHomehoueNameEn(null);
    //   setDeathPlaceHomehoueNameMl(null);
    //   setDeathPlaceHomelocalityEn(null);
    //   setDeathPlaceHomelocalityMl(null);
    //   setDeathPlaceHomestreetNameEn(null);
    //   setDeathPlaceHomestreetNameMl(null);
    //   setDeathPlaceWardId(null);
    //   setPostOfficevalues(null);
    //   //Vehicle
    //   selectDeathPlaceType(null);
    //   setVehicleNumber(null);
    //   setVehicleFromplaceEn(null);
    //   setVehicleToPlaceEn(null);
    //   setGeneralRemarks(null);
    //   setVehicleFirstHaltEn(null);
    //   setVehicleFirstHaltMl(null);
    //   setSelectedVehicleHospitalEn(null);
    //   setVehicleFromplaceMl(null);
    //   setVehicleToPlaceMl(null);
    //   //PublicPlace
    //   setDeathPlaceLocalityEn(null);
    //   setDeathPlaceLocalityMl(null);
    //   setDeathPlaceStreetEn(null);
    //   setDeathPlaceStreetMl(null);
    //   //DeathOutsideJurisdiction
    //   setSelectDeathPlaceCountry(null);
    //   SelectDeathPlaceState(null);
    //   SelectDeathPlaceDistrict(null);
    //   SelectDeathPlaceCity(null);
    //   SelectDeathPlaceRemarksEn(null);
    //   SelectDeathPlaceRemarksMl(null);
    //   SelectPlaceOfBurialEn(null);
    //   SelectPlaceOfBurialMl(null);
    // } else if (value.code === "VEHICLE") {
    //   //Hospital
    //   // selectDeathPlaceType(null);
    //   selectHospitalNameMl(null);
    //   //Institution
    //   selectDeathPlaceType(null);
    //   setSelectedDeathPlaceInstId(null);
    //   setInstitutionIdMl(null);
    //   setInstitutionFilterList(null);
    //   //Home
    //   setDeathPlaceHomepostofficeId(null);
    //   setDeathPlaceHomepincode(null);
    //   setDeathPlaceHomehoueNameEn(null);
    //   setDeathPlaceHomehoueNameMl(null);
    //   setDeathPlaceHomelocalityEn(null);
    //   setDeathPlaceHomelocalityMl(null);
    //   setDeathPlaceHomestreetNameEn(null);
    //   setDeathPlaceHomestreetNameMl(null);
    //   setDeathPlaceWardId(null);
    //   setPostOfficevalues(null);
    //   //PublicPlace
    //   setDeathPlaceLocalityEn(null);
    //   setDeathPlaceLocalityMl(null);
    //   setDeathPlaceStreetEn(null);
    //   setDeathPlaceStreetMl(null);
    //   setGeneralRemarks(null);
    //   //DeathOutsideJurisdiction
    //   setSelectDeathPlaceCountry(null);
    //   SelectDeathPlaceState(null);
    //   SelectDeathPlaceDistrict(null);
    //   SelectDeathPlaceCity(null);
    //   SelectDeathPlaceRemarksEn(null);
    //   SelectDeathPlaceRemarksMl(null);
    //   SelectPlaceOfBurialEn(null);
    //   SelectPlaceOfBurialMl(null);
    // }
    // if (value.code === "PUBLIC_PLACES") {
    //   //Hospital
    //   selectDeathPlaceType(null);
    //   selectHospitalNameMl(null);
    //   //Institution
    //   setSelectedDeathPlaceInstId(null);
    //   setInstitutionIdMl(null);
    //   setInstitutionFilterList(null);
    //   // setIsInitialRenderInstitutionList
    //   //Home
    //   setDeathPlaceHomepostofficeId(null);
    //   setDeathPlaceHomepincode(null);
    //   setDeathPlaceHomehoueNameEn(null);
    //   setDeathPlaceHomehoueNameMl(null);
    //   setDeathPlaceHomelocalityEn(null);
    //   setDeathPlaceHomelocalityMl(null);
    //   setDeathPlaceHomestreetNameEn(null);
    //   setDeathPlaceHomestreetNameMl(null);
    //   setPostOfficevalues(null);
    //   //Vehicle
    //   setVehicleNumber(null);
    //   setVehicleFromplaceEn(null);
    //   setVehicleToPlaceEn(null);
    //   setVehicleFirstHaltEn(null);
    //   setVehicleFirstHaltMl(null);
    //   setSelectedVehicleHospitalEn(null);
    //   setVehicleFromplaceMl(null);
    //   setVehicleToPlaceMl(null);
    //   setDeathPlaceWardId(null);
    //   //DeathOutsideJurisdiction
    //   setSelectDeathPlaceCountry(null);
    //   SelectDeathPlaceState(null);
    //   SelectDeathPlaceDistrict(null);
    //   SelectDeathPlaceCity(null);
    //   SelectDeathPlaceRemarksEn(null);
    //   SelectDeathPlaceRemarksMl(null);
    //   SelectPlaceOfBurialEn(null);
    //   SelectPlaceOfBurialMl(null);
    //   setGeneralRemarks(null);
    // }
    // if (value.code === "OUTSIDE_JURISDICTION") {
    //   //Hospital
    //   // selectDeathPlaceType(null);
    //   selectHospitalNameMl(null);
    //   //Institution
    //   setSelectedDeathPlaceInstId(null);
    //   setInstitutionIdMl(null);
    //   setInstitutionFilterList(null);
    //   // setIsInitialRenderInstitutionList
    //   //Home
    //   setDeathPlaceHomepostofficeId(null);
    //   setDeathPlaceHomepincode(null);
    //   setDeathPlaceHomehoueNameEn(null);
    //   setDeathPlaceHomehoueNameMl(null);
    //   setDeathPlaceHomelocalityEn(null);
    //   setDeathPlaceHomelocalityMl(null);
    //   setDeathPlaceHomestreetNameEn(null);
    //   setDeathPlaceHomestreetNameMl(null);
    //   setPostOfficevalues(null);
    //   //Vehicle
    //   setVehicleNumber(null);
    //   setVehicleFromplaceEn(null);
    //   setVehicleToPlaceEn(null);
    //   setVehicleFirstHaltEn(null);
    //   setVehicleFirstHaltMl(null);
    //   setSelectedVehicleHospitalEn(null);
    //   setVehicleFromplaceMl(null);
    //   setVehicleToPlaceMl(null);
    //   //PublicPlace
    //   setDeathPlaceLocalityEn(null);
    //   setDeathPlaceLocalityMl(null);
    //   setDeathPlaceStreetEn(null);
    //   setDeathPlaceStreetMl(null);
    //   setGeneralRemarks(null);
    //   setDeathPlaceWardId(null);
    // }
  }
  // function setSelectAge(e) {
  //   setAge(e.target.value);
  //   getAgeUnitOptions(e.target.value);
  // }
  function setSelectAge(e) {
    if (e.target.value.trim().length >= 0) {
      setAge(e.target.value.length <= 3 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 3));
      // getAgeUnitOptions(e.target.value);
    }
  }
  function selectAgeUnit(value) {
    setSelectedAgeUnit(value);
  }
  function selectDeceasedIdproofType(value) {
    setSelectedDeceasedIdproofType(value);
    setIsTextboxEnabled(true);
  }
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      // console.log(value);
      let hour = value;
      let period = hour > 12 ? "PM" : "AM";
      // console.log(period);
      setDeathTime(value);
    }
  };

  function setCheckedAdhar(e) {
    if (e.target.checked === true) {
      setDeceasedAadharNotAvailable(e.target.checked);
      setSelectedDeceasedIdproofType("");
      setDeceasedIdproofNo("");
    } else {
      // setDeceasedAadharNotAvailable(e.target.checked);
      setDeceasedAadharNotAvailable(e.target.checked);
      setDeceasedAadharNumber("");
      setAadharError(false);
      setToast(false);
    }
  }
  // const isTextBoxValid = () => {

  //   // } else if (Age > 23 && Age <= 29) {
  //   //   return value ===  ["Years", "Days"].includes(AgeUnit);
  //   // } else if (Age > 29 && Age <= 120) {
  //   //   return value ===  ["Years"].includes(AgeUnit);
  //   // } else {
  //   //   return false;
  //   // }
  // };
  const goNext = () => {
    if (DeceasedGender == null || DeceasedGender == "" || DeceasedGender == undefined) {
      validFlag = false;
      setsexError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setsexError(false);
    }

    if(DeceasedAadharNumber.trim() == null || DeceasedAadharNumber.trim() == '' || DeceasedAadharNumber.trim() == undefined){
      setDeceasedAadharNumber("");
    } else if (DeceasedAadharNumber != null && DeceasedAadharNumber != "") {
      let adharLength = DeceasedAadharNumber;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAadharError(false);
      }
    }
    if (DeceasedFirstNameEn.trim() == null || DeceasedFirstNameEn.trim() == '' || DeceasedFirstNameEn.trim() == undefined) {
      validFlag = false;
      setDeceasedFirstNameEn("");
      setDeceasedFirstNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeceasedFirstNameEnError(false);
    }
    if (DeceasedFirstNameMl.trim() == null || DeceasedFirstNameMl.trim() == '' || DeceasedFirstNameMl.trim() == undefined) {
      validFlag = false;
      setDeceasedFirstNameMl("");
      setDeceasedFirstNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeceasedFirstNameMlError(false);
    }


    // if (DeceasedAadharNumber != null || DeceasedAadharNumber != "" || DeceasedAadharNumber != undefined || DeceasedAadharNotAvailable === false) {
    //   let adharLength = DeceasedAadharNumber;
    //   if (adharLength.length < 12 || adharLength.length > 12 ) {
    //     validFlag = false;
    //     setAadharError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setAadharError(false);
    //   }
    // }
    if (Age == null || Age == "" || Age == undefined) {
      validFlag = false;
      setAgeError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAgeError(false);
    }
    // if (DeathPlaceWardId == null || DeathPlaceWardId == "" || DeathPlaceWardId == undefined) {
    //   validFlag = false;
    //   setWardNameError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setWardNameError(false);
    // }

    if (DeathPlace.code == "HOSPITAL") {
      if (DeathPlaceType == null || HospitalNameMl === null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        DeathPlaceTypecode = DeathPlaceType.code;
        setHospitalError(false);
      }   

    
      
    } else if (DeathPlace.code === "INSTITUTION") {
      if (DeathPlaceType == null) {
        setInstitutionError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        DeathPlaceTypecode = DeathPlaceType.code;
        setInstitutionError(false);
        if (DeathPlaceInstId === null) {
          setInstitutionNameError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          institutionNameCode = DeathPlaceInstId.code;
          setInstitutionNameError(false);
        }
      }
    }
    else if (DeathPlace.code === "HOME") {
      if (DeathPlaceHomeLocalityEn.trim() == null || DeathPlaceHomeLocalityEn.trim() == '' || DeathPlaceHomeLocalityEn.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomelocalityEn("");
        setDeathPlaceHomelocalityEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomelocalityEnError(false);
      }
      // if (DeathPlaceHomeStreetNameEn.trim() == null || DeathPlaceHomeStreetNameEn.trim() == '' || DeathPlaceHomeStreetNameEn.trim() == undefined) {
      //   validFlag = false;
      //   setDeathPlaceHomestreetNameEn("");
      //   setDeathPlaceHomeStreetNameEnError(true);
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setDeathPlaceHomeStreetNameEnError(false);
      // }
   
      if (DeathPlaceHomeHoueNameEn.trim() == null || DeathPlaceHomeHoueNameEn.trim() == '' || DeathPlaceHomeHoueNameEn.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomehoueNameEn("");
        setDeathPlaceHomehoueNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomehoueNameEnError(false);
      }
      if (DeathPlaceHomeLocalityMl.trim() == null || DeathPlaceHomeLocalityMl.trim() == '' || DeathPlaceHomeLocalityMl.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomelocalityMl("");
        setDeathPlaceHomelocalityMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomelocalityMlError(false);
      }
     
     if (DeathPlaceHomehoueNameMl.trim() == null || DeathPlaceHomehoueNameMl.trim() == '' || DeathPlaceHomehoueNameMl.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomehoueNameMl("");
        setDeathPlaceHomehoueNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomehoueNameMlError(false);
      }
  }
  else if (DeathPlace.code === "VEHICLE") {   

    if (DeathPlaceType == null || DeathPlaceType == "" || DeathPlaceType == undefined) {
      validFlag = false;
      setDeathPlaceTypeError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeathPlaceTypeError(false);
    }
    if (VehicleNumber == null || VehicleNumber == "" || VehicleNumber == undefined) {
      validFlag = false;
      setvVehicleNumberError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setvVehicleNumberError(false);
    }
    if (GeneralRemarks == null || GeneralRemarks == "" || GeneralRemarks == undefined) {
      validFlag = false;
      setGeneralRemarksError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setGeneralRemarksError(false);
    }
    if (VehicleHospitalEn == null || VehicleHospitalEn == "" || VehicleHospitalEn == undefined) {
      validFlag = false;
      setVehicleHospitalEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setVehicleHospitalEnError(false);
    }
  
    // if (VehicleFirstHaltEn == null || VehicleFirstHaltEn == "" || VehicleFirstHaltEn == undefined) {
    //   validFlag = false;
    //   setvehicleHaltPlaceError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setvehicleHaltPlaceError(false);
    // }
    // if (VehicleFromplaceEn.trim() == null || VehicleFromplaceEn.trim() == '' || VehicleFromplaceEn.trim() == undefined) {
    //   validFlag = false;
    //   setVehicleFromplaceEn("");
    //   setVehicleFromplaceEnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setVehicleFromplaceEnError(false);
    // }
    // if (VehicleToPlaceEn.trim() == null || VehicleToPlaceEn.trim() == '' || VehicleToPlaceEn.trim() == undefined) {
    //   validFlag = false;
    //   setVehicleToPlaceEn("");
    //   setVehicleToPlaceEnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setVehicleToPlaceEnError(false);
    // }
  }
  else if (DeathPlace.code === "PUBLIC_PLACES") {

    
    if (DeathPlaceLocalityEn == null || DeathPlaceLocalityEn == "" || DeathPlaceLocalityEn == undefined) {
      validFlag = false;
      setDeathPlaceLocalityEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeathPlaceLocalityEnError(false);
    }
    if (DeathPlaceLocalityMl == null || DeathPlaceLocalityMl == "" || DeathPlaceLocalityMl == undefined) {
      validFlag = false;
      setDeathPlaceLocalityMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeathPlaceLocalityMlError(false);
    }
  
  }
    if (validFlag == true) {
      // // sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      // // sessionStorage.setItem("DeathDateUnavailable", DeathDateUnavailable ? DeathDateUnavailable : false);
      // // sessionStorage.setItem("DateOfDeath1", DateOfDeath1 ? DateOfDeath1 : null);
      // // sessionStorage.setItem("FromDate", FromDate ? FromDate : null);
      // // sessionStorage.setItem("DeathTimeFrom", DeathTimeFrom ? DeathTimeFrom : null);
      // // sessionStorage.setItem("DeathTimeTo", DeathTimeTo ? DeathTimeTo : null);

      // // sessionStorage.setItem("DateOfDeath", DateOfDeath ? DateOfDeath : null);
      // // sessionStorage.setItem("TimeOfDeath", TimeOfDeath ? TimeOfDeath : null);
      // // sessionStorage.setItem("DeceasedFirstNameEn", DeceasedFirstNameEn ? DeceasedFirstNameEn : null);
      // // sessionStorage.setItem("DeceasedMiddleNameEn", DeceasedMiddleNameEn ? DeceasedMiddleNameEn : null);
      // // sessionStorage.setItem("DeceasedLastNameEn", DeceasedLastNameEn ? DeceasedLastNameEn : null);
      // // sessionStorage.setItem("DeceasedFirstNameMl", DeceasedFirstNameMl ? DeceasedFirstNameMl : null);
      // // sessionStorage.setItem("DeceasedMiddleNameMl", DeceasedMiddleNameMl ? DeceasedMiddleNameMl : null);
      // // sessionStorage.setItem("DeceasedLastNameMl", DeceasedLastNameMl ? DeceasedLastNameMl : null);
      // // sessionStorage.setItem("Age", Age ? Age : null);
      // // sessionStorage.setItem("Nationality", Nationality ? Nationality.code : null);
      // // sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      // // sessionStorage.setItem("DeceasedGender", DeceasedGender ? DeceasedGender.code : null);
      // // sessionStorage.setItem("AgeUnit", AgeUnit ? AgeUnit.code : null);
      // // // sessionStorage.setItem("checked", checked ? checked : false);
      // // sessionStorage.setItem("DeceasedAadharNotAvailable ", DeceasedAadharNotAvailable ? DeceasedAadharNotAvailable : false);
      // // sessionStorage.setItem("Occupation", Occupation ? Occupation.code : null);
      // // sessionStorage.setItem("DeathPlace", DeathPlace ? DeathPlace.code : null);

      // // sessionStorage.setItem("DeathPlaceTypecode", DeathPlaceType ? DeathPlaceType.code : null);
      // // sessionStorage.setItem("institutionNameCode", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // // sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // // // if (validFlag === true) {
      // // sessionStorage.setItem("DeceasedIdproofType", DeceasedIdproofType ? DeceasedIdproofType.code : null);
      // // sessionStorage.setItem("DeceasedIdproofNo", DeceasedIdproofNo ? DeceasedIdproofNo : null);

      // // sessionStorage.setItem("DeceasedAadharNumber", DeceasedAadharNumber ? DeceasedAadharNumber : null);

      // // if (DeathPlace.code === "HOSPITAL") {
      // //   //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
      // //   // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      // //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      // //   sessionStorage.setItem("HospitalNameMl", HospitalNameMl ? HospitalNameMl.code : null);
      // //   sessionStorage.removeItem("DeathPlaceInstId");
      // // }
      // // if (DeathPlace.code === "INSTITUTION") {
      // //   //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
      // //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      // //   sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // //   sessionStorage.setItem("InstitutionIdMl", InstitutionIdMl ? InstitutionIdMl.InstitutionIdMl : null);
      // // }
      // // if (DeathPlace.code === "HOME") {
      // //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      // //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      // //   sessionStorage.setItem("DeathPlaceHomeHoueNameEn", DeathPlaceHomeHoueNameEn ? DeathPlaceHomeHoueNameEn : null);
      // //   sessionStorage.setItem("DeathPlaceHomehoueNameMl", DeathPlaceHomehoueNameMl ? DeathPlaceHomehoueNameMl : null);
      // //   sessionStorage.setItem("DeathPlaceHomeLocalityEn", DeathPlaceHomeLocalityEn ? DeathPlaceHomeLocalityEn : null);
      // //   sessionStorage.setItem("DeathPlaceHomeLocalityMl", DeathPlaceHomeLocalityMl ? DeathPlaceHomeLocalityMl : null);
      // //   sessionStorage.setItem("DeathPlaceHomeStreetNameEn", DeathPlaceHomeStreetNameEn ? DeathPlaceHomeStreetNameEn : null);
      // //   sessionStorage.setItem("DeathPlaceHomeStreetNameMl", DeathPlaceHomeStreetNameMl ? DeathPlaceHomeStreetNameMl : null);
      // //   sessionStorage.setItem("DeathPlaceHomePostofficeId", DeathPlaceHomePostofficeId ? DeathPlaceHomePostofficeId.code : null);
      // //   sessionStorage.setItem("DeathPlaceHomepincode", DeathPlaceHomepincode ? DeathPlaceHomepincode.code : null);
      // // }
      // // if (DeathPlace.code === "VEHICLE") {
      // //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      // //   sessionStorage.setItem("VehicleNumber", VehicleNumber ? VehicleNumber : null);
      // //   sessionStorage.setItem("VehicleFromplaceEn", VehicleFromplaceEn ? VehicleFromplaceEn : null);
      // //   sessionStorage.setItem("VehicleToPlaceEn", VehicleToPlaceEn ? VehicleToPlaceEn : null);
      // //   sessionStorage.setItem("VehicleFromplaceMl", VehicleFromplaceMl ? VehicleFromplaceMl : null);
      // //   sessionStorage.setItem("VehicleToPlaceMl", VehicleToPlaceMl ? VehicleToPlaceMl : null);
      // //   sessionStorage.setItem("VehicleFirstHaltEn", VehicleFirstHaltEn ? VehicleFirstHaltEn : null);
      // //   sessionStorage.setItem("VehicleFirstHaltMl", VehicleFirstHaltMl ? VehicleFirstHaltMl : null);
      // //   sessionStorage.setItem("VehicleHospitalEn", VehicleHospitalEn ? VehicleHospitalEn.code : null);
      // //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      // //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      // // }
      // // if (DeathPlace.code === "PUBLIC_PLACES") {
      // //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      // //   sessionStorage.setItem("DeathPlaceLocalityEn", DeathPlaceLocalityEn ? DeathPlaceLocalityEn : null);
      // //   sessionStorage.setItem("DeathPlaceLocalityMl", DeathPlaceLocalityMl ? DeathPlaceLocalityMl : null);
      // //   sessionStorage.setItem("DeathPlaceStreetEn", DeathPlaceStreetEn ? DeathPlaceStreetEn : null);
      // //   sessionStorage.setItem("DeathPlaceStreetMl", DeathPlaceStreetMl ? DeathPlaceStreetMl : null);
      // //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      // //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId : null);
      // // }
      // // if (DeathPlace.code === "OUTSIDE_JURISDICTION") {
      // //   sessionStorage.setItem("DeathPlaceCountry", DeathPlaceCountry ? DeathPlaceCountry.code : null);
      // //   sessionStorage.setItem("DeathPlaceState", DeathPlaceState ? DeathPlaceState.code : null);
      // //   sessionStorage.setItem("DeathPlaceDistrict", DeathPlaceDistrict ? DeathPlaceDistrict.code : null);
      // //   sessionStorage.setItem("DeathPlaceCity", DeathPlaceCity ? DeathPlaceCity : null);
      // //   sessionStorage.setItem("DeathPlaceRemarksEn", DeathPlaceRemarksEn ? DeathPlaceRemarksEn : null);
      // //   sessionStorage.setItem("DeathPlaceRemarksMl", DeathPlaceRemarksMl ? DeathPlaceRemarksMl : null);
      // //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      // //   sessionStorage.setItem("PlaceOfBurialEn", PlaceOfBurialEn ? PlaceOfBurialEn : null);
      // //   sessionStorage.setItem("PlaceOfBurialMl", PlaceOfBurialMl ? PlaceOfBurialMl : null);
      // //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      // }
      let IsEditChangeScreen = isEditDeath ? isEditDeath : false;    
      let isWorkflow = isEditDeath ? false : true;
      onSelect(config.key, {
        uuid,
        IsEditChangeScreen,
        ToDate,
        DeathDateUnavailable,
        DeathTimeTo,
        FromDate,
        DeathTimeFrom,
        tenantId,
        DateOfDeath,
        TimeOfDeath,
        DeceasedFirstNameEn,
        DeceasedMiddleNameEn,
        DeceasedLastNameEn,
        DeceasedFirstNameMl,
        DeceasedMiddleNameMl,
        DeceasedLastNameMl,
        Age,
        DeceasedAadharNotAvailable,
        DeceasedAadharNumber,
        DeceasedIdproofType,
        DeceasedIdproofNo,
        CommencementDate,
        DeceasedGender,
        Nationality,
        Religion,
        AgeUnit,
        Occupation,
        // checked,
        DeathPlace,
        workFlowCode,
        workFlowAmount,
        isPayment,
        DeathPlaceType,
        HospitalNameMl,
        DeathPlaceTypecode,
        DeathPlaceInstId,
        InstitutionIdMl,
        institutionNameCode,
        DeathPlaceHomeHoueNameEn,
        DeathPlaceHomehoueNameMl,
        DeathPlaceHomeLocalityEn,
        DeathPlaceHomeLocalityMl,
        DeathPlaceHomeStreetNameEn,
        DeathPlaceHomeStreetNameMl,
        DeathPlaceHomePostofficeId,
        DeathPlaceHomepincode,
        DeathPlaceType,
        VehicleNumber,
        VehicleFromplaceEn,
        VehicleToPlaceEn,
        VehicleFromplaceMl,
        VehicleToPlaceMl,
        VehicleFirstHaltEn,
        VehicleFirstHaltMl,
        VehicleHospitalEn,
        GeneralRemarks,
        DeathPlaceWardId,
        DeathPlaceType,
        DeathPlaceLocalityEn,
        DeathPlaceLocalityMl,
        DeathPlaceStreetEn,
        DeathPlaceStreetMl,
        DeathPlaceCountry,
        DeathPlaceState,
        DeathPlaceDistrict,
        DeathPlaceCity,
        DeathPlaceRemarksEn,
        DeathPlaceRemarksMl,
        PlaceOfBurialMl,
        PlaceOfBurialEn,
        isWorkflow,
      });
    }
  };
  if (
    isEditDeath &&
    isEditDeathPageComponents === false &&
    (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.InformationDeath?.DeceasedGender != null) {
      if (menu.length > 0 && (DeceasedGender === undefined || DeceasedGender === "")) {
        setselectedDeceasedGender(menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]);
      }
    }
    if (formData?.InformationDeath?.DeathPlace != null) {
      if (cmbPlace.length > 0 && (DeathPlace === undefined || DeathPlace === "")) {
        setselectDeathPlace(cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]);
        setValue(formData?.InformationDeath?.DeathPlace);
      }
    }
    if (formData?.InformationDeath?.AgeUnit != null) {
      if (cmbPlace.length > 0 && (AgeUnit === undefined || AgeUnit === "")) {
        setSelectedAgeUnit(cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.AgeUnit)[0]);
        setValue(formData?.InformationDeath?.AgeUnit);
      }
    }
    // if (formData?.InformationDeath?.AgeUnit != null) {
    //   if (cmbPlace.length > 0 && (AgeUnit === undefined || AgeUnit === "")) {
    //     setSelectedAgeUnit(cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.AgeUnit)[0]);
    //     setValue(formData?.InformationDeath?.AgeUnit);
    //   }
    // }
    if (formData?.InformationDeath?.Religion != null) {
      if (cmbReligion.length > 0 && (Religion === undefined || Religion === "")) {
        setSelectedReligion(cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.InformationDeath?.Religion)[0]);
        setValue(formData?.InformationDeath?.Religion);
      }
    }
    if (formData?.InformationDeath?.Occupation != null) {
      if (cmbOccupationMain.length > 0 && (Occupation === undefined || Occupation === "")) {
        setSelectedReligion(cmbOccupationMain.filter((cmbOccupationMain) => cmbOccupationMain.code === formData?.InformationDeath?.Occupation)[0]);
        setValue(formData?.InformationDeath?.Occupation);
      }
    }

    // if (formData?.ChildDetails?.medicalAttensionSub != null) {
    //   if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
    //     setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.ChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.deliveryMethods != null) {
    //   if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
    //     // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
    //     setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
    //   }
    // }
  }
  if (
    isWorkFlowDetailsLoading ||
    isNationLoad ||
    isreligionLoad ||
    isdocmentLoad ||
    isAgeUnitLoad ||
    isOccupationLoad ||
    isLoad ||
    isStateLoad ||
    isGenderLoad
  ) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
         isDisabled={!DeathPlace
          || (value === "HOSPITAL" ? (!DeathPlaceType || !HospitalNameMl) : false)
          || (value === "INSTITUTION" ? (!DeathPlaceType || !DeathPlaceInstId || !InstitutionIdMl) : false)
          || (value === "HOME" ? (!DeathPlaceWardId || !DeathPlaceHomePostofficeId || DeathPlaceHomepincode === "" || DeathPlaceHomeLocalityEn == ""
          || DeathPlaceHomeHoueNameEn == "" || DeathPlaceHomeLocalityMl == "" || DeathPlaceHomehoueNameMl == "") : false)
          || (value === "PUBLIC_PLACES" ? (!DeathPlaceType || !DeathPlaceWardId || DeathPlaceLocalityEn === "" ) : false)
          || (value === "VEHICLE" ? (!DeathPlaceType || VehicleNumber === "" || VehicleFirstHaltEn === ""
             || !DeathPlaceWardId || GeneralRemarks === "") : false) || 
            (value === "OUTSIDE_JURISDICTION" ? (!DeathPlaceDistrict || DeathPlaceCity == ""|| PlaceOfBurialEn == "" || PlaceOfBurialMl == "" || !DeathPlaceWardId ) : false)
          || DeceasedFirstNameEn == "" || DeceasedFirstNameMl == "" || !Age || !DeceasedGender || !Nationality || !Religion
          }>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>
              </h1>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CheckBox
                    label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}
                    onChange={setCheckedDate}
                    value={DeathDateUnavailable}
                    checked={DeathDateUnavailable}
                  />
                </div>
              </div>
            </div>
            {DeathDateUnavailable === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_FROM_DATE")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={FromDate}
                      max={convertEpochToDate(new Date())}
                      name="FromDate"
                      onChange={selectFromDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
                    <CustomTimePicker name="DeathTimeFrom" onChange={(val) => handleFromTimeChange(val, setDeathTimeFrom)} value={DeathTimeFrom} />
                  </div> */}
                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_TO_DATE")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={ToDate}
                      max={convertEpochToDate(new Date())}
                      name="ToDate"
                      onChange={selectToDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <CardLabel>{t("CR_TO_TIME")}</CardLabel>
                    <CustomTimePicker name="DeathTimeTo" onChange={(val) => handleToTimeChange(val, setDeathTimeTo)} value={DeathTimeTo} />
                  </div> */}
                </div>
              </div>
            )}
            {DeathDateUnavailable === false && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_DATE_OF_DEATH")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={DateOfDeath}
                      max={convertEpochToDate(new Date())}
                      name="DateOfDeath"
                      onChange={selectDeathDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                    <CustomTimePicker name="TimeOfDeath" onChange={(val) => handleTimeChange(val, setDeathTime)} value={TimeOfDeath} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>
                    {t("CR_DATE_OF_DEATH")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <DatePicker
                    disable={isDisableEdit}
                    date={DateOfDeath}
                    name="DateOfDeath"
                    inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_DATE_OF_DEATH")}`}
                    onChange={selectDateOfDeath}
                    {...(validation = {
                      pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_DATE"),
                    })}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                  <CustomTimePicker
                    name="TimeOfDeath"
                    onChange={(val) => handleTimeChange(val, setTimeOfDeath)}
                    value={TimeOfDeath}
                    disable={isDisableEdit}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}</span>
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_PLACE_OF_DEATH")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPlace}
                  selected={DeathPlace}
                  select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
            </div>

            {value === "HOSPITAL" && (
              <Hospital
                formData={formData}
                isEditDeath={isEditDeath}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                HospitalNameMl={HospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
              />
            )}
            {value === "INSTITUTION" && (
              <div>
                <Institution
                  formData={formData}
                  isEditDeath={isEditDeath}
                  selectDeathPlaceType={selectDeathPlaceType}
                  DeathPlaceType={DeathPlaceType}
                  DeathPlaceInstId={DeathPlaceInstId}
                  setSelectedDeathPlaceInstId={setSelectedDeathPlaceInstId}
                  InstitutionIdMl={InstitutionIdMl}
                  setInstitutionIdMl={setInstitutionIdMl}
                  InstitutionFilterList={InstitutionFilterList}
                  setInstitutionFilterList={setInstitutionFilterList}
                  isInitialRenderInstitutionList={isInitialRenderInstitutionList}
                  setIsInitialRenderInstitutionList={setIsInitialRenderInstitutionList}
                />
              </div>
            )}
            {value === "HOME" && (
              <div>
                <DeathPlaceHome
                  formData={formData}
                  isEditDeath={isEditDeath}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                  DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
                  setDeathPlaceHomepostofficeId={setDeathPlaceHomepostofficeId}
                  DeathPlaceHomepincode={DeathPlaceHomepincode}
                  setDeathPlaceHomepincode={setDeathPlaceHomepincode}
                  DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
                  setDeathPlaceHomehoueNameEn={setDeathPlaceHomehoueNameEn}
                  DeathPlaceHomehoueNameMl={DeathPlaceHomehoueNameMl}
                  setDeathPlaceHomehoueNameMl={setDeathPlaceHomehoueNameMl}
                  DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
                  setDeathPlaceHomelocalityEn={setDeathPlaceHomelocalityEn}
                  DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
                  setDeathPlaceHomelocalityMl={setDeathPlaceHomelocalityMl}
                  DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
                  setDeathPlaceHomestreetNameEn={setDeathPlaceHomestreetNameEn}
                  DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
                  setDeathPlaceHomestreetNameMl={setDeathPlaceHomestreetNameMl}
                  PostOfficevalues={PostOfficevalues}
                  setPostOfficevalues={setPostOfficevalues}
                />
              </div>
            )}
            {value === "VEHICLE" && (
              <div>
                <DeathPlaceVehicle
                  formData={formData}
                  isEditDeath={isEditDeath}
                  DeathPlaceType={DeathPlaceType}
                  selectDeathPlaceType={selectDeathPlaceType}
                  VehicleNumber={VehicleNumber}
                  setVehicleNumber={setVehicleNumber}
                  VehicleFromplaceEn={VehicleFromplaceEn}
                  setVehicleFromplaceEn={setVehicleFromplaceEn}
                  VehicleToPlaceEn={VehicleToPlaceEn}
                  setVehicleToPlaceEn={setVehicleToPlaceEn}
                  GeneralRemarks={GeneralRemarks}
                  setGeneralRemarks={setGeneralRemarks}
                  VehicleFirstHaltEn={VehicleFirstHaltEn}
                  setVehicleFirstHaltEn={setVehicleFirstHaltEn}
                  VehicleFirstHaltMl={VehicleFirstHaltMl}
                  setVehicleFirstHaltMl={setVehicleFirstHaltMl}
                  VehicleHospitalEn={VehicleHospitalEn}
                  setSelectedVehicleHospitalEn={setSelectedVehicleHospitalEn}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                  VehicleFromplaceMl={VehicleFromplaceMl}
                  setVehicleFromplaceMl={setVehicleFromplaceMl}
                  VehicleToPlaceMl={VehicleToPlaceMl}
                  setVehicleToPlaceMl={setVehicleToPlaceMl}
                />
              </div>
            )}
            {value === "PUBLIC_PLACES" && (
              <div>
                <DeathPublicPlace
                  formData={formData}
                  isEditDeath={isEditDeath}
                  DeathPlaceType={DeathPlaceType}
                  selectDeathPlaceType={selectDeathPlaceType}
                  DeathPlaceLocalityEn={DeathPlaceLocalityEn}
                  setDeathPlaceLocalityEn={setDeathPlaceLocalityEn}
                  DeathPlaceLocalityMl={DeathPlaceLocalityMl}
                  setDeathPlaceLocalityMl={setDeathPlaceLocalityMl}
                  DeathPlaceStreetEn={DeathPlaceStreetEn}
                  setDeathPlaceStreetEn={setDeathPlaceStreetEn}
                  DeathPlaceStreetMl={DeathPlaceStreetMl}
                  setDeathPlaceStreetMl={setDeathPlaceStreetMl}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                  GeneralRemarks={GeneralRemarks}
                  setGeneralRemarks={setGeneralRemarks}
                />
              </div>
            )}
            {value === "OUTSIDE_JURISDICTION" && (
              <div>
                <DeathOutsideJurisdiction
                  formData={formData}
                  isEditDeath={isEditDeath}
                  DeathPlaceCountry={DeathPlaceCountry}
                  setSelectDeathPlaceCountry={setSelectDeathPlaceCountry}
                  DeathPlaceState={DeathPlaceState}
                  SelectDeathPlaceState={SelectDeathPlaceState}
                  DeathPlaceDistrict={DeathPlaceDistrict}
                  SelectDeathPlaceDistrict={SelectDeathPlaceDistrict}
                  DeathPlaceCity={DeathPlaceCity}
                  SelectDeathPlaceCity={SelectDeathPlaceCity}
                  DeathPlaceRemarksEn={DeathPlaceRemarksEn}
                  SelectDeathPlaceRemarksEn={SelectDeathPlaceRemarksEn}
                  DeathPlaceRemarksMl={DeathPlaceRemarksMl}
                  SelectDeathPlaceRemarksMl={SelectDeathPlaceRemarksMl}
                  PlaceOfBurialMl={PlaceOfBurialMl}
                  SelectPlaceOfBurialMl={SelectPlaceOfBurialMl}
                  PlaceOfBurialEn={PlaceOfBurialEn}
                  SelectPlaceOfBurialEn={SelectPlaceOfBurialEn}
                  GeneralRemarks={GeneralRemarks}
                  setGeneralRemarks={setGeneralRemarks}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CheckBox
                  label={t("CR_AADHAR_NOT_AVAILABLE")}
                  onChange={setCheckedAdhar}
                  value={DeceasedAadharNotAvailable}
                  checked={DeceasedAadharNotAvailable}
                />
              </div>
            </div>
          </div>
          {DeceasedAadharNotAvailable === true && (
            // {checkedAdhar ? (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{t("CR_ID_DETAILS_OF_DECEASED")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    onChange={handleDropdownChange}
                    option={cmbDocumentType}
                    selected={DeceasedIdproofType}
                    select={selectDeceasedIdproofType}
                    placeholder={`${t("CR_ID_DETAILS_OF_DECEASED")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CR_ID_NO")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DeceasedIdproofNo"
                    value={DeceasedIdproofNo}
                    disabled={!isTextboxEnabled}
                    onChange={setSelectDeceasedIdproofNo}
                    placeholder={`${t("CR_ID_NO")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
              </div>
            </div>
          )}
          {DeceasedAadharNotAvailable === false && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{t("CR_AADHAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="DeceasedAadharNumber"
                    value={DeceasedAadharNumber}
                    onChange={setSelectDeceasedAadharNumber}
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameEn"
                  value={DeceasedFirstNameEn}
                  onChange={setSelectDeceasedFirstNameEn}
                  onKeyPress={setCheckSpecialCharSpace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameEn"
                  value={DeceasedMiddleNameEn}
                  onChange={setSelectDeceasedMiddleNameEn}
                  onKeyPress={setCheckSpecialCharSpace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameEn"
                  value={DeceasedLastNameEn}
                  onChange={setSelectDeceasedLastNameEn}
                  onKeyPress={setCheckSpecialCharSpace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_ML")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameMl"
                  value={DeceasedFirstNameMl}
                  onChange={setSelectDeceasedFirstNameMl}
                  onKeyPress={setCheckMalayalamInputField}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_FIRST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_FIRST_NAME_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameMl"
                  value={DeceasedMiddleNameMl}
                  onChange={setSelectDeceasedMiddleNameMl}
                  onKeyPress={setCheckMalayalamInputField}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_MIDDLE_NAME_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameMl"
                  value={DeceasedLastNameMl}
                  onChange={setSelectDeceasedLastNameMl}
                  onKeyPress={setCheckMalayalamInputField}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_LAST_NAME_ML"),
                  })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-1">
                <CardLabel>
                  {`${t("CR_AGE")}`}
                  <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type="number"
                  optionKey="i18nKey"
                  name="Age"
                  onChange={setSelectAge}
                  value={Age}
                  placeholder={`${t("CR_AGE")}`}
                  validation={{ pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CS_COMMON_INVALID_AGE") }}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {`${t("CR_AGE_UNIT")}`}
                  <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={getAgeUnitOptions()}
                  selected={AgeUnit}
                  select={selectAgeUnit}
                  placeholder={`${t("CR_AGE_UNIT")}`}
                />
              </div>
              {/* {!isTextBoxValid() && <p>Please enter a valid value based on the conditions</p>} */}

              <div className="col-md-2">
                <CardLabel>
                  {t("CR_GENDER")} <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={DeceasedGender}
                  select={selectDeceasedGender}
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CR_NATIONALITY")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="nationalityname"
                  isMandatory={true}
                  option={cmbNation}
                  selected={Nationality}
                  select={selectNationality}
                  placeholder={`${t("CR_NATIONALITY")}`}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CS_COMMON_RELIGION")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbReligion}
                  selected={Religion}
                  select={selectReligion}
                  placeholder={`${t("CS_COMMON_RELIGION")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_PROFESSIONAL")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbOccupationMain}
                  selected={Occupation}
                  select={selectOccupation}
                  placeholder={`${t("CR_PROFESSIONAL")}`}
                />
              </div>
            </div>
          </div>

          {toast && (
            <Toast
              error={DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || AgeError || sexError || WardNameError || DeceasedFirstNameEnError || DeceasedFirstNameMlError }
              label={
                DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || AgeError || sexError || WardNameError || DeceasedFirstNameEnError || DeceasedFirstNameMlError
                  ? DOBError
                    ? t(`CR_INVALID_DATE`)
                    : sexError
                    ? t(`DEATH_ERROR_SEX_CHOOSE`)
                    : AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : DeceasedFirstNameEnError
                    ? t(`DECEASED_FIRST_NAME_EN`)
                    : DeceasedFirstNameMlError
                    ? t(`DECEASED_FIRST_NAME_ML`)
                    : HospitalError
                    ? t(`CR_ERROR_HOSPITAL_CHOOSE`)
                    : InstitutionError
                    ? t(`CR_ERROR_INSTITUTION_TYPE_CHOOSE`)
                    : InstitutionNameError
                    ? t(`CR_ERROR_INSTITUTION_NAME_CHOOSE`)
                    : AgeError
                    ? t(`CR_ERROR_AGE_CHOOSE`)
                    : WardNameError
                    ? t(`CR_ERROR_WARD_CHOOSE`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
        </FormStep>
      </React.Fragment>
    );
  }
};
//anzar
export default InformationDeath;
