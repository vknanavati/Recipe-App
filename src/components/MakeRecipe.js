import { RecipeCard } from "./RecipeCard";
import Grid from '@mui/material/Grid2';
import {Container, Typography} from '@mui/material';

export function MakeRecipe({makeRecipe}) {
    return(
        <Container>
            <Grid
                container
                justifyContent={"center"}
                direction={"column"}
                alignItems={"center"}
            >
                <Grid>
                    <Typography
                        variant="h4"
                        sx={{marginTop: 5, marginBottom: 2}}
                    >
                        Make Recipe
                    </Typography>
                </Grid>
                {makeRecipe.map((recipe, index)=>(
                    <Grid>
                        <RecipeCard
                            recipe={recipe}
                        />
                    </Grid>


                ))}

            </Grid>
        </Container>
    )
}