import axios, { AxiosResponse } from 'axios';
import { toOrg, toUser } from './helpers';
import { FormData } from './FormData';

export const httpPostNonprofitSignup = (data: FormData): Promise<AxiosResponse<any, any>> => {
  const user = toUser(data);
  const organization = toOrg(data);
  const api = new URL(`http://localhost:3001/api/userOrganizations`);
  return axios.post(api.href, { organization, user });
};

export const httpGetValidateEin = (ein: string): Promise<AxiosResponse<any, any>> => {
  const url = new URL(`http://localhost:3001/api/organizations/ein/${ein}`);
  return axios.get(url.href);
};
