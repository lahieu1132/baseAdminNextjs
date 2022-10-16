import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function IsNotBlank(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNotBlankConstraint,
    });
  };
}

@ValidatorConstraint({name: "IsNotBlank"})
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === "string" && value.trim().length > 0;
  }
}
