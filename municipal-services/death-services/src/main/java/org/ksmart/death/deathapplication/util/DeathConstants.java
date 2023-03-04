package org.ksmart.death.deathapplication.util;
/**
     * Creates DeathConstants
     * Rakhi S IKM
     * on 08.02.2023
     */
public class DeathConstants {
    public static final String TENANTS = "tenants";
    public static final String TENANT_MODULE_NAME = "tenant";    

    public static final String GENDERTYPE = "GenderType";
    public static final String COMMON_MASTER_MODULE_NAME = "common-masters";

    public static final String BND_MODULE_NAME = "birth-death-service";
    public static final String HOSPITAL_LIST = "HospitalMaster";
    public static final String DEATH_PLACE = "PlaceMaster";    
    public static final String DEATH_CAUSE_MAIN = "DeathCause";
    public static final String DEATH_CAUSE_SUB = "DeathCauseSub";
    public static final String MALE_DEPENDENT_TYPE = "MaleDependentType";
    public static final String FEMALE_DEPENDENT_TYPE = "FemaleDependentType";   
    public static final String AGE_UNIT = "AgeUnit"; 
    public static final String MEDICAL_ATTENTION_TYPE = "MedicalAttentionType"; 
    public static final String PROFESSION = "Profession";

    //mdms path codes
    public static final String COMMON_MASTER_JSONPATH = "$.MdmsRes.common-masters";
    public static final String TENANT_JSONPATH = "$.MdmsRes.tenant";
    public static final String BND_LIST_JSONPATH = "$.MdmsRes.birth-death-service";

    //error constants
    public static final String INVALID_TENANT_ID_MDMS_KEY = "INVALID TENANTID";
    public static final String INVALID_TENANT_ID_MDMS_MSG = "No data found for this tenantID";

    //mdms tenantId
    public static final String MDMS_TENANTID = "kl";
    //workflow
    public static final String BUSINESS_SERVICE_BND = "NewDeath";

    public static final String TENANTIDKEY = "tenantId";

    public static final String BUSINESSSERVICEKEY = "businessService";

    public static final String ACTIONKEY = "action";

    public static final String COMMENTKEY = "comment";

    public static final String MODULENAMEKEY = "moduleName";

    public static final String BUSINESSIDKEY = "businessId";

    public static final String DOCUMENTSKEY = "documents";

    public static final String ASSIGNEEKEY = "assignees";

    public static final String UUIDKEY = "uuid";

    public static final String BNDMODULENAMEVALUE = "death-services";

    public static final String WORKFLOWREQUESTARRAYKEY = "ProcessInstances";

    public static final String REQUESTINFOKEY = "RequestInfo";

    public static final String PROCESSINSTANCESJOSNKEY = "$.ProcessInstances";

    public static final String BUSINESSIDJOSNKEY = "$.businessId";

    public static final String STATUSJSONKEY = "$.state.applicationStatus";

    public static final String TRIGGER_NOWORKFLOW = "NOWORKFLOW";

    public static final String DEATH_PLACE_HOSPITAL = "HOSPITAL";

    public static final String DEATH_PLACE_INSTITUTION = "INSTITUTION";

    public static final String DEATH_PLACE_HOME = "HOME";

    public static final String DEATH_PLACE_VEHICLE = "VEHICLE";

    public static final String DEATH_PLACE_OTHER = "OTHER";

    public static final Integer VALUE_TRUE = 1;

    public static final Integer VALUE_FALSE = 0;

    public static final String VALUE_NULL = "NULL";

    public static final String ADDRESS_INSIDE_LB = "ILB";

    public static final String ADDRESS_INSIDE_KERALA = "IK";

    public static final String ADDRESS_INSIDE_INDIA = "IIN";

    public static final String ADDRESS_OUTSIDE_INDIA = "OIN";

    public static final String WORKFLOW_STATUS_APPROVED = "APPROVED";

    public static final String APPLICATION_NEW = "new";
    
    public static final String APPLICATION_CORRECTION = "corr";

    public static final String LB_TYPE_CORPORATION = "LB_TYPE_CORPORATION";

    public static final String LB_TYPE_MUNICIPALITY = "LB_TYPE_MUNICIPALITY";

    public static final String LB_TYPE_CORPORATION_CAPTION = "C";

    public static final String LB_TYPE_MUNICIPALITY_CAPTION = "M";

    public static final String STATE_CODE= "KL";
    //ACKNumber
    public static final String ACK_NUMBER_FIRST = "1";

    public static final String ACK_NUMBER_CAPTION = "AK";

    public static final String DEATH_PLACE_LIST = "PlaceMasterDeath";
    //Rakhi S on 14.02.2023
    public static final String DISTRICT = "District";

    public static final String STATE = "State";

    public static final String COUNTRY = "Country";

    public static final String RELIGION = "Religion";
    //Jasmine 1402.2023
    public static final String DEATH_PLACE_PUBLICPLACES = "PUBLIC_PLACES";

    public static final String DEATH_PLACE_OUTSIDE_JURISDICATION = "OUTSIDE_JURISDICTION";

    public static final String REG_UNIT_CAPTION = "RG";

    public static final String FUN_MODULE_NEWAPPLN= "CRDRNR";

    // public static final String FUN_MODULE_CORRECTION = "BFIFLN";

    // public static final String DEATH_REGNO_UID= "CRDRNR";
    public static final String COUNTRY_CODE = "COUNTRY_INDIA";
    public static final String STATE_CODE_SMALL = "kl";

    //Rakhi S on 02.03.2023
    public static final String TENANT_EGOV_LOCATION= "egov-location";
    public static final String EGOV_LOCATION_JSONPATH = "$.MdmsRes.egov-location";

}
