package org.ksmart.death.common.repository;

// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.stream.Collectors;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.apache.kafka.common.protocol.types.Field;
// import org.egov.tracer.model.ServiceCallException;
//  import org.ksmart.death.deathapplication.web.models.idgen.IdGenerationRequest;
//  import org.ksmart.death.deathapplication.web.models.idgen.IdGenerationResponse;
//  import org.ksmart.death.deathapplication.web.models.idgen.IdRequest;
//  import org.ksmart.death.deathapplication.web.models.idgen.IdResponse;
//  import org.ksmart.death.deathapplication.config.DeathConfiguration;
// import org.egov.common.contract.request.RequestInfo;
// import org.egov.tracer.model.CustomException;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Qualifier;
// import org.springframework.stereotype.Repository;
// import org.springframework.util.CollectionUtils;
// import org.springframework.web.client.HttpClientErrorException;
// import org.springframework.web.client.RestTemplate;

// @Repository
// public class IdGenRepository {

// 	@Autowired
//     private RestTemplate restTemplate;

// 	@Autowired
//     private DeathConfiguration config;

//     @Autowired
//     @Qualifier("objectMapperBnd")
//     private ObjectMapper mapper;

//     @Autowired
//     private ServiceRequestRepository restRepo;

//     public IdGenerationResponse getIdOld(RequestInfo requestInfo, String tenantId, String name, String format, int count) {

//         List<IdRequest> reqList = new ArrayList<>();
//         for (int i = 0; i < count; i++) {
//             reqList.add(IdRequest.builder().idName(name)
//                     //.format(format)
//                     .tenantId(tenantId).build());
//         }
//         IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
//         IdGenerationResponse response = null;
//         try {
//             response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
//         } catch (HttpClientErrorException e) {
//             throw new ServiceCallException(e.getResponseBodyAsString());
//         } catch (Exception e) {
//             Map<String, String> map = new HashMap<>();
//             map.put(e.getCause().getClass().getName(),e.getMessage());
//             throw new CustomException(map);
//         }
//         return response;
//     }

//     public IdGenerationResponse getId(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String  fnType, int count) {

//         List<IdRequest> reqList = new ArrayList<>();
//         for (int i = 0; i < count; i++) {
//             reqList.add(IdRequest.builder().idName(idName)
//                     .tenantId(tenantId)
//                     .moduleCode(moduleCode)
//                     .fnType(fnType)
//                     .build());
//         }
//         IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
//         IdGenerationResponse response = null;
//         try {
//             response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
//         } catch (HttpClientErrorException e) {
//             throw new ServiceCallException(e.getResponseBodyAsString());
//         } catch (Exception e) {
//             Map<String, String> map = new HashMap<>();
//             map.put(e.getCause().getClass().getName(),e.getMessage());
//             throw new CustomException(map);
//         }
//         return response;
//     }


//     public List<String> getIdListOld(RequestInfo requestInfo, String tenantId, String idName, String idformat, Integer count) {
//         List<IdRequest> reqList = new ArrayList<>();
//         for (int i = 0; i < count; i++) {
//             reqList.add(IdRequest.builder()
//                     .idName(idName)
//                    // .format(idformat)
//                     .tenantId(tenantId)
//                     .build());
//         }

//         IdGenerationRequest request = IdGenerationRequest.builder()
//                 .idRequests(reqList)
//                 .requestInfo(requestInfo)
//                 .build();
//         StringBuilder uri = new StringBuilder(config.getIdGenHost()).append(config.getIdGenPath());
//         IdGenerationResponse response = mapper.convertValue(restRepo.fetchResult(uri, request),
//                 IdGenerationResponse.class);

//         List<IdResponse> idResponses = response.getIdResponses();

//         if (CollectionUtils.isEmpty(idResponses)) {
//             throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
//         }

//         return idResponses.stream()
//                 .map(IdResponse::getId)
//                 .collect(Collectors.toList());
//     }

//     public List<String> getIdList(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String  fnType, int count) {
//         List<IdRequest> reqList = new ArrayList<>();
//         for (int i = 0; i < count; i++) {
//             reqList.add(IdRequest.builder()
//                     .idName(idName)
//                     .tenantId(tenantId)
//                     .moduleCode(moduleCode)
//                     .fnType(fnType)
//                     .build());
//         }

//         IdGenerationRequest request = IdGenerationRequest.builder()
//                 .idRequests(reqList)
//                 .requestInfo(requestInfo)
//                 .build();
//         StringBuilder uri = new StringBuilder(config.getIdGenHost()).append(config.getIdGenPath());
//         IdGenerationResponse response = mapper.convertValue(restRepo.fetchResult(uri, request),
//                 IdGenerationResponse.class);

//         List<IdResponse> idResponses = response.getIdResponses();

//         if (CollectionUtils.isEmpty(idResponses)) {
//             throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
//         }

//         return idResponses.stream()
//                 .map(IdResponse::getId)
//                 .collect(Collectors.toList());
//     }

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.common.Idgen.IdGenerationRequest;
import org.ksmart.death.common.Idgen.IdGenerationResponse;
import org.ksmart.death.common.Idgen.IdRequest;
import org.ksmart.death.common.Idgen.IdResponse;
import org.ksmart.death.config.BirthDeathConfiguration;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.egov.tracer.model.ServiceCallException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@Repository
public class IdGenRepository {

	@Autowired
    private RestTemplate restTemplate;

	@Autowired
    private BirthDeathConfiguration config;

    public IdGenerationResponse getId(RequestInfo requestInfo, String tenantId, String name, String format, int count) {

        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder().idName(name).format(format).tenantId(tenantId).build());
        }
        IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
        IdGenerationResponse response = null;
        try {
            response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
        } catch (HttpClientErrorException e) {
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            Map<String, String> map = new HashMap<>();
            map.put(e.getCause().getClass().getName(),e.getMessage());
            throw new CustomException(map);
        }
        return response;
    }
       //Jasmine  
    public List<String> getIdList(RequestInfo requestInfo, String tenantId, String idName, String moduleCode,String fnType, int count) {
        List<IdResponse> idResponses = getDeathIds(requestInfo, tenantId, idName, moduleCode, fnType, count).getIdResponses();

        if (CollectionUtils.isEmpty(idResponses))
        throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");

        return idResponses.stream()
        .map(IdResponse::getId).collect(Collectors.toList());
        }
    
    // public IdGenerationResponse getIdCorrection(RequestInfo requestInfo, String tenantId, String Idname, String functionType,  String modulecode,int count) {

    //     List<IdRequest> reqList = new ArrayList<>();
    //     for (int i = 0; i < count; i++) {
    //         reqList.add(IdRequest.builder().idName(Idname).moduleCode(modulecode).tenantId(tenantId).fnType(functionType).build());
    //     }
    //     IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
    //     IdGenerationResponse response = null;
    //     try {
    //         response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
    //     } catch (HttpClientErrorException e) {
    //         throw new ServiceCallException(e.getResponseBodyAsString());
    //     } catch (Exception e) {
    //         Map<String, String> map = new HashMap<>();
    //         map.put(e.getCause().getClass().getName(),e.getMessage());
    //         throw new CustomException(map);
    //     }
    //     return response;
    // }

       //Jasmine  
    public IdGenerationResponse getDeathIds(RequestInfo requestInfo, String tenantId, String Idname, String functionType,  String modulecode,int count) {

        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder().idName(Idname).moduleCode(modulecode).tenantId(tenantId).fnType(functionType).build());
        }
        IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
        IdGenerationResponse response = null;
        try {
            response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
        } catch (HttpClientErrorException e) {
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            Map<String, String> map = new HashMap<>();
            map.put(e.getCause().getClass().getName(),e.getMessage());
            throw new CustomException(map);
        }
        return response;
    }




}
