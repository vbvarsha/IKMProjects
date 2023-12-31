import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
    const { data: ReligionList = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Religion");
    const { data: AttentionOfDelivery = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AttentionOfDelivery");
    const { data: MedicalAttentionType = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MedicalAttentionType");
    const { data: DeliveryMethodList = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeliveryMethod");

    const [BirthWeight, setBirthWeight] = useState(formData?.StatisticalInfoDetails?.BirthWeight);
    const [BirthHeight, setBirthHeight] = useState(formData?.StatisticalInfoDetails?.BirthHeight);
    const [Religion, setReligion] = useState(formData?.StatisticalInfoDetails?.Religion);
    const [PregnancyDuration, setPregnancyDuration] = useState(formData?.StatisticalInfoDetails?.PregnancyDuration);
    const [MedicalAttension, setMedicalAttension] = useState(formData?.StatisticalInfoDetails?.MedicalAttension);
    const [MedicalAttensionSub, setMedicalAttensionSub] = useState(formData?.StatisticalInfoDetails?.MedicalAttensionSub);
    const [DeliveryMethod, setDeliveryMethod] = useState(formData?.StatisticalInfoDetails?.DeliveryMethod);
    const [DeliveryMethodSub, setDeliveryMethodSub] = useState(formData?.TradeDetails?.DeliveryMethodSub);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    let cmbPlace = [];
    let cmbAttDelivery = [];
    let cmbAttDeliverySub = [];
    let cmbDeliveryMethod = [];
    let cmbReligion = [];
    console.log(DeliveryMethodList);
    place &&
        place["TradeLicense"] &&
        place["TradeLicense"].PlaceOfActivity.map((ob) => {
            cmbPlace.push(ob);
        });
        // ReligionList &&
        // ReligionList["birth-death-service"] &&
        // ReligionList["birth-death-service"].Religion.map((ob) => {
        //     cmbReligion.push(ob);
        // });
        AttentionOfDelivery &&
        AttentionOfDelivery["birth-death-service"] &&
        AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
            cmbAttDelivery.push(ob);
        });
        MedicalAttentionType &&
        MedicalAttentionType["birth-death-service"] &&
        MedicalAttentionType["birth-death-service"].MedicalAttentionType.map((ob) => {
            cmbAttDeliverySub.push(ob);
        });
        DeliveryMethodList &&
        DeliveryMethodList["birth-death-service"] &&
        DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
            cmbDeliveryMethod.push(ob);
        });

    const onSkip = () => onSelect();

    function setSelectBirthWeight(e) {
        setBirthWeight(e.target.value);
    }
    function setSelectBirthHeight(e) {
        setBirthHeight(e.target.value);
    }
    function setSelectReligion(value) {
        setReligion(value);
    }
    function setSelectPregnancyDuration(value) {
        setPregnancyDuration(value);
    }
    function setSelectMedicalAttension(value) {
        setMedicalAttension(value);
    }
    function setSelectMedicalAttensionSub(value) {
        setMedicalAttensionSub(value);
    }
    function setSelectDeliveryMethod(value) {
        setDeliveryMethod(value);
    }
    function setSelectDeliveryMethodSub(value) {
        setDeliveryMethodSub(value);
    }
    const goNext = () => {
        sessionStorage.setItem("BirthWeight", BirthWeight);
        sessionStorage.setItem("BirthHeight", BirthHeight);
        sessionStorage.setItem("Religion", Religion.code);
        sessionStorage.setItem("PregnancyDuration", PregnancyDuration.code);
        sessionStorage.setItem("MedicalAttension", MedicalAttension.code);
        sessionStorage.setItem("MedicalAttensionSub", MedicalAttensionSub.code);
        sessionStorage.setItem("DeliveryMethod", DeliveryMethod.code);
        sessionStorage.setItem("DeliveryMethodSub", DeliveryMethodSub.code);
        onSelect(config.key, { BirthWeight,BirthHeight,Religion,PregnancyDuration,MedicalAttension,MedicalAttensionSub,DeliveryMethod,DeliveryMethodSub });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={5}  /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthWeight}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_STATISTICAL_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-12" >
                    <div className="col-md-6" ><CardLabel>{t("CR_BIRTH_WEIGHT")}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthWeight" value={BirthWeight} onChange={setSelectBirthWeight} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_WEIGHT") })} />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{t("CR_BIRTH_HEIGHT")}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthHeight" value={BirthHeight} onChange={setSelectBirthHeight} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_HEIGHT") })} />
                    </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-12" >
                    <div className="col-md-6 " >
                        <CardLabel>{`${t("CS_COMMON_RELIGION")}`}</CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbReligion} selected={Religion} select={setSelectReligion} disabled={isEdit} />
                    </div>
                    <div className="col-md-6 " >
                        <CardLabel>{`${t("CR_PREGNANCY_DURATION")}`}</CardLabel>
                        <Dropdown t={t} optionKey="code" isMandatory={false} option={cmbReligion} selected={PregnancyDuration} select={setSelectPregnancyDuration} disabled={isEdit} />
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12" >
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}</CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbAttDelivery} selected={MedicalAttension} select={setSelectMedicalAttension} disabled={isEdit} />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION_SUB")}`}</CardLabel>
                        <Dropdown t={t} optionKey="code" isMandatory={false} option={cmbAttDeliverySub} selected={MedicalAttensionSub} select={setSelectMedicalAttensionSub} disabled={isEdit} />
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12" >
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CR_DELIVERY_METHORD")}`}</CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbDeliveryMethod} selected={DeliveryMethod} select={setSelectDeliveryMethod} disabled={isEdit} />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CR_DELIVERY_METHOD_SUB")}`}</CardLabel>
                        <Dropdown t={t} optionKey="code" isMandatory={false} option={cmbReligion} selected={DeliveryMethodSub} select={setSelectDeliveryMethodSub} disabled={isEdit} />
                    </div>
                </div>
                </div>

            </FormStep>
        </React.Fragment>
    );
};
export default StatisticalInformation;
