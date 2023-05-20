import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BackButton,
  PrivateRoute,
  BreadCrumb,
  CommonDashboard,
  FormInputGroup,
  SubmitBar,
  CardLabel,
  CardLabelError,
  Dropdown,
  CheckBox,
  LinkButton,
  SearchAction,
  TextInput,
  UploadFile,
  SearchIconSvg,
  TextArea,
  CustomButton,
  CardTextButton,
  ActionBar,
  PopUp,
  Table,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";
import viewToPlainText from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";

const ServiceAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [draftText, setDraftText] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const locale = Digit.SessionStorage.get("locale");
  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
  const mutation = Digit.Hooks.dfm.useServiceAdding(tenantId);
  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  const [majorFunction, setmajorFunction] = useState("");
  const [subFunction, setsubFunction] = useState("");
  const [serviceCode, setserviceCode] = useState("");
  const [serviceNameEn, setserviceNameEn] = useState("");
  const [serviceNameMl, setserviceNameMl] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const Value = data?.ModuleDetails?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));
  const { data: searchData } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  const majorData = searchData?.MajorFunctionDetails?.map((item) => ({
    label: item.id,
    value: item.majorFunctionNameEnglish,
  }));
  const { data: searchsubfunct } = Digit.Hooks.dfm.useSearchsubModule({ tenantId, majorFunctionId: majorFunction.label });
  console.log("majorFunction", majorFunction.label);
  console.log(searchsubfunct);
  const subData = searchsubfunct?.SubFunctionDetails?.map((item) => ({
    label: item.id,
    value: item.subFunctionNameEnglish,
  }));
  console.log("subData", subFunction.label);

  const setsetserviceCode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setserviceCode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };

  const setsetserviceNameEn = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setserviceNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetserviceNameMl = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setserviceNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleClosePopup = () => {
    setIsChecked(false);
  };
  function setsetmoduleNameEnglish(value) {
    setmoduleNameEnglish(value);
  }
  function selectMajorFunction(value) {
    setmajorFunction(value);
  }
  function selectsubFunction(value) {
    setsubFunction(value);
  }
  const columns = useMemo(
    () => [
      {
        Header: t("SL_NO"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(row.original.fileNumber || ""),
      },

      {
        Header: t("MODULE_CODE"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.function) || ""),
      },
      {
        Header: t("MF_CODE"),
        Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
        disableSortBy: true,
      },

      {
        Header: t("SF_CODE"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.function) || ""),
      },
      {
        Header: t("SERVICE_CODE"),
        Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
        disableSortBy: true,
      },

      {
        Header: t("SERVICE_NAME_ENG"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.function) || ""),
      },
      {
        Header: t("SERVICE_NAME_MAL"),
        Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
        disableSortBy: true,
      },
      {
        Header: t("ATTACHMENTS"),
        Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
        disableSortBy: true,
      },
      {
        Header: t("FEES"),
        Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
        disableSortBy: true,
      },
      {
        Header: t("-"),
        Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
        disableSortBy: true,
      },
    ],
    []
  );
  const saveService = () => {
    const formData = {
      ServiceDetails: {
        id: null,
        tenantId: tenantId,
        serviceCode: serviceCode,
        subFunctionId: subFunction.label,
        serviceNameEnglish: serviceNameEn,
        serviceNameMalayalam: serviceNameMl,
        status: null,
      },
    };
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (mutation.isSuccess == true) {
      history.push("/digit-ui/employee/dfm/note-drafting");
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper service-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown t={t} optionKey="value" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} />
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="value"
                  option={majorData}
                  selected={majorFunction}
                  select={selectMajorFunction}
                  placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SUB_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="value"
                  option={subData}
                  selected={subFunction}
                  select={selectsubFunction}
                  placeholder={t("SUB_FUNCTION_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SERVICE_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  onChange={setsetserviceCode}
                  value={serviceCode}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SERVICE_CODE")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SERVICE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  onChange={setsetserviceNameEn}
                  value={serviceNameEn}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SERVICE_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SERVICE_NAME_MAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  onChange={setsetserviceNameMl}
                  value={serviceNameMl}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SERVICE_NAME_MAL")}
                />
              </div>
              <div className="col-md-3  col-sm-32  col-xs-12">
                <CardLabel className="card-label-file">{`${t("MANDATORY_ATTACHMENTS")}`}</CardLabel>
                <CheckBox t={t} optionKey="name" checked={isChecked} onChange={handleCheckboxChange} />
              </div>
              <div>
                {isChecked && (
                  <PopUp>
                    <div className="popup-module" style={{ borderRadius: "8px" }}>
                      <h1>hii am popup</h1>
                      <button className="close-btn" onClick={handleClosePopup}>
                        Close
                      </button>
                    </div>
                  </PopUp>
                )}
              </div>
              <div className="col-md-3 col-sm-4  col-xs-12 ">
                <CardLabel className="card-label-file">{`${t("FEES")}`}</CardLabel>
                <CheckBox t={t} optionKey="name" />
              </div>
            </div>
          </div>

          <div className="btn-flex">
            <button
              className="btn-row"
              // onClick={handleClick}
            >
              Update
            </button>

            <SubmitBar onSubmit={saveService} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")}  className="btn-row" />
          </div>
        </div>
      </div>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper customSubFunctionTable">
          <Table className="customTable table-fixed-first-column table-border-style" t={t} data={[]} columns={columns} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServiceAdding;
