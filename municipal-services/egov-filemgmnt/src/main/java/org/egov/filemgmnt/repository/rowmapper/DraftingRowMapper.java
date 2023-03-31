package org.egov.filemgmnt.repository.rowmapper;

import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Component
public class DraftingRowMapper implements ResultSetExtractor<List<Drafting>>,BaseRowMapper{
    @Override
    public List<Drafting> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        List<Drafting> result = new ArrayList<>();
        while (rs.next()) {
            result.add(Drafting.builder()
                            .businessService(rs.getString("businessService"))
                            .moduleName(rs.getString("moduleName"))
                            .fileCode(rs.getString("fileCode"))
                            .draftType(rs.getString("draftType"))
                            .draftText(rs.getString("draftText"))
                            .status(rs.getString("status"))
                            .assigner(rs.getString("assigner"))
                            .build());
        }
        return result;
    }
}