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

const MarriageRegistration = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
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
  let cmbLB = [];
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
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
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
  const [marriageTenantid, setmarriageTenantid] = useState(
    formData?.MarriageDetails?.marriageTenantid ? formData?.MarriageDetails?.marriageTenantid : ""
  );

  const [marriagePlacetype, setmarriagePlacetype] = useState(
    formData?.MarriageDetails?.marriagePlacetype ? formData?.MarriageDetails?.marriagePlacetype : ""
  );
  const [marriagePlacenameEn, setmarriagePlacenameEn] = useState(
    formData?.MarriageDetails?.marriagePlacenameEn ? formData?.MarriageDetails?.marriagePlacenameEn : ""
  );
  const [marriagePlacenameMal, setmarriagePlacenameMal] = useState(
    formData?.MarriageDetails?.marriagePlacenameMal ? formData?.MarriageDetails?.marriagePlacenameMal : ""
  );
  const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(
    formData?.MarriageDetails?.marriageOthersSpecify ? formData?.MarriageDetails?.marriageOthersSpecify : ""
  );
  const [marriageType, setmarriageType] = useState(formData?.MarriageDetails?.marriageType ? formData?.MarriageDetails?.marriageType : "");

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
  function setSelectmarriageTenantid(value) {
    setmarriageTenantid(value);
    console.log("LBType" + cmbcmbLB);
  }
  function setSelectmarriagePlacetype(value) {
    setmarriagePlacetype(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriagePlacenameEn(value) {
    setmarriagePlacenameEn(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriagePlacenameMal(value) {
    setmarriagePlacenameMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageOthersSpecify(value) {
    setmarriageOthersSpecify(value);
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

      sessionStorage.setItem("marriageTenantid", marriageTenantid ? marriageTenantid : null);
      sessionStorage.setItem("marriageTalukID", marriageTalukID ? marriageTalukID : null);
      sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      sessionStorage.setItem("marriagePlacetype", marriagePlacetype ? marriagePlacetype : null);
      sessionStorage.setItem("marriagePlacenameEn", marriagePlacenameEn ? marriagePlacenameEn : null);
      sessionStorage.setItem("marriagePlacenameMal", marriagePlacenameMal ? marriagePlacenameMal : null);
      sessionStorage.setItem("marriageType", marriageType ? marriageType : null);
      sessionStorage.setItem("marriageOthersSpecify", marriageOthersSpecify ? marriageOthersSpecify : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      onSelect(config.key, {
        marriageDOM,
        marriageDistrict,
        marriageTenantid,
        marriageLBtype,
        marriageVillageName,
        marriageTalukID,
        marriagePlacetype,
        marriagePlacenameEn,
        marriagePlacenameMal,
        marriageType,
        marriageOthersSpecify,
        tripStartTime,
        selectedOption,
        Gender,
      });
    }
  };

  if (isLoading || isTalukLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={1} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
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
                  option={cmbLB}
                  name="marriageTenantid"
                  value={marriageTenantid}
                  select={setSelectmarriageTenantid}
                  selected={marriageTenantid}
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
                  optionKey="name"
                  option={cmbLBType}
                  name="marriageWardCode"
                  // value={marriageWardCode}
                  // select={setSelectmarriageWardCode}
                  // selected={marriageWardCode}
                  placeholder={t("CS_COMMON_WARD'")}
                />
              </div>
            </div>
          </div>

          <div className="col_md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marriagePlacetype}
                select={setSelectmarriagePlacetype}
                placeholder={t("CR_MARRIAGE_PLACE_TYPE")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_NAME_OF_PLACE_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marriagePlacenameEn}
                select={setSelectmarriagePlacenameEn}
                placeholder={t("CR_NAME_OF_PLACE_EN")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_NAME_OF_PLACE_MAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marriagePlacenameMal}
                select={setSelectmarriagePlacenameMal}
                placeholder={t("CR_NAME_OF_PLACE_MAL")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
          </div>

          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_CUSTOM_AND_CEREMONY_FOLLOWED_FOR_SOLEMNIZATION")}`}</span>{" "}
            </h1>
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
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marriageOthersSpecify}
                select={setSelectmarriageOthersSpecify}
                placeholder={t("CR_MARRIAGE_OTHER_SPECIFY")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
          </div>

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
export default MarriageRegistration;
