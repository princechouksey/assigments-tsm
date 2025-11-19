import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // metdata contains information about the argument being validated (metatype, type, data);

    const { metatype } = metadata;

    // Skip validation if it's not a class (like String, Boolean, etc.)
    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    // Convert plain object to DTO instance
    const object = plainToInstance(metatype, value);

    // ✅ Perform validation
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints ?? {}))
        .flat();

      throw new UnprocessableEntityException({
        message: 'Validation failed',
        errors: messages,
      });
    }

    // Return the validated object to controller
    return object;
  }

  private shouldValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
