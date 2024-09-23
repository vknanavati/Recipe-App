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
  const [alertFavorite, setAlertFavorite] = useState(false);
  const [alertRemove, setAlertRemove] = useState(false);


    //add and remove favorite recipe card
    const addFavorite = (recipe) => {
    //adds recipe only if it is not already in favorites list
    //if length of filtered array > 0 then it will not add the recipe
    if (!(favorites.filter(item => item.label === recipe.label).length > 0)) {
      setFavorites([...favorites, recipe]);
      setAlertFavorite(true);
      setTimeout(() => {
        setAlertFavorite(false)
        }, 3000);
    } else {
      //keeps item in array if label of the item doesn't match the label of the recipe being passed
      //so if 'heart button' is clicked again on recipe card it will remove that recipe because it already exists in favorites
      //this happens because the condition the array is to return array that doesn't match recipe being passed
      setFavorites(favorites.filter((item)=> item.label !== recipe.label));
      setAlertRemove(true);
      setTimeout(()=>{
        setAlertRemove(false)
      }, 3000);
    }
    console.log("favorites:", JSON.stringify(favorites))
  }

  const addMakeRecipe = (recipe) => {
    setMakeRecipe([...makeRecipe, recipe])
  }

  const addGrocery = (recipeName, ingredient) => {

    setGroceryList((groceryList)=>{

      //sets the value of groceryList[recipeName] either to existing ingredients or to empty array
      //if not already in object
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
                  Favorites ({favorites.length})
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
          favorites={favorites}
          alertFavorite={alertFavorite}
          setAlertFavorite={setAlertFavorite}
          alertRemove={alertRemove}
          setAlertRemove={setAlertRemove}
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
