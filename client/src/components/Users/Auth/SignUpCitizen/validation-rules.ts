import * as Yup from 'yup';
import { interests } from './interests';

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
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string()
    .required('Required')
    .min(5, 'Zipcode is too short - should be 5 digits minimum.'),
  interests: Yup.string().required('Required').not(['Select classification']).oneOf(interests),
  image_url: Yup.string()
    .matches(/https:\/\/\S+.(jpeg|jpg|png|svg)/, 'Please use a valid image url')
    .required('Required'),
  aboutyourself: Yup.string().required('Required'),
});
