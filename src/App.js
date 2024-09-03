import { useState } from 'react';
import { AppBar,Container,Toolbar, Typography, Box} from '@mui/material';
import {Routes, Route, Link} from 'react-router-dom';
import {Favorites} from './components/Favorites'
import {Home} from './components/Home'


function App() {

  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    setFavorites([...favorites, recipe])
  }


  return (
    <Container maxWidth={"false"} disableGutters>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  textAlign: "center",
                  gap:2,
                  ml: "auto",
                  fontSize: 20,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "auto",
                  flexShrink: 1
                }}>
            <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
                  Home
            </Typography>
            <Typography variant="h6" component={Link} to="/favorites" color="inherit" sx={{ textDecoration: 'none' }}>
                  Favorite Recipes
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
    </Routes>
    </Container>
  );
}

export default App;
