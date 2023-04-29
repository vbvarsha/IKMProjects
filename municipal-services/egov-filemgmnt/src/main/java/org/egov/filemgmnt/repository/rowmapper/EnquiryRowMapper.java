package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.enquiry.Enquiry;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EnquiryRowMapper implements ResultSetExtractor<List<Enquiry>>, BaseRowMapper {

    @Override
    public List<Enquiry> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        final List<Enquiry> result = new ArrayList<>();

        while (rs.next()) {
            result.add(Enquiry.builder()
                              .moduleName(rs.getString("modulename"))
                              .fileCode(rs.getString("fileCode"))
                              .assigner(rs.getString("assigner"))
                              .status(rs.getString("status"))
                              .latitude(rs.getString("latitude"))
                              .longitude(rs.getString("longitude"))
                              .longitude(rs.getString("imagefilestoreid"))
                              .build());
        }
        return result;
    }

}
