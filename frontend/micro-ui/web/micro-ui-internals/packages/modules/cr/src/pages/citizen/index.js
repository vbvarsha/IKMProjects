import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch,useLocation,useHistory } from "react-router-dom";
import ChildDetails from "../../pageComponents/birthComponents/ChildDetails";
import StillBirthChildDetails from "../../pageComponents/stillBirthComponents/StillBirthChildDetails";
import BornOutsideChildDetails from "../../pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
import InformationDeath from "../../pageComponents/deathComponents/InformationDeath";
import DeathInclusionPage from "../../pageComponents/deathComponents/InformationDeath";
import BirthCertificateSearch from "./BirthCertificate";
import DeathCertificate from "./Certificate/DeathCertificate";
import DeathCertificateSearch from "./Certificate";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../config/config";
import CrCitizenFlowApp from "./BirthRegistration";
// import CreateBirthCertificate from "./Create";
// import CreateDeathCertificate from "./DeathReg"; 
import AbandonedChildDetails from "../../pageComponents/abandonedBirthComponents/AbandonedChildDetails";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  let isSuccessScreen = window.location.href.includes("acknowledgement");
  // let isCommonPTPropertyScreen = window.location.href.includes("/tl/tradelicence/new-application/property-details");
  const ApplicationDetails = Digit.ComponentRegistryService.getComponent("CRCitizenApplicationDetails");
  const ApplicationDeathDetails = Digit.ComponentRegistryService.getComponent("CRDeathApplicationDetails");
  


  const CreateBirthRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateBirthRegistration');
  const CreateBirthNACRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateBirthNACRegistration');
  const CreateAdoption = Digit?.ComponentRegistryService?.getComponent('CRCreateAdoptions');
  const CreateStillBirthRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateStillBirthRegistration');
  const CreateAbandonedBirth =  Digit?.ComponentRegistryService?.getComponent('CRCreateAbandonedBirth');
  const CreateBornOutsideRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateBornOutsideRegistration');
  const CreateDeathRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateDeathRegistration');
  const CreateMarriageRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateMarriageRegistration');
  const MyCRApplications = Digit?.ComponentRegistryService?.getComponent('MyCRApplications');
  const MyCRDeathApplications = Digit?.ComponentRegistryService?.getComponent('MyCRDeathApplications');
  const CRBirthInclusions = Digit?.ComponentRegistryService?.getComponent('CRBirthInclusions');
  const CRDeathInclusions = Digit?.ComponentRegistryService?.getComponent('CRDeathInclusions');
  const CRDeathInclusionsPage = Digit?.ComponentRegistryService?.getComponent('CRDeathInclusionsPage');

  const CRBirthInclusionEditPage = Digit?.ComponentRegistryService?.getComponent('CRBirthInclusionEditPage');


  // const getBackPageNumber = () => {
  //   let goBacktoFromProperty = -1;
  //   if (
  //     sessionStorage.getItem("VisitedCommonPTSearch") === "true" &&
  //     (sessionStorage.getItem("VisitedAccessoriesDetails") === "true" || sessionStorage.getItem("VisitedisAccessories") === "true") &&
  //     isCommonPTPropertyScreen
  //   ) {
  //     goBacktoFromProperty = -4;
  //     sessionStorage.removeItem("VisitedCommonPTSearch");
  //     return goBacktoFromProperty;
  //   }
  //   return goBacktoFromProperty;
  // };


  return (
    <span className={"cr-citizen"}>
      <Switch>
      <AppContainer>
        <PrivateRoute path={`${path}/cr-birth-creation`} component={CreateBirthRegistration} />
        <PrivateRoute path={`${path}/cr-name-inclusion`} component={CRBirthInclusions} />
        <PrivateRoute parentRoute={path} path={`${path}/birth-inclusion-edit`} component={CRBirthInclusionEditPage} />
        <PrivateRoute path={`${path}/cr-birth-nac`} component={CreateBirthNACRegistration} />
        <PrivateRoute path={`${path}/cr-adoption`} component={CreateAdoption} />
        <PrivateRoute path={`${path}/cr-stillbirth-creation`} component={CreateStillBirthRegistration} />
        <PrivateRoute path={`${path}/cr-outsideindiabirth-creation`} component={CreateBornOutsideRegistration} />
        <PrivateRoute path={`${path}/cr-abandonedbirth-creation`} component={CreateAbandonedBirth} />
        <PrivateRoute path={`${path}/cr-death-creation`} component={CreateDeathRegistration} />
        <PrivateRoute path={`${path}/cr-marriage-creation`} component={CreateMarriageRegistration} />
        <PrivateRoute path={`${path}/cr/my-application`} component={MyCRApplications} />
        <PrivateRoute path={`${path}/cr/death/my-application`} component={MyCRDeathApplications} />
        <PrivateRoute path={`${path}/cr/my-bills`} component={() => <MyCRApplications view="bills" />} />
        <PrivateRoute path={`${path}/cr/application/:id/:tenantId`} component={ApplicationDetails} />
        <PrivateRoute path={`${path}/cr/death/application/:id/:tenantId`} component={ApplicationDeathDetails} />
        <PrivateRoute path={`${path}/cr-death-inclusion`} component={CRDeathInclusions} />
        <PrivateRoute path={`${path}/create-death-certificate`} component={() => <DeathCertificateSearch parentUrl={path}/>} /> 
        <PrivateRoute parentRoute={path} path={`${path}/create-birth-certificate`} component={() => <BirthCertificateSearch parentUrl={path} />} /> 
        <PrivateRoute parentRoute={path} path={`${path}/death-inclusion-edit`} component={CRDeathInclusionsPage} /> 
       </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
