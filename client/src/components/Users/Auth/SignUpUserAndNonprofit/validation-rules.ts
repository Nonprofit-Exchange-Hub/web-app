import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import { FormData } from './FormData';
import * as Yup from 'yup';
import { classifications } from './Classifications';
import { US_STATE_ABBREVIATIONS } from '../../../../configs';

export const validationSchema = Yup.object().shape({
  doing_business_as: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string()
    .required('Required')
    .oneOf(US_STATE_ABBREVIATIONS, 'Please enter a valid US state e.g., WA'),
  ein: Yup.string()
    .matches(/^[0-9]\d?-\d{7}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  name: Yup.string(),
  description: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/\d{3}-\d{3}-\d{4}/, 'Phone number must match 999-999-9999')
    .required('Required'),
  nonprofit_classification: Yup.string()
    .required('Required')
    .not(['Select classification'])
    .oneOf(Object.values(classifications.map((x) => x.text))),
  firstName: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  role_or_title: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  accept_terms: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
  image_url: Yup.string()
    .matches(/https:\/\/\S+.(jpeg|jpg|png|svg)/, 'Please use a valid image url')
    .required('Required'),
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
