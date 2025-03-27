import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import EmptyState from '../components/EmptyState';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('signLanguageHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('signLanguageHistory');
  };

  const removeItem = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('signLanguageHistory', JSON.stringify(newHistory));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Search History
        </Typography>
        {history.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={clearHistory}
          >
            Clear All
          </Button>
        )}
      </Box>
      
      {history.length === 0 ? (
        <EmptyState
          title="No search history"
          description="Your searched signs will appear here"
        />
      ) : (
        <List sx={{ bgcolor: 'background.paper' }}>
          {history.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeItem(index)}>
                    <ClearIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.word}
                  secondary={new Date(item.timestamp).toLocaleString()}
                />
                <Button
                  component={Link}
                  to={`/translator?search=${encodeURIComponent(item.word)}`}
                  variant="outlined"
                  size="small"
                  sx={{ ml: 2 }}
                >
                  View
                </Button>
              </ListItem>
              {index < history.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default History;