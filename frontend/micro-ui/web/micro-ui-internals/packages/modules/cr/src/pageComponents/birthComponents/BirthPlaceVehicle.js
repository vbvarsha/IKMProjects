import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader, TextArea } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BirthPlaceVehicle = ({ config, onSelect, userType, formData, vehicleType, vehicleRegistrationNo, vehicleFromEn,
  vehicleToEn, vehicleFromMl, vehicleHaltPlace, vehicleHaltPlaceMl, vehicleToMl, vehicleDesDetailsEn, setvehicleToEn, setadmittedHospitalEn,
  setvehicleType, setvehicleRegistrationNo, setvehicleFromEn, setvehicleFromMl, setvehicleHaltPlace, setvehicleHaltPlaceMl,
  setvehicleToMl, setvehicleDesDetailsEn, setSelectedadmittedHospitalEn, setWardNo, wardNo
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};

  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "hospital");
  const { data: Vehicle = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "VehicleType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  // const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [toast, setToast] = useState(false);
  // const [vehicleType, setvehicleType] = useState(formData?.BirthPlaceVehicleDetails?.vehicleType ? formData?.BirthPlaceVehicleDetails?.vehicleType : "");
  // const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(formData?.BirthPlaceVehicleDetails?.vehicleRegistrationNo ? formData?.BirthPlaceVehicleDetails?.vehicleRegistrationNo : "");  
  // const [vehicleFromEn, setvehicleFromEn] = useState(formData?.BirthPlaceVehicleDetails?.setvehicleFromEn ? formData?.BirthPlaceVehicleDetails?.setvehicleFromEn : "");
  // const [vehicleToEn, setvehicleToEn] = useState(formData?.BirthPlaceVehicleDetails?.vehicleToEn ? formData?.BirthPlaceVehicleDetails?.vehicleToEn : "");
  // const [vehicleFromMl, setvehicleFromMl] = useState(formData?.BirthPlaceVehicleDetails?.vehicleFromMl ? formData?.BirthPlaceVehicleDetails?.vehicleFromMl : "");
  // const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.BirthPlaceVehicleDetails?.vehicleHaltPlace ? formData?.BirthPlaceVehicleDetails?.vehicleHaltPlace : "");
  // const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?.BirthPlaceVehicleDetails?.vehicleHaltPlaceMl ? formData?.BirthPlaceVehicleDetails?.vehicleHaltPlaceMl : "");
  // const [vehicleToMl, setvehicleToMl] = useState(formData?.BirthPlaceVehicleDetails?.vehicleToMl ? formData?.BirthPlaceVehicleDetails?.vehicleToMl : "");
  // const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(formData?.BirthPlaceVehicleDetails?.vehicleDesDetailsEn ? formData?.BirthPlaceVehicleDetails?.vehicleDesDetailsEn : "");  
  // const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(formData?.BirthPlaceVehicleDetails?.setadmittedHospitalEn ? formData?.BirthPlaceVehicleDetails?.setadmittedHospitalEn : "");

  let cmbhospital = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  let cmbVehicle = [];
  Vehicle &&
    Vehicle["birth-death-service"] &&
    Vehicle["birth-death-service"].VehicleType.map((ob) => {
      cmbVehicle.push(ob);
    });

    let Zonal = [];
    let cmbWardNo = [];
    let cmbWardNoFinal = [];
    boundaryList &&
      boundaryList["egov-location"] &&
      boundaryList["egov-location"].TenantBoundary.map((ob) => {
        if (ob?.hierarchyType.code === "REVENUE") {
          Zonal.push(...ob.boundary.children);
          ob.boundary.children.map((obward) => {
            cmbWardNo.push(...obward.children);
          });
        }
      });
  
    cmbWardNo.map((wardmst) => {
      wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
      wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
      cmbWardNoFinal.push(wardmst);
    });
  

  const onSkip = () => onSelect();

  function setSelectVehicleType(value) {
    setvehicleType(value);
  }
  function setSelectVehicleRegistrationNo(e) {
    if (e.target.value.length === 10) {
      return false;
    } else {
      setvehicleRegistrationNo(e.target.value);
    }
  }
  function setSelectVehicleFromEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleFromEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectVehicleToEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleToEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectVehicleFromMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleFromMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  }
  function setSelectVehicleHaltPlace(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleHaltPlace(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectVehicleHaltPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleHaltPlaceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  }
  function setSelectVehicleToMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleToMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  }
  function setSelectVehicleOtherDetailsEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setvehicleDesDetailsEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function selectadmittedHospitalEn(value) {
    setSelectedadmittedHospitalEn(value);
  }
  function setSelectWard(value) {
    setPresentWardNo(value);
   
}

  let validFlag = true;
  const goNext = () => {

  };
  if (isLoad || isLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <div className="row">
          <div className="col-md-12" >
            <h1 className="headingh1" >
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_VEHICLE")}`}
              </span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" >
            <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbVehicle}
              selected={vehicleType}
              select={setSelectVehicleType}
              placeholder={`${t("CR_VEHICLE_TYPE")}`}
            />

          </div>
          <div className="col-md-4" >
            <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleRegistrationNo"
              value={vehicleRegistrationNo}
              onChange={setSelectVehicleRegistrationNo}
              placeholder={`${t("CR_VEHICLE_REGISTRATION_NO")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_REGISTRATION_NO") })}
            />
          </div>
          <div className="col-md-4" >
            <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleHaltPlace"
              value={vehicleHaltPlace}
              onChange={setSelectVehicleHaltPlace}
              placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_EN") })}
            />
          </div>        
         
        </div>

        <div className="row">
        <div className="col-md-3" >
            <CardLabel>{`${t("CR_VEHICLE_FROM_EN")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleFromEn"
              value={vehicleFromEn}
              onChange={setSelectVehicleFromEn}
              placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
          </div>
          <div className="col-md-3" >
            <CardLabel>{`${t("CR_VEHICLE_TO_EN")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleToEn"
              value={vehicleToEn}
              onChange={setSelectVehicleToEn}
              placeholder={`${t("CR_VEHICLE_TO_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
          </div>
          <div className="col-md-3" >
            <CardLabel>{`${t("CR_VEHICLE_FROM_ML")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleFromMl"
              value={vehicleFromMl}
              onChange={setSelectVehicleFromMl}
              placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
          </div>
          <div className="col-md-3" >
            <CardLabel>{`${t("CR_VEHICLE_TO_ML")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleToMl"
              value={vehicleToMl}
              onChange={setSelectVehicleToMl}
              placeholder={`${t("CR_VEHICLE_TO_ML")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
          </div>
         
          {/* <div className="col-md-3" >
            <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleHaltPlaceMl"
              value={vehicleHaltPlaceMl}
              onChange={setSelectVehicleHaltPlaceMl}
              placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_ML") })}
            />
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-4" >
            <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="hospitalName"
              isMandatory={true}
              option={cmbhospital}
              selected={setadmittedHospitalEn}
              select={selectadmittedHospitalEn}
              placeholder={`${t("CR_ADMITTED_HOSPITAL_EN")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {`${t("CS_COMMON_WARD")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="namecmb"
              option={cmbWardNoFinal}
              selected={wardNo}
              select={setSelectWard}
              placeholder={`${t("CS_COMMON_WARD")}`}
              {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
            />
          </div>
          <div className="col-md-4" >
            <CardLabel>{`${t("CR_DESCRIPTION")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextArea
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="vehicleDesDetailsEn"
              value={vehicleDesDetailsEn}
              onChange={setSelectVehicleOtherDetailsEn}
              placeholder={`${t("CR_DESCRIPTION")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
          </div>
        </div>

      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceVehicle;