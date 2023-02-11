package org.ksmart.death.deathregistry.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;

/*
     * Creates main model class  
     * Jasmine on 7.02.2023      
*/

@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryFamilyInfo {


    @JsonProperty("SpouseUnavailable")
    private Integer spouseUnavailable ;

    @JsonProperty("SpouseType")
    private String spouseType ;

    @JsonProperty("SpouseNameEn")
    private String spouseNameEn ;

    @JsonProperty("SpouseNameML")
    private String spouseNameML ;

    @JsonProperty("FatherUnavailable")
    private Integer fatherUnavailable ;

    @JsonProperty("FatherNameEn")
    private String fatherNameEn ;

    @JsonProperty("FatherNameMl")
    private String fatherNameMl ;

    @JsonProperty("MotherUnavailable")
    private Integer motherUnavailable;
    
    @JsonProperty("MotherNameEn")
    private String motherNameEn;
    
    
    @JsonProperty("MotherNameMl")
    private String motherNameMl;
    
    
    @JsonProperty("FamilyMobileNo")
    private Long familyMobileNo;
    
    @JsonProperty("FamilyEmailId")
    private String familyEmailId;

    //Rakhi S on 08.02.2023
    @Size(max = 12)
    @JsonProperty("SpouseAadhaar")
    private String spouseAadhaar;
    
    @Size(max = 12)
    @JsonProperty("FatherAadharNo")
    private String fatherAadharNo;

    @Size(max = 12)
    @JsonProperty("MotherAadharNo")
    private String MotherAadharNo;
      
}
