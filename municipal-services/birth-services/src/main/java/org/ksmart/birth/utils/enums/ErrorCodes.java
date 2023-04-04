package org.ksmart.birth.utils.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCodes {

    // Birth Details
    BIRTH_DETAILS_REQUIRED("REQUIRED"),
    BIRTH_DETAILS_NOT_FOUND("NOT_FOUND"),
    BIRTH_DETAILS_INVALID_SEARCH_CRITERIA("INVALID_CRITERIA"),
    BIRTH_DETAILS_INVALID_UPDATE("INVALID_UPDATE"),
    MDMS_DATA_ERROR("MDMS_DATA_ERROR"),
    INVALID_SEARCH("INVALID_SEARCH"),
    // Idgen Service
    IDGEN_ERROR("IDGEN_ERROR"),

    MDMS_INVALID_TENANT_ID("MDMS_INVALID_TENANTID"),

    // Wrrkflow Service
    WORKFLOW_ERROR("WORKFLOW_ERROR"),
    WORKFLOW_ERROR_KEY_NOT_FOUND("WORKFLOW_ERROR_KEY_NOT_FOUND"),

    // Common
    REQUIRED("REQUIRED"),
    NOT_FOUND("NOT_FOUND"),
    INVALID_CREATE("INVALID_CREATE"),
    INVALID_UPDATE("INVALID_UPDATE"),
    ILLEGAL_ARGUMENT("BIRTH_ILLEGAL_ARGUMENT"),
    INVALID_TENANT_ID("INVALID_TENANT_ID"),
    INVALID_INPUT("INVALID_INPUT"),
    ROW_MAPPER_ERROR("ROW-MAPPER_ERROR");

    private String code;



}
