package org.egov.filemgmnt.util;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.egov.filemgmnt.web.models.idgen.IdGenerationRequest;
import org.egov.filemgmnt.web.models.idgen.IdGenerationResponse;
import org.egov.filemgmnt.web.models.idgen.IdRequest;
import org.egov.filemgmnt.web.models.idgen.IdResponse;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class IdgenUtil {

    @Value("${egov.idgen.host}")
    private String idGenHost;

    @Value("${egov.idgen.path}")
    private String idGenPath;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private ServiceRequestRepository restRepo;

    public List<String> getIdList(final RequestInfo requestInfo, final String tenantId, final String idName,
                                  final String idformat, final Integer count) {
        final List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder()
                                 .idName(idName)
                                 .format(idformat)
                                 .tenantId(tenantId)
                                 .build());
        }

        final IdGenerationRequest request = IdGenerationRequest.builder()
                                                               .idRequests(reqList)
                                                               .requestInfo(requestInfo)
                                                               .build();

        System.out.println("request " + request);

        final StringBuilder uri = new StringBuilder(idGenHost).append(idGenPath);
        final IdGenerationResponse response = mapper.convertValue(restRepo.fetchResult(uri, request),
                                                                  IdGenerationResponse.class);

        final List<IdResponse> idResponses = response.getIdResponses();

        if (CollectionUtils.isEmpty(idResponses)) {
            throw new CustomException(IDGEN_ERROR.getCode(), "No ids returned from idgen Service");
        }

        return idResponses.stream()
                          .map(IdResponse::getId)
                          .collect(Collectors.toList());
    }
}