import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPFOrCNPJ } from 'brazilian-values';

@ValidatorConstraint({ name: 'IsNotBlank' })
export class IsCPFOrCNPJContrain implements ValidatorConstraintInterface {
  validate(value: any) {
    return isCPFOrCNPJ(value);
  }

  defaultMessage(): string {
    return 'Ops! o documento informado está inválido.';
  }
}

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCPFOrCNPJContrain,
    });
  };
}
