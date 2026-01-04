import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { SendOtpRequest } from "../../modules/auth/dto";

@ValidatorConstraint({ name: "IdentifierValidator", async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
  public validate(
    value: unknown,
    validationArguments: ValidationArguments,
  ): Promise<boolean> | boolean {
    const object = validationArguments.object as SendOtpRequest;

    if (object.type === "email") {
      return (
        typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      );
    } else if (object.type === "phone") {
      return typeof value === "string" && /^\+?\d{10,15}$/.test(value);
    }

    return false;
  }

  public defaultMessage?(validationArguments: ValidationArguments): string {
    const object = validationArguments.object as SendOtpRequest;

    if (object.type === "email") return "identifier must be a valid email";
    if (object.type === "phone")
      return "identifier must be a valid phone number";

    return "Invalid identifier";
  }
}
