import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathVehicle = ({ config, onSelect, userType, formData ,VehicleRegistrationNo, setVehicleRegistrationNo,VehicleFromEn, setVehicleFromEn,
  VehicleToEn, setVehicleToEn,VehicleFromMl, setVehicleFromMl,setVehicleHaltPlace, setSelectedVehicleHaltPlace,VehicleToMl, setVehicleToMl,VehicleOtherDetailsEn, setVehicleOtherDetailsEn,
  VehicleOtherDetailsMl, setVehicleOtherDetailsMl,setAdmittedHospitalEn, setSelectedAdmittedHospitalEn,setAdmittedHospitalMl, setSelectedAdmittedHospitalMl, setVehicletype, setSelectedVehicletype}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: localbodies={}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: VehicleData = {}, isVehicleLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("stateId", "birth-death-service", "VehicleType");
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  // const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [TradeName, setTradeName] = useState(null);

  // const [DriverName, setDriverName] = useState(formData?.PlaceOfDeathVehicle?.DriverName);
  // const [DriverNameMl, setDriverNameMl] = useState(formData?.PlaceOfDeathVehicle?.DriverNameMl);
  // const [DriverMobileNo, setDriverMobileNo] = useState(formData?.PlaceOfDeathVehicle?.DriverMobileNo);
  // const [DriverAge, setDriverAge] = useState(formData?.PlaceOfDeathVehicle?.DriverAge);
  // const [DriverAadhar, setDriverAadhar] = useState(formData?.PlaceOfDeathVehicle?.DriverAadhar);

  // const [DriverLicenceNo, setDriverLicenceNo] = useState(formData?.PlaceOfDeathVehicle?.DriverLicenceNo);

  // For Place of Birth Vehicle

  // const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.PlaceOfDeathVehicle?.VehicleRegistrationNo);  
  // const [VehicleFromEn, setVehicleFromEn] = useState(formData?.PlaceOfDeathVehicle?.setVehicleFromEn);
  // const [VehicleToEn, setVehicleToEn] = useState(formData?.PlaceOfDeathVehicle?.setSelectVehicleToEn);
  
   // const [VehicleFromMl, setVehicleFromMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleFromMl);
  // const [setVehicleHaltPlace, setSelectedVehicleHaltPlace] = useState(formData?.PlaceOfDeathVehicle?.VehicleHaltPlace);
  // const [VehicleToMl, setVehicleToMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleToMl);
  // const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.PlaceOfDeathVehicle?.VehicleOtherDetailsEn);  
  // const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleOtherDetailsMl); 
  // const [setDeathVehicleWard, setSelectedDeathVehicleWard] = useState(formData?.PlaceOfDeathVehicle?.setDeathVehicleWard);
  // const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.PlaceOfDeathVehicle?.setAdmittedHospitalEn);
  // const [setAdmittedHospitalMl, setSelectedAdmittedHospitalMl] = useState(formData?.PlaceOfDeathVehicle?.setAdmittedHospitalMl);
   // const [VehicleType, setVehicleType] = useState(formData?.PlaceOfDeathVehicle?.VehicleType); 
  //  const [setVehicletype, setSelectedVehicletype] = useState(formData?.PlaceOfDeathVehicle?.setVehicletype);
  let naturetypecmbvalue = null;
  

  let cmbhospital = [];
  hospitalData &&
  hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  let  cmbVehicletype = [];
  VehicleData &&
  VehicleData["birth-death-service"] &&
   VehicleData["birth-death-service"].VehicleType.map((ob) => {
     cmbVehicletype.push(ob);
    });

  let cmbVehicleHaltPlace = [];
  localbodies &&
  localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbVehicleHaltPlace.push(ob);
    });
  const onSkip = () => onSelect();


  // function setSelectVehicleType(e) {
  //   setVehicsetVehicletypeleType(e.target.value);
  // }
  function setSelectVehicleRegistrationNo(e) {
    setVehicleRegistrationNo(e.target.value);
  }
   
  function setSelectVehicleFromEn(e) {
    setVehicleFromEn(e.target.value);
  }
  function setSelectVehicleToEn(e) {
    setVehicleToEn(e.target.value);
  }
  function setSelectVehicleFromMl(e) {
    setVehicleFromMl(e.target.value);
  }
  // function setSelectVehicleHaltPlace(e) {
  //   setVehicleHaltPlace(e.target.value);
  // }

  function setSelectVehicleToMl(e) {
    setVehicleToMl(e.target.value);
  }
  function setSelectVehicleOtherDetailsEn(e) {
    setVehicleOtherDetailsEn(e.target.value);
  }
  function setSelectVehicleOtherDetailsMl(e) {
    setVehicleOtherDetailsMl(e.target.value);
  }
 
  function selectAdmittedHospitalEn(value) {
    setSelectedAdmittedHospitalEn(value);
  }
  function selectVehicleHaltPlace(value) {
    setSelectedVehicleHaltPlace(value);
  }

  function selectAdmittedHospitalMl(value) {
    setSelectedAdmittedHospitalMl(value);
  }
  function selectVehicletype(value) {
    setSelectedVehicletype(value);
  }
  
  const goNext = () => {
    
    // sessionStorage.setItem("DriverName", DriverName);
    // sessionStorage.setItem("DriverNameMl", DriverNameMl);
    // sessionStorage.setItem("DriverMobileNo", DriverMobileNo);
    // sessionStorage.setItem("DriverAge", DriverAge);
    // sessionStorage.setItem("DriverAadhar", DriverAadhar);
    // sessionStorage.setItem("DriverLicenceNo", DriverLicenceNo); 
    // sessionStorage.setItem("setDeathVehicleWard", setDeathVehicleWard.code);


    // sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo);       
    // sessionStorage.setItem("VehicleFromEn", VehicleFromEn);  
    // sessionStorage.setItem("VehicleToEn", VehicleToEn);
    // sessionStorage.setItem("VehicleFromMl", VehicleFromMl);  
      //  sessionStorage.setItem("VehicleHaltPlace", VehicleHaltPlace);
      //  sessionStorage.setItem("VehicleType", VehicleType);
    
    // sessionStorage.setItem("VehicleToMl", VehicleToMl);
    // sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn.code);
    // sessionStorage.setItem("setVehicleHaltPlace", seVehicleHaltPlace.code);
    
    // sessionStorage.setItem("setVehicletype", setVehicletype.code);    
    // sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn); 
    // sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsEn); 
    
    
    
    onSelect(config.key, {
      // setPlaceofActivity,
      // DriverName,
      // DriverNameMl,
      // DriverMobileNo,
      // DriverAadhar,
      //  VehicleType,
      // VehicleHaltPlace     
      // DriverLicenceNo,
      // setDeathVehicleWard,

      // VehicleRegistrationNo,
      // VehicleFromEn,
      // VehicleToEn,
      // VehicleFromMl,
      // VehicleToMl,
      // setVehicletype,
  
      // setAdmittedHospitalEn,
      // setAdmittedHospitalMl,
      // VehicleOtherDetailsEn,
      // VehicleOtherDetailsMl,
     });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_VECHICLE")}`}
                </span> 
            </h1>
        </div>
    </div>
    <div className="row">    
       <div className="col-md-12" >         
       <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleRegistrationNo"
                value={VehicleRegistrationNo}
                onChange={setSelectVehicleRegistrationNo}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_REGISTRATION_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_REGISTRATION_NO") })}
            />
        </div>
        {/* <div className="col-md-6" > 
        <CardLabel>{`${t("CR_DRIVER_LICENCE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverLicenceNo"
                value={DriverLicenceNo}
                onChange={setSelectDriverLicenceNo}
                disable={isEdit}
                placeholder={`${t("CR_DRIVER_LICENCE_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LICENCE_NO") })}
            />
        </div> */}
       </div> 
    </div> 

    <div className="row">    
       <div className="col-md-12" >         
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFromEn"
                value={VehicleFromEn}
                onChange={setSelectVehicleFromEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleToEn"
                value={VehicleToEn}
                onChange={setSelectVehicleToEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFromMl"
                value={VehicleFromMl}
                onChange={setSelectVehicleFromMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleToMl"
                value={VehicleToMl}
                onChange={setSelectVehicleToMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
    </div> 
    </div> 
    {/* <div className="row">
    <div className="col-md-12" >
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverName"
                value={DriverName}
                onChange={setSelectDriverName}
                disable={isEdit}
                placeholder={`${t("CR_DRIVER_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
           
        </div>
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverNameMl"
                value={DriverNameMl}
                onChange={setSelectDriverNameMl}
                disable={isEdit}
                placeholder={`${t("CR_DRIVER_NAME_ML")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
            />
           
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12" >
        <div className="col-md-3" >
        <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverMobileNo"
                value={DriverMobileNo}
                onChange={setSelectDriverMobileNo}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false,title: t("CR_INVALID_MOBILE_NO") })}
            />
        </div>
        <div className="col-md-3" >
        <CardLabel>{t("CR_AGE")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverAge"
                value={DriverAge}
                onChange={setSelectDriverAge}
                disable={isEdit}
                placeholder={`${t("CR_AGE")}`}
                {...(validation = {pattern: "^([0-9]){3}$", isRequired: false,type: "text",title: t("CS_COMMON_INVALID_AGE"),  })}
            />
        </div>
        <div className="col-md-3 " >
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverAadhar"
                value={DriverAadhar}
                onChange={setSelectDriverAadhar}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false ,title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
        </div>
        
    </div>
    </div> */}      
       
  
    <div className="row">  
    <div className="col-md-12" > 
    <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbVehicletype}
                selected={setVehicletype}
                select={selectVehicletype}
                disabled={isEdit}
                placeholder={`${t("CR_VEHICLE_TYPE")}`}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbVehicleHaltPlace}                         
                selected={setVehicleHaltPlace}
                select={selectVehicleHaltPlace}
                disabled={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
            />
        {/* <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleHaltPlace"
                value={VehicleHaltPlace}
                onChange={setSelectVehicleHaltPlace}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT") })}
            /> */}
        </div>
        
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_EN")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={false}
                option={cmbhospital}
                selected={setAdmittedHospitalEn}
                select={selectAdmittedHospitalEn}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL_EN")}`}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_ML")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="hospitalNamelocal"
                isMandatory={false}
                option={cmbhospital}
                selected={setAdmittedHospitalMl}
                select={selectAdmittedHospitalMl}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL_ML")}`}
            />
        </div>
        </div>   
    </div>  
     <div className="row">  
     <div className="col-md-12" > 
        <div className="col-md-6" >
          <CardLabel>{`${t("CR_OTHER_DETAILS_EN")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="VehicleOtherDetailsEn"
            value={VehicleOtherDetailsEn}
            onChange={setSelectVehicleOtherDetailsEn}
            disable={isEdit}
            placeholder={`${t("CR_OTHER_DETAILS_EN")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
            />
        </div>
        <div className="col-md-6" >
         <CardLabel>{`${t("CR_OTHER_DETAILS_ML")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="VehicleOtherDetailsMl"
            value={VehicleOtherDetailsMl}
            onChange={setSelectVehicleOtherDetailsMl}
            disable={isEdit}
            placeholder={`${t("CR_OTHER_DETAILS_ML")}`}
            {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_OTHER_DETAILS_ML") })}
            />
        </div> 
    </div>   
    </div> 

      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathVehicle;