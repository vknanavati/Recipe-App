import {Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export function RecipeCard ({recipe, addFavorite, addMakeRecipe}) {

    console.log("recipe", recipe)
    return (
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
          <IconButton
            variant="soft"
            onClick={()=>addFavorite(recipe)}
          >
            <FavoriteBorder/>
          </IconButton>
          <Grid>
            <Button
              onClick={()=>addMakeRecipe(recipe)}
            >
              Make Recipe
            </Button>
          </Grid>
          <Typography variant="h6">{recipe.label}</Typography>
          <img alt="food-photo" src={recipe.image}/>

          <Typography sx={{wordWrap: "break-word", marginTop: 2}}>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            Full Recipe
              </a>
          </Typography>
      </Grid>
)
}