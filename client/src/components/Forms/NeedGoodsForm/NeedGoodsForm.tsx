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
  imgUrls: [''],
};

function NeedGoodsForm(): JSX.Element {
  const [formData, setFormData] = React.useState(initialFormData);
  const [categories, setCategories] = React.useState<Option[]>([]);
  const [searchTags, setSearchTags] = React.useState('');

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
        {(() => {
          const steps = [
            {
              label: 'Basic Information',
              description: 'Includes a title, item category, description of item, and search tags.',
              active: true,
            },
            {
              label: 'Details',
              description: 'Consists of photos, quantity, desired and condition of items.',
              active: false,
            },
            {
              label: 'Delivery',
              description: 'Selection of the desired delivery method, date, and location.',
              active: false,
            },
            {
              label: 'Post Information',
              description: 'Includes post type and duration of the post.',
              active: false,
            },
          ];
          return (
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
                        background: step.active ? '#674E67' : '#FFFFFF',
                        border: step.active ? '2px solid #674E67' : '2px solid #E0E0E0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                        zIndex: 1,
                        flexShrink: 0,
                      }}
                    />
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
          );
        })()}
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
                Basic Information
              </div>
            </Grid>
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
                  onChange={(e) => setFormData((fData) => ({ ...fData, category: e.target.value }))}
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
                  rows={6}
                  errorText={undefined}
                />
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 16,
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
            {/* Navigation Buttons */}
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}
            >
              <Button variant="outlined" color="primary" style={{ marginRight: 16 }}>
                Back
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginLeft: 16 }}
                disabled={!formData.title || !formData.category}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </NeedOfferForm>
      </div>
    </div>
  );
}

export default NeedGoodsForm;
