import React from "react";
import { useTranslation } from "react-i18next";
import { TickMark } from "@egovernments/digit-ui-react-components";

let actions = [];

const getAction = (flow) => {
  switch (flow) {
    case "STAKEHOLDER": actions = []
      break;
    default: actions = [
      'CR_ABANDONED_BIRTH_CHILD_DETAILS',
      'CR_INITIATOR_DETAILS',

      // 'BIRTH_TIME_LINE_ADDRESS',      
      // 'BIRTH_TIME_LINE_STATSTICAL',
      'BIRTH_TIME_LINE_SUMMARY',
    ]
  }
}
const Timeline = ({ currentStep = 1, flow = "" }) => {
  const { t } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  getAction(flow);
  return (
    <div className="timeline-container" style={isMobile ? {} : { maxWidth: "auto", minWidth: "auto", marginRight: "auto" }} >
      {actions.map((action, index, arr) => (
        <div className="timeline-checkpoint" key={index}>
          <div className="timeline-content">
            <span className={`circle ${index <= currentStep - 1 && 'active'}`}>{index < currentStep - 1 ? <TickMark /> : index + 1}</span>
            <span className={`secondary-color ${index <= currentStep - 1 && 'label-active'}`}>{t(action)}</span>
          </div>
          {index < arr.length - 1 && <span className={`line ${index < currentStep - 1 && 'active'}`}></span>}
        </div>
      ))}
    </div>
  )
}

export default Timeline; 