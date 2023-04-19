import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const GroomAddressSameAsAbove = ({
  config,
  onSelect,
  userType,
  formData,
  isPrsentAddress,
  setIsPrsentAddress,
  isEditBirth = false,
  isEditDeath = false,
  isEditStillBirth = false,
  isEditBirthNAC = false,
  // isInitialRender, setIsInitialRender
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : isEditDeath ? false : isEditStillBirth ? isEditStillBirth : false);

  // const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressSameAsAboveDetails?.isPrsentAddress);

  function setSameAsPresent(e) {
    setIsPrsentAddress(e.target.checked);
    if (e.target.checked == true) {
      // setPermanentLBTypeName(PresentLBTypeName);
      // setPermanentBuldingNo(PresentBuldingNo);
      // setPermanentDoorNo(PresentDoorNo);
      // setPermanentHouseNameEn(PresentHouseNameEn);
      // setPermanentHouseNameMl(PresentHouseNameMl);
      // setPermanentMainPlaceEn(PresentMainPlaceEn);
      // setPermanentMainPlaceMl(PresentMainPlaceMl);
      // setPermanentLocalityNameEn(PresentLocalityNameEn);
      // setPermanentLocalityNameMl(PresentLocalityNameMl);
      // setPermanentStreetNameEn(PresentStreetNameEn);
      // setPermanentStreetNameMl(PresentStreetNameMl);
      // setPermanentVillage(PresentVillage);
      // setPermanentLBName(PresentLBName);
      // setPermanentDistrict(PresentDistrict);
      // setPermanentTaluk(PresentTaluk);
      // setPermanentPostOffice(PresentPostOffice);
      // setPermanentPincode(PresentPincode);
    } else {
      // setPermanentLBTypeName(' ');
      // setPermanentBuldingNo('');
      // setPermanentDoorNo('');
      // setPermanentHouseNameEn('');
      // setPermanentHouseNameMl('');
      // setPermanentMainPlaceEn('');
      // setPermanentMainPlaceMl('');
      // setPermanentLocalityNameEn('');
      // setPermanentLocalityNameMl('');
      // setPermanentStreetNameEn('');
      // setPermanentStreetNameMl('');
      // setPermanentVillage('');
      // setPermanentLBName('');
      // setPermanentDistrict('');
      // setPermanentTaluk('');
      // setPermanentPostOffice('');
      // setPermanentPincode('');
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <h1 className="headingh1">
            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
          </h1>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_SAME_AS_ABOVE")}
                onChange={setSameAsPresent}
                value={isPrsentAddress}
                checked={isPrsentAddress}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default GroomAddressSameAsAbove;
