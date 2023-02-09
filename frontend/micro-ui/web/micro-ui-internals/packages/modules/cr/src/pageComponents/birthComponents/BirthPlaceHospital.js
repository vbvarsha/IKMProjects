import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

<<<<<<< HEAD
const BirthPlaceHospital = ({ config, onSelect, userType, formData, selectHospitalName, hospitalName, hospitalNameMl, selectHospitalNameMl }) => {
=======
const BirthPlaceHospital = ({ config, onSelect, userType, formData
}) => {
>>>>>>> 9ccfd0d4cac1643e056426e511e5d3f9fdc5b2d9
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const { t } = useTranslation();
  let validation = {};
  // const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [OfficerNames, setFilteredOfficerName] = useState(0);
  const [Designations, setFilteredDesignation] = useState(0);
 
 
  const [HospitalName, selectHospitalName] = useState(formData?.BirthPlaceHospitalDetails?.HospitalName);
  const [HospitalNameMl, selectHospitalNameMl] = useState(formData?.BirthPlaceHospitalDetails?.HospitalNameMl);
  
  let cmbhospital = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
 
  const onSkip = () => onSelect();

  function setselectHospitalName(value) {   
    selectHospitalName(value);    
  }
  function setselectHospitalNameMl(value) {   
    selectHospitalNameMl(value);    
  }
<<<<<<< HEAD

  const goNext = () => {
    // sessionStorage.setItem("HospitalName", HospitalName.hospitalName);
    // sessionStorage.setItem("HospitalNameMl", HospitalNameMl.hospitalName);
    // onSelect(config.key, { HospitalName, HospitalNameMl
    // });
=======
 

  const goNext = () => {
    
    sessionStorage.setItem("HospitalName", HospitalName.hospitalName);
    sessionStorage.setItem("HospitalNameMl", HospitalNameMl.hospitalName);

    onSelect(config.key, { HospitalName, HospitalNameMl
    });
   
    
>>>>>>> 9ccfd0d4cac1643e056426e511e5d3f9fdc5b2d9
  };
  
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null} */}
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!HospitalName}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
<<<<<<< HEAD
=======
        <div className="col-md-12">
>>>>>>> 9ccfd0d4cac1643e056426e511e5d3f9fdc5b2d9
          <div className="col-md-4">
            <CardLabel>
              {`${t("CR_HOSPITAL_EN")}`}
              {/* <span className="mandatorycss">*</span> */}
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="hospitalName"
              isMandatory={false}
              option={cmbhospital}
<<<<<<< HEAD
              selected={hospitalName}
              select={setselectHospitalName}
              placeholder={`${t("CR_HOSPITAL_EN")}`}
            />
          </div>
=======
              selected={HospitalName}
              select={setselectHospitalName}
              placeholder={`${t("CR_HOSPITAL_EN")}`}
            />
          </div>     
>>>>>>> 9ccfd0d4cac1643e056426e511e5d3f9fdc5b2d9
          <div className="col-md-4">
            <CardLabel>
              {`${t("CR_HOSPITAL_ML")}`}
              {/* <span className="mandatorycss">*</span> */}
            </CardLabel>
            <Dropdown
              t={t}
<<<<<<< HEAD
              optionKey="hospitalNamelocal"
              isMandatory={false}
              option={cmbhospital}
              selected={hospitalNameMl}
              select={setselectHospitalNameMl}
              placeholder={`${t("CR_HOSPITAL_ML")}`}
            />
          </div>
        </div>
=======
              optionKey="hospitalName"
              isMandatory={false}
              option={cmbhospital}
              selected={HospitalNameMl}
              select={setselectHospitalNameMl}
              placeholder={`${t("CR_HOSPITAL_ML")}`}
            />
          </div>     
          </div>  
           
        </div>
       
>>>>>>> 9ccfd0d4cac1643e056426e511e5d3f9fdc5b2d9
      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceHospital;
