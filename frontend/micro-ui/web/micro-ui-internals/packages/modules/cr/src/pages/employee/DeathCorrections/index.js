import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
// import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";
import ApplicationDetailsTemplate from "./ApplicationContent";
import cloneDeep from "lodash/cloneDeep";
import { useParams } from "react-router-dom";
import { Header, CardHeader } from "@egovernments/digit-ui-react-components";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import ActionModal from "../../../../../templates/ApplicationDetails/Modal";
import ApplicationDetailsToast from "../../../../../templates/ApplicationDetails/components/ApplicationDetailsToast";
import ApplicationDetailsActionBar from "../../../../../templates/ApplicationDetails/components/ApplicationDetailsActionBar";
import ApplicationDetailsWarningPopup from "../../../../../templates/ApplicationDetails/components/ApplicationDetailsWarningPopup";

const CorrectionApplicationDetails = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber, type: inboxType } = useParams();
  const [showToast, setShowToast] = useState(null);
  // const [callUpdateService, setCallUpdateValve] = useState(false);
  const [businessService, setBusinessService] = useState("CORRECTIONDEATH"); //DIRECTRENEWAL BIRTHHOSP21
  const [numberOfApplications, setNumberOfApplications] = useState([]);
  const [allowedToNextYear, setAllowedToNextYear] = useState(false);
  const [enableApi, setEnableApi] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEnableLoader, setIsEnableLoader] = useState(false);
  const [isWarningPop, setWarningPopUp] = useState(false);

  const { moduleCode, forcedActionPrefix, ActionBarStyle, MenuStyle, wardcodes } = props;

  sessionStorage.setItem("applicationNumber", applicationNumber);
  // const { renewalPending: renewalPending } = Digit.Hooks.useQueryParams();
  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.cr.useCorrectionApplicationDetail(
    t,
    tenantId,
    applicationNumber,
    "death"
  );
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_EDIT_ADOPTION_REG", {});
  const [editFlag, setFlag] = Digit.Hooks.useSessionStorage("CR_EDIT_ADOPTION_FLAG", false);
  const stateId = Digit.ULBService.getStateId();

  // const {
  //   isLoading: updatingApplication,
  //   isError: updateApplicationError,
  //   data: updateResponse,
  //   error: updateError,
  //   mutate,
  // } = Digit.Hooks.cr.useApplicationActions(tenantId);

  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.cr.updateDeathCorrectionAction(tenantId);

  // let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  // console.log(applicationDetails?.applicationData?.applicationtype);

  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };

  const submitAction = async (data, nocData = false, isOBPS = {}) => {
    setIsEnableLoader(true);
    if (typeof data?.customFunctionToExecute === "function") {
      data?.customFunctionToExecute({ ...data });
    }
    if (nocData !== false && nocMutation) {
      const nocPrmomises = nocData?.map((noc) => {
        return nocMutation?.mutateAsync(noc);
      });
      try {
        setIsEnableLoader(true);
        const values = await Promise.all(nocPrmomises);
        values &&
          values.map((ob) => {
            Digit.SessionStorage.del(ob?.Noc?.[0]?.nocType);
          });
      } catch (err) {
        setIsEnableLoader(false);
        let errorValue = err?.response?.data?.Errors?.[0]?.code
          ? t(err?.response?.data?.Errors?.[0]?.code)
          : err?.response?.data?.Errors?.[0]?.message || err;
        closeModal();
        setShowToast({ key: "error", error: { message: errorValue } });
        setTimeout(closeToast, 5000);
        return;
      }
    }
    if (mutate) {
      setIsEnableLoader(true);
      mutate(data, {
        onError: (error, variables) => {
          setIsEnableLoader(false);
          setShowToast({ key: "error", error });
          setTimeout(closeToast, 5000);
        },
        onSuccess: (data, variables) => {
          setIsEnableLoader(false);
          if (isOBPS?.bpa) {
            data.selectedAction = selectedAction;
            history.replace(`/digit-ui/employee/obps/response`, { data: data });
          }
          if (isOBPS?.isStakeholder) {
            data.selectedAction = selectedAction;
            history.push(`/digit-ui/employee/obps/stakeholder-response`, { data: data });
          }
          if (isOBPS?.isNoc) {
            history.push(`/digit-ui/employee/noc/response`, { data: data });
          }
          setShowToast({ key: "success", action: selectedAction });
          setTimeout(closeToast, 5000);
          queryClient.clear();
          queryClient.refetchQueries("APPLICATION_SEARCH");
        },
      });
    }
    closeModal();
  };

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.applicationData?.InformationDeathCorrection?.TenantId || tenantId,
    id: applicationDetails?.applicationData?.InformationDeathCorrection?.DeathACKNo,
    moduleCode: "CORRECTIONDEATH",
    role: "BND_CEMP" || "BND_SUB_REGISTRAR" || "BND_LOCAL_REGISTRAR" || "CHIEF_REGISTRAR" || "DISTRICT_REGISTRAR",
    config: { enabled: enableApi },
  });

  useEffect(() => {
    console.log("applicati......", applicationDetails);
    if (applicationDetails?.applicationData?.InformationDeathCorrection?.DeathACKNo?.length > 0) {
      setEnableApi(true);
    }
    console.log("applicationDetails==", applicationDetails);
  }, [applicationDetails]);

  useEffect(() => {
    console.log("workflowDetails==", workflowDetails);
  }, [workflowDetails]);

  const closeToast = () => {
    setShowToast(null);
  };

  function onActionSelect(action) {
    if (action) {
      if (action?.isWarningPopUp) {
        setWarningPopUp(true);
      } else if (action?.redirectionUrll) {
        window.location.assign(`${window.location.origin}/digit-ui/employee/payment/collect/${action?.redirectionUrll?.pathname}`);
      } else if (!action?.redirectionUrl) {
        setShowModal(true);
      } else {
        history.push({
          pathname: action.redirectionUrl?.pathname,
          state: { ...action.redirectionUrl?.state },
        });
      }
    }
    setSelectedAction(action);
    setDisplayMenu(false);
  }

  useEffect(() => {
    if (applicationDetails?.numOfApplications?.length > 0) {
      let financialYear = cloneDeep(applicationDetails?.applicationData?.financialYear);
      const financialYearDate = financialYear?.split("-")[1];
      const finalFinancialYear = `20${Number(financialYearDate)}-${Number(financialYearDate) + 1}`;
      const isAllowedToNextYear = applicationDetails?.numOfApplications?.filter(
        (data) => data.financialYear == finalFinancialYear && data?.status !== "REJECTED"
      );
      if (isAllowedToNextYear?.length > 0) setAllowedToNextYear(false);
      if (!isAllowedToNextYear || isAllowedToNextYear?.length == 0) setAllowedToNextYear(true);
      setNumberOfApplications(applicationDetails?.numOfApplications);
    }
  }, [applicationDetails?.numOfApplications]);

  useEffect(() => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
  }, [workflowDetails.data]);

  if (workflowDetails?.data?.processInstances?.length > 0) {
    let filteredActions = [];
    filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter((item) => item.action != "ADHOC");
    let actions = orderBy(filteredActions, ["action"], ["desc"]);
    if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];

    workflowDetails?.data?.actionState?.nextActions?.forEach((data) => {
      // console.log(data.action);
      if (data.action == "EDIT") {
        // /digit-ui/employee/cr/cr-flow/child-details/${applicationNumber}
        (data.redirectionUrl = {
          pathname: `/digit-ui/employee/cr/create-birth/child-details`,
          state: applicationDetails,
        }),
          (data.tenantId = stateId);
      }
    });
  }

  const userInfo = Digit.UserService.getUser();
  const rolearray = userInfo?.info?.roles.filter((item) => {
    if ((item.code == "HOSPITAL_OPERATOR" && item.code == "BND_CEMP" && item.tenantId === tenantId) || item.code == "CITIZEN") return true;
  });

  const rolecheck = rolearray.length > 0 ? true : false;
  const validTo = applicationDetails?.applicationData?.validTo;
  const currentDate = Date.now();
  const duration = validTo - currentDate;
  if (
    rolecheck &&
    (applicationDetails?.applicationData?.status === "APPROVED" ||
      applicationDetails?.applicationData?.status === "EXPIRED" ||
      (applicationDetails?.applicationData?.status === "MANUALEXPIRED" && renewalPending === "true"))
  ) {
    if (workflowDetails?.data && allowedToNextYear) {
      if (!workflowDetails?.data?.actionState) {
        workflowDetails.data.actionState = {};
        workflowDetails.data.actionState.nextActions = [];
      }
      const flagData = workflowDetails?.data?.actionState?.nextActions?.filter((data) => data.action == "RENEWAL_SUBMIT_BUTTON");
      if (flagData && flagData.length === 0) {
        workflowDetails?.data?.actionState?.nextActions?.push({
          action: "RENEWAL_SUBMIT_BUTTON",
          redirectionUrl: {
            pathname: `/digit-ui/employee/tl/renew-application-details/${applicationNumber}`,
            state: applicationDetails,
          },
          tenantId: stateId,
          role: [],
        });
      }
      // workflowDetails = {
      //   ...workflowDetails,
      //   data: {
      //     ...workflowDetails?.data,
      //     actionState: {
      //       nextActions: allowedToNextYear ?[
      //         {
      //           action: "RENEWAL_SUBMIT_BUTTON",
      //           redirectionUrl: {
      //             pathname: `/digit-ui/employee/tl/renew-application-details/${applicationNumber}`,
      //             state: applicationDetails
      //           },
      //           tenantId: stateId,
      //         }
      //       ] : [],
      //     },
      //   },
      // };
    }
  }

  if (rolearray && applicationDetails?.applicationData?.status === "PENDINGPAYMENT") {
    workflowDetails?.data?.nextActions?.map((data) => {
      if (data.action === "PAY") {
        workflowDetails = {
          ...workflowDetails,
          data: {
            ...workflowDetails?.data,
            actionState: {
              nextActions: [
                {
                  action: data.action,
                  redirectionUrll: {
                    pathname: `TL/${applicationDetails?.applicationData?.InformationDeathCorrection?.DeathACKNo}/${tenantId}`,
                    state: tenantId,
                  },
                  tenantId: tenantId,
                },
              ],
            },
          },
        };
      }
    });
  }

  const wfDocs = workflowDetails.data?.timeline?.reduce((acc, { wfDocuments }) => {
    return wfDocuments ? [...acc, ...wfDocuments] : acc;
  }, []);
  // const ownerdetails = applicationDetails?.applicationDetails.find(e => e.title === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS");
  // let appdetailsDocuments = ownerdetails?.additionalDetails?.documents;
  // if(appdetailsDocuments && wfDocs?.length && !(appdetailsDocuments.find(e => e.title === "TL_WORKFLOW_DOCS"))){
  //   ownerdetails.additionalDetails.documents = [...ownerdetails.additionalDetails.documents,{
  //     title: "TL_WORKFLOW_DOCS",
  //     values: wfDocs?.map?.((e) => ({ ...e, title: e.documentType})),
  //   }];
  // }

  return (
    <div>
      <div /* style={{marginLeft: "15px"}} */>
        {/* <Header style={{fontSize: "22px !important"}}>{(applicationDetails?.applicationData?.workflowCode == "NewTL" && applicationDetails?.applicationData?.status !== "APPROVED") ? t("TL_TRADE_APPLICATION_DETAILS_LABEL") : t("Birth Application Details")}</Header> */}
        {/* <label style={{ fontSize: "19px", fontWeight: "bold",marginLeft:"15px" }}>{`${t("Birth Application Summary Details")}`}</label> */}
      </div>
      <ApplicationDetailsTemplate
        header={"CR_DEATH_SUMMARY_DETAILS"}
        applicationDetails={applicationDetails}
        isLoading={isLoading}
        isDataLoading={isLoading}
        applicationData={applicationDetails?.applicationData}
        mutate={mutate}
        workflowDetails={workflowDetails}
        businessService={businessService}
        moduleCode="death-services"
        showToast={showToast}
        setShowToast={setShowToast}
        closeToast={closeToast}
        timelineStatusPrefix={"WFDEATH21DAYS"}
      />
      {showModal ? (
        <ActionModal
          t={t}
          action={selectedAction}
          tenantId={tenantId}
          state={stateId}
          id={applicationNumber}
          applicationDetails={applicationDetails}
          applicationData={applicationDetails?.applicationData}
          closeModal={closeModal}
          submitAction={submitAction}
          actionData={workflowDetails?.data?.timeline}
          businessService={businessService}
          workflowDetails={workflowDetails}
          moduleCode={moduleCode}
          wardcodes={wardcodes}
        />
      ) : null}
      {isWarningPop ? (
        <ApplicationDetailsWarningPopup
          action={selectedAction}
          workflowDetails={workflowDetails}
          businessService={businessService}
          isWarningPop={isWarningPop}
          closeWarningPopup={closeWarningPopup}
        />
      ) : null}
      <ApplicationDetailsToast t={t} showToast={showToast} closeToast={closeToast} businessService={businessService} />
      <ApplicationDetailsActionBar
        workflowDetails={workflowDetails}
        displayMenu={displayMenu}
        onActionSelect={onActionSelect}
        setDisplayMenu={setDisplayMenu}
        businessService={businessService}
        forcedActionPrefix={forcedActionPrefix}
        ActionBarStyle={ActionBarStyle}
        MenuStyle={MenuStyle}
      />
    </div>
  );
};

export default CorrectionApplicationDetails;
