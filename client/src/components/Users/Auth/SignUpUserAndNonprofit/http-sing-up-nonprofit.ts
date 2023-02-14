import axios, { AxiosResponse } from 'axios';
import { toOrg, toUser } from './helpers';
import { FormData } from './FormData';
import { APP_API_BASE_URL } from '../../../../configs';

export const httpPostNonprofitSignup = (data: FormData): Promise<AxiosResponse<any, any>> => {
  const user = toUser(data);
  const organization = toOrg(data);
  const USER_ORGS_API_URL = `${APP_API_BASE_URL}/userOrganizations`;
  const api = new URL(USER_ORGS_API_URL);
  return axios.post(api.href, { organization, user });
};

export const httpGetValidateEin = (ein: string): Promise<AxiosResponse<any, any>> => {
  const ORGS_API_URL = `${APP_API_BASE_URL}/organizations`;
  const url = new URL(`${ORGS_API_URL}/ein/${ein}`);
  return axios.get(url.href);
};
