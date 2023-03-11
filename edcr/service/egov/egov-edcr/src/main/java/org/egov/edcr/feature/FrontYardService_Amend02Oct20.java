package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_011020;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_OCT20;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.C;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D2;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.F4;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.utility.DcrConstants.BSMT_FRONT_YARD_DESC;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.FOROCCUPANCY;
import static org.egov.edcr.utility.DcrConstants.FRONT_YARD_DESC;
import static org.egov.edcr.utility.DcrConstants.IN_METER;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.OFBLOCK;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Building;
import org.egov.common.entity.edcr.NonNotifiedRoad;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyType;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Plot;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.SetBack;
import org.egov.common.entity.edcr.Yard;
import org.egov.edcr.entity.blackbox.NonNotifiedRoadDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.entity.blackbox.YardDetail;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class FrontYardService_Amend02Oct20 extends GeneralRule {
    private static final double VALUE_0_5 = 0.5;
    private static final String RULE_54_3_I = "54-(3-i)";
    private static final String RULE_55_2_1 = "55-2-(1)";
    private static final String RULE_55_2_2 = "55-2-(2)";
    private static final String RULE_55_2_PROV = "55-2(Prov)";
    private static final String RULE_55_2_3 = "55-2-(3)";
    private static final String RULE563D = "56(3d)";
    private static final String RULE_57 = "57";
    private static final String RULE_57_4 = "57(4)";
    private static final String RULE_59_3 = "59(3)";
    private static final String SUB_RULE_24_3 = "24(3)";
    private static final String RULE_59_11 = "59(11)";

    private static final String SUB_RULE_26_11 = "26(11)";
    private static final String RULE_26_4 = "26(4)Table-4";
    private static final String RULE_26_4A = "26(4)Table-4A";
    private static final String RULE_PRO1 = "Proviso 1";
    private static final String RULE_50_2 = "50(2)";
    private static final BigDecimal ONEHUNDREDFIFTY = BigDecimal.valueOf(150);
    private static final BigDecimal THREEHUNDRED = BigDecimal.valueOf(300);

    private static final String SUB_RULE_26_11_DESCRIPTION = "Basement front yard distance";
    private static final String SUB_RULE_24_3_DESCRIPTION = "Front yard distance";
    private static final String MEANMINIMUMLABEL = "(Minimum distance, Mean distance) ";
    private static final BigDecimal FIVE = BigDecimal.valueOf(5);
    private static final BigDecimal THREE = BigDecimal.valueOf(3);

    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_1_8 = BigDecimal.valueOf(1.8);
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_1_2 = BigDecimal.valueOf(1.2);
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_2 = BigDecimal.valueOf(2);

    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_3 = BigDecimal.valueOf(3);
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_4_5 = BigDecimal.valueOf(4.5);
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_5 = FIVE;
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_6 = BigDecimal.valueOf(6);
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_7_5 = BigDecimal.valueOf(7.5);

    private static final BigDecimal FRONTYARDMEAN_DISTANCE_1_8 = BigDecimal.valueOf(1.8);
    private static final BigDecimal FRONTYARDMEAN_DISTANCE_3 = BigDecimal.valueOf(3);
    private static final BigDecimal FRONTYARDMEAN_DISTANCE_5 = FIVE;
    private static final BigDecimal FRONTYARDMEAN_DISTANCE_6 = BigDecimal.valueOf(6);
    private static final BigDecimal FRONTYARDMEAN_DISTANCE_7_5 = BigDecimal.valueOf(7.5);
    private static final BigDecimal FRONTYARDMEAN_DISTANCE_10_5 = BigDecimal.valueOf(10.5);
    private static final BigDecimal FRONTYARDMINIMUM_DISTANCE_1 = BigDecimal.valueOf(1);
    private static final BigDecimal FRONTYARDMEAN_DISTANCE_1 = BigDecimal.valueOf(1);

    private static final int SITEAREA_125 = 125;
    private static final int BUILDUPAREA_300 = 300;
    private static final int BUILDUPAREA_200 = 200;

    private static final int FLOORAREA_800 = 800;
    private static final int FLOORAREA_500 = 500;
    private static final int FLOORAREA_300 = 300;

    private class FrontYardResult {
        String rule;
        String subRule;
        String blockName;
        Integer level;
        BigDecimal actualMeanDistance = BigDecimal.ZERO;
        BigDecimal actualMinDistance = BigDecimal.ZERO;
        String occupancy;
        BigDecimal expectedminimumDistance = BigDecimal.ZERO;
        BigDecimal expectedmeanDistance = BigDecimal.ZERO;
        String additionalCondition;
        boolean status = false;
        boolean isAbutUnnotifiedRoad = false;
    }

    public void processFrontYard(Plan pl) {
        pl.getFeatureAmendments().put(FRONT_YARD_DESC, AMEND_DATE_011020.toString());
        Plot plot = pl.getPlot();
        if (plot == null)
            return;
        // each blockwise, check height , floor area, buildup area. check most restricve based on occupancy and front yard values
        // of occupancies.
        // If floor area less than 150 mt and occupancy type D, then consider as commercial building.
        // In output show blockwise required and provided information.

        validateFrontYard(pl);

        if (plot != null && !pl.getBlocks().isEmpty()) {
            for (Block block : pl.getBlocks()) {  // for each block

                ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
                scrutinyDetail.addColumnHeading(1, RULE_NO);
                scrutinyDetail.addColumnHeading(2, LEVEL);
                scrutinyDetail.addColumnHeading(3, OCCUPANCY);
                scrutinyDetail.addColumnHeading(4, FIELDVERIFIED);
                scrutinyDetail.addColumnHeading(5, REQUIRED);
                scrutinyDetail.addColumnHeading(6, PROVIDED);
                scrutinyDetail.addColumnHeading(7, STATUS);
                // scrutinyDetail.setRemarks("Front yard description ");
                // scrutinyDetail.setSubHeading("Front yard subheading");
                scrutinyDetail.setHeading(FRONT_YARD_DESC);

                FrontYardResult frontYardResult = new FrontYardResult();

                for (SetBack setback : block.getSetBacks()) {
                    BigDecimal min;
                    BigDecimal mean;
                    // consider height,floor area,buildup area, different occupancies of block
                    // Get occupancies of perticular block and use the same.

                    if (setback.getFrontYard() != null
                            && setback.getFrontYard().getMean().compareTo(BigDecimal.ZERO) > 0 && setback.getLevel() <= 0) {
                        min = setback.getFrontYard().getMinimumDistance();
                        mean = setback.getFrontYard().getMean();

                        // Using building height by default.
                        BigDecimal buildingHeight = block.getBuilding().getBuildingHeight();

                        if (buildingHeight != null && (min.doubleValue() > 0 || mean.doubleValue() > 0)) {
                            List<Occupancy> occupanciesList = groupOccupanciesForOccupancy_C_D(pl, block);

                            for (final Occupancy occupancy : occupanciesList) {
                        	OccupancyTypeHelper occpncy = occupancy.getTypeHelper();

                            if (occupancy.getBuiltUpArea() != null
                                    && occupancy.getBuiltUpArea().compareTo(ONEHUNDREDFIFTY) <= 0
                                    && D.equals(occupancy.getTypeHelper().getType().getCode()))
                                occpncy = Util.getOccupancyByCode(pl, F);
                            else if (C.equals(occupancy.getTypeHelper().getType().getCode()) && occupancy.getBuiltUpArea() != null &&
                                    occupancy.getBuiltUpArea().compareTo(ONEHUNDREDFIFTY) <= 0)
                                occpncy = Util.getOccupancyByCode(pl, F);
                            else if (H.equals(occupancy.getTypeHelper().getType().getCode()))
                                if (occupancy.getBuiltUpArea() != null
                                        && occupancy.getBuiltUpArea().compareTo(THREEHUNDRED) <= 0)
                                    occpncy = Util.getOccupancyByCode(pl, F);
                                else
                                    occpncy = Util.getOccupancyByCode(pl, H);
                                scrutinyDetail.setKey("Block_" + block.getName() + "_" + FRONT_YARD_DESC);

                                if (-1 == setback.getLevel()) {
                                    scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Basement Front Yard");
                                    checkFrontYardLessThanTenMts(pl, setback, block.getBuilding(), block.getName(),
                                            setback.getLevel(), plot, BSMT_FRONT_YARD_DESC, min, mean,
                                            occpncy, frontYardResult, scrutinyDetail);

                                } else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) <= 0) {
                                    checkFrontYardLessThanTenMts(pl, setback, block.getBuilding(), block.getName(),
                                            setback.getLevel(), plot, FRONT_YARD_DESC, min, mean,
                                            occpncy, frontYardResult, scrutinyDetail);

                                } else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) > 0
                                        && buildingHeight.compareTo(BigDecimal.valueOf(16)) <= 0) {
                                    checkFrontYardBetweenTenToSixteenMts(setback, block.getBuilding(),
                                            pl, setback.getLevel(), block.getName(), plot, FRONT_YARD_DESC,
                                            SUB_RULE_24_3_DESCRIPTION,
                                            min, mean,
                                            occpncy, frontYardResult);

                                } else if (buildingHeight.compareTo(BigDecimal.valueOf(16)) > 0) {
                                    checkFrontYardMoreThanSixteenMts(setback, block.getBuilding(), buildingHeight,
                                            pl, setback.getLevel(), block.getName(), plot, FRONT_YARD_DESC, min,
                                            mean,
                                            occpncy, frontYardResult);

                                }

                            }

                            Map<String, String> details = new HashMap<>();
                            details.put(RULE_NO, frontYardResult.subRule);
                            details.put(LEVEL, frontYardResult.level != null ? frontYardResult.level.toString() : "");
                            details.put(OCCUPANCY, frontYardResult.occupancy);
                            details.put(FIELDVERIFIED, MEANMINIMUMLABEL);
                            details.put(REQUIRED, "(" + frontYardResult.expectedminimumDistance + ", "
                                    + frontYardResult.expectedmeanDistance + ")");
                            details.put(PROVIDED,
                                    "(" + frontYardResult.actualMinDistance + ", " + frontYardResult.actualMeanDistance + ")");
                            if (frontYardResult.isAbutUnnotifiedRoad
                                    && pl.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0
                                    && frontYardResult.actualMinDistance.compareTo(BigDecimal.valueOf(1.8)) >= 0
                                    && frontYardResult.actualMinDistance.compareTo(BigDecimal.valueOf(3)) < 0
                                    && frontYardResult.status) {
                                details.put(STATUS, Result.Verify.getResultVal());
                                //buildMinimumDistanceOutput(pl, frontYardResult, Result.Verify);
                            } else if (frontYardResult.status) {
                                details.put(STATUS, Result.Accepted.getResultVal());
                                //buildMinimumDistanceOutput(pl, frontYardResult, Result.Accepted);
                            } else {
                                details.put(STATUS, Result.Not_Accepted.getResultVal());
                                //buildMinimumDistanceOutput(pl, frontYardResult, Result.Not_Accepted);

                            }
                            scrutinyDetail.getDetail().add(details);
                            pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

                        }
                    }
                }
            }
        }
    }

	/*
	 * private void buildMinimumDistanceOutput(Plan pl, FrontYardResult
	 * frontYardResult, Result result) { pl.reportOutput
	 * .add(buildRuleOutputWithSubRule(frontYardResult.rule,
	 * frontYardResult.subRule, FRONT_YARD_DESC + OFBLOCK +
	 * frontYardResult.blockName + LEVEL + frontYardResult.level + FOROCCUPANCY +
	 * frontYardResult.occupancy, FRONT_YARD_DESC + OFBLOCK +
	 * frontYardResult.blockName + LEVEL + frontYardResult.level + FOROCCUPANCY +
	 * frontYardResult.occupancy, MEANMINIMUMLABEL + "(" +
	 * frontYardResult.expectedminimumDistance + "," +
	 * frontYardResult.expectedmeanDistance + ")" + IN_METER, "(" +
	 * frontYardResult.actualMinDistance + "," + frontYardResult.actualMeanDistance
	 * + ")" + IN_METER, result, null)); }
	 */

    private List<Occupancy> groupOccupanciesForOccupancy_C_D(Plan pl, Block block) {
        List<Occupancy> occupanciesList = new ArrayList<>();
        BigDecimal totalFloorArea_C = BigDecimal.ZERO;
        BigDecimal totalBuiltUpArea_C = BigDecimal.ZERO;
        BigDecimal totalExistingFloorArea_C = BigDecimal.ZERO;
        BigDecimal totalExistingBuiltUpArea_C = BigDecimal.ZERO;

        BigDecimal totalFloorArea_D = BigDecimal.ZERO;
        BigDecimal totalBuiltUpArea_D = BigDecimal.ZERO;
        BigDecimal totalExistingFloorArea_D = BigDecimal.ZERO;
        BigDecimal totalExistingBuiltUpArea_D = BigDecimal.ZERO;

        for (Occupancy occupancy : block.getBuilding().getTotalArea())
            if (occupancy.getTypeHelper().getType().getCode().equals(C) ||
            		occupancy.getTypeHelper().getType().getCode().equals(C1) ||
            		occupancy.getTypeHelper().getType().getCode().equals(C2) ||
            		occupancy.getTypeHelper().getType().getCode().equals(C3)) {
                totalFloorArea_C = totalFloorArea_C.add(occupancy.getFloorArea());
                totalBuiltUpArea_C = totalBuiltUpArea_C
                        .add(occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getBuiltUpArea());
                totalExistingFloorArea_C = totalExistingFloorArea_C.add(occupancy.getExistingFloorArea());
                totalExistingBuiltUpArea_C = totalExistingBuiltUpArea_C.add(
                        occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getExistingBuiltUpArea());
            } else if (occupancy.getTypeHelper().getType().getCode().equals(D) ||
            		occupancy.getTypeHelper().getType().getCode().equals(D1) ||
            		occupancy.getTypeHelper().getType().getCode().equals(D2)) {
                totalFloorArea_D = totalFloorArea_D.add(occupancy.getFloorArea());
                totalBuiltUpArea_D = totalBuiltUpArea_D
                        .add(occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getBuiltUpArea());
                totalExistingFloorArea_D = totalExistingFloorArea_D.add(occupancy.getExistingFloorArea());
                totalExistingBuiltUpArea_D = totalExistingBuiltUpArea_D.add(
                        occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getExistingBuiltUpArea());
            } else
                occupanciesList.add(occupancy);
        if (totalFloorArea_C.compareTo(BigDecimal.ZERO) > 0 && totalBuiltUpArea_C.compareTo(BigDecimal.ZERO) > 0) {
            Occupancy occupancy = new Occupancy();
            occupancy.setFloorArea(totalFloorArea_C);
            occupancy.setCarpetArea(totalFloorArea_C.multiply(BigDecimal.valueOf(0.80)));
            occupancy.setTypeHelper(Util.getOccupancyByCode(pl, C));
            occupancy.setBuiltUpArea(totalBuiltUpArea_C);
            occupancy.setExistingBuiltUpArea(totalExistingBuiltUpArea_C);
            occupancy.setExistingFloorArea(totalExistingFloorArea_C);
            occupancy.setExistingCarpetArea(totalExistingFloorArea_C.multiply(BigDecimal.valueOf(0.80)));
            occupanciesList.add(occupancy);
        }
        if (totalFloorArea_D.compareTo(BigDecimal.ZERO) > 0 && totalBuiltUpArea_D.compareTo(BigDecimal.ZERO) > 0) {
            Occupancy occupancy = new Occupancy();
            occupancy.setFloorArea(totalFloorArea_D);
            occupancy.setCarpetArea(totalFloorArea_D.multiply(BigDecimal.valueOf(0.80)));
            occupancy.setTypeHelper(Util.getOccupancyByCode(pl, D));
            occupancy.setBuiltUpArea(totalBuiltUpArea_D);
            occupancy.setExistingBuiltUpArea(totalExistingBuiltUpArea_D);
            occupancy.setExistingFloorArea(totalExistingFloorArea_D);
            occupancy.setExistingCarpetArea(totalExistingFloorArea_D.multiply(BigDecimal.valueOf(0.80)));
            occupanciesList.add(occupancy);
        }
        return occupanciesList;
    }

    private void validateFrontYard(Plan pl) {

        // Front yard may not be mandatory at each level. We can check whether in any level front yard defined or not ?

        for (Block block : pl.getBlocks()) {
            if (!block.getCompletelyExisting()) {
                Boolean frontYardDefined = false;
                for (SetBack setback : block.getSetBacks()) {
                    if (setback.getFrontYard() != null
                            && setback.getFrontYard().getMean().compareTo(BigDecimal.valueOf(0)) > 0) {
                        frontYardDefined = true;
                    }
                }
                if (!frontYardDefined) {
                    HashMap<String, String> errors = new HashMap<>();
                    errors.put(FRONT_YARD_DESC,
                            prepareMessage(OBJECTNOTDEFINED, FRONT_YARD_DESC + " for Block " + block.getName()));
                    pl.addErrors(errors);
                }
            }

        }

    }

    private Boolean checkFrontYardMoreThanSixteenMts(SetBack setback, Building building, BigDecimal blockBuildingHeight,
            Plan pl, Integer level,
            String blockName, Plot plot, String frontYardFieldName,
            BigDecimal min, BigDecimal mean, OccupancyTypeHelper mostRestrictiveOccupancy, FrontYardResult frontYardResult) {
        Boolean valid = false;
        BigDecimal buildingHeight = blockBuildingHeight;

        String subRuleDesc = SUB_RULE_24_3_DESCRIPTION;
        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3)) {
            processFrontYardForOccupancyA1A2FWithHightGtThanTenMtrs(setback, buildingHeight, pl, mostRestrictiveOccupancy,
                    blockName, level, plot, frontYardFieldName,
                    subRuleDesc, true, frontYardResult);
        } else {

            BigDecimal distanceIncrementBasedOnHeight = (BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal
                            .valueOf(Math.ceil((buildingHeight.subtract(BigDecimal.TEN)
                                    .divide(THREE, DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)).doubleValue()))));

            valid = processFrontYardForOccupanciesOtherThanA1A2F(pl, building, blockName, level, plot, frontYardFieldName,
                    subRuleDesc, min, mean,
                    mostRestrictiveOccupancy, distanceIncrementBasedOnHeight, true, frontYardResult);

        }
        return valid;
    }

    private Boolean checkFrontYardLessThanTenMts(Plan pl, SetBack setback, Building building, String blockName,
            Integer level,
            Plot plot, String frontYardFieldName,
            BigDecimal min, BigDecimal mean, OccupancyTypeHelper mostRestrictiveOccupancy, FrontYardResult frontYardResult,
            ScrutinyDetail scrutinyDetail) {
        Boolean valid = false;
        String subRule = RULE_26_4A;
        String rule = FRONT_YARD_DESC;
        String subRuleDesc = SUB_RULE_24_3_DESCRIPTION;
        BigDecimal minVal;
        BigDecimal meanVal;
        boolean isUnNotifedRoadAbutting = false;

        for (NonNotifiedRoad unNotifiedRoad : pl.getNonNotifiedRoads()) {
        	NonNotifiedRoadDetail nonNotifiedRoadDtl = (NonNotifiedRoadDetail) unNotifiedRoad;
            if (nonNotifiedRoadDtl.getPolyLine() != null) {
            	YardDetail frontYard = (YardDetail) setback.getFrontYard();
                isUnNotifedRoadAbutting = Util.isTwoPolygonAbutting(frontYard.getPolyLine(),
                		nonNotifiedRoadDtl.getPolyLine());
            }
            if (isUnNotifedRoadAbutting)
                break;
        }
        if (isUnNotifedRoadAbutting && pl.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0)
            scrutinyDetail.setRemarks(
                    "Required Front Yard to be decided on Field Inspection, based on the abutting condition of un-notified road.");
        frontYardResult.isAbutUnnotifiedRoad = isUnNotifedRoadAbutting;
        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3)) {

            if (isUnNotifedRoadAbutting) {
                if (mostRestrictiveOccupancy.getType().getCode().equals(A1)) {
                    if (building.getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0) {
                        if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                            if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_200)) <= 0) {
                                subRule = RULE_26_4A + "," + RULE_PRO1 + ", " + RULE_50_2;
                                if (building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) <= 0) {
                                    minVal = FRONTYARDMINIMUM_DISTANCE_2;
                                    meanVal = FRONTYARDMINIMUM_DISTANCE_2;
                                } else {
                                    minVal = FRONTYARDMINIMUM_DISTANCE_2;
                                    meanVal = FRONTYARDMINIMUM_DISTANCE_2;
                                }
                            } else {
                                subRule = RULE_26_4A + "," + RULE_PRO1;
                                minVal = FRONTYARDMINIMUM_DISTANCE_2;
                                meanVal = FRONTYARDMINIMUM_DISTANCE_2;
                            }
                        } else {
                            subRule = RULE_26_4A + "," + RULE_PRO1;
                            minVal = FRONTYARDMINIMUM_DISTANCE_2;  // In case of non notified, culdesac or lane road min yard
                                                                   // distance
                                                                   // 2.
                            meanVal = FRONTYARDMINIMUM_DISTANCE_2;
                        }
                    } else {
                        minVal = FRONTYARDMINIMUM_DISTANCE_1_8;
                        meanVal = FRONTYARDMEAN_DISTANCE_3;
                    }
                    valid = validateMinimumAndMeanValue(valid, min, mean, minVal, meanVal);
                } else {
                    minVal = FRONTYARDMINIMUM_DISTANCE_1_8;
                    meanVal = FRONTYARDMEAN_DISTANCE_3;
                }
            } else {
                subRule = RULE_26_4 + "," + RULE_26_4A;
                if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                    if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_200)) <= 0) {
                        if (building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) <= 0) {
                            subRule = RULE_26_4 + "," + RULE_26_4A + ", " + RULE_50_2;
                            minVal = FRONTYARDMINIMUM_DISTANCE_1_2;
                            meanVal = FRONTYARDMINIMUM_DISTANCE_1_8;
                        } else {
                            minVal = FRONTYARDMINIMUM_DISTANCE_1_8;
                            meanVal = FRONTYARDMINIMUM_DISTANCE_3;
                        }
                    } else {
                        minVal = FRONTYARDMINIMUM_DISTANCE_1_8;
                        meanVal = FRONTYARDMINIMUM_DISTANCE_3;
                    }
                } else {
                    minVal = FRONTYARDMINIMUM_DISTANCE_1_8;  // In case of non notified, culdesac or lane road min yard distance
                                                             // 2.
                    meanVal = FRONTYARDMINIMUM_DISTANCE_3;
                }
                valid = validateMinimumAndMeanValue(valid, min, mean, minVal, meanVal);
            }

            if (-1 == level) {
                rule = BSMT_FRONT_YARD_DESC;
                subRuleDesc = SUB_RULE_26_11_DESCRIPTION;
                subRule = SUB_RULE_26_11;
            }

            compareFrontYardResult(blockName, min, mean, mostRestrictiveOccupancy, frontYardResult, valid, subRule, rule, minVal,
                    meanVal, level);

        } else {
            valid = processFrontYardForOccupanciesOtherThanA1A2F(pl, building, blockName, level, plot, frontYardFieldName,
                    subRuleDesc, min, mean,
                    mostRestrictiveOccupancy, BigDecimal.ZERO, false, frontYardResult);

        }
        return valid;
    }

    private void compareFrontYardResult(String blockName, BigDecimal min, BigDecimal mean, OccupancyTypeHelper mostRestrictiveOccupancy,
            FrontYardResult frontYardResult, Boolean valid, String subRule, String rule, BigDecimal minVal, BigDecimal meanVal,
            Integer level) {
        if (minVal.compareTo(frontYardResult.expectedminimumDistance) >= 0) {
            if (minVal.compareTo(frontYardResult.expectedminimumDistance) == 0) {
                frontYardResult.rule = frontYardResult.rule != null ? frontYardResult.rule + "," + rule : rule;
                frontYardResult.occupancy = frontYardResult.occupancy != null
                        ? frontYardResult.occupancy + "," + mostRestrictiveOccupancy.getType().getName()
                        : mostRestrictiveOccupancy.getType().getName();
            } else {
                frontYardResult.rule = rule;
                frontYardResult.occupancy = mostRestrictiveOccupancy.getType().getName();
            }

            frontYardResult.subRule = subRule;
            frontYardResult.blockName = blockName;
            frontYardResult.level = level;
            frontYardResult.expectedminimumDistance = minVal;
            frontYardResult.expectedmeanDistance = meanVal;
            frontYardResult.actualMinDistance = min;
            frontYardResult.actualMeanDistance = mean;
            frontYardResult.status = valid;

        }
    }

    private Boolean checkFrontYardBetweenTenToSixteenMts(SetBack setback, Building building, Plan pl, Integer level,
            String blockName, Plot plot, String frontYardFieldName,
            String subRuleDesc, BigDecimal min, BigDecimal mean, OccupancyTypeHelper mostRestrictiveOccupancy,
            FrontYardResult frontYardResult) {
        Boolean valid = false;
        BigDecimal buildingHeight = building.getBuildingHeight();

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3)) {
            processFrontYardForOccupancyA1A2FWithHightGtThanTenMtrs(setback, buildingHeight, pl, mostRestrictiveOccupancy,
                    blockName, level, plot, frontYardFieldName,
                    subRuleDesc, false, frontYardResult);
        } else {
            BigDecimal distanceIncrementBasedOnHeight = (BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal
                            .valueOf(Math.ceil((buildingHeight.subtract(BigDecimal.TEN)
                                    .divide(THREE, DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)).doubleValue()))));

            valid = processFrontYardForOccupanciesOtherThanA1A2F(pl, building, blockName, level, plot, frontYardFieldName,
                    subRuleDesc, min, mean,
                    mostRestrictiveOccupancy, distanceIncrementBasedOnHeight, false, frontYardResult);

        }
        return valid;
    }

    private void processFrontYardForOccupancyA1A2FWithHightGtThanTenMtrs(SetBack setback, BigDecimal buildingHeight,
            Plan pl, OccupancyTypeHelper mostRestrictiveOccupancy, String blockName, Integer level, Plot plot,
            String frontYardFieldName,
            String subRuleDesc, boolean checkMinimumValue, FrontYardResult frontYardResult) {
        String subRule = RULE_26_4;
        String rule = FRONT_YARD_DESC;
        BigDecimal minval;
        BigDecimal meanval;
        if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) > 0) {
            subRule = RULE_26_4 + ", " + RULE_50_2;
            minval = FRONTYARDMINIMUM_DISTANCE_1_8;
            meanval = THREE;
        } else {
            subRule = RULE_26_4;
            minval = FRONTYARDMINIMUM_DISTANCE_1_2;
            meanval = FRONTYARDMEAN_DISTANCE_1_8;
        }

        if (buildingHeight.compareTo(BigDecimal.TEN) > 0) {
            BigDecimal minValue = (BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal.valueOf(Math.ceil((buildingHeight.subtract(BigDecimal.TEN)
                            .divide(THREE, DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)).doubleValue()))))
                                    .add(minval);

            BigDecimal meanValue = (BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal.valueOf(Math.ceil((buildingHeight.subtract(BigDecimal.TEN)
                            .divide(THREE, DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)).doubleValue()))))
                                    .add(meanval);
            if (checkMinimumValue) {
                minValue = minValue.compareTo(FIVE) <= 0 ? FIVE : minValue;
                meanValue = meanValue.compareTo(FIVE) <= 0 ? FIVE : meanValue;
            }

            if (setback.getFrontYard().getMinimumDistance().compareTo(minValue) >= 0
                    && setback.getFrontYard().getMean().compareTo(meanValue) >= 0) {
                compareFrontYardResult(blockName, setback.getFrontYard().getMinimumDistance(), setback.getFrontYard().getMean(),
                        mostRestrictiveOccupancy, frontYardResult, true, subRule, rule, minValue,
                        meanValue, level);
            } else
                compareFrontYardResult(blockName, setback.getFrontYard().getMinimumDistance(), setback.getFrontYard().getMean(),
                        mostRestrictiveOccupancy, frontYardResult, false, subRule, rule, minValue,
                        meanValue, level);
        }

    }

    private Boolean processFrontYardForOccupanciesOtherThanA1A2F(Plan pl, Building building, String blockName,
            Integer level, Plot plot, String frontYardFieldName,
            String subRuleDesc, BigDecimal min, BigDecimal mean, OccupancyTypeHelper mostRestrictiveOccupancy,
            BigDecimal distanceIncrementBasedOnHeight,
            Boolean checkMinimum5mtsCondition, FrontYardResult frontYardResult) {
        String subRule = SUB_RULE_24_3;
        String rule = FRONT_YARD_DESC;
        BigDecimal minVal = BigDecimal.valueOf(0);
        BigDecimal meanVal = BigDecimal.valueOf(0);
        Boolean valid = false;
        if (mostRestrictiveOccupancy.getType().getCode().equals(B1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(B2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(B3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(E) ||
                mostRestrictiveOccupancy.getType().getCode().equals(H)) {

            if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) > 0) {
                subRule = RULE_54_3_I;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_4_5);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_6);
            } else {
                subRule = SUB_RULE_24_3;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_1_8);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
            }

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(D) ||
                mostRestrictiveOccupancy.getType().getCode().equals(D2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(D1)) {
            if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) > 0) {
                subRule = RULE_55_2_3;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_6);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_10_5);

            } else if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) > 0 &&
                    building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) <= 0) {
                subRule = RULE_55_2_2;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_5);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_7_5);
            } else if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_300)) > 0 &&
                    building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) <= 0) {
                subRule = RULE_55_2_1;

                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_4_5);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_6);
            } else {
                if (mostRestrictiveOccupancy.getType().getCode().equals(D1)) {
                    subRule = RULE_55_2_PROV;
                    minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_3);
                    meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
                } else {
                    subRule = RULE_55_2_PROV;
                    minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_1_8);
                    meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);

                }

            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F1)) {
            subRule = RULE563D;
            minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_5);
            meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_5);

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F2)) {
            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                subRule = RULE563D;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_1_2);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_1_8);
            } else {
                subRule = RULE563D;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_3);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
            }

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(G1)) {
            if (smallIndustrialBuilding(pl, building)) {
                rule = SUB_RULE_24_3;
                subRule = SUB_RULE_24_3;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_1_8);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
            } else {
                rule = RULE_57;
                subRule = RULE_57_4;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_5);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_5);
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(G2)) {
            if (smallIndustrialBuilding(pl, building)) {
                rule = SUB_RULE_24_3;
                subRule = SUB_RULE_24_3;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_1_8);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
            } else {
                subRule = RULE_57_4;
                minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_3);
                meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(I1)) {
            subRule = RULE_59_3;
            minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_3);
            meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_3);
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(I2)) {
            subRule = RULE_59_3;
            minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_7_5);
            meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_7_5);
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F4)) {
            subRule = RULE_59_11;
            minVal = distanceIncrementBasedOnHeight.add(FRONTYARDMINIMUM_DISTANCE_1);
            meanVal = distanceIncrementBasedOnHeight.add(FRONTYARDMEAN_DISTANCE_1);
        }

        if (checkMinimum5mtsCondition) {
            minVal = minVal.compareTo(FIVE) <= 0 ? FIVE : minVal;
            meanVal = meanVal.compareTo(FIVE) <= 0 ? FIVE : meanVal;
        }

        valid = validateMinimumAndMeanValue(valid, min, mean, minVal, meanVal);
        if (-1 == level) {
            rule = BSMT_FRONT_YARD_DESC;
            subRuleDesc = SUB_RULE_26_11_DESCRIPTION;
            subRule = SUB_RULE_26_11;
        }

        compareFrontYardResult(blockName, min, mean, mostRestrictiveOccupancy, frontYardResult, valid, subRule, rule, minVal,
                meanVal, level);
        return valid;
    }

    private Boolean smallIndustrialBuilding(Plan pl, Building building) {
        BigDecimal totalarea = building.getTotalExistingBuiltUpArea() != null
                ? building.getTotalExistingBuiltUpArea().add(building.getTotalBuitUpArea())
                : building.getTotalBuitUpArea();
        if (building.getBuildingHeight().compareTo(BigDecimal.valueOf(10)) < 0
                && pl.getPlanInformation().getPowerUsedHp() != null &&
                pl.getPlanInformation().getPowerUsedHp() <= 30 &&
                pl.getPlanInformation().getNumberOfWorkers() != null &&
                pl.getPlanInformation().getNumberOfWorkers() <= 20
                && totalarea.compareTo(BigDecimal.valueOf(200)) < 0) {
            return true;
        }
        return false;
    }

    private Boolean validateMinimumAndMeanValue(Boolean valid, BigDecimal min, BigDecimal mean, BigDecimal minval,
            BigDecimal meanval) {
        if (min.compareTo(minval) >= 0 && mean.compareTo(meanval) >= 0) {
            valid = true;
        }
        return valid;
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> frontYardAmendments = new LinkedHashMap<>();
        frontYardAmendments.put(AMEND_OCT20, AMEND_DATE_011020);
        return frontYardAmendments;
    }
}
