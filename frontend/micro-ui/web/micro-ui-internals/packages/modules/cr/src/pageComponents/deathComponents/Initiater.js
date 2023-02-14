import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const Initiater = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [isDeclarationInfoone, setIsDeclarationInfoone] = useState(
    formData?.Initiater?.isDeclarationInfoone ? formData?.Initiater?.isDeclarationInfoone : false
  );
  // const [isDeclarationInfotwo, setIsDeclarationInfotwo] = useState(
  //   formData?.Initiater?.isDeclarationInfotwo ? formData?.Initiater?.isDeclarationInfotwo : false
  // );
  const [InitiatorAadhaar, setInitiatorAadhaar] = useState(
    formData?.Initiater?.InitiatorAadhaar ? formData?.Initiater?.InitiatorAadhaar : ""
  );  
  const [InitiatorName, setInitiatorName] = useState(
    formData?.Initiater?.InitiatorName ? formData?.Initiater?.InitiatorName : ""
  );
  const [InitiatorMobile, setInitiatorMobile] = useState(
    formData?.Initiater?.InitiatorMobile ? formData?.Initiater?.InitiatorMobile : ""
  );
   
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [InitiaterNameError, setInitiaterNameError] = useState(formData?.Initiater?.InitiatorName ? false : false);
  const [InitiaterAadharError, setInitiaterAadharError] = useState(formData?.Initiater?.InitiatorAadhaar ? false : false);
  const [InitiaterMobileError, setInitiaterMobileError] = useState(formData?.Initiater?.InitiatorMobile ? false : false);
 
  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.Initiater?.isDeclarationInfoone != null) {
        setIsInitialRender(false);
        setIsDeclarationInfoone(formData?.Initiater?.isDeclarationInfoone);
      }
      // if (formData?.Initiater?.isDeclarationInfotwo != null) {
      //   setIsInitialRender(false);
      //   setIsDeclarationInfotwo(formData?.Initiater?.isDeclarationInfotwo);
      // }
    }
  }, [isInitialRender]);
 
  function setDeclarationInfoone(e) {
    if (e.target.checked == true) {
      setIsDeclarationInfoone(e.target.checked);
    } else {
      setIsDeclarationInfoone(e.target.checked);
    }
  }
  // function setDeclarationInfotwo(e) {
  //   if (e.target.checked == true) {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   } else {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   }
  // }
  function setSelectInitiatorAadhaar(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        return false;
      } else if (e.target.value.length < 12) {
        setInitiatorAadhaar(e.target.value);
        return false;
      } else {
        setInitiatorAadhaar(e.target.value);
      }
    } else {
      setInitiatorAadhaar(e.target.value);
    }
  }
  function setSelectInitiatorName(e) {
    if (e.target.value.length === 51) {
      return false;      
    } else {
      setInitiatorName(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  // function setSelectInitiatorName(value) {
  //   setInitiatorName(value);    
  // }

  function setSelectInitiatorMobile(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setInitiatorMobile(e.target.value);
        return false;
      } else {
        setInitiatorMobile(e.target.value);
      }
    } else {
      setInitiatorMobile(e.target.value);
    }
  }
   

  let validFlag = true;
  const goNext = () => {
    if (InitiatorName == null || InitiatorName == "" || InitiatorName == undefined) {
      validFlag = false;
      setInitiaterNameError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterNameError(false);
    }
   
    if (InitiatorAadhaar == null || InitiatorAadhaar == "" || InitiatorAadhaar == undefined) {
      validFlag = false;
      setInitiaterAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterAadharError(false);
    }
    if (InitiatorMobile == null || InitiatorMobile == "" || InitiatorMobile == undefined) {
      validFlag = false;
      setInitiaterMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterMobileError(false);
    }

    if (validFlag == true) {
      sessionStorage.setItem("isDeclarationInfoone", isDeclarationInfoone ? isDeclarationInfoone : null);
      // sessionStorage.setItem("isDeclarationInfotwo", isDeclarationInfotwo ? isDeclarationInfotwo : null);
      sessionStorage.setItem("InitiatorName", InitiatorName ? InitiatorName : null);
      sessionStorage.setItem("InitiatorAadhaar", InitiatorAadhaar ? InitiatorAadhaar : null);
      sessionStorage.setItem("InitiatorMobile", InitiatorMobile ? InitiatorMobile : null);      
      onSelect(config.key, {
        isDeclarationInfoone,
        // isDeclarationInfotwo,
        InitiatorName,
        InitiatorAadhaar,
        InitiatorMobile,               
      });
    }
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_DECLARATION_STATEMENT")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("TestDescription")} onChange={setDeclarationInfoone} value={isDeclarationInfoone} checked={isDeclarationInfoone} />
            {/* <CheckBox label={t("TestDescription")} onChange={setDeclarationInfotwo} value={isDeclarationInfotwo} checked={isDeclarationInfotwo} /> */}
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("TestDocuments")} onChange={setDeclarationInfoone} value={isDeclarationInfoone} checked={isDeclarationInfoone} />
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(" CR_INITIATOR_DETAILS")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="InitiatorAadhaar"
                value={InitiatorAadhaar}
                onChange={setSelectInitiatorAadhaar}
                disable={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorName"
                value={InitiatorName}
                onChange={setSelectInitiatorName}
                disable={isEdit}
                placeholder={`${t("CR_INFORMANT_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div>
             
           
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="InitiatorMobile"
                value={InitiatorMobile}
                onChange={setSelectInitiatorMobile}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>
        

        {toast && (
          <Toast
            error={InitiaterNameError || InitiaterAadharError || InitiaterMobileError }
            label={
              InitiaterNameError || InitiaterAadharError || InitiaterMobileError 
                ? InitiaterNameError
                  ? t(`CR_ERROR_INITIATER_NAME_CHOOSE`)
                  : InitiaterAadharError
                  ? t(`CR_ERROR_INITIATER_AADHAR_CHOOSE`)
                  : InitiaterMobileError
                  ? t(`CR_ERROR_INITIATER_MOBILE_CHOOSE`)                 
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
export default Initiater;
