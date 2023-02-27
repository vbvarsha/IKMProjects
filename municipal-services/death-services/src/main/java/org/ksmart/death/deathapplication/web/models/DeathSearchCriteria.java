package org.ksmart.death.deathapplication.web.models;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
     * Creates 
     * Jasmine
     * on  06/03/2023
     */
    
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathSearchCriteria {
    
    @JsonProperty("TenantId")
    private String tenantId;

    @JsonProperty("Id")
    private String id;

    @JsonProperty("DeceasedAadharNumber")
    private String deceasedAadharNumber;

    @JsonProperty("DateOfDeath")
    private Long DateOfDeath;


    @JsonProperty("registrationNo")
    private String registrationNo;

    // @JsonProperty("deathApplicationNo")
    // private String deathApplicationNo;

    @JsonProperty("DeathACKNo")
    private String deathACKNo;

    @JsonProperty("DeceasedFirstNameEn")
    private String deceasedFirstNameEn;

    @JsonProperty("DeathPlaceType")
    private String hospitalName;

    @JsonProperty("DeathPlaceWardId")
    private String deathPlaceWardId;

    @JsonProperty("DeathPlaceInstId")
    private String deathPlaceInstId;

    //Rakhi S on 22.02.2023
    @JsonProperty("fromDate")
    private Long fromDate;

    @JsonProperty("toDate")
    private Long toDate;

    
    //Rakhi S on 27.02.2023
   	
    public enum SourceEnum {
    	sms("sms"),
        
        email("email"),
        
        ivr("ivr"),
        
        mobileapp("mobileapp"),
        
        whatsapp("whatsapp"),
        
        csc("csc"),
        
        web("web");

        private String value;

        SourceEnum(String value) {
          this.value = value;
        }

        @Override
        public String toString() {
          return String.valueOf(value);
        }

        public static SourceEnum fromValue(String text) {
          for (SourceEnum b : SourceEnum.values()) {
            if (String.valueOf(b.value).equals(text)) {
              return b;
            }
          }
          return null;
        }
      }
    private SourceEnum source;
	
	@Valid
	private Integer offset;

  	@Valid
	private Integer limit;
}
