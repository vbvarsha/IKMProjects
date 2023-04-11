import {
  Card,
  CardLabel,
  CardSubHeader,
  CardText,
  CitizenInfoLabel,
  LinkButton,
  Row,
  StatusTable,
  CheckBox,
  SubmitBar,
  BackButton,
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/SBRTimeline";

const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    sessionStorage.setItem("isDirectRenewal", false);
    history.push(jumpTo);
  }
  return (
    <LinkButton
      label={t("CS_COMMON_CHANGE")}
      className="check-page-link-button"
      style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
      onClick={routeTo}
    />
  );
};

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};

const StillBirthCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");
   const [isInitiatorDeclaration, setisInitiatorDeclaration] = React.useState( false);
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    StillBirthChildDetails,
    StillBirthParentsDetails,
    AddressBirthDetails,
    StillBirthInitiatorDetails,

    isEditProperty,
    cpt,
  } = value;
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }


  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
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
  console.log(value);
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

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REG_SUMMARY_HEADING")}`}</span>
            </h1>
          </div>
        </div>
        <div className="col-md-12"
          style={{
            maxWidth: "auto",
            margin: "25px auto",
            padding: "3rem 2rem",
            border: "none",
            borderRadius: "8px",
            height: "auto",
            backgroundColor: "#f3f0ef",
          }}
        >
            <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_CHILD_SEX")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(StillBirthChildDetails.gender.code) + " / " + t(StillBirthChildDetails.gender.code + "_ML")}
              </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_DATE_OF_BIRTH")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{t(convertEpochToDate(StillBirthChildDetails.childDOB) ? convertEpochToDate(StillBirthChildDetails.childDOB) : " CR_NOT_RECORDED")}{" "}
              </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {StillBirthChildDetails.birthPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(StillBirthChildDetails.hospitalName.hospitalName) + " / " + t(StillBirthChildDetails.hospitalName.hospitalNamelocal)}
                    </CardText>
                  </div>
                </div>
              )}

              {StillBirthChildDetails.birthPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(StillBirthChildDetails.institutionId.institutionName) + " / " + t(StillBirthChildDetails.institutionId.institutionNamelocal)}
                    </CardText>
                  </div>
                </div>
              )}

              {StillBirthChildDetails.birthPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(StillBirthChildDetails.adrsHouseNameEn ? StillBirthChildDetails.adrsHouseNameEn : "CR_NOT_RECORDED") +
                        " , " +
                        StillBirthChildDetails.adrsLocalityNameEn +
                        " , " +
                       ( StillBirthChildDetails.adrsStreetNameEn ? StillBirthChildDetails.adrsStreetNameEn : "CR_NOT_RECORDED")+
                        " , " +
                        StillBirthChildDetails.wardNo.namecmb +
                        " , " +
                        StillBirthChildDetails.adrsPostOffice.name +
                        " , " +
                        StillBirthChildDetails.adrsPincode +
                        " / " +
                        t(StillBirthChildDetails.adrsHouseNameMl ? StillBirthChildDetails.adrsHouseNameMl : "CR_NOT_RECORDED") +
                        " , " +
                        StillBirthChildDetails.adrsLocalityNameMl +
                        " , " +
                        (StillBirthChildDetails.adrsStreetNameMl ? StillBirthChildDetails.adrsStreetNameMl : "CR_NOT_RECORDED") +
                        " , " +
                        StillBirthChildDetails.wardNo.namecmb +
                        " , " +
                        StillBirthChildDetails.adrsPostOffice.name +
                        " , " +
                        StillBirthChildDetails.adrsPincode}
                    </CardText>
                  </div>
                </div>
              )}
              {StillBirthChildDetails.birthPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(StillBirthChildDetails.vehicleType.name? StillBirthChildDetails.vehicleType.name : "CR_NOT_RECORDED") +
                        " , " +
                        // StillBirthChildDetails.vehicleRegistrationNo +
                        // " , " +
                        StillBirthChildDetails.vehicleFromEn +
                        " , " +
                        StillBirthChildDetails.vehicleToEn 
                        // StillBirthChildDetails.vehicleHaltPlace +
                        // " , " +
                        // StillBirthChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // StillBirthChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // StillBirthChildDetails.wardNo +
                        + " / " +
                        t(StillBirthChildDetails.vehicleType.namelocal ? StillBirthChildDetails.vehicleType.namelocal : "CR_NOT_RECORDED") +
                        " , " +
                        // StillBirthChildDetails.vehicleRegistrationNo +
                        // " , " +
                        StillBirthChildDetails.vehicleFromMl +
                        " , " +
                        StillBirthChildDetails.vehicleToMl
                        //  +
                        // " , " +
                        // StillBirthChildDetails.vehicleHaltPlace +
                        // " , " +
                        // StillBirthChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // StillBirthChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // StillBirthChildDetails.wardNo
              }
                    </CardText>
                  </div>
                </div>
              )}
              {StillBirthChildDetails.birthPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(StillBirthChildDetails.publicPlaceType ? StillBirthChildDetails.publicPlaceType : "CR_NOT_RECORDED") +
                        // " , " +
                        // StillBirthChildDetails.wardNo +
                        " , " +
                        StillBirthChildDetails.localityNameEn +
                        " , " +
                        // StillBirthChildDetails.streetNameEn +
                        // " , " +
                        StillBirthChildDetails.publicPlaceDecpEn +
                        " / " +
                        t(StillBirthChildDetails.publicPlaceType ? StillBirthChildDetails.publicPlaceType : "CR_NOT_RECORDED") +
                        // " , " +
                        // StillBirthChildDetails.wardNo +
                        " , " +
                        StillBirthChildDetails.localityNameMl +
                        // " , " +
                        // StillBirthChildDetails.streetNameMl +
                        // " , " +

                        StillBirthChildDetails.publicPlaceDecpEn
                        }
                    </CardText>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_NAME_OF_MOTHER")}`}</CardLabel>
            </div>

            <div className="col-md-6">
              {/* <CardLabel style={{ lineHeight: "auto" }}>{`${t("CR_HOSPITAL")}`}</CardLabel> */}
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(StillBirthParentsDetails.motherFirstNameEn ? StillBirthParentsDetails.motherFirstNameEn : "CR_NOT_RECORDED") +
                  " / " +
                  t(StillBirthParentsDetails.motherFirstNameMl)}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_NAME_OF_FATHER")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(StillBirthParentsDetails.fatherFirstNameEn ? StillBirthParentsDetails.fatherFirstNameEn : "CR_NOT_RECORDED") +
                  " / " +
                  t(StillBirthParentsDetails.fatherFirstNameMl)}
              </CardText>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
              {t(AddressBirthDetails.presentInsideKeralaHouseNameEn  ? AddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (AddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(AddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( AddressBirthDetails.presentInsideKeralaPincode )+ " , " +(AddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( AddressBirthDetails.presentaddressStateName )+ " , " +( AddressBirthDetails.presentaddressCountry)}
              { t (AddressBirthDetails.presentInsideKeralaHouseNameEn  ? AddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (AddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(AddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( AddressBirthDetails.presentInsideKeralaPincode )+ " , " +(AddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( AddressBirthDetails.presentaddressStateName )+ " , " +( AddressBirthDetails.presentaddressCountry)} ,

            
              </CardText>
              
            </div>
          </div>  */}

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  (AddressBirthDetails.presentInsideKeralaStreetNameEn ? AddressBirthDetails.presentInsideKeralaStreetNameEn : " CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaLocalityNameEn +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPostOffice.name +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPincode +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaDistrict.name +
                  " , " +
                  AddressBirthDetails.presentaddressStateName.name +
                  " , " +
                  AddressBirthDetails.presentaddressCountry.name}
              </CardText>
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameMl ? AddressBirthDetails.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  (AddressBirthDetails.presentInsideKeralaStreetNameMl ? AddressBirthDetails.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaLocalityNameMl +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPostOffice.namelocal +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPincode +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaDistrict.namelocal +
                  " , " +
                  AddressBirthDetails.presentaddressStateName.namelocal +
                  " , " +
                  AddressBirthDetails.presentaddressCountry.namelocal}
                ,
              </CardText>
            </div>
          </div>

          {AddressBirthDetails.isPrsentAddress === true && (
            <div className="row">
              <div className="col-md-6">
                <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                    " , " +
                    (AddressBirthDetails.presentInsideKeralaStreetNameEn ? AddressBirthDetails.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED") +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaLocalityNameEn +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaPostOffice.name +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaPincode +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaDistrict.name +
                    " , " +
                    AddressBirthDetails.presentaddressStateName.name +
                    " , " +
                    AddressBirthDetails.presentaddressCountry.name}
                </CardText>
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AddressBirthDetails.presentInsideKeralaHouseNameMl ? AddressBirthDetails.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    (AddressBirthDetails.presentInsideKeralaStreetNameMl ? AddressBirthDetails.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaLocalityNameMl +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaPostOffice.namelocal +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaPincode +
                    " , " +
                    AddressBirthDetails.presentInsideKeralaDistrict.namelocal +
                    " , " +
                    AddressBirthDetails.presentaddressStateName.namelocal +
                    " , " +
                    AddressBirthDetails.presentaddressCountry.namelocal}
                  ,
                </CardText>

                {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrStreetNameEn +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrLocalityNameEn +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPostOffice.name+
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPincode +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrDistrict.name +
                  " , " +
                  AddressBirthDetails.permtaddressStateName.name +
                  " , " +
                  AddressBirthDetails.permtaddressCountry.name }
                 
                  </CardText>
                  <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
             :
             {  
                t(AddressBirthDetails.permntInKeralaAdrHouseNameMl ? AddressBirthDetails.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrStreetNameMl +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrLocalityNameMl +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPostOffice.name+
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPincode +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrDistrict.namelocal+
                  " , " +
                  AddressBirthDetails.permtaddressStateName.namelocal+
                  " , " +
                  AddressBirthDetails.permtaddressCountry.namelocal}
                ,
              </CardText> */}
              </div>
            </div>
          )}

          {AddressBirthDetails.isPrsentAddress === false && (
            <div className="row">
              <div className="col-md-6">
                <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
                    " , " +
                    (AddressBirthDetails.permntInKeralaAdrStreetNameEn ? AddressBirthDetails.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED") +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrLocalityNameEn +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrPostOffice.name +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrPincode +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrDistrict.name +
                    " , " +
                    AddressBirthDetails.permtaddressStateName.name +
                    " , " +
                    AddressBirthDetails.permtaddressCountry.name}
                </CardText>
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AddressBirthDetails.permntInKeralaAdrHouseNameMl ? AddressBirthDetails.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    (AddressBirthDetails.permntInKeralaAdrStreetNameMl ? AddressBirthDetails.permntInKeralaAdrStreetNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrLocalityNameMl +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrPostOffice.name +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrPincode +
                    " , " +
                    AddressBirthDetails.permntInKeralaAdrDistrict.namelocal +
                    " , " +
                    AddressBirthDetails.permtaddressStateName.namelocal +
                    " , " +
                    AddressBirthDetails.permtaddressCountry.namelocal}
                  ,
                </CardText>
              </div>
            </div>
          )}
        </div>


        <div className="row">
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#f3f0ef", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
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
        </div>



     
          <div className="col-md-12">
            <h1 className="headingh1">{/* <span style={{ background: "#fff", padding: "0 10px" }}>                
                </span> */}</h1>
          </div>
        </div>
        {/* <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} /> */}
        <SubmitBar disabled={!isInitiatorDeclaration} label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
        </div>

      </Card>
    </React.Fragment>
  );
};

export default StillBirthCheckPage;
