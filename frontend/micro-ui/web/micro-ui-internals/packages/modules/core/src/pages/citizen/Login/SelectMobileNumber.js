import React from "react";
import { CardText, FormStep, Card,BackButton } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import Background from "../../../components/Background";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config }) => {
  return (
    <Background>
      <div className="leftdiv">
        <div className="leftflex" >
          <h1 className="logostyle">
            {/* <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} /> */}

          </h1>
          <div style={{ textAlign: "center", margin: "0 auto" }}>
            <div>
              <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/citizenlogin.png" alt="No Image"
                style={{ maxWidth: "450px", marginLeft: "80px", marginRight: "80px" }} />
              <label style={{ fontSize: "32px", marginBottom: "20px !important" }}>{`${t("CS_LOGIN_PROVIDE_MOBILE_NUMBER")}`}</label><br></br>
              {/* <label style={{ fontSize: "17px", marginTop: "20px !important" }}>Kerala - Solutions for Managing Administrative Reformation and Transformation.</label> */}
            </div>
          </div>
           <div style={{ justifyContent: "space-between !important" }} >

            {/*<span style={{ marginRight: "60%" }} >2022&copy;K-Smart</span>&nbsp;
            <span  >
              <a className="text-white text-link" href="#">Legal</a>&nbsp;&nbsp;
              <a className="text-white text-link" href="#">Privacy</a>
            </span> */}

          </div>
        </div>
      </div>
      <Card className="bannerCard removeBottomMargin" style={{ margin: "0 auto" }}>
        <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%", width: "100%" }}>

          <div className="language-button-container"  >
            <div>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/mob.png" alt="No Image"
                  style={{ maxWidth: "100px", marginLeft: "180px", marginRight: "180px" }} />
                  
                <label style={{ fontSize: "25px",marginBottom: "20px !important" }}>{`${t("CS_LOGIN_PROVIDE_MOBILE_NUMBER")}`}</label><br></br>
                <label style={{ fontSize: "15px",marginTop: "20px !important" }}>{`${t("CS_LOGIN_TEXT")}`}</label>
              </div>
            </div>
            
            <FormStep
            
              isDisabled={mobileNumber.length !== 10}
              onSelect={onSelect}
              config={config}
              t={t}
              componentInFront="+91"
              onChange={onMobileChange}
              value={mobileNumber}
            ></FormStep>
          </div>
        </div>
      </Card>
    </Background>
  );
};

export default SelectMobileNumber;
