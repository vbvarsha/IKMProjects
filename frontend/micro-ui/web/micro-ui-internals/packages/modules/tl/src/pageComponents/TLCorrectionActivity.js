import React, { useCallback, useState, useReducer, useEffect } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton, RadioButtons, CardText, DatePicker } from "@egovernments/digit-ui-react-components";
import { sortDropdownNames } from "../utils/index";
import { convertEpochToDate } from '../utils/index';
import { isUndefined } from "lodash";

const TLCorrectionActivity = ({ t, config,formData,onEditSelect,formDataEdit}) => { 
  console.log("formDataEdit"+JSON.stringify(formDataEdit));
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isEdit,setIsEdit]=useState(true);
  const stateId = Digit.ULBService.getStateId();
  const [minDate, setMinDate] = useState('2018-01-01');
  let validation = {};

  const menusector = [
    { name: "Manufacturing Sector", code: "MANUFACTURING" },
    { name: "Service Sector", code: "SERVICE" },
  ];
  const LicensePeriod = [
    { name: "Upto 1 Year", code: "1" },
    { name: "Upto 2 Year", code: "2" },
    { name: "Upto 3 Year", code: "3" },
    { name: "Upto 4 Year", code: "4" },
    { name: "Upto 5 Year", code: "5" },
  ];

  // const [businessSector, setBusinessSector] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec?.code.includes(formDataEdit?.tradeLicenseDetail?.businessSector))[0]  : formData?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec?.code.includes(formData?.tradeLicenseDetail?.businessSector))[0] : "");
  // const [fields, setFeilds] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits : formData?.TradeDetails?.tradeLicenseDetail?.tradeUnits ? formData?.TradeDetails?.tradeLicenseDetail?.tradeUnits :[{ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null }]);
  // const [noOfEmployees, setNoOfEmployees] = useState(formDataEdit?.tradeLicenseDetail?.noOfEmployees ? formDataEdit?.tradeLicenseDetail?.noOfEmployees : formData?.tradeLicenseDetail?.noOfEmployees ? formData?.tradeLicenseDetail?.noOfEmployees : "");
  // const [capitalInvestment, setCapitalInvestment] = useState(formDataEdit?.tradeLicenseDetail?.capitalInvestment ? formDataEdit?.tradeLicenseDetail?.capitalInvestment : formData?.tradeLicenseDetail?.capitalInvestment ? formData?.tradeLicenseDetail?.capitalInvestment : "" );
  // const [commencementDate, setCommencementDate] = useState(formDataEdit?.commencementDate? convertEpochToDate(formDataEdit?.commencementDate) : formData?.commencementDate ? convertEpochToDate(formData?.commencementDate) : null);
  // const [desiredLicensePeriod, setDesiredLicensePeriod] = useState(formDataEdit?.desiredLicensePeriod ? LicensePeriod.filter((period) => period?.code.includes(formDataEdit?.desiredLicensePeriod))[0] : formData?.desiredLicensePeriod ? LicensePeriod.filter((period) => period?.code.includes(formData?.desiredLicensePeriod))[0] : "");
  //const [businessSector, setBusinessSector] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec?.code.includes(formDataEdit?.tradeLicenseDetail?.businessSector))[0]  : "");
  const [fields, setFeilds] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits  :[{ businessCategory: "", businessType: "", businessSubtype: "", unit: null, uom: null }]);
  console.log("fields :" + JSON.stringify(fields));
  const [noOfEmployees, setNoOfEmployees] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.noOfEmployees ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.noOfEmployees  : "");
  const [capitalInvestment, setCapitalInvestment] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.capitalInvestment ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.capitalInvestment : "" );
  const [commencementDate, setCommencementDate] = useState(formDataEdit?.TradeDetails?.commencementDate? convertEpochToDate(formDataEdit?.TradeDetails?.commencementDate) : null);
  const [desiredLicensePeriod, setDesiredLicensePeriod] = useState(formDataEdit?.TradeDetails?.desiredLicensePeriod ? LicensePeriod.filter((period) => period?.code.includes(formDataEdit?.TradeDetails?.desiredLicensePeriod))[0]  : "");
 

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  let BusinessCategoryMenu = [];
  Data &&
  Data.TradeLicense &&
  Data.TradeLicense.TradeType.map((ob) => {
    if (!BusinessCategoryMenu.some((BusinessCategoryMenu) => BusinessCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
      BusinessCategoryMenu.push({ i18nKey: `${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
    }
    
  });
  let BusinessTypeMenu = [];
  let BusinessSubTypeMenu = [];
  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!BusinessCategoryMenu.some((BusinessCategoryMenu) => BusinessCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        BusinessCategoryMenu.push({ i18nKey: `${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }
    });
 
  function getBusinessTypeMenu(BusinessCategory) {
    BusinessTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        console.log("ob"+JSON.stringify( ob));
        if (
            ob.code.split(".")[0] === BusinessCategory.code &&
          !BusinessTypeMenu.some((BusinessTypeMenu) => BusinessTypeMenu.code === `${ob.code.split(".")[0] + "." + ob.code.split(".")[1]}`)
        ) {
          BusinessTypeMenu.push({ i18nKey: `${ob.code.split(".")[0] + "." + ob.code.split(".")[1]}`, code: `${ob.code.split(".")[0] + "." + ob.code.split(".")[1]}` });
        }
      });
    return BusinessTypeMenu;
  }

  function getBusinessSubTypeMenu(BusinessType) {
    BusinessSubTypeMenu = [];
    BusinessType &&
      Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[0] + "." + ob.code.split(".")[1] === BusinessType.code && !BusinessSubTypeMenu.some((BusinessSubTypeMenu) => BusinessSubTypeMenu.code === `${ob.code}`)) {
          BusinessSubTypeMenu.push({ i18nKey: `${ob.code}`, code: `${ob.code}` });
        }
      });
    return BusinessSubTypeMenu;
  }
//  if (formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory && BusinessCategoryMenu.length > 0) {
//     let category = BusinessCategoryMenu.filter((category) => category?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory))[0];
//     console.log("category"+JSON.stringify(category));
//     let bustype = null;
//     let bussubtyp = null;
//       bustype = getBusinessTypeMenu(category).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessType))[0];
//       bussubtyp = getBusinessSubTypeMenu(bustype).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessSubtype))[0];

    
//     setFeilds( [
//       {
//         businessCategory: category,
//         businessType: bustype,
//         businessSubtype: bussubtyp, unit: null, uom: null
//       }
//     ] );
//   }
  const selectBusinessSector = (value => {
    setBusinessSector(value);
    setIsInitialRender(true);
  });
  const selectBusinessCategory = (i, value) => {
    let units = [...fields];
    console.log(value);
    units[i].businessCategory = value;
    selectBusinessType(i, null);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessType = (i, value) => {
    let units = [...fields];
    units[i].businessType = value;
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessSubType = (i, value) => {
    let units = [...fields];
    units[i].businessSubtype = value;
    setFeilds(units);
    Digit.SessionStorage.set("activityedit", true);
  }
  const changesetCapitalInvestment = (e => {
    setCapitalInvestment(e.target.value.length<=12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    setIsInitialRender(true);
    Digit.SessionStorage.set("activityedit", true);
  });
  const changesetCommencementDate = (e => {
    setCommencementDate(e);
    Digit.SessionStorage.set("activityedit", true);
  });
  const changesetDesiredLicensePeriod = (e => {
    setDesiredLicensePeriod(e);
    Digit.SessionStorage.set("activityedit", true);
 });

 const changesetNoofEmployees = (e => {
   setNoOfEmployees(e.target.value.length<=4 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 4));
   Digit.SessionStorage.set("activityedit", true);
  })

 useEffect(()=>{
  console.log(Digit.SessionStorage.get("activityedit"));
  if(Digit.SessionStorage.get("activityedit")){
    Digit.SessionStorage.set("activityedit", false);
    let units = fields;
    let tradeLicenseDetail = { capitalInvestment, commencementDate, noOfEmployees,  units}
    onEditSelect(config.key,{ tradeLicenseDetail,desiredLicensePeriod:desiredLicensePeriod.code});
  }
});

  return (
    <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
      <div className="row">
        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</span> </h1>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-3">
          <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
            {`${t("TL_BUSINESS_SECTOR")}`}<span className="mandatorycss">*</span>
          </CardLabel>
        </div>
        <div className="col-md-8">
          <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menusector} selectedOption={businessSector} onSelect={selectBusinessSector} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_SECTOR"), })} />&nbsp;
        </div>
      </div> */}
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_BUSINESS_SECTOR")}`}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector} </CardText>
          </div>
        </div>
      </div>
      {fields.map((field, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_LOCALIZATION_SECTOR")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} option={BusinessCategoryMenu} optionKey="i18nKey" isMandatory={config.isMandatory} value={field?.businessCategory} selected={field?.businessCategory} name={`TradeCategory-${index}`} select={(e) => selectBusinessCategory(index, e)} placeholder="Bussiness Category" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_CATEGORY"), })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={getBusinessTypeMenu(field?.businessCategory)} selected={field?.businessType} select={(e) => selectBusinessType(index, e)} placeholder="Bussiness Type"  {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_TYPE"), })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={sortDropdownNames(getBusinessSubTypeMenu(field?.businessType), "i18nKey", t)} selected={field?.businessType} select={(e) => selectBusinessSubType(index, e)} placeholder="Bussiness Sub Type" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_SUB_BUSINESS_TYPE"), })} />
            </div>
          </div>
        )
      }
      )}
      <div className="row">
        <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="capitalInvestment" value={capitalInvestment} onChange={changesetCapitalInvestment} placeholder="Capital Investment Range" {...(validation = { isRequired: true, title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
        </div>
        <div className="col-md-3" >
          <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
          <DatePicker name="commencementDate" min={minDate} date={commencementDate} onChange={changesetCommencementDate} placeholder="Date of Commencement"  {...(validation = { isRequired: true, title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL") })} />
        </div>
        <div className="col-md-3" >
          <CardLabel>{`${t("TL_LICENSE_PERIOD")}`}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={LicensePeriod} selected={desiredLicensePeriod} select={changesetDesiredLicensePeriod} placeholder="Desired License Period" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSE_PERIOD"), })} />
        </div>
        <div className="col-md-3">
          <CardLabel>{`${t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="noOfEmployees" value={noOfEmployees} onChange={changesetNoofEmployees} placeholder="No. of Employees" {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_NO_EMPLOYEES"), })} />
        </div>
      </div>
    </div>

  );
}
export default TLCorrectionActivity;