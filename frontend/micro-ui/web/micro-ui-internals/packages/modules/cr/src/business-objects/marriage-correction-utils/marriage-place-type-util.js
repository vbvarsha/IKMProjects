export const getFilteredMarriagePlaceTypeData = (selectedData, inclusionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
  const computedValue = computeInitialValue(selectedData?.marriagePlacetype);
  let selectedDomObj = {
    initialValue: computedValue,
    curValue: computedValue,
    isDisable: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDomObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (place) => {
  const initialValue = place;
  return initialValue;
//   return {firstName:"sdsa",middleNmae:"dsasd",lastNma:'"d'};
};

const getFilteredDocuments = (selectedData,inclusionData) => {
  let filteredData  = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  return filteredData;
};