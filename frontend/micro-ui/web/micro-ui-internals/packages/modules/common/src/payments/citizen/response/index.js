import { Banner, Card, CardText, Loader, Row, StatusTable, SubmitBar, DownloadPrefixIcon } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";

export const SuccessfulPayment = (props) => {
  if (localStorage.getItem("BillPaymentEnabled") !== "true") {
    window.history.forward();
    return null;
  }
  return <WrapPaymentComponent {...props} />
}


const WrapPaymentComponent = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { eg_pg_txnid: egId, workflow: workflw } = Digit.Hooks.useQueryParams();
  const [printing, setPrinting] = useState(false);
  const [allowFetchBill, setallowFetchBill] = useState(false);
  const { businessService: business_service, consumerCode, tenantId } = useParams();
  const { data: bpaData = {}, isLoading: isBpaSearchLoading, isSuccess: isBpaSuccess, error: bpaerror } = Digit.Hooks.obps.useOBPSSearch(
    "", {}, tenantId, { applicationNo: consumerCode }, {}, { enabled: (window.location.href.includes("bpa") || window.location.href.includes("BPA")) }
  );

  console.log({ props, workflw })

  if (business_service === "CR" && isBpaSuccess) {
    const mutation = Digit.Hooks.cr.setPaymentStatus({ params: {} });
    mutation.mutate({
      filters: {
        PaymentDetails: [{
          applicationNumber: consumerCode,
          applicationStatus: "INITIATED",
          isPaymentSuccess: isBpaSuccess
        }]
      }
    }, { onSuccess: () => console.log(`status updated as ${isBpaSuccess}`) });
  }

  const { isLoading, data, isError } = Digit.Hooks.usePaymentUpdate({ egId }, business_service, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { label } = Digit.Hooks.useApplicationsForBusinessServiceSearch({ businessService: business_service }, { enabled: false });

  // const { data: demand } = Digit.Hooks.useDemandSearch(
  //   { consumerCode, businessService: business_service },
  //   { enabled: !isLoading, retry: false, staleTime: Infinity, refetchOnWindowFocus: false }
  // );

  // const { data: billData, isLoading: isBillDataLoading } = Digit.Hooks.useFetchPayment(
  //   { tenantId, consumerCode, businessService: business_service },
  //   { enabled: allowFetchBill, retry: false, staleTime: Infinity, refetchOnWindowFocus: false }
  // );

  const { data: reciept_data, isLoading: recieptDataLoading } = Digit.Hooks.useRecieptSearch(
    {
      tenantId,
      businessService: business_service,
      receiptNumbers: data?.payments?.Payments?.[0]?.paymentDetails[0].receiptNumber,
    },
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      select: (dat) => {
        return dat.Payments[0];
      },
      enabled: allowFetchBill,
    }
  );

  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => business_service?.includes(code))[0]?.receiptKey || "consolidatedreceipt",
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const payments = data?.payments;

  useEffect(() => {
    return () => {
      localStorage.setItem("BillPaymentEnabled", "false")
      queryClient.clear();
    };
  }, []);

  useEffect(() => {
    if (data && data.txnStatus && data.txnStatus !== "FAILURE") {
      setallowFetchBill(true);
    }
  }, [data]);

  if (isLoading || recieptDataLoading) {
    return <Loader />;
  }

  const applicationNo = data?.applicationNo;

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isError || !payments || !payments.Payments || payments.Payments.length === 0 || data.txnStatus === "FAILURE") {
    return (
      <Card>
        <Banner
          message={t("CITIZEN_FAILURE_COMMON_PAYMENT_MESSAGE")}
          info={t("CS_PAYMENT_TRANSANCTION_ID")}
          applicationNumber={egId}
          successful={false}
        />
        <CardText>{t("CS_PAYMENT_FAILURE_MESSAGE")}</CardText>
        {business_service !== "PT" ? (
          <Link to={`/digit-ui/citizen`}>
            <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        ) : (
          <React.Fragment>
            <Link to={(applicationNo && `/digit-ui/citizen/payment/my-bills/${business_service}/${applicationNo}`) || "/digit-ui/citizen"}>
              <SubmitBar label={t("CS_PAYMENT_TRY_AGAIN")} />
            </Link>
            <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }}>
              <Link to={`/digit-ui/citizen`}>{t("CORE_COMMON_GO_TO_HOME")}</Link>
            </div>
          </React.Fragment>
        )}
      </Card>
    );
  }

  const paymentData = data?.payments?.Payments[0];
  const amount = reciept_data?.paymentDetails?.[0]?.totalAmountPaid;
  const transactionDate = paymentData.transactionDate;
  const printCertificate = async () => {
    //const tenantId = Digit.ULBService.getCurrentTenantId();
    const state = tenantId;
    const applicationDetails = await Digit.TLService.search({ applicationNumber: consumerCode, tenantId });

    const generatePdfKeyForTL = "tlcertificate"
    if (applicationDetails) {
      const application = rearrangeApplication(applicationDetails?.Licenses);
      let response = await Digit.PaymentService.generatePdf(state, { Licenses: application }, generatePdfKeyForTL);
      const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
  }

  function rearrangeApplication(application) {
    if (application[0].applicationNumber) {
      let tenantIdV = application[0].tenantId;
      let businessServiceV = application[0].businessService;
      let licenseTypeV = application[0].licenseType;
      let applicationTypeV = application[0].applicationType;
      let licenseNumberV = application[0].licenseNumber;
      let applicationNumberV = application[0].applicationNumber;
      // let licenseUnitNameV = application[0].licenseUnitName;
      let applicationDateV = application[0].applicationDate;
      let issuedDateV = application[0].issuedDate;
      let financialYearV = application[0].financialYear;
      let validFromV = application[0].validFrom;
      let validToV = application[0].validTo;
      let commencementDateV = application[0].commencementDate;
      let structureTypeV = application[0].tradeLicenseDetail.structureType;
      let owners = [];
      application[0].tradeLicenseDetail.owners.map((owner, index) => {
        let address = owner?.designation ? owner?.designation + ", " : "" +
          owner.houseName ? owner.houseName + "," : '' +
            owner.street ? owner.street + "," : '' +
              owner.locality ? owner.locality + "," : '' +
                owner.postOffice ? owner.postOffice + "," : '' + "-" +
                  owner.pincode ? owner.pincode : '';



        let singleOwner = {
          name: owner.name, mobileNumber: owner.mobileNumber, emailId: owner.emailId,
          applicantNameLocal: owner.applicantNameLocal, careOf: owner.careOf, careOfName: owner.careOfName,
          designation: owner?.designation ? owner?.designation : '', address: address
        }
        owners.push(singleOwner);
      });
      let structurePlaceV = [];
      let tempString = "";
      if (structureTypeV === "BUILDING" || structureTypeV === "LBBUILDING") {
        application[0].tradeLicenseDetail.structurePlace.map((strutPlace, index) => {
          let tempStructurePlace = {
            doorNo: strutPlace.doorNo, doorNoSub: strutPlace.doorNoSub, stallNo: strutPlace.stallNo,
            blockNo: null, surveyNo: null, subDivisionNo: null, partitionNo: null, vehicleNo: null, vesselNo: null
          };
          index === 0 ? tempString += strutPlace?.doorNo ? strutPlace?.doorNo : "" +
            strutPlace?.doorNoSub ? tempString += "/" + strutPlace?.doorNoSub : ""
            : tempString += ", " + strutPlace?.doorNo ? strutPlace?.doorNo : "" + strutPlace?.doorNoSub ? tempString += "/" + strutPlace?.doorNoSub : "";
          index === 0 ? tempString += ", " + "Stall Nos : " + strutPlace?.stallNo ? strutPlace?.stallNo : "" : tempString += ", " + strutPlace?.stallNo;

          structurePlaceV.push(tempStructurePlace);
        });
      }
      else if (structureTypeV === "LAND") {
        let tempStructurePlace = {
          doorNo: null, doorNoSub: null, stallNo: null,
          blockNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo,
          surveyNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo,
          subDivisionNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo,
          partitionNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo,
          vehicleNo: null, vesselNo: null
        }
        tempString += "Survey No : ";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo ? application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo : "";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo ? " / " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo : "";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo ? " / " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo : "";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo ? " / " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo : "";
        structurePlaceV.push(tempStructurePlace);
      }
      else if (structureTypeV === "VEHICLE") {
        let tempStructurePlace = {
          doorNo: '', doorNoSub: '', stallNo: '',
          blockNo: '',
          surveyNo: '',
          subDivisionNo: '',
          partitionNo: '',
          vehicleNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo, vesselNo: null
        };
        tempString += "Vehicle No : ";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo ? application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo : "";
        structurePlaceV.push(tempStructurePlace);
      }
      else if (structureTypeV === "WATER") {
        let tempStructurePlace = {
          doorNo: '', doorNoSub: '', stallNo: '',
          blockNo: '',
          surveyNo: '',
          subDivisionNo: '',
          partitionNo: '',
          vehicleNo: '', vesselNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo
        }
        tempString += "Vessel No : " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo ? application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo : "";
        structurePlaceV.push(tempStructurePlace);
      }

      let structureTypeDetails = application[0].tradeLicenseDetail.address.wardNo;
      if (structureTypeV === "BUILDING") {
        structureTypeDetails += "/" + application[0].tradeLicenseDetail.address.doorNo;
      }

      let addressV = "Ward No : " + application[0].tradeLicenseDetail.address.wardNo + ", " + tempString;
      addressV += application[0].tradeLicenseDetail.address.buildingName ? application[0].tradeLicenseDetail.address.buildingName : "";
      addressV += application[0].tradeLicenseDetail.address.street ? ", " + application[0].tradeLicenseDetail.address.street : "";
      addressV += application[0].tradeLicenseDetail.address.locality ? ", " + application[0].tradeLicenseDetail.address.locality : "";
      addressV += application[0].tradeLicenseDetail.address.landmark ? ", " + application[0].tradeLicenseDetail.address.landmark : "";
      addressV += application[0].tradeLicenseDetail.address.waterbody ? ", " + application[0].tradeLicenseDetail.address.waterbody : "";
      addressV += application[0].tradeLicenseDetail.address.serviceArea ? ", " + application[0].tradeLicenseDetail.address.serviceArea : "";
      addressV += application[0].tradeLicenseDetail.address.localityName ? ", " + application[0].tradeLicenseDetail.address.localityName : "";
      addressV += application[0].tradeLicenseDetail.address.postOffice ? ", " + application[0].tradeLicenseDetail.address.postOffice : "";
      addressV += application[0].tradeLicenseDetail.address.pincode ? "-" + application[0].tradeLicenseDetail.address.pincode : "";

      let tradeUnitsV = application[0].tradeLicenseDetail.tradeUnits;
      let ownerPhotoV = application[0].tradeLicenseDetail.applicationDocuments.filter((doc) => {
        doc.documentType === "OWNERPHOTO"
        doc?.documentType.includes("OWNERPHOTO")
      })[0];

      let institution = [];
      if (application[0]?.tradeLicenseDetail?.institution) {
        let tempInst = {
          institutionName: application[0]?.tradeLicenseDetail?.institution?.institutionName,
          organisationregistrationno: application[0]?.tradeLicenseDetail?.institution?.organisationregistrationno,
          address: application[0]?.tradeLicenseDetail?.institution?.address,
          licenseUnitId: application[0]?.tradeLicenseDetail?.institution?.licenseUnitId
        };
        institution.push(tempInst);
      }
      let licenseUnitName = application[0]?.tradeLicenseDetail?.institution?.licenseUnitId ? application[0]?.tradeLicenseDetail?.institution?.licenseUnitId + " - " : "" +
        application[0]?.licenseUnitName ? application[0]?.licenseUnitName : ""
          + application[0]?.licenseUnitNameLocal ? " ( " + application[0]?.licenseUnitNameLocal + " ) " : "";
      let desiredLicensePeriodV = application[0]?.desiredLicensePeriod;
      let businessSector = application[0]?.businessSector;
      let capitalInvestment = application[0]?.capitalInvestment;
      let enterpriseType = application[0]?.enterpriseType;
      let structurePlaceSubtype = application[0]?.structurePlaceSubtype;
      let businessActivityDesc = application[0]?.businessActivityDesc;
      let licenseeType = application[0]?.licenseeType;
      let ownershipCategory = application[0]?.tradeLicenseDetail?.ownershipCategory;
      let applicationDocuments = application[0]?.tradeLicenseDetail?.applicationDocuments;
      let finalJson =
        [{
          tenantId: tenantIdV,
          businessService: businessServiceV,
          licenseType: licenseTypeV,
          applicationType: applicationTypeV,
          licenseNumber: licenseNumberV,
          applicationNumber: applicationNumberV,
          licenseUnitName: licenseUnitName,
          applicationDate: applicationDateV,
          issuedDate: issuedDateV,
          financialYear: financialYearV,
          validFrom: validFromV,
          validTo: validToV,
          commencementDate: commencementDateV,
          tradeLicenseDetail: {
            ownershipCategory: ownershipCategory,
            structureType: structureTypeV,
            owners: owners,
            address: addressV,
            tradeUnits: tradeUnitsV,
            ownerPhoto: ownerPhotoV,
            structurePlace: structurePlaceV,
            businessSector: businessSector,
            capitalInvestment: capitalInvestment,
            enterpriseType: enterpriseType,
            structurePlaceSubtype: structurePlaceSubtype,
            businessActivityDesc: businessActivityDesc,
            licenseeType: licenseeType,
            institution: institution,
            applicationDocuments: applicationDocuments
          },
          desiredLicensePeriod: desiredLicensePeriodV,
          signedCertificate: "111111111111"
        }];
      return finalJson;
    }
    else {
      return [{}];
    }
  }

  const printReciept = async () => {
    if (printing) return;
    setPrinting(true);
    const tenantId = paymentData?.tenantId;
    const state = Digit.ULBService.getStateId();
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };
    if (!paymentData?.fileStoreId) {
      response = await Digit.PaymentService.generatePdf(state, { Payments: [payments.Payments[0]] }, generatePdfKey);
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    if (fileStore && fileStore[response.filestoreIds[0]]) {
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
    setPrinting(false);
  };

  const convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
    //example input format : "2018-10-02"
    try {
      const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
      DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
      if (dayStartOrEnd === "dayend") {
        DateObj.setHours(DateObj.getHours() + 24);
        DateObj.setSeconds(DateObj.getSeconds() - 1);
      }
      return DateObj.getTime();
    } catch (e) {
      return dateString;
    }
  };

  const printPdf = (blob) => {
    const fileURL = URL.createObjectURL(blob);
    var myWindow = window.open(fileURL);
    if (myWindow != undefined) {
      myWindow.addEventListener("load", (event) => {
        myWindow.focus();
        myWindow.print();
      });
    }
  };

  const downloadPdf = (blob, fileName) => {
    if (window.mSewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        mSewaApp.downloadBase64File(base64data, fileName);
      };
    } else {
      const link = document.createElement("a");
      // create a blobURI pointing to our Blob
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      // some browser needs the anchor to be in the doc
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }
  };


  const getPermitOccupancyOrderSearch = async (order, mode = "download") => {
    let queryObj = { applicationNo: bpaData?.[0]?.applicationNo };
    let bpaResponse = await Digit.OBPSService.BPASearch(bpaData?.[0]?.tenantId, queryObj);
    const edcrResponse = await Digit.OBPSService.scrutinyDetails(bpaData?.[0]?.tenantId, { edcrNumber: bpaData?.[0]?.edcrNumber });
    let bpaDataDetails = bpaResponse?.BPA?.[0], edcrData = edcrResponse?.edcrDetail?.[0];
    let currentDate = new Date();
    bpaDataDetails.additionalDetails.runDate = convertDateToEpoch(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate());
    let reqData = { ...bpaDataDetails, edcrDetail: [{ ...edcrData }] };
    let response = await Digit.PaymentService.generatePdf(bpaDataDetails?.tenantId, { Bpa: [reqData] }, order);
    const fileStore = await Digit.PaymentService.printReciept(bpaDataDetails?.tenantId, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response?.filestoreIds[0]], "_blank");

    reqData["applicationType"] = bpaDataDetails?.additionalDetails?.applicationType;
    let edcrresponse = await Digit.OBPSService.edcr_report_download({ BPA: { ...reqData } });
    const responseStatus = parseInt(edcrresponse.status, 10);
    if (responseStatus === 201 || responseStatus === 200) {
      mode == "print"
        ? printPdf(new Blob([edcrresponse.data], { type: "application/pdf" }))
        : downloadPdf(new Blob([edcrresponse.data], { type: "application/pdf" }), `edcrReport.pdf`);
    }
  }

  const getBillingPeriod = (billDetails) => {
    const { taxPeriodFrom, taxPeriodTo, fromPeriod, toPeriod } = billDetails || {};
    if (taxPeriodFrom && taxPeriodTo) {
      let from = new Date(taxPeriodFrom).getFullYear().toString();
      let to = new Date(taxPeriodTo).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else if (fromPeriod && toPeriod) {
      if (workflw === "mcollect") {
        from =
          new Date(fromPeriod).getDate().toString() +
          " " +
          Digit.Utils.date.monthNames[new Date(fromPeriod).getMonth() + 1].toString() +
          " " +
          new Date(fromPeriod).getFullYear().toString();
        to =
          new Date(toPeriod).getDate() +
          " " +
          Digit.Utils.date.monthNames[new Date(toPeriod).getMonth() + 1] +
          " " +
          new Date(toPeriod).getFullYear();
        return from + " - " + to;
      }
      let from = new Date(fromPeriod).getFullYear().toString();
      let to = new Date(toPeriod).getFullYear().toString();
      return "FY " + from + "-" + to;

    } else return "N/A";
  };

  let bannerText;
  if (workflw) {
    bannerText = `CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE`;
  } else {
    if (paymentData?.paymentDetails?.[0]?.businessService?.includes("BPA")) {
      let nameOfAchitect = sessionStorage.getItem("BPA_ARCHITECT_NAME");
      let parsedArchitectName = nameOfAchitect ? JSON.parse(nameOfAchitect) : "ARCHITECT";
      bannerText = `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0].businessService.replace(/\./g, "_")}_${parsedArchitectName}_PAYMENT_MESSAGE`;
    } else {
      bannerText = `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0].businessService.replace(/\./g, "_")}_PAYMENT_MESSAGE`;
    }
  }

  // https://dev.digit.org/collection-services/payments/FSM.TRIP_CHARGES/_search?tenantId=pb.amritsar&consumerCodes=107-FSM-2021-02-18-063433

  // if (billDataLoading) return <Loader />;

  const rowContainerStyle = {
    padding: "4px 0px",
    justifyContent: "space-between",
  };

  const ommitRupeeSymbol = ["PT"].includes(business_service);

  if ((window.location.href.includes("bpa") || window.location.href.includes("BPA")) && isBpaSearchLoading) return <Loader />

  return (
    <Card>
      <Banner
        svg={
          <svg className="payment-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM16 30L6 20L8.82 17.18L16 24.34L31.18 9.16L34 12L16 30Z"
              fill="white"
            />
          </svg>
        }
        message={t("CS_COMMON_PAYMENT_COMPLETE")}
        info={t("CS_COMMON_RECIEPT_NO")}
        applicationNumber={paymentData?.paymentDetails[0].receiptNumber}
        successful={true}
      />
      <CardText>{t(`${bannerText}_DETAIL`)}</CardText>
      <StatusTable>
        <Row rowContainerStyle={rowContainerStyle} last label={t(label)} text={applicationNo} />
        {/** TODO : move this key and value into the hook based on business Service */}
        {(business_service === "PT" || workflw) && (
          <Row
            rowContainerStyle={rowContainerStyle}
            last
            label={t("CS_PAYMENT_BILLING_PERIOD")}
            text={getBillingPeriod(reciept_data?.paymentDetails[0]?.bill?.billDetails[0])}
          />
        )}

        {(business_service === "PT" || workflw) && (
          <Row
            rowContainerStyle={rowContainerStyle}
            last
            label={t("CS_PAYMENT_AMOUNT_PENDING")}
            text={reciept_data?.paymentDetails?.[0]?.totalDue - reciept_data?.paymentDetails?.[0]?.totalAmountPaid}
          />
        )}

        <Row rowContainerStyle={rowContainerStyle} last label={t("CS_PAYMENT_TRANSANCTION_ID")} text={egId} />
        <Row
          rowContainerStyle={rowContainerStyle}
          last
          label={t(ommitRupeeSymbol ? "CS_PAYMENT_AMOUNT_PAID_WITHOUT_SYMBOL" : "CS_PAYMENT_AMOUNT_PAID")}
          text={"₹ " + reciept_data?.paymentDetails?.[0]?.totalAmountPaid}
        />
        {(business_service !== "PT" || workflw) && (
          <Row
            rowContainerStyle={rowContainerStyle}
            last
            label={t("CS_PAYMENT_TRANSANCTION_DATE")}
            text={transactionDate && new Date(transactionDate).toLocaleDateString("in")}
          />
        )}
      </StatusTable>
      <div style={{ display: "flex" }}>
        {business_service == "TL" ? (
          <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginRight: "20px", marginTop: "15px", marginBottom: "15px" }} onClick={printReciept}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
            </svg>
            {t("TL_RECEIPT")}
          </div>
        ) : null}
        {business_service == "TL" ? (
          <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginTop: "15px" }} onClick={printCertificate}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
            </svg>
            {t("TL_CERTIFICATE")}
          </div>
        ) : null}
        {bpaData?.[0]?.businessService === "BPA_OC" && (bpaData?.[0]?.status === "APPROVED" || bpaData?.[0]?.status === "PENDING_SANC_FEE_PAYMENT") ? (
          <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={e => getPermitOccupancyOrderSearch("occupancy-certificate")}>
            <DownloadPrefixIcon />
            {t("BPA_OC_CERTIFICATE")}
          </div>
        ) : null}
        {bpaData?.[0]?.businessService === "BPA_LOW" ? (
          <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={r => getPermitOccupancyOrderSearch("buildingpermit-low")}>
            <DownloadPrefixIcon />
            {t("BPA_PERMIT_ORDER")}
          </div>
        ) : null}
        {bpaData?.[0]?.businessService === "BPA" && (bpaData?.[0]?.businessService !== "BPA_LOW") && (bpaData?.[0]?.businessService !== "BPA_OC") && (bpaData?.[0]?.status === "PENDING_SANC_FEE_PAYMENT" || bpaData?.[0]?.status === "APPROVED") ? (
          <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={r => getPermitOccupancyOrderSearch("buildingpermit")}>
            <DownloadPrefixIcon />
            {t("BPA_PERMIT_ORDER")}
          </div>
        ) : null}
      </div>
      {!(business_service == "TL") && <SubmitBar onSubmit={printReciept} label={t("COMMON_DOWNLOAD_RECEIPT")} />}
      {!(business_service == "TL") && <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }}>
        <Link to={`/digit-ui/citizen`}>{t("CORE_COMMON_GO_TO_HOME")}</Link>
      </div>}
      {business_service == "TL" &&
        <Link to={`/digit-ui/citizen`}>
          <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      }
    </Card>
  );
};

export const FailedPayment = (props) => {
  const { addParams, clearParams } = props;
  const { t } = useTranslation();
  const { consumerCode } = useParams();

  const getMessage = () => "Failure !";
  return (
    <Card>
      <Banner message={getMessage()} complaintNumber={consumerCode} successful={false} />
      <CardText>{t("ES_COMMON_TRACK_COMPLAINT_TEXT")}</CardText>
    </Card>
  );
};
