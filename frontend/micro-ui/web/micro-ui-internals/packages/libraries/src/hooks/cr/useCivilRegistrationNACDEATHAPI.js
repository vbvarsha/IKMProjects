import { CRNACDeathService } from "../../services/elements/CRNACDEATH";
import { useMutation } from "react-query";

const useCivilRegistrationNACDEATHAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRNACDeathService.create(data, tenantId));
} else {
  return useMutation((data) => CRNACDeathService.update(data, tenantId));
}
};

export default useCivilRegistrationNACDEATHAPI;
