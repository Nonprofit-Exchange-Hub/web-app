/* eslint-disable @typescript-eslint/no-unused-vars */
// this eslint rule is disabled because the number of arguments changes the method signature
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Interests } from './interests.dto';

@ValidatorConstraint({ name: 'InterestsProps', async: false })
export class InterestsProps implements ValidatorConstraintInterface {
  validate(interests: Interests, _args: ValidationArguments) {
    const interestsKeys = Object.keys(interests);
    return interestsKeys.includes('names') && interestsKeys.length === 1;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'interests must contain a names key';
  }
}

@ValidatorConstraint({ name: 'InterestNamesIsArray', async: false })
export class InterestNamesIsArray implements ValidatorConstraintInterface {
  validate(interests: Interests, _args: ValidationArguments) {
    return Array.isArray(interests.names) && interests.names.every((k) => typeof k === 'string');
  }

  defaultMessage(_args: ValidationArguments) {
    return 'interests names must contain a valid array of strings';
  }
}
