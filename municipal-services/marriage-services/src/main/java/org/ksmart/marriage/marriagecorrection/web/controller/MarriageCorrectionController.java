package org.ksmart.marriage.marriagecorrection.web.controller;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionResponse;
import org.ksmart.marriage.marriagecorrection.service.MarriageCorrectionService;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/marriagedetails")
public class MarriageCorrectionController {


    private final MarriageCorrectionService marriageCorrectionService;

    private final ResponseInfoFactory responseInfoFactory;

    public MarriageCorrectionController(MarriageCorrectionService marriageCorrectionService, ResponseInfoFactory responseInfoFactory) {
        this.marriageCorrectionService = marriageCorrectionService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @PostMapping("/_createmarriagecorrection")
    public ResponseEntity<MarriageCorrectionResponse> create(@RequestBody MarriageCorrectionRequest request) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {

        List<MarriageCorrectionDetails> marriageCorrectionDetailsList = marriageCorrectionService.createCorrection(request);
        MarriageCorrectionResponse response = MarriageCorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .marriageCorrectionDetails(marriageCorrectionDetailsList)
                .build();
        return ResponseEntity.ok(response);
    }



    @PostMapping(value = { "/_updatemarriagecorrection"})
    public ResponseEntity<MarriageCorrectionResponse> registryUpdate(@RequestBody MarriageCorrectionRequest request) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        
        List<MarriageCorrectionDetails> marriageapplnDetails = marriageCorrectionService.updateMarriageCorrectionDetails(request);

        //Updating Marriage registry if Registrar Approved
        if(request.getMarriageCorrectionDetails().get(0).getStatus().equals(MarriageConstants.WORKFLOW_STATUS_APPROVED) && (request.getMarriageCorrectionDetails().get(0).getApplicationtype().equals(MarriageConstants.APPLICATION_CORRECTION))) {

            List<MarriageCorrectionDetails> marriageCorrectionDetailsList = marriageCorrectionService.updateMarriageRegistry(request);

        }
        MarriageCorrectionResponse response = MarriageCorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .marriageCorrectionDetails(request.getMarriageCorrectionDetails())
                .build();
        return ResponseEntity.ok(response);
    }


//    @PostMapping(value = {"/searchmarriagecorrection"})
//    public ResponseEntity<MarriageCorrectionResponse> searchKsmartBirth(@RequestBody MarriageCorrectionRequest request, @Valid @ModelAttribute MarriageApplicationSearchCriteria criteria) {
//        List<MarriageApplicationDetails> marriageCorrectionAplnDetails=marriageCorrectionService.searchCorrectionDetails(request, criteria);
//        MarriageCorrectionResponse response=MarriageCorrectionResponse.builder()
//                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
//                .marriageDetails(marriageCorrectionAplnDetails)
//                .build();
//        return ResponseEntity.ok(response);
//    }
}
