import React, { useState, useEffect } from "react";
import FSMActionModal from "./FSMActionModal";
import PTActionModal from "./PTActionModal";
import TLActionModal from "./TLActionModal";
import BirthActionModal from "./BirthActionModal";
import StillBirthActionModal from "./StillBirthActionModal";
import BornOutsideActionModal from "./BornOutsideActionModal";
import AdoptionActionModal from "./AdoptionActionModal";
import AbandonedActionModal from "./AbandonedActionModal";
import DeathActionModal from "./DeathActionModal";
import DeathNACActionModal from "./DeathNACActionModal";
import DFMActionModal from "./DFMActionModal";
import BPAREGActionModal from "./BPAREGActionModal";
import BPAActionModal from "./BPAActionModal";
import NOCActionModal from "./NOCActionModal";

const ActionModal = (props) => {
  // console.log("businessService" + props?.businessService);
  if (props?.businessService.includes("PT")) {
    return <PTActionModal {...props} />;
  }
  if (props?.businessService.includes("BIRTHHOSP21") || props?.businessService.includes("WFBIRTH30DAYS") || props?.businessService.includes("1YRBIRTHHOSP") || props?.businessService.includes("ABOVE1YRBIRTHHOSP")
  || props?.businessService.includes("21BIRTHHOME") || props?.businessService.includes("30BIRTHHOME") || props?.businessService.includes("1YRBIRTHHOME") || props?.businessService.includes("ABOVE1YRBIRTHHOME")) {
    return <BirthActionModal {...props} />;
  }
  if (props?.businessService.includes("STILLBIRTHHOSP")
  || props?.businessService.includes("STILLBIRTHHOME") ){
    return <StillBirthActionModal {...props} />;
  }
  if(props?.businessService.includes("ADOPTIONHOME")){
    return <AdoptionActionModal {...props} />;
  }
  if(props?.businessService.includes("BORNOUTSIDE60")){
    return <BornOutsideActionModal {...props} />;
  }

  if (props?.businessService.includes("21DEATHHHOME") || props?.businessService.includes("DEATHHOSP")) {
    return <DeathActionModal {...props} />;
  }
  if (props?.businessService.includes("DEATHABANDONED") || props?.businessService.includes("DEATHHOSP")) {
    return <AbandonedActionModal {...props} />;
  }
  if (props?.businessService.includes("NACAPP")) {
    return <DeathNACActionModal {...props} />;
  }
  if (props?.businessService.includes("NewDFM")) {
    return <DFMActionModal {...props} />;
  }
  if (props?.businessService.includes("NewTL") || props?.businessService.includes("TL") || props?.businessService.includes("EDITRENEWAL") || props?.businessService.includes("DIRECTRENEWAL")) {
    return <TLActionModal {...props} />;
  }

  if (props?.moduleCode.includes("BPAREG")) {
    return <BPAREGActionModal {...props} />;
  }

  if (props?.moduleCode.includes("BPA")) {
    return <BPAActionModal {...props} />;
  }

  if (props?.moduleCode.includes("NOC")) {
    return <NOCActionModal {...props} />;
  }
  // return <FSMActionModal {...props} />;
};

export default ActionModal;