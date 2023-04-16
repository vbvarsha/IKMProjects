import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast, LanguageIcon } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Timeline from "../../components/CRTimeline";

const InitiatorDetails = ({ config, onSelect, userType, formData, isEditBirth = false }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const cmbRelation = [
    { i18nKey: "Father", code: "FATHER" },
    { i18nKey: "Mother", code: "MOTHER" },
    { i18nKey: "Others", code: "OTHERS" },
  ];  
  // console.log(Digit.UserService.getUser().info);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : false);
  const { name: name, } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const { mobileNumber: mobileNumber, } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [isCaretaker, setIsCaretaker] = useState(formData?.InitiatorinfoDetails?.isCaretaker ? formData?.InitiatorinfoDetails?.isCaretaker : formData?.ChildDetails?.InitiatorinfoDetails?.isCaretaker ? formData?.ChildDetails?.InitiatorinfoDetails?.isCaretaker : false);
  const [relation, setrelation] = useState(formData?.InitiatorinfoDetails?.relation.code ? formData?.InitiatorinfoDetails?.relation : formData?.ChildDetails?.InitiatorinfoDetails?.relation ? cmbRelation.filter(cmbRelation => cmbRelation.code === formData?.ChildDetails?.InitiatorinfoDetails?.relation)[0] : "");
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? formData?.InitiatorinfoDetails?.initiatorNameEn : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn : name);
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? formData?.InitiatorinfoDetails?.initiatorAadhar : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? formData?.InitiatorinfoDetails?.initiatorMobile : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile : mobileNumber);
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? formData?.InitiatorinfoDetails?.initiatorDesi : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi : "");
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.InitiatorinfoDetails?.initiatorAddress ? formData?.InitiatorinfoDetails?.initiatorAddress : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? false : false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? false : false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? false : false);

  const onSkip = () => onSelect();
  
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
      }
      if (formData?.InitiatorinfoDetails?.isCaretaker != null) {
        setIsInitialRender(false);
        setIsCaretaker(formData?.InitiatorinfoDetails?.isCaretaker);
      }
    }
  }, [isInitialRender]);

  function setSelectrelation(value) {
    setrelation(value);
  }

  // function setSelectrelation(e) {
  //   if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
  //     setrelation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
  //   }
  // }

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9, ]*$") != null)) {
      setinitiatorAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }


  function setSelectinitiatorAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
    // if (e.target.value.length != 0) {
    //   if (e.target.value.length > 12) {
    //     // setChildAadharNo(e.target.value);
    //     setinitiatorAadharError(true);
    //     return false;
    //   } else if (e.target.value.length < 12) {
    //     setinitiatorAadharError(true);
    //     setinitiatorAadhar(e.target.value);
    //     return false;
    //   } else {
    //     setinitiatorAadharError(false);
    //     setinitiatorAadhar(e.target.value);
    //     return true;
    //   }
    // } else {
    //   setinitiatorAadharError(false);
    //   setinitiatorAadhar(e.target.value);
    //   return true;
    // }
  }
  // function setSelectinitiatorAadhar(e) {

  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setinitiatorAadhar(e.target.value);
  //       return false;
  //     } else {
  //       setinitiatorAadhar(e.target.value);
  //     }
  //   } else {
  //     setinitiatorAadhar(e.target.value);
  //   }
  // }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  // function setSelectinitiatorMobile(e) {
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 10) {
  //       return false;
  //     } else if (e.target.value.length < 10) {
  //       setinitiatorMobile(e.target.value);
  //       return false;
  //     } else {
  //       setinitiatorMobile(e.target.value);
  //     }
  //   } else {
  //     setinitiatorMobile(e.target.value);
  //   }
  // }

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }

  function setCaretaker(e) {
    if (e.target.checked == true) {
      setIsCaretaker(e.target.checked);

      setinitiatorDesi("");

    } else {
      setIsCaretaker(e.target.checked);
    }
  }

  let validFlag = true;
  const goNext = () => {
    // if (relation == null || relation == "" || relation == undefined) {
    //   validFlag = false;
    //   setrelationnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setrelationnError(false);
    // }
    if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }
    if (isCaretaker === true) {


      if (initiatorDesi == null || initiatorDesi == "" || initiatorDesi == undefined) {
        validFlag = false;
        setinitiatorDesiError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorDesiError(false);
      }
    }
    if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
      let adharLength = initiatorAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinitiatorAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAadharError(false);
      }
    } else {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
      let mobileLength = initiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinitiatorMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorMobileError(false);
      }
    } else {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (validFlag == true) {
      // sessionStorage.setItem("relation", relation ? relation : null);
      // sessionStorage.setItem("initiatorNameEn", initiatorNameEn ? initiatorNameEn : null);
      // sessionStorage.setItem("initiatorAadhar", initiatorAadhar ? initiatorAadhar : null);

      // sessionStorage.setItem("initiatorMobile", initiatorMobile ? initiatorMobile : null);
      // sessionStorage.setItem("initiatorDesi", initiatorDesi ? initiatorDesi : null);
      // sessionStorage.setItem("initiatorAddress", initiatorAddress ? initiatorAddress : null);
      // sessionStorage.setItem("isInitiatorDeclaration", isInitiatorDeclaration ? isInitiatorDeclaration : null);
      // sessionStorage.setItem("isCaretaker", isCaretaker ? isCaretaker : null);

      onSelect(config.key, {
        relation,
        initiatorNameEn,
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress,
        isInitiatorDeclaration,
        isCaretaker,
      });
    }
  };
  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}

      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} 
      isDisabled={!initiatorNameEn || !initiatorAadhar || !initiatorMobile || !initiatorAddress
        || (isCaretaker === true ? (initiatorDesi === "") : false)
      }>
        {/* !isInitiatorDeclaration */}
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <CheckBox label={t("CR_INITIATOR_IS_CARETAKER")} onChange={setCaretaker} value={isCaretaker} checked={isCaretaker} />
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {isCaretaker === true && (
              <div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_INSTITUTION_NAME_DESIGNATION")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    optionKey="i18nKey"
                    name="initiatorDesi"
                    value={initiatorDesi}
                    onChange={setSelectinitiatorDesi}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                    //            disable={isCaretaker}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                  />
                </div>
              </div>
            )}
            {isCaretaker === false && (
              <div className="col-md-3">
                {/* <CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="relation"
                  value={relation}
                  onChange={setSelectrelation}
                  placeholder={`${t("CR_RELATION")}`}
                  disable={isDisableEdit}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RELATION") })}
                /> */}
                <CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbRelation}
                  selected={relation}
                  select={setSelectrelation}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_RELATION")}`}
                />
              </div>
            )}
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAadhar"
                value={initiatorAadhar}
                onChange={setSelectinitiatorAadhar}
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INITIATOR_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorNameEn"
                value={initiatorNameEn}
                onChange={setSelectinitiatorNameEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="initiatorMobile"
                value={initiatorMobile}
                onChange={setSelectinitiatorMobile}
                disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
            {isCaretaker === true && (
              <CardLabel>{`${t("CR_CARE_TAKER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
            )}
             {isCaretaker === false && (
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
            )}
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9, ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>


        {toast && (
          <Toast
            error={infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError}
            label={
              infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError
                ? infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : initiatorAadharError
                    ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                    : initiatorMobileError
                      ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                      : initiatorDesiError
                        ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
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
};
export default InitiatorDetails;
