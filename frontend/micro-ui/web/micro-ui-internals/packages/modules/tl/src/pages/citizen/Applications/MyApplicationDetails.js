import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

const MyApplicationDetails = ({path}) => {
    const { variant } = useParams();
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCitizenCurrentTenant();
    const [payload, setPayload] = useState({})

    const Search = Digit.ComponentRegistryService.getComponent("SearchCitizenApplication")

    function onSubmit (_data) {
        let applicationType = "";
        if((_data?.applicationType === undefined) && (_data?.applicationNumber !== "")){
            let _key = _data.applicationNumber.split("-")[4];
            _key === "BFIFLC" ? applicationType = "CORRECTION" : applicationType = "" ;
        }

        var fromDate = new Date(_data?.fromDate)
        fromDate?.setSeconds(fromDate?.getSeconds() - 19800 )
        var toDate = new Date(_data?.toDate)
        toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800)
        const data = {
            ..._data,
            ...(_data.toDate ? {toDate: toDate?.getTime()} : {}),
            ...(_data.fromDate ? {fromDate: fromDate?.getTime()} : {}),
            ...(applicationType !== "" ? {applicationType: applicationType} : {})
        }

        setPayload(Object.keys(data).filter( k => data[k] ).reduce( (acc, key) => ({...acc,  [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {} ))
    }

    const config = {
        enabled: !!( payload && Object.keys(payload).length > 0 )
    }
    const {data: {Licenses: searchReult, Count: count} = {}, isLoading , isSuccess } = Digit.Hooks.tl.useSearch({tenantId, filters: payload, config})
    let correction = [];
    let newAppln = [];
    let renewalAppln = [];
    let sortedData = [];

    searchReult ? searchReult.filter((data) => data?.applicationType === "NEW" &&  data?.correctionAppNumber === null && payload?.applicationType === "NEW" ? sortedData.push(data) : "" ) : "";
    searchReult ? searchReult.filter((data) => data?.applicationType === "RENEWAL" &&  data?.correctionAppNumber === null && payload?.applicationType === "RENEWAL"  ? sortedData.push(data)  : "") : "";
    searchReult ? searchReult.filter((data) => data?.correctionAppNumber !== null && payload?.applicationType === "CORRECTION" ? sortedData.push(data) : "") : "";

    // searchReult ? searchReult.filter((data) => !data?.applicationType ? sortedData.push(data) : "" ) : "";
    sortedData = sortedData?.length > 0 ? sortedData : searchReult;
    
    return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} data={ !isLoading && isSuccess ? (sortedData?.length>0? sortedData : { display: "ES_COMMON_NO_DATA" }) : "" } count={count} /> 

}

export default MyApplicationDetails