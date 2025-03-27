import React from 'react';
import { Box, Typography, Paper, Link } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        About SignTranslate
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          What is SignTranslate?
        </Typography>
        <Typography paragraph>
          SignTranslate is an application designed to help people learn and understand sign language
          through YouTube videos. It provides instant translations of words and phrases to their
          corresponding sign language representations.
        </Typography>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          How to Use
        </Typography>
        <Typography paragraph>
          1. Go to the <Link href="/translator">Translator</Link> page<br />
          2. Enter a word or phrase in the search box<br />
          3. View the sign language video demonstration<br />
          4. Save your favorites for quick access later
        </Typography>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          About the Developer
        </Typography>
        <Typography paragraph>
          This application was created to make sign language more accessible to everyone. 
          If you have any feedback or suggestions, please feel free to reach out.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;