'use client';
import type { Socket } from 'socket.io-client';
import { Autorenew, ContentCopy, Save, Send } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { socialPlatforms } from '@/app/data/plateform';
import { sweetAlert } from '@/utils/notifications';

let socket: Socket;

export default function TransformForm() {
  const [formData, setFormData] = useState({
    originalContent: '',
    sourcePlatform: '',
    targetPlatform: '',
    contentType: '',
    customInstructions: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [generateStatus, setGenerateStatus] = useState<string | null>(null);

  const contentTypes = [
    'Educational',
    'Promotional',
    'Personal Story',
    'How-to Guide',
    'Listicle',
    'News Update',
    'Opinion Piece',
  ];

  /* 🔌 SOCKET INITIALIZATION */
  useEffect(() => {
    const initSocket = async () => {
      try {
        // Connect to the Socket.IO server running on port 3001
        socket = io('http://localhost:3001', {
          path: '/api/socket_io',
          transports: ['polling', 'websocket'],
        });

        socket.on('connect', () => {
          console.warn('✅ Socket connected:', socket.id);
        });

        socket.on('connected', (data) => {
          console.warn('📡 Server message:', data.message);
        });

        socket.on('generate-status', (status: string) => {
          console.warn('📡 Status update:', status);
          setGenerateStatus(status);
        });

        socket.on('disconnect', () => {
          console.warn('❌ Socket disconnected');
        });

        socket.on('connect_error', (error) => {
          console.error('🔌 Socket connection error:', error);
          // Fallback: continue without real-time updates
          setGenerateStatus('Connected (real-time updates unavailable)');
        });
      } catch (err) {
        console.error('Socket init error:', err);
        // Continue without socket - the app will still work
        setGenerateStatus('Connected (real-time updates unavailable)');
      }
    };

    initSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.originalContent || !formData.targetPlatform || !formData.contentType) {
      sweetAlert('error', 'Please fill in all required fields');
      return;
    }

    if (formData.sourcePlatform === formData.targetPlatform && formData.sourcePlatform !== '') {
      sweetAlert('error', 'Source and Target platforms cannot be the same');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setGenerateStatus('Starting generation...');

    try {
      const response = await fetch('/api/v1/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          socketId: socket?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.errors
          ? Object.values(data.errors).flat().join(', ')
          : data.message;
        throw new Error(errorMessage || 'Failed to generate content');
      }

      setResult(data.generatedOutput);
      setGenerateStatus('Generation completed ✅');
    } catch (err: any) {
      setError(err.message);
      setGenerateStatus(null);
      sweetAlert('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    sweetAlert('success', 'Copied to clipboard!');
  };

  return (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: 900, mx: 'auto', pb: 5 }}>

      {/* 3D LOADER OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Box sx={{ position: 'relative', width: 80, height: 80, mb: 4 }}>
              <motion.div
                animate={{ rotateY: 360, rotateX: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '100%',
                  height: '100%',
                  border: '2px solid #60a5fa',
                  boxShadow: '0 0 20px #3b82f6',
                  borderRadius: '12px',
                }}
              />
              <motion.div
                animate={{ rotateY: -360, rotateX: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  right: 10,
                  bottom: 10,
                  border: '2px solid #c084fc',
                  boxShadow: '0 0 15px #a855f7',
                  borderRadius: '8px',
                }}
              />
            </Box>

            <AnimatePresence mode="wait">
              <motion.div
                key={generateStatus}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1.25rem', letterSpacing: '0.5px' }}>
                  {generateStatus}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remaining sections (1-4) are unchanged */}
      {/* SECTION 1 */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e5e7eb', borderRadius: 2 }}>
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

      {/* SECTION 2 */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
          <TextField select label="Source Platform" name="sourcePlatform" value={formData.sourcePlatform} onChange={handleChange}>
            {socialPlatforms.map(platform => (
              <MenuItem key={`source-${platform}`} value={platform}>
                {platform === 'Blog' ? 'Blog Post' : platform}
              </MenuItem>
            ))}
          </TextField>

          <TextField select label="Target Platform" name="targetPlatform" value={formData.targetPlatform} onChange={handleChange}>
            {socialPlatforms.map(platform => (
              <MenuItem key={`target-${platform}`} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </TextField>

          <TextField select label="Content Type" name="contentType" value={formData.contentType} onChange={handleChange} sx={{ gridColumn: { md: 'span 2' } }}>
            {contentTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>

      {/* SECTION 3 */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e5e7eb', borderRadius: 2 }}>
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
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            'py': 1.5,
            'fontSize': '1rem',
            'fontWeight': 600,
            'textTransform': 'none',
            'backgroundColor': '#2563eb',
            'borderRadius': '8px',
            '&:hover': { backgroundColor: '#1d4ed8' },
          }}
        >
          {loading ? 'AI is Thinking...' : 'Generate Content'}
        </Button>
      </Paper>

      {generateStatus && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full rounded-md bg-green-600 py-2 text-center font-bold text-gray-100"
        >
          {generateStatus}
        </motion.div>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {/* SECTION 4 */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '2px dashed #d1d5db', borderRadius: 2, backgroundColor: '#f8fafc' }}>
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
            color: result ? '#1e293b' : '#64748b',
            whiteSpace: 'pre-wrap',
          }}
        >
          {result || '(Result will appear here after clicking Generate)'}
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button startIcon={<ContentCopy />} variant="outlined" sx={{ flex: 1 }} onClick={handleCopy} disabled={!result}>
            Copy
          </Button>
          <Button startIcon={<Autorenew />} variant="outlined" sx={{ flex: 1 }} disabled={!formData.originalContent} onClick={handleSubmit}>
            Regenerate
          </Button>
          <Button startIcon={<Save />} variant="outlined" color="success" sx={{ flex: 1 }} disabled={!result}>
            Save to Templates
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
