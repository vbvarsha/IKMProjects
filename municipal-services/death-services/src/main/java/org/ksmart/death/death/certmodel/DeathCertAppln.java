
package org.ksmart.death.death.certmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathCertAppln {

	private String applicationCategory;
	
	private String applicationType;
	
	private String applicationNumber;

	private String applicationDate;

	private String regNo;

	private String name;

	private String status;
	
	private String tenantId;

	private String fileStoreId;
}
