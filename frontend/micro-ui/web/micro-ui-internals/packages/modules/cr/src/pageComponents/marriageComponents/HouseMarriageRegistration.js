import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  NewRadioButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';

const HouseMarriageRegistration = ({ config, onSelect, userType, formData,isEditHouseMarriage }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [tenantWard, setTenantWard] = useState(tenantId);
  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];
  const cmbPlaceType = [
    { i18nKey: "Mandapam", code: "MANDAPAM" },
    { i18nKey: "Hall", code: "HALL" },
    { i18nKey: "Auditorium", code: "AUDITORIUM" },
    { i18nKey: "Convention Centre", code: "CONVENTION CENTRE" },
  ];

  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbLBType = [];
  let cmbWardNo = [];
  let Zonal = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      // console.log(ob);
      // if(ob?.boundary){
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }
    });
    cmbWardNo.map((wardmst) => {
      wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
      wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
      cmbWardNoFinal.push(wardmst);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
    const [tenantboundary, setTenantboundary] = useState(false);
  const [marriageDOM, setmarriageDOM] = useState(formData?.MarriageDetails?.marriageDOM ? formData?.MarriageDetails?.marriageDOM : "");
  const [marriageDistrict, setmarriageDistrict] = useState(
    formData?.MarriageDetails?.marriageDistrict ? formData?.MarriageDetails?.marriageDistrict : ""
  );
  const [marriageTalukID, setmarriageTalukID] = useState(
    formData?.MarriageDetails?.marriageTalukID ? formData?.MarriageDetails?.marriageTalukID : ""
  );
  const [marriageVillageName, setmarriageVillageName] = useState(
    formData?.MarriageDetails?.marriageVillageName ? formData?.MarriageDetails?.marriageVillageName : ""
  );
  const [marriageLBtype, setmarriageLBtype] = useState(formData?.MarriageDetails?.marriageLBtype ? formData?.MarriageDetails?.marriageLBtype : "");
  const [marriagePlacetype, setmarriagePlacetype] = useState(
    formData?.MarriageDetails?.marriagePlacetype ? formData?.MarriageDetails?.marriagePlacetype : ""
  );
  const [marriageLocalityEn, setmarriageLocalityEn] = useState(
    formData?.MarriageDetails?.marriageLocalityEn ? formData?.MarriageDetails?.marriageLocalityEn : ""
  );
  const [marriageLocalityMal, setmarriageLocalityMal] = useState(
    formData?.MarriageDetails?.marriageLocalityMal ? formData?.MarriageDetails?.marriageLocalityMal : ""
  );
  const [marriageStreetEn, setmarriageStreetEn] = useState(
    formData?.MarriageDetails?.marriageStreetEn ? formData?.MarriageDetails?.marriageStreetEn : ""
  );
  const [marriageStreetMal, setmarriageStreetMal] = useState(
    formData?.MarriageDetails?.marriageStreetMal ? formData?.MarriageDetails?.marriageStreetMal : ""
  );
  const [marriageHouseNoAndNameEn, setmarriageHouseNoAndNameEn] = useState(
    formData?.MarriageDetails?.marriageHouseNoAndNameEn ? formData?.MarriageDetails?.marriageHouseNoAndNameEn : ""
  );
  const [marriageHouseNoAndNameMal, setmarriageHouseNoAndNameMal] = useState(
    formData?.MarriageDetails?.marriageHouseNoAndNameMal ? formData?.MarriageDetails?.marriageHouseNoAndNameMal : ""
  );
  const [marriageLandmark, setmarriageLandmark] = useState(
    formData?.MarriageDetails?.marriageLandmark ? formData?.MarriageDetails?.marriageLandmark : ""
  );
  const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(
    formData?.MarriageDetails?.marriageOthersSpecify ? formData?.MarriageDetails?.marriageOthersSpecify : ""
  );
  const [marriageWardCode, setmarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode ? formData?.MarriageDetails?.marriageWardCode : ""
  );
  const [marriageType, setmarriageType] = useState(formData?.MarriageDetails?.marriageType ? formData?.MarriageDetails?.marriageType : "");
  const [isDisableEdit, setisDisableEdit] = useState(isEditHouseMarriage ? isEditHouseMarriage : false);
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    queryClient.removeQueries("CR_VILLAGE");
    queryClient.removeQueries("CR_TALUK");
    queryClient.removeQueries("CR_TALUK");
    setTenantboundary(false);
  }
  const onSkip = () => onSelect();

  function setSelectmarriageDOM(value) {
    setmarriageDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setmarriageDOM(null);
      // setDOBError(true);
      // setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectmarriageDistrict(value) {
    setmarriageDistrict(value);
    console.log("District" + cmbDistrict);
  }
  function setSelectmarriageTalukID(value) {
    setmarriageTalukID(value);
    console.log("Taluk" + cmbTaluk);
  }
  function setSelectmarriageVillageName(value) {
    setmarriageVillageName(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectmarriageLBtype(value) {
    setmarriageLBtype(value);
    console.log("LBType" + cmbLBType);
  }
  function setSelectmarriagePlacetype(value) {
    setmarriagePlacetype(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageLocalityEn(value) {
    setmarriageLocalityEn(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageLocalityMal(value) {
    setmarriageLocalityMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageStreetEn(value) {
    setmarriageStreetEn(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageStreetMal(value) {
    setmarriageStreetMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageHouseNoAndNameEn(value) {
    setmarriageHouseNoAndNameEn(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageHouseNoAndNameMal(value) {
    setmarriageHouseNoAndNameMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageWardCode(value) {
    setTenantWard(value.code);
    setmarriageWardCode(value);
  }
  function setSelectmarriageLandmark(e) {
    
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setmarriageLandmark(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectmarriageOthersSpecify(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setmarriageOthersSpecify(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
   
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageType(value) {
    setmarriageType(value);
    // setAgeMariageStatus(value.code);
  }

  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      setAadharErroChildAadharNor(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      // return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAadharError(false);
    }
    if (validFlag == true) {
      sessionStorage.setItem("marriageDOM", marriageDOM ? marriageDOM : null);
      sessionStorage.setItem("marriageDistrict", marriageDistrict ? marriageDistrict : null);
      sessionStorage.setItem("marriageLBtype", marriageLBtype ? marriageLBtype : null);
      sessionStorage.setItem("marriageTalukID", marriageTalukID ? marriageTalukID : null);
      sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      sessionStorage.setItem("marriagePlacetype", marriagePlacetype ? marriagePlacetype : null);
      sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      sessionStorage.setItem("marriageWardCode", marriageWardCode ? marriageWardCode : null);
      sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      sessionStorage.setItem("marriageHouseNoAndNameEn", marriageHouseNoAndNameEn ? marriageHouseNoAndNameEn : null);
      sessionStorage.setItem("marriageHouseNoAndNameMal", marriageHouseNoAndNameMal ? marriageHouseNoAndNameMal : null);
      sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      sessionStorage.setItem("marriageType", marriageType ? marriageType : null);
      sessionStorage.setItem("marriageOthersSpecify", marriageOthersSpecify ? marriageOthersSpecify : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      onSelect(config.key, {
        marriageDOM,
        marriageDistrict,
        marriageLBtype,
        marriageVillageName,
        marriageTalukID,
        marriagePlacetype,
        marriageLocalityEn,
        marriageLocalityMal,
        marriageLandmark,
        marriageWardCode,
        marriageHouseNoAndNameEn,
        marriageHouseNoAndNameMal,
        marriageStreetEn,
        marriageStreetMal,
        marriageType,
        marriageOthersSpecify,
        tripStartTime,
        selectedOption,
        Gender,
      });
    }
  };

  if (isLoading || isTalukLoading ||isVillageLoading|| isLBTypeLoading||isWardLoaded) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep t={t}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="col-md-2">
            <CardLabel>
              {`${t("CR_DATE_OF_MARRIAGE")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              date={marriageDOM}
              name="marriageDOM"
              onChange={setSelectmarriageDOM}
              inputFormat="DD-MM-YYYY"
              placeholder={`${t("CR_DATE_OF_MARRIAGE")}`}
              {...(validation = { isRequired: true, title: t("CR_DATE_OF_MARRIAGE") })}
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
            </div>
            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_DISTRICT")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  optionKey="name"
                  option={cmbDistrict}
                  name="marriageDistrict"
                  value={marriageDistrict}
                  select={setSelectmarriageDistrict}
                  selected={marriageDistrict}
                  placeholder={t("CS_COMMON_DISTRICT'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_TALUK")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbTaluk}
                  name="marriageTalukID"
                  value={marriageTalukID}
                  select={setSelectmarriageTalukID}
                  selected={marriageTalukID}
                  placeholder={t("CS_COMMON_TALUK'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_VILLAGE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbVillage}
                  name="marriageVillageName"
                  value={marriageVillageName}
                  select={setSelectmarriageVillageName}
                  selected={marriageVillageName}
                  placeholder={t("CS_COMMON_VILLAGE'")}
                />
              </div>
            </div>
            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_LBTYPE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbLBType}
                  name="marriageLBtype"
                  value={marriageLBtype}
                  select={setSelectmarriageLBtype}
                  selected={marriageLBtype}
                  placeholder={t("CS_LBTYPE'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_LB")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbLBType}
                  name="marriageLBtype"
                  value={marriageLBtype}
                  select={setSelectmarriageLBtype}
                  selected={marriageLBtype}
                  placeholder={t("CS_LB'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_WARD")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="namecmb"
                  // option={cmbLBType}
                  placeholder={t("CS_COMMON_WARD'")}
                  option={cmbWardNoFinal}
                  selected={marriageWardCode}
                  select={setSelectmarriageWardCode}
                  {...(validation = { isRequired: false, title: t("CS_COMMON_INVALID_WARD") })}
                />
              </div>
            </div>
         

          <div className="col_md-12">
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_LOCALITY_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageLocalityEn"
                onChange={setSelectmarriageLocalityEn}
                // disable={isChildName}
                placeholder={`${t("CR_LOCALITY_EN")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_STREET_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageStreetEn"
                onChange={setSelectmarriageStreetEn}
                // disable={isChildName}
                placeholder={`${t("CR_STREET_EN")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageHouseNoAndNameEn"
                onChange={setSelectmarriageHouseNoAndNameEn}
                // disable={isChildName}
                placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_LANDMARK")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageLandmark"
                onChange={setSelectmarriageLandmark}
                // disable={isChildName}
                placeholder={`${t("CR_LANDMARK")}`}
              />
            </div>
          </div>

          <div className="col_md-12">
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_LOCALITY_MAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageLocalityMal"
                onChange={setSelectmarriageLocalityMal}
                // disable={isChildName}
                placeholder={`${t("CR_LOCALITY_MAL")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_STREET_MAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageStreetMal"
                onChange={setSelectmarriageStreetMal}
                // disable={isChildName}
                placeholder={`${t("CR_STREET_MAL")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="marriageHouseNoAndNameMal"
                onChange={setSelectmarriageHouseNoAndNameMal}
                // disable={isChildName}
                placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
              />
            </div>
          </div>
          {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_CUSTOM_AND_CEREMONY_FOLLOWED_FOR_SOLEMNIZATION")}`}</span>{" "}
            </h1>
          </div>
          </div>
          <div className="col_md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MARRIAGE_TYPE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marriageType}
                select={setSelectmarriageType}
                placeholder={t("CR_MARRIAGE_TYPE")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MARRIAGE_OTHER_SPECIFY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="marriageOthersSpecify"
                  value={marriageOthersSpecify}
                  onChange={setSelectmarriageOthersSpecify}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_MARRIAGE_OTHER_SPECIFY")}`}
                  
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                />
             
              
            </div>
          </div> */}

          <div className="row">
            <div className="col-md-12">
              <h1 className="">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
              </h1>
            </div>
          </div>

          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default HouseMarriageRegistration;
