'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function TemplatePage() {
  // Array structure for future backend implementation
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'LinkedIn Engagement Post',
      platform: 'LinkedIn',
      type: 'Post',
    },
    {
      id: 2,
      title: 'Twitter Thread Starter',
      platform: 'Twitter',
      type: 'Thread',
    },
    {
      id: 3,
      title: 'Email Newsletter Format',
      platform: 'Email',
      type: 'Newsletter',
    },
  ]);

  const [search, setSearch] = useState('');

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 3 } }}>
      {/* HEADER SECTION */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>
          Templates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and use your saved content structures.
        </Typography>
      </Box>

      {/* SEARCH & FILTERS */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search templates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: 'white' }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Typography sx={{ fontWeight: 700, alignSelf: 'center', display: { xs: 'none', sm: 'block' } }}>
            Filter:
          </Typography>
          <TextField select size="small" defaultValue="All" sx={{ minWidth: 150, backgroundColor: 'white' }}>
            <MenuItem value="All">All Platforms</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
          </TextField>
          <TextField select size="small" defaultValue="All" sx={{ minWidth: 150, backgroundColor: 'white' }}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Post">Post</MenuItem>
            <MenuItem value="Thread">Thread</MenuItem>
          </TextField>
        </Stack>
      </Stack>

      {/* TEMPLATE LIST */}
      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
        {templates.map((template, index) => (
          <Box key={template.id}>
            <Box
              sx={{
                'p': 3,
                'transition': 'all 0.2s',
                '&:hover': { backgroundColor: '#f9fafb' },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                {template.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Platform:
                {' '}
                <strong>{template.platform}</strong>
                {' '}
                | Type:
                {' '}
                <strong>{template.type}</strong>
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    'textTransform': 'none',
                    'bgcolor': '#e2e8f0',
                    'color': '#475569',
                    'boxShadow': 'none',
                    '&:hover': { bgcolor: '#cbd5e1', boxShadow: 'none' },
                    '&:active': { transform: 'scale(0.96)' },
                  }}
                >
                  Use
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{
                    'textTransform': 'none',
                    'bgcolor': '#e2e8f0',
                    'color': '#475569',
                    'boxShadow': 'none',
                    '&:hover': { bgcolor: '#cbd5e1', boxShadow: 'none' },
                    '&:active': { transform: 'scale(0.96)' },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon />}
                  sx={{
                    'textTransform': 'none',
                    'bgcolor': '#fee2e2',
                    'color': '#ef4444',
                    'boxShadow': 'none',
                    '&:hover': { bgcolor: '#fecaca', boxShadow: 'none' },
                    '&:active': { transform: 'scale(0.96)' },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
            {index < templates.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
