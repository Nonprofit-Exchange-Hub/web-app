import * as React from 'react';
import { Grid, Button } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// import * as Yup from 'yup';

import { Select, TextField } from '..';
import NeedOfferForm from '../NeedOfferForm';
import AlertDialog from '../../AlertDialog';
// import { UserContext } from '../../../providers';

import type { Category, Option } from '../../../types';
import { APP_API_BASE_URL } from '../../../configs';
// import { validationSchema } from './validation-schema';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import TextFieldMUI from '@mui/material/TextField';
const states = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'District Of Columbia', abbreviation: 'DC' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' },
];

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

const initialFormData = {
  title: '',
  location: '',
  description: '',
  category: '',
  condition: '',
  quantity: '',
  needType: '',
  deliveryMethod: '',
  deliveryDate: '',
  streetAddress: '',
  aptSuite: '',
  city: '',
  state: '',
  zipCode: '',
  includeStreet: null as boolean | null,
  imgUrls: [],
};

function NeedGoodsForm(): JSX.Element {
  const [formData, setFormData] = React.useState<typeof initialFormData>(initialFormData);
  const [categories, setCategories] = React.useState<Option[]>([]);
  const [searchTags, setSearchTags] = React.useState('');
  const [currentStep, setCurrentStep] = React.useState(0);
  const [images, setImages] = React.useState<(File | null)[]>([null, null, null]);
  const [imagePreviews, setImagePreviews] = React.useState<(string | null)[]>([null, null, null]);

  React.useEffect(() => {
    (async function () {
      const categories = await fetchCategories();
      setCategories(categories);
    })();
  }, []);

  // Custom onChange for title and description to enforce max length
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 25);
    setFormData((fData) => ({ ...fData, title: value }));
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 2600);
    setFormData((fData) => ({ ...fData, description: value }));
  };

  const handleNext = () => {
    setCurrentStep((step) => step + 1);
  };

  const handleBack = () => {
    setCurrentStep((step) => step - 1);
  };

  const steps = [
    {
      label: 'Basic Information',
      description: 'Includes a title, item category, description of item, and search tags.',
      active: currentStep === 0,
    },
    {
      label: 'Details',
      description: 'Consists of photos, quantity, desired and condition of items.',
      active: currentStep === 1,
    },
    {
      label: 'Delivery',
      description: 'Selection of the desired delivery method, date, and location.',
      active: currentStep === 2,
    },
    {
      label: 'Post Information',
      description: 'Includes post type and duration of the post.',
      active: currentStep === 3,
    },
  ];

  // Step completion logic
  const isStepComplete = (stepIdx: number) => {
    if (stepIdx === 0) {
      // Basic Information: title and category required
      return !!formData.title && !!formData.category;
    }
    if (stepIdx === 1) {
      // Details: condition required
      return !!formData.condition;
    }
    if (stepIdx === 2) {
      // Delivery: deliveryMethod, deliveryDate, city, state, zipCode required
      if (
        !formData.deliveryMethod ||
        !formData.deliveryDate ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode
      )
        return false;
      if (formData.includeStreet === true && !formData.streetAddress) return false;
      return true;
    }
    // Add more logic for other steps as needed
    return false;
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG files are allowed.');
      return;
    }
    const newImages = [...images];
    newImages[idx] = file;
    setImages(newImages);
    const newPreviews = [...imagePreviews];
    newPreviews[idx] = URL.createObjectURL(file);
    setImagePreviews(newPreviews);
  };

  // Remove image
  const handleRemoveImage = (idx: number) => {
    const newImages = [...images];
    newImages[idx] = null;
    setImages(newImages);
    const newPreviews = [...imagePreviews];
    newPreviews[idx] = null;
    setImagePreviews(newPreviews);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      {/* Sidebar Stepper */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: 320,
          minWidth: 260,
          padding: '32px 24px',
          marginRight: 48,
          minHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {/* Placeholder for illustration */}
        <div
          style={{
            width: '100%',
            marginBottom: 32,
            minHeight: 180,
            background: '#FFE0B2',
            borderRadius: 12,
          }}
        >
          {/* Illustration goes here */}
        </div>
        {/* Stepper steps */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                position: 'relative',
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: isStepComplete(idx) ? '#674E67' : step.active ? '#FFF' : '#FFF',
                    border: step.active
                      ? '2px solid #674E67'
                      : isStepComplete(idx)
                      ? '2px solid #674E67'
                      : '2px solid #E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                    zIndex: 1,
                    flexShrink: 0,
                    color: isStepComplete(idx) ? '#FFF' : '#674E67',
                  }}
                >
                  {isStepComplete(idx) ? (
                    <CheckIcon style={{ fontSize: 18, color: '#FFF' }} />
                  ) : null}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{step.label}</div>
                  <div style={{ fontSize: 13, color: '#555' }}>{step.description}</div>
                </div>
              </div>
              {/* Vertical line after each step except the last */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: 24,
                    width: 0,
                    height: 64,
                    borderLeft: '2px solid #E0E0E0',
                    zIndex: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Main Content: Title above Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Main Title */}
        <div style={{ width: '100%', marginBottom: 32 }}>
          <h1
            style={{
              fontWeight: 800,
              fontSize: '2.75rem',
              color: '#674E67',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              margin: 0,
              textAlign: 'left',
              textShadow: '0px 2px 8px rgba(103, 78, 103, 0.08)',
            }}
          >
            Share a Need: Goods
          </h1>
        </div>
        <NeedOfferForm title="">
          <AlertDialog when={false} onConfirmation={() => true} onCancel={() => false} />
          <Grid container spacing={4}>
            {/* Section Header */}
            <Grid item xs={12}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  marginBottom: 24,
                  textAlign: 'left',
                }}
              >
                {steps[currentStep].label}
              </div>
            </Grid>
            {currentStep === 0 && (
              <>
                {/* Title and Category on same row */}
                <Grid item container spacing={2} alignItems="flex-end">
                  <Grid item md={8} xs={12} style={{ position: 'relative', width: '100%' }}>
                    <TextField
                      id="title"
                      label="Title*"
                      placeholder="What type of goods do you need?"
                      value={formData.title}
                      onChange={handleTitleChange}
                      errorText={undefined}
                      required={true}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 36,
                        right: 16,
                        fontSize: 12,
                        color: '#888',
                        background: '#fff',
                        paddingLeft: 4,
                      }}
                    >
                      {formData.title.length}/25
                    </span>
                  </Grid>
                  <Grid item md={4} xs={12} style={{ width: '100%' }}>
                    <Select
                      id="category"
                      label="Category"
                      placeholder="Search a Category"
                      options={categories}
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((fData) => ({ ...fData, category: e.target.value }))
                      }
                    />
                  </Grid>
                </Grid>
                {/* Description with counter at bottom right */}
                <Grid item xs={12} style={{ position: 'relative', marginTop: 24, width: '100%' }}>
                  <div style={{ minHeight: 180 }}>
                    <TextField
                      id="description"
                      label="Description (optional)"
                      placeholder="Describe what you are looking for."
                      value={formData.description}
                      onChange={handleDescriptionChange}
                      isMultiline={true}
                      rows={4}
                      errorText={undefined}
                    />
                  </div>
                  <span
                    style={{
                      position: 'relative',
                      top: -190,
                      left: 800,
                      fontSize: 12,
                      color: '#888',
                      background: '#fff',
                      paddingLeft: 4,
                    }}
                  >
                    {formData.description.length}/2600
                  </span>
                </Grid>
                {/* Add Search Tags */}
                <Grid item xs={12} style={{ marginTop: 24, width: '100%' }}>
                  <TextField
                    id="searchTags"
                    label="Add Search Tags (optional)"
                    placeholder="Search a tag"
                    value={searchTags}
                    onChange={(e) => setSearchTags(e.target.value)}
                  />
                </Grid>
              </>
            )}
            {currentStep === 1 && (
              <>
                {/* Photos Upload Placeholder */}
                <Grid item xs={12}>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 120,
                          height: 120,
                          border: '2px dashed #D1D1D1',
                          borderRadius: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#FAFAFA',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onClick={() => {
                          const input = document.getElementById(`image-input-${idx}`);
                          if (input) (input as HTMLInputElement).click();
                        }}
                      >
                        <input
                          id={`image-input-${idx}`}
                          type="file"
                          accept="image/jpeg,image/png"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageChange(e, idx)}
                        />
                        {imagePreviews[idx] ? (
                          <>
                            <img
                              src={imagePreviews[idx] as string}
                              alt={`Preview ${idx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(idx);
                              }}
                              style={{
                                position: 'absolute',
                                top: 2,
                                right: 2,
                                background: 'rgba(255,255,255,0.7)',
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </>
                        ) : (
                          <span style={{ color: '#B0B0B0', fontSize: 32 }}>+</span>
                        )}
                      </div>
                    ))}
                    <div style={{ marginLeft: 24, color: '#674E67', fontWeight: 500 }}>
                      Drop your image here or{' '}
                      <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>browse</span>
                      <div style={{ color: '#888', fontSize: 12 }}>Supports JPG and PNG only</div>
                    </div>
                  </div>
                </Grid>
                {/* Quantity and No Limit */}
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}
                >
                  <TextField
                    id="quantity"
                    label="Quantity"
                    placeholder="Enter quantity needed."
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((fData) => ({ ...fData, quantity: e.target.value }))
                    }
                    type="number"
                  />
                  <Button
                    variant={formData.quantity === '' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setFormData((fData) => ({ ...fData, quantity: '' }))}
                  >
                    No Limit
                  </Button>
                </Grid>
                {/* Condition Radio Group */}
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 500, marginBottom: 8 }}>Condition*</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                    <div>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <input
                          type="radio"
                          name="condition"
                          value="new"
                          checked={formData.condition === 'new'}
                          onChange={() => setFormData((fData) => ({ ...fData, condition: 'new' }))}
                          required
                        />
                        <span>
                          <b>New</b> – Unused, unaltered, and in the original, unopened packaging.
                        </span>
                      </label>
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          marginTop: 8,
                        }}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value="like_new"
                          checked={formData.condition === 'like_new'}
                          onChange={() =>
                            setFormData((fData) => ({ ...fData, condition: 'like_new' }))
                          }
                        />
                        <span>
                          <b>Like New</b> - Mint condition and free of defects.
                        </span>
                      </label>
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          marginTop: 8,
                        }}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value="good"
                          checked={formData.condition === 'good'}
                          onChange={() => setFormData((fData) => ({ ...fData, condition: 'good' }))}
                        />
                        <span>
                          <b>Good</b> – Gently used, but may have one or a few minor flaws.
                        </span>
                      </label>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          marginTop: 8,
                        }}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value="fair"
                          checked={formData.condition === 'fair'}
                          onChange={() => setFormData((fData) => ({ ...fData, condition: 'fair' }))}
                        />
                        <span>
                          <b>Fair</b> – Used with multiple cosmetic flaws or defects.
                        </span>
                      </label>
                    </div>
                  </div>
                </Grid>
              </>
            )}
            {currentStep === 2 && (
              <>
                <Grid container spacing={6} alignItems="flex-start">
                  {/* Left column: method, date, toggle */}
                  <Grid item xs={12} md={6}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 32,
                        maxWidth: 400,
                      }}
                    >
                      <TextFieldMUI
                        select
                        fullWidth
                        label="Delivery Method*"
                        value={formData.deliveryMethod}
                        onChange={(e) =>
                          setFormData((fData) => ({ ...fData, deliveryMethod: e.target.value }))
                        }
                        sx={{ mb: 3 }}
                      >
                        <MenuItem value="">Select a method to receive items</MenuItem>
                        <MenuItem value="pickup">Pickup</MenuItem>
                        <MenuItem value="dropoff">Dropoff</MenuItem>
                        <MenuItem value="shipping">Shipping</MenuItem>
                      </TextFieldMUI>
                      <div>
                        <TextFieldMUI
                          fullWidth
                          label="Delivery Date*"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={formData.deliveryDate}
                          onChange={(e) =>
                            setFormData((fData) => ({ ...fData, deliveryDate: e.target.value }))
                          }
                        />
                        <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>
                          Note: This date lets user know the last that the items can be dropped off
                          or picked up which is not the same as the expiration of the post.
                        </div>
                      </div>
                      <div style={{ marginTop: 32 }}>
                        <div style={{ fontWeight: 500, marginBottom: 16 }}>
                          Do you want to include a street address on your public post?
                        </div>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Button
                              variant={formData.includeStreet === true ? 'contained' : 'outlined'}
                              color="primary"
                              fullWidth
                              size="large"
                              style={{ height: 48 }}
                              onClick={() =>
                                setFormData((fData) => ({
                                  ...fData,
                                  includeStreet: true as boolean | null,
                                }))
                              }
                            >
                              Yes
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              variant={formData.includeStreet === false ? 'contained' : 'outlined'}
                              color="primary"
                              fullWidth
                              size="large"
                              style={{ height: 48 }}
                              onClick={() =>
                                setFormData((fData) => ({
                                  ...fData,
                                  includeStreet: false as boolean | null,
                                  streetAddress: '',
                                }))
                              }
                            >
                              No
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                  {/* Right column: address/location fields stacked with heading */}
                  <Grid item xs={12} md={6}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        maxWidth: 400,
                        marginLeft: 32,
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                        Delivery Location
                      </div>
                      <TextFieldMUI
                        fullWidth
                        label="Street Address"
                        value={formData.streetAddress}
                        onChange={(e) =>
                          setFormData((fData) => ({ ...fData, streetAddress: e.target.value }))
                        }
                        required={formData.includeStreet === true}
                        disabled={formData.includeStreet === false}
                        sx={{ mb: 1 }}
                      />
                      <TextFieldMUI
                        fullWidth
                        label="Apt, Suite, etc. (optional)"
                        value={formData.aptSuite}
                        onChange={(e) =>
                          setFormData((fData) => ({ ...fData, aptSuite: e.target.value }))
                        }
                        disabled={formData.includeStreet === false}
                        sx={{ mb: 1 }}
                      />
                      <TextFieldMUI
                        fullWidth
                        label="City*"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData((fData) => ({ ...fData, city: e.target.value }))
                        }
                        sx={{ mb: 1 }}
                      />
                      <TextFieldMUI
                        select
                        fullWidth
                        label="State*"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData((fData) => ({ ...fData, state: e.target.value }))
                        }
                        sx={{ mb: 1 }}
                      >
                        <MenuItem value="">Enter a State</MenuItem>
                        {states.map((state) => (
                          <MenuItem key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </TextFieldMUI>
                      <TextFieldMUI
                        fullWidth
                        label="Zip Code*"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData((fData) => ({ ...fData, zipCode: e.target.value }))
                        }
                        sx={{ mb: 1 }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
            {/* Navigation Buttons */}
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40 }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 16 }}
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginLeft: 16 }}
                disabled={
                  (currentStep === 0 && (!formData.title || !formData.category)) ||
                  (currentStep === 1 && !formData.condition) ||
                  (currentStep === 2 && !isStepComplete(2))
                }
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </NeedOfferForm>
      </div>
    </div>
  );
}

export default NeedGoodsForm;
