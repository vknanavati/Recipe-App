import {useState} from 'react'
import {Button,Container,TextField, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { RecipeCard } from './RecipeCard';

export function Home({addFavorite, foodData, setFoodData, addMakeRecipe}) {
    console.log(process.env)

    const [foodType, setFoodType] = useState("")

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
              sx={{marginTop: 5, marginBottom: 2}}
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
                sx={{marginTop: 3}}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
a        {foodData && (
            <Grid container justifyContent={"center"}>
                {foodData.hits.map((hit, index) => {
                    console.log("HIT from foodData.hits:", hit);
                    return (
                    <RecipeCard
                        key={index}
                        recipe={hit.recipe}
                        addFavorite={addFavorite}
                        addMakeRecipe={addMakeRecipe}
                    />
                    )
                })}
            </Grid>
        )}
      </Container>

    )
}