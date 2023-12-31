package org.ksmart.birth.marriageapplication.repository.querybuilder;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BaseBirthQuery {
    void addDateRangeFilter(String column, Long startDate, Long endDate, StringBuilder query,
                            List<Object> paramValues) {

        if (startDate != null || endDate != null) {
            addWhereClause(paramValues, query);
            query.append(" (");

            if (startDate != null) {
                query.append(column)
                        .append(" >= ? ");
                paramValues.add(startDate);
            }

            if (endDate != null) {
                if (startDate != null) {
                    query.append(" AND ");
                }

                query.append(column)
                        .append(" <= ? ");
                paramValues.add(endDate);
            }

            query.append(") ");
        }
    }

    void addFilters(String column, List<String> ids, StringBuilder query, List<Object> paramValues) {
        if (CollectionUtils.isNotEmpty(ids)) {
            addWhereClause(paramValues, query);
            query.append(column)
                    .append(" IN (")
                    .append(getStatementParameters(ids.size()))
                    .append(") ");
            ids.forEach(paramValues::add);
        }
    }

    void addFilter(String column, String value, StringBuilder query, List<Object> paramValues) {
        if (StringUtils.isNotBlank(value)) {
            addWhereClause(paramValues, query);
            query.append(column)
                    .append("=? ");
            paramValues.add(value);
        }
    }

    void addWhereClause(List<Object> values, StringBuilder query) {
        if (CollectionUtils.isEmpty(values)) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }

    private String getStatementParameters(int count) {
        return Collections.nCopies(count, "(?)")
                .stream()
                .collect(Collectors.joining(", "));
    }
}
