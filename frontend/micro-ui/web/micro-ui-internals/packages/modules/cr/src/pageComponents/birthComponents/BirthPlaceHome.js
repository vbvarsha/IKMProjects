import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const BirthPlaceHome = ({
  config,
  onSelect,
  userType,
  formData,
  adrsPostOffice,
  adrsPincode,
  adrsHouseNameEn,
  adrsHouseNameMl,
  adrsLocalityNameEn,
  adrsLocalityNameMl,
  adrsStreetNameEn,
  adrsStreetNameMl,
  wardNo,
  setAdrsPostOffice,
  setAdrsPincode,
  setAdrsHouseNameEn,
  setAdrsHouseNameMl,
  setAdrsLocalityNameEn,
  setAdrsLocalityNameMl,
  setAdrsStreetNameEn,
  setAdrsStreetNameMl,
  setWardNo,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  console.log(tenantId);
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  // const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  // Digit.Hooks.useTenants();
  // const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "boundary-data");
  const [toast, setToast] = useState(false);

  // const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.BirthPlaceHomeDetails?.adrsPostOffice);
  // const [adrsPincode, setAdrsPincode] = useState(formData?.BirthPlaceHomeDetails?.adrsPincode);
  // const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.BirthPlaceHomeDetails?.adrsHouseNameEn);
  // const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.BirthPlaceHomeDetails?.adrsHouseNameMl);

  // const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.BirthPlaceHomeDetails?.adrsLocalityNameEn);
  // const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.BirthPlaceHomeDetails?.adrsLocalityNameMl);
  // const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.BirthPlaceHomeDetails?.adrsStreetNameEn);
  // const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.BirthPlaceHomeDetails?.adrsStreetNameMl);
  // const [wardNo, setWardNo] = useState(formData.BirthPlaceHomeDetails?.wardNo);

  let cmbPostOffice = [];
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
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
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });

  const onSkip = () => onSelect();

  function setSelectAdrsPostOffice(value) {
    setAdrsPostOffice(value);
    console.log(value);
    setAdrsPincode(value.pincode);
  }
  // function setSelectAdrsPincode(e) {
  //   if (e.target.value.length === 7) {
  //     return false;

  //   } else {
  //     setAdrsPincode(e.target.value);
  //   }
  // }

  function setSelectAdrsPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setAdrsPincode(e.target.value);
        return false;
      } else {
        setAdrsPincode(e.target.value);
        return true;
      }
    }
  }

  function setSelectAdrsHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdrsHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectAdrsLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdrsLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsLocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectAdrsStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdrsStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsStreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectWard(value) {
    console.log(value);
    setWardNo(value);
  }
  let validFlag = true;

  const goNext = () => {
    // if (adrsLocalityNameEn == null || adrsLocalityNameEn == "" || adrsLocalityNameEn == undefined) {
    //   validFlag = false;
    //   setAdsHomeLocalityNameEnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setAdsHomeLocalityNameEnError(false);
    // }
    // if (adrsLocalityNameMl == null || adrsLocalityNameMl == "" || adrsLocalityNameMl == undefined) {
    //   validFlag = false;
    //   setAdsHomeLocalityNameMlError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setAdsHomeLocalityNameMlError(false);
    // }
    // if (adrsHouseNameEn == null || adrsHouseNameEn == "" || adrsHouseNameEn == undefined) {
    //   validFlag = false;
    //   setAdsHomeHouseNameEnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setAdsHomeHouseNameEnError(false);
    // }
    // if (adrsHouseNameMl == null || adrsHouseNameMl == "" || adrsHouseNameMl == undefined) {
    //   validFlag = false;
    //   setAdsHomeHouseNameMlError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setAdsHomeHouseNameMlError(false);
    // }
    // if (validFlag == true) {
    //   sessionStorage.setItem("adrsHouseNameEn", adrsHouseNameEn ? adrsHouseNameEn  : null);
    //   sessionStorage.setItem("adrsHouseNameMl", adrsHouseNameMl  ? adrsHouseNameMl  : null);
    //   sessionStorage.setItem("adrsLocalityNameEn", adrsLocalityNameEn  ? adrsLocalityNameEn  : null);
    //   sessionStorage.setItem("adrsLocalityNameMl", adrsLocalityNameMl  ? adrsLocalityNameMl  : null);
    //   sessionStorage.setItem("adrsStreetNameEn", adrsStreetNameEn  ? adrsStreetNameEn  : null);
    //   sessionStorage.setItem("adrsStreetNameMl", adrsStreetNameMl  ? adrsStreetNameMl  : null);
    //   sessionStorage.setItem("adrsPostOffice", adrsPostOffice  ? adrsPostOffice.code  : null);
    //   sessionStorage.setItem("adrsPincode", adrsPincode  ? adrsPincode .code  : null);
    //   sessionStorage.setItem(" wardNo",  wardNo.code);
    //   onSelect(config.key, {
    //     adrsHouseNameEn,
    //     adrsHouseNameMl,
    //     adrsLocalityNameEn,
    //     adrsLocalityNameMl,
    //     adrsStreetNameEn,
    //     adrsStreetNameMl,
    //     adrsPostOffice,
    //     adrsPincode,
    //   });
    // }
  };

  if (isPostOfficeLoading || isWardLoaded) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!adrsLocalityNameEn}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE_HOME")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
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
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbPostOffice}
              selected={adrsPostOffice}
              select={setSelectAdrsPostOffice}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_PIN_CODE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsPincode"
              value={adrsPincode}
              onChange={setSelectAdrsPincode}
              placeholder={`${t("CS_COMMON_PIN_CODE")}`}
              {...(validation = {
                pattern: "^[0-9]{6}$",
                isRequired: true,
                type: "number",
                maxLength: 6,
                minLength: 6,
                title: t("CS_COMMON_INVALID_PIN_CODE"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsLocalityNameEn"
              value={adrsLocalityNameEn}
              onChange={setSelectAdrsLocalityNameEn}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsLocalityNameMl"
              value={adrsLocalityNameMl}
              onChange={setSelectAdrsLocalityNameMl}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsStreetNameEn"
              value={adrsStreetNameEn}
              onChange={setSelectAdrsStreetNameEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsStreetNameMl"
              value={adrsStreetNameMl}
              onChange={setSelectAdrsStreetNameMl}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsHouseNameEn"
              value={adrsHouseNameEn}
              onChange={setSelectAdrsHouseNameEn}
              placeholder={`${t("CR_HOUSE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="adrsHouseNameMl"
              value={adrsHouseNameMl}
              onChange={setSelectAdrsHouseNameMl}
              placeholder={`${t("CR_HOUSE_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceHome;