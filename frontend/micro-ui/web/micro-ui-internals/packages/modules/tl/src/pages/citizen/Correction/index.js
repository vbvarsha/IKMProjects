import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig as newConfigTL } from "../../../config/config";
// import CheckPage from "./CheckPage";
// import TLAcknowledgement from "./TLAcknowledgement";

const CorrectionTradeLicence = ({ parentRoute,isRenewal }) => {
  console.log("some is ok");
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  let config = [];
  const [params, setParams, clearParams] =  Digit.Hooks.useSessionStorage("TL_CORRECTION_TRADE", {}); //: Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});
  const [paramscorrected,setParamcorrected]= Digit.Hooks.useSessionStorage("TL_CORRECTED_TRADE", {});
  let isReneworEditTrade = window.location.href.includes("/renew-trade/") || window.location.href.includes("/edit-application/")

  const stateId = Digit.ULBService.getStateId();
  let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});

  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled : enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
    if (typeof nextStep == "object" && nextStep != null) {
      if((params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId ))  && (nextStep[sessionStorage.getItem("isAccessories")] && nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")  )
      {
        nextStep = "property-details";
      }
      if (
        nextStep[sessionStorage.getItem("isAccessories")] &&
        (nextStep[sessionStorage.getItem("isAccessories")] === "accessories-details" ||
          nextStep[sessionStorage.getItem("isAccessories")] === "map" ||
          nextStep[sessionStorage.getItem("isAccessories")] === "owner-ship-details" || 
          nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")
      ) {
        nextStep = `${nextStep[sessionStorage.getItem("isAccessories")]}`;
      } else if (
        nextStep[sessionStorage.getItem("StructureType")] &&
        (nextStep[sessionStorage.getItem("StructureType")] === "Building-type" ||
          nextStep[sessionStorage.getItem("StructureType")] === "vehicle-type")
      ) {
        nextStep = `${nextStep[sessionStorage.getItem("setPlaceofActivity")]}`;
        nextStep = `${nextStep[sessionStorage.getItem("StructureType")]}`;
      } else if (
        nextStep[sessionStorage.getItem("KnowProperty")] &&
        (nextStep[sessionStorage.getItem("KnowProperty")] === "search-property" ||
          nextStep[sessionStorage.getItem("KnowProperty")] === "create-property")
      ) {
          if(nextStep[sessionStorage.getItem("KnowProperty")] === "create-property" && !enableCreate)
          {
            nextStep = `map`;
          }
          else{
         nextStep = `${nextStep[sessionStorage.getItem("KnowProperty")]}`;
          }
      }
    }
    if( (params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId ))  && nextStep === "know-your-property" )
    { 
      nextStep = "property-details";
    }
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${match.path}/check`);
    }
    if(isPTCreateSkip && nextStep === "acknowledge-create-property")
    {
      nextStep = "map";
    }
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    if(key!==""){
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    setParamcorrected({ ...paramscorrected, ...{ [key]: { ...paramscorrected[key], ...data } } });
    }
    if(key === "isSkip" && data === true)
    {
      goNext(skipStep, index, isAddMultiple, key, true);
    }
    else
    {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }

  function handleeditSelect(key, data, skipStep, index, isAddMultiple = false) {

    setParamcorrected({ ...paramscorrected, ...{ [key]: { ...paramscorrected[key], ...data } } });
   // setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    // if(key === "isSkip" && data === true)
    // {
    //   goNext(skipStep, index, isAddMultiple, key, true);
    // }
    // else
    // {
    //   goNext(skipStep, index, isAddMultiple, key);
    // }
  }
 
  const handleSkip = () => {};
  const handleMultiple = () => {};

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    sessionStorage.removeItem("TL_CORRECTED_TRADE");
    sessionStorage.removeItem("TL_CORRECTION_TRADE");
    queryClient.invalidateQueries("TL_CREATE_TRADE");
  };

  newConfig = newConfigTL;
  // newConfig = newConfig ? newConfig : newConfigTL;
  // newConfig = newConfig ? newConfig : newConfigTL;
  newConfig = newConfigTL;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  let skipenanbledOb = newConfig?.filter(obj => obj?.body?.some(com => com.component === "CPTCreateProperty"))?.[0];
  let skipenabled = skipenanbledOb?.body?.filter((ob) => ob?.component === "CPTCreateProperty")?.[0]?.isSkipEnabled;
  sessionStorage.setItem("skipenabled",skipenabled);
  config.indexRoute ="license-correction-root";
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("CorrectionCheckPage");
  const TLAcknowledgement = Digit?.ComponentRegistryService?.getComponent("TLCorrectionAcknowledgement");
  return (
    <Switch>
      {config.map((routeObj, index) => {
        const { component, texts, inputs, key, isSkipEnabled } = routeObj;
        const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
        return (
          <Route path={`${match.path}/${routeObj.route}`} key={index}>
            <Component
              config={{ texts, inputs, key, isSkipEnabled }}
              onSelect={handleSelect}
              onEditSelect={handleeditSelect}
              onSkip={handleSkip}
              t={t}
              formData={params}
              formDataEdit={paramscorrected}
              onAdd={handleMultiple}
              userType="citizen"
            />
          </Route>
        );
      })}
      <Route path={`${match.path}/check`}>
        <CheckPage onSubmit={createProperty} value={params} valuenew={paramscorrected} />
      </Route>
      <Route path={`${match.path}/acknowledgement`}>
        <TLAcknowledgement data={params} datanew={paramscorrected} onSuccess={onSuccess} />
      </Route>
      <Route>
        <Redirect to={`${match.path}/${config.indexRoute}`} />
      </Route>
    </Switch>
  );
};

export default CorrectionTradeLicence;
