'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function SettingsPage() {
  // Array for output lengths as requested
  const outputLengths = ['Short', 'Medium', 'Long'];

  // State for future backend implementation
  const [settings, setSettings] = useState({
    defaultTone: '',
    defaultLength: 'Medium',
    saveHistory: true,
  });

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 4 } }}>
      {/* HEADER SECTION */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your default preferences and billing information.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* DEFAULT TONE/VOICE CARD */}
        <Paper elevation={0} sx={cardStyle}>
          <Typography variant="subtitle1" sx={labelStyle}>
            Default Tone/Voice
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="e.g. Professional and engaging..."
            value={settings.defaultTone}
            onChange={e => handleChange('defaultTone', e.target.value)}
            sx={{ mt: 1, backgroundColor: '#f9fafb' }}
          />
        </Paper>

        {/* OUTPUT PREFERENCES CARD */}
        <Paper elevation={0} sx={cardStyle}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={labelStyle}>
              Default Output Length
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={settings.defaultLength}
              onChange={e => handleChange('defaultLength', e.target.value)}
              sx={{ mt: 1, maxWidth: { sm: 240 }, backgroundColor: '#f9fafb' }}
            >
              {outputLengths.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={labelStyle}>
              Save History
            </Typography>
            <FormControlLabel
              control={(
                <Switch
                  checked={settings.saveHistory}
                  onChange={e => handleChange('saveHistory', e.target.checked)}
                  color="primary"
                />
              )}
              label={settings.saveHistory ? 'History is being saved' : 'History is disabled'}
              sx={{ color: 'text.secondary' }}
            />
          </Box>
        </Paper>

        {/* BILLING & SUBSCRIPTION CARD */}
        <Paper elevation={0} sx={cardStyle}>
          <Typography variant="subtitle1" sx={labelStyle}>
            Billing & Subscription
          </Typography>
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#4b5563' }}>
              Current Plan:
              {' '}
              <Box component="span" sx={{ color: '#2563eb' }}>Pro ($99/month)</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Next billing date: Jan 20, 2025
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<CreditCardIcon />}
            sx={{
              'textTransform': 'none',
              'bgcolor': '#e2e8f0',
              'color': '#475569',
              'boxShadow': 'none',
              'fontWeight': 600,
              '&:hover': { bgcolor: '#cbd5e1', boxShadow: 'none' },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            Manage Subscription
          </Button>
        </Paper>

        {/* SAVE ACTION */}
        <Box sx={{ pt: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            sx={{
              'px': 4,
              'py': 1.5,
              'textTransform': 'none',
              'fontWeight': 700,
              'borderRadius': 2,
              'backgroundColor': '#2563eb',
              'transition': 'all 0.2s',
              '&:hover': {
                backgroundColor: '#1d4ed8',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
                backgroundColor: '#1e40af',
              },
            }}
          >
            Save Settings
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

// Global Card Styles
const cardStyle = {
  'p': { xs: 2.5, md: 3 },
  'border': '1px solid #e5e7eb',
  'borderRadius': 3,
  'backgroundColor': 'white',
  'transition': 'border-color 0.2s',
  '&:hover': {
    borderColor: '#cbd5e1',
  },
};

// Global Label Styles
const labelStyle = {
  fontWeight: 700,
  color: '#374151',
  fontSize: '1rem',
};
