import {
  Card, CardLabel, CardSubHeader, CardText, CitizenInfoLabel,
  LinkButton, Row, StatusTable, SubmitBar, BackButton, CheckBox,Toast
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/DRTimeline";

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

const DeathCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { InformationDeath, FamilyInformationDeath, AddressBirthDetails, isEditProperty, cpt } = value;
  const [IsDeclarationInitiator, setIsDeclarationInitiator] = useState(false);
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }
  let routeLink = "";
  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  const convertEpochToDate = (dateEpoch) => {
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
  function setselectIsDeclarationInitiator(e) {
    if (e.target.checked == true) {
      setIsDeclarationInitiator(e.target.checked);
    } else {
      setIsDeclarationInitiator(e.target.checked);
    }
  }
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}

      <Card>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_REG_SUMMARY_HEADING")}`}</span>
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
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_NAME")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(InformationDeath.DeceasedFirstNameMl || " CR_NOT_RECORDED")}{" "}
                {t(InformationDeath.DeceasedMiddleNameMl)}{" "}
                {t(InformationDeath.DeceasedLastNameMl) +
                  " / " +
                  (InformationDeath.DeceasedFirstNameEn ? InformationDeath?.DeceasedFirstNameEn : " CR_NOT_RECORDED")}{" "}
                {t(InformationDeath.DeceasedMiddleNameEn)} {t(InformationDeath.DeceasedLastNameEn)}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_SEX")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(InformationDeath.DeceasedGender.code + "_ML") + " / " + InformationDeath.DeceasedGender.code}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_CR_DEATH_OF_DATE")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(convertEpochToDate(InformationDeath.DateOfDeath) ? convertEpochToDate(InformationDeath.DateOfDeath) : " CR_NOT_RECORDED")}{" "}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {InformationDeath.DeathPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_CR_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(InformationDeath.hospitalNameEn.hospitalNamelocal) + "/" + InformationDeath.hospitalNameEn.hospitalName}
                    </CardText>
                  </div>
                </div>
              )}
              {InformationDeath.DeathPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_CR_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(InformationDeath.institution.namelocal) +
                        "," +
                        InformationDeath.DeathPlaceInstId.institutionNamelocal +
                        "/" +
                        InformationDeath.institution.code +
                        "," +
                        InformationDeath.DeathPlaceInstId.institutionName}
                    </CardText>
                  </div>
                </div>
              )}
              {InformationDeath.DeathPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(InformationDeath.DeathPlaceHomeHoueNameMl) +
                        "," +
                        InformationDeath.DeathPlaceHomeLocalityMl +
                        "," +
                        InformationDeath.DeathPlaceHomeStreetNameMl +
                        "," +
                        InformationDeath.DeathPlaceHomePostofficeId.namelocal +
                        "," +
                        InformationDeath.DeathPlaceHomePostofficeId.pincode +
                        "/" +
                        InformationDeath.DeathPlaceHomeHoueNameEn +
                        "," +
                        InformationDeath.DeathPlaceHomeLocalityEn +
                        "," +
                        InformationDeath.DeathPlaceHomeStreetNameEn +
                        "," +
                        InformationDeath.DeathPlaceHomePostofficeId.name +
                        "," +
                        InformationDeath.DeathPlaceHomePostofficeId.pincode}
                    </CardText>
                  </div>
                </div>
              )}
              {InformationDeath.DeathPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {`${
                        t("PDF_CR_VEHICLE_STATEMENT_ONE") +
                        " " +
                        InformationDeath.VehicleFromplaceMl +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_TWO" +
                        " " +
                        InformationDeath.VehicleToPlaceMl +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_THREE" +
                        " " +
                        InformationDeath.VehicleFirstHaltEn +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_FOUR" +
                        "/ " +
                        "PDF_CR_VEHICLE_STATEMENT_ONE_EN" +
                        " " +
                        InformationDeath.VehicleFromplaceEn +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_TWO_EN" +
                        " " +
                        InformationDeath.VehicleToPlaceEn +
                        "" +
                        "PDF_CR_VEHICLE_STATEMENT_THREE_EN" +
                        " " +
                        InformationDeath.VehicleFirstHaltEn
                      }`}
                    </CardText>
                  </div>
                </div>
              )}
              {InformationDeath.DeathPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(InformationDeath.DeathPlaceLocalityMl) +
                        "," +
                        InformationDeath.DeathPlaceStreetMl +
                        "/" +
                        InformationDeath.DeathPlaceLocalityEn +
                        "," +
                        InformationDeath.DeathPlaceStreetEn}
                    </CardText>
                  </div>
                </div>
              )}
              {InformationDeath.DeathPlace.code === "OUTSIDE_JURISDICTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(InformationDeath.DeathPlaceDistrict.namelocal|| "CR_NOT_RECORDED") +
                        "," +
                        InformationDeath.DeathPlaceState.namelocal || "CR_NOT_RECORDED"+
                        "," +
                        InformationDeath.DeathPlaceCountry.namelocal || "CR_NOT_RECORDED" + 
                        "/" +
                        InformationDeath.DeathPlaceDistrict.name || "CR_NOT_RECORDED" +
                        "," +
                        InformationDeath.DeathPlaceState.name || "CR_NOT_RECORDED"+
                        "," +
                        InformationDeath.DeathPlaceCountry.name || "CR_NOT_RECORDED"}
                    </CardText>
                  </div>
                </div>
              )}
            </div>
          </div>
 
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_CR_NAME_WIFE_HUSBAND")}`} </CardLabel>
            </div>
            {FamilyInformationDeath.SpouseUnavailable ? (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t("CR_NOT_RECORDED")} </CardText>
              </div>
            ) : (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :{" "}
                  {t(FamilyInformationDeath.SpouseNameML ? FamilyInformationDeath?.SpouseNameML : "CR_NOT_RECORDED") +
                    " " +
                    "(" +
                    " " +
                    (FamilyInformationDeath.SpouseType.namelocal ? FamilyInformationDeath?.SpouseType.namelocal : "CR_NOT_RECORDED") +
                    " " +
                    ")" +
                    "/" +
                    " " +
                    (FamilyInformationDeath.SpouseNameEn ? FamilyInformationDeath?.SpouseNameEn : "CR_NOT_RECORDED") +
                    " " +
                    "(" +
                    (FamilyInformationDeath?.SpouseType.name ? FamilyInformationDeath?.SpouseType.name : "CR_NOT_RECORDED") +
                    ")"}
                </CardText>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_NAME_OF_MOTHER")}`} </CardLabel>
            </div>

            {FamilyInformationDeath.MotherUnavailable ? (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t("CR_NOT_RECORDED")} </CardText>
              </div>
            ) : (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :{" "}
                  {t(FamilyInformationDeath.MotherNameMl ? FamilyInformationDeath?.MotherNameMl : "CR_NOT_RECORDED") +
                    "/" +
                    " " +
                    (FamilyInformationDeath.MotherNameEn ? FamilyInformationDeath?.MotherNameEn : "CR_NOT_RECORDED")}
                </CardText>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_NAME_OF_FATHER")}`} </CardLabel>
            </div>
            {FamilyInformationDeath.FatherUnavailable ? (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t("CR_NOT_RECORDED")} </CardText>
              </div>
            ) : (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :{" "}
                  {t(FamilyInformationDeath.FatherNameMl ? FamilyInformationDeath?.FatherNameMl : "CR_NOT_RECORDED") +
                    "/" +
                    " " +
                    (FamilyInformationDeath.FatherNameEn ? FamilyInformationDeath?.FatherNameEn : "CR_NOT_RECORDED")}
                </CardText>
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "14px" }}>{`${t("PDF_PRESENT_ADDRESS_DECEASED_ML")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameMl ? AddressBirthDetails.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaStreetNameMl +
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
                  AddressBirthDetails.presentaddressCountry.namelocal}{" "}
                ,
              </CardText>
            </div>

            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "17px" }}>{`${t("PDF_PRESENT_ADDRESS_DECEASED_EN")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaStreetNameEn +
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
                  AddressBirthDetails.presentaddressCountry.name}{" "}
                ,
              </CardText>
            </div>
          </div>

          {AddressBirthDetails.isPrsentAddress === true && (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PERMANENT_ADDRESS_DECEASED_ML")}`}</CardLabel>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                    :
                    {t(AddressBirthDetails.presentInsideKeralaHouseNameMl ? AddressBirthDetails.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                      " , " +
                      AddressBirthDetails.presentInsideKeralaStreetNameMl +
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
                      AddressBirthDetails.presentaddressCountry.namelocal}{" "}
                    ,
                  </CardText>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "17px" }}>{`${t(
                    "PDF_PERMANENT_ADDRESS_DECEASED_EN"
                  )}`}</CardLabel>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "17px", Colour: "black", fontWeight: "bold" }}>
                    :
                    {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                      " , " +
                      AddressBirthDetails.presentInsideKeralaStreetNameEn +
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
                      AddressBirthDetails.presentaddressCountry.name}{" "}
                    ,
                  </CardText>
                </div>
              </div>
            </div>
          )}

          {AddressBirthDetails.isPrsentAddress === false && (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PERMANENT_ADDRESS_DECEASED_ML")}`}</CardLabel>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                    :
                    {t(AddressBirthDetails.permntInKeralaAdrHouseNameMl ? AddressBirthDetails.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                      " , " +
                      AddressBirthDetails.permntInKeralaAdrStreetNameMl +
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

              <div className="row">
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "17px" }}>{`${t(
                    "PDF_PERMANENT_ADDRESS_DECEASED_EN"
                  )}`}</CardLabel>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "17px", Colour: "black", fontWeight: "bold" }}>
                    :
                    {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
                      " , " +
                      AddressBirthDetails.permntInKeralaAdrStreetNameEn +
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
                      AddressBirthDetails.permtaddressCountry.name}{" "}
                    ,
                  </CardText>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setselectIsDeclarationInitiator}
                value={IsDeclarationInitiator}
                checked={IsDeclarationInitiator}
              />
            </div>
          </div>
        </div>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default DeathCheckPage;
