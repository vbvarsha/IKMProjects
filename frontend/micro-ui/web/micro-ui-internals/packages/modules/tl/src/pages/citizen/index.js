import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// import TradeLicense from "../../pageComponents/TradeLicense";
// import MyApplications from "../../pages/citizen/Applications/Application";
// import ApplicationDetails from "../../pages/citizen/Applications/ApplicationDetails";
// import CreateTradeLicence from "./Create";
// import EditTrade from "./EditTrade";
// import { TLList } from "./Renewal";
// import RenewTrade from "./Renewal/renewTrade";
// import SearchTradeComponent from "./SearchTrade";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  let isSuccessScreen = window.location.href.includes("acknowledgement");
  let isCommonPTPropertyScreen = window.location.href.includes("/tl/tradelicence/new-application/property-details");

  const ApplicationDetails = Digit.ComponentRegistryService.getComponent("TLApplicationDetails");
  const CreateTradeLicence = Digit?.ComponentRegistryService?.getComponent('TLCreateTradeLicence');
  const EditTrade = Digit?.ComponentRegistryService?.getComponent('TLEditTrade');
  const RenewTrade = Digit?.ComponentRegistryService?.getComponent('TLRenewTrade');
  const TradeLicense = Digit?.ComponentRegistryService?.getComponent('TradeLicense');
  const TLList = Digit?.ComponentRegistryService?.getComponent('TLList');
  const SearchTradeComponent = Digit?.ComponentRegistryService?.getComponent('TLSearchTradeComponent');
 // const MyApplications = Digit?.ComponentRegistryService?.getComponent('MyApplications');
  const MyApplicationDetails= Digit?.ComponentRegistryService?.getComponent('MyApplicationDetails');
  const SearchRenewalTrade = Digit?.ComponentRegistryService?.getComponent('TLSearchRenewalTrade');
  const CorrectionTradeLicence=Digit?.ComponentRegistryService?.getComponent('CorrectionTradeLicence');
  const CancelTradeLicence=Digit?.ComponentRegistryService?.getComponent('CancelTradeLicence');
  const getBackPageNumber = () => {
    let goBacktoFromProperty = -1;
  if(sessionStorage.getItem("VisitedCommonPTSearch") === "true" && (sessionStorage.getItem("VisitedAccessoriesDetails") === "true" || sessionStorage.getItem("VisitedisAccessories") === "true") && isCommonPTPropertyScreen)
  {
    goBacktoFromProperty = -4;
    sessionStorage.removeItem("VisitedCommonPTSearch");
    return goBacktoFromProperty;
  }
  return goBacktoFromProperty;
  }

  return (
    <span className={"tl-citizen"}>
      <Switch>
        <AppContainer>
          <BackButton /* style={{ position: "fixed", top: "55px" }} */ isCommonPTPropertyScreen={isCommonPTPropertyScreen} isSuccessScreen={isSuccessScreen} getBackPageNumber={getBackPageNumber}>Back</BackButton>
          <PrivateRoute path={`${path}/tradelicence/new-application`} component={() => <CreateTradeLicence  isRenewal={false}/>} />
          <PrivateRoute path={`${path}/tradelicence/edit-application/:id/:tenantId`} component={EditTrade} />
          <PrivateRoute path={`${path}/tradelicence/renew-trade/:id/:tenantId`} component={RenewTrade} />
          <PrivateRoute path={`${path}/tradelicence/my-application`} component={MyApplicationDetails}/>
          
          {/* // component={MyApplications} /> */}
          {/* <PrivateRoute path={`${path}/tradelicence/my-bills`} component={() => <MyApplications view="bills" />} /> */}
          <PrivateRoute path={`${path}/tradelicence/tl-info`} component={TradeLicense} />
          <PrivateRoute path={`${path}/tradelicence/application/:id/:tenantId`} component={ApplicationDetails} />
          <PrivateRoute path={`${path}/tradelicence/renewal-list`} component={TLList} />
          <PrivateRoute path={`${path}/tradelicence/trade-search`} component={SearchTradeComponent} />
          {/* <PrivateRoute path={`${path}/tradelicence/license-renewal-search`} component={SearchRenewalTrade} /> */}
          <PrivateRoute path={`${path}/tradelicence/license-renewal-search`} component={()=><SearchRenewalTrade isCorrectionreq={false}/>} />
          <PrivateRoute path={`${path}/tradelicence/license-correction-search`} component={()=><SearchRenewalTrade isProcessreq="CORRECTION"/>}/>
          <PrivateRoute path={`${path}/tradelicence/license-renewal-pde`}   component={() => <CreateTradeLicence  isRenewal={true}/>} />
           <PrivateRoute path={`${path}/tradelicence/license-correction`} component={() => <CorrectionTradeLicence  isRenewal={false}/>} /> 
           <PrivateRoute path={`${path}/tradelicence/license-cancellation-search`} component={()=><SearchRenewalTrade isProcessreq="CANCELLATION"/>}/>
           <PrivateRoute path={`${path}/tradelicence/license-cancellation`} component={() => <CancelTradeLicence  isRenewal={false}/>} /> 
          {/* component={() => <CreateTradeLicence  isRenewal={true}/>} />	 */}
        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
