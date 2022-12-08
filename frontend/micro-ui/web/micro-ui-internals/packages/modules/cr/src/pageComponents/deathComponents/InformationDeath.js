import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformationDeath = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  // const { data: religion = {}, isReligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");

  // const [setReligion, setSelectedReligion] = useState(formData?.TradeDetails?.setReligion);
  const [setCountry, setSelectedCountry] = useState(formData?.TradeDetails?.setCountry);
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.DeathDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  //DatePicker
  const [DateOfBirth, setDateOfBirth] = useState();
  const [DateOfDeath, setDateOfDeath] = useState();
  const [FromDate, setFromDate] = useState();
  const [ToDate, setToDate] = useState();

  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["common-masters"] &&
    place["common-masters"].GenderType.map((ob) => {
      cmbPlace.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  // let cmbreligion = [];
  // religion &&
  //   religion["common-masters"] &&
  //   religion["common-masters"].religion.map((ob) => {
  //     cmbreligion.push(ob);
  //   });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }

  // function selectReligion(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedReligion(value);
  // }

  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectDateOfBirth(value) {
    setDateOfBirth(value);
  }
  function selectDateOfDeath(value) {
    setDateOfDeath(value);
  }
  function selectFromDate(value) {
    setFromDate(value);
  }
  function selectToDate(value) {
    setToDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    sessionStorage.setItem("country", setCountry.code);

    onSelect(config.key, { setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!DateOfBirth}>
        <header className="tittle">Information Deceased </header>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
            <div className="col-md-2">
              <h1 className="headingh1">
                <span> Date of Death</span>
              </h1>
            </div>
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("Date of Death")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={DateOfDeath} name="DateOfDeath" onChange={selectDateOfDeath} />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("Time of Death")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("m")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("s")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CardLabel>{t("From Date")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={FromDate} name="FromDate" onChange={selectFromDate} />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("From Time")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("minute")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("seconds")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("To Date")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={ToDate} name="ToDate" onChange={selectToDate} />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("To Time")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("m")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("s")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
            <div className="col-md-2">
              <h1 className="headingh1">
                <span> Name of Deceased</span>
              </h1>
            </div>
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("First Name (English)")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("Middle Name (English)")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("Last Name (English)")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("First Name (Malayalam)")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("Middle Name (Malayalam)")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("Last Name (Malayalam)")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("Gender of Deceased")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setPlaceofActivity}
              select={selectPlaceofactivity}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("Date of Birth of Deceased ")}`}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={DateOfBirth} name="DateOfBirth" onChange={selectDateOfBirth} />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("Age of Birth of Deceased")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
            <div className="col-md-2">
              <h1 className="headingh1">
                <span> Aadhar of Deceased</span>
              </h1>
            </div>
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <CardLabel>{t("Aadhar No")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
            <div className="col-md-2">
              <h1 className="headingh1">
                <span>Passport Details of Deceased </span>
              </h1>
            </div>
            <div className="col-md-5">
              <hr className="aligncss"></hr>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("Passport No ")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("Nationality")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbNation}
              selected={setCountry}
              select={setSelectedCountry}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("Religion")}</CardLabel>
            <Dropdown
               t={t}
               optionKey="code"
               isMandatory={false}
               option={cmbPlace}
               selected={setPlaceofActivity}
               select={selectPlaceofactivity}
               disabled={isEdit}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default InformationDeath;
