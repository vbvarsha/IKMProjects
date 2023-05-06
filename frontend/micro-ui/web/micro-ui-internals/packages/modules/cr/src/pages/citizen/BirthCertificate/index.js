import React, { useState } from "react";
import { BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import BirthCertificate from "../../../components/SearchRegistryBirth";
import _ from "lodash";
import { convertDateToEpoch } from "../../../utils";

const BirthCertificateSearch = ({ path }) => {
  const { t } = useTranslation();
  const [payload, setPayload] = useState({});

  function onSubmit(_data) {
    const data = {
      ..._data
    };
    if (!_.isEmpty(_data.birthDate)) {
      _.set(data, "dobFrom", convertDateToEpoch(_data.birthDate, "start"));
      _.set(data, "dobTo", convertDateToEpoch(_data.birthDate));
      delete data.birthDate;
    }
    setPayload(
      Object.keys(data)
        .filter((k) => data[k])
        .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {})
    );
  }

  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0)
  };

  const { data: { RegisterBirthDetails: searchReult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistrySearchBirth({
    filters: payload,
    config,
  });

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <BirthCertificate
        t={t}
        onSubmit={onSubmit}
        data={searchReult || []}
        isSuccess={isSuccess}
        isLoading={isLoading}
        count={count}
      />
    </React.Fragment>
  );
};

export default BirthCertificateSearch;
