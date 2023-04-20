import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, CheckBox, BackButton, } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const FamilyAbandonedDeath = ({ config, onSelect,  formData, isEditAbandonedDeath }) => {
  
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Spouse = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "SpouseType");
  let cmbspouse = [];
  Spouse &&
    Spouse["birth-death-service"] && Spouse["birth-death-service"].spouseType &&
    Spouse["birth-death-service"].spouseType?.map((ob) => {
      cmbspouse.push(ob);
    });
  const [SpouseType, setSpouseType] = useState(
    formData?.FamilyInfoDeathAbandoned?.SpouseType?.code
      ? formData?.FamilyInfoDeathAbandoned?.SpouseType
      : formData?.FamilyInfoDeathAbandoned?.SpouseType
      ? cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.FamilyInfoDeathAbandoned?.SpouseType)[0]
      : ""
  );
  const [SpouseUnavailable, setSpouseUnavailable] = useState(
    formData?.FamilyInfoDeathAbandoned?.SpouseUnavailable
      ? formData?.FamilyInfoDeathAbandoned?.SpouseUnavailable
      : formData?.FamilyInfoDeathAbandoned?.SpouseUnavailable
      ? formData?.FamilyInfoDeathAbandoned?.SpouseUnavailable
      : false
  );
  // const [Nationality, setSelectedNationality] = useState(
  //   formData?.InformationDeath?.Nationality?.code
  //     ? formData?.InformationDeath?.Nationality
  //     : formData?.InformationDeath?.Nationality
  //     ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
  //     : ""
  // );
  // const [SpouseType, setSpouseType] = useState(
  //   formData?.FamilyInfoDeathAbandoned?.SpouseType?.code
  //     ? formData?.FamilyInfoDeathAbandoned?.SpouseType
  //     : formData?.FamilyInfoDeathAbandoned?.SpouseType
  //     ? cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.InformationDeath?.SpouseType)[0]
  //     : null
  // );
  const [SpouseNameEN, setSpouseNameEN] = useState(
    formData?.FamilyInfoDeathAbandoned?.SpouseNameEN?
    formData?.FamilyInfoDeathAbandoned?.SpouseNameEN : ""
  );

  // const [SpouseNameEN, setSpouseNameEN] = useState(
  //   formData?.FamilyInfoDeathAbandoned?.SpouseNameEN ? formData?.FamilyInfoDeathAbandoned?.SpouseNameEN : ""
  // );
  const [SpouseNameMl, setSpouseNameMl] = useState(
    formData?.FamilyInfoDeathAbandoned?.SpouseNameMl ? formData?.FamilyInfoDeathAbandoned?.SpouseNameMl : ""
  );
  const [SpouseAadhaar, setSpouseAadhaar] = useState(
    formData?.FamilyInfoDeathAbandoned?.SpouseAadhaar ? formData?.FamilyInfoDeathAbandoned?.SpouseAadhaar : ""
  );

  const [FatherUnavailable, setFatherUnavailablechecked] = useState(
    formData?.FamilyInfoDeathAbandoned?.FatherUnavailable
      ? formData?.FamilyInfoDeathAbandoned?.FatherUnavailable
      : formData?.FamilyInfoDeathAbandoned?.FatherUnavailable
      ? formData?.FamilyInfoDeathAbandoned?.FatherUnavailable
      : false
  );
  const [FatherNameEn, setFatherNameEn] = useState(
    formData?.FamilyInfoDeathAbandoned?.FatherNameEn ? formData?.FamilyInfoDeathAbandoned?.FatherNameEn : ""
  );
  const [FatherNameMl, setFatherNameMl] = useState(
    formData?.FamilyInfoDeathAbandoned?.FatherNameMl ? formData?.FamilyInfoDeathAbandoned?.FatherNameMl : ""
  );
  const [FatherAadharNo, setFatherAadharNo] = useState(
    formData?.FamilyInfoDeathAbandoned?.FatherAadharNo ? formData?.FamilyInfoDeathAbandoned?.FatherAadharNo : ""
  );
  const [MotherUnavailable, setMotherUnavailable] = useState(
    formData?.FamilyInfoDeathAbandoned?.MotherUnavailable ? formData?.FamilyInfoDeathAbandoned?.MotherUnavailable : false
  );
  const [MotherNameEn, setMotherNameEn] = useState(
    formData?.FamilyInfoDeathAbandoned?.MotherNameEn ? formData?.FamilyInfoDeathAbandoned?.MotherNameEn : ""
  );
  const [MotherNameMl, setMotherNameMl] = useState(
    formData?.FamilyInfoDeathAbandoned?.MotherNameMl ? formData?.FamilyInfoDeathAbandoned?.MotherNameMl : ""
  );
  const [MotherAadharNo, setMotherAadharNo] = useState(
    formData?.FamilyInfoDeathAbandoned?.MotherAadharNo ? formData?.FamilyInfoDeathAbandoned?.MotherAadharNo : ""
  );

  const [FamilyMobileNo, setFamilyMobileNo] = useState(
    formData?.FamilyInfoDeathAbandoned?.FamilyMobileNo ? formData?.FamilyInfoDeathAbandoned?.FamilyMobileNo : ""
  );

  const [FamilyEmailId, setFamilyEmailId] = useState(
    formData?.FamilyInfoDeathAbandoned?.FamilyEmailId ? formData?.FamilyInfoDeathAbandoned?.FamilyEmailId : ""
  );
  const [inputValue, setInputValue] = useState("");
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);

  const onSkip = () => onSelect();
  // function setFatherUnavailablechecked(e){
  //   if (e.target.checked === true) {
  //     setFatherUnavailable(e.target.checked);("")
  //     setSelectFatherNameEn
  //     setFatherNameMl("");
  //     setFatherAadharNo("");
  //   } else {
  //     setFatherUnavailable(e.target.checked);
  //     setDateOfDeath("");
  //     setDeathTime("");
  //   }
  // }
  function setSelectFatherNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectFatherNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectFatherAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    // Check if the new value is the same as the Mother's Aadhar number
    if (newValue === MotherAadharNo || newValue === SpouseAadhaar) {
      // If so, clear the Father's Aadhar number field
      setFatherAadharNo("");
      setAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
    } else {
      setFatherAadharNo(newValue);
    }
  }

  function setSelectSpouseType(value) {
    setSpouseType(value);
  }

  function setSelectSpouseNameEN(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setSpouseNameEN(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectSpouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setSpouseNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }

    function setSelectSpouseAadhaar(e) {
      const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
      if (newValue === MotherAadharNo|| newValue === FatherAadharNo) {
        // If so, clear the Father's Aadhar number field
        setSpouseAadhaar("");
        setAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      } else {
        setSpouseAadhaar(newValue);
      }
      
    }
  // if (e.target.value.trim().length >= 0) {
    //   setSpouseAadhaar(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }

  function setSelectMotherNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectMotherNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectMotherAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    // Check if the new value is the same as the Father's Aadhar number
    if (newValue === FatherAadharNo || newValue === SpouseAadhaar ) {
      // If so, clear the Mother's Aadhar number field
      setMotherAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setMotherAadharNo(newValue);
    }
    // if (e.target.value.trim().length >= 0) {
    //   setMotherAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
  }
  function setSelectFamilyMobileNo(e) {
    // const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value.trim().length >= 0) {
        setFamilyMobileNo(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10))
        // if (e.target.value < 10) {
        //   setFamilyMobileNo(e.target.value);
        //   // setMotherAgeMarriageError(true);
        //   return false;
        // } else {
        //   setFamilyMobileNo(e.target.value);
        //   // setMotherAgeMarriageError(false);
        // }
      } else {
        // setMotherAgeMarriageError(true);
        return false;
      }
    }
  }
  function setSelectFamilyEmailId(e) {
    setFamilyEmailId(e.target.value);
  }

  const goNext = () => {
    sessionStorage.setItem("SpouseType", SpouseType ? SpouseType.code : null);
    sessionStorage.setItem("SpouseNameEN", SpouseNameEN ? SpouseNameEN : null);
    sessionStorage.setItem("SpouseNameMl", SpouseNameMl ? SpouseNameMl : null);
    sessionStorage.setItem("SpouseAadhaar", SpouseAadhaar ? SpouseAadhaar : null);
    sessionStorage.setItem("FatherNameEn", FatherNameEn ? FatherNameEn : null);
    sessionStorage.setItem("FatherNameMl", FatherNameMl ? FatherNameMl : null);
    sessionStorage.setItem("FatherAadharNo", FatherAadharNo ? FatherAadharNo : null);
    sessionStorage.setItem("MotherNameEn", MotherNameEn ? MotherNameEn : null);
    sessionStorage.setItem("MotherNameMl", MotherNameMl ? MotherNameMl : null);
    sessionStorage.setItem("MotherAadharNo", MotherAadharNo ? MotherAadharNo : null);
    sessionStorage.setItem("FatherUnavailable", FatherUnavailable);
    sessionStorage.setItem("MotherUnavailable", MotherUnavailable);
    sessionStorage.setItem("SpouseUnavailable", SpouseUnavailable);
    sessionStorage.setItem("FamilyMobileNo", FamilyMobileNo);
    sessionStorage.setItem("FamilyEmailId", FamilyEmailId);

    onSelect(config.key, {
      SpouseType,
      SpouseNameEN,
      SpouseNameMl,
      SpouseAadhaar,
      FatherNameEn,
      FatherNameMl,
      FatherAadharNo,
      MotherNameEn,
      MotherNameMl,
      MotherAadharNo,
      FatherUnavailable,
      MotherUnavailable,
      SpouseUnavailable,
      FamilyMobileNo,
      FamilyEmailId,
    });
  };

  if (isEditAbandonedDeath) {
    if (formData?.FamilyInfoDeathAbandoned?.SpouseType != null) {
      if (cmbspouse.length > 0 && (SpouseType === undefined || SpouseType === "")) {
        setSpouseType(cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.FamilyInfoDeathAbandoned?.SpouseType)[0]);
      }
    }
  }

  // const handleBlur = (event) => {
  //   const value = event.target.value;
  //   if (value.length > 12) {
  //     setInputValue(value.slice(0, 12));
  //   } else {
  //     setInputValue(value);
  //   }
  // };
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}

      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FAMILY_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_SPOUSE_UNAVAILABLE")}
                onChange={() => setSpouseUnavailable(!SpouseUnavailable)}
                value={SpouseUnavailable}
                checked={SpouseUnavailable}
              />
            </div>
          </div>
        </div>
        {SpouseUnavailable ? null 
        : (
          // <div style={{ pointerEvents: isSpouseChecked ? "none" : "all", opacity: isSpouseChecked ? 0.5 : 1 }}>
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SPOUSE_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                   <CardLabel>
                    {`${t("CR_SPOUSE_TYPE_EN")}`}
                  </CardLabel> 
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbspouse}
                    selected={SpouseType}
                    select={setSelectSpouseType}
                    placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NAME")}`}
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameEN"
                    value={SpouseNameEN}
                    onChange={setSelectSpouseNameEN}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`}
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameMl"
                    value={SpouseNameMl}
                    onChange={setSelectSpouseNameMl}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: false,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="SpouseAadhaar"
                    value={SpouseAadhaar}
                    onChange={setSelectSpouseAadhaar}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_FATHER_UNAVAILABLE")}
                onChange={() => setFatherUnavailablechecked(!FatherUnavailable)}
                value={FatherUnavailable}
                checked={FatherUnavailable}
              />
            </div>
          </div>
        </div>
        {FatherUnavailable ? null : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                 <CardLabel>
                    {`${t("CR_NAME")}`}
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherNameEn"
                    value={FatherNameEn}
                    onChange={setSelectFatherNameEn}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`} 
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherNameMl"
                    value={FatherNameMl}
                    onChange={setSelectFatherNameMl}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: false,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="FatherAadharNo"
                    value={FatherAadharNo}
                    onChange={setSelectFatherAadharNo}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_MOTHER_UNAVAILABLE")}
                onChange={() => setMotherUnavailable(!MotherUnavailable)}
                value={MotherUnavailable}
                checked={MotherUnavailable}
              />
            </div>
          </div>
        </div>
        {MotherUnavailable ? null : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                   <CardLabel>
                    {`${t("CR_NAME")}`}
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="text"
                    optionKey="i18nKey"
                    name="MotherNameEn"
                    value={MotherNameEn}
                    onChange={setSelectMotherNameEn}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern:  "^[a-zA-Z-.`' ]*$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                   <CardLabel>
                    {`${t("CR_NAME_ML")}`}
                
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherNameMl"
                    value={MotherNameMl}
                    onChange={setSelectMotherNameMl}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: false,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherAadharNo"
                    value={MotherAadharNo}
                    onChange={setSelectMotherAadharNo}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CONTACT_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FAMILY_MOBILE_NO")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="FamilyMobileNo"
                value={FamilyMobileNo}
                onChange={setSelectFamilyMobileNo}
                placeholder={`${t("CR_FAMILY_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9 ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PHONE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_EMAIL_ID")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"email"}
                optionKey="i18nKey"
                name="FamilyEmailId"
                value={FamilyEmailId}
                onChange={setSelectFamilyEmailId}
                placeholder={`${t("CR_EMAIL_ID")}`}
                {...(validation = { isRequired: false, type: "email", title: t("CR_INVALID_EMAIL_ID") })}
              />
            </div>
          </div>
        </div>
        {/*  */}
        {/* {toast && (
          <Toast
            error={AadharError}
            label={AadharError ? (AadharError ? t(`CS_COMMON_INVALID_AADHAR_NO`) : setToast(false)) : setToast(false)}
            onClose={() => setToast(false)}
          />
        )} */}
      </FormStep>
    </React.Fragment>
  );
};
export default FamilyAbandonedDeath;
