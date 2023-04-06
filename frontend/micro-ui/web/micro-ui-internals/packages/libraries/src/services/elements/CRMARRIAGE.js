import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRMarriageService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.crmarriage.create,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  search: ({ filters }) =>
    Request({
      url: Urls.crmarriage.search,
      useCache: false,
      userService: false,
      method: "POST",
      params: { ...filters },
      auth: true,
    }),
    CRRegistrySearchMarriage: ({ filters }) =>
    Request({
      url: Urls.crmarriage.registry_search_marriage,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.crmarriage.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
