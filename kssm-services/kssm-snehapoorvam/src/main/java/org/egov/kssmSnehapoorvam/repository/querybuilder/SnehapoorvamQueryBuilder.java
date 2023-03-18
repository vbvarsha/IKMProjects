package org.egov.kssmSnehapoorvam.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmSnehapoorvam.web.models.SchoolSearchCriteria;
import org.springframework.stereotype.Component;



@Component
public class SnehapoorvamQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder()
            .append(" select school_name,institution_type_name,revenue_district_name,pincode")
            .append(" ,school_address FROM school_master_login  ")
            .toString();

    public String getSchoolDatailSearchQuery(@NotNull SchoolSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("school_code", criteria.getSchool_code(), query, preparedStmtValues);

        return query.toString();
    }

}
