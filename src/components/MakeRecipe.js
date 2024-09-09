import { MakeRecipeCard } from "./MakeRecipeCard";
import Grid from '@mui/material/Grid2';
import {Container, Typography} from '@mui/material';


export function MakeRecipe({makeRecipe, addGrocery, groceryItem, setGroceryItem}) {
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
                <Grid container>
                {makeRecipe.map((recipe, index)=>(
                    <Grid>
                        <MakeRecipeCard
                            recipe={recipe}
                            addGrocery={addGrocery}
                            setGroceryItem={setGroceryItem}
                            groceryItem={groceryItem}

                        />
                    </Grid>
                ))}

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
                        <Typography>Grocery List</Typography>
                        {groceryItem.map((item, i)=>(
                            <Typography key={i}>{item}</Typography>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}