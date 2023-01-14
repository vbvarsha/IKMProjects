import React, { useCallback, useMemo, useEffect } from "react"
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from  "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";

const mystyle = {
  bgOpacity:"1",
  backgroundColor:"#fff",
  backgroundColor:"rgba(255, 255, 255, var(--bg-opacity))",
  marginBottom:"24px",
  padding:"1.5rem",
  borderRadius:"1.6rem"
 };
 const hstyle ={
  fontSize:"20px",
  fontWeight:"500",
  color:"#2B2F3E",
  marginBottom:".5rem",
  lineHieght:"1.5rem"
 };

const SearchPdeApplication = ({tenantId, t, onSubmit, data, count }) => {
    const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
        defaultValues: {
            offset: 0,
            limit: 10,
            sortBy: "wardNo",
            sortOrder: "DESC"
        }
    })

    useEffect(() => {
      register("offset", 0)
      register("limit", 10)
      register("sortBy", "wardNo")
      register("sortOrder", "DESC")
    },[register])

    const onSort = useCallback((args) => {
      if (args.length === 0) return
      setValue("sortBy", args.id)
      setValue("sortOrder", args.desc ? "DESC" : "ASC")
    }, [])

    function onPageSizeChange(e){
        setValue("limit",Number(e.target.value))
        handleSubmit(onSubmit)()
    }

    function nextPage () {
        setValue("offset", getValues("offset") + getValues("limit"))
        handleSubmit(onSubmit)()
    }
    function previousPage () {
        setValue("offset", getValues("offset") - getValues("limit") )
        handleSubmit(onSubmit)()
    }

    const isMobile = window.Digit.Utils.browser.isMobile();

    if (isMobile) {
      return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }}/>
    }
    const handleLinkClick = (finaldata) => {
      Digit.SessionStorage.set("PDE_CREATE_TRADE", finaldata);
    }

    //need to get from workflow
    const GetCell = (value) => <span className="cell-text">{value}</span>;
    const columns = useMemo( () => ([
        {
          Header: t("TL_COMMON_TABLE_COL_APP_NO"),
          accessor: "applicationNo",
          disableSortBy: true,
          Cell: ({ row }) => {
            return (
              <div>
                <span className="link">
                  <Link onClick={event => handleLinkClick(row.original)} to={{pathname:`/digit-ui/employee/tl/pde-editapplication`}}>
                    {row.original["applicationNumber"]}
                  </Link>
                </span>
              </div>
            );
          },
        },
        {
            Header: t("TL_COMMON_TABLE_COL_TRD_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.tradeName),
        },
        {
            Header: t("TL_LOCALIZATION_TRADE_OWNER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.ownersPde),
        },
        {
          Header: t("TL_LOCALIZATION_SECTOR"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.tradeLicenseDetail.businessSector),
        },
        {
          Header: t("TL_HOME_SEARCH_RESULTS_APP_STATUS_LABEL"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.status),
        },
        

      ]), [] )

    return <React.Fragment>
                
                <div style={mystyle}>
                <h1 style={hstyle}>{t("TL_SEARCH_APPLICATIONS")}</h1>
                  <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                  <SearchFields {...{register, control, reset, tenantId, t}} />

                  

                </SearchForm>

                </div>
                  
            {data?.display ? <Card style={{ marginTop: 20 }}>
                {
                t(data.display)
                    .split("\\n")
                    .map((text, index) => (
                    <p key={index} style={{ textAlign: "center" }}>
                        {text}
                    </p>
                    ))
                }
            </Card>
            : data !== "" && <Table
                t={t}
                data={data}
                totalRecords={count}
                columns={columns}
                getCellProps={(cellInfo) => {
                return {
                    style: {
                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
                    padding: "20px 18px",
                    fontSize: "16px"
                  },
                };
                }}
                onPageSizeChange={onPageSizeChange}
                currentPage={getValues("offset")/getValues("limit")}
                onNextPage={nextPage}
                onPrevPage={previousPage}
                pageSizeLimit={getValues("limit")}
                onSort={onSort}
                disableSort={false}
                sortParams={[{id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false}]}
            />}
        </React.Fragment>
}

export default SearchPdeApplication