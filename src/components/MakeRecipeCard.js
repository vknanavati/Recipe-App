import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material'
export function MakeRecipeCard({recipe}) {
    return(
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
            <Typography variant="h6">{recipe.label}</Typography>
            <img alt="food-photo" src={recipe.image}/>

            <Typography variant="subtitle1">Ingredients:</Typography>
            {recipe.ingredients.map((ingredient, i)=>(
                <Typography key={i}>{ingredient.food}</Typography>
            ))}

        </Grid>
    )
}