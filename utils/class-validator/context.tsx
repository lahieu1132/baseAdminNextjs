/* eslint-disable */
import {ValidationError} from "class-validator";
import React, {createContext, FunctionComponent} from "react";

export type ValidatorResultType = "map" | "boolean";

export type OnErrorMessageHandler = (error: ValidationError) => string[];
export type OnValidateErrorHandler = (error: ValidationError[]) => void;
export type ValidatorContextOptions = {
  onValidateError?: OnValidateErrorHandler;
  onErrorMessage?: OnErrorMessageHandler;
  resultType?: ValidatorResultType;
};

// @ts-ignore
// prettier-ignore
const defaultOnErrorMessage: OnErrorMessageHandler = (error) => (Object.keys(error.constraints).map((key) => error.constraints[key]));

// @ts-ignore
// prettier-ignore
const defaultOnValidateError: OnValidateErrorHandler = (error) => {};

const _getDefaultContextOptions = (): ValidatorContextOptions => ({
  onErrorMessage: defaultOnErrorMessage,
  resultType: "boolean",
});

export const ValidatorContext = createContext<ValidatorContextOptions | null>(
  null
);

export const ValidatorProvider: FunctionComponent<{
  options?: ValidatorContextOptions;
  children?: React.ReactNode;
}> = ({options = _getDefaultContextOptions(), children}) => (
  <ValidatorContext.Provider
    value={{
      onValidateError: options.onValidateError || defaultOnValidateError,
      onErrorMessage: options.onErrorMessage || defaultOnErrorMessage,
      resultType: options.resultType || "boolean",
    }}
  >
    {children}
  </ValidatorContext.Provider>
);
