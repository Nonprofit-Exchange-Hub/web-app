import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserInterests } from './create-user.dto';

@ValidatorConstraint({ name: 'UserInterestsProps', async: false })
export class UserInterestsProps implements ValidatorConstraintInterface {
  validate(interests: UserInterests, args: ValidationArguments) {
    const interestsKeys = Object.keys(interests);
    return interestsKeys.includes('names') && interestsKeys.length === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'interests must contain a names key';
  }
}

@ValidatorConstraint({ name: 'UserInterestNamesIsArray', async: false })
export class UserInterestNamesIsArray implements ValidatorConstraintInterface {
  validate(interests: UserInterests, args: ValidationArguments) {
    const interestsKeys = Object.keys(interests);
    return Array.isArray(interests.names) && interests.names.every((k) => typeof k === 'string');
  }

  defaultMessage(args: ValidationArguments) {
    return 'interests names must contain a valid array of strings';
  }
}
