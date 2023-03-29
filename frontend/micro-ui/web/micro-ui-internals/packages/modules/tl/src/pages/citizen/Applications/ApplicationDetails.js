import {
  Card,
  CardHeader,
  Loader,
  MultiLink,
  Row,
  SubmitBar,
  Header,
  CardSubHeader,
  CardSectionHeader,
  LinkLabel,
  LinkButton,
  StatusTable,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import getPDFData from "../../../utils/getTLAcknowledgementData";
import TLWFApplicationTimeline from "../../../pageComponents/TLWFApplicationTimeline";
import TLDocument from "../../../pageComponents/TLDocumets";

const getAddress = (address, t) => {
  return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
    address?.landmark ? `${address?.landmark}, ` : ""
  }${t(address?.locality.code)}, ${t(address?.city.code)},${t(address?.pincode) ? `${address.pincode}` : " "}`
} 


const TLApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { tenantId } = useParams();
  const history = useHistory();
  const [bill, setBill] = useState(null);
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const { tenants } = storeData || {};
  let multiBoxStyle = {
    border: "groove",
    background: "#FAFAFA",
    borderRadius: "4px",
    paddingInline: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  };
  let multiHeaderStyle = { marginBottom: "10px", marginTop: "10px", color: "#505A5F" };
  //todo: hook should return object to render the data
  const { isLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.tl.useTLApplicationDetails({
    tenantId: tenantId,
    applicationNumber: id,
  });

  const  [application_cert,setApplication_cert] = useState({});

  // const { isLoading: PTLoading, isError: isPTError, data: PTData } = Digit.Hooks.pt.usePropertySearch(
  //   {
  //     tenantId,
  //     filters: { propertyIds: application?.[0]?.tradeLicenseDetail?.additionalDetail?.propertyId },
  //   },
  //   { enabled: application?.[0]?.tradeLicenseDetail?.additionalDetail?.propertyId ? true : false }
  // );

  useEffect(() => {
    setMutationHappened(false);
  }, []);

  const { data: paymentsHistory } = Digit.Hooks.tl.useTLPaymentHistory(tenantId, id);
  useEffect(() => {
    if (application) {
      Digit.PaymentService.fetchBill(tenantId, {
        consumerCode: application[0]?.applicationNumber,
        businessService: application[0]?.businessService,
      }).then((res) => {
        setBill(res?.Bill[0]);
      });
      setApplication_cert(rearrangeApplication(application));
    }
  }, [application_cert]);

  function rearrangeApplication(application){
    if(application[0].applicationNumber){
      let tenantIdV = application[0].tenantId;
      let businessServiceV = application[0].businessService;
      let licenseTypeV = application[0].licenseType;
      let applicationTypeV = application[0].applicationType;
      let licenseNumberV = application[0].licenseNumber;
      let applicationNumberV = application[0].applicationNumber;
      let licenseUnitNameV = application[0].licenseUnitName;
      let applicationDateV = application[0].applicationDate;
      let issuedDateV = application[0].issuedDate;
      let financialYearV = application[0].financialYear;
      let validFromV = application[0].validFrom;
      let validToV = application[0].validTo;
      let commencementDateV = application[0].commencementDate;
      let structureTypeV = application[0].tradeLicenseDetail.structureType;
      let owners = [];
      application[0].tradeLicenseDetail.owners.map((owner)=>{
        owners.name = owner.name;
        owners.mobileNumber = owner.mobileNumber;
        owners.emailId = owner.emailId;
        owners.applicantNameLocal = owner.applicantNameLocal;
        owners.careOf = owner.careOf;
        owners.careOfName = owner.careOfName;
        owners.designation = owner?.designation ? owner?.designation : '';
        owners.address = owner.houseName  + ","? owner.houseName : '' + 
        owner.street ? owner.street  + ",": '' + 
        owner.locality ? owner.locality  + ",": '' +
        owner.postOffice ? owner.postOffice  + ",": '' + "-" +
        owner.pincode ? owner.pincode : '' ;
      });
      let structureTypeDetails = application[0].tradeLicenseDetail.address.wardNo;
      if(structureTypeV === "BUILDING"){
        structureTypeDetails += "/" + application[0].tradeLicenseDetail.address.doorNo;
      }

      let addressV = structureTypeDetails ? "," : '' + application[0].tradeLicenseDetail.address.buildingName + 
      application[0].tradeLicenseDetail.address.street ? ", " + application[0].tradeLicenseDetail.address.street : '' +
      application[0].tradeLicenseDetail.address.locality ? ", " + application[0].tradeLicenseDetail.address.locality : '' +
      application[0].tradeLicenseDetail.address.landmark ? ", " + application[0].tradeLicenseDetail.address.landmark : '' +
      application[0].tradeLicenseDetail.address.waterbody ? ", " + application[0].tradeLicenseDetail.address.waterbody : '' +
      application[0].tradeLicenseDetail.address.serviceArea ? ", " + application[0].tradeLicenseDetail.address.serviceArea : '' +
      application[0].tradeLicenseDetail.address.localityName ? ", " + application[0].tradeLicenseDetail.address.localityName : '' +
      application[0].tradeLicenseDetail.address.postOffice ? ", " + application[0].tradeLicenseDetail.address.postOffice  + "-" + application[0].tradeLicenseDetail.address.pincode : '';
    
      let tradeUnitsV = application[0].tradeLicenseDetail.tradeUnits;
      let ownerPhotoV = application[0].tradeLicenseDetail.applicationDocuments.filter((doc)=>{
        doc.documentType === "OWNERPHOTO"
        doc?.documentType.includes("OWNERPHOTO")
      })[0];
      let structurePlaceV = [];

      if(structureTypeV === "BUILDING" || structureTypeV === "LBBUILDING"){
        application[0].tradeLicenseDetail.structurePlace.map((strutPlace) => {
          structurePlaceV.doorNo = strutPlace.doorNo;
          structurePlaceV.doorNoSub = strutPlace.doorNoSub;
          structurePlaceV.stallNo= strutPlace.stallNo
        });
      } 
      else if (structureTypeV === "LAND"){
        structurePlaceV.blockNo = application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo;
        structurePlaceV.surveyNo = application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo;
        structurePlaceV.subDivisionNo = application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo;
        structurePlaceV.partitionNo = application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo;
      }
      else if (structureTypeV === "VEHICLE"){
        structurePlaceV.vehicleNo = application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo;
      }
      else if (structureTypeV === "WATER"){
        structurePlaceV.vesselNo = application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo;
      }
      let institution = [];
      if( application[0]?.tradeLicenseDetail?.institution){
        institution.institutionName = application[0]?.tradeLicenseDetail?.institution?.institutionName;
        institution.organisationregistrationno = application[0]?.tradeLicenseDetail?.institution?.organisationregistrationno;
        institution.address = application[0]?.tradeLicenseDetail?.institution?.address;
        institution.licenseUnitId = application[0]?.tradeLicenseDetail?.institution?.licenseUnitId;
      }
      let licenseUnitNameLocalV = application[0]?.licenseUnitNameLocal;
      let desiredLicensePeriodV = application[0]?.desiredLicensePeriod;
      let businessSector = application[0]?.desiredLicensePeriod;
      let capitalInvestment = application[0]?.capitalInvestment;
      let enterpriseType = application[0]?.enterpriseType;
      let structurePlaceSubtype = application[0]?.structurePlaceSubtype;
      let businessActivityDesc = application[0]?.businessActivityDesc;
      let licenseeType = application[0]?.licenseeType;
      let ownershipCategory = application[0]?.tradeLicenseDetail?.ownershipCategory;
      return {"tenantId" : tenantIdV,
        "businessService" : businessServiceV,
        "licenseType" : licenseTypeV,
        "applicationType" : applicationTypeV,
        "licenseNumber" : licenseNumberV,
        "applicationNumber" : applicationNumberV,
        "licenseUnitName" : licenseUnitNameV,
        "applicationDate" : applicationDateV,
        "issuedDate" : issuedDateV,
        "financialYear" : financialYearV,
        "validFrom" : validFromV,
        "validTo" : validToV,
        "commencementDate" : commencementDateV,
        "tradeLicenseDetail" : {
          "ownershipCategory" : ownershipCategory,
          "structureType" : structureTypeV,
          "owners" : owners,
          "address" : addressV,
          "tradeUnits" : tradeUnitsV,
          "ownerPhoto" : ownerPhotoV,
          "structurePlace" : structurePlaceV,
          "businessSector" : businessSector,
          "capitalInvestment" : capitalInvestment,
          "enterpriseType" : enterpriseType,
          "structurePlaceSubtype" : structurePlaceSubtype,
          "businessActivityDesc" : businessActivityDesc,
          "licenseeType" : licenseeType,
          "institution" : institution
        },
        "licenseUnitNameLocal" : licenseUnitNameLocalV,
        "desiredLicensePeriod" : desiredLicensePeriodV,
        "signedCertificate" : "111111111111"        
      };
    }
  }

  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {}, [application, errorApplication]);

  const businessService= application?.[0]?.businessService;
  const { isLoading : iswfLoading, data : wfdata } = Digit.Hooks.useWorkflowDetails({
    tenantId: application?.[0]?.tenantId,
    id: id,
    moduleCode: businessService,
  });

let workflowDocs = [];
if(wfdata)
{
  wfdata?.timeline?.map((ob) => {
    if(ob?.wfDocuments?.length>0) workflowDocs.push(ob?.wfDocuments?.[0])
  })
}

  if (isLoading || iswfLoading) {
    return <Loader />;
  }

  if (application?.applicationDetails?.length === 0) {
    history.goBack();
  }

  const handleDownloadPdf = async () => {
    const tenantInfo = tenants.find((tenant) => tenant.code === application[0]?.tenantId);
    let res = application[0];
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
    setShowOptions(false);
  };

  const downloadPaymentReceipt = async () => {
    const receiptFile = { filestoreIds: [paymentsHistory.Payments[0]?.fileStoreId] };
    if (!receiptFile?.fileStoreIds?.[0]) {
      const newResponse = await Digit.PaymentService.generatePdf(tenantId, { Payments: [paymentsHistory.Payments[0]] }, "tradelicense-receipt");
      const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: newResponse.filestoreIds[0] });
      window.open(fileStore[newResponse.filestoreIds[0]], "_blank");
      setShowOptions(false);
    } else {
      const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: receiptFile.filestoreIds[0] });
      window.open(fileStore[receiptFile.filestoreIds[0]], "_blank");
      setShowOptions(false);
    }
  };

  const downloadTLcertificate = async () => {
    const TLcertificatefile = await Digit.PaymentService.generatePdf(tenantId, { Licenses: application_cert }, "tlcertificate");
    const receiptFile = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: TLcertificatefile.filestoreIds[0] });
    window.open(receiptFile[TLcertificatefile.filestoreIds[0]], "_blank");
    setShowOptions(false);
  };

  let propertyAddress = "";
  // if (PTData && PTData?.Properties?.length) {
  //   propertyAddress=getAddress(PTData?.Properties[0]?.address,t);
  // }

  const dowloadOptions =
    paymentsHistory?.Payments?.length > 0
      ? [
          {
            label: t("TL_CERTIFICATE"),
            onClick: downloadTLcertificate,
          },
          {
            label: t("CS_COMMON_PAYMENT_RECEIPT"),
            onClick: downloadPaymentReceipt,
          },
        ]
      : [
          {
            label: t("CS_COMMON_APPLICATION_ACKNOWLEDGEMENT"),
            onClick: handleDownloadPdf,
          },
        ];

  return (
    <React.Fragment>
      <div className="cardHeaderWithOptions">
        <Header>{t("CS_TITLE_APPLICATION_DETAILS")}</Header>
        <MultiLink
          className="multilinkWrapper"
          onHeadClick={() => setShowOptions(!showOptions)}
          displayOptions={showOptions}
          options={dowloadOptions}
        />
      </div>
      <Card style={{ position: "relative" }}>
        {application?.map((application, index) => {
          return (
            <div key={index} className="employee-data-table">
              <Row
                className="employee-data-table"
                label={t("TL_COMMON_TABLE_COL_APP_NO")}
                text={application?.applicationNumber}
                textStyle={{ whiteSpace: "pre", border: "none" }}
              />
              <Row label={t("TL_APPLICATION_CATEGORY")} text={t("ACTION_TEST_TRADE_LICENSE")} textStyle={{ whiteSpace: "pre" }} />
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_STATUS")}
                text={t(`WF_NEWTL_${application?.status}`)}
                textStyle={{ whiteSpace: "pre-wrap", width: "70%" }}
              />
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_SLA_NAME")}
                text={`${Math.round(application?.SLA / (1000 * 60 * 60 * 24))} ${t("TL_SLA_DAYS")}`}
                textStyle={{ whiteSpace: "pre" }}
              />
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_TRD_NAME")}
                text={application?.tradeName}
                textStyle={{ whiteSpace: "pre-wrap", width: "70%" }}
              />
              <CardSectionHeader>{t("TL_OWNERSHIP_DETAILS_HEADER")}</CardSectionHeader>
              {application?.tradeLicenseDetail.owners.map((ele, index) => {
                return application?.tradeLicenseDetail?.licenseeType?.includes("INSTITUTIONAL") ? (
                  <div key={index} style={multiBoxStyle}>
                    <CardSectionHeader style={multiHeaderStyle}>{`${t("TL_PAYMENT_PAID_BY_PLACEHOLDER")} - ` + (index + 1)}</CardSectionHeader>
                    <Row
                      label={`${t("TL_INSTITUTION_NAME_LABEL")}`}
                      text={t(application?.tradeLicenseDetail?.institution?.instituionName)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row
                      label={`${t("TL_INSTITUTION_TYPE_LABEL")}`}
                      text={t(`TL_${application?.tradeLicenseDetail?.licenseeType}`)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row label={`${t("TL_MOBILE_NUMBER_LABEL")}`} text={t(ele.mobileNumber)} textStyle={{ whiteSpace: "pre" }} />
                    <Row
                      label={`${t("TL_TELEPHONE_NUMBER_LABEL")}`}
                      text={t(application?.tradeLicenseDetail?.institution?.contactNo || t("CS_NA"))}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row
                      label={`${t("TL_LOCALIZATION_OWNER_NAME")}`}
                      text={t(ele.fatherOrHusbandName || application?.tradeLicenseDetail?.institution?.name)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row label={`${t("TL_LOCALIZATION_EMAIL_ID")}`} text={t(ele.emailId || t("CS_NA"))} textStyle={{ whiteSpace: "pre" }} />
                  </div>
                ) : (
                  <div key={index} style={multiBoxStyle}>
                    <CardSectionHeader style={multiHeaderStyle}>{`${t("TL_PAYMENT_PAID_BY_PLACEHOLDER")} - ` + (index + 1)}</CardSectionHeader>
                    <Row label={`${t("TL_COMMON_TABLE_COL_OWN_NAME")}`} text={t(ele.name)} textStyle={{ whiteSpace: "pre" }} />
                    <Row label={`${t("TL_NEW_OWNER_DETAILS_GENDER_LABEL")}`} text={t(ele.gender)} textStyle={{ whiteSpace: "pre" }} />
                    <Row label={`${t("TL_MOBILE_NUMBER_LABEL")}`} text={t(ele.mobileNumber)} textStyle={{ whiteSpace: "pre" }} />
                    <Row label={`${t("TL_GUARDIAN_S_NAME_LABEL")}`} text={t(ele.fatherOrHusbandName)} textStyle={{ whiteSpace: "pre" }} />
                    <Row label={`${t("TL_RELATIONSHIP_WITH_GUARDIAN_LABEL")}`} text={t(ele.relationship)} textStyle={{ whiteSpace: "pre" }} />
                  </div>
                );
              })}

              {workflowDocs?.length > 0 && <div>
              <CardSubHeader>{t("TL_TIMELINE_DOCS")}</CardSubHeader>
              {/* <div>
                {workflowDocs?.length > 0 ? (
                  <TLDocument value={{"workflowDocs":workflowDocs}}></TLDocument>
                ) : (
                  <StatusTable>
                    <Row text={t("TL_NO_DOCUMENTS_MSG")} />
                  </StatusTable>
                )}
              </div> */}
              </div>}
              <TLWFApplicationTimeline application={application} id={id} />
              {application?.status === "CITIZENACTIONREQUIRED" ? (
                <Link
                  to={{
                    pathname: `/digit-ui/citizen/tl/tradelicence/edit-application/${application?.applicationNumber}/${application?.tenantId}`,
                    state: {},
                  }}
                >
                  <SubmitBar label={t("COMMON_EDIT")} />
                </Link>
              ) : null}
              {/* //TODO: change the actions to be fulfilled from workflow nextactions */}
              {application?.status === "PENDINGPAYMENT" ? (
                <Link
                  to={{
                    pathname: `/digit-ui/citizen/payment/collect/${application?.businessService}/${application?.applicationNumber}`,
                    state: { bill, tenantId: tenantId },
                  }}
                >
                  <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
                </Link>
              ) : null}
            </div>
          );
        })}
      </Card>
    </React.Fragment>
  );
};

export default TLApplicationDetails;
