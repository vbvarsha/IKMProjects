package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class TravelDistanceToExitExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(TravelDistanceToExitExtract.class);
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail extract(PlanDetail pl) {
        if (LOG.isDebugEnabled())
            LOG.debug("Starting of Travel Distance To Exit Extract......");
        if (pl != null) {
            String layerName = layerNames.getLayerName("LAYER_NAME_TRAVEL_DIST_TO_EXIT");
            List<BigDecimal> travelDistanceDimensions = Util.getListOfDimensionValueByLayer(pl, layerName);
            if (!travelDistanceDimensions.isEmpty())
                pl.setTravelDistancesToExit(travelDistanceDimensions);
        }
        if (LOG.isDebugEnabled())
            LOG.debug("Starting of Travel Distance To Exit Extract......");
        return pl;
    }

    @Override
    public PlanDetail validate(PlanDetail pl) {
        return pl;
    }
    
	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
