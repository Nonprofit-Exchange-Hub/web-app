import * as React from 'react';
import { Grid, Button, CircularProgress, Alert, FormControl } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { APP_API_BASE_URL } from '../configs';

import { FileUploadInput, RadioGroup, Select, TextField } from '../components/Forms';
import NeedOfferForm from '../components/Forms/NeedOfferForm';

const categories = [
  { value: 'figs', text: 'Figs' },
  { value: 'peaches', text: 'Peaches' },
  { value: 'pears', text: 'Pears' },
];
const conditions = [
  { value: 'like-new', text: 'Like new' },
  { value: 'excellent', text: 'Excellent' },
  { value: 'good', text: 'Good' },
];
const offerTypes = [
  { value: 'donation', text: 'Donation' },
  { value: 'short-term', text: 'Short term loan (<1 month)' },
  { value: 'long-term', text: 'Long term loan (>1 month)' },
];
const deliveryTypes = [
  { value: 'pick-up', text: 'Pick up only' },
  { value: 'drop-off', text: 'Drop off only' },
  { value: 'pick-up-drop-off', text: 'Pick up or drop off' },
];

interface FormData {
  title: string;
  location: string;
  description: string;
  category: string;
  condition: string;
  quantity: string;
  offerType: string;
  deliveryMethod: string;
  imgUrls: string[];
}

const initialFormData: FormData = {
  title: '',
  location: '',
  description: '',
  category: '',
  condition: '',
  quantity: '',
  offerType: '',
  deliveryMethod: '',
  imgUrls: [''],
};

function OfferFormGoods(): JSX.Element {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const history = useHistory();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ): void => {
    const { name = '', value } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${APP_API_BASE_URL}/assets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          condition: formData.condition,
          quantity: parseInt(formData.quantity, 10) || 1,
          type: 'donation',
          imgUrls: formData.imgUrls.filter((url) => url.trim() !== ''),
          category: formData.category,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        history.push(`/asset/${data.id}`);
      } else {
        setSubmitError(data.message || 'Failed to create offer. Please try again.');
      }
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPhotoUrl = (): void => {
    if (formData.imgUrls.length < 10) {
      setFormData((prevData) => ({
        ...prevData,
        imgUrls: [...prevData.imgUrls, ''],
      }));
    }
  };

  const handleChangePhotoUrl = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    setFormData((prevData) => {
      const newImageUrls = [...prevData.imgUrls];
      newImageUrls[index] = event.target.value;
      return {
        ...prevData,
        imgUrls: newImageUrls,
      };
    });
  };

  const imageInputFields = formData.imgUrls.map((img, i) => (
    <FormControl key={i}>
      <TextField
        id={`imgUrls${i}`}
        label={`Photo ${i + 1}`}
        placeholder="Insert photo url"
        value={formData.imgUrls[i]}
        onChange={(e) => handleChangePhotoUrl(e, i)}
      />
    </FormControl>
  ));

  return (
    <NeedOfferForm title="Make an Offer: Goods">
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <Grid container spacing={5}>
        <Grid item md={8} xs={12}>
          <TextField
            id="title"
            label="Title"
            placeholder="What goods are you offering?"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="location"
            label="Location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            id="description"
            label="Description"
            placeholder="Describe what goods you are offering"
            value={formData.description}
            onChange={handleChange}
            isMultiline
            required
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Select
            id="category"
            label="Category"
            placeholder="Select a category"
            options={categories}
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Select
            id="condition"
            label="Condition"
            placeholder="Select the condition"
            options={conditions}
            value={formData.condition}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="quantity"
            label="Quantity"
            placeholder="# of items"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <RadioGroup
            label="Offer Type"
            id="offerType"
            options={offerTypes}
            value={formData.offerType}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <RadioGroup
            label="Delivery Method"
            id="deliveryMethod"
            options={deliveryTypes}
            value={formData.deliveryMethod}
            onChange={handleChange}
            required
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

export default OfferFormGoods;
