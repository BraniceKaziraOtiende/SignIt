import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoCard from '../components/VideoCard';
import { signLanguageDictionary } from '../data/signLanguageData';

const featuredWords = [
  { word: 'hello', videoId: signLanguageDictionary['hello'] },
  { word: 'thank you', videoId: signLanguageDictionary['thank you'] },
  { word: 'please', videoId: signLanguageDictionary['please'] },
  { word: 'sorry', videoId: signLanguageDictionary['sorry'] },
];

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mt: 4, mb: 6 }}>
        Welcome to SignTranslate
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Translate text to sign language with YouTube videos
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            component={Link}
            to="/translator"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 2 }}
          >
            Start Translating
          </Button>
        </motion.div>
      </Box>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mt: 6, mb: 4 }}>
        Featured Signs
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        {featuredWords.map((item, index) => (
          <Grid item key={index}>
            <VideoCard
              word={item.word}
              videoId={item.videoId}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;