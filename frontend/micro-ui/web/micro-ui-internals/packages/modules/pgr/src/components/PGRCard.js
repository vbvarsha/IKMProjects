import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";


const PGRCard = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const inboxSearchParams = { limit: 10, offset: 0 }
  const allLinks = [
    { text: t("ES_PGR_INBOX"), link: "/digit-ui/employee/pgr/inbox" },
    { text: t("ES_PGR_NEW_COMPLAINT"), link: "/digit-ui/employee/pgr/complaint/create", accessTo: ["CSR"] },
  ];
  const { isLoading, data: inboxData } = Digit.Hooks.pgr.useInboxData({
    tenantId,
    filters: { ...inboxSearchParams },
    config: {}
});
  if (!Digit.Utils.pgrAccess()) {
    return null;
  }

  const Icon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white"></path>
  </svg>

  let propsForCSR =[
    {
      label: t("ES_PGR_NEW_COMPLAINT"),
      link: `/digit-ui/employee/pgr/complaint/create`,
      role: "CSR"
    },
    {
      label: t("ES_PGR_NEW_COMPLAINT"),
      link: `/digit-ui/employee/pgr/complaint/create`,
      role: "PGR_ACS"
    },
    {
      label: t("ES_PGR_NEW_COMPLAINT"),
      link: `/digit-ui/employee/pgr/complaint/create`,
      role: "PGR_MO"
    },
    {
      label: t("ES_PGR_NEW_COMPLAINT"),
      link: `/digit-ui/employee/pgr/complaint/create`,
      role: "PGR_PD"
    },
    {
      label: t("ES_PGR_NEW_COMPLAINT"),
      link: `/digit-ui/employee/pgr/complaint/create`,
      role: "PGR_JD"
    },
    {
      label: t("ES_PGR_NEW_COMPLAINT"),
      link: `/digit-ui/employee/pgr/complaint/create`,
      role: "PGR_CEMP"
    }
  ]

  propsForCSR = propsForCSR.filter(link => link.role && Digit.Utils.didEmployeeHasRole(link.role) );

  const propsForModuleCard = {
    Icon: <Icon />,
    moduleName: t("ES_PGR_HEADER_COMPLAINT"),
    kpis: [
        {
          count: isLoading ? "-" : inboxData?.length,
            label: t("TOTAL_PGR"),
            link: `/digit-ui/employee/pgr/inbox`
        },
        {
            label: t("TOTAL_NEARING_SLA"),
            link: `/digit-ui/employee/pgr/inbox`
        }
    ],
    links: [
    {
        label: t("ES_PGR_INBOX"),
        link: `/digit-ui/employee/pgr/inbox`
    },
    ...propsForCSR
    ]
}

  return <EmployeeModuleCard {...propsForModuleCard} />
};
export default PGRCard;
