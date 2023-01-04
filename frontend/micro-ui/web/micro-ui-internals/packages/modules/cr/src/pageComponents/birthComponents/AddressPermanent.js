import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPermanent = ({ config, onSelect, userType, formData }) => {
 const stateId = Digit.ULBService.getStateId();
 const { t } = useTranslation();
 let validation = {};
 const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
 const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
 const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
 const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
 const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
 const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District"); 
 const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
 const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [PresentCountry, setPresentCountry] = useState(formData?.AddressPermanentDetails?.PresentCountry);
 const [PresentStateName, setPresentStateName] = useState(formData?.AddressPermanentDetails?.PresentStateName);
 const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressPermanentDetails?.PresentDistrict);
 const [PresentLBTypeName, setPresentLBTypeName] = useState(formData?.AddressPermanentDetails?.PresentLBTypeName);
 const [PresentLBName, setPresentLBName] = useState(formData?.AddressPermanentDetails?.PresentLBName);
 const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressPermanentDetails?.PresentTaluk);
 const [PresentPostOffice, setPresentPostOffice] = useState(formData?.AddressPermanentDetails?.PresentPostOffice);
 const [PresentPincode, setPresentPincode] = useState(formData?.AddressPermanentDetails?.PresentPincode);
 const [PresentHouseNameEn, setPresentHouseNameEn] = useState(formData?.AddressPermanentDetails?.PresentHouseNameEn);
 const [PresentHouseNameMl, setPresentHouseNameMl] = useState(formData?.AddressPermanentDetails?.PresentHouseNameMl);
 const [PresentBuldingNo, setPresentBuldingNo] = useState(formData?.AddressPermanentDetails?.PresentBuldingNo);
 const [PresentDoorNo, setPresentDoorNo] = useState(formData?.AddressPermanentDetails?.PresentDoorNo);
 const [PresentMainPlaceEn, setPresentMainPlaceEn] = useState(formData?.AddressPermanentDetails?.PresentMainPlaceEn);
 const [PresentMainPlaceMl, setPresentMainPlaceMl] = useState(formData?.AddressPermanentDetails?.PresentMainPlaceMl);
 const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.AddressPermanentDetails?.PresentLocalityNameEn);
 const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.AddressPermanentDetails?.PresentLocalityNameMl);
 const [PresentStreetNameEn, setPresentStreetNameEn] = useState(formData?.AddressPermanentDetails?.PresentStreetNameEn);
 const [PresentStreetNameMl, setPresentStreetNameMl] = useState(formData?.AddressPermanentDetails?.PresentStreetNameMl);
 const [PresentVillage, setPresentVillage] = useState(formData?.AddressPermanentDetails?.PresentVillage); 
 const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressPermanentDetails?.isPrsentAddress);
 const [PermanentCountry, setPermanentCountry] = useState(formData?.AddressPermanentDetails?.PermanentCountry);
 const [PermanentStateName, setPermanentStateName] = useState(formData?.AddressPermanentDetails?.PermanentStateName);
 const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressPermanentDetails?.PermanentDistrict);
 const [PermanentLBTypeName, setPermanentLBTypeName] = useState(formData?.AddressPermanentDetails?.PermanentLBTypeName);
 const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressPermanentDetails?.PermanentLBName);
 const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressPermanentDetails?.PermanentVillage);
 const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressPermanentDetails?.PermanentTaluk);
 const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.AddressPermanentDetails?.PermanentPostOffice);
 const [PermanentPincode, setPermanentPincode] = useState(formData?.AddressPermanentDetails?.PermanentPincode);
 const [PermanentBuldingNo, setPermanentBuldingNo] = useState(formData?.AddressPermanentDetails?.PermanentBuldingNo);
 const [PermanentDoorNo, setPermanentDoorNo] = useState(formData?.AddressPermanentDetails?.PermanentDoorNo);
 const [PermanentHouseNameEn, setPermanentHouseNameEn] = useState(formData?.AddressPermanentDetails?.PermanentHouseNameEn);
 const [PermanentHouseNameMl, setPermanentHouseNameMl] = useState(formData?.AddressPermanentDetails?.PermanentHouseNameMl);
 const [PermanentMainPlaceEn, setPermanentMainPlaceEn] = useState(formData?.AddressPermanentDetails?.PermanentMainPlaceEn);
 const [PermanentMainPlaceMl, setPermanentMainPlaceMl] = useState(formData?.AddressPermanentDetails?.PermanentMainPlaceMl);
 const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.AddressPermanentDetails?.PermanentLocalityNameEn);
 const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.AddressPermanentDetails?.PermanentLocalityNameMl);
 const [PermanentStreetNameEn, setPermanentStreetNameEn] = useState(formData?.AddressPermanentDetails?.PermanentStreetNameEn);
 const [PermanentStreetNameMl, setPermanentStreetNameMl] = useState(formData?.AddressPermanentDetails?.PermanentStreetNameMl);
 
 
 let cmbPlace = [];
 let cmbTaluk = [];
 let cmbVillage = [];
 let cmbDistrict = [];
 let cmbPostOffice = [];
 let districtid = null;
 let cmbLBType = [];
 
 console.log("Taluk" + Taluk);
 Taluk &&
 Taluk["common-masters"] &&
 Taluk["common-masters"].Taluk.map((ob) => {
 cmbTaluk.push(ob);
 });
 Village &&
 Village["common-masters"] &&
 Village["common-masters"].Village.map((ob) => {
 cmbVillage.push(ob);
 });
 PostOffice &&
 District["common-masters"] &&
 District["common-masters"].District.map((ob) => {
 cmbDistrict.push(ob);
 });
 PostOffice &&
 PostOffice["common-masters"] &&
 PostOffice["common-masters"].PostOffice.map((ob) => {
 cmbPostOffice.push(ob);
 }); 

 LBType &&
 LBType["common-masters"] &&
 LBType["common-masters"].LBType.map((ob) => {
 cmbLBType.push(ob);
 });

 const onSkip = () => onSelect();

 
  function setSelectPresentDistrict(value) {
    setIsInitialRender(true);
    setPresentDistrict(value);
    setPresentLBName(null);
    setLbs(null);
    districtid = value.districtid
    if (isPrsentAddress) {
    setPermanentDistrict(PresentDistrict);
    }
    }
 function setSelectPresentLBTypeName(value) {
 setPresentLBTypeName(value);
 if (isPrsentAddress) {
 setPermanentLBTypeName(PresentLBTypeName);
 }
 }
 function setSelectPresentLBName(value) {
  setPresentLBName(value);
  if (isPrsentAddress) {
  setPermanentLBName(PresentLBName);
  }
  }
  function setSelectPresentVillage(value) {
    setPresentVillage(value);
    console.log("Village" + cmbVillage);
    if (isPrsentAddress) {
    setPermanentVillage(PresentVillage);
    }
    }
 function setSelectPresentTaluk(value) {
      setPresentTaluk(value);
      console.log("Taluk" + cmbTaluk);
      if (isPrsentAddress) {
      setPermanentTaluk(PresentTaluk);
  }
  }
      
  function setSelectPresentPostOffice(value) {
      setPresentPostOffice(value);
      if (isPrsentAddress) {
      setPermanentPostOffice(PresentPostOffice);
      }
      }
function setSelectPresentPincode(e) {
      setPresentPincode(e.target.value);
      if (isPrsentAddress) {
      setPermanentPincode(PresentPincode);
}
}
 function setSelectPresentBuldingNo(e) {
 setPresentBuldingNo(e.target.value);
 if (isPrsentAddress) {
 setPermanentBuldingNo(PresentBuldingNo);
 }
 }
 function setSelectPresentDoorNo(e) {
 setPresentDoorNo(e.target.value);
 if (isPrsentAddress) {
 setPermanentDoorNo(PresentDoorNo);
 }
 }
 function setSelectPresentHouseNameEn(e) {
 setPresentHouseNameEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentHouseNameEn(PresentHouseNameEn);
 }
 }
 function setSelectPresentHouseNameMl(e) {
 setPresentHouseNameMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentHouseNameMl(PresentHouseNameMl);
 }
 }
 
 function setSelectPresentMainPlaceEn(e) {
 setPresentMainPlaceEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentMainPlaceEn(PresentMainPlaceEn);
 }
 }
 function setSelectPresentMainPlaceMl(e) {
 setPresentMainPlaceMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentMainPlaceMl(PresentMainPlaceMl);
 }
 }
 function setSelectPresentLocalityNameEn(e) {
 setPresentLocalityNameEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentLocalityNameEn(PresentLocalityNameEn);
 }
 }
 function setSelectPresentLocalityNameMl(e) {
 setPresentLocalityNameMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentLocalityNameMl(PresentLocalityNameMl);
 }
 }
 function setSelectPresentStreetNameEn(e) {
 setPresentStreetNameEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentStreetNameEn(PresentStreetNameEn);
 }
 }
 function setSelectPresentStreetNameMl(e) {
 setPresentStreetNameMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentStreetNameMl(PresentStreetNameMl);
 }
 } 
 
 //Permanent Address Function
 
  function setSelectPermanentDistrict(value) {
  setPermanentDistrict(value);
  districtid = value.districtid
  }
 function setSelectPermanentLBTypeName(value) {
 setPermanentLBTypeName(value);
 }
 function setSelectPermanentLBName(value) {
  setPermanentLBName(value);
  }
  function setSelectPermanentVillage(value) {
    setPermanentVillage(value);
    }
   
    function setSelectPermanentTaluk(value) {
    setPermanentTaluk(value);
    }
   
    function setSelectPermanentPostOffice(value) {
    setPermanentPostOffice(value);
    }
    function setSelectPermanentPincode(e) {
    setPermanentPincode(e.target.value);
    }
 function setSelectPermanentBuldingNo(e) {
 setPermanentBuldingNo(e.target.value);
 }
 function setSelectPermanentDoorNo(e) {
 setPermanentDoorNo(e.target.value);
 }
 function setSelectPermanentHouseNameEn(e) {
 setPermanentHouseNameEn(e.target.value);
 }
 function setSelectPermanentHouseNameMl(e) {
 setPermanentHouseNameMl(e.target.value);
 }
 function setSelectPermanentMainPlaceEn(e) {
  setPermanentMainPlaceEn(e.target.value);
  }
  function setSelectPermanentMainPlaceMl(e) {
  setPermanentMainPlaceMl(e.target.value);
  }
 function setSelectPermanentLocalityNameEn(e) {
 setPermanentLocalityNameEn(e.target.value);
 }
 function setSelectPermanentLocalityNameMl(e) {
 setPermanentLocalityNameMl(e.target.value);
 }
 function setSelectPermanentStreetNameEn(e) {
 setPermanentStreetNameEn(e.target.value);
 }
 function setSelectPermanentStreetNameMl(e) {
 setPermanentStreetNameMl(e.target.value);
 }

 function setSameAsPresent(e) {
 setIsPrsentAddress(e.target.checked);
 if (e.target.checked == true) { 
 setPermanentLBTypeName(PresentLBTypeName);
 setPermanentBuldingNo(PresentBuldingNo);
 setPermanentDoorNo(PresentDoorNo);
 setPermanentHouseNameEn(PresentHouseNameEn);
 setPermanentHouseNameMl(PresentHouseNameMl); 
 setPermanentMainPlaceEn(PresentMainPlaceEn);
 setPermanentMainPlaceMl(PresentMainPlaceMl);
 setPermanentLocalityNameEn(PresentLocalityNameEn);
 setPermanentLocalityNameMl(PresentLocalityNameMl);
 setPermanentStreetNameEn(PresentStreetNameEn);
 setPermanentStreetNameMl(PresentStreetNameMl);
 setPermanentVillage(PresentVillage);
 setPermanentLBName(PresentLBName);
 setPermanentDistrict(PresentDistrict);
 setPermanentTaluk(PresentTaluk);
 setPermanentPostOffice(PresentPostOffice);
 setPermanentPincode(PresentPincode);
 } else {
 
 setPermanentLBTypeName(' ');
 setPermanentBuldingNo('');
 setPermanentDoorNo('');
 setPermanentHouseNameEn('');
 setPermanentHouseNameMl('');
 setPermanentMainPlaceEn('');
 setPermanentMainPlaceMl('');
 setPermanentLocalityNameEn('');
 setPermanentLocalityNameMl('');
 setPermanentStreetNameEn('');
 setPermanentStreetNameMl('');
 setPermanentVillage('');
 setPermanentLBName('');
 setPermanentDistrict('');
 setPermanentTaluk('');
 setPermanentPostOffice('');
 setPermanentPincode('');
 }
 }
 useEffect(() => {
 if (isInitialRender) {
 console.log("PresentDistrict" + districtid);
 console.log(localbodies);
 if (PresentDistrict) {
 setIsInitialRender(false);
 setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === PresentDistrict.districtid));
 }
 }
 }, [lbs, isInitialRender]);
 const goNext = () => {

 sessionStorage.setItem("PresentLBTypeName", PresentLBTypeName.code);
 sessionStorage.setItem("PresentBuldingNo", PresentBuldingNo);
 sessionStorage.setItem("PresentDoorNo", PresentDoorNo);
 sessionStorage.setItem("PresentHouseNameEn", PresentHouseNameEn);
 sessionStorage.setItem("PresentHouseNameMl", PresentHouseNameMl);
 sessionStorage.setItem("PresentMainPlaceEn", PresentMainPlaceEn);
 sessionStorage.setItem("PresentMainPlaceMl", PresentMainPlaceMl);
 sessionStorage.setItem("PresentLocalityNameEn", PresentLocalityNameEn);
 sessionStorage.setItem("PresentLocalityNameMl", PresentLocalityNameMl); 
 sessionStorage.setItem("PresentStreetNameEn", PresentStreetNameEn);
 sessionStorage.setItem("PresentStreetNameMl", PresentStreetNameMl);
 sessionStorage.setItem("PresentVillage", PresentVillage.code);
 sessionStorage.setItem("PresentLBName", null);
 sessionStorage.setItem("PresentDistrict", PresentDistrict.code);
 sessionStorage.setItem("PresentTaluk", PresentTaluk.code);
 sessionStorage.setItem("PresentPostOffice", PresentPostOffice.code);
 sessionStorage.setItem("PresentPincode", PresentPincode.code);
 sessionStorage.setItem("PermanentLBTypeName", PermanentLBTypeName.code);
 sessionStorage.setItem("PermanentBuldingNo", PermanentBuldingNo);
 sessionStorage.setItem("PermanentDoorNo", PermanentDoorNo);
 sessionStorage.setItem("PermanentHouseNameEn", PermanentHouseNameEn);
 sessionStorage.setItem("PermanentHouseNameMl", PermanentHouseNameMl);
 sessionStorage.setItem("PermanentMainPlaceEn", PermanentMainPlaceEn);
 sessionStorage.setItem("PermanentMainPlaceMl", PermanentMainPlaceMl); 
 sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn);
 sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl);
 sessionStorage.setItem("PermanentStreetNameEn", PermanentStreetNameEn);
 sessionStorage.setItem("PermanentStreetNameMl", PermanentStreetNameMl);
 sessionStorage.setItem("PermanentVillage", PermanentVillage.code);
 sessionStorage.setItem("PermanentLBName", null);
 sessionStorage.setItem("PermanentDistrict", PermanentDistrict.code);
 sessionStorage.setItem("PermanentTaluk", PermanentTaluk.code);
 sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice.code);
 sessionStorage.setItem("PermanentPincode", PermanentPincode.code);
 onSelect(config.key, {
 PresentBuldingNo, PresentDoorNo, PresentHouseNameEn, PresentHouseNameMl, PresentLocalityNameEn, PresentLBTypeName, 
 PresentMainPlaceEn,PresentMainPlaceMl,PresentLocalityNameMl, PresentStreetNameEn, PresentStreetNameMl, PresentVillage, PresentLBName, PresentDistrict, PresentTaluk, PresentPostOffice, PresentPincode,
 PermanentBuldingNo, PermanentDoorNo,PermanentHouseNameEn, PermanentHouseNameMl,PermanentMainPlaceMl,PermanentMainPlaceEn, PermanentLocalityNameEn, PermanentLocalityNameMl, PermanentStreetNameEn, PermanentStreetNameMl, PermanentVillage, PermanentLBName,
 PermanentDistrict, PermanentTaluk, PermanentPostOffice, PermanentPincode,  PermanentLBTypeName
 });
 }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!PresentDoorNo || !PresentLocalityNameEn || !PresentLocalityNameMl || !PresentDistrict || !PresentVillage || !PresentTaluk || !PresentPostOffice || !PresentPincode || !PermanentDoorNo || !PermanentLocalityNameEn || !PermanentLocalityNameMl || !PermanentDistrict || !PermanentVillage || !PermanentTaluk || !PermanentPostOffice || !PermanentPincode}>

 <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span> </h1>
 </div>
 </div>

 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={PresentDistrict} select={setSelectPresentDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={PresentLBTypeName}
 select={setSelectPresentLBTypeName}
 disabled={isEdit}
 />
 </div> 
 </div>
 </div> 
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={PresentLBName} select={setSelectPresentLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={PresentVillage} select={setSelectPresentVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={PresentTaluk} select={setSelectPresentTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={PresentPostOffice} select={setSelectPresentPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentPincode" value={PresentPincode} onChange={setSelectPresentPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentMainPlaceEn" value={PresentMainPlaceEn} onChange={setSelectPresentMainPlaceEn} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentMainPlaceMl" value={PresentMainPlaceMl} onChange={setSelectPresentMainPlaceMl} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })} />
 </div>
 </div>
 </div>


 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentLocalityNameEn" value={PresentLocalityNameEn} onChange={setSelectPresentLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentLocalityNameMl" value={PresentLocalityNameMl} onChange={setSelectPresentLocalityNameMl} placeholder={`${t("CR_LOCALITY_ML")}`} disable={isEdit} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentStreetNameEn" value={PresentStreetNameEn} onChange={setSelectPresentStreetNameEn} placeholder={`${t("CR_STREET_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentStreetNameMl" value={PresentStreetNameMl} onChange={setSelectPresentStreetNameMl} placeholder={`${t("CR_STREET_NAME_ML")}`} disable={isEdit} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CITY_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentHouseNameEn" value={PresentHouseNameEn} onChange={setSelectPresentHouseNameEn} placeholder={`${t("CR_HOUSE_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentHouseNameMl" value={PresentHouseNameMl} onChange={setSelectPresentHouseNameMl} placeholder={`${t("CR_HOUSE_NAME_ML")}`} disable={isEdit} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentBuldingNo" value={PresentBuldingNo} onChange={setSelectPresentBuldingNo} placeholder={`${t("CR_BUILDING_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_DOOR_NO")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PresentDoorNo" value={PresentDoorNo} onChange={setSelectPresentDoorNo} placeholder={`${t("CR_DOOR_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })} />
 </div>
 </div>
 </div>
 

 
 <div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-12" >
 {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
 <CheckBox label={t("CR_SAME_AS_ABOVE")} onChange={setSameAsPresent} value={isPrsentAddress} checked={isPrsentAddress} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span> </h1>
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbDistrict} selected={PermanentDistrict} select={setSelectPermanentDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={PermanentLBTypeName}
 select={setSelectPermanentLBTypeName}
 disabled={isEdit}
 />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" > 
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={PermanentLBName} select={setSelectPermanentLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbVillage} selected={PermanentVillage} select={setSelectPermanentVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={PermanentTaluk} select={setSelectPermanentTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={PermanentPostOffice} select={setSelectPermanentPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentPincode" value={PermanentPincode} onChange={setSelectPermanentPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentMainPlaceEn" value={PermanentMainPlaceEn} onChange={setSelectPermanentMainPlaceEn} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentMainPlaceMl" value={PermanentMainPlaceMl} onChange={setSelectPermanentMainPlaceMl} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentLocalityNameEn" value={PermanentLocalityNameEn} onChange={setSelectPermanentLocalityNameEn} disable={isEdit} placeholder={`${t("CR_LOCALITY_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentLocalityNameMl" value={PermanentLocalityNameMl} onChange={setSelectPermanentLocalityNameMl} disable={isEdit} placeholder={`${t("CR_LOCALITY_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentStreetNameEn" value={PermanentStreetNameEn} onChange={setSelectPermanentStreetNameEn} disable={isEdit} placeholder={`${t("CR_STREET_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentStreetNameMl" value={PermanentStreetNameMl} onChange={setSelectPermanentStreetNameMl} disable={isEdit} placeholder={`${t("CR_STREET_NAME_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentHouseNameEn" value={PermanentHouseNameEn} onChange={setSelectPermanentHouseNameEn} disable={isEdit} placeholder={`${t("CR_HOUSE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentHouseNameMl" value={PermanentHouseNameMl} onChange={setSelectPermanentHouseNameMl} disable={isEdit} placeholder={`${t("CR_HOUSE_NAME_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })} />
 </div>
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentBuldingNo" value={PermanentBuldingNo} onChange={setSelectPermanentBuldingNo} disable={isEdit} placeholder={`${t("CR_BUILDING_NO")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_DOOR_NO")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PermanentDoorNo" value={PermanentDoorNo} onChange={setSelectPermanentDoorNo} disable={isEdit} placeholder={`${t("CR_DOOR_NO")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })} />
 </div>
 </div>
 </div>

 
 </div>

 </FormStep>
 </React.Fragment>
 );
};
export default AddressPermanent;