import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, NewRadioButton, TextArea,BackButton, Header } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Timeline from "../../components/DRTimeline";

const BirthCertificate = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {}; 
  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  const { data: gender } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [ChildName, setChildName] = useState(formData?.BirthCertificate?.ChildName);
  const [setGender, setSelectedGender] = useState(formData?.BirthCertificate?.setGender);
  const [BirthDate, setBirthDate] = useState(formData?.BirthCertificate?.BirthDate);
  const [MotherName, setMotherName] = useState(formData?.BirthCertificate?.MotherName);
  const [FatherName, setFatherName] = useState(formData?.BirthCertificate?.FatherName);
  const [setHospital, selectSetHospital] = useState(formData?.BirthCertificate?.setHospital);
  const [RegistrationNo, setRegistrationNo] = useState(formData?.BirthCertificate?.RegistrationNo);
  
  let naturetypecmbvalue = null; 
  const onSkip = () => onSelect();
  
  const goNext = () => {
    console.log("test");
    sessionStorage.setItem("GeneralRemarks", GeneralRemarks);
    onSelect(config.key, { GeneralRemarks });
  };
  function selectSetChildName(value) {
    setChildName(value);
  }
  function selectSetMotherName(value) {
    setMotherName(value);
  }KeyNo
  function selectSetFatherName(value) {
    setFatherName(value);
  }
  function selectBirthDate(value) {
    setBirthDate(value);
  }
  function selectSetRegistrationNo(value) {
    setRegistrationNo(value);
  }
  
  
  let cmbGender = [];
  gender &&
  gender["common-masters"] &&
  gender["common-masters"].Gender.map((ob) => {
      cmbGender.push(ob);
    });

   function selectGender(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedGender(value);
  }

  let cmbHospital = [];
  hospital &&
  hospital["common-masters"] &&
  hospital["common-masters"].Hospital.map((ob) => {
    cmbHospital.push(ob);
    });

   function selectSetHospital(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setHospital(value);
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <Header>BIRTH_CERTIFICATE</Header>
        <div>
          <div className="row">
            <div className="col-md-12">
            <div className="col-md-4">
            <CardLabel>
              {t("BC_CHILD_NAME")}
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="ChildName"
              value={ChildName}
              onChange={selectSetChildName}
              disable={isEdit}
              placeholder={`${t("BC_CHILD_NAME")}`}
            />
            </div>
            <div className="col-md-4">
            <CardLabel>{t("BC_BIRTH_DATE")}<span className="mandatorycss">*</span></CardLabel>
            <span>
            <DatePicker date={BirthDate} name="BirthDate" onChange={selectBirthDate} {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: true, type: "text", title: t("CR_INVALID_DATE") })}/>        
            </span>
            </div>
            <div className="col-md-4">
            <CardLabel>{`${t("BC_CHILD_GENDER")}`} <span className="mandatorycss">*</span> </CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbGender}
              selected={setGender}
              select={selectGender}
              disabled={isEdit}
              placeholder={`${t("BC_CHILD_GENDER")}`}
              {...(validation = { isRequired: false, title: t("CR_INVALID_GENDER") })}
            />
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-4">
            <CardLabel>
              {t("BC_MOTHER_NAME")}
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="MotherName"
              value={MotherName}
              onChange={selectSetMotherName}
              disable={isEdit}
              placeholder={`${t("BC_MOTHER_NAME")}`}
            />
            </div>
            </div>
            <div className="row">
            <div className="col-md-4">
            <CardLabel>
              {t("BC_FATHER_NAME")}
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="FatherName"
              value={FatherName}
              onChange={selectSetFatherName}
              disable={isEdit}
              placeholder={`${t("BC_FATHER_NAME")}`}
            />
            </div>
            <div className="col-md-4">
            <CardLabel>{`${t("BC_HOSPITAL_NAME")}`} <span className="mandatorycss">*</span> </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbHospital}
              selected={setHospital}cmbGender
              select={selectSetHospital}
              disabled={isEdit}
              placeholder={`${t("BC_HOSPITAL_NAME")}`}
            />
            </div>
            </div>
            <div className="row">
            <div className="col-md-4">
            <CardLabel>
              {t("BC_REGISTRATION_NO")}
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="RegistrationNo"
              value={RegistrationNo}
              onChange={selectSetRegistrationNo}
              disable={isEdit}
              placeholder={`${t("BC_REGISTRATION_NO")}`}
            />
            </div>
        </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default BirthCertificate;