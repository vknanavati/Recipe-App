import Grid from '@mui/material/Grid2';
import {RecipeCard} from './RecipeCard'
import {Container,Typography} from '@mui/material';

export function Favorites ({favorites, addFavorite}) {
    return (
        <Container sx={{paddingTop: '64px'}}>
            <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>
                <Grid>
                    <Typography
                        variant="h4"
                        sx={{marginTop: 5, marginBottom:2}}
                    >
                        Favorite Recipes
                    </Typography>
                </Grid>
                <Grid container justifyContent={"center"}>
                    {favorites.map((recipe,index)=>(
                        <Grid>
                            <RecipeCard
                                recipe={recipe}
                                addFavorite={addFavorite}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    )
}