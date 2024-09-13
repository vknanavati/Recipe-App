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
  const [groceryItem, setGroceryItem] = useState([]);
  const [groceryList, setGroceryList] = useState({});

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

    setGroceryList((prevGroceryList)=>{
      const updatedIngredients = prevGroceryList[recipeName] ? [...prevGroceryList[recipeName], ingredient] : [ingredient];
      console.log("updatedIngredients", updatedIngredients)
      console.log("prevGroceryList", prevGroceryList)
      return {...prevGroceryList, [recipeName]: updatedIngredients}
    });

    console.log("recipe name: ", recipeName)


    if (!(groceryItem.filter(item => item === ingredient).length > 0)) {
      console.log("ingredient: ", ingredient)
      setGroceryItem([...groceryItem, ingredient])
    } else {
      console.log("ingredient already on list")
    }
  }

  useEffect(() => {
    console.log("groceryItem updated: ", JSON.stringify(groceryItem));
    console.log("groceryList updated: ", JSON.stringify(groceryList));
  }, [groceryItem, groceryList]);
  useEffect(() => {
    console.log("makeRecipe updated: ", JSON.stringify(makeRecipe));
  }, [makeRecipe]);

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
            groceryItem={groceryItem}
            addGroceryItem={setGroceryItem}
          />
        }
      />
    </Routes>
    </Container>
  );
}

export default App;
