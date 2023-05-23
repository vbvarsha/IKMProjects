import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../../components/DesktopInbox";
import MobileInbox from "../../../components/MobileInbox";

const BirthInbox = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { uuid } = Digit.UserService.getUser().info;
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({ filters: { }, search: {uuid:[uuid]}, sort: {} });


  useEffect(() => {
    (async () => {
      // console.log(searchParams);
      // const applicationStatus = searchParams?.filters?.pgrfilters?.applicationStatus?.map(e => e.code).join(",")
      // let response = await Digit.PGRService.count(tenantId, applicationStatus?.length > 0  ? {applicationStatus} : {} );
      // if (response?.count) {
      //   setTotalRecords(response.count);
      // }

    })();
  }, [searchParams]);


  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + 10);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - 10);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handleFilterChange = (filterParam) => {
    console.log("filter params==",filterParam);
    setSearchParams({ ...searchParams, filters: filterParam });
  };

  const onSearch = (params = "") => {
    setSearchParams({ ...searchParams, search: params });
    refetch();
  };

  let complaints = []
  let isMobile = Digit.Utils.browser.isMobile();
  // console.log("233", searchParams)

  // const { data: { ChildDetails: searchResult = [], Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearch({ tenantId, filters: { ...searchParams?.search, ...searchParams?.filters, offset: pageOffset, limit: pageSize, sortBy: 'dateOfBirth', sortOrder: 'DESC' } })
  let { data, isLoading, isSuccess,refetch } = Digit.Hooks.cr.useInbox({ tenantId,filters:{ ...searchParams?.search, ...searchParams?.filters, offset: pageOffset, limit: pageSize} });
  // let birthData = searchParams?.search ? searchResult : searchParams?.filters?.assignee ? searchResult : []
  // useEffect(()=>{
  //   console.log("complaintsz", complaintsz)
  // },[complaintsz]); 
  // const searchResult = data;

  useEffect(()=>{
    setSearchResults(data?.table);
  console.log("searchResult==",data?.table);
  },[data])
 

  let Loading = isLoading;

  if (complaints?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox data={searchResults} isLoading={Loading} onFilterChange={handleFilterChange} onSearch={onSearch} searchParams={searchParams} />
      );
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <DesktopInbox
            data={searchResults}
            // data={searchResult}
            isLoading={Loading}
            onFilterChange={handleFilterChange}
            onSearch={onSearch}
            searchParams={searchParams}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            onPageSizeChange={handlePageSizeChange}
            currentPage={Math.floor(pageOffset / pageSize)}
            totalRecords={totalRecords}
            pageSizeLimit={pageSize}
          />
        </div>
      );
    }
  } else {
    return <Loader />;
  }
};

export default BirthInbox;
