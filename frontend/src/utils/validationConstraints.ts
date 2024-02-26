import { ValidationOptions, registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function ValidateByFunction (property: (value: any, o: any) => boolean, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "validateByFunction",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: ValidateByFunctionConstraint,
    })
  };
}

@ValidatorConstraint({ name: 'validateByFunction', async: false })
export class ValidateByFunctionConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [property] = args.constraints;
    return property(value, args.object);
  }
}