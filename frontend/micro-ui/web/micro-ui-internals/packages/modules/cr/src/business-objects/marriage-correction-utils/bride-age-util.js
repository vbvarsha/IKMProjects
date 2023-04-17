export const getFilteredBrideAgeData = (selectedData, inclusionData) => {
    let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
    const computedValue = computeInitialValue(selectedData?.BrideDetails);
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
  const computeInitialValue = (brideDetails) => {
    const initialValue = brideDetails?.brideAge;
    return initialValue;
  };
  
  const getFilteredDocuments = (selectedData,inclusionData) => {
    let filteredData  = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.filter((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.filter((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    return filteredData;
  };