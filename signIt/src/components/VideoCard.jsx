import React from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import YouTube from 'react-youtube';
import { motion } from 'framer-motion';

const VideoCard = ({ word, videoId, isFavorite, onToggleFavorite }) => {
  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const id = extractVideoId(videoId);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Card sx={{ maxWidth: 345, m: 2, borderRadius: 2 }}>
        {id ? (
          <YouTube videoId={id} opts={opts} />
        ) : (
          <CardMedia
            component="img"
            height="200"
            image="/placeholder.jpg"
            alt="Sign language video"
          />
        )}
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h6" component="div">
              {word}
            </Typography>
            <IconButton onClick={() => onToggleFavorite(word, videoId)}>
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoCard;