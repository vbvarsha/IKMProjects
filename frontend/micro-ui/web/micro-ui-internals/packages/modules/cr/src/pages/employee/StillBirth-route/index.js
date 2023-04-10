import React, { useState } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";
const ScrFlowApp = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  //console.log(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG"));
  const [isEditStillBirth, setIsEditStillBirth] = useState(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG")? true : false);  
  const [params, setParams, clearParams] = isEditStillBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_STILLBIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_STILLBIRTH_REG", {});
  // console.log("isEditBirth" + isEditBirth);
  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  const stillbirthConfig = newConfig.find((item)=> item.head === "StillBirth Routing");

  config = config.concat(stillbirthConfig.body.filter((a) => !a.hideInCitizen));

  config.indexRoute = "stillbirth-child-details";
  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
    
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
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    }
    else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_STILLBIRTH_REG");
  };
  const handleSkip = () => { };
  const handleMultiple = () => { };
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("StillBirthCheckPage");
  const StillBirthAcknowledgement = Digit?.ComponentRegistryService?.getComponent("StillBirthAcknowledgement");
  return (

    <React.Fragment>
      <Switch>
        {config.map((routeObj, index) => {
          const { component, texts, inputs, key, isSkipEnabled } = routeObj;
          const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
          return (
            <Route path={`${match.path}/${routeObj.route}`} key={index}>
              <Component
                config={{ texts, inputs, key, isSkipEnabled }}
                onSelect={handleSelect}
                onSkip={handleSkip}
                t={t}
                formData={params}
                onAdd={handleMultiple}
                userType="employee"
                isEditBirth={isEditStillBirth}
              />
            </Route>

          );
        })}
        <Route path={`${match.path}/check`}>
          <CheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <StillBirthAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>

      </Switch>
    </React.Fragment>
  );
};

export default ScrFlowApp;