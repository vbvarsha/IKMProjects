/*
 * eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 * accountability and the service delivery of the government  organizations.
 *
 *  Copyright (C) <2019>  eGovernments Foundation
 *
 *  The updated version of eGov suite of products as by eGovernments Foundation
 *  is available at http://www.egovernments.org
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see http://www.gnu.org/licenses/ or
 *  http://www.gnu.org/licenses/gpl.html .
 *
 *  In addition to the terms of the GPL license to be adhered to in using this
 *  program, the following additional terms are to be complied with:
 *
 *      1) All versions of this program, verbatim or modified must carry this
 *         Legal Notice.
 *      Further, all user interfaces, including but not limited to citizen facing interfaces,
 *         Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *         derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *      For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *      For any further queries on attribution, including queries on brand guidelines,
 *         please contact contact@egovernments.org
 *
 *      2) Any misrepresentation of the origin of the material is prohibited. It
 *         is required that all modified versions of this material be marked in
 *         reasonable ways as different from the original version.
 *
 *      3) This license does not grant any rights to any user of the program
 *         with regards to rights under trademark law for use of the trade names
 *         or trademarks of eGovernments Foundation.
 *
 *  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
import static org.egov.edcr.utility.DcrConstants.ELECTRICLINE_DISTANCE;
import static org.egov.edcr.utility.DcrConstants.HORIZONTAL_ELECTRICLINE_DISTANCE;
import static org.egov.edcr.utility.DcrConstants.HORIZONTAL_ELECTRICLINE_DISTANCE_NOC;
import static org.egov.edcr.utility.DcrConstants.HORIZONTAL_ELINE_DISTANCE_NOC;
import static org.egov.edcr.utility.DcrConstants.HORIZONTAL_ELINE_DISTANCE_NOC_HLINE_NOT_DEFINED;
import static org.egov.edcr.utility.DcrConstants.IN_KV;
import static org.egov.edcr.utility.DcrConstants.IN_METER;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.VERTICAL_ELECTRICLINE_DISTANCE;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.egov.common.entity.edcr.ElectricLine;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class OverheadElectricalLineService extends FeatureProcess {

	private static final String SUB_RULE_5_DESCRIPTION = "Overhead Electric line and Voltage";
	private static final String SUB_RULE_5 = "23(5)";

	private static final String SUB_RULE_AMD_22_5 = "22(5) Table 2";

	private static final BigDecimal VERTICAL_DISTANCE_11000 = BigDecimal.valueOf(2.4);
	private static final BigDecimal AMDNOV19_VERTICAL_DISTANCE_11000 = BigDecimal.valueOf(2.5);
	private static final BigDecimal VERTICAL_DISTANCE_33000 = BigDecimal.valueOf(3.7);
	private static final BigDecimal HORIZONTAL_DISTANCE_33000 = BigDecimal.valueOf(1.85);
	private static final BigDecimal AMDNOV19_HORIZONTAL_DISTANCE_33000 = BigDecimal.valueOf(2);

	private static final int VOLTAGE_11000 = 11;
	private static final int VOLTAGE_33000 = 33;
	private static final BigDecimal HORIZONTAL_DISTANCE_11000 = BigDecimal.valueOf(1.2);
	private static final String REMARKS = "Remarks";
	private static final String VOLTAGE = "Voltage";

	@Override
	public Plan validate(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
		for (ElectricLine electricalLine : pl.getElectricLine()) {
			if (electricalLine.getPresentInDxf()) {
				if (electricalLine.getVoltage() == null) {
					errors.put(VOLTAGE, edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] { VOLTAGE },
							LocaleContextHolder.getLocale()));
					pl.addErrors(errors);
				}
				if (electricalLine.getVoltage() != null && (electricalLine.getHorizontalDistance() == null
						&& electricalLine.getVerticalDistance() == null)) {
					errors.put(ELECTRICLINE_DISTANCE, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
							new String[] { ELECTRICLINE_DISTANCE }, LocaleContextHolder.getLocale()));
					pl.addErrors(errors);
				}
			}
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		validate(pl);
		scrutinyDetail = new ScrutinyDetail();
		scrutinyDetail.setKey("Common_OverHead Electric Line");
		scrutinyDetail.addColumnHeading(1, RULE_NO);
		scrutinyDetail.addColumnHeading(2, DESCRIPTION);
		scrutinyDetail.addColumnHeading(3, REQUIRED);
		scrutinyDetail.addColumnHeading(4, PROVIDED);
		scrutinyDetail.addColumnHeading(5, STATUS);
		scrutinyDetail.addColumnHeading(6, REMARKS);
		scrutinyDetail.addColumnHeading(7, VOLTAGE);
		for (ElectricLine electricalLine : pl.getElectricLine()) {
			if (electricalLine.getPresentInDxf())
				if (electricalLine.getVoltage() != null && electricalLine.getVoltage().compareTo(BigDecimal.ZERO) > 0
						&& (electricalLine.getHorizontalDistance() != null
								|| electricalLine.getVerticalDistance() != null)) {
					boolean horizontalDistancePassed = false;
					if (electricalLine.getHorizontalDistance() != null) {
						String ruleNo;
						BigDecimal distance;
						if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
							ruleNo = SUB_RULE_AMD_22_5;
							distance = AMDNOV19_HORIZONTAL_DISTANCE_33000;
							pl.getFeatureAmendments().put("OverHead Horizontal Electric Line",
									AMEND_DATE_081119.toString());
						} else {
							ruleNo = SUB_RULE_5;
							distance = HORIZONTAL_DISTANCE_33000;
						}
						String expectedResult = "";
						String actualResult = electricalLine.getHorizontalDistance().toString() + IN_METER;
						if (electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_11000)) < 0) {
							expectedResult = HORIZONTAL_DISTANCE_11000.toString() + IN_METER;
							if (electricalLine.getHorizontalDistance().compareTo(HORIZONTAL_DISTANCE_11000) >= 0)
								horizontalDistancePassed = true;

						} else if (electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_11000)) >= 0
								&& electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_33000)) <= 0) {
							expectedResult = distance.toString() + IN_METER;
							if (electricalLine.getHorizontalDistance().compareTo(distance) >= 0)
								horizontalDistancePassed = true;
						} else if (electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_33000)) > 0) {
							Double totalHorizontalOHE = distance.doubleValue() + 0.3 * Math.ceil(electricalLine
									.getVoltage().subtract(BigDecimal.valueOf(VOLTAGE_33000))
									.divide(BigDecimal.valueOf(VOLTAGE_33000), 2, RoundingMode.HALF_UP).doubleValue());
							expectedResult = totalHorizontalOHE + IN_METER;
							if (electricalLine.getHorizontalDistance()
									.compareTo(BigDecimal.valueOf(totalHorizontalOHE)) >= 0) {
								horizontalDistancePassed = true;
							}
						}

						if (horizontalDistancePassed) {
							setReportOutputDetails(pl, ruleNo,
									HORIZONTAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(), expectedResult,
									actualResult, Result.Accepted.getResultVal(), "",
									electricalLine.getVoltage().toString() + IN_KV);
						} else {
							boolean verticalDistancePassed = processVerticalDistance(electricalLine, pl, "", "");
							if (verticalDistancePassed) {
								setReportOutputDetails(pl, ruleNo,
										HORIZONTAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(), expectedResult,
										actualResult, Result.Verify.getResultVal(),
										String.format(HORIZONTAL_ELINE_DISTANCE_NOC, electricalLine.getNumber()),
										electricalLine.getVoltage().toString() + IN_KV);
							} else {
								setReportOutputDetails(pl, ruleNo,
										HORIZONTAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(), expectedResult,
										actualResult, Result.Not_Accepted.getResultVal(), "",
										electricalLine.getVoltage().toString() + IN_KV);
							}

							// NOC required for horizontal, if horizontal distance condition failed and
							// vertical distance passed.
							if (verticalDistancePassed) {
								HashMap<String, String> noc = new HashMap<>();
								noc.put(HORIZONTAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(),
										HORIZONTAL_ELECTRICLINE_DISTANCE_NOC);
								pl.addNocs(noc);
							}
						}

					} else if (electricalLine.getHorizontalDistance() == null
							&& electricalLine.getVerticalDistance() != null) {
						boolean verticalDistancePassed = processVerticalDistance(electricalLine, pl, String.format(
								HORIZONTAL_ELINE_DISTANCE_NOC_HLINE_NOT_DEFINED, electricalLine.getNumber()), "");
						if (verticalDistancePassed) {
							HashMap<String, String> noc = new HashMap<>();
							noc.put(HORIZONTAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(),
									HORIZONTAL_ELECTRICLINE_DISTANCE_NOC);
							pl.addNocs(noc);
						}
					}
				}
		}
		return pl;
	}

	private boolean processVerticalDistance(ElectricLine electricalLine, Plan planDetail, String remarks1,
			String remarks2) {

		boolean verticalDistancePassed = false;
		String ruleNo;
		BigDecimal distance;
		if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(planDetail.getAsOnDate()))) {
			ruleNo = SUB_RULE_AMD_22_5;
			distance = AMDNOV19_VERTICAL_DISTANCE_11000;
			planDetail.getFeatureAmendments().put("Common_OverHead Vertical Electric Line", AMEND_NOV19);
		} else {
			ruleNo = SUB_RULE_5;
			distance = VERTICAL_DISTANCE_11000;
		}
		if (electricalLine.getVerticalDistance() != null) {
			String actualResult = electricalLine.getVerticalDistance().toString() + IN_METER;
			String expectedResult = "";

			if (electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_11000)) < 0) {

				expectedResult = distance.toString() + IN_METER;
				if (electricalLine.getVerticalDistance().compareTo(distance) >= 0)
					verticalDistancePassed = true;

			} else if (electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_11000)) >= 0
					&& electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_33000)) <= 0) {

				expectedResult = VERTICAL_DISTANCE_33000.toString() + IN_METER;
				if (electricalLine.getVerticalDistance().compareTo(VERTICAL_DISTANCE_33000) >= 0)
					verticalDistancePassed = true;

			} else if (electricalLine.getVoltage().compareTo(BigDecimal.valueOf(VOLTAGE_33000)) > 0) {

				Double totalVertficalOHE = VERTICAL_DISTANCE_33000.doubleValue()
						+ 0.3 * Math.ceil(electricalLine.getVoltage().subtract(BigDecimal.valueOf(VOLTAGE_33000))
								.divide(BigDecimal.valueOf(VOLTAGE_33000), 2, RoundingMode.HALF_UP).doubleValue());
				expectedResult = totalVertficalOHE + IN_METER;
				if (electricalLine.getVerticalDistance().compareTo(BigDecimal.valueOf(totalVertficalOHE)) >= 0) {
					verticalDistancePassed = true;
				}
			}
			if (verticalDistancePassed) {
				setReportOutputDetails(planDetail, ruleNo, VERTICAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(),
						expectedResult, actualResult, Result.Accepted.getResultVal(), remarks1,
						electricalLine.getVoltage().toString() + IN_KV);
			} else {
				setReportOutputDetails(planDetail, ruleNo, VERTICAL_ELECTRICLINE_DISTANCE + electricalLine.getNumber(),
						expectedResult, actualResult, Result.Not_Accepted.getResultVal(), remarks2,
						electricalLine.getVoltage().toString() + IN_KV);
			}

		}
		return verticalDistancePassed;
	}

	private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
			String status, String remarks, String voltage) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(DESCRIPTION, ruleDesc);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		details.put(REMARKS, remarks);
		details.put(VOLTAGE, voltage);
		scrutinyDetail.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	@Override
	public Map<String, Date> getAmendments() {
		Map<String, Date> ohel = new ConcurrentHashMap<>();
		ohel.put(AMEND_NOV19, AMEND_DATE_081119);
		return ohel;
	}

}
