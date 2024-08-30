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
      {foodData && foodData.hits && (
        <Grid container justifyContent={"center"}>
          {foodData.hits.map((hit, index) => (
          <Grid
            item
            sm={8}
            sx={{
              boxShadow: 6,
              margin: 4,
              padding: 2,
              textAlign: "center",
              width: "370px",
              height: "auto"
            }}
          >
            <Typography variant="h6">{hit.recipe.label}</Typography>
            <img alt="food-photo" src={hit.recipe.image}/>

            <Typography variant="subtitle1">Ingredients:</Typography>
            {hit.recipe.ingredients.map((ingredient, i)=> (
              <Typography key={i}>{ingredient.food}</Typography>

            ))}

            <Typography variant="subtitle1">Quantities:</Typography>
            {hit.recipe.ingredientLines.map((line, i)=>(
              <Typography key={i}>{line}</Typography>
            ))}

            <Typography sx={{wordWrap: "break-word", marginTop: 2}}>
              <a href={hit.recipe.url} target="_blank" rel="noopener noreferrer">
                Full Recipe
              </a>
            </Typography>
          </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
