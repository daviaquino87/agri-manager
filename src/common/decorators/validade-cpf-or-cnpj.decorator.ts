import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPF, isCNPJ } from 'brazilian-values';

@ValidatorConstraint({ name: 'IsCPFOrCNPJ' })
export class IsCPFOrCNPJConstrain implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'string') return false;

    const isFormattedCPF =
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) && isCPF(value);
    const isFormattedCNPJ =
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value) && isCNPJ(value);

    return isFormattedCPF || isFormattedCNPJ;
  }

  defaultMessage(): string {
    return 'Ops! O CPF ou CNPJ informado é inválido ou está sem máscara.';
  }
}

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCPFOrCNPJConstrain,
    });
  };
}
