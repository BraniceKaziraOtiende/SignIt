import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import VideoCard from '../components/VideoCard';
import EmptyState from '../components/EmptyState';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('signLanguageFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (word) => {
    const newFavorites = favorites.filter(item => item.word !== word);
    setFavorites(newFavorites);
    localStorage.setItem('signLanguageFavorites', JSON.stringify(newFavorites));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Your Favorite Signs
      </Typography>
      
      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Save your favorite sign language videos by clicking the heart icon"
        />
      ) : (
        <Grid container spacing={3}>
          {favorites.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <VideoCard
                word={item.word}
                videoId={item.videoId}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(item.word)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;