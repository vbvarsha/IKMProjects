package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.ServiceDetailsQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.ServiceDetailsRowMapper;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ServiceDetailsRepository {

    private final JdbcTemplate jdbcTemplate;
    private final ServiceDetailsQueryBuilder queryBuilder;
    private final ServiceDetailsRowMapper rowMapper;

    // @Autowired
    ServiceDetailsRepository(JdbcTemplate jdbcTemplate, ServiceDetailsQueryBuilder queryBuilder,
                             ServiceDetailsRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<ApplicantServiceDetail> getApplicantServices(ApplicantServiceSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getServiceDetailsSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);

        List<ApplicantServiceDetail> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);

        return result; // NOPMD
    }

}
