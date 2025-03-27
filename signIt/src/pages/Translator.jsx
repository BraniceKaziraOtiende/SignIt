import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Alert, Snackbar } from '@mui/material';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import { signLanguageDictionary, commonPhrases } from '../data/signLanguageData';

const Translator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('signLanguageFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('signLanguageHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('signLanguageFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('signLanguageHistory', JSON.stringify(history));
  }, [history]);

  const handleSearch = (term) => {
    if (!term.trim()) {
      setResults([]);
      setSearchTerm('');
      return;
    }

    setSearchTerm(term);
    setLoading(true);
    setError(null);

    try {
      // Check for exact matches first
      const lowerTerm = term.toLowerCase();
      if (signLanguageDictionary[lowerTerm]) {
        setResults([{ word: lowerTerm, videoId: signLanguageDictionary[lowerTerm] }]);
        addToHistory(lowerTerm, signLanguageDictionary[lowerTerm]);
      } 
      // Check for common phrases
      else if (commonPhrases[lowerTerm]) {
        const phraseWords = commonPhrases[lowerTerm];
        const phraseResults = phraseWords.map(word => ({
          word,
          videoId: signLanguageDictionary[word]
        })).filter(item => item.videoId);
        
        if (phraseResults.length > 0) {
          setResults(phraseResults);
          addToHistory(lowerTerm, phraseResults[0].videoId);
        } else {
          setError('No sign language videos found for this phrase');
          setResults([]);
        }
      } 
      // No matches found
      else {
        setError('No sign language video found for this term');
        setResults([]);
      }
    } catch (err) {
      setError('An error occurred while searching');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (word, videoId) => {
    const newHistory = [
      { word, videoId, timestamp: new Date().toISOString() },
      ...history.filter(item => item.word !== word).slice(0, 49)
    ];
    setHistory(newHistory);
  };

  const toggleFavorite = (word, videoId) => {
    const isFavorite = favorites.some(item => item.word === word);
    
    if (isFavorite) {
      setFavorites(favorites.filter(item => item.word !== word));
      setSnackbarMessage('Removed from favorites');
    } else {
      setFavorites([...favorites, { word, videoId }]);
      setSnackbarMessage('Added to favorites');
    }
    setSnackbarOpen(true);
  };

  const isFavorite = (word) => {
    return favorites.some(item => item.word === word);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Sign Language Translator
      </Typography>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      {results.length > 0 && (
        <>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Results for "{searchTerm}"
          </Typography>
          <Grid container spacing={3}>
            {results.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <VideoCard
                  word={result.word}
                  videoId={result.videoId}
                  isFavorite={isFavorite(result.word)}
                  onToggleFavorite={() => toggleFavorite(result.word, result.videoId)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Translator;