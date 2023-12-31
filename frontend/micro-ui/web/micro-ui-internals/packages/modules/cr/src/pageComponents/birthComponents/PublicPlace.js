import React, { useState } from "react";
import { FormStep,CardLabel, TextInput, TextArea,Dropdown,DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PublicPlace = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/")||window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue =null;
  let cmbPlace = [];
  place &&
  place["TradeLicense"] &&
  place["TradeLicense"].PlaceOfActivity.map((ob) => {
        cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue=value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);    
  }
  
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }
  
 
  const goNext = () => {
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);   
    onSelect(config.key, { setPlaceofActivity });
  }
  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline /> : null}
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
    
    <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span> </h1>
                    </div>
                </div>
    <div className="row">
         <div className="col-md-4" >
            <CardLabel>{`${t("CR_TYPE")}`}</CardLabel>
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
        <div className="col-md-4" >
            <CardLabel>{`${t("CR_INFORMANT_NAME")}`}</CardLabel>
            <TextInput       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="TradeName"
            value={TradeName}
            onChange={setSelectTradeName}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
            />
        </div>
        <div className="col-md-4" >
            <CardLabel>{`${t("CS_COMMON_WARD")}`}</CardLabel>
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
    <div className="row">    
        <div className="col-md-12" >
            <CardLabel>{`${t("CR_ADDRESS")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="TradeName"
            value={TradeName}
            onChange={setSelectTradeName}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
        </div>
      
    </div>
    <div className="row">    
         
        <div className="col-md-12" >
            <CardLabel>{`${t("CR_DESCRIPTION")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="TradeName"
            value={TradeName}
            onChange={setSelectTradeName}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
        </div>    
    </div>
      
    </FormStep>
    </React.Fragment>
  );
};
export default PublicPlace;
