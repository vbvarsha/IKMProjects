import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRService = {
  correctBirth: (details, tenantId) =>
    Request({
      url: Urls.cr.correct_update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  create: (details, tenantId) =>
    Request({
      url: Urls.cr.create,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
    createAdoption: (details, tenantId) =>
    Request({
      url: Urls.cr.create_adoption,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
    updateAdoption: (details, tenantId) =>
    Request({
      url: Urls.cr.adoption_update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  search: (details) =>
    Request({
      url: Urls.cr.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  CRRegistrySearchBirth: ({ filters }) =>
    Request({
      url: Urls.cr.registry_search_birth,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    }),
  CRRegistrySearchAdoption: ({ filters }) =>
    Request({
      url: Urls.cr.registry_search_Adoption,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    }),
  CRResistryDownloadBirth: (id, source) =>
    Request({
      url: Urls.cr.registry_download,
      data: {},
      useCache: false,
      method: "POST",
      params: { id, source },
      auth: true,
      locale: true,
      userInfo: true,
      userDownloadInfo: true,
    }),
  CRsearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.cr.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  CRAdoptionSearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.cr.adoption_search, 
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.cr.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
