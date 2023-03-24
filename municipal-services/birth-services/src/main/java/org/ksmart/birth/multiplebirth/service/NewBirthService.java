package org.ksmart.birth.multiplebirth.service;

import org.ksmart.birth.birthcommon.model.demand.Demand;
import org.ksmart.birth.birthcommon.services.DemandService;
import org.ksmart.birth.multiplebirth.repository.NewBirthRepository;
import org.ksmart.birth.multiplebirth.validator.NewBirthApplicationValidator;
import org.ksmart.birth.utils.MdmsUtil;
import org.ksmart.birth.web.model.SearchCriteria;
import org.ksmart.birth.web.model.newbirth.NewBirthApplication;
import org.ksmart.birth.web.model.newbirth.NewBirthDetailRequest;
import org.ksmart.birth.workflow.WorkflowIntegratorNewBirth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.ksmart.birth.utils.BirthConstants.STATUS_FOR_PAYMENT;

@Service
public class NewBirthService {
    private final NewBirthRepository repository;
    private final WorkflowIntegratorNewBirth workflowIntegrator;
    private final MdmsUtil mdmsUtil;
    private final NewBirthApplicationValidator validator;
    private final DemandService demandService;

    @Autowired
    NewBirthService(NewBirthRepository repository, MdmsUtil mdmsUtil, WorkflowIntegratorNewBirth workflowIntegrator,
                    NewBirthApplicationValidator validator, DemandService demandService) {
        this.repository = repository;
        this.mdmsUtil = mdmsUtil;
        this.workflowIntegrator  = workflowIntegrator;
        this.validator = validator;
        this.demandService = demandService;
    }

    public List<NewBirthApplication> saveKsmartBirthDetails(NewBirthDetailRequest request) {
        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());

        // validate request
        validator.validateCreate(request, mdmsData);

        //call save
        List<NewBirthApplication> birthApplicationDetails =  repository.saveKsmartBirthDetails(request);

        //WorkFlow Integration
        workflowIntegrator.callWorkFlow(request);

        //Demand Creation
        birthApplicationDetails.forEach(birth->{
            if(birth.getApplicationStatus() == STATUS_FOR_PAYMENT){
                List<Demand> demands = new ArrayList<>();
                Demand demand = new Demand();
                demand.setTenantId(birth.getTenantId());
                demand.setConsumerCode(birth.getApplicationNo());
                demands.add(demand);
                birth.setDemands(demandService.saveDemandDetails(demands,request.getRequestInfo()));
            }
        });

        return birthApplicationDetails;
    }

    public List<NewBirthApplication> updateKsmartBirthDetails(NewBirthDetailRequest request) {
        workflowIntegrator.callWorkFlow(request);
        return repository.updateKsmartBirthDetails(request);
    }

    public List<NewBirthApplication> searchKsmartBirthDetails(NewBirthDetailRequest request, SearchCriteria criteria) {
        return repository.searchKsmartBirthDetails(request,criteria);
    }
}
