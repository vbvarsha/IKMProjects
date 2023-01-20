import React, { useState,useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, InputCard } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const InformationDeath = ({ config, onSelect, userType, formData }) => {
  // const [dob, setDob] = useState("");
  // const calculateAge = (value) => {
  //   const today = new Date();
  //   const birthDate = new Date(value);
  //   let age_in_ms = today - birthDate;
  //   let age_in_years = age_in_ms / (1000 * 60 * 60 * 24 * 365);
  //   setAgeofbirth(Math.floor(age_in_years));
  // };

  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  // const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "IdProof");
  const { data: AgeUnit = {}, isAgeUnitLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AgeUnit");
  const [Gender, setselectedGender] = useState(formData?.InformationDeath?.Gender);
  // const [setTitle, setSelectedTitle] = useState(formData?.InformationDeath?.setTitle);
  // const [setTitleB, setSelectedTitleB] = useState(formData?.InformationDeath?.setTitleB);
  const [setNationality, setSelectedNationality] = useState(formData?.InformationDeath?.setNationality);
  const [setReligion, setSelectedReligion] = useState(formData?.InformationDeath?.setReligion);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [FirstName, setFirstName] = useState(formData?.InformationDeath?.FirstName ? formData?.InformationDeath?.FirstName : "");
  const [MiddleName, setMiddleName] = useState(formData?.InformationDeath?.MiddleName ? formData?.InformationDeath?.MiddleName : "");
  const [LastName, setLastName] = useState(formData?.InformationDeath?.LastName ? formData?.InformationDeath?.LastName : "");
  const [MLFirstName, setMLFirstName] = useState(formData?.InformationDeath?.MLFirstName ? formData?.InformationDeath?.MLFirstName : "");
  const [MlMiddleName, setMlMiddleName] = useState(formData?.InformationDeath?.MlMiddleName ? formData?.InformationDeath?.MlMiddleName : "");
  const [MlLastName, setMlLastName] = useState(formData?.InformationDeath?.MlLastName ? formData?.InformationDeath?.MlLastName : "");
  const [Ageofbirth, setAgeofbirth] = useState(formData?.InformationDeath?.Ageofbirth ? formData?.InformationDeath?.Ageofbirth : "");
  const [AdharNo, setAdharNo] = useState(formData?.InformationDeath?.AdharNo ? formData?.InformationDeath?.AdharNo : "");
  const [IdNo, setIdNo] = useState(formData?.InformationDeath?.IdNo ? formData?.InformationDeath?.IdNo : "");
  const [CommencementDate, setCommencementDate] = useState(
    formData?.InformationDeath?.CommencementDate ? formData?.InformationDeath?.CommencementDate : ""
  );
  const [DeathDate, setDeathDate] = useState(formData?.InformationDeath?.DeathDate ? formData?.InformationDeath?.DeathDate : "");
  const [FromDate, setFromDate] = useState(formData?.InformationDeath?.FromDate ? formData?.InformationDeath?.FromDate : "");
  const [ToDate, setToDate] = useState(formData?.InformationDeath?.ToDate ? formData?.InformationDeath?.ToDate : "");
  const [DeathTimeFrom, setDeathTimeFrom] = useState(formData?.InformationDeath?.DeathTimeFrom ? formData?.InformationDeath?.DeathTimeFrom : "");
  const [DeathTimeTo, setDeathTimeTo] = useState(formData?.InformationDeath?.DeathTimeTo ? formData?.InformationDeath?.DeathTimeTo : "");
  const [DeathTime, setDeathTime] = useState(formData?.InformationDeath?.DeathTime ? formData?.InformationDeath?.DeathTime : "");
  const [checked, setChecked] = useState(formData?.InformationDeath?.checked ? formData?.InformationDeath?.checked : false);
  const [setAgeUnit, setSelectedAgeUnit] = useState(formData?.InformationDeath?.setAgeUnit ? formData?.InformationDeath?.setAgeUnit : "");
  const [setIdCombo, setSelectedIdCombo] = useState(formData?.InformationDeath?.setIdCombo ? formData?.InformationDeath?.setIdCombo : "");

  // const [selectedValues,  ] = useState(
  //   formData?.InformationDeath?.selectedValues ? formData?.InformationDeath?.selectedValues : false
  // );
  // const handleCheckboxChange = (event) => {
  //   setChecked((checked) => !checked); // toggle the checked state
  //   let newSelectedValues = [...selectedValues];
  //   if (event.target.checked) {
  //     newSelectedValues.push(event.target.value);
  //   } else {
  //     newSelectedValues = newSelectedValues.filter((value) => value !== event.target.value);
  //   }
  //   setSelectedValues(newSelectedValues);
  // };
  let naturetypecmbvalue = null;
  const maxDate = new Date();
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  // let cmbTitle = [];
  // title &&
  //   title["common-masters"] &&
  //   title["common-masters"].Title.map((ob) => {
  //     cmbTitle.push(ob);
  //   });
  let cmbReligion = [];
  religion &&
    religion["common-masters"] &&
    religion["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  let cmbDocumentType = [];
  documentType &&
    documentType["common-masters"] &&
    documentType["common-masters"].IdProof.map((ob) => {
      cmbDocumentType.push(ob);
    });
  let cmbAgeUnit = [];
  AgeUnit &&
    AgeUnit["birth-death-service"] &&
    AgeUnit["birth-death-service"].AgeUnit.map((ob) => {
      cmbAgeUnit.push(ob);
    });

  function selectReligion(value) {
    setSelectedReligion(value);
  }
  // function selectTitle(value) {
  //   setSelectedTitle(value);
  // }
  // function selectTitleB(value) {
  //   setSelectedTitleB(value);
  // }
  function selectNationality(value) {
    setSelectedNationality(value);
  }
  function selectGender(value) {
    console.log("gender" + value);
    setselectedGender(value);
  }
  function setSelectMlLastName(e) {
    setMlLastName(e.target.value);
  }
  function setSelectMlMiddleName(e) {
    setMlMiddleName(e.target.value);
  }
  function setSelectMLFirstName(e) {
    setMLFirstName(e.target.value);
  }
  function setSelectFirstName(e) {
    setFirstName(e.target.value);
  }
  function setSelectMiddleName(e) {
    setMiddleName(e.target.value);
  }
  function setSelectLastName(e) {
    setLastName(e.target.value);
  }
  function setSelectAgeofbirth(e) {
    setAgeofbirth(e.target.value);
  }
  function setSelectAdharNo(e) {
    setAdharNo(e.target.value);
  }
  function setSelectIdNo(e) {
    console.log("Test" + e);
    setIdNo(e.target.value);
  }
  function selectDeathDate(value) {
    setDeathDate(value);
  }
  function selectFromDate(value) {
    setFromDate(value);
  }
  function selectToDate(value) {
    setToDate(value);
  }
  function selectAgeUnit(value) {
    setSelectedAgeUnit(value);
  }
  function selectIdCombo(value) {
    setSelectedIdCombo(value);
  }
  function calculateAge(value) {
    setCommencementDate(value);
    const today = new Date();
    const birthDate = new Date(value);
    let age_in_ms = today - birthDate;
    let age_in_years = age_in_ms / (1000 * 60 * 60 * 24 * 365);
    setAgeofbirth(Math.floor(age_in_years));
  }
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const handleFromTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const handleToTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const onSkip = () => onSelect();
  let cmbfilterNation = [];
  let cmbfilterReligion =[];
  let cmbfilterAgeUnit = [];
  useEffect(() => {
    if (setNationality == null || setNationality == '') {
        if (stateId === "kl" && cmbNation.length > 0) {
            cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes('Indian'));
            setSelectedNationality(cmbfilterNation[0]);
        }
    }
    if (setReligion == null || setReligion == '') {
      if (stateId === "kl" && cmbReligion.length > 0) {
          cmbfilterReligion = cmbReligion.filter((cmbReligion) => cmbReligion.name.includes('No Religion'));
          setSelectedReligion(cmbfilterReligion[0]);
      }
  }
  if (setAgeUnit == null || setAgeUnit == '') {
    if (stateId === "kl" && cmbAgeUnit.length > 0) {
        cmbfilterAgeUnit = cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.name.includes('Years'));
        setSelectedAgeUnit(cmbfilterAgeUnit[0]);
    }
}
    
}, )
  const goNext = () => {
    sessionStorage.setItem("DeathDate", DeathDate ? DeathDate : null);
    sessionStorage.setItem("DeathTime", DeathTime ? DeathTime : null);
    sessionStorage.setItem("FirstName", FirstName ? FirstName : null);
    sessionStorage.setItem("MiddleName", MiddleName ? MiddleName : null);
    sessionStorage.setItem("LastName", LastName ? LastName : null);
    sessionStorage.setItem("MLFirstName", MLFirstName ? MLFirstName : null);
    sessionStorage.setItem("MlMiddleName", MlMiddleName ? MlMiddleName : null);
    sessionStorage.setItem("MlLastName", MlLastName ? MlLastName : null);
    sessionStorage.setItem("Ageofbirth", Ageofbirth ? Ageofbirth : null);
    sessionStorage.setItem("AdharNo", AdharNo ? AdharNo : null);
    sessionStorage.setItem("IdNo", IdNo ? IdNo : null);
    sessionStorage.setItem("FromDate", FromDate ? FromDate : null);
    sessionStorage.setItem("ToDate", ToDate ? ToDate : null);
    // sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    // sessionStorage.setItem("setTitleB", setTitleB ? setTitleB.code : null);
    sessionStorage.setItem("setNationality", setNationality ? setNationality.code : null);
    sessionStorage.setItem("setReligion", setReligion ? setReligion.code : null);
    sessionStorage.setItem("DeathTimeTo", DeathTimeTo ? DeathTimeTo : null);
    sessionStorage.setItem("DeathTimeFrom", DeathTimeFrom ? DeathTimeFrom : null);
    sessionStorage.setItem("Gender", Gender ? Gender.code : null);
    sessionStorage.setItem("CommencementDate", CommencementDate ? CommencementDate : null);
    sessionStorage.setItem("setIdCombo", setIdCombo ? setIdCombo.code : null);
    sessionStorage.setItem("setAgeUnit", setAgeUnit ? setAgeUnit.code : null);
    sessionStorage.setItem("setIdCombo", setIdCombo ? setIdCombo.code : null);
    // sessionStorage.setItem("selectedValues", selectedValues ? selectedValues : true);

    onSelect(config.key, {
      setIdCombo,
      DeathDate,
      DeathTime,
      FirstName,
      MiddleName,
      LastName,
      MLFirstName,
      MlMiddleName,
      MlLastName,
      Ageofbirth,
      AdharNo,
      IdNo,
      FromDate,
      ToDate,
      CommencementDate,
      Gender,
      // setTitle,
      // setTitleB,
      setNationality,
      setReligion,
      DeathTimeFrom,
      DeathTimeTo,
      setAgeUnit,
      setIdCombo,
        // selectedValues,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        {/* //    isDisabled={!CommencementDate} */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}onChange={() => setChecked((checked) => !checked)} value={checked} />
            </div>
            <div className="col-md-6">
              <CheckBox label={t("CR_UNCLAIMED_DEAD_BODY")}  />
            </div>
          </div>
        </div>
        <div>
          {checked ? (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>
                    {t("CR_FROM_DATE")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <DatePicker
                    date={FromDate}
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
                <div className="col-md-3">
                  <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
                  <CustomTimePicker name="DeathTimeFrom" onChange={(val) => handleFromTimeChange(val, setDeathTimeFrom)} value={DeathTimeFrom} />
                </div>

                <div className="col-md-3">
                  <CardLabel>
                    {t("CR_TO_DATE")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <DatePicker
                    date={ToDate}
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
                <div className="col-md-3">
                  <CardLabel>{t("CR_TO_TIME")}</CardLabel>
                  <CustomTimePicker name="DeathTimeTo" onChange={(val) => handleToTimeChange(val, setDeathTimeTo)} value={DeathTimeTo} />
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>
                    {t("CR_DATE_OF_DEATH")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  {/* date={CommencementDate} */}
                  <DatePicker
                    date={DeathDate}
                    name="DeathDate"
                    onChange={selectDeathDate}
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
                  <CustomTimePicker name="DeathTime" onChange={(val) => handleTimeChange(val, setDeathTime)} value={DeathTime} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-3">
              <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTitle}
                selected={setTitle}
                select={selectTitle}
                disabled={isEdit}
                placeholder={`${t("CR_TITLE_NAME_EN")}`}
              />
            </div> */}
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="FirstName"
                value={FirstName}
                onChange={setSelectFirstName}
                disable={isEdit}
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
                name="MiddleName"
                value={MiddleName}
                onChange={setSelectMiddleName}
                disable={isEdit}
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
                name="LastName"
                value={LastName}
                onChange={setSelectLastName}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-3">
              <CardLabel>{`${t("CR_TITLE_NAME_ML")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="namelocal"
                isMandatory={false}
                option={cmbTitle}
                selected={setTitleB}
                select={selectTitleB}
                disabled={isEdit}
                placeholder={`${t("CR_TITLE_NAME_ML")}`}
              />
            </div> */}
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
                name="MLFirstName"
                value={MLFirstName}
                onChange={setSelectMLFirstName}
                disable={isEdit}
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
                name="MlMiddleName"
                value={MlMiddleName}
                onChange={setSelectMlMiddleName}
                disable={isEdit}
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
                name="MlLastName"
                value={MlLastName}
                onChange={setSelectMlLastName}
                disable={isEdit}
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
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_GENDER")} <span className="mandatorycss">*</span>{" "}
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menu}
                selected={Gender}
                select={selectGender}
                disabled={isEdit}
                placeholder={`${t("CR_GENDER")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_GENDER") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_DATE_OF_BIRTH_DECEASED")}`}</CardLabel>
              {/* date={CommencementDate} */}
              {/* <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate} placeholder={`${t("CR_DATE_OF_BIRTH_DECEASED")}`} /> */}
              <DatePicker
                t={t}
                isMandatory={false}
                optionKey="i18nKey"
                className="employee-card-input"
                type="date"
                name="CommencementDate"
                inputFormat="DD/MM/YYYY"
                date={CommencementDate}
                minDate={new Date("1900-31-01")}
                maxDate={maxDate}
                onChange={calculateAge}
                placeholder={`${t("CR_DATE_OF_BIRTH_DECEASED")}`}
              />
            </div>
            <div className="col-md-2">
              <CardLabel>
                {`${t("CR_AGE_OF_BIRTH")}`}
                <span className="mandatorycss">*</span>{" "}
              </CardLabel>
              <input
                className="employee-card-input"
                name="Ageofbirth"
                type="text"
                onChange={setSelectAgeofbirth}
                value={Ageofbirth}
                placeholder={`${t("CR_AGE_OF_BIRTH")}`}
                {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AGE") })}
              />

              {/* <TextInput
              
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="Ageofbirth"
                value={Ageofbirth}
                onChange={setSelectAgeofbirth}
                disable={isEdit}
                placeholder={`${t("CR_AGE_OF_BIRTH")}`}
                {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AGE") })}
                // {...(validation = { pattern: "^([0-9]){2}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AGE") })}
              /> */}
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
                option={cmbAgeUnit}
                selected={setAgeUnit}
                select={selectAgeUnit}
                disabled={isEdit}
                placeholder={`${t("CR_AGE_UNIT")}`}
              />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AADHAR_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CR_AADHAR_OF_DECEASED")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type="number"
                max="12"
                optionKey="i18nKey"
                name="AdharNo"
                value={AdharNo}
                onChange={setSelectAdharNo}
                disable={isEdit}
                placeholder={`${t("CR_AADHAR_OF_DECEASED")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ID_DETAILS_OF_DECEASED")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbDocumentType}
                selected={setIdCombo}
                select={selectIdCombo}
                disabled={isEdit}
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
                name="IdNo"
                value={IdNo}
                onChange={setSelectIdNo}
                disable={isEdit}
                placeholder={`${t("CR_ID_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PASSPORT_DETAILS_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_NATIONALITY")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="nationalityname"
                isMandatory={false}
                option={cmbNation}
                selected={setNationality}
                select={selectNationality}
                disabled={isEdit}
                placeholder={`${t("CR_NATIONALITY")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbReligion}
                selected={setReligion}
                select={selectReligion}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_RELIGION")}`}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default InformationDeath;
