package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.ksmart.marriage.common.model.AuditDetails;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
interface BaseRowMapper {

    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                .createdBy(rs.getString("createdby"))
                .createdTime(Long.valueOf(rs.getLong("createdtime")))
                .lastModifiedBy(rs.getString("lastmodifiedby"))
                .lastModifiedTime(Long.valueOf(rs.getLong("lastmodifiedtime")))
                .build();
    }

}