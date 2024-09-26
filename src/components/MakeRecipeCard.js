import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/joy/IconButton';


export function MakeRecipeCard({recipe, addGrocery, groceryList}) {
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
                height: "auto",
                borderRadius: 3
            }}
        >
            <Typography variant="h5" sx={{marginBottom: 2}}>{recipe.label}</Typography>
            <img alt="food-photo" src={recipe.image}/>
            <Grid sx={{marginTop: 2, marginBottom: 2}}>
                <Typography variant="subtitle" sx={{fontWeight: 700, fontSize: 20}}>Ingredients:</Typography>
            </Grid>
            {recipe.ingredients.map((ingredient, i)=>{
                return (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid>
                        <Typography key={i}>{ingredient.food}</Typography>
                    </Grid>
                    <Grid sx={{marginLeft: 2}}>
                        {groceryList[recipe.label] && groceryList[recipe.label].includes(ingredient.food) ? (
                            (<RemoveCircleIcon/>) ) : ( <IconButton variant="plain">
                            <AddCircleIcon onClick={() => addGrocery(recipe.label, ingredient.food)}/>
                        </IconButton>
                        )}
                    </Grid>
                </Grid>
                )
            })}
            <Typography sx={{wordWrap: "break-word", marginTop: 2}}>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            Full Recipe
              </a>
          </Typography>
        </Grid>
    )
}