import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader,Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const DeathPlaceHome = ({ config, onSelect, userType, formData ,DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId,DeathPlaceHomepincode, 
  setDeathPlaceHomepincode,DeathPlaceHomeHoueNameEn, setDeathPlaceHomehoueNameEn,DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl,DeathPlaceHomeLocalityEn, 
  setDeathPlaceHomelocalityEn,DeathPlaceHomeLocalityMl, setDeathPlaceHomelocalityMl,DeathPlaceHomeStreetNameEn, setDeathPlaceHomestreetNameEn,
  DeathPlaceHomeStreetNameMl, setDeathPlaceHomestreetNameMl,DeathPlaceWardId, setDeathPlaceWardId, PostOfficevalues, setPostOfficevalues,
}) => {
  const [pofilter, setPofilter] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId(); 
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {}; 
  // const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [cmbFilterPostOffice, setCmbFilterPostOffice] = useState([]);
  let cmbPostOffice = [];
  let cmbLB = [];
  let currentLB = [];
  let Zonal = [];
    let cmbWardNo = [];
    let cmbWardNoFinal = [];
  // const [DeathPlaceHomepostofficeId, setDeathPlaceHomepostofficeId] = useState(formData?.DeathPlaceHome?.DeathPlaceHomepostofficeId);
  // const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(formData?.DeathPlaceHome?.DeathPlaceHomepincode);
  // const [DeathPlaceHomehoueNameEn, setDeathPlaceHomehoueNameEn] = useState(formData?.DeathPlaceHome?.DeathPlaceHomehoueNameEn);
  // const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(formData?.DeathPlaceHome?.DeathPlaceHomehoueNameMl);
  // const [DeathPlaceHomelocalityEn, setDeathPlaceHomelocalityEn] = useState(formData?.DeathPlaceHome?.DeathPlaceHomelocalityEn);
  // const [DeathPlaceHomelocalityMl, setDeathPlaceHomelocalityMl] = useState(formData?.DeathPlaceHome?.DeathPlaceHomelocalityMl);
  // const [DeathPlaceHomestreetNameEn, setDeathPlaceHomestreetNameEn] = useState(formData?.DeathPlaceHome?.DeathPlaceHomestreetNameEn);
  // const [DeathPlaceHomestreetNameMl, setDeathPlaceHomestreetNameMl] = useState(formData?.DeathPlaceHome?.DeathPlaceHomestreetNameMl);
  // const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData.DeathPlaceHome?.DeathPlaceWardId);
  PostOffice &&
    PostOffice["common-masters"] && PostOffice["common-masters"].PostOffice &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
    localbodies &&
    localbodies["tenant"] && localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });    
    boundaryList &&
      boundaryList["egov-location"] && boundaryList["egov-location"].TenantBoundary &&
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
    
  useEffect(() => {

    if (isInitialRender) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        setIsInitialRender(false);
      }
    }
  }, [localbodies, PostOfficevalues, isInitialRender]);
  const onSkip = () => onSelect();

  function setSelectDeathPlaceHomepostofficeId(value) {
    setDeathPlaceHomepostofficeId(value);
    setDeathPlaceHomepincode(value.pincode);
  }
  const setSelectDeathPlaceHomepincode = (e => {
    if (e.target.value.length === 6) {
      setPostOfficevalues(PostOfficevalues.filter((postoffice) =>
        parseInt(postoffice.pincode) === parseInt(e.target.value)));
      setPofilter(true);
    } else {
      setPostOfficevalues(cmbFilterPostOffice);
      setPofilter(false);
    }
    setDeathPlaceHomepincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
    setDeathPlaceHomepostofficeId(PostOfficevalues.filter((postoffice) => parseInt(postoffice.pincode) === parseInt(e.target.value))[0]);
  });
  
  function setSelectDeathPlaceHomehoueNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomehoueNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceHomehoueNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomehoueNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectDeathPlaceHomelocalityEn(e) {
    if (e.target.value.length === 51) {
      return false;
      } else {
      setDeathPlaceHomelocalityEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceHomelocalityMl(e) {
    if (e.target.value.length === 51) {
      return false;
      } else {
      setDeathPlaceHomelocalityMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectDeathPlaceHomestreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      } else {
      setDeathPlaceHomestreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceHomestreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
     } else {
      setDeathPlaceHomestreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectDeathPlaceWardId(value) {
    setDeathPlaceWardId(value);
  }
  let validFlag = true;

  const goNext = () => { 

      onSelect(config.key, {
      });    
  };

  if (isPostOfficeLoading || islocalbodiesLoading || isWardLoaded) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>  
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!DeathPlaceHomeLocalityEn}>
      <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_HOME")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-4">
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
                isMandatory={false}
                option={PostOfficevalues}
                selected={DeathPlaceHomePostofficeId}
                select={setSelectDeathPlaceHomepostofficeId}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomepincode"
                value={DeathPlaceHomepincode}
                onChange={setSelectDeathPlaceHomepincode}
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
        </div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-4">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomeLocalityEn"
                value={DeathPlaceHomeLocalityEn}
                onChange={setSelectDeathPlaceHomelocalityEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomeStreetNameEn"
                value={DeathPlaceHomeStreetNameEn}
                onChange={setSelectDeathPlaceHomestreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
              />
            </div>
           
            <div className="col-md-4">
              <CardLabel>
                {t("CR_HOUSE_NAME_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomeHoueNameEn"
                value={DeathPlaceHomeHoueNameEn}
                onChange={setSelectDeathPlaceHomehoueNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
              />
            </div>
            </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-4">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomeLocalityMl"
                value={DeathPlaceHomeLocalityMl}
                onChange={setSelectDeathPlaceHomelocalityMl}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_LOCALITY_ML"),
                })}
              />
            </div>
          <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomeStreetNameMl"
                value={DeathPlaceHomeStreetNameMl}
                onChange={setSelectDeathPlaceHomestreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_STREET_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_HOUSE_NAME_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomehoueNameMl"
                value={DeathPlaceHomehoueNameMl}
                onChange={setSelectDeathPlaceHomehoueNameMl}
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
        </div>  
      </FormStep>
    </React.Fragment>
  );
};
export default DeathPlaceHome;
