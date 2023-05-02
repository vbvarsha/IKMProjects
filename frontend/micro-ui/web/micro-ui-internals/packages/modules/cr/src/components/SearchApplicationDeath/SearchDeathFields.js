import React, {Fragment} from "react"
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
   display:"block"
  };


const SearchDeathFields = ({register, control, reset, tenantId, t, previousPage ,applicationDeathType}) => {
    // const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.cr.useMDMS.applicationTypes(tenantId)

    // const applicationType = useWatch({ control, name: "applicationType" });

    let businessServices=[];
    // if(applicationType && applicationType?.code==="RENEWAL")
    // businessServices=["EDITRENEWAL","DIRECTRENEWAL"]
    // else if(applicationType && applicationType?.code==="NEW")
    // businessServices=["NewTL"]
    // else
    // businessServices=["EDITRENEWAL","DIRECTRENEWAL","NewTL"]
    businessServices=["DEATHHOSP",]

    // const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({  tenantId }, {});
    let applicationStatuses = []

    // statusData && statusData?.otherRoleStates?.map((status) => {
    //     let found = applicationStatuses.length>0? applicationStatuses?.some(el => el?.code === status.applicationStatus) : false;  
    //     if(!found) applicationStatuses.push({code:status?.applicationStatus, i18nKey:`WF_NEWTL_${(status?.applicationStatus)}`})
    // })

    // statusData && statusData?.userRoleStates?.map((status) => {
    //     let found = applicationStatuses.length>0? applicationStatuses?.some(el => el?.code === status.applicationStatus) : false;  
    //     if(!found) applicationStatuses.push({code:status?.applicationStatus, i18nKey:`WF_NEWTL_${(status?.applicationStatus)}`})
    // })

    return <>
    {applicationDeathType?.value && (
        <>
        <SearchField>
            <label>{t("CR_SEARCH_ACK_NO")}</label>
            <TextInput name="DeathACKNo" inputRef={register({})} />
        </SearchField>
        {/* {applicationTypesLoading ? <Loader/> : <SearchField>
            <label>{t("CR_SEARCH_APPLICATION_TYPE")}</label>
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
            <label  style={mystyle}>{t("CR_FROM_DATE")}</label>
            <Controller
           
                render={(props) => <DatePicker  date={props.value} onChange={props.onChange} />}
                name="fromDate"
                control={control}
                />
        </SearchField>
        <SearchField>
            <label style={mystyle}>{t("CR_TO_DATE")}</label>
            <Controller
                render={(props) => <DatePicker   date={props.value} onChange={props.onChange} />}
                name="toDate"
                control={control}
                />
        </SearchField>
        {/* <SearchField>
            <label>{t("TL_TRADE_LICENSE_LABEL")}</label>
            <TextInput  name="licenseNumbers" inputRef={register({})}/>
        </SearchField> */}
        {/* { isLoading ? <Loader/> : <SearchField>
            <label>{t("CR_SEARCH_RESULTS_APP_STATUS_LABEL")}</label>
            <Controller
                    control={control}
                    name="status"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={applicationStatuses}
                        optionKey="i18nKey"
                        t={t}
                        />
                    )}
            />
        </SearchField>} */}
        <SearchField>
            <label>{t("CR_SEARCH_DECEASED_NAME")}</label>
            <TextInput  name="DeceasedFirstNameEn" inputRef={register({})}/>
        </SearchField>
        <SearchField className="submit">
            <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
            <p onClick={() => {
                reset({ 
                    DeathACKNo:"",
                    // applicationType: "", 
                    DateOfDeath: "", 
                    DateOfDeath1: "",
                    status: "",
                    DeceasedFirstNameEn: "",
                    offset: 0,
                    limit: 10,
                    sortBy: "dateofreport",
                    sortOrder: "DESC"
                });
                previousPage();
            }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
        </SearchField>
        </>
        )}
    </>
}
export default SearchDeathFields