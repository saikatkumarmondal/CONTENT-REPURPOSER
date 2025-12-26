'use client';
import { Autorenew, ContentCopy, Save, Send } from '@mui/icons-material';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function TransformForm() {
  const [formData, setFormData] = useState({
    originalContent: '',
    sourcePlatform: '',
    targetPlatform: '',
    contentType: '',
    customInstructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: 900, mx: 'auto', pb: 5 }}>

      {/* SECTION 1: ORIGINAL CONTENT */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e5e7eb', borderRadius: 2 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#374151' }}>
          Original Content
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          name="originalContent"
          placeholder="Paste your content here..."
          value={formData.originalContent}
          onChange={handleChange}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f9fafb' } }}
          helperText={(
            <Box component="span" sx={{ display: 'flex', justifyContent: 'flex-end', fontWeight: 500 }}>
              Characters:
              {' '}
              {formData.originalContent.length}
            </Box>
          )}
        />
      </Paper>

      {/* SECTION 2: CONFIGURATION GRID */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e5e7eb', borderRadius: 2 }}
      >
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
          <TextField
            select
            label="Source Platform"
            name="sourcePlatform"
            value={formData.sourcePlatform}
            onChange={handleChange}
          >
            <MenuItem value="Blog">Blog Post</MenuItem>
            <MenuItem value="YouTube">YouTube Script</MenuItem>
            <MenuItem value="Article">News Article</MenuItem>
          </TextField>

          <TextField
            select
            label="Target Platform"
            name="targetPlatform"
            value={formData.targetPlatform}
            onChange={handleChange}
          >
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Twitter">Twitter / X</MenuItem>
            <MenuItem value="Instagram">Instagram</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Content Type"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            sx={{ gridColumn: { md: 'span 2' } }}
          >
            <MenuItem value="Professional">Professional Post</MenuItem>
            <MenuItem value="Thread">Educational Thread</MenuItem>
            <MenuItem value="Short">Short Summary</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* SECTION 3: INSTRUCTIONS & BUTTON */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e5e7eb', borderRadius: 2 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#374151' }}>
          Custom Instructions
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          name="customInstructions"
          placeholder="e.g. Make it witty and use bullet points..."
          value={formData.customInstructions}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          endIcon={<Send />}
          sx={{
            'py': 1.5,
            'fontSize': '1rem',
            'fontWeight': 600,
            'textTransform': 'none',
            'backgroundColor': '#2563eb',
            'borderRadius': '8px',
            'transition': 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#1d4ed8',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
              backgroundColor: '#1e40af',
            },
          }}
        >
          Generate Content
        </Button>
      </Paper>

      {/* SECTION 4: OUTPUT AREA */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          border: '2px dashed #d1d5db',
          borderRadius: 2,
          backgroundColor: '#f8fafc',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#374151' }}>
          Generated Output
        </Typography>
        <Box
          sx={{
            minHeight: 150,
            p: 2,
            backgroundColor: '#ffffff',
            borderRadius: 1,
            border: '1px solid #e5e7eb',
            color: '#64748b',
            fontStyle: formData.originalContent ? 'normal' : 'italic',
          }}
        >
          {/* This space will hold the AI generated result */}
          (Result will appear here after clicking Generate)
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button startIcon={<ContentCopy />} variant="outlined" sx={{ flex: 1, textTransform: 'none' }}>Copy</Button>
          <Button startIcon={<Autorenew />} variant="outlined" sx={{ flex: 1, textTransform: 'none' }}>Regenerate</Button>
          <Button startIcon={<Save />} variant="outlined" color="success" sx={{ flex: 1, textTransform: 'none' }}>Save to Templates</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
