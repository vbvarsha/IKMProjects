import {
  Card, CardLabel, CardSubHeader, CardText, CitizenInfoLabel,
  LinkButton, Row, StatusTable, SubmitBar, BackButton, CheckBox, Toast, Accordion
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/CRTimeline";

// const ActionButton = ({ jumpTo }) => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   function routeTo() {
//     sessionStorage.setItem("isDirectRenewal", false);
//     history.push(jumpTo);
//   }
//   return (
//     <LinkButton
//       label={t("CS_COMMON_CHANGE")}
//       className="check-page-link-button"
//       style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
//       onClick={routeTo}
//     />
//   );
// };

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};

const AdoptionCheckPage = ({ onSubmit, value, userType }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const [InitiatorDeclareError, setInitiatorDeclareError] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(false);
  const [toast, setToast] = useState(false);
  const {
    AdoptionChildDetails,
    AdoptionParentsDetails,
    AdoptionAddressBasePage,
  } = value;
  console.log(AdoptionAddressBasePage);
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = "";
  // `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  // if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
  //   routeLink = `${getPath(match.path, match.params)}`;
  //   routeLink = routeLink.replace("/check", "");
  // }

  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  function onBirthSubmit() {
    if (!isInitiatorDeclaration) {
      setInitiatorDeclareError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiatorDeclareError(false);
      onSubmit();
    }
  }
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };

  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
  //       setIsInitialRender(false);
  //       setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
  //     }
  //   }
  // }, [isInitialRender]);

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t("CR_ADOPTION_REG_SUMMARY_HEADING")}</CardSubHeader>
        <Accordion expanded={true} title={t("CR_BIRTH_CHILD_DETAILS")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{convertEpochToDate(AdoptionChildDetails?.childDOB)}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_BIRTH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.birthDateTime ? AdoptionChildDetails?.birthDateTime : "NA"}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.gender.code}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_CHILD_AADHAAR")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childAadharNo}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childFirstNameEn}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childMiddleNameEn}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childLastNameEn}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_ML")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childFirstNameMl}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_ML")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childMiddleNameMl}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_ML")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.childLastNameMl}</CardText>
                </div>
              </div>
            </div>

          </StatusTable>}
        />
        <Accordion expanded={false} title={t("CR_BIRTH_PLACE_DETAILS")}
          content={<StatusTable >
            {AdoptionChildDetails?.birthPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "INSTITUTION" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "HOME" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE_HOME")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "VEHICLE" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_VEHICLE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_OF_BIRTH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.birthPlace.name}</CardText>
                </div>
              </div>
            </div>
            {AdoptionChildDetails?.birthPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.hospitalName.hospitalName}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.hospitalName.hospitalNamelocal}</CardText>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "INSTITUTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.institution.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.institutionId.institutionName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.institutionId.institutionNamelocal}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "HOME" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.adrsHouseNameMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "VEHICLE" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleType.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleRegistrationNo}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleHaltPlace}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleFromEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleToEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleFromMl}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleToMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADMITTED_HOSPITAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.setadmittedHospitalEn.hospitalName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.vehicleDesDetailsEn}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.publicPlaceType.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.localityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.localityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.streetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.streetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionChildDetails?.publicPlaceDecpEn}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </StatusTable>}
        />
    
        <Accordion expanded={false} title={t("CR_PARENTS_DETAILS")}
          content={<StatusTable >

            <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
            </div>
            {AdoptionParentsDetails?.isMotherInfo === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_INFORMATION_MISSING")}`} :</CardText>
                  </div>
                </div>
              </div>
            )}
            {AdoptionParentsDetails?.isMotherInfo === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherFirstNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherFirstNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherNationality.nationalityname}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_MARITAL_STATUS")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherMaritalStatus.code}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-8">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_MARRIAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherMarriageAge}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_BIRTH")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherMarriageBirth}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ORDER_CURRENT_DELIVERY")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.orderofChildren}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherEducation.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.motherProfession.name}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
            {AdoptionParentsDetails?.isFatherInfo === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_INFORMATION_MISSING")}`} :</CardText>
                  </div>
                </div>
              </div>
            )}
            {AdoptionParentsDetails?.isFatherInfo === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherFirstNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherFirstNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherNationality.nationalityname}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherEducation.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherProfession.name}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_FAMILY_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_RELIGION")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.Religion.name}</CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_CONTACT_NO")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherMobile}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_EMAIL")}`} :</CardText>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionParentsDetails?.fatherEmail}</CardText>
                </div>
              </div>
            </div>

          </StatusTable>}
        />
        <Accordion expanded={false} title={t("BIRTH_TIME_LINE_ADDRESS")}

          content={<StatusTable >

            {AdoptionAddressBasePage?.presentaddressCountry?.code === "COUNTRY_INDIA" && AdoptionAddressBasePage?.presentaddressStateName?.code === "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaTaluk.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaVillage.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaLBName.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentWardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentInsideKeralaHouseNameMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionAddressBasePage?.presentaddressCountry?.code === "COUNTRY_INDIA" && AdoptionAddressBasePage?.presentaddressStateName?.code != "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaTaluk}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaCityVilgeEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutsideKeralaHouseNameMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionAddressBasePage?.presentaddressCountry?.code != "COUNTRY_INDIA" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESE_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaProvinceEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaProvinceMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaadrsVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaadrsCityTown}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaPostCode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaAdressEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaAdressMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaAdressEnB}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.presentOutSideIndiaAdressMlB}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {AdoptionAddressBasePage?.permtaddressCountry?.code === "COUNTRY_INDIA" && AdoptionAddressBasePage?.permtaddressStateName?.code === "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrTaluk.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrVillage.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrLBName.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaWardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntInKeralaAdrHouseNameMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionAddressBasePage?.permtaddressCountry?.code === "COUNTRY_INDIA" && AdoptionAddressBasePage?.permtaddressStateName?.code != "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_PERM_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaTaluk}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaCityVilgeEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaPostOfficeEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideKeralaHouseNameMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AdoptionAddressBasePage?.permtaddressCountry?.code != "COUNTRY_INDIA" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PER_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaprovinceEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaprovinceMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaCityTown}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permanentOutsideIndiaPostCode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaLineoneEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaLineoneMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaLinetwoEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AdoptionAddressBasePage?.permntOutsideIndiaLinetwoMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </StatusTable>}
        />
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
              // disable={isDisableEdit}
              />
            </div>
          </div>


          {toast && (
            <Toast
              error={InitiatorDeclareError}
              label={
                InitiatorDeclareError
                  ? InitiatorDeclareError
                    ? t(`BIRTH_DECLARATION_CHOOSE`) : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
          <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onBirthSubmit} />
        </div>

      </Card>
    </React.Fragment>
  );
};

export default AdoptionCheckPage;
