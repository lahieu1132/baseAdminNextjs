import {ValidatorContextOptions} from "../class-validator";
import i18n from "i18next";

const validatorOptions: ValidatorContextOptions = {
  onErrorMessage: ({constraints}): string[] => {
    if (constraints) {
      const constraintsKeys = Object.keys(constraints);
      const firstError = constraintsKeys[0];
      return i18n.t(constraints[firstError]);
    }
    return [];
  },
  // onValidateError: (errors): void => {
  //   const firstError = errors[0].constraints;
  //   if (firstError) {
  //     const constraintsKeys = Object.keys(firstError);
  //     const message = i18n.t(firstError[constraintsKeys[0]]);
  //     notification.error({message});
  //   }
  // },
  resultType: "map",
};

export default validatorOptions;
