import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader, TextArea } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const DeathPublicPlace = ({
  config,
  onSelect,
  userType,
  formData,
  publicPlaceType,
  selectpublicPlaceType,
  DeathPlaceLocalityEn,
  setDeathPlaceLocalityEn,
  DeathPlaceLocalityMl,
  setDeathPlaceLocalityMl,
  DeathPlaceStreetEn,
  setDeathPlaceStreetEn,
  DeathPlaceStreetMl,
  setDeathPlaceStreetMl,
  GeneralRemarks,
  setGeneralRemarks,
  DeathPlaceWardId,
  setDeathPlaceWardId,
//   isEditAbandonedDeath = false
}) => {
//   const [isDisableEdit, setisDisableEdit] = useState(isEditAbandonedDeath ? isEditAbandonedDeath : false);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "boundary-data");
  // const [publicPlaceType, selectpublicPlaceType] = useState(formData?.DeathPublicPlace?.publicPlaceType? formData?.DeathPublicPlace?.publicPlaceType : "");
  // const [DeathPlaceLocalityEn, setDeathPlaceLocalityEn] = useState(formData?.DeathPublicPlace?.DeathPlaceLocalityEn? formData?.DeathPublicPlace?.DeathPlaceLocalityEn : "");
  // const [DeathPlaceLocalityMl, setDeathPlaceLocalityMl] = useState(formData?.DeathPublicPlace?.DeathPlaceLocalityMl? formData?.DeathPublicPlace?.DeathPlaceLocalityMl : "");
  // const [DeathPlaceStreetEn, setDeathPlaceStreetEn] = useState(formData?.DeathPublicPlace?.DeathPlaceStreetEn? formData?.DeathPublicPlace?.DeathPlaceStreetEn : "");
  // const [DeathPlaceStreetMl, setDeathPlaceStreetMl] = useState(formData?.DeathPublicPlace?.DeathPlaceStreetMl ? formData?.DeathPublicPlace?.DeathPlaceStreetMl : "");
  // const [GeneralRemarks, setGeneralRemarks] = useState(formData?.DeathPublicPlace?.GeneralRemarks ? formData?.DeathPublicPlace?.GeneralRemarks : "");
  // const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData.DeathPublicPlace?.DeathPlaceWardId ? formData.DeathPublicPlace?.DeathPlaceWardId : "");

  let cmbOtherplace = [];
  otherplace &&
    otherplace["birth-death-service"] &&
    otherplace["birth-death-service"].OtherBithPlace.map((ob) => {
      cmbOtherplace.push(ob);
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

  // if (isEditAbandonedDeath) {
  //   if (formData?.InformationDeathAband?.publicPlaceType != null) {
  //     if (cmbOtherplace.length > 0 && (publicPlaceType === undefined || publicPlaceType === "")) {
  //       selectpublicPlaceType(cmbOtherplace.filter(cmbOtherplace => cmbOtherplace.code === formData?.InformationDeathAband?.publicPlaceType)[0]);
  //     }
  //   }
  //   if (formData?.InformationDeathAband?.DeathPlaceWardId != null) {
  //     if (cmbWardNo.length > 0 && (DeathPlaceWardId === undefined || DeathPlaceWardId === "")) {
  //       setDeathPlaceWardId(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.InformationDeathAband?.DeathPlaceWardId)[0]);
  //     }
  //   }
  // }


  const onSkip = () => onSelect();
  function setSelectpublicPlaceType(value) {
    selectpublicPlaceType(value);
  }
  function setSelectDeathPlaceWardId(value) {
    setDeathPlaceWardId(value);
  }
  function setSelectDeathPlaceLocalityEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceLocalityEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceLocalityMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceLocalityMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectDeathPlaceStreetEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceStreetEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceStreetMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceStreetMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectGeneralRemarks(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setGeneralRemarks(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  let validFlag = true;

  if (isotherLoad || isWardLoaded) {
    return <Loader></Loader>;
  }
  const goNext = () => {
    // sessionStorage.setItem("publicPlaceType", publicPlaceType ? publicPlaceType.code : null);
    //   sessionStorage.setItem("DeathPlaceLocalityEn", DeathPlaceLocalityEn ? DeathPlaceLocalityEn : null);
    //   sessionStorage.setItem("DeathPlaceLocalityMl", DeathPlaceLocalityMl ? DeathPlaceLocalityMl : null);
    //   sessionStorage.setItem("DeathPlaceStreetEn", DeathPlaceStreetEn ? DeathPlaceStreetEn : null);
    //   sessionStorage.setItem("DeathPlaceStreetMl", DeathPlaceStreetMl ? DeathPlaceStreetMl : null);
    //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
    //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId : null);

    onSelect(config.key, {
      // publicPlaceType, DeathPlaceLocalityEn, DeathPlaceLocalityMl, DeathPlaceStreetEn, DeathPlaceStreetMl, GeneralRemarks,DeathPlaceWardId
    });
  };
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!publicPlaceType}> */}
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_PUBLIC_PLACE")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_PUBLIC_PLACE_TYPE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                option={cmbOtherplace}
                selected={publicPlaceType}
                select={setSelectpublicPlaceType}
                // disable={isDisableEdit}
                placeholder={`${t("CR_PUBLIC_PLACE_TYPE")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_WARD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="namecmb"
                option={cmbWardNoFinal}
                selected={DeathPlaceWardId}
                select={setSelectDeathPlaceWardId}
                // disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_WARD")}`}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceLocalityEn"
                value={DeathPlaceLocalityEn}
                onChange={setSelectDeathPlaceLocalityEn}
                // disable={isDisableEdit}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceStreetEn"
                value={DeathPlaceStreetEn}
                onChange={setSelectDeathPlaceStreetEn}
                // disable={isDisableEdit}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceLocalityMl"
                value={DeathPlaceLocalityMl}
                onChange={setSelectDeathPlaceLocalityMl}
                // disable={isDisableEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_LOCALITY_ML"),
                })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceStreetMl"
                value={DeathPlaceStreetMl}
                onChange={setSelectDeathPlaceStreetMl}
                // disable={isDisableEdit}
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
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_DESCRIPTION")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="GeneralRemarks"
                value={GeneralRemarks}
                onChange={setSelectGeneralRemarks}
                // disable={isDisableEdit}
                placeholder={`${t("CR_DESCRIPTION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
              />
            </div>
          </div>
        </div>
        {/* </FormStep> */}
      </div>
    </React.Fragment>
  );
};
export default DeathPublicPlace;
