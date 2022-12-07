import * as Yup from 'yup';

export const urlSchema = Yup.object().shape({
  url: Yup.string().url().nullable(),
});

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  location: Yup.string(),
  description: Yup.string(),
  category: Yup.string(),
  condition: Yup.string(),
  quantity: Yup.string(),
  needType: Yup.string(),
  deliveryMethod: Yup.string(),
  imgUrls: Yup.array(),
});
