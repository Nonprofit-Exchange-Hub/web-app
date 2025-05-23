import * as React from 'react';
import { Grid, Button, FormControl, FormHelperText, CircularProgress, Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { FileUploadInput, RadioGroup, Select, TextField } from '..';
import NeedOfferForm from '../NeedOfferForm';
import DetectFormData from '../../DetectFormData';
import AlertDialog from '../../AlertDialog';
import { UserContext } from '../../../providers';

import type { Category, Option } from '../../../types';
import { APP_API_BASE_URL } from '../../../configs';
import { urlSchema, validationSchema } from './validation-schema';

const fetchCategories = async (): Promise<Option[]> => {
  const res = await fetch(`${APP_API_BASE_URL}/categories?applies_to_assets=true`);
  const data = await res.json();

  const categories = data.map((category: Category) => {
    const value = category.name.toLowerCase();
    const text = category.name;

    return { id: category.id, text, value };
  });

  return categories;
};

const conditions = [
  { value: 'like-new', text: 'Like new' },
  { value: 'excellent', text: 'Excellent' },
  { value: 'good', text: 'Good' },
];
const needTypes = [
  { value: 'donation', text: 'Donation' },
  { value: 'short-term', text: 'Short term loan (<1 month)' },
  { value: 'long-term', text: 'Long term loan (>1 month)' },
];
const deliveryTypes = [
  { value: 'pick-up', text: 'Pick up only' },
  { value: 'drop-off', text: 'Drop off only' },
  { value: 'pick-up-drop-off', text: 'Pick up and drop off' },
];

interface ShareANeedData {
  title: string;
  location: string;
  description: string;
  category: string;
  condition: string;
  quantity: string;
  needType: string;
  deliveryMethod: string;
  imgUrls: string[];
}

const initialFormData: ShareANeedData = {
  title: '',
  location: '',
  description: '',
  category: '',
  condition: '',
  quantity: '',
  needType: '',
  deliveryMethod: '',
  imgUrls: [''],
};

function NeedGoodsForm(): JSX.Element {
  const [formData, setFormData] = React.useState<ShareANeedData>(initialFormData);
  const [formInProgress, setFormInProgress] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Option[]>([]);
  const { user } = React.useContext(UserContext);
  const [urlError, setUrlError] = React.useState({ '0': '' });
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  const [searchTags, setSearchTags] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    setFormInProgress(() => DetectFormData(formData));
  }, [formData]);

  React.useEffect(() => {
    (async function () {
      const categories = await fetchCategories();
      setCategories(categories);
    })();
  }, []);

  function addPhotoUrl() {
    if (formData.imgUrls.length < 10) {
      setFormData({ ...formData, imgUrls: [...formData.imgUrls, ''] });
    }
  }

  const imageInputFields = formData.imgUrls.map((img, i) => {
    return (
      <FormControl key={i}>
        <TextField
          id={'imgUrls' + i}
          label={`Photo ${i + 1}`}
          placeholder="Insert photo url"
          value={formData.imgUrls[i]}
          onChange={(e) => handleChangePhotoUrl(e, i)}
        />
        <FormHelperText>{urlError[`${i}` as keyof typeof urlError]}</FormHelperText>
      </FormControl>
    );
  });

  // HTMLInputElement does not work for the MUISelect - This works, but can we find a better way of doing it?
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ): void => {
    let { name = '', value }: { name?: string | undefined; value: unknown } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleChangePhotoUrl = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setFormData((fData) => {
      urlSchema
        .validate({ url: event.target.value })
        .then(() => {
          setUrlError((urlError) => ({
            ...urlError,
            [`${index}`]: '',
          }));
        })
        .catch((error) => {
          setUrlError((urlError) => ({
            ...urlError,
            [`${index}`]: error.message,
          }));
        });
      let newImageUrls = [...fData.imgUrls];
      newImageUrls[index] = event.target.value;
      return {
        ...fData,
        imgUrls: newImageUrls,
      };
    });
  };

  // Custom onChange for title and description to enforce max length
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 25);
    setFormData((fData) => ({ ...fData, title: value }));
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 2600);
    setFormData((fData) => ({ ...fData, description: value }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const res = await fetch(`${APP_API_BASE_URL}/assets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          poster: user,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        history.push('/asset/' + data.id);
      } else {
        setSubmitError(data.message || 'Failed to create post. Please try again.');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NeedOfferForm title="Share a Need: Goods">
      <AlertDialog when={formInProgress} onConfirmation={() => true} onCancel={() => false} />
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <Grid container spacing={5}>
        {/* Section Header */}
        <Grid item xs={12}>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 0 }}>
            Basic Information
          </h2>
        </Grid>
        {/* Title and Category side by side */}
        <Grid item md={8} xs={12} style={{ position: 'relative' }}>
          <TextField
            id="title"
            label="Title*"
            placeholder="What type of goods do you need?"
            value={formData.title}
            onChange={handleTitleChange}
            errorText={validationErrors.title}
            required={true}
          />
          <span style={{ position: 'absolute', top: 8, right: 16, fontSize: 12, color: '#888' }}>
            {formData.title.length}/25
          </span>
        </Grid>
        <Grid item md={4} xs={12}>
          <Select
            id="category"
            label="Category"
            placeholder="Search a Category"
            options={categories}
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        {/* Description with counter */}
        <Grid item xs={12} style={{ position: 'relative', minHeight: 120 }}>
          <TextField
            id="description"
            label="Description (optional)"
            placeholder="Describe what you are looking for."
            value={formData.description}
            onChange={handleDescriptionChange}
            isMultiline={true}
            errorText={validationErrors.description}
          />
          <span style={{ position: 'absolute', top: 8, right: 16, fontSize: 12, color: '#888' }}>
            {formData.description.length}/2600
          </span>
        </Grid>
        {/* Add Search Tags */}
        <Grid item xs={12}>
          <label
            htmlFor="searchTags"
            style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}
          >
            Add Search Tags <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span>
          </label>
          <TextField
            id="searchTags"
            label="Search Tags"
            placeholder="Search a tag"
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <TextField
            id="location"
            label="Location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
            errorText={validationErrors.location}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Select
            id="condition"
            label="Condition"
            placeholder="Select a preferred condition"
            options={conditions}
            value={formData.condition}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="quantity"
            label="Quantity"
            placeholder="# of goods needed"
            value={formData.quantity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <RadioGroup
            label="Need Type"
            id="needType"
            options={needTypes}
            value={formData.needType}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <RadioGroup
            label="Delivery Method"
            id="deliveryMethod"
            options={deliveryTypes}
            value={formData.deliveryMethod}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUploadInput
            label="Photos"
            id="photos"
            text="Click here to upload photos"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <p>Or link photos below</p>
          {imageInputFields}
          <Button onClick={addPhotoUrl}>click here to add another photo</Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{ minWidth: 120 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </NeedOfferForm>
  );
}

export default NeedGoodsForm;
