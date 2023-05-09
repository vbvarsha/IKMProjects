import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb, DocumentIcon, CardLabel } from "@egovernments/digit-ui-react-components";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import { useTranslation } from "react-i18next";

const SearchFlow = ({ path }) => {
  const { t } = useTranslation();
  const cardMenuData = [
    {
      title: "CR_BIRTH_INBOX",
      subTitle: "CR_BIRTH_INBOX_APPLS",
      img: <FileProtected />,
      link: `${path}/birthinbox`,
    },

    {
      title: "CR_DEATH_INBOX",
      subTitle: "CR_DEATH_INBOX_APPS",
      img: <FileProtected />,
      link: `${path}/deathinbox`,
    },
    {
      title: "CR_MARRIAGE_INBOX",
      subTitle: "CR_MARRIAGE_INBOX_APPS",
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
    },
  ];
  const ClassList = 
    {
     'CR_BIRTH_INBOX':  'crfile',
     'CR_DEATH_INBOX':  'crfileadoption',
     'CR_MARRIAGE_INBOX': 'crmarriageCorrection'
    };
  return (
    <div>
      <div className="fileText">
        {" "}
        <CardLabel style={{fontSize: "15px",fontWeight: "400",marginBottom: "-18px"}}>{t("SELECT_INBX_TYPE")}</CardLabel>
        {/* <h3>Select Functional Modules</h3> */}
      </div>
      <div className="FileFlowWrapper">
        <div className="cardWrapper">
          {cardMenuData?.map((item, index) =>
            item.link ? (
              <Link to={item.link}>
                {/* <Link to='trade-lisense'> */}
                <div className={ClassList[item.title]}>
                  <div className="contentMenu">
                    <div className="contentImg">{item.img}</div>
                    <div className="contentText">
                      <h6>{item.title}</h6>
                      <span>{item.subTitle}</span>
                    </div>
                  </div>
                </div>{" "}
              </Link>
            ) : (
              <div className={ClassList[item.title]}>
                <div className="contentMenu">
                  <div className="contentImg">{item.img}</div>
                  <div className="contentText">
                    <h6>{item.title}</h6>
                    <span>{item.subTitle}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFlow;
