import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Interests } from './interests.dto';

@ValidatorConstraint({ name: 'InterestsProps', async: false })
export class InterestsProps implements ValidatorConstraintInterface {
  validate(interests: Interests, args: ValidationArguments) {
    const interestsKeys = Object.keys(interests);
    return interestsKeys.includes('names') && interestsKeys.length === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'interests must contain a names key';
  }
}

@ValidatorConstraint({ name: 'InterestNamesIsArray', async: false })
export class InterestNamesIsArray implements ValidatorConstraintInterface {
  validate(interests: Interests, args: ValidationArguments) {
    const interestsKeys = Object.keys(interests);
    return Array.isArray(interests.names) && interests.names.every((k) => typeof k === 'string');
  }

  defaultMessage(args: ValidationArguments) {
    return 'interests names must contain a valid array of strings';
  }
}
