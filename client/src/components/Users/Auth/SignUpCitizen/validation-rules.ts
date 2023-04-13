import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import * as Yup from 'yup';
// import { FormData } from './FormData';
import { US_STATE_ABBREVIATIONS } from '../../../../configs';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
  accept_terms: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
  email_notification_opt_out: Yup.boolean(),
  city: Yup.string().required('Required'),
  state: Yup.string()
    .required('Required')
    .oneOf(US_STATE_ABBREVIATIONS, 'Please enter a valid US state e.g., WA'),
});

/**
 * Custom implementation of form validity
 * @returns true when all fields have a value and no errors exist
 */
export const calculateIsValid = (
  errors: FieldErrorsImpl<DeepRequired<FormData>>,
  vals: FormData,
): boolean => {
  const errVals = Object.values(errors);
  const valsAsStringArr = Object.values(vals);
  return (
    errVals.every((x) => x === undefined) &&
    valsAsStringArr.length === 17 &&
    valsAsStringArr.every((s) => !!s)
  );
};
