package org.egov.filemgmnt.service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.CommunicationFileManagementEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.CommunicationFileManagementRepository;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.validators.CommunicationFileManagementValidator;
import org.egov.filemgmnt.web.models.communication.CommunicationFile;
import org.egov.filemgmnt.web.models.communication.CommunicationFileRequest;
import org.egov.filemgmnt.web.models.communication.CommunicationFileSearchCriteria;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class CommunicationFileManagementService {

    private final CommunicationFileManagementValidator validator;
    private final CommunicationFileManagementEnrichment enrichmentService;
    private final CommunicationFileManagementRepository repository;
    private final Producer producer;
    private final MdmsUtil mdmsUtil;
    private final FMConfiguration fmConfig;

    // @Autowired
    CommunicationFileManagementService(CommunicationFileManagementValidator validator,
                                       CommunicationFileManagementEnrichment enrichmentService,
                                       CommunicationFileManagementRepository repository,
                                       @Qualifier("fmProducer") Producer producer, MdmsUtil mdmsUtil,
                                       FMConfiguration fmConfig) {

        this.validator = validator;
        this.enrichmentService = enrichmentService;
        this.repository = repository;
        this.producer = producer;
        this.mdmsUtil = mdmsUtil;
        this.fmConfig = fmConfig;
    }

    public List<CommunicationFile> create(CommunicationFileRequest request) {

        // enrich request
        enrichmentService.enrichCreate(request);

        producer.push(fmConfig.getSaveCommunicationFileTopic(), request);

        return request.getCommunicationFiles();

    }

    public List<CommunicationFile> update(CommunicationFileRequest request) {

//        List<String> ids = new LinkedList<>();
//        request.getCommunicationFiles()
//               .forEach(file -> ids.add(file.getId()));

        List<String> ids = request.getCommunicationFiles()
                                  .stream()
                                  .map(CommunicationFile::getId)
                                  .collect(Collectors.toCollection(LinkedList::new));

        // search database
        List<CommunicationFile> searchResult = repository.getCommunicationfiles(CommunicationFileSearchCriteria.builder()
                                                                                                               .ids(ids)
                                                                                                               .build());
        // validate request
        validator.validateUpdate(request, searchResult);

        enrichmentService.enrichUpdate(request);

        producer.push(fmConfig.getUpdateCommunicationFileTopic(), request);

        return request.getCommunicationFiles();
    }

    public List<CommunicationFile> search(CommunicationFileSearchCriteria criteria, RequestInfo requestInfo) {
        validator.validateSearch(requestInfo, criteria);

        List<CommunicationFile> result = null;
        if (CollectionUtils.isNotEmpty(criteria.getIds())) {
            result = repository.getCommunicationfiles(criteria);
        }

        return result;
    }

}
