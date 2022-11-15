import { FormData } from './FormData';

export const toUser = (
  formData: FormData,
): { email: string; password: string; firstName: string; last_name: string } => {
  const { email, password, firstName, last_name } = formData;
  return {
    email,
    password,
    firstName,
    last_name,
  };
};

export const toOrg = (
  formData: FormData,
): {
  name: string;
  doing_business_as: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  ein: string;
  nonprofit_classification: string;
  image_url: string;
} => {
  const {
    name,
    doing_business_as,
    description,
    website,
    address,
    phone,
    city,
    state,
    ein,
    nonprofit_classification,
    image_url,
  } = formData;
  return {
    name,
    doing_business_as,
    description,
    website,
    address,
    phone,
    city,
    state,
    ein,
    nonprofit_classification,
    image_url,
  };
};
