package org.ksmart.marriage.marriageapplication.web.model.marriage;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class WorkFlowCheck {
    private String WorkflowCode = null;
    private String ApplicationType = null;
    private Boolean payment = null;
    private Integer amount = 0;
    private Boolean active = null;
}
