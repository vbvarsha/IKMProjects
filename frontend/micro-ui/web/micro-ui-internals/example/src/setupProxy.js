const { createProxyMiddleware } = require("http-proxy-middleware");

const createProxy = createProxyMiddleware({
  //target: process.env.REACT_APP_PROXY_API || "https://uat.digit.org",
  // target: process.env.REACT_APP_PROXY_API || "https://qa.digit.org",
  target: process.env.REACT_APP_PROXY_API || "https://qa.digit.org",
  changeOrigin: true,
});
const assetsProxy = createProxyMiddleware({
  target: process.env.REACT_APP_PROXY_ASSETS || "https://qa.digit.org",
  changeOrigin: true,
});
module.exports = function (app) {
  [
    "/birth-services/cr/updatebirthcorrection",
    "/birth-services/cr/searchbirthcorrection",
    "/marriage-services/v1/marriagedetails/_searchmarriagecorrection",
    "/death-services/v1/deathregistry/_searchdeath",
    "/birth-services/cr/registry/_search",
    "/marriage-services/v1/marriagedetails/_searchmarriage",
    "/egov-mdms-service",
    "/egov-location",
    "/localization",
    "/egov-workflow-v2",
    "/pgr-services",
    "/filestore",
    "/egov-hrms",
    "/user-otp",
    "/user",
    "/fsm",
    "/billing-service",
    "/collection-services",
    "/pdf-service",
    "/pg-service",
    "/vehicle",
    "/vendor",
    "/property-services",
    "/fsm-calculator/v1/billingSlab/_search",
    "/pt-calculator-v2",
    "/dashboard-analytics",
    "/echallan-services",
    "/egov-searcher/bill-genie/mcollectbills/_get",
    "/egov-searcher/bill-genie/billswithaddranduser/_get",
    "/egov-pdf/download/UC/mcollect-challan",
    "/egov-hrms/employees/_count",
    "/tl-services/v1/_create",
    "/tl-services/v1/_search",
    "/birth-services/cr/createbirth",
    "/birth-services/cr/searchbirth",
    "/birth-services/cr/createstillbirth",
    "/birth-services/cr/searchstillbirth",
    "/marriage-services/v1/marriagedetails/_createmarriage",
    "/marriage-services/v1/marriagedetails/_searchmarriage",
    "/marriage-services/v1/marriagedetails/_createmarriagecorrection",
    "/marriage-services/v1/marriagedetails/_updatemarriage",
    "/birth-services/cr/createnac",
    "/birth-services/cr/searchnac",
    "/death-services/v1/deathdetails/_createdeathabandoned",
    "/death-services/v1/deathdetails/_searchdeathabandoned",
    "/marriage-services/v1/marriagedetails/_searchregistry",
    "/marriage-services/v1/marriagedetails/_certificate",
    "/death-services/v1/crdeathdetails/_create",
    "/death-services/v1/crdeathdetails/_search",
    "/filemgmnt/v1/applicantpersonals/_create",
    "/filemgmnt/v1/applicantpersonals/_update",
    "/egov-workflow-v2/egov-wf/process/_transition",
    "/egov-url-shortening/shortener",
    "/inbox/v1/_search",
    "/tl-services",
    "/birth-services",
    "/death-services",
    "/filemgmnt",
    "/tl-calculator",
    "/edcr",
    "/bpa-services",
    "/noc-services",
    "/egov-user-event",
    "/egov-document-uploader",
    "/egov-pdf",
    "/egov-survey-services",
    "/ws-services",
    "/sw-services",
  ].forEach((location) => app.use(location, createProxy));
  ["/pb-egov-assets"].forEach((location) => app.use(location, assetsProxy));
};
