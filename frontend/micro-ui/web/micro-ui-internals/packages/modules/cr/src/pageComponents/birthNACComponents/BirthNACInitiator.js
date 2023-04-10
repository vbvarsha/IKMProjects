import React, { useState, useReducer, useEffect, useCallback } from "react";
import Timeline from "../../components/NACTimeline";
import { FormStep, CardLabel, TextInput, Dropdown, LinkButton, UploadFile,   DatePicker,
  BackButton,MultiLink, CheckBox, TextArea, Toast, Table, RadioButtons } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BirthNACInitiator = ({ config, onSelect, userType, formData ,isEditStillBirth=false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const {name:name,} =Digit.UserService.getUser().info ; // window.localStorage.getItem("user-info");
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.BirthNACInitiator?.isDeclared ? formData?. BirthNACInitiator?.isDeclared : false);
  const [isDeclaration, setDeclaration] = useState(formData?.BirthNACInitiator?.isunderstood ? formData?. BirthNACInitiator?.isunderstood : false);
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.BirthNACInitiator?.initiatorNameEn ? formData?.BirthNACInitiator?.initiatorNameEn : name);
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.BirthNACInitiator?.initiatorAadhar ? formData?.BirthNACInitiator?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.BirthNACInitiator?.initiatorMobile ? formData?.BirthNACInitiator?.initiatorMobile : "");
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.BirthNACInitiator?.initiatorDesi ? formData?.BirthNACInitiator?.initiatorDesi : "");
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.BirthNACInitiator?.initiatorAddress ? formData?.BirthNACInitiator?.initiatorAddress : "");
  const [careofapplicant, setcareofapplicant] = useState(formData?.BirthNACInitiator?.careofapplicant ? formData?.BirthNACInitiator?.careofapplicant : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [dob, setChildDOB] = useState(formData?.BirthNACInitiator?.dob ? formData?.BirthNACInitiator?.dob : "");
  const [sex, selectGender] = useState(formData?.BirthNACInitiator?.sex ? formData?.BirthNACInitiator?.sex : "");
  const [childNameEn, setchildNameEn] = useState(formData?.BirthNACInitiator?.childNameEn ? formData?.BirthNACInitiator?.childNameEn : "");
  const [childNameMl, setchildNameMl] = useState(formData?.BirthNACInitiator?.childNameMl ? formData?.BirthNACInitiator?.childNameMl : "");
  const [orderOfBirth, setorderOfBirth] =useState(
    formData?.BirthNACInitiator?.nacorderofChildren ? formData?.BirthNACInitiator?.nacorderofChildren : ""
  );
  const [isAlive, setisAlive] = useState(formData?.BirthNACInitiator?.isAlive ? formData?.BirthNACInitiator?.isAlive : "");
  const [slNo, setslNo] = useState();
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile1, setUploadedFile1] = useState(null);
  const [uploadedFile2, setUploadedFile2] = useState(null);
  const [uploadedFile3, setUploadedFile3] = useState(null);
  const [uploadedFile4, setUploadedFile4] = useState(null);
  const [uploadedFile5, setUploadedFile5] = useState(null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file1, setFile1] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file2, setFile2] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file3, setFile3] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file4, setFile4] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file5, setFile5] = useState(formData?.owners?.documents?.ProofOfIdentity);

  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?. BirthNACInitiator?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?. BirthNACInitiator?.initiatorAadhar ? false : false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?. BirthNACInitiator?.initiatorMobile ? false : false);
  const [initiatorAddressError, setinitiatorAddressError] = useState(formData?. BirthNACInitiator?.initiatorAddress ? false : false);
  const [formDatalocal, setFormDatalocal] = useState(formData?.TradeDetails);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const storedAppData = null;
  const storedOwnerData = null;
  let menu = [];
  let orderMenu = [
    { i18nKey: `Alive`, code: 'Yes', value: true },
    { i18nKey: `Expired`, code: 'No', value: false }
  ];
 
  let ownerappmap ={
    slNo: "slNo",
    sex: "sex",
    dob: "dob",
    childNameEn: "childNameEn",
    childNameMl: "childNameMl",
    orderOfBirth: "orderOfBirth",
    isAlive: "isAlive"
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_APPLICANT":
        return [
          ...state,
          {
            slNo: "",
            sex: "",
            dob: "dob",
            childNameEn: "",
            childNameMl: "",
            orderOfBirth: "",
            isAlive: "",
          },
        ];
      case "REMOVE_APPLICANT":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_APP":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
      case "EDIT_CURRENT_SELECT_APP":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else { 
            return data;
          }
        });
    }
  }
  const initowneredit = () => {
    return formDatalocal?.tradeLicenseDetail?.ownerspremise;
  }
  const initowner = () => {
    return [
      {
        slNo: "",
        sex: "",
        dob: null,
        childNameEn: "",
        childNameMl:"",
        orderOfBirth: "",
        isAlive: "",
      },
    ]
  }

  const reducerowner = (state, action) => {
    switch (action.type) {
      case "ADD_OWNER":
        return [
          ...state,
          {
            slNo: "",
            sex: "",
            dob: null,
            childNameEn: "",
            childNameMl:"",
            orderOfBirth: "",
            isAlive: "",
          },
        ];
      case "REMOVE_OWNER":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_OWNER":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  }

  const initapplicant = () => {
    return [
      {
        slNo: "",
        sex: "",
        dob: "dob",
        childNameEn: "",
        childNameMl:"",
        orderOfBirth: "",
        isAlive: "",
      }
    ]
  }

  const [appState, dispatchapplicant] = formDatalocal?.tradeLicenseDetail?.owners?.length > 0 ? useReducer(reducer, storedAppData, initapplicantedit) : useReducer(reducer, storedAppData, initapplicant);
  const [ownerState, disptachowner] =  useReducer(reducerowner, storedOwnerData,initowner)

  
  const handleOwnerInputField = useCallback((index, e, key, length = 100) => {
    if(e.length===0){
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: "" } });
      return;
    }
    if (typeof e === "object") {
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: e } });
      
    }
    // if(e.trim()==="" || e.trim()==="."){
    //   return;
    // }
    if (e.length <= length)
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: e } });
    else
      return
  }, [disptachowner]);

  const handleAppInputField = useCallback((index, e, key, length = 100) => {
    if(e.length===0){
      dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: "" } });
      if(formDatalocal?.tradeLicenseDetail?.ownershipCategory.code === "OWN" && LicenseeType.code === "INDIVIDUAL" && ownerappmap[key]){
        let jsonString = [];
        jsonString['index'] = index;
        jsonString['key'] = ownerappmap[key];
        jsonString['value'] = "";

        disptachowner({ type: "EDIT_CURRENT_OWNER", payload: {...jsonString} });
      }
      return;
    }
    if(e.trim()==="" || e.trim()==="."){
      return;
    }
    if (e.length <= length){
      dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: e } });
      if(formDatalocal?.tradeLicenseDetail?.ownershipCategory.code === "OWN" && LicenseeType.code === "INDIVIDUAL" && ownerappmap[key]){
         let jsonString = [];
         jsonString['index'] = index;
         jsonString['key'] = ownerappmap[key];
         jsonString['value'] = e;

        let peyloadtemp= { index, key, value: e };

        disptachowner({ type: "EDIT_CURRENT_OWNER",payload : {...jsonString} });
      }
    }
     
    else
      return;
  }, [dispatchapplicant,disptachowner]);
  const onSkip = () => onSelect();
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  useEffect(() => {
    if (isInitialRender) {
      if (formData?. BirthNACInitiator?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?. BirthNACInitiator?.isInitiatorDeclaration);
      }
    }
  }, [isInitialRender]);
  useEffect(() => {
    if (isInitialRender) {
      if (formData?. BirthNACInitiator?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setDeclaration(formData?. BirthNACInitiator?.isInitiatorDeclaration);
      }
    }
  }, [isInitialRender]);
  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
    function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setchildNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setchildNameMl('');
    }
    else {
      setchildNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }

  function setSelectOrderOfBirth(e) {
    setorderOfBirth(e.target.value);
  }
   function setselectGender(value) {
    selectGender(value);
  }
  function setAliveExpired(value) {
    setisAlive(value);
  }
  function setselectCareofApplicant(e) {
    setcareofapplicant(e.target.value);
  }
  function setSelectinitiatorAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  function setDeclarationStatement(e) {
    if (e.target.checked == false) {
      setDeclaration(e.target.checked);
    } else {
      setDeclaration(e.target.checked);
    }
  }
  function setselectChildDOB(value) {
    setChildDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
  }

  function selectfile(e) {
      setFile(e.target.files[0]);
   }
   function selectfile1(e) {
    setFile1(e.target.files[0]);
 }
 function selectfile2(e) {
  setFile2(e.target.files[0]);
}
function selectfile3(e) {
  setFile3(e.target.files[0]);
}
function selectfile4(e) {
  setFile4(e.target.files[0]);
}
function selectfile5(e) {
  setFile5(e.target.files[0]);
}

    useEffect(() => {
      (async () => {
        setError(null);
        if (file) {
          if (file.size >= 2000000) {
            setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else {
            try {
              const response = await Digit.UploadServices.Filestorage("citizen-profile", file, Digit.ULBService.getStateId());       
                       if (response?.data?.files?.length > 0) {
                setUploadedFile(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
            }
          }
        }
      })();
    }, [file]);
    useEffect(() => {
      (async () => {
        setError(null);
        if (file1) {
          if (file1.size >= 2000000) {
            setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else {
            try {
              const response = await Digit.UploadServices.Filestorage("citizen-profile", file1, Digit.ULBService.getStateId());       
                       if (response?.data?.files?.length > 0) {
                setUploadedFile1(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
            }
          }
        }
      })();
    }, [file1]);
    useEffect(() => {
      (async () => {
        setError(null);
        if (file2) {
          if (file2.size >= 2000000) {
            setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else {
            try {
              const response = await Digit.UploadServices.Filestorage("citizen-profile", file2, Digit.ULBService.getStateId());       
                if (response?.data?.files?.length > 0) {
                  setUploadedFile2(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
            }
          }
        }
      })();
    }, [file2]);
    useEffect(() => {
      (async () => {
        setError(null);
        if (file3) {
          if (file3.size >= 2000000) {
            setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else {
            try {
              const response = await Digit.UploadServices.Filestorage("citizen-profile", file3, Digit.ULBService.getStateId());       
                       if (response?.data?.files?.length > 0) {
                setUploadedFile3(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
            }
          }
        }
      })();
    }, [file3]);
    useEffect(() => {
      (async () => {
        setError(null);
        if (file4) {
          if (file4.size >= 2000000) {
            setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else {
            try {
              const response = await Digit.UploadServices.Filestorage("citizen-profile", file4, Digit.ULBService.getStateId());       
                       if (response?.data?.files?.length > 0) {
                setUploadedFile4(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
            }
          }
        }
      })();
    }, [file4]);
    useEffect(() => {
      (async () => {
        setError(null);
        if (file5) {
          if (file5.size >= 2000000) {
            setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else {
            try {
              const response = await Digit.UploadServices.Filestorage("citizen-profile", file5, Digit.ULBService.getStateId());       
                       if (response?.data?.files?.length > 0) {
                setUploadedFile5(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
            }
          }
        }
      })();
    }, [file5]);
  let validFlag = true;
  const goNext = () => {
    if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }

    if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
      let adharLength = initiatorAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinitiatorAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAadharError(false);
      }
    } else {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
      let mobileLength = initiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinitiatorMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorMobileError(false);
      }
    } else {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorAddress === null || initiatorAddress === "" || initiatorAddress === undefined) {
        validFlag = false;
        setinitiatorAddressError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAddressError(false);
      }
   
    if (validFlag == true) {

      onSelect(config.key, {
        initiatorNameEn,
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress,
        isInitiatorDeclaration,
        isDeclaration,
        dob,
        sex,
        childNameEn,
        childNameMl,
        orderOfBirth,
        slNo,
        isAlive,
        careofapplicant
      });
    }
  };

  const handleTextInputField1  = useCallback((index, e, key, length = 100) => {
    if (e.length <= length) {
      disptachowner({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e } });
        setFlgCheck(false);
        setFlgCheckDoor(false);
    }
    else
      return;
  }, [disptachowner]); 

  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
    return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={!isInitiatorDeclaration || !initiatorNameEn || !initiatorAadhar || !initiatorMobile || !initiatorAddress}
      >
        <div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Applicant</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAadhar"
                value={initiatorAadhar}
                onChange={setSelectinitiatorAadhar}
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INITIATOR_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorNameEn"
                value={initiatorNameEn}
                onChange={setSelectinitiatorNameEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_IS_CAREOF")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="careofapplicant"
                value={careofapplicant}
                onChange={setselectCareofApplicant}
                disable={isDisableEdit}
                placeholder={`${t("CR_IS_CAREOF")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="initiatorMobile"
                value={initiatorMobile}
                onChange={setSelectinitiatorMobile}
                disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
          </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                isMandatory={true}
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Details of the Children born including the applicant child</span>{" "}
            </h1>
          </div>
        </div>
            {ownerState.map((field, index) => {
          return (
            <div key={`${field}-${index}`}>
              <div style={{
                    border: "solid",
                    borderRadius: "10px",
                    marginTop: "5px",
                    borderColor: "#f3f3f3",
                    background: "#FAFAFA",
                  }} className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                      <CardLabel>SL NO</CardLabel>
                      <TextInput
                       t={t}
                      //isMandatory={config.isMandatory}
                      type={"number"}
                      optionKey="i18nKey"
                      name="slNo"
                      value={field?.slNo}
                      onChange={(e)=>handleOwnerInputField(index, e.target.value, "slNo")}/>
                    </div>
                    <div className="col-md-3">
                    <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                </CardLabel>
                <DatePicker
                  date={field?.dob}
                  name="dob"
                  max={convertEpochToDate(new Date())}
                  onChange={(e)=>handleOwnerInputField(index, e, "dob")}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: false, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
                    </div>
                    <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_NAME_EN")}`}
                    </CardLabel>
                    <TextInput
                      t={t}
                      //isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childNameEn"
                      value={field?.childNameEn}
                      onChange={(e)=>handleOwnerInputField(index, e.target.value, "childNameEn")}
                      disable={isEdit}
                      placeholder={`${t("CR_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_NAME_ML")}`}
                    </CardLabel>
                    <TextInput
                      t={t}
                      //isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childNameMl"
                      value={field?.childNameMl}
                      onChange={(e)=>handleOwnerInputField(index, e.target.value, "childNameMl")}
                      disable={isEdit}
                      placeholder={`${t("CR_FIRST_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_NAME_ML"),
                      })}
                    />
                  </div>
                    {/* </div>
                    <div className="row"> */}
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_GENDER")}`}</CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="code"
                        isMandatory={true}
                        option={menu}
                        selected={field?.sex}
                        // select={setselectGender}
                        placeholder={`${t("CR_GENDER")}`}
                        select={(e) => handleOwnerInputField(index, e, 'sex')}/>
                    </div>
                </div>
                                
                <div className="col-md-3">
                      <CardLabel>Order of Birth</CardLabel>
                      <TextInput 
                      t={t} 
                      //isMandatory={config.isMandatory} 
                      type={"number"}
                      optionKey="i18nKey" 
                      name="orderOfBirth"
                      value={field?.orderOfBirth} 
                      onChange={(e)=>handleOwnerInputField(index, e.target.value, "orderOfBirth")}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Alive? Yes/No</CardLabel>
                      <RadioButtons
                      style={{display: 'flex'}}
                        t={t}
                      options={orderMenu}
                      optionsKey="code"
                      name="isAlive"
                      selectedOption={field?.isAlive}
                      //selectedOption={true} 
                      onSelect={(e) => handleOwnerInputField(index, e, "isAlive")}
                      //isDependent={true}
                      labelKey=""
                    />
                    </div>
                    {ownerState.length === (index + 1) && (
                      <div className="col-md-1">
                        <CardLabel>Add</CardLabel>
                        <LinkButton
                          label={
                            <svg className="icon  icon--plus" viewBox="0 0 122.88 122.88" width="30" height="30">
                              <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z" />
                            </svg>
                          }
                           onClick={(e) => disptachowner({ type: "ADD_OWNER",payload:{
                            slNo: slNo,
                            sex: sex,
                            dob: dob,
                            childNameEn: childNameEn,
                            childNameMl: childNameMl,
                            orderOfBirth: orderOfBirth,
                            isAlive: isAlive
                          } })}
                        />
                      </div>
                    )}
                    {ownerState.length > 1 && (
                      <div className="col-md-1">
                        <CardLabel>Remove</CardLabel>
                        <LinkButton
                          label={
                            <svg viewBox="0 0 1024 1024" width="30" height="30"> <g> <path fill="none" d="M0 0h24v24H0z" />
                             <path xmlns="http://www.w3.org/2000/svg" d="M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z"/> </g> </svg>
                          }
                           onClick={(e) => disptachowner({ type: "REMOVE_OWNER", payload: { index } })}
                        />
                      </div>
                    )}
                  </div>
                  </div>
              
              )
            })
              }
              
               <div className="row">
                  <div className="col-md-12">
                  <h1 className="headingh1" style={{marginTop: "30px"}}>
                  <span style={{ background: "#fff", padding: "0 10px" }}>File Upload</span>{" "}
                  </h1>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                  <div className="row">
              <div className="col-md-5">
              <CardLabel>Address proof of parents at the time of birth<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={selectfile}
                onDelete={() => {
                  setUploadedFile(null);}}
                message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  
             />
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>Proof of birth showing the date/place details of parents at the time of birth<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={selectfile1}
                onDelete={() => {
                  setUploadedFile1(null);}}
                message={uploadedFile1 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  
             />
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>School Certificate of Child(above 6 years)<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={selectfile2}
                onDelete={() => {
                  setUploadedFile2(null);}}
                message={uploadedFile2 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  
             />
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>ID Proof of Mother at the time of birth <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={selectfile3}
                onDelete={() => {
                  setUploadedFile3(null);}}
                message={uploadedFile3 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  
             />
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>ID Proof of Father at the time of birth <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={selectfile4}
                onDelete={() => {
                  setUploadedFile4(null);}}
                message={uploadedFile4 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  
             />
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>Medical Certificate(if child is differently abled for not attending school after 6 years) <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={selectfile5}
                onDelete={() => {
                  setUploadedFile5(null);}}
                message={uploadedFile5 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  
             />
              </div>
              </div> 
              </div>
              </div>
                      
              <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label="I do understand that NAC/NIA issue will be subject to the genuiness of documents produced and enquiry done by the registrar"
                onChange={setDeclarationStatement}
                value={isDeclaration}
                checked={isDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
         
        {toast && (
          <Toast
            error={infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorAddressError}
            label={
              infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorAddressError
                ? infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : initiatorAadharError
                  ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                  : initiatorMobileError
                  ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                  : initiatorAddressError
                  ? t(`BIRTH_ERROR_INFORMANT_ADDRESS_CHOOSE`)
                  : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default BirthNACInitiator;
