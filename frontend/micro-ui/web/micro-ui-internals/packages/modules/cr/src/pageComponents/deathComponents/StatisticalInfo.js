import React, { useState, useContext } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  BackButton,
  DatePicker,
  TextArea,
  NewRadioButton,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInfo = ({ config, onSelect, userType, formData }) => {
  // const { DeceasedGender } = props;

  const RadioButton = ({ selected, handleChange }) => {
    return (
      <div className="statistical-radio">
        <div>
          <input
            type="radio"
            id="yes"
            // name="answer"
            value="yes"
            checked={selected === "yes"}
            onChange={handleChange}
          />
          <label htmlFor="yes">{t("CR_YES")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            // name="answer"
            value="no"
            checked={selected === "no"}
            onChange={handleChange}
          />
          <label htmlFor="no">{t("CR_NO")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="prob"
            // name="answer"
            value="probably"
            checked={selected === "probably"}
            onChange={handleChange}
          />
          <label htmlFor="prob">{t("CR_PROBABILY")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="unknown"
            // name="answer"
            value="unknown"
            checked={selected === "unknown"}
            onChange={handleChange}
          />
          <label htmlFor="unknown">{t("CR_UNKNOWN")}</label>
        </div>
      </div>
    );
  };
  const RadioButtons = ({ selected, handleChange }) => {
    return (
      <div className="statistical-radiop">
        <div>
          <input
            type="radio"
            id="yes"
            // name="answer"
            value="yes"
            checked={selected === "yes"}
            onChange={handleChange}
          />
          <label htmlFor="yes">{t("CR_YES")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            // name="answer"
            value="no"
            checked={selected === "no"}
            onChange={handleChange}
          />
          <label htmlFor="no">{t("CR_NO")}</label>
        </div>
      </div>
    );
  };

  console.log(formData);
  const [visible, setVisible] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const options = [
    { i18nKey: "yes", code: "Yes" },
    { i18nKey: "no", code: "No" },
  ];

  const menub = [
    { i18nKey: "YES", code: "YES" },
    { i18nKey: "NO", code: "NO" },
  ];

  // // const handleRadioChangeTabacco = (e) => {
  // //   setisTabacco(e.target.value);
  // // };
  // const [isPanMasala, setisPanMasala] = useState(formData?.StatisticalInfoContinue?.isPanMasala ? formData?.StatisticalInfoContinue?.isPanMasala : 0);
  // const handleRadioChangePanmasala = (e) => {
  //   selectisPanMasala(e.target.value);
  // };
  // // const handleRadioChange = (e) => {
  // //   selectisalcohol(e.target.value);
  // // };

  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: attention = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MedicalAttentionType");
  const { data: deathmain = {}, isLoadingA } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCause");
  const { data: deathsub = {}, isLoadingsub } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  const { data: mannerOfDeath = {}, isLoadingmanner } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MannerOfDeath");
  const { data: pregnantDeceased = {}, isLoadingPregnant } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PregnantDeceased");
  let cmbpregnantDeceased = [];
  pregnantDeceased &&
  pregnantDeceased["birth-death-service"] &&
  pregnantDeceased["birth-death-service"].PregnantDeceased.map((ob) => {
    cmbpregnantDeceased.push(ob);
    });
  let cmbAttention = [];
  attention &&
    attention["birth-death-service"] &&
    attention["birth-death-service"].MedicalAttentionType.map((ob) => {
      cmbAttention.push(ob);
    });
  let cmbDeathmain = [];
  deathmain &&
    deathmain["birth-death-service"] &&
    deathmain["birth-death-service"].DeathCause.map((ob) => {
      cmbDeathmain.push(ob);
    });
  let cmbDeathsub = [];
  deathsub &&
    deathsub["birth-death-service"] &&
    deathsub["birth-death-service"].DeathCauseSub.map((ob) => {
      cmbDeathsub.push(ob);
    });
  let cmbmannerofdeath = [];
  mannerOfDeath &&
    mannerOfDeath["birth-death-service"] &&
    mannerOfDeath["birth-death-service"].MannerOfDeath.map((ob) => {
      cmbmannerofdeath.push(ob);
    });

  // const { data: deathsub = {}, isLoadingB } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  const [MedicalAttentionType, setMedicalAttentionType] = useState(
    formData?.StatisticalInfo?.MedicalAttentionType ? formData?.StatisticalInfo?.MedicalAttentionType : null
  );
  const [IsAutopsyPerformed, setIsAutopsyPerformed] = useState(
    formData?.StatisticalInfo?.IsAutopsyPerformed ? formData?.StatisticalInfo?.IsAutopsyPerformed : null
  );
  const handleIsAutopsyPerformed = (e) => {
    selectIsAutopsyPerformed(e.target.value);
  };
  const [IsAutopsyCompleted, setIsIsAutopsyCompleted] = useState(
    formData?.StatisticalInfo?.IsAutopsyCompleted ? formData?.StatisticalInfo?.IsAutopsyCompleted : null
  );
  const handleIsAutopsyCompleted = (e) => {
    selectIsIsAutopsyCompleted(e.target.value);
  };
  const [MannerOfDeath, setMannerOfDeath] = useState(formData?.StatisticalInfo?.MannerOfDeath ? formData?.StatisticalInfo?.MannerOfDeath : null);
  const [DeathMedicallyCertified, setDeathMedicallyCertified] = useState(
    formData?.StatisticalInfo?.DeathMedicallyCertified ? formData?.StatisticalInfo?.DeathMedicallyCertified : null
  );
  const [DeathCauseMain, setDeathCauseMain] = useState(formData?.StatisticalInfo?.DeathCauseMain ? formData?.StatisticalInfo?.DeathCauseMain : null);
  const [DeathCauseMainCustom, setDeathCauseMainCustom] = useState(
    formData?.StatisticalInfo?.DeathCauseMainCustom ? formData?.StatisticalInfo?.DeathCauseMainCustom : null
  );
  const [DeathCauseMainInterval, setDeathCauseMainInterval] = useState(
    formData?.StatisticalInfo?.DeathCauseMainInterval ? formData?.StatisticalInfo?.DeathCauseMainInterval : null
  );
  const [DeathCauseMainTimeUnit, setDeathCauseMainTimeUnit] = useState(
    formData?.StatisticalInfo?.DeathCauseMainTimeUnit ? formData?.StatisticalInfo?.DeathCauseMainTimeUnit : null
  );
  const [DeathCauseSub, setDeathCauseSub] = useState(formData?.StatisticalInfo?.DeathCauseSub ? formData?.StatisticalInfo?.DeathCauseSub : null);
  const [DeathCauseSubCustom, setDeathCauseSubCustom] = useState(
    formData?.StatisticalInfo?.DeathCauseSubCustom ? formData?.StatisticalInfo?.DeathCauseSubCustom : null
  );

  const [DeathCauseSubInterval, setDeathCauseSubInterval] = useState(
    formData?.StatisticalInfo?.DeathCauseSubInterval ? formData?.StatisticalInfo?.DeathCauseSubInterval : null
  );
  const [DeathCauseSubTimeUnit, setDeathCauseSubTimeUnit] = useState(
    formData?.StatisticalInfo?.DeathCauseSubTimeUnit ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit : null
  );
  const [DeathCauseSub2, setDeathCauseSub2] = useState(formData?.StatisticalInfo?.DeathCauseSub2 ? formData?.StatisticalInfo?.DeathCauseSub2 : null);
  const [DeathCauseSubCustom2, setDeathCauseSubCustom2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubCustom2 ? formData?.StatisticalInfo?.DeathCauseSubCustom2 : null
  );
  const [DeathCauseSubInterval2, setDeathCauseSubInterval2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubInterval2 ? formData?.StatisticalInfo?.DeathCauseSubInterval2 : null
  );
  const [DeathCauseSubTimeUnit2, setDeathCauseSubTimeUnit2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 : null
  );

  const [DeathCauseOther, setDeathCauseOther] = useState(
    formData?.StatisticalInfo?.DeathCauseOther ? formData?.StatisticalInfo?.DeathCauseOther : null
  );
  const [IsdeceasedPregnant, setIsdeceasedPregnant] = useState(
    formData?.StatisticalInfo?.IsdeceasedPregnant ? formData?.StatisticalInfo?.IsdeceasedPregnant : null
  );

  const [IsDelivery, setIsDelivery] = useState(formData?.StatisticalInfo?.IsdeceasedPregnant ? formData?.StatisticalInfo?.IsdeceasedPregnant : null);
  const [DeathDuringDelivery, setIsDeathDuringDelivery] = useState(
    formData?.StatisticalInfo?.DeathDuringDelivery ? formData?.StatisticalInfo?.DeathDuringDelivery : null
  );
  const handleDeathDuringDelivery = (e) => {
    selectDeathDuringDelivery(e.target.value);
  };
  const [AlcoholType, setAlcoholType] = useState(formData?.StatisticalInfo?.AlcoholType ? formData?.StatisticalInfo?.AlcoholType : null);
  const handleAlcoholType = (e) => {
    selectAlcoholType(e.target.value);
  };
  const [SmokingType, setSmokingType] = useState(formData?.StatisticalInfo?.SmokingType ? formData?.StatisticalInfo?.SmokingType : null);
  const handleSmokingType = (e) => {
    selectSmokingType(e.target.value);
  };
  const [TobaccoType, setTobaccoType] = useState(formData?.StatisticalInfo?.isTabacco ? formData?.StatisticalInfo?.isTabacco : null);
  const handleTobaccoType = (e) => {
    selectTobaccoType(e.target.value);
  };
  const [value, setValue] = useState();

  //////////////////////
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  let naturetypecmbvalue = null;

  const onSkip = () => onSelect();

  function selectMedicalAttentionDeath(value) {
    setMedicalAttentionType(value);
    setValue(value.code);
  }
  function selectIsAutopsyPerformed(value) {
    setIsAutopsyPerformed(value);
  }
  function selectIsIsAutopsyCompleted(value) {
    setIsIsAutopsyCompleted(value);
  }
  function selectMannerOfDeath(value) {
    setMannerOfDeath(value);
  }
  function selectDeathMedicallyCertified(value) {
    setDeathMedicallyCertified(value);
  }
  function selectDeathCauseMain(value) {
    setDeathCauseMain(value);
  }
  function selectDeathCauseMainCustom(e) {
    setDeathCauseMainCustom(e.target.value);
  }
  function selectDeathCauseMainInterval(e) {
    setDeathCauseMainInterval(e.target.value);
  }
  function selectDeathCauseMainTimeUnit(value) {
    setDeathCauseMainTimeUnit(value);
  }
  function selectDeathCauseSub(value) {
    setDeathCauseSub(value);
  }
  function selectDeathCauseSubCustom(e) {
    setDeathCauseSubCustom(e.target.value);
  }
  function selectDeathCauseSubInterval(e) {
    setDeathCauseSubInterval(e.target.value);
  }
  function selectDeathCauseSubTimeUnit(value) {
    setDeathCauseSubTimeUnit(value);
  }
  function selectDeathCauseSub2(value) {
    setDeathCauseSub2(value);
  }
  function selectDeathCauseSubCustom2(e) {
    setDeathCauseSubCustom2(e.target.value);
  }
  function selectDeathCauseSubInterval2(e) {
    setDeathCauseSubInterval2(e.target.value);
  }
  function selectDeathCauseSubTimeUnit2(value) {
    setDeathCauseSubTimeUnit2(value);
  }
  function selectDeathCauseOther(value) {
    setDeathCauseOther(value);
  }
  function selectIsdeceasedPregnant(value) {
    setIsdeceasedPregnant(value);
  }
  function selectIsDelivery(value) {
    setIsDelivery(value);
  }
  function selectDeathDuringDelivery(value) {
    setIsDeathDuringDelivery(value);
  }
  function selectSmokingType(value) {
    setSmokingType(value);
  }
  function selectTobaccoType(value) {
    setTobaccoType(value);
  }
  function selectAlcoholType(value) {
    setAlcoholType(value);
  }
  const goNext = () => {
    sessionStorage.setItem("MedicalAttentionType", MedicalAttentionType ? MedicalAttentionType.code : null);
    sessionStorage.setItem("IsAutopsyPerformed", IsAutopsyPerformed ? IsAutopsyPerformed : null);
    sessionStorage.setItem("IsAutopsyCompleted", IsAutopsyCompleted ? IsAutopsyCompleted : null);
    sessionStorage.setItem("MannerOfDeath", MannerOfDeath ? MannerOfDeath.code : null);
    sessionStorage.setItem("DeathMedicallyCertified", DeathMedicallyCertified ? DeathMedicallyCertified.code : null);
    sessionStorage.setItem("DeathCauseMain", DeathCauseMain ? DeathCauseMain.code : null);
    sessionStorage.setItem("DeathCauseMainCustom", DeathCauseMainCustom ? DeathCauseMainCustom : null);
    sessionStorage.setItem("DeathCauseMainInterval", DeathCauseMainInterval ? DeathCauseMainInterval : null);
    sessionStorage.setItem("DeathCauseMainTimeUnit", DeathCauseMainTimeUnit ? DeathCauseMainTimeUnit.code : null);
    sessionStorage.setItem("DeathCauseSub", DeathCauseSub ? DeathCauseSub.code : null);
    sessionStorage.setItem("DeathCauseSubCustom", DeathCauseSubCustom ? DeathCauseSubCustom : null);
    sessionStorage.setItem("DeathCauseSubInterval", DeathCauseSubInterval ? DeathCauseSubInterval : null);
    sessionStorage.setItem("DeathCauseSubTimeUnit", DeathCauseSubTimeUnit ? DeathCauseSubTimeUnit.code : null);
    sessionStorage.setItem("DeathCauseSub2", DeathCauseSub2 ? DeathCauseSub2.code : null);
    sessionStorage.setItem("DeathCauseSubCustom2", DeathCauseSubCustom2 ? DeathCauseSubCustom2 : null);
    sessionStorage.setItem("DeathCauseSubInterval2", DeathCauseSubInterval2 ? DeathCauseSubInterval2 : null);
    sessionStorage.setItem("DeathCauseSubTimeUnit2", DeathCauseSubTimeUnit2 ? DeathCauseSubTimeUnit2.code : null);
    sessionStorage.setItem("DeathCauseOther", DeathCauseOther ? DeathCauseOther.code : null);
    sessionStorage.setItem("IsdeceasedPregnant", IsdeceasedPregnant ? IsdeceasedPregnant.code : null);
    sessionStorage.setItem("IsDelivery", IsDelivery ? IsDelivery.code : null);
    sessionStorage.setItem("DeathDuringDelivery", DeathDuringDelivery ? DeathDuringDelivery : null);
    sessionStorage.setItem("SmokingType", SmokingType ? SmokingType : null);
    sessionStorage.setItem("TobaccoType", SmokingType ? SmokingType : null);
    sessionStorage.setItem("AlcoholType", AlcoholType ? AlcoholType : null);

    onSelect(config.key, {
      MedicalAttentionType,
      IsAutopsyPerformed,
      IsAutopsyCompleted,
      MannerOfDeath,
      DeathMedicallyCertified,
      DeathCauseMain,
      DeathCauseMainCustom,
      DeathCauseMainInterval,
      DeathCauseMainTimeUnit,
      DeathCauseSub,
      DeathCauseSubCustom,
      DeathCauseSubInterval,
      DeathCauseSubTimeUnit,
      DeathCauseSub2,
      DeathCauseSubCustom2,
      DeathCauseSubInterval2,
      DeathCauseSubTimeUnit2,
      DeathCauseOther,
      IsdeceasedPregnant,
      DeathDuringDelivery,
      SmokingType,
      TobaccoType,
      AlcoholType,
    });
  };
  console.log(formData);
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_MORE_INFO")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_MEDICAL_ATTENTION_DEATH")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbAttention}
                selected={MedicalAttentionType}
                select={selectMedicalAttentionDeath}
                disabled={isEdit}
                placeholder={`${t("CR_MEDICAL_ATTENTION_DEATH")}`}
              />
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AUTOPSY_POSTMARTUM")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_AUTOPSY_PERFORM")}</CardLabel>
                  <RadioButtons
                    t={t}
                    // optionsKey="i18nKey"
                    // onChange={setOptionkey}
                    // isMandatory={config.isMandatory}
                    selected={IsAutopsyPerformed}
                    onSelect={selectIsAutopsyPerformed}
                    handleChange={handleIsAutopsyPerformed}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_WERE_AUTOPSY")}</CardLabel>
                  <RadioButtons
                    t={t}
                    // optionsKey="i18nKey"
                    // onChange={setOptionkey}
                    // isMandatory={config.isMandatory}
                    selected={IsAutopsyCompleted}
                    onSelect={selectIsIsAutopsyCompleted}
                    handleChange={handleIsAutopsyCompleted}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MANNER_OF_DEATH")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_DEATH_OCCUR")}</CardLabel>

                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbmannerofdeath}
                    selected={MannerOfDeath}
                    select={selectMannerOfDeath}
                    disabled={isEdit}
                    placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CAUSE_OF_DEATH")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={menub}
                selected={DeathMedicallyCertified}
                select={selectDeathMedicallyCertified}
                disabled={isEdit}
                placeholder={`${t("CR_MEDICAL_ATTENTION_DEATH")}`}
              />
            </div>
          </div>
          {/*  INSTITUTION */}
          {value === "MEDICAL_ATTENTION_TYPE_INSTITUTION" && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_IMMEDIATE_CAUSE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathmain}
                      selected={DeathCauseMain}
                      select={selectDeathCauseMain}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      // optionKey="i18nKey"
                      name="DeathCauseMainCustom"
                      value={DeathCauseMainCustom}
                      onChange={selectDeathCauseMainCustom}
                      disable={isEdit}
                      placeholder={`${t(" ")}`}
                    />
                  </div>
                  {/* <div className="col-md-3">
              <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_OTHER")}</CardLabel>
              <TextInput
                // t={t}
                // isMandatory={false}
                // type={"text"}
                // // optionKey="i18nKey"
                // name="CauseOfDeath"
                // value={CauseOfDeath}
                // // onChange={setSelectCauseOfDeath}
                // disable={isEdit}
                // placeholder={`${t(" ")}`}
                // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
              />
            </div> */}
                  <div className="col-md-3">
                    <CardLabel>{t("CR_APROXIMATE")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      // optionKey="i18nKey"
                      name="DeathCauseMainInterval"
                      value={DeathCauseMainInterval}
                      onChange={selectDeathCauseMainInterval}
                      disable={isEdit}
                      placeholder={`${t(" ")}`}
                      // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_UNIT_MIN_HOURS")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={false}
                      option={menub}
                      selected={DeathCauseMainTimeUnit}
                      select={selectDeathCauseMainTimeUnit}
                      disabled={isEdit}
                      placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_UNDERLYING_CAUSE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_A")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathsub}
                      selected={DeathCauseSub}
                      select={selectDeathCauseSub}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="DeathCauseSubCustom"
                      value={DeathCauseSubCustom}
                      onChange={selectDeathCauseSubCustom}
                      disable={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_APROXIMATE")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="DeathCauseSubInterval"
                      value={DeathCauseSubInterval}
                      onChange={selectDeathCauseSubInterval}
                      disable={isEdit}
                      // placeholder={`${t(" ")}`}
                      // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_UNIT_DAYS")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={false}
                      option={menub}
                      selected={DeathCauseSubTimeUnit}
                      select={selectDeathCauseSubTimeUnit}
                      disabled={isEdit}
                      placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_B")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathsub}
                      selected={DeathCauseSub2}
                      select={selectDeathCauseSub2}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="DeathCauseSubCustom2"
                      value={DeathCauseSubCustom2}
                      onChange={selectDeathCauseSubCustom2}
                      disable={isEdit}
                      placeholder={`${t(" ")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_APROXIMATE")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="DeathCauseSubInterval2"
                      value={DeathCauseSubInterval2}
                      onChange={selectDeathCauseSubInterval2}
                      disable={isEdit}
                      placeholder={`${t(" ")}`}
                      // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_UNIT_MONTHS")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={false}
                      option={menub}
                      selected={DeathCauseSubTimeUnit2}
                      select={selectDeathCauseSubTimeUnit2}
                      disabled={isEdit}
                      placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                      {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MONTH") })}

                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OTHER_SIGNIFICANT")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_DEATH_CAUASE_OTHER")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathCauseOther"
                value={DeathCauseOther}
                onChange={selectDeathCauseOther}
                disable={isEdit}
                placeholder={`${t(" ")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
              />
              
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_WAS_THERE")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={false}
                  option={menub}
                  selected={IsDelivery}
                  select={selectIsDelivery}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>{t("CR_FEMALE_DEATH_PREGNANT")}</CardLabel>
                {/* <div className="col-md-6 "> */}
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbpregnantDeceased}
                  selected={IsdeceasedPregnant}
                  select={selectIsdeceasedPregnant}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>{t("CR_DURING_DELIVERY")}</CardLabel>
                <RadioButton
                  t={t}
                  // optionsKey="i18nKey"
                  // onChange={setOptionkey}
                  // isMandatory={config.isMandatory}
                  selected={DeathDuringDelivery}
                  Select={selectDeathDuringDelivery}
                  handleChange={handleDeathDuringDelivery}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-md-6">
              <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_OTHER_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                // optionKey="i18nKey"
                name="CauseOfDeath"
                value={CauseOfDeath}
                onChange={setSelectCauseOfDeath}
                disable={isEdit}
                placeholder={`${t(" ")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
              />
            </div> */}

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <h4 style={{ fontWeight: "bold", marginBottom: "15px" }}>{t("CR_HABITS")}</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_SMOKE")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                // isMandatory={config.isMandatory}
                selected={SmokingType}
                onSelect={selectSmokingType}
                handleChange={handleSmokingType}
              />
              {/* <div>
              {isSmoke === "yes" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    // optionKey="i18nKey"
                    name="textSmoke"
                    value={textSmoke}
                    onChange={(e) => setTextSmoke(e.target.value)}
                    disable={isEdit}
                    placeholder={`${t("CR_YEAR")}`}
                    {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                  />
                </div>
              )}
              </div> */}
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_CHEW_TOBACCO")}</CardLabel>
              {/* <div className="statistical-flex"> */}
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                // isMandatory={config.isMandatory}
                selected={TobaccoType}
                onSelect={selectTobaccoType}
                handleChange={handleTobaccoType}
              />
              {/* {isTabacco === "yes" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    // optionKey="i18nKey"
                    name="textTabacco"
                    value={textTabacco}
                    onChange={(e) => setTextTabacco(e.target.value)}
                    disable={isEdit}
                    placeholder={`${t("CR_YEAR")}`}
                    {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                  />
                </div>
              )} */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_DRINK_ALCOHOL")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                isMandatory={config.isMandatory}
                selected={AlcoholType}
                onSelect={selectAlcoholType}
                handleChange={handleAlcoholType}
              />
              {/* {isalcohol === "yes" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    // optionKey="i18nKey"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disable={isEdit}
                    placeholder={`${t("CR_YEAR")}`}
                    {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default StatisticalInfo;
