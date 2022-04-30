import { Button, FormHelperText, Grid, LinearProgress, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Select, TextField } from '../../../../assets/sharedComponents/Forms';
import { Organization } from '../../../../types';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import SimpleSnackbar from '../../../action/assets/SimpleSnackbar';
import { green } from '@material-ui/core/colors';

const classifications = [
  { value: 'charitable', text: 'Charitable Organization' },
  { value: 'religious', text: 'Religious Organization' },
  { value: 'private', text: 'Private Foundation' },
  { value: 'political', text: 'Political Organizations' },
  { value: 'other', text: 'Other' },
];

const SignupSchema = Yup.object().shape({
  doing_business_as: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required').min(2).max(2),
  ein: Yup.string()
    .matches(/^[1-9]\d?-\d{7}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  name: Yup.string(),
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
  setParentOrg: (createdOrg: Organization) => void;
  parentOrg: Organization;
  classes: ClassNameMap<any>;
}
const CreateOrgForm = ({
  setParentOrg = () => {},
  parentOrg,
  triggerNextStep = () => {},
  classes,
}: Props) => {
  const [org, setOrg] = React.useState<Organization>(parentOrg);
  const [triggerEinSearch, setTriggerEinSearch] = React.useState<boolean>(false);

  const orgCreateMutation = useMutation<AxiosResponse<any, any>, Error, Organization, Error>(
    (newOrg: Organization) => {
      return axios.post(`http://localhost:3001/api/organizations`, { ...newOrg });
    },
    {
      onSuccess: (data: any) => {
        triggerNextStep(1);
        setParentOrg((data as any).data);
      },
    },
  );

  const orgValidateEinQuery = useQuery<
    AxiosResponse<any, any>,
    unknown,
    { ein: string; name: string },
    string[]
  >({
    enabled: triggerEinSearch,
    queryKey: ['orgValidateEinQuery', org.ein],
    queryFn: ({ queryKey }) => {
      const [_key, ein] = queryKey;
      console.log(_key); // need to use _key somehow
      return axios.get(`http://localhost:3001/api/organizations/ein/${ein}`);
    },
    onSuccess: (res: any) => {
      setTriggerEinSearch(false);
      setOrg({ ...org, name: res.data.name });
    },
    onError: (res: any) => {
      setOrg({ ...org, name: '' });
    },
    retry: 0,
  });

  const handleNext = (values: Organization) => {
    setOrg({ ...values });
    if (org.id === undefined) {
      orgCreateMutation.mutate({ ...values, name: org.name });
    } else {
      triggerNextStep(1);
    }
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
        initialValues={org}
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
          setFieldTouched,
          setFieldValue,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item md={12} xs={12}>
                <Typography component="p" align="left">
                  Step 1: About your organization
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="ein"
                  label="Employer Identification Number (EIN)"
                  placeholder="EIN: 99-9999999"
                  value={values.ein}
                  onChange={handleChange}
                  onKeyUp={() => {
                    setFieldValue('ein', values.ein.trim());
                    if (!errors.ein) {
                      setTriggerEinSearch(true);
                      setOrg({ ...values });
                    }
                  }}
                  onBlur={(e) => setFieldTouched('ein')}
                  errorText={touched.ein && errors.ein ? errors.ein : ''}
                />
                {orgValidateEinQuery.isLoading ? (
                  <LinearProgress color="secondary" />
                ) : (
                  <>
                    {orgValidateEinQuery.isError && (
                      <FormHelperText error>{`Invalid EIN ${
                        orgValidateEinQuery.error === 404 ? ': Not found' : ''
                      }`}</FormHelperText>
                    )}

                    {orgValidateEinQuery.isSuccess && (
                      <FormHelperText>
                        <CheckIcon style={{ color: green[500] }} />
                      </FormHelperText>
                    )}
                  </>
                )}
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="name"
                  label="Legal Name"
                  placeholder="Legal Name"
                  value={org.name}
                  disabled={true}
                />
                {orgValidateEinQuery.isSuccess && (
                  <FormHelperText>
                    <CheckIcon style={{ color: green[500] }} />
                  </FormHelperText>
                )}
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
                  onClick={() => handleNext(values)}
                  disabled={!isValid || orgValidateEinQuery.isLoading || !org.name}
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
