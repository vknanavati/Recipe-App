import {useState} from 'react'
import { Button,Container, TextField, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';


function App() {
  console.log(process.env)

  const [foodType, setFoodType] = useState("")
  const [foodData, setFoodData] = useState("")

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Searching city: ", foodType, process.env.REACT_APP_API_KEY, process.env.REACT_APP_ID)
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&cuisineType=${foodType}`, {
    })
    .then(response => response.json())
    .then(data =>{
        console.log("My recipe data: ", data);
        setFoodData(data)
    })
    .catch(error => console.error('Error:', error))
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>
          <Typography
            variant="h4"
          >
            Recipe Search
          </Typography>
          <Grid>
            <TextField
              onChange={e=>setFoodType(e.target.value)}
            >
            </TextField>
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {foodData && (
        <Grid container justifyContent={"center"}>
          <Grid item sm={8} sx={{boxShadow: 6, margin: 4, padding: 2, textAlign: "center"}}>
            <Typography>{foodData.hits[0].recipe.label}</Typography>
            <img alt="food-photo" src={foodData.hits[0].recipe.image}/>
            <Typography>{foodData.hits[0].recipe.ingredients[0].food}</Typography>
            <Typography>{foodData.hits[0].recipe.ingredients[1].food}</Typography>
            <Typography>{foodData.hits[0].recipe.ingredientLines[0]}</Typography>
            <Typography>{foodData.hits[0].recipe.ingredientLines[1]}</Typography>
            <Typography>{foodData.hits[0].recipe.url}</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default App;
