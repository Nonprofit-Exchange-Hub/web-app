import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField, RadioGroup, Select, FileUploadInput } from './FormElements';
import { NeedOfferForm } from './FormElements';
import { useHistory } from 'react-router-dom';

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
};

function NeedForm() {
  const [formData, setFormData] = React.useState<ShareANeedData>(initialFormData);
  const history = useHistory();

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

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const res = await fetch('http://localhost:3001/api/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.status === 201) {
      history.push('/asset/' + data.id);
    } else {
      // TODO: Display error modal
      console.error(data.message);
    }
  };

  return (
    <NeedOfferForm title="Share a Need: Goods">
      <Grid container spacing={5}>
        <Grid item md={8} xs={12}>
          <TextField
            id="title"
            label="Title"
            placeholder="What goods do you need?"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="location"
            label="Location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            id="description"
            label="Description"
            placeholder="Describe what goods you are looking for"
            value={formData.description}
            onChange={handleChange}
            isMultiline={true}
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
        <Grid item container xs={12} justify="center">
          <Grid item>
            <Button variant="contained" color="secondary">
              Save Draft
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Need
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </NeedOfferForm>
  );
}

export default NeedForm;
