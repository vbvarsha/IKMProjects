 import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";
 
 
 export const getFilteredDeceasedNameData = (selectedData, correctionData) => {
   let filteredDocuments = getFilteredDocuments(correctionData);
   const computedInitialValue = computeInitialValue(selectedData);
   const computedCurrentValue = computeCurrentValue(selectedData);
   let selectedDodObj = {
    fieldName: DEATH_CORRECTION_FIELD_NAMES.DECEASED_NAME,
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
const computeInitialValue = (data) => {
 const initialValue = {
   firstNameEn: data?.InformationDeath?.DeceasedFirstNameEn,
   firstNameMl: data?.InformationDeath?.DeceasedFirstNameMl,
   middleNameEn: data?.InformationDeath?.DeceasedMiddleNameEn,
   middleNameMl: data?.InformationDeath?.DeceasedMiddleNameMl,
   lastNameEn:data?.InformationDeath?.DeceasedLastNameEn,
   lastNameMl:data?.InformationDeath?.DeceasedLastNameMl
 };
 return initialValue;
};

const computeCurrentValue = (data) => {
 const currentValue = {
  firstNameEn: data?.InformationDeath?.DeceasedFirstNameEn,
  firstNameMl: data?.InformationDeath?.DeceasedFirstNameMl,
   middleNameEn: data?.InformationDeath?.DeceasedMiddleNameEn,
   middleNameMl: data?.InformationDeath?.DeceasedMiddleNameMl,
   lastNameEn:data?.InformationDeath?.DeceasedLastNameEn,
   lastNameMl:data?.InformationDeath?.DeceasedLastNameMl
 };
 return currentValue;
};
 
 const getFilteredDocuments = (correctionData) => {
   let filteredData  = correctionData[0];
   return filteredData;
 };
 