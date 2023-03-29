import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToDeathRegistration, convertToEditDeathRegistration } from "../../../utils";
import getPDFData from "../../../utils/getTLAcknowledgementData";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    console.log(props.isSuccess);
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application")
      ? t("CR_APPLICATION_SUCCESS")
      : t("CR_UPDATE_APPLICATION_SUCCESS");
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};

const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  // console.log(JSON.stringify(props));

  return (
    // <Banner
    //   message={GetActionMessage(props)}
    //   applicationNumber={props.data?.Licenses[0]?.applicationNumber}
    //   info={props.isSuccess ? props.t("AK-16-2023-CRDRNR-C-KOCHI-KL") : ""}
    //   successful={props.isSuccess}
    // />

    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />
  );
};
const DeathAcknowledgement = ({ data, onSuccess, userType }) => {
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isRenewTrade = !window.location.href.includes("renew-trade");

  const [isEditDeath, setIsEditDeath] = useState(Digit.Hooks.useSessionStorage("CR_DEATH_EDIT_FLAG", {})[0] ? true :false
  );
  console.log("isEditDeath" + isEditDeath);
  const mutation = Digit.Hooks.cr.useCivilRegistrationDeathAPI(tenantId, isEditDeath ? false : true );
  // console.log("isEditDeath" + isEditDeath);

  // const mutation1 = Digit.Hooks.cr.useCivilRegistrationDeathAPI(
  //   data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId,
  //   false
  // );
  // const mutation2 = Digit.Hooks.cr.useCivilRegistrationDeathAPI(
  //   data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId,
  //   false
  // );
  const isEdit = window.location.href.includes("renew-trade");
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  // const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");
  // let isDirectRenewal = sessionStorage.getItem("isDirectRenewal") ? stringToBoolean(sessionStorage.getItem("isDirectRenewal")) : null;
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      // const onSuccessedit = () => {
      //   setMutationHappened(true);
      // };
      try {
        setIsInitialRender(false);
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!resubmit) {
          // let formdata = !isEdit ? convertToDeathRegistration(data) : convertToEditTrade(data, fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "CR") : []);
          let formdata = !isEditDeath ? convertToDeathRegistration(data) : convertToEditDeathRegistration(data);
          // let formdata = !isEdit ? convertToDeathRegistration(data):[] ;
          console.log(formdata);
          // formdata.BirthDetails[0].tenantId = formdata?.BirthDetails[0]?.tenantId || tenantId1;
          if (!isEditDeath) {
            console.log("@@@@@@" + isEditDeath);

            mutation.mutate(formdata, {
              onSuccess,
            });
          } else {
            mutation.mutate(formdata, {
              onSuccess,
            });
          }
          // else{
          //   if((fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal))
          //   {
          //     mutation2.mutate(formdata, {
          //       onSuccess,
          //     })
          //   }
          //   else
          //   {
          //     mutation1.mutate(formdata, {
          //       onSuccess,
          //     })
          //   }
          // }

          // !isEdit ? mutation.mutate(formdata, {
          //   onSuccess,
          // }) : (fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal ? mutation2.mutate(formdata, {
          //   onSuccess,
          // }) :mutation1.mutate(formdata, {
          //   onSuccess,
          // }));
        } else {
          // let formdata = convertToResubmitTrade(data);
          // formdata.Licenses[0].tenantId = formdata?.Licenses[0]?.tenantId || tenantId1;
          // !mutation2.isLoading && !mutation2.isSuccess &&!mutationHappened && mutation2.mutate(formdata, {
          //   onSuccessedit,
          // })
        }
      } catch (err) {}
    }
  }, [mutation]);

  // useEffect(() => {
  //   if (mutation.isSuccess || (mutation1.isSuccess && isEdit && !isDirectRenewal)) {
  //     try {
  //       let Licenses = !isEdit ? convertToUpdateTrade(mutation.data, data) : convertToUpdateTrade(mutation1.data, data);
  //       mutation2.mutate(Licenses, {
  //         onSuccess,
  //       });
  //     }
  //     catch (er) {
  //     }
  //   }
  // }, [mutation.isSuccess, mutation1.isSuccess]);

  const handleDownloadPdf = async () => {
    const { Licenses = [] } = mutation.data;
    const License = (Licenses && Licenses[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
    let res = License;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };
  // let enableLoader = !resubmit ? (!isEdit ? mutation.isIdle || mutation.isLoading : isDirectRenewal ? false : mutation1.isIdle || mutation1.isLoading):false;
  // if(enableLoader)
  // {return (<Loader />)}
  // else if( ((mutation?.isSuccess == false && mutation?.isIdle == false) || (mutation1?.isSuccess == false && mutation1?.isIdle == false )) && !isDirectRenewal && !resubmit)
  // {
  //   return (
  //   <Card>
  //     <BannerPicker t={t} data={mutation.data || mutation1.data} isSuccess={mutation.isSuccess || mutation1.isSuccess} isLoading={(mutation?.isLoading || mutation1?.isLoading)} />
  //     {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>}
  //     <Link to={`/digit-ui/citizen`}>
  //       <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
  //     </Link>
  //   </Card>)
  // }
  // else if(mutation2.isLoading || mutation2.isIdle ){
  //   return (<Loader />)
  // }
  // else
  if (mutation.isSuccess && mutation?.isError === null) {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={mutation.isIdle || mutation.isLoading} />
        {/* <CardText>{!isDirectRenewal?t("Application Submitted Successfully"):t("TL_FILE_TRADE_RESPONSE_DIRECT_REN")}</CardText> */}

        <LinkButton
          label={
            <div className="response-download-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("Acknowledgment454545")}</span>
            </div>
          }
          //style={{ width: "100px" }}
          onClick={handleDownloadPdf}
        />
        {/* <BannerPicker t={t} data={mutation2.data} isSuccess={mutation2.isSuccess} isLoading={(mutation2.isIdle || mutation2.isLoading)} />
      {(mutation2.isSuccess) && <CardText>{!isDirectRenewal?t("TL_FILE_TRADE_RESPONSE"):t("TL_FILE_TRADE_RESPONSE_DIRECT_REN")}</CardText>}
      {(!mutation2.isSuccess) && <CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>}
      {!isEdit && mutation2.isSuccess && <SubmitBar label={t("TL_DOWNLOAD_ACK_FORM")} onSubmit={handleDownloadPdf} />}
      {(mutation2.isSuccess) && isEdit && (
        <LinkButton
          label={
            <div className="response-download-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("TL_DOWNLOAD_ACK_FORM")}</span>
            </div>
          }
          //style={{ width: "100px" }}
          onClick={handleDownloadPdf}
        />)}
      {mutation2?.data?.Licenses[0]?.status === "PENDINGPAYMENT" && <Link to={{
        pathname: `/digit-ui/citizen/payment/collect/${mutation2.data.Licenses[0].businessService}/${mutation2.data.Licenses[0].applicationNumber}`,
        state: { tenantId: mutation2.data.Licenses[0].tenantId },
      }}>
        <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
      </Link>}
      <Link to={`/digit-ui/citizen`}>
        <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link> */}
      </Card>
    );
  } else {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default DeathAcknowledgement;
