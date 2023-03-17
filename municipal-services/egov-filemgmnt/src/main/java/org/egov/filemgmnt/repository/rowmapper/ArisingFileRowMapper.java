package org.egov.filemgmnt.repository.rowmapper;


import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
import org.egov.filemgmnt.web.models.ArisingFile;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


@Component
public class ArisingFileRowMapper  implements ResultSetExtractor<List<ArisingFile>>,BaseRowMapper {
        @Override
                public List<ArisingFile> extractData(final ResultSet rs) throws SQLException, DataAccessException {
            List<ArisingFile> result = new ArrayList<>();
            while (rs.next()){
                result.add(ArisingFile.builder()
                                .fileCode(rs.getString("filecode"))
                                .fileStatus(rs.getString("filestatus"))
                                .fileArisingDate(rs.getLong("filearisingdate"))
                                    .build());
            }
            return result;
    }
}
