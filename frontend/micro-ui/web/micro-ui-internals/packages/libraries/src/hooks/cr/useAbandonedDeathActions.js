import { useMutation } from "react-query";
import ApplicationAbandonedDeathUpdateActions from "../../services/molecules/CRABANDONEDDEATH/ApplicationAbandonedDeathUpdateActions";

const useAbandonedDeathActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationAbandonedDeathUpdateActions(applicationData, tenantId));
};

export default useAbandonedDeathActions;
