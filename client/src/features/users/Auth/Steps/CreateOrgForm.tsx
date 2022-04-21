import { Button, FormHelperText, Grid, Typography } from '@material-ui/core';

import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Select, TextField } from '../../../../assets/sharedComponents/Forms';
import { Organization } from '../../../../types';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import SimpleSnackbar from '../../../action/assets/SimpleSnackbar';

const classifications = [
  { value: 'charitable', text: 'Charitable Organization' },
  { value: 'religious', text: 'Religious Organization' },
  { value: 'private', text: 'Private Foundation' },
  { value: 'political', text: 'Political Organizations' },
  { value: 'other', text: 'Other' },
];

const initialOrgData: Organization = {
  name: 'initial name',
  doing_business_as: 'blah',
  city: 'seattle',
  state: 'wa',
  ein: '91-1206728',
  description: 'very cool',
  website: 'ww.google.com',
  address: '123 fake ave',
  phone: '123-133-1234',
  nonprofit_classification: 'Charitable Organization',
};

const SignupSchema = Yup.object().shape({
  doing_business_as: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required').min(2).max(2),
  ein: Yup.string()
    .matches(/^[1-9]\d?-\d{7}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  nonprofit_classification: Yup.string().min(2).required('Required'),
});

interface Props {
  triggerNextStep: (step: number) => void;
  setNewOrgId: (createdOrgId: number) => void;
  classes: ClassNameMap<any>;
}
// ! TODO: set the new org id in state and don't rePOST if user goes back a step and then bak to 2nd step
// ! TODO don't send invalid ein to propublic api
const CreateOrgForm = ({ setNewOrgId = () => {}, triggerNextStep = () => {}, classes }: Props) => {
  const [org, setOrg] = React.useState<Organization>(initialOrgData);
  const [triggerEinSearch, setTriggerEinSearch] = React.useState<boolean>(false);

  const orgCreateMutation = useMutation<AxiosResponse<any, any>, Error, Organization, Error>(
    (newOrg: Organization) => {
      return axios.post(`http://localhost:3001/api/organizations`, newOrg);
    },
    {
      onSuccess: (data: any) => {
        triggerNextStep(1);
        console.log('new org', (data as any).data);
        setNewOrgId((data as any).data.id);
      },
    },
  );

  const orgValidateEinQuery = useQuery<AxiosResponse<any, any>, unknown, unknown, string[]>({
    queryKey: ['orgValidateEinQuery', org.ein],
    queryFn: ({ queryKey }) => {
      const [_key, ein] = queryKey;
      console.log(_key);
      return axios.get(`http://localhost:3001/api/organizations/ein/${ein}`);
    },
    enabled: triggerEinSearch,
    onSuccess: () => {
      setTriggerEinSearch(false);
    },
    retry: 0,
  });

  const handleNext = (
    isValid: boolean,
    errors: FormikErrors<Organization>,
    values: Organization,
  ) => {
    // console.log(values, 'values');
    setTriggerEinSearch(true);
    setOrg(values);

    console.log((orgValidateEinQuery.data as any).data);
    orgCreateMutation.mutate({ ...org, name: (orgValidateEinQuery.data as any).data.name });
  };

  return (
    <React.Fragment>
      {orgCreateMutation.isLoading ? (
        <SimpleSnackbar message={`Creating Organization`} />
      ) : (
        <>
          {orgCreateMutation.isError && (
            <SimpleSnackbar message={`An error occurred ${orgCreateMutation.error}`} />
          )}

          {orgCreateMutation.isSuccess && <SimpleSnackbar message={`Organization created`} />}
        </>
      )}
      <Formik
        initialValues={initialOrgData}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          setFieldTouched,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item>
                <Typography component="p" align="left">
                  Step 1: About your organization
                </Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="doing_business_as"
                  label="Organization Name"
                  placeholder="Organization"
                  value={values.doing_business_as}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('doing_business_as')}
                  errorText={
                    touched.doing_business_as && errors.doing_business_as
                      ? errors.doing_business_as
                      : ''
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="description"
                  label="Organization Description"
                  placeholder="Description"
                  isMultiline={true}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('description')}
                  errorText={touched.description && errors.description ? errors.description : ''}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="address"
                  label="Address"
                  placeholder="Address"
                  isMultiline={true}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('address')}
                  errorText={touched.address && errors.address ? errors.address : ''}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="city"
                  label="City"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('city')}
                  errorText={touched.city && errors.city ? errors.city : ''}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="state"
                  label="State"
                  placeholder="State"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('state')}
                  errorText={touched.state && errors.state ? errors.state : ''}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="phone"
                  label="Phone"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('phone')}
                  errorText={touched.phone && errors.phone ? errors.phone : ''}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="website"
                  label="Website"
                  placeholder="Website"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={(e) => setFieldTouched('website')}
                  errorText={touched.website && errors.website ? errors.website : ''}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="ein"
                  label="Entity Identification Number (EIN)"
                  placeholder="EIN: 99-9999999"
                  value={values.ein}
                  onChange={handleChange}
                  onKeyUp={() => {
                    setTriggerEinSearch(true);
                    setOrg(values);
                  }}
                  onBlur={(e) => setFieldTouched('ein')}
                  errorText={touched.ein && errors.ein ? errors.ein : ''}
                />
                {orgValidateEinQuery.isLoading ? (
                  <FormHelperText error>Checking EIN</FormHelperText>
                ) : (
                  <>
                    {orgValidateEinQuery.isError && (
                      <FormHelperText error>{`Invalid EIN ${
                        orgValidateEinQuery.error === 404 ? ': Not found' : ''
                      }`}</FormHelperText>
                    )}

                    {orgValidateEinQuery.isSuccess && (
                      <FormHelperText>EIN is valid!</FormHelperText>
                    )}
                  </>
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <Select
                  id="nonprofit_classification"
                  label="IRS Nonprofit Organization Classification"
                  placeholder="Select classification"
                  options={classifications}
                  value={values.nonprofit_classification}
                  onChange={handleChange}
                />
                <FormHelperText error>
                  {errors.nonprofit_classification ? errors.nonprofit_classification : ''}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <Button
                  onClick={() => handleNext(isValid, errors, values)}
                  disabled={!isValid || orgValidateEinQuery.isLoading}
                  className={classes.button}
                  fullWidth
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CreateOrgForm;
