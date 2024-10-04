import { useState, useEffect } from 'react';
import { AppBar,Container,Toolbar, Typography, Box} from '@mui/material';
import {Routes, Route, Link} from 'react-router-dom';
import {Favorites} from './components/Favorites'
import {Home} from './components/Home'
import {MakeRecipe} from './components/MakeRecipe'
import {About} from './components/About'
import './App.css';

function App() {

  const [favorites, setFavorites] = useState([]);
  const [makeRecipe, setMakeRecipe] = useState([]);
  const [foodData, setFoodData] = useState("");
  const [groceryList, setGroceryList] = useState({});
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [alertFavorite, setAlertFavorite] = useState(false);
  const [alertRemove, setAlertRemove] = useState(false);
  const [alertRecipe, setAlertRecipe] = useState(false)
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState([]);


  //empty array dependency means useEffect runs once when the component mounts
  useEffect(()=>{
    const localFavorites = localStorage.getItem("favorites");
    setFavorites(localFavorites ? JSON.parse(localFavorites): [])
  }, [])

  useEffect(()=>{
    const localRecipe = localStorage.getItem("make recipe");
    setMakeRecipe( localRecipe ? JSON.parse(localRecipe) : [])
  }, [])

  useEffect(()=>{
    const localGrocery = localStorage.getItem("grocery");
    setGroceryList( localGrocery ? JSON.parse(localGrocery) : {})
  }, [])

  useEffect(()=>{
    const localNotes = localStorage.getItem("notes");
    setNotesList( localNotes ? JSON.parse(localNotes) : [])
  }, [])

  //this useEffect is triggered only when favorites array is not empty
  useEffect(() => {
    //favorites persists in local storage when condition included
    if (favorites !== null && favorites.length > 0) {localStorage.setItem("favorites", JSON.stringify(favorites))};
  }, [favorites]);

  useEffect(() => {
    if (makeRecipe !== null && makeRecipe.length > 0) {localStorage.setItem("make recipe", JSON.stringify(makeRecipe))};
  }, [makeRecipe]);

  useEffect(() => {
    if (groceryList !== null && Object.keys(groceryList).length > 0) {localStorage.setItem("grocery", JSON.stringify(groceryList))};
  }, [groceryList]);

  useEffect(() => {
    if (notesList !== null && notesList.length > 0) {localStorage.setItem("notes", JSON.stringify(notesList))};
  }, [notesList]);

  useEffect(() => {
    console.log("groceryList updated: ", JSON.stringify(groceryList));
    console.log("makeRecipe updated: ", JSON.stringify(makeRecipe));
    console.log("favorites updated: ", JSON.stringify(favorites));
  }, [groceryList, makeRecipe, favorites]);

    //add and remove favorite recipe card
    const addFavorite = (recipe) => {
    //adds recipe only if it is not already in favorites list
    //if length of filtered array > 0 then it will not add the recipe
    //checking if recipe exists in favorites array
    const currentFavorites = favorites || [];
    if (!(currentFavorites.filter(item => item.label === recipe.label).length > 0)) {
      setFavorites([...currentFavorites, recipe]);
      setAlertFavorite(true);
      setTimeout(() => {
        setAlertFavorite(false)
        }, 3000);
    } else {
      //keeps item in array if label of the item doesn't match the label of the recipe being passed
      //so if 'heart button' is clicked again on recipe card it will remove that recipe because it already exists in favorites
      //this happens because the condition the array is to return array that doesn't match recipe being passed
      //so a new array is created excluding matching recipe label
      setFavorites(currentFavorites.filter((item)=> item.label !== recipe.label));
      setAlertRemove(true);
      setTimeout(()=>{
        setAlertRemove(false)
      }, 3000);
    }
    console.log("favorites:", JSON.stringify(favorites))
  }

  const addMakeRecipe = (recipe) => {
    if (!(makeRecipe.filter(item => item.label === recipe.label).length > 0)){
      setMakeRecipe([...makeRecipe, recipe]);
      setAlertRecipe(true);
      setTimeout(()=>{
        setAlertRecipe(false)
      }, 3000)
    } else {
      setMakeRecipe(makeRecipe.filter((item)=> item.label !== recipe.label))
    }
    console.log("makeRecipe: ", makeRecipe);
    console.log("recipe added to makeRecipe: ", recipe);
  }

  // onClick={() => addGrocery(recipe.label, ingredient.food)}
  const addGrocery = (recipeName, ingredient) => {

    setGroceryList((groceryObject)=>{

      //sets current ingredients to grocery[recipeName] or to empty array if groceryObject[recipeName] does not exists
      const currentIngredients = groceryObject[recipeName] || [];

      console.log("currentIngredients: ", currentIngredients);
      console.log("before adding new ingredient to groceryObject ", groceryObject);
      console.log("recipeName: ", recipeName);

      if (!currentIngredients.includes(ingredient)) {

        console.log("added new ingredient: ", ingredient)

        return { ...groceryObject, [recipeName] : [...currentIngredients, ingredient] };

      } else {
          console.log("ingredient already in list");

          const updatedIngredients = currentIngredients.filter((item) => item !== ingredient);

          return {...groceryObject, [recipeName]: updatedIngredients}
      }
    });
  }

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
            <Typography variant="h6" component={Link} to="/about" color="inherit" sx={{ textDecoration: 'none' }}>
              About
            </Typography>
            <Typography variant="h6" component={Link} to="/favorites" color="inherit" sx={{ textDecoration: 'none' }}>
              Favorites ({favorites !== null && (favorites.length)})
            </Typography>
            <Typography variant="h6" component={Link} to="/make" color="inherit" sx={{ textDecoration: 'none' }}>
              Recipes ({makeRecipe.length > 0 && (makeRecipe.length) })
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
            alertRecipe={alertRecipe}
          />
        }
        />
      <Route path="/about" element={<About/>}/>
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
            setNotes={setNotes}
            notes={notes}
            notesList={notesList}
            setNotesList={setNotesList}
          />
        }
      />
    </Routes>
    </Container>
  );
}

export default App;
