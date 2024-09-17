import { useState, useEffect } from 'react';
import { AppBar,Container,Toolbar, Typography, Box} from '@mui/material';
import {Routes, Route, Link} from 'react-router-dom';
import {Favorites} from './components/Favorites'
import {Home} from './components/Home'
import {MakeRecipe} from './components/MakeRecipe'
import './App.css';

function App() {

  const [favorites, setFavorites] = useState([]);
  const [makeRecipe, setMakeRecipe] = useState([]);
  const [foodData, setFoodData] = useState("");
  const [groceryList, setGroceryList] = useState({});
  const [filteredRecipe, setFilteredRecipe] = useState([]);

  const addFavorite = (recipe) => {

    if (!(favorites.filter(item => item.label === recipe.label).length > 0)) {
      setFavorites([...favorites, recipe])
    } else {
      setFavorites(favorites.filter((item)=> item.label !== recipe.label))
    }
    console.log("favorites:", JSON.stringify(favorites))
  }

  const addMakeRecipe = (recipe) => {
    setMakeRecipe([...makeRecipe, recipe])
  }

  const addGrocery = (recipeName, ingredient) => {

    setGroceryList((groceryList)=>{

      const currentIngredients = groceryList[recipeName] || [];

      console.log("currentIngredients: ", currentIngredients)
      console.log("before adding new ingredient groceryList ", groceryList)
      console.log("recipeName: ", recipeName)

      if (!currentIngredients.includes(ingredient)) {

        console.log("added new ingredient: ", ingredient)
        return { ...groceryList, [recipeName] : [...currentIngredients, ingredient] };

      } else {
          console.log("ingredient already in list");
          return groceryList;
      }

    });
  }

  useEffect(() => {
    console.log("groceryList updated: ", JSON.stringify(groceryList));
    console.log("makeRecipe updated: ", JSON.stringify(makeRecipe));
  }, [groceryList, makeRecipe]);


  return (
    <Container maxWidth={"false"} disableGutters>
      <AppBar position="fixed" sx={{backgroundColor: '#3A5B26'}}>
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
                  Favorites
            </Typography>
            <Typography variant="h6" component={Link} to="/make" color="inherit" sx={{ textDecoration: 'none' }}>
                  Make Recipe
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    <Routes>
      <Route
        path="/"
        element={
          <Home
            addFavorite={addFavorite}
            foodData={foodData}
            setFoodData={setFoodData}
            addMakeRecipe={addMakeRecipe}
          />
        }
      />
      <Route path="/favorites" element={<Favorites favorites={favorites} addFavorite={addFavorite}/>}/>
      <Route
        path="/make"
        element={
          <MakeRecipe
            makeRecipe={makeRecipe}
            addGrocery={addGrocery}
            groceryList={groceryList}
            filteredRecipe={filteredRecipe}
            setFilteredRecipe={setFilteredRecipe}
          />
        }
      />
    </Routes>
    </Container>
  );
}

export default App;
