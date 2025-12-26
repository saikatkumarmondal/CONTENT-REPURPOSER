'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

export default function HistoryPage() {
  // Array for future backend implementation
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      date: 'Dec 20, 2024',
      title: 'Blog → LinkedIn Post',
      preview: 'Excited to share insights on...',
    },
    {
      id: 2,
      date: 'Dec 19, 2024',
      title: 'Email → Twitter Thread',
      preview: 'Let me break this down for you...',
    },
  ]);

  const [search, setSearch] = useState('');

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>
          History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage your past content transformations.
        </Typography>
      </Box>

      {/* SEARCH & FILTERS */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search history..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: 'white', borderRadius: 1 }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <Typography variant="subtitle2" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            Filter:
          </Typography>
          <TextField select size="small" defaultValue="Date" sx={{ minWidth: 140, backgroundColor: 'white' }}>
            <MenuItem value="Date">Date</MenuItem>
            <MenuItem value="Oldest">Oldest First</MenuItem>
          </TextField>
          <TextField select size="small" defaultValue="All" sx={{ minWidth: 140, backgroundColor: 'white' }}>
            <MenuItem value="All">Platform</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
          </TextField>
        </Stack>
      </Stack>

      {/* HISTORY LIST */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        {historyItems.map((item, index) => (
          <Box key={item.id}>
            <Box
              sx={{
                'p': { xs: 2, md: 3 },
                'transition': 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                {item.date}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 0.5 }}>
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  mb: 2,
                  fontStyle: 'italic',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                Preview: "
                {item.preview}
                "
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<VisibilityIcon sx={{ fontSize: '1rem !important' }} />}
                  sx={actionButtonStyle}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<RefreshIcon sx={{ fontSize: '1rem !important' }} />}
                  sx={actionButtonStyle}
                >
                  Reuse
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon sx={{ fontSize: '1rem !important' }} />}
                  sx={{
                    ...actionButtonStyle,
                    'bgcolor': '#fee2e2',
                    'color': '#ef4444',
                    '&:hover': { bgcolor: '#fecaca' },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
            {index < historyItems.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

// Common style for action buttons
const actionButtonStyle = {
  'textTransform': 'none',
  'bgcolor': '#f1f5f9',
  'color': '#475569',
  'boxShadow': 'none',
  'fontWeight': 600,
  'fontSize': '0.8rem',
  'px': 2,
  'borderRadius': '6px',
  '&:hover': { bgcolor: '#e2e8f0', boxShadow: 'none' },
  '&:active': { transform: 'scale(0.95)' },
};
