import * as React from 'react';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';

import { FileUploadInput, RadioGroup, Select, TextField } from '../components/Forms';
import NeedOfferForm from '../components/Forms/NeedOfferForm';

const skillCategories = [
  { value: 'purple', text: 'Purple' },
  { value: 'blue', text: 'Blue' },
  { value: 'green', text: 'Green' },
  { value: 'yellow', text: 'Yellow' },
  { value: 'orange', text: 'Orange' },
  { value: 'red', text: 'Red' },
];

const availabilityOptions = [
  { value: 'one-time', text: 'One-time event' },
  { value: '0-3-months', text: 'Up to 3 months' },
  { value: '3-6-months', text: '3 - 6 months' },
  { value: 'over-6-months', text: 'Longer than 6 months' },
  { value: 'flexible', text: 'On a flexible basis' },
];

interface FormData {
  title: string;
  location: string;
  description: string;
  category: string;
  availability: string;
  linkedin: string;
  resume: string;
}

const initialFormData: FormData = {
  title: '',
  location: '',
  description: '',
  category: '',
  availability: '',
  linkedin: '',
  resume: '',
};

function OfferFormSkills() {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

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

  return (
    <NeedOfferForm title="Make an Offer: Volunteer Skills">
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
            placeholder="Describe the skills you are looking for"
            value={formData.description}
            onChange={handleChange}
            isMultiline={true}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Select
            id="category"
            label="Skill Category"
            placeholder="Select a category"
            options={skillCategories}
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <RadioGroup
            label="Availability"
            id="availability"
            options={availabilityOptions}
            value={formData.availability}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            id="linkedin"
            label="LinkedIn Profile (Optional)"
            placeholder="Add your LinkedIn profile URL"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUploadInput
            label="Resume / CV (Optional)"
            id="resume"
            text="Click here to upload file"
            onChange={handleChange}
          />
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="secondary">
              Save Draft
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Submit Offer
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </NeedOfferForm>
  );
}

export default OfferFormSkills;
