import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/BOBRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const BornOutsideChildDetails = ({ config, onSelect, userType, formData }) => {
  // console.log(JSON.stringify(formData));
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const convertEpochFormateToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}/${month}/${year}`;
    } else {
      return null;
    }
  };
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let menu = [];

  // let workFlowCode = "BIRTHHOSP21";
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  const [childDOB, setChildDOB] = useState(formData?.BornOutsideChildDetails?.childDOB ? formData?.BornOutsideChildDetails?.childDOB : "");
  const [gender, selectGender] = useState(formData?.BornOutsideChildDetails?.gender);
  const [childAadharNo, setChildAadharNo] = useState(
    formData?.BornOutsideChildDetails?.childAadharNo ? formData?.BornOutsideChildDetails?.childAadharNo : ""
  );
  const [childFirstNameEn, setChildFirstNameEn] = useState(
    formData?.BornOutsideChildDetails?.childFirstNameEn ? formData?.BornOutsideChildDetails?.childFirstNameEn : ""
  );
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.BornOutsideChildDetails?.childMiddleNameEn ? formData?.BornOutsideChildDetails?.childMiddleNameEn : ""
  );
  const [childLastNameEn, setChildLastNameEn] = useState(
    formData?.BornOutsideChildDetails?.childLastNameEn ? formData?.BornOutsideChildDetails?.childLastNameEn : ""
  );
  const [childFirstNameMl, setChildFirstNameMl] = useState(
    formData?.BornOutsideChildDetails?.childFirstNameMl ? formData?.BornOutsideChildDetails?.childFirstNameMl : ""
  );
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.BornOutsideChildDetails?.childMiddleNameMl ? formData?.BornOutsideChildDetails?.childMiddleNameMl : ""
  );
  const [childLastNameMl, setChildLastNameMl] = useState(
    formData?.BornOutsideChildDetails?.childLastNameMl ? formData?.BornOutsideChildDetails?.childLastNameMl : ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [birthDateTime, setbirthDateTime] = useState(
    formData?.BornOutsideChildDetails?.birthDateTime ? formData?.BornOutsideChildDetails?.birthDateTime : ""
  );
  const [childPassportNo, setchildPassportNo] = useState(
    formData?.BornOutsideChildDetails?.childPassportNo ? formData?.BornOutsideChildDetails?.childPassportNo : ""
  );
  const [childArrivalDate, setchildArrivalDate] = useState( formData?.BornOutsideChildDetails?.childArrivalDate ? formData?.BornOutsideChildDetails?.childArrivalDate : "" );
  const [birthPlace, selectBirthPlace] = useState(
    formData?.BornOutsideChildDetails?.birthPlace ? formData?.BornOutsideChildDetails?.birthPlace : null
  );
  const [country, setcountry] = useState(formData?.BornOutsideChildDetails?.country ? formData?.BornOutsideChildDetails?.country  : null
    );
    const [provinceEn, setprovinceEn] = useState(formData?.BornOutsideChildDetails?.provinceEn ? formData?.BornOutsideChildDetails?.provinceEn  : ""
    );
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.BornOutsideChildDetails?.childAadharNo ? false : false);
  const [ChildPassportError, setChildPassportError] = useState(formData?.BornOutsideChildDetails?.childPassportNo ? false : false);
  const [childArrivalDateError, setchildArrivalDateError] = useState(formData?.BornOutsideChildDetails?.childArrivalDate ? false : false);

  const [DOBError, setDOBError] = useState(formData?.BornOutsideChildDetails?.childDOB ? false : false);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  function setselectGender(value) {
    selectGender(value);
  }
  function setSelectcountry(value) {
      setcountry(value);
     
    }
    function setSelectPostCode(e) {
      setPostCode(e.target.value);
    }
  function setselectChildDOB(value) {
    setChildDOB(value);
  }
  function setSelectArrivalDate(e) {
    setchildArrivalDate(e.target.value);
  }
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,"" )
      );
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectChildFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectChildMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectChildLastNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }

  function setSelectChildAadharNo(e) {
    // setContactno(e.target.value.length<=10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setAadharError(true);
        return false;
      } else if (e.target.value.length < 12) {
        setAadharError(true);
        setChildAadharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setChildAadharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setChildAadharNo(e.target.value);
      return true;
    }
  }

  function setSelectPassportNo(e) {
    setchildPassportNo(e.target.value);
  }

  function setSelectprovinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setProvinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
     
    }
  }
  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAadharError(false);
    }

    if (ChildPassportError) {
      validFlag = false;
      setChildPassportError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setChildPassportError(false);
    }
    if (childArrivalDateError) {
      validFlag = false;
      setchildArrivalDateError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setchildArrivalDateError(false);
    }
    if (validFlag == true) {
      sessionStorage.setItem("stateId", stateId ? stateId : null);
      sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      sessionStorage.setItem("childDOB", childDOB ? childDOB : null);
      sessionStorage.setItem("birthDateTime", birthDateTime ? birthDateTime : null);
      sessionStorage.setItem("gender", gender ? gender.code : null);
      sessionStorage.setItem("childAadharNo", childAadharNo ? childAadharNo : null);
      sessionStorage.setItem("childPassportNo", childPassportNo ? childPassportNo : null);
      sessionStorage.setItem("childArrivalDate", childArrivalDate ? childArrivalDate : null);
      sessionStorage.setItem("childFirstNameEn", childFirstNameEn ? childFirstNameEn : null);
      sessionStorage.setItem("childMiddleNameEn", childMiddleNameEn ? childMiddleNameEn : null);
      sessionStorage.setItem("childLastNameEn", childLastNameEn ? childLastNameEn : null);
      sessionStorage.setItem("childFirstNameMl", childFirstNameMl ? childFirstNameMl : null);
      sessionStorage.setItem("childMiddleNameMl", childMiddleNameMl ? childMiddleNameMl : null);
      sessionStorage.setItem("childLastNameMl", childLastNameMl ? childLastNameMl : null);
      sessionStorage.setItem("provinceEn", provinceEn ? provinceEn : null);
      sessionStorage.setItem("birthPlace", birthPlace.code);

      onSelect(config.key, {
        stateId,
        tenantId,
        childDOB,
        birthDateTime,
        gender,
        childAadharNo,
        childPassportNo,
        childArrivalDate,
        childFirstNameEn, childMiddleNameEn, childLastNameEn, childFirstNameMl, childMiddleNameMl, childLastNameMl,provinceEn,
        birthPlace,
      });
    }
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
  
  if (isLoading || isCountryLoading ){
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!childDOB || !gender || !birthPlace}>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{`${t("CS_COMMON_CHILD_AADHAAR")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="childAadharNo"
                  value={childAadharNo}
                   disable={isEdit}
                  onChange={setSelectChildAadharNo}
                  placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {`${t("CR_CHILD_PASSPORT_NO")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="childPassportNo"
                  value={childPassportNo}
                  onChange={setSelectPassportNo}
                  disable={isEdit}
                  placeholder={`${t("CR_CHILD_PASSPORT_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PASSPORT_NO") })}
                />
              </div>
              
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_DATE_OF_ARRIVAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childDOB}
                  name="childDOB"
                  max={convertEpochToDate(new Date())}
                  // min={childDOB ? childDOB : convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_ARRIVAL")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_DATE_OF_ARRIVAL") })}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_FIRST_NAME_EN")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childFirstNameEn"
                      value={childFirstNameEn}
                      onChange={setSelectChildFirstNameEn}
                      disable={isEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
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
                      name="childMiddleNameEn"
                      value={childMiddleNameEn}
                      onChange={setSelectChildMiddleNameEn}
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
                      name="childLastNameEn"
                      value={childLastNameEn}
                      onChange={setSelectChildLastNameEn}
                      disable={isEdit}
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
                      name="childFirstNameMl"
                      value={childFirstNameMl}
                      onChange={setSelectChildFirstNameMl}
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
                      name="childMiddleNameMl"
                      value={childMiddleNameMl}
                      onChange={setSelectChildMiddleNameMl}
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
                      name="childLastNameMl"
                      value={childLastNameMl}
                      onChange={setSelectChildLastNameMl}
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
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childDOB}
                  name="childDOB"
                  max={convertEpochToDate(new Date())}
                  // min={childDOB ? childDOB : convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker name="birthDateTime" onChange={(val) => handleTimeChange(val, setbirthDateTime)} value={birthDateTime} />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={gender}
                  select={setselectGender}
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_BIRTH")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
       
   <div className="row">
   <div className="col-md-12">
 <div className="col-md-4">
            <CardLabel>
              {`${t("CS_COMMON_COUNTRY")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbCountry}
              selected={country}
              select={setSelectcountry}
              placeholder={`${t("CS_COMMON_COUNTRY")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")} <span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="provinceEn"
              value={provinceEn}
              onChange={setSelectprovinceEn}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
            />
          </div>
          {/* <div className="col-md-6">
                <CardLabel>
                  {t("CR_PLACE_OF_BIRTH")}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={false}
                  option={cmbPlaceMaster}
                  selected={birthPlace}
                  select={setselectBirthPlace}
                  placeholder={`${t("CR_BIRTH_PLACE")}`}
                />
              </div> */}
          </div>
          
          </div>  

          {toast && (
            <Toast
              error={DOBError || ChildPassportError || AadharError || childArrivalDateError}
              label={
                DOBError || ChildPassportError || AadharError || childArrivalDateError
                  ? DOBError
                    ? t(`BIRTH_ERROR_DOB_CHOOSE`)
                    : AadharError
                    ? t(`BIRTH_ERROR_AADHAAR_NO_CHOOSE`)
                    : ChildPassportError
                    ? t(`BIRTH_ERROR_PASSPORT_NO_CHOOSE`)
                    : childArrivalDateError
                    ? t(`BIRTH_ERROR_ARRIVAL_DATE_CHOOSE`)
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
export default BornOutsideChildDetails;
