import { BIRTH_INCLUSION_FIELD_NAMES } from "../config/constants";
import { getFilteredChildDobData, getFilteredChildNameData, getFilteredChildSexData } from "../config/birth-inclusion-utils";

export const initializeBirthInclusionObject = (birthInclusionDocData, selectedData) => {
  let formObj = {};
  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = birthInclusionFilterFieldsObj[field_key]?.(selectedData, filteredData);
    console.log("filteredData", selectedData, filteredData);
    let tempObj = { ...inclusionsDocsData, isUpdated: false, isEditable: false, isFocused: false };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  console.log("returned formObj==", formObj);
  return formObj;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: (data, inclusionData) => getFilteredChildDobData(data, inclusionData),
  CHILD_NAME: (data, inclusionData) => getFilteredChildNameData(data, inclusionData),
  CHILD_SEX: (data, inclusionData) => getFilteredChildSexData(data, inclusionData),
};
