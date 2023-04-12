import moment from "moment";

export const getFilteredDodData = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData?.InformationDeath?.DateOfDeath);
  const computedInitialValue = computeInitialValue(selectedData?.InformationDeath?.DateOfDeath);
  let selectedDodObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDodObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (dod) => {
  const initialValue = dod;

  return initialValue;
};

const computeCurrentValue = (dod) => {
  const currentValue = dod && moment(dod).format("DD/MM/YYYY");

  return currentValue;
};

const getFilteredDocuments = (selectedData,correctionData) => {
  let filteredData  = {};
  if (selectedData?.InformationDeath?.DeathPlace === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  return filteredData;
  
};
