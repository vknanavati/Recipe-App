import Grid from '@mui/material/Grid2';
import {RecipeCard} from './RecipeCard'
import {Container,Typography} from '@mui/material';

export function Favorites ({favorites}) {
    return (
        <Container>
            <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>
                <Grid>
                    <Typography
                        variant="h4"
                        sx={{marginTop: 5, marginBottom:2}}
                    >
                        Favorite Recipes
                    </Typography>
                </Grid>
                {favorites.map((recipe,index)=>(
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