import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, RadioOrSfieldelect, TextInput, TextArea, DatePicker, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useLocation } from "react-router-dom";
import Timeline from "../components/TLTimeline";
import { sortDropdownNames } from "../utils/index";
import { useQueryClient } from "react-query";
const TLLicenseUnitDet = ({ t, config, onSelect, userType, formData }) => {
  const [formDataPage, setFormDataPage] = useState(window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade") ? formData :  formData?.TradeDetails);
  const queryClient = useQueryClient();
  const [tenantboundary, setTenantboundary] = useState(false);
  const [tenantId, setTenantId] = useState(Digit.ULBService.getCurrentTenantId());
  if(tenantboundary){
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    setTenantboundary(false);
  }

  const menusector = [
    { name: "Manufacturing Sector", code: "MANUFACTURING" },
    { name: "Service Sector", code: "SERVICE" },
  ];

  const menu = [
    { i18nKey: "TL_COMMON_YES", code: "YES" },
    { i18nKey: "TL_COMMON_NO", code: "NO" },
  ];

  const ownershipCategoryMenu = [
    { name: "Own", code: "OWN" },
    { name: "Joint Ownership", code: "JOINTOWNER" },
    { name: "Lease", code: "LEASE" },
    { name: "Rent", code: "RENT" },
    { name: "Consent", code: "CONSENT" },
    { name: "LB Owned Building", code: "LBBUILDING" },
  ];

  const stateId = Digit.ULBService.getStateId();
  let validation = {};
  const { data: Districts = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "District"); 
  const { data: PostOffice = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "PostOffice");
  const { data: LBTypes = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "LBType");
  const { data: BoundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egov-location", "boundary-data");
  //const [BoundaryList,setBoundaryList] = useState([]);
  const { data: localbodies, islocalbodiesLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "Localbody");
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: dataitem = {}, isstructuretypeLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeStructureSubtype");

  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRendercombo, setisInitialRendercombo] = useState(true);
  const [isInitialRenderRadio, setisInitialRenderRadio] = useState(true);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [DistrictList, setDistrictList] = useState(formDataPage?.districtid ? cmbDistrict.filter((district) => district.districtid.includes(formDataPage?.districtid))[0] : "");
  const [LBTypeList, setLBTypeList] = useState(formDataPage?.lbtype ? cmbLBType.filter((lbtype) => lbtype.code.includes(formDataPage?.lbtype))[0]  : "");
  const [Localbody, setLocalbody] = useState(formDataPage?.tenantId ? cmbLB.filter((lb) => lb.code.includes(formDataPage?.tenantId))[0] : "");
  const [FilterLocalbody, setFilterLocalbody] = useState([]);
  const [businessSector, setBusinessSector] = useState(formDataPage?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec.code.includes(formDataPage?.tradeLicenseDetail?.businessSector))[0] : "");
  // const [BuildingType, setBuildingType] = useState(formData?.tradeLicenseDetail?.address?.buildingType ? buildingtype.filter((type) => type.code.includes(formData?.tradeLicenseDetail?.address?.buildingType))[0] : "");
  const [businessCategory, setBusinessCategory] = useState(formDataPage?.tradeLicenseDetail?.tradeUnits?.businessCategory ? TradeCategoryMenu.filter((category) => category.code.includes(formDataPage?.tradeLicenseDetail?.tradeUnits?.businessCategory))[0] : "");
  const [businessType, setBusinessType] = useState(formDataPage?.tradeLicenseDetail?.tradeUnits?.businessType  ? BusinessTypeMenu.filter((type) => type.code.includes(formDataPage?.tradeLicenseDetail?.tradeUnits?.businessType))[0] : "");
  const [businessSubType, setBusinessSubType] = useState(formDataPage?.tradeLicenseDetail?.Units?.businessSubtype  ? BusinessSubTypeMenu.filter((type) => type.code.includes(formDataPage?.tradeLicenseDetail?.Units?.businessSubtype))[0]  : "");
  const [businessActivityDesc,setBusinessActivityDesc] = useState(formDataPage?.tradeLicenseDetail?.businessActivityDesc  ? formDataPage?.tradeLicenseDetail?.businessActivityDesc  : "");
  const [noOfEmployees,setNoOfEmployees] = useState(formDataPage?.tradeLicenseDetail?.noOfEmployees  ? formDataPage?.tradeLicenseDetail?.noOfEmployees  : "");
  const [capitalInvestment,setCapitalInvestment] = useState(formDataPage?.tradeLicenseDetail?.capitalInvestment  ? formDataPage?.tradeLicenseDetail?.capitalInvestment  : "");
  const [commencementDate,setCommencementDate] = useState(formDataPage?.commencementDate);
  const [desiredLicensePeriod,setDesiredLicensePeriod] = useState(formDataPage?.desiredLicensePeriod  ? formDataPage?.desiredLicensePeriod  : "");

  const [tradeName,setTradeName] = useState(formDataPage?.tradeName  ? formDataPage?.tradeName  : "");
  const [licenseUnitNameLocal,setLicenseUnitNameLocal] = useState(formDataPage?.licenseUnitNameLocal  ? formDataPage?.licenseUnitNameLocal  : "");
  const [contactno,setContactno] = useState(formDataPage?.tradeLicenseDetail?.address?.contactno  ? formDataPage?.tradeLicenseDetail?.address?.contactno  : "");
  const [email,setEmail] = useState(formDataPage?.tradeLicenseDetail?.address?.email  ? formDataPage?.tradeLicenseDetail?.address?.email  : "");  
  const [structureType,setStructureType] = useState(formDataPage?.tradeLicenseDetail?.structureType  ? cmbStructure.filter((structure) => structure.includes(formDataPage?.tradeLicenseDetail?.structureType))[0] : ""); 
  const [structurePlaceSubtype,setStructurePlaceSubtype] = useState(formDataPage?.tradeLicenseDetail?.structurePlaceSubtype  ? cmbPlace.filter((place) => place.includes(formDataPage?.tradeLicenseDetail?.structurePlaceSubtype))[0] : "");
  const [filteredPlaceSubtype,setFilteredPlaceSubtype] = useState([]);
  const [ownershipCategory,setOwnershipCategory] = useState(formDataPage?.tradeLicenseDetail?.ownershipCategory  ?  ownershipCategoryMenu.filter((category) => category.includes(formDataPage?.tradeLicenseDetail?.ownershipCategory))[0]  : "");
  const [isResurveyed,setIsResurveyed] = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.isResurveyed  ? ownershipCategoryMenu.filter((menu) => menu.includes(formDataPage?.tradeLicenseDetail?.structurePlace?.isResurveyed))[0]  : "");
  const [blockNo,setBlockNo] = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.blockNo  ? formDataPage?.tradeLicenseDetail?.structurePlace?.blockNo  : "");
  const [surveyNo,setSurveyNo] = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.setSurveyNo  ? formDataPage?.tradeLicenseDetail?.structurePlace?.setSurveyNo  : "");
  const [subDivisionNo,setSubDivisionNo] = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.subDivisionNo  ? formDataPage?.tradeLicenseDetail?.structurePlace?.subDivisionNo  : ""); 
  const [partitionNo,setPartitionNo] = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.partitionNo  ? formDataPage?.tradeLicenseDetail?.structurePlace?.partitionNo  : ""); 
  const [locality,setLocality] = useState(formDataPage?.tradeLicenseDetail?.address?.locality  ? formDataPage?.tradeLicenseDetail?.address?.locality  : ""); 
  const [street,setStreet] = useState(formDataPage?.tradeLicenseDetail?.address?.street  ? formDataPage?.tradeLicenseDetail?.address?.street  : ""); 
  const [landmark,setLandmark] = useState(formDataPage?.tradeLicenseDetail?.address?.landmark  ? formDataPage?.tradeLicenseDetail?.address?.landmark  : ""); 
  const [buildingName,setBuildingName] = useState(formDataPage?.tradeLicenseDetail?.address?.buildingName  ? formDataPage?.tradeLicenseDetail?.address?.buildingName  : ""); 
  const [pincode,setPincode] = useState(formDataPage?.tradeLicenseDetail?.address?.pincode  ? formDataPage?.tradeLicenseDetail?.address?.pincode  : ""); 
  const [postOffice,setPostOffice]  = useState(formDataPage?.tradeLicenseDetail?.address?.postOffice  ? cmbPostOffice.filter((postoffice) => postoffice.code.includes( formDataPage?.tradeLicenseDetail?.address?.postOffice))[0] : ""); 
  const [vehicleNo,setVehicleNo]  = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.vehicleNo  ? formDataPage?.tradeLicenseDetail?.structurePlace?.vehicleNo  : "");
  const [serviceArea,setServiceArea]  = useState(formDataPage?.tradeLicenseDetail?.address?.serviceArea  ? formDataPage?.tradeLicenseDetail?.address?.serviceArea  : "");  
  const [vesselNo,setVesselNo]  = useState(formDataPage?.tradeLicenseDetail?.structurePlace?.vesselNo  ? formDataPage?.tradeLicenseDetail?.structurePlace?.vesselNo  : "");
  const [waterbody,setWaterbody]  = useState(formDataPage?.tradeLicenseDetail?.address?.waterbody  ? formDataPage?.tradeLicenseDetail?.address?.waterbody  : "");
  const [fields, setFeilds] = useState([{ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null }]);
  const [fieldsDoor, setFeildsDoor] = useState(
    (formDataPage?.tradeLicenseDetail && formDataPage?.tradeLicenseDetail.structurePlace) || [{ blockNo: "", surveyNo: "", subDivisionNo: "", partitionNo: "", doorNo: "", doorNoSub: "",
    vehicleNo: "", vesselNo: "", isResurveyed: false,stallNo: "" }]
  );
  
  const storedDoorData = formDataPage?.door?.door;
  const [zonalOffice,setZonalOffice]=useState(formDataPage?.tradeLicenseDetail?.address?.zonalid ? Zonal.filter((zone) => zone.code.includes(formDataPage?.tradeLicenseDetail?.address?.zonalid))[0]:"");
  const [WardNo,setWardNo]=useState(formDataPage?.tradeLicenseDetail?.address?.wardid ? cmbWardNoFinal.filter((ward) => ward.code.includes(formDataPage?.tradeLicenseDetail?.address?.wardid))[0]:"");
  // const onSuccess = () => {
  //   sessionStorage.removeItem("CurrentTenant");
  //   queryClient.invalidateQueries("TL_CREATE_TRADE");
  // };
  
  let naturetype = null;
  let naturetypecmbvalue = null;
  let cmbDistrict = [];
  let cmbLBType = [];
  let LBs = [];
  let cmbLB = [];
  let Boundary = [];
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let cmbStructure = [];
  let cmbPostOffice = [];
  let cmbPlace = [];
  
  

  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  dataitem &&
    dataitem["TradeLicense"] &&
    dataitem["TradeLicense"].TradeStructureSubtype.map((ob) => {
      cmbStructure.push(ob);
    });
  Districts &&
    Districts["common-masters"] &&
    Districts["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  PostOffice &&
  PostOffice["common-masters"] &&
  PostOffice["common-masters"].PostOffice.map((ob) => {
    cmbPostOffice.push(ob);
  });

  LBTypes &&
  LBTypes["common-masters"] &&
  LBTypes["common-masters"].LBType.map((ob) => {
    cmbLBType.push(ob);
  });

  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      LBs.push(ob);
  });
  
  BoundaryList &&
    BoundaryList["egov-location"] &&
    BoundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Boundary.push(...ob.boundary);
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });

  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
    wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
    cmbWardNoFinal.push(wardmst);
  });

  if(zonalOffice){
    let cmbWardNotemp=cmbWardNoFinal.filter(obj=> obj.zonecode === zonalOffice.code);
    cmbWardNoFinal=cmbWardNotemp;
  }
  cmbWardNoFinal = cmbWardNoFinal.sort((a, b) => {
    if (parseInt(a.wardno) > parseInt(b.wardno)) { return 1; }
    if (parseInt(b.wardno) > parseInt(a.wardno)) { return -1; }
    return 0;
  });

  function handleAdd() {
    const values = [...fields];
    values.push({ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null });
    setFeilds(values);
  }

  function handleRemove(index) {
    const values = [...fields];
    if (values.length != 1) {
      values.splice(index, 1);
      setFeilds(values);
    }
  }

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  let BusinessCategoryMenu = [];
  //let TradeTypeMenu = [];

  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!BusinessCategoryMenu.some((BusinessCategoryMenu) => BusinessCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        BusinessCategoryMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }
    });
  // const mutationboundary = [];
  // if((Localbody) && (isInitialRender)){
  //   mutationboundary = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, Localbody.code.split(".")[1]  + "/egov-location", "boundary-data");
  // }

  function getBusinessTypeMenu(BusinessCategory) {
    let BusinessTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob.code.split(".")[0] === BusinessCategory.code &&
          !BusinessTypeMenu.some((BusinessTypeMenu) => BusinessTypeMenu.code === `${ob.code.split(".")[1]}`)
        ) {
          BusinessTypeMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[1]}`, code: `${ob.code.split(".")[1]}` });
        }
      });
    return BusinessTypeMenu;
  }

  function getBusinessSubTypeMenu(BusinessType) {
    let BusinessSubTypeMenu = [];
    BusinessType &&
      Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[1] === BusinessType.code && !BusinessSubTypeMenu.some((BusinessSubTypeMenu) => BusinessSubTypeMenu.code === `${ob.code}`)) {
          BusinessSubTypeMenu.push({ i18nKey: `TL_${ob.code}`, code: `${ob.code}` });
        }
      });
    return BusinessSubTypeMenu;
  }

  const selectDistrict = ((value) => {
    setDistrictList(value);
    setIsInitialRender(true);
    setLocalbody(null);
    setZonalOffice(null);
    setWardNo(null);
    setTenantId("kl");
    setTenantboundary(true);
  } ); //, [DistrictList,Localbody]);

  const selectLBType = ((value) => {
    setLBTypeList(value);
    setIsInitialRender(true);
    setLocalbody(null);
    setZonalOffice(null);
    setWardNo(null);
    setTenantId("kl");
    setTenantboundary(true);
  }); //, [LBTypeList,isInitialRender]);

  const selectLocalbody = ((value) => {
    setTenantId(value.code);
    setLocalbody(value);
    setIsInitialRender(true);
    setTenantboundary(true);
  });  //, [Localbody,isInitialRender]);

  const selectZonal=((value)=>{
    setZonalOffice(value);
    setWardNo(null);
  })
  const selectWard =((value) => {
    setWardNo(value);
  });
  const selectBusinessCategory = (i, value) => {
    let units = [...fields];
    units[i].businesscategory = value;
    setBusinessCategory(value);
    selectBusinessType(i, null);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessType = (i, value) => {
    let units = [...fields];
    units[i].businesstype = value;
    setBusinessType(value);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessSubType = (i, value) => {
    let units = [...fields];
    units[i].businesssubtype = value;
    setBusinessSubType(value);
    // if (value == null) {
    //   units[i].unit = null;
    //   setUnitOfMeasure(null);
    // }
    // Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
    // value &&
    //   Data &&
    //   Data.TradeLicense &&
    //   Data.TradeLicense.TradeType.map((ob) => {
    //     if (value.code === ob.code) {
    //       units[i].unit = ob.uom;
    //       setUnitOfMeasure(ob.uom);
    //       // setFeilds(units);
    //     }
    //   });
    setFeilds(units);
  }

  const changesetBusinessActivityDesc = (e => {
    setBusinessActivityDesc(e.target.value);
  });

  const changesetCapitalInvestment = (e => {
    setCapitalInvestment(e.target.value);
  });

  const changesetCommencementDate = (e => {
    setCommencementDate(e);
  });

  const changesetDesiredLicensePeriod = (e => {
    setDesiredLicensePeriod(e.target.value);
  });

  const changesetNoofEmployees = (e => {
    setNoOfEmployees(e.target.value);
  });

  const changesetTradeName = (e => {
    setTradeName(e.target.value);
  });

  const changesetLicenseUnitNameLocal = (e => {
    setLicenseUnitNameLocal(e.target.value);
  });

  const changesetContactno = (e => {
    setContactno(e.target.value);
  });

  const changesetEmail = (e => {
    setEmail(e.target.value);
  });

  const selectStructureType = (value => {
    setStructureType(value);
    naturetypecmbvalue = value.code.substring(0, 4);
    setValue2(naturetypecmbvalue);
    setIsInitialRender(true);
    SelectStructurePlaceSubtype(null);
    setFilteredPlaceSubtype(null);
  });

  const SelectStructurePlaceSubtype = (value => {
    setStructurePlaceSubtype(value);
  });

  const SelectOwnershipCategory = (value => {
    setOwnershipCategory(value);
  });

  const selectIsResurveyed = (value => {
    setIsResurveyed(value);
    setValue3(value.code);
  });

  const changesetBlockNo = (e => {
    setBlockNo(e.target.value);
  });

  const changesetSurveyNo = (e => {
    setSurveyNo(e.target.value);
  });
  
  const changesetSubDivisionNo = (e => {
    setSubDivisionNo(e.target.value);
  });

  const changesetPartitionNo = (e => {
    setPartitionNo(e.target.value);
  });

  const changesetLocality = (e => {
    setLocality(e.target.value);
  });

  const changesetStreet = (e => {
    setStreet(e.target.value);
  });

  const changesetLandmark = (e => {
    setLandmark(e.target.value);
  });

  const changesetBuildingName = (e => {
    setBuildingName(e.target.value);
  });

  const changesetPincode = (e => {
    setPincode(e.target.value);
    setPostOffice(cmbPostOffice.filter((postoffice)=>{
      postOffice.pincode === e.target.value.pincode  
    }));
  });

  const selectsetPostOffice = (value => {
    setPostOffice(value);
    setPincode(value.pincode);
  });

  const changesetVehicleNo = (e => {
    setVehicleNo(e.target.value);
  });

  const changesetServiceArea = (e => {
    setServiceArea(e.target.value);
  });

  const changesetVesselNo = (e => {
    setVesselNo(e.target.value);
  });

  const changesetWaterbody = (e => {
    setWaterbody(e.target.value);
  });
  
  const selectBusinessSector = (value => {
    setBusinessSector(value);
  });
  
  
  const initFnEdit = () => {
    return fieldsDoor;
  };

  const reducerDoor = (stateDoor, action) => {

    switch (action.type) {
      case "ADD_NEW_DOOR":
        return [
          ...stateDoor,
          {
            blockNo: "",
            surveyNo: "",
            subDivisionNo: "",
            partitionNo: "",
            doorNo: "",
            doorNoSub: "",
            vehicleNo: "",
            vesselNo: "",
            isResurveyed: false,
            stallNo: "",
          },
        ];
      case "REMOVE_THIS_DOOR":
        return stateDoor.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_DOORNO":
        return stateDoor.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
      // case "CHECK_DOOR":
      //   queryClient.removeQueries("TL_SEARCH_PDE");
      //   data1["wardId"] = WardNo?.code ? WardNo.code : "";
      //   state1.map((data, __index) => {
      //     data1["doorNo"] = data?.doorNo ? data.doorNo : "";
      //     data1["subNo"] = data?.doorNoSub ? data.doorNoSub : "";
      //     configDoor = {
      //       enabled: !!(data && Object.keys(data).length > 0)
      //     }
      //     data1 = {
      //       ...data1
      //     }
          // setPayloadDoor(Object.keys(data1).filter(k => data1[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data1[key] === "object" ? data1[key].code : data1[key] }), {}));
          // searchResultDoor = mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError ? mutationsearchDoor.data.Licenses : "";
          // if (searchResultDoor?.length === 1) {
          //   formData = (mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError) ? mutationsearchDoor.data : "";
          //   setFlgCheck(true);
          // }
        // });
        // return [
        //   ...stateDoor
        // ];

    }
  };

  const initFn = (initData) => {
    return [
      {
          blockNo: "",
          surveyNo: "",
          subDivisionNo: "",
          partitionNo: "",
          doorNo: "",
          doorNoSub: "",
          vehicleNo: "",
          vesselNo: "",
          isResurveyed: false,
          stallNo: ""
      },
    ];
  };

  const [formStateDoor, dispatchDoor] = isEdit ? useReducer(reducerDoor, storedDoorData, initFnEdit) : useReducer(reducerDoor, storedDoorData, initFn);

  const handleTextInputField1 = ((index, e, key) => {
    if (key === "doorNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 5 ? e.target.value.replace(/[^0-9.]/ig, '') : (e.target.value.replace(/[^0-9.]/ig, '')).substring(0, 5) } });
    if (key === "doorNoSub")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 14 ? e.target.value : e.target.value.substring(0, 14) } });
    if (key === "stallNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "blockNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "surveyNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "subDivisionNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "partitionNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "vehicleNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "vesselNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "isResurveyed")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: value2 === "LAND"  ? e.code : ""} });
    
      setFeildsDoor((formDataPage?.tradeLicenseDetail && formDataPage?.tradeLicenseDetail.structurePlace) || [{ blockNo: "", surveyNo: "", subDivisionNo: "", partitionNo: "", doorNo: "", doorNoSub: "",
      vehicleNo: "", vesselNo: "", isResurveyed: null,stallNo: "" }]);
  });

 
  useEffect(() => {
    if (isInitialRender) {
      if(structureType){
        setIsInitialRender(false);
        naturetype = structureType.code;
        setFilteredPlaceSubtype(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        setValue2(naturetype);
        if (naturetype === "LAND") {
        setValue3(formDataPage?.tradeLicenseDetail?.structurePlace?.isResurveyed ? formDataPage?.tradeLicenseDetail?.structurePlace?.isResurveyed : null);
        }
      }
      // if (structurePlaceSubtype) {
      //   setIsInitialRender(false);
      //   naturetype = structureType.code;
      //   setValue2(naturetype);
      //   setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
      //   if (naturetype === "LAND") {
      //     setValue3(formData?.tradeLicenseDetail?.structurePlace?.isResurveyed ? formData?.tradeLicenseDetail?.structurePlace?.isResurveyed : null);
      //   }
      // }
    }
  }, [isInitialRender,value2,value3,filteredPlaceSubtype]);

  useEffect(() => {
    if(isInitialRender) {
      // if((DistrictList)&&(LBTypeList)){
        cmbLB = [];
        setIsInitialRender(false);
        cmbLB.push(...LBs.filter((localbody) => ((localbody?.city?.districtid == DistrictList?.districtid)&&(localbody?.city?.lbtypecode == LBTypeList?.code))));
        setFilterLocalbody(cmbLB);
      // }
     
    }
  }, [isInitialRender,FilterLocalbody]);

  useEffect(() => {
    if((isInitialRender)) {
      if(Localbody){
        setIsInitialRender(false);
        cmbWardNoFinal.push(...cmbWardNoFinal?.filter((wardno) => ((wardno?.zonecode == Zonal?.code)&&(Zonal?.city?.lbtypecode == LBTypeList?.code))));
        setFilterLocalbody(cmbLB);
      }
    }
  }, [isInitialRender,FilterLocalbody]);


  const goNext = () => {
    let combineddoorno = "";
    formStateDoor.map((data) => {
      combineddoorno = combineddoorno + data.doorNo +
        (data.doorNoSub !== "" && data.doorNoSub !== null ? "/" + data.doorNoSub : "") +
        (data.stallNo !== "" && data.stallNo !== null ? "(" + data.stallNo + ")" : "") + ",";
    });
    combineddoorno = combineddoorno.slice(0, -1);

    let units = fields;
    // formData.TradeDetails.Units;    
    let address = {
      "doorNo": combineddoorno,
      "locality": locality,
      "street": street,
      "landmark": landmark,
      "buildingName":  buildingName,
      "zonalid": WardNo.zonecode,
      "wardid": WardNo.code,
      "wardno": WardNo.wardno,
      "postOffice":  postOffice.code,
      "pincode":  pincode,
      "contactno":  contactno,
      "email":  email,
      "waterbody":  waterbody,
      "serviceArea": serviceArea
    };
    let tradeUnits = {...units};
      
    let structurePlace = formStateDoor;
    let districtid=  DistrictList;
    let localbodytype = LBTypeList;
    let localbody = FilterLocalbody;

    let tradeLicenseDetail ={businessSector,capitalInvestment,structureType,structurePlaceSubtype,businessActivityDesc,noOfEmployees,ownershipCategory,address,tradeUnits,structurePlace,}
 

    onSelect(config.key, {districtid,localbodytype,localbody,commencementDate,tradeLicenseDetail,tradeName,licenseUnitNameLocal,desiredLicensePeriod,});
  };

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      {isLoading ? (<Loader />) : (
        <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!fields[0].businesscategory || !fields[0].businesstype || !fields[0].businesssubtype } >
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_LB_DET_LABEL")}`}</span> </h1>
              </div>
            </div>
            <div className="row">   
              <div className="col-md-7" >
                <div className="row"> 
                  <div className="col-md-4" >
                    <CardLabel>{`${t("TL_DISTRICT")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={DistrictList} select={selectDistrict}  disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`}  {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_DISTRICT"),})} />
                  </div>
                  <div className="col-md-4" >
                    <CardLabel>{`${t("TL_LB_TYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      option={cmbLBType}
                      selected={LBTypeList} 
                      select={selectLBType}
                      placeholder={`${t("LB_TYPE")}`}
                      disabled={isEdit}
                      {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LOCALBODY_TYPE"),})} 
                    />
                  </div>
                  <div className="col-md-4" >
                    <CardLabel>{`${t("TL_LB_NAME_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={true} option={FilterLocalbody} selected={Localbody} select={selectLocalbody} disabled={isEdit} placeholder={`${t("LB_NAME")}`} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LOCALBODY"),})}/>
                  </div>
                </div>
              </div>
              <div className="col-md-5" >
                <div className="row"> 
                  <div className="col-md-6" >
                    <CardLabel>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={Zonal} selected={zonalOffice} select={selectZonal}    {...(validation = { isRequired: true, title: t("TL_INVALID_ZONAL_NAME") })} />
                  </div>
                  <div className="col-md-6" >
                    <CardLabel>{`${t("TL_LOCALIZATION_WARD_NO")}`}</CardLabel>
                    <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={WardNo} select={selectWard}  {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</span> </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel style={{ marginBottom: "30px" }}>
                {`${t("TL_BUSINESS_SECTOR")}`}<span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-8">  
                  <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menusector} selectedOption={businessSector} onSelect={selectBusinessSector}  style={{ display: "flex", justifyContent: "space-between", width: "48%" }} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_SECTOR"),})}  />&nbsp;
              </div>
            </div>
            {fields.map((field, index) => {
              return (
              <div className="row" key={index}>
                <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_SECTOR")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} option={BusinessCategoryMenu} optionKey="i18nKey" isMandatory={config.isMandatory} value={field?.businesscategory} selected={field?.businesscategory}  name={`TradeCategory-${index}`} select={(e) => selectBusinessCategory(index, e)}  placeholder="Bussiness Category" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_CATEGORY"),})}/>
                </div>
                <div className="col-md-4" >
                    <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={getBusinessTypeMenu(field?.businesscategory)} selected={field?.businesstype} select={(e) => selectBusinessType(index, e)}  placeholder="Bussiness Type"  {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_TYPE"),})} />
                </div>
                <div className="col-md-4" >                  
                  <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={sortDropdownNames(getBusinessSubTypeMenu(field?.businesstype), "i18nKey", t)} selected={field?.businesssubtype} select={(e) => selectBusinessSubType(index, e)} placeholder="Bussiness Sub Type" />
                </div>
              </div>
              )}
            )}
            <div className="row">
              <div className="col-md-6">
                <CardLabel>{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}</CardLabel>
                <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="businessActivityDesc" value={businessActivityDesc} onChange={changesetBusinessActivityDesc} placeholder="Custom Specific Description" {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_BUSINESS_ACTIVITY"),})} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_ADD_DET_LIC_ACTIVITY_LABEL")}`}</span> </h1>
              </div>
            </div>
            <div className="row">  
              {/* <div className="col-md-5" > */}
                  {/* <div className="row"> */}
                    <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={false}  optionKey="i18nKey" name="capitalInvestment" value={capitalInvestment} onChange={changesetCapitalInvestment}  placeholder="Capital Investment Range" {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
                    </div>
                    <div className="col-md-3" >
                        <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
                        <DatePicker name="commencementDate" date={commencementDate} onChange={changesetCommencementDate} disabled={isEdit} placeholder="Date of Commencement"  {...(validation = {  isRequired: false, title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL") })} />
                    </div>
                  {/* </div>
              </div>
              <div className="col-md-7" >
                <div className="row"> */}
                  <div className="col-md-3" >                
                    <CardLabel>{`${t("TL_LICENSE_PERIOD")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="desiredLicensePeriod" onChange={changesetDesiredLicensePeriod} placeholder="Desired Period of License"   disable={isEdit} {...(validation = { pattern: "^[0-9]*$", isRequired: false, type: "number", title: t("TL_INVALID_LICENSE_PERIOD") })} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL")}`}</CardLabel>
                    <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="noOfEmployees" value={noOfEmployees} onChange={changesetNoofEmployees}   placeholder="No. of Employees" {...(validation = { pattern: "^[0-9`' ]{4}*$", isRequired: false, type: "text", title: t("TL_INVALID_NO_EMPLOYEES"),})} />
                  </div>
                {/* </div> */}
              {/* </div> */}
            </div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_PLACE_ACTIVITY")}`}</span> </h1>
              </div>
            </div>
            <div className="row">    
              <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="tradeName" value={tradeName} onChange={changesetTradeName}   disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
              </div>
              <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="licenseUnitNameLocal" value={licenseUnitNameLocal} onChange={changesetLicenseUnitNameLocal}  disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME_ML")}`} {...(validation = {  isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
              </div>
              <div className="col-md-3" ><CardLabel>{`${t("TL_CONTACT_NO")}`}</CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="contactno" value={contactno} onChange={changesetContactno} disable={isEdit} placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = { pattern: "^[0-9]*$",type: "text", isRequired: false, title: t("TL_INVALID_MOBILE_NO") })} />
              </div>
              <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardLabel>
                <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="email" value={email} onChange={changesetEmail} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: false, title: t("TL_INVALID_EMAIL_ID") })} />
              </div>
            </div>
            <div className="row">    
              <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_PLACE_ACTVITY")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPlace} selected={structureType} select={selectStructureType} disabled={isEdit} {...(validation = { isRequired: true, title: t("TL_INVALID_EMAIL_ID") })}/>
              </div> 
              <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_NATURE_STRUCTURE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={filteredPlaceSubtype} selected={structurePlaceSubtype} select={SelectStructurePlaceSubtype} disabled={isEdit} {...(validation = { isRequired: true, title: t("TL_INVALID_EMAIL_ID") })}/>
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={ownershipCategoryMenu} selected={ownershipCategory} select={SelectOwnershipCategory}  {...(validation = { isRequired: true, title: t("TL_INVALID_OwnershipCategory") })} />
              </div>
            </div>
            {formStateDoor.map((field, index) => {
              return (
                <div  key={`${field}-${index}`}>
                  {value2 === "LAND" && (
                    <div>
                      <div className="row"><div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_RESURVEY_LAN_DETAILS")}`}</span>   </h1> </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3" >
                          <CardLabel style={{ marginBottom: "30px" }}>{`${t("TL_RESURVEY_LAND")}`}<span className="mandatorycss">*</span>
                          </CardLabel>&nbsp;
                        </div>
                        <div className="col-md-8" >
                          <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={isResurveyed} onSelect={selectIsResurveyed} disabled={isEdit} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} />
                        </div>
                      </div>
                      {value3 === "YES" && (
                        <div> 
                          <div className="row">
                            <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="blockNo" value={field?.blockNo}  onChange={(e) => handleTextInputField1(index, e, "blockNo")} disable={isEdit}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                            </div>
                            <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="surveyNo" value={field?.surveyNo} onChange={(e) => handleTextInputField1(index, e, "surveyNo")}  disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                            </div>
                            <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="subDivisionNo" value={field?.subDivisionNo} onChange={(e) => handleTextInputField1(index, e, "subDivisionNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                            </div>
                            <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_PARTITION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="partitionNo" value={field?.partitionNo} onChange={(e) => handleTextInputField1(index, e, "partitionNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_PARTITION_NO") })} />
                            </div>
                          </div>
                        </div>)}
                        {value3 === "NO" && (
                          <div> 
                            <div className="row">
                              <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey"  name="blockNo" value={field?.blockNo}  onChange={(e) => handleTextInputField1(index, e, "blockNo")}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                              </div>
                              <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey"  name="surveyNo" value={field?.surveyNo} onChange={(e) => handleTextInputField1(index, e, "surveyNo")} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                              </div>
                              <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="subDivisionNo" value={field?.subDivisionNo} onChange={(e) => handleTextInputField1(index, e, "subDivisionNo")} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                              </div>
                            </div>
                          </div>)}
                          <div className="row">
                          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                          </div>
                        </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="locality" value={locality} onChange={changesetLocality}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LOCALITY") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_STREET_NAME")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={street} onChange={changesetStreet} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_LAND_MARK")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LAND_MARK") })} />
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>{`${t("TL_BUILDING_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="buildingName"  value={buildingName} onChange={changesetBuildingName}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BUILDING_NAME") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_PIN")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_PIN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_POSTOFFICE")}`}</CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={postOffice} select={selectsetPostOffice} disabled={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_POSTOFFICE") })}/>
                        </div>
                      </div>
                    </div>
                  )}

                  {value2 === "BUILDING" && (
                    <div style={{
                      border: "solid",
                      borderRadius: "10px",
                      //  padding: "25px",
                      //  paddingTop: "25px",
                      marginTop: "5px",
                      borderColor: "#f3f3f3",
                      background: "#FAFAFA",
                      }} className="col-md-12">

                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_BUILDING_HEADER")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="doorNo"  value={field.doorNo} onChange={(e) => handleTextInputField1(index, e, "doorNo")}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="doorNoSub" value={field.doorNoSub} onChange={(e) => handleTextInputField1(index, e, "doorNoSub")}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        {ownershipCategory.code === "LBBUILDING" && (
                        <div className="col-md-2" ><CardLabel>{`${t("TL_STALL_NO")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="stallNo" value={field.stallNo} onChange={(e) => handleTextInputField1(index, e, "stallNo")} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_STALL_NO") })} />
                        </div>
                        )}
                    
                        <div>
                          {formStateDoor.length === (index + 1) && (
                            <div className="col-md-1">
                              <CardLabel>Add More</CardLabel>
                              <LinkButton
                                label={
                                  <svg class="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
                                    <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                                  </svg>
                                }
                                onClick={(e) => dispatchDoor({ type: "ADD_NEW_DOOR" })}
                              />
                            </div>
                          )}
                          {formStateDoor.length > 1 && (
                            <div className="col-md-1">
                              <CardLabel>Remove</CardLabel>
                              <LinkButton
                                label={
                                  <svg viewBox="0 0 24 24" fill="red" width="50" height="50"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" /> </g> </svg>
                                }
                                onClick={(e) => dispatchDoor({ type: "REMOVE_THIS_DOOR", payload: { index } })}
                              />
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  )}
                  {value2 === "VEHICLE" && (
                    <div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VECHICLE_HEADER")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-7" ><CardLabel>{`${t("TL_VECHICLE_NO")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="vehicleNo"  value={field?.vehicleNo} onChange={(e) => handleTextInputField1(index, e, "vehicleNo")}   disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VECHICLE_NO") })} /> 
                        </div>    
                      </div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_LOCATION_ADDRESS")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-6" ><CardLabel>{`${t("TL_SERVICE_AREA")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="serviceArea"  value={serviceArea} onChange={changesetServiceArea} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_SERVICE_AREA") })} />
                        </div>
                        <div className="col-md-6" ><CardLabel>{`${t("TL_DESIGNATED_PLACE")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Street" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                        </div>
                      </div>
                    </div>
                  
                  )}
                  {value2 === "WATER" && (
                    <div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VESSEL_HEADER")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-7" ><CardLabel>{`${t("TL_VESSEL_NO")}*`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="vesselNo" value={field?.vesselNo} onChange={(e) => handleTextInputField1(index, e, "vesselNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VESSEL_NO") })} /> </div>    </div>
                          <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}></span>{`${t("TL_LOCATION_ADDRESS")}`} </h1>
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>{`${t("TL_WATER_BODY")}*`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="waterbody" value={waterbody} onChange={changesetWaterbody} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_WATER_BODY") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_SERVICE_AREA")}*`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ServiceArea" value={serviceArea} onChange={changesetServiceArea} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SERVICE_AREA") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_DESIGNATED_PLACE")}*`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DesignatedPublicPlace" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                        </div>
                      </div>
                    </div>
                  )}
                  {value2 === "DESIGNATEDPLACE" && (
                    <div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Details")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row">
                      {/* {`${t("Details Specify")}`} */}
                        <div className="col-md-7" ><CardLabel>{`${t("TL_DESIGNATED_PLACE")}*`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DesignatedPublicPlace" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            )}
            {value2 === "BUILDING" && (
              <div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}></span>{`${t("TL_LOCATION_ADDRESS")}`} </h1>
                  </div>
                </div>
                <div className="row"> 
                  <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="locality" value={locality} onChange={changesetLocality}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_LOCALITY") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_STREET_NAME")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={street} onChange={changesetStreet} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_LAND_MARK")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"  name="landmark" value={landmark} onChange={changesetLandmark}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LAND_MARK") })} />
                  </div>
                </div>
                <div className="row"> 
                  <div className="col-md-4" ><CardLabel>{`${t("TL_BUILDING_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="buildingName"  value={buildingName} onChange={changesetBuildingName}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_BUILDING_NAME") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_PIN")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_PIN") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_POSTOFFICE")}`}</CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={postOffice} select={selectsetPostOffice} disabled={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_POSTOFFICE") })} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </FormStep>
      )}
    </React.Fragment>
  );
};
export default TLLicenseUnitDet;