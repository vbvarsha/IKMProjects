package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Flight;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.entity.blackbox.GeneralStairDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class GeneralStair extends FeatureProcess {
    private static final Logger LOG = LogManager.getLogger(GeneralStair.class);
    private static final String EXPECTED_WIDTH = "1.2";
    private static final String EXPECTED_TREAD = "0.3";
    private static final String EXPECTED_LINE_LENGTH = "0.75";
    private static final String WIDTH_DESCRIPTION = "Minimum width for general stair %s";
    private static final String TREAD_DESCRIPTION = "Minimum tread for general stair %s";
    private static final String HEIGHT_FLOOR_DESCRIPTION = "Height of floor in layer ";
    private static final String RULE39 = "39";
    private static final String RULE112_1 = "112(1)";
    private static final String FLOOR = "Floor";
    private static final String FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION = "Flight polyline is not defined in layer ";
    private static final String FLIGHT_LENGTH_DEFINED_DESCRIPTION = "Flight polyline length is not defined in layer ";
    private static final String FLIGHT_WIDTH_DEFINED_DESCRIPTION = "Flight polyline width is not defined in layer ";
    private static final String LINE_DESCRIPTION = "Minimum length of line for general stair %s flight layer";
    
    @Autowired
    private LayerNames layerNames;

    @Override
    public Plan validate(Plan plan) {
        return plan;
    }

    @Override
    public Plan process(Plan pl) {
        // validate(planDetail);
        HashMap<String, String> errors = new HashMap<>();
        blk: for (Block block : pl.getBlocks()) {
            if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()) {
                if (Util.checkExemptionConditionForBuildingParts(block) ||
                        Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block)) {
                    continue blk;
                }

                ScrutinyDetail scrutinyDetail2 = new ScrutinyDetail();
                scrutinyDetail2.addColumnHeading(1, RULE_NO);
                scrutinyDetail2.addColumnHeading(2, FLOOR);
                scrutinyDetail2.addColumnHeading(3, DESCRIPTION);
                scrutinyDetail2.addColumnHeading(4, REQUIRED);
                scrutinyDetail2.addColumnHeading(5, PROVIDED);
                scrutinyDetail2.addColumnHeading(6, STATUS);
                scrutinyDetail2.setKey("Block_" + block.getNumber() + "_" + "General Stair - Width");

                ScrutinyDetail scrutinyDetail3 = new ScrutinyDetail();
                scrutinyDetail3.addColumnHeading(1, RULE_NO);
                scrutinyDetail3.addColumnHeading(2, FLOOR);
                scrutinyDetail3.addColumnHeading(3, DESCRIPTION);
                scrutinyDetail3.addColumnHeading(4, REQUIRED);
                scrutinyDetail3.addColumnHeading(5, PROVIDED);
                scrutinyDetail3.addColumnHeading(6, STATUS);
                scrutinyDetail3.setKey("Block_" + block.getNumber() + "_" + "General Stair - Tread");

                ScrutinyDetail scrutinyDetail4 = new ScrutinyDetail();
                scrutinyDetail4.addColumnHeading(1, RULE_NO);
                scrutinyDetail4.addColumnHeading(2, REQUIRED);
                scrutinyDetail4.addColumnHeading(3, PROVIDED);
                scrutinyDetail4.addColumnHeading(4, STATUS);
                scrutinyDetail4.setKey("Block_" + block.getNumber() + "_" + "General Stair - Defined Or Not");

                ScrutinyDetail scrutinyDetail6 = new ScrutinyDetail();
                scrutinyDetail6.addColumnHeading(1, RULE_NO);
                scrutinyDetail6.addColumnHeading(2, FLOOR);
                scrutinyDetail6.addColumnHeading(3, DESCRIPTION);
                scrutinyDetail6.addColumnHeading(4, REQUIRED);
                scrutinyDetail6.addColumnHeading(5, PROVIDED);
                scrutinyDetail6.addColumnHeading(6, STATUS);
                scrutinyDetail6.setKey("Block_" + block.getNumber() + "_" + "General Stair - Length Of Line In Flight Layer");

                ScrutinyDetail scrutinyDetail7 = new ScrutinyDetail();
                scrutinyDetail7.addColumnHeading(1, RULE_NO);
                scrutinyDetail7.addColumnHeading(2, FLOOR);
                scrutinyDetail7.addColumnHeading(3, REQUIRED);
                scrutinyDetail7.addColumnHeading(4, PROVIDED);
                scrutinyDetail7.addColumnHeading(5, STATUS);
                scrutinyDetail7.setKey("Block_" + block.getNumber() + "_" + "General Stair - High Rise ");

                BigDecimal generalStairCount = BigDecimal.ZERO;
                BigDecimal noOfFireStair = BigDecimal.ZERO;
                List<Floor> floors = block.getBuilding().getFloors();
                int floorSize = floors.size();
                Floor topMostFloor = floors.stream()
                        .filter(floor -> floor.getTerrace() || floor.getUpperMost())
                        .findAny()
                        .orElse(null);
                for (Floor floor : floors) {

                    // boolean belowTopMostFloor = topMostFloor != null ? floor.getNumber() == topMostFloor.getNumber() : false;
                    // boolean belowTopMostFloor = topMostFloor != null ? floor.getTerrace()?( floor.getNumber() ==
                    // topMostFloor.getNumber() -1):(floor.getNumber() == topMostFloor.getNumber()): false;
                    boolean belowTopMostFloor = false;
                    if (topMostFloor != null) {
                        if (topMostFloor.getTerrace())
                            belowTopMostFloor = (floor.getNumber() >= topMostFloor.getNumber() - 1);
                        else
                            belowTopMostFloor = (floor.getNumber() == topMostFloor.getNumber());

                    }
                    // boolean belowTopMostFloor = topMostFloor != null ? floor.getTerrace()?( floor.getNumber() ==
                    // topMostFloor.getNumber() -1):(floor.getNumber() == topMostFloor.getNumber()): false;

                    boolean isTypicalRepititiveFloor = false;
                    Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor, isTypicalRepititiveFloor);

                    List<org.egov.common.entity.edcr.GeneralStair> generalStairs = floor.getGeneralStairs();

                    generalStairCount = Util.roundOffTwoDecimal(generalStairCount.add(BigDecimal.valueOf(generalStairs.size())));

                    // getting the count of fire stair which satisfy general stair
                    long fireStairCount = floor.getFireStairs().stream()
                            .filter(fireStair -> fireStair.isGeneralStair())
                            .count();

                    noOfFireStair = Util.roundOffTwoDecimal(noOfFireStair.add(BigDecimal.valueOf(fireStairCount)));
                    if (generalStairs.size() != 0) {

                        // High Rise Building
                        boolean highRise = Util.roundOffTwoDecimal(block.getBuilding().getBuildingHeight())
                                .compareTo(BigDecimal.valueOf(16)) > 0;
                        if (highRise && !belowTopMostFloor) {
                            if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
                                boolean valid = false;

                                long size = generalStairs.size() + fireStairCount;
                                if (size >= 2) {
                                    valid = true;
                                }

                                String value = typicalFloorValues.get("typicalFloors") != null
                                        ? (String) typicalFloorValues.get("typicalFloors")
                                        : " floor " + floor.getNumber();

                                if (valid) {
                                    setReportOutputDetailsFloorWise(pl, RULE112_1, value, String.valueOf(2),
                                            String.valueOf(size), Result.Accepted.getResultVal(), scrutinyDetail7);
                                } else {
                                    setReportOutputDetailsFloorWise(pl, RULE112_1, value, String.valueOf(2),
                                            String.valueOf(size), Result.Not_Accepted.getResultVal(), scrutinyDetail7);
                                }
                            }
                        }

                        for (org.egov.common.entity.edcr.GeneralStair gstair : generalStairs) {
                        	GeneralStairDetail generalStair = (GeneralStairDetail) gstair;
                            List<Measurement> flightPolyLines = generalStair.getStairMeasurements();
                            List<List<BigDecimal>> flightLengths = generalStair.getFlights().stream().map(Flight::getLengthOfFlights).collect(Collectors.toList());
                            List<List<BigDecimal>> flightWidths = generalStair.getFlights().stream().map(Flight::getWidthOfFlights).collect(Collectors.toList());
                            BigDecimal minimumWidth = new BigDecimal(1.2);
                            // Boolean flightPolyLineClosed = generalStair.getFlightPolyLineClosed();
                            String flightLayerName = String.format(layerNames.getLayerName("LAYER_NAME_STAIR_FLIGHT"), block.getNumber(),
                                    floor.getNumber(), generalStair.getNumber());

                            if (!floor.getTerrace() && !floor.getUpperMost() && !belowTopMostFloor) {
                                if (generalStair.getLines() != null && generalStair.getLines().size() > 0) {
                                    List<DXFLine> lines = generalStair.getLines();

                                    DXFLine line = lines.stream()
                                            .min(Comparator.comparing(DXFLine::getLength)).get();

                                    boolean valid = false;

                                    if (line != null) {
                                        BigDecimal lineLength = Util.roundOffTwoDecimal(BigDecimal.valueOf(line.getLength()));

                                        if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
                                            BigDecimal minLength = Util.roundOffTwoDecimal(BigDecimal.valueOf(1.2));

                                            if (lineLength.compareTo(minLength) >= 0) {
                                                valid = true;
                                            }
                                            String value = typicalFloorValues.get("typicalFloors") != null
                                                    ? (String) typicalFloorValues.get("typicalFloors")
                                                    : " floor " + floor.getNumber();

                                            if (valid) {
                                                setReportOutputDetailsFloorStairWise(pl, RULE39, value,
                                                        String.format(LINE_DESCRIPTION, generalStair.getNumber()),
                                                        EXPECTED_LINE_LENGTH, String.valueOf(lineLength),
                                                        Result.Accepted.getResultVal(), scrutinyDetail6);
                                            } else {
                                                setReportOutputDetailsFloorStairWise(pl, RULE39, value,
                                                        String.format(LINE_DESCRIPTION, generalStair.getNumber()),
                                                        EXPECTED_LINE_LENGTH, String.valueOf(lineLength),
                                                        Result.Not_Accepted.getResultVal(), scrutinyDetail6);
                                            }
                                        }
                                    }
                                }
                            }

                            if (!floor.getTerrace() && !floor.getUpperMost() && !belowTopMostFloor) {
                                if (flightPolyLines != null && !flightPolyLines.isEmpty()) {
                                    // if (flightPolyLineClosed) {
                                    if (flightWidths != null && flightWidths.size() > 0) {
                                    	List<BigDecimal> widths = new ArrayList<>();
                                    	for(List<BigDecimal> fw : flightWidths)
                                    		widths.addAll(fw);
                                        BigDecimal flightPolyLine = widths.stream().reduce(BigDecimal::min).get();

                                        boolean valid = false;

                                        if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
                                            BigDecimal minWidth = Util.roundOffTwoDecimal(flightPolyLine);
                                            if (minWidth.compareTo(Util.roundOffTwoDecimal(minimumWidth)) < 0) {
                                                valid = true;
                                            }
                                            String value = typicalFloorValues.get("typicalFloors") != null
                                                    ? (String) typicalFloorValues.get("typicalFloors")
                                                    : " floor " + floor.getNumber();

                                            if (valid) {
                                                setReportOutputDetailsFloorStairWise(pl, RULE39, value,
                                                        String.format(WIDTH_DESCRIPTION, generalStair.getNumber()),
                                                        EXPECTED_WIDTH, String.valueOf(minWidth),
                                                        Result.Not_Accepted.getResultVal(), scrutinyDetail2);
                                            } else {
                                                setReportOutputDetailsFloorStairWise(pl, RULE39, value,
                                                        String.format(WIDTH_DESCRIPTION, generalStair.getNumber()),
                                                        EXPECTED_WIDTH, String.valueOf(minWidth), Result.Accepted.getResultVal(),
                                                        scrutinyDetail2);

                                            }
                                        }
                                    } else {
                                        errors.put("Flight PolyLine width" + flightLayerName,
                                                FLIGHT_WIDTH_DEFINED_DESCRIPTION + flightLayerName);
                                        pl.addErrors(errors);
                                    }

                                    /**
                                     * (Total length of polygons in layer BLK_n_FLR_i_STAIR_k_FLIGHT) / (Number of rises - number
                                     * of polygons in layer BLK_n_FLR_i_STAIR_k_FLIGHT - number of lines in layer
                                     * BLK_n_FLR_i_STAIR_k_FLIGHT) shall not be more than 0.30 m
                                     */
                                    if (flightLengths != null && flightLengths.size() > 0) {
                                        try {
                                        	List<BigDecimal> lengths = new ArrayList<>();
                                        	for(List<BigDecimal> fl : flightLengths)
                                        		lengths.addAll(fl);
                                            BigDecimal totalLength = lengths.stream()
                                                    .reduce(BigDecimal.ZERO, BigDecimal::add);

                                            totalLength = Util.roundOffTwoDecimal(totalLength);

                                            if (generalStair.getFlights() != null && !generalStair.getFlights().isEmpty() && generalStair.getFlights().get(0).getNoOfRises() != null) {
                                            	BigDecimal rises = generalStair.getFlights().stream().map(Flight::getNoOfRises).reduce(BigDecimal.ZERO, BigDecimal::add);
                                                BigDecimal denominator = rises
                                                        .subtract(new BigDecimal(flightLengths.size()))
                                                        .subtract(new BigDecimal(generalStair.getLines().size()));

                                                BigDecimal minTread = totalLength.divide(denominator,
                                                        DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                                                        DcrConstants.ROUNDMODE_MEASUREMENTS);

                                                boolean valid = false;

                                                if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {

                                                    if (Util.roundOffTwoDecimal(minTread)
                                                            .compareTo(Util.roundOffTwoDecimal(BigDecimal.valueOf(0.30))) >= 0) {
                                                        valid = true;
                                                    }

                                                    String value = typicalFloorValues.get("typicalFloors") != null
                                                            ? (String) typicalFloorValues.get("typicalFloors")
                                                            : " floor " + floor.getNumber();

                                                    if (valid) {
                                                        setReportOutputDetailsFloorStairWise(pl, RULE39, value,
                                                                String.format(TREAD_DESCRIPTION, generalStair.getNumber()),
                                                                EXPECTED_TREAD, String.valueOf(minTread),
                                                                Result.Accepted.getResultVal(), scrutinyDetail3);
                                                    } else {
                                                        setReportOutputDetailsFloorStairWise(pl, RULE39, value,
                                                                String.format(TREAD_DESCRIPTION, generalStair.getNumber()),
                                                                EXPECTED_TREAD, String.valueOf(minTread),
                                                                Result.Not_Accepted.getResultVal(), scrutinyDetail3);
                                                    }
                                                }
                                            } else {
                                                String layerName = String.format(DxfFileConstants.LAYER_STAIR_FLOOR,
                                                        block.getNumber(), floor.getNumber(), generalStair.getNumber());
                                                errors.put("FLR_HT_M " + layerName,
                                                        edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                                                new String[] { HEIGHT_FLOOR_DESCRIPTION + layerName },
                                                                LocaleContextHolder.getLocale()));
                                                pl.addErrors(errors);
                                            }
                                        } catch (ArithmeticException e) {
                                            LOG.info("Denominator is zero");
                                        }
                                    } else {
                                        errors.put("Flight PolyLine length" + flightLayerName,
                                                FLIGHT_LENGTH_DEFINED_DESCRIPTION + flightLayerName);
                                        pl.addErrors(errors);
                                    }
                                    // }
                                } else {
                                    errors.put("Flight PolyLine " + flightLayerName,
                                            FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION + flightLayerName);
                                    pl.addErrors(errors);
                                }
                            }

                        }
                    }
                }

                if (floorSize > 4) {
                    if (noOfFireStair.add(generalStairCount)
                            .compareTo(Util.roundOffTwoDecimal(BigDecimal.valueOf(2))) >= 0) {
                        setReportOutputDetails(pl, RULE39, String.format(RULE39, block.getNumber()), "",
                                DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(), scrutinyDetail4);
                    } else {
                        setReportOutputDetails(pl, RULE39, String.format(RULE39, block.getNumber()),
                                "Minimum 2 General stair required",
                                DcrConstants.OBJECTNOTDEFINED_DESC, Result.Not_Accepted.getResultVal(), scrutinyDetail4);
                    }
                }

            }
        }
        return pl;
    }

    private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
            String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void setReportOutputDetailsFloorWise(Plan pl, String ruleNo, String floor, String expected, String actual,
            String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(FLOOR, floor);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void setReportOutputDetailsFloorStairWise(Plan pl, String ruleNo, String floor, String description,
            String expected, String actual, String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(FLOOR, floor);
        details.put(DESCRIPTION, description);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }

}
