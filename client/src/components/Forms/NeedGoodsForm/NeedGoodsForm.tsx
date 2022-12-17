import * as React from 'react';
import { Grid, Button, FormControl, FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';

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
  const [user] = React.useContext(UserContext);
  const [urlError, setUrlError] = React.useState({ '0': '' });

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
      let validatedUrls;
      urlSchema
        .validate({ url: event.target.value })
        .then((success) => {
          validatedUrls = success;
          console.log(validatedUrls);
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

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const isValid = await validationSchema.isValid(formData);
    if (isValid) {
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
        // TODO: Display error modal
        console.error(data.message);
      }
    }
  };

  return (
    <NeedOfferForm title="Share a Need: Goods">
      <AlertDialog when={formInProgress} onConfirmation={() => true} onCancel={() => false} />
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
        <Grid item xs={12}>
          <p>Or link photos below</p>
          {imageInputFields}
          <Button onClick={addPhotoUrl}>click here to add another photo</Button>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
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

export default NeedGoodsForm;
