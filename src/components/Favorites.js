import Grid from '@mui/material/Grid2';
import {RecipeCard} from './RecipeCard'

export function Favorites ({favorites}) {
    return (
        <Grid>
            {favorites.map((recipe,index)=>(
                <RecipeCard
                    recipe={recipe}
                />
            ))}

        </Grid>
    )
}