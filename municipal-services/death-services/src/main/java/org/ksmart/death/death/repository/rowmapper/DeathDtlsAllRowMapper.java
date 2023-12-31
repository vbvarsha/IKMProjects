package org.ksmart.death.death.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.death.model.EgDeathDtl;
import org.ksmart.death.death.model.EgDeathFatherInfo;
import org.ksmart.death.death.model.EgDeathMotherInfo;
import org.ksmart.death.death.model.EgDeathPermaddr;
import org.ksmart.death.death.model.EgDeathPresentaddr;
import org.ksmart.death.death.model.EgDeathSpouseInfo;
import org.ksmart.death.utils.CommonUtils;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class DeathDtlsAllRowMapper implements ResultSetExtractor<List<EgDeathDtl>> {

	@Autowired
    CommonUtils utils;
	
	@Override
	public List<EgDeathDtl> extractData(ResultSet rs) throws SQLException, DataAccessException {
		Map<String, EgDeathDtl> deathDtlMap = new LinkedHashMap<>();
		try {
			while (rs.next()) {
				String deathdtlid = rs.getString("deathdtlid");
				EgDeathDtl deathDtl = deathDtlMap.get(deathdtlid);

				if (deathDtl == null) {
					EgDeathMotherInfo motherInfo = EgDeathMotherInfo.builder().firstname(rs.getString("bmotfn")).middlename(rs.getString("bmotmn")).lastname(rs.getString("bmotln"))
							.aadharno(rs.getString("bmotaadharno")).build();
					motherInfo.setFullName(utils.addfullName(motherInfo.getFirstname(),motherInfo.getMiddlename(),motherInfo.getLastname()));
					
					EgDeathFatherInfo fatherInfo = EgDeathFatherInfo.builder().firstname(rs.getString("bfatfn")).middlename(rs.getString("bfatmn")).lastname(rs.getString("bfatln"))
							.aadharno(rs.getString("bfataadharno")).build();
					fatherInfo.setFullName(utils.addfullName(fatherInfo.getFirstname(),fatherInfo.getMiddlename(),fatherInfo.getLastname()));
					
					EgDeathSpouseInfo spouseInfo = EgDeathSpouseInfo.builder().firstname(rs.getString("bspsfn")).middlename(rs.getString("bspsmn")).lastname(rs.getString("bspsln"))
							.aadharno(rs.getString("bspsaadharno")).build();
					spouseInfo.setFullName(utils.addfullName(spouseInfo.getFirstname(),spouseInfo.getMiddlename(),spouseInfo.getLastname()));
					
					EgDeathPermaddr	permaddr = EgDeathPermaddr.builder().houseno(rs.getString("pmhouseno")).buildingno(rs.getString("pmbuildingno"))
							.streetname(rs.getString("pmstreetname")).locality(rs.getString("pmlocality")).tehsil(rs.getString("pmtehsil")).district(rs.getString("pmdistrict"))
							.city(rs.getString("pmcity")).state(rs.getString("pmstate")).pinno(rs.getString("pmpinno")).country(rs.getString("pmcountry")).build();
					permaddr.setFullAddress(utils.addFullAddress(permaddr.getHouseno(),permaddr.getBuildingno(),permaddr.getStreetname(),permaddr.getLocality(),permaddr.getTehsil(),
							permaddr.getDistrict(),permaddr.getCity(),permaddr.getState(),permaddr.getPinno(),permaddr.getCountry()));
					
					EgDeathPresentaddr presentaddr= EgDeathPresentaddr.builder().houseno(rs.getString("pshouseno")).buildingno(rs.getString("psbuildingno"))
							.streetname(rs.getString("psstreetname")).locality(rs.getString("pslocality")).tehsil(rs.getString("pstehsil")).district(rs.getString("psdistrict"))
							.city(rs.getString("pscity")).state(rs.getString("psstate")).pinno(rs.getString("pspinno")).country(rs.getString("pscountry")).build();
					presentaddr.setFullAddress(utils.addFullAddress(presentaddr.getHouseno(),presentaddr.getBuildingno(),presentaddr.getStreetname(),presentaddr.getLocality(),presentaddr.getTehsil(),
							presentaddr.getDistrict(),presentaddr.getCity(),presentaddr.getState(),presentaddr.getPinno(),presentaddr.getCountry()));
					
					deathDtl = EgDeathDtl.builder().id(deathdtlid).registrationno(rs.getString("registrationno")).hospitalname(rs.getString("hospitalname")).dateofreport(rs.getTimestamp("dateofreport")).gender(rs.getInt("gender"))
							.dateofdeath(rs.getTimestamp("dateofdeath")).counter(rs.getInt("counter")).genderStr(rs.getString("genderstr")).tenantid(rs.getString("tenantid")).dateofissue(System.currentTimeMillis())
							.firstname(rs.getString("bdtlfn")).middlename(rs.getString("bdtlmn")).lastname(rs.getString("bdtlln")).deathMotherInfo(motherInfo).deathFatherInfo(fatherInfo).deathSpouseInfo(spouseInfo)
							.deathPermaddr(permaddr).deathPresentaddr(presentaddr).placeofdeath(rs.getString("placeofdeath")).remarks(rs.getString("remarks")).age(rs.getLong("age"))
							.aadharno(rs.getString("bdtlaadharno")).build();
					deathDtl.setFullName(utils.addfullName(deathDtl.getFirstname(), deathDtl.getMiddlename(), deathDtl.getLastname()));
					deathDtlMap.put(deathdtlid, deathDtl);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException("INVALID INPUT", "Error in fetching data");
		}
		return new ArrayList<>(deathDtlMap.values());
	}
}
