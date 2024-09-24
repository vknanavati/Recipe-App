import {Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { MakeRecipeCard } from "./MakeRecipeCard";

export function FirstRecipe ({makeRecipe, groceryList, addGrocery}) {

    if (!makeRecipe || makeRecipe.length === 0) {
        return null
    }
    const firstRecipe = makeRecipe[0];

    return(
        <Grid container>
            <Grid>
                <MakeRecipeCard
                    recipe={firstRecipe}
                    addGrocery={addGrocery}
                    key={firstRecipe.label}
            />
            </Grid>
            {makeRecipe.length > 0 && (
                <Grid>
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
                        <Typography
                            variant="h5"
                            sx={{marginBottom: 3}}
                        >
                            Grocery List
                        </Typography>
                        {groceryList[firstRecipe.label] && groceryList[firstRecipe.label].length > 0 && (
                            <ol>
                                {groceryList[firstRecipe.label].map((item, i)=>{
                                    return (
                                    <Grid container>
                                        <Grid>
                                            <li><Typography sx={{fontSize: 20}} key={i}>{item}</Typography></li>
                                        </Grid>
                                    </Grid>
                                    )
                                })}
                            </ol>
                        )}
                    </Grid>
                </Grid>
                )}
        </Grid>

    )
}