import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/joy/IconButton';


export function MakeRecipeCard({recipe, addGrocery}) {
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
            {recipe.ingredients.map((ingredient, i)=>{
                return (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid>
                        <Typography key={i}>{ingredient.food}</Typography>
                    </Grid>
                    <Grid sx={{marginLeft: 2}}>
                        <IconButton variant="plain">
                            <AddCircleIcon onClick={() => addGrocery(recipe.label, ingredient.food)}/>
                        </IconButton>
                    </Grid>
                </Grid>
                )
            })}

        </Grid>
    )
}