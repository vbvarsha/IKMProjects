import React, { Fragment } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
  display: "block",
};

const   SearchFields = ({ register, control, reset, tenantId, t, applicationType: marriageApplicationType }) => {
  const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.tl.useMDMS.applicationTypes(tenantId);

  const applicationType = useWatch({ control, name: "applicationType" });

  let businessServices = [];
  if (applicationType && applicationType?.code === "RENEWAL") businessServices = ["EDITRENEWAL", "DIRECTRENEWAL"];
  else if (applicationType && applicationType?.code === "NEW") businessServices = ["NewTL"];
  else businessServices = ["EDITRENEWAL", "DIRECTRENEWAL", "NewTL"];

  const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({ businessServices, tenantId }, {});
  let applicationStatuses = [];

  statusData &&
    statusData?.otherRoleStates?.map((status) => {
      let found = applicationStatuses.length > 0 ? applicationStatuses?.some((el) => el?.code === status.applicationStatus) : false;
      if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${status?.applicationStatus}` });
    });

  statusData &&
    statusData?.userRoleStates?.map((status) => {
      let found = applicationStatuses.length > 0 ? applicationStatuses?.some((el) => el?.code === status.applicationStatus) : false;
      if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${status?.applicationStatus}` });
    });

  return (
    <>
    {marriageApplicationType?.value &&(
    <>
      <SearchField>
        <label>
          {t("CR_SEARCH_APP_NO_LABEL")}
          <span className="mandatorycss">*</span>
        </label>
        <TextInput name="applicationNo" inputRef={register({})} />
      </SearchField>
      {/* {applicationTypesLoading ? <Loader/> : <SearchField>
            <label>{t("TL_LOCALIZATION_APPLICATION_TYPE")}</label>
            <Controller
           
                    control={control}
                    name="applicationType"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={applicationTypes}
                        optionKey="i18nKey"
                        t={t}
                        />
                    )}
                    />
        </SearchField>} */}
      <SearchField>
        <label style={mystyle}>{t("CR_FROM_DATE")}</label>
        <Controller render={(props) => <DatePicker date={props.value} onChange={props.onChange} />} name="fromDate" control={control} />
      </SearchField>
      <SearchField>
        <label style={mystyle}>{t("CR_TO_DATE")}</label>
        <Controller render={(props) => <DatePicker date={props.value} onChange={props.onChange} />} name="toDate" control={control} />
      </SearchField>
      {/* <SearchField>
            <label>{t("CR_BIRTH_MOTHERNAME_LABEL")}</label>
            <TextInput  name="tradeName" inputRef={register({})}/>
        </SearchField> */}
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            reset({
              searchAppllication: [],
              applicationNo: "",
              fromDate: "",
              toDate: "",
              licenseNumbers: "",
              status: "",
              tradeName: "",
              offset: 0,
              limit: 10,
              // sortBy: "applicationNo",
              sortOrder: "DESC",
            });
            previousPage();
          }}
        >
          {t(`ES_COMMON_CLEAR_ALL`)}
        </p>
      </SearchField>
    </>
    )}
    </>
  );
};
export default SearchFields;
