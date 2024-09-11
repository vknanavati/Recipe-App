import { MakeRecipeCard } from "./MakeRecipeCard";
import Grid from '@mui/material/Grid2';
import {Container, Typography, Drawer, List, ListItemButton, ListItem, ListItemText} from '@mui/material';

export function MakeRecipe({makeRecipe, addGrocery, groceryItem, setGroceryItem}) {

    return(
        <Container sx={{paddingTop: '64px'}}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        marginTop: '64px',
                        height: 'calc(100% - 64px)',
                        }
                    }}
            >
                <Typography> Recipes </Typography>

                <List>
                    {makeRecipe.map((title, i)=> (
                        <ListItem>
                            <ListItemButton>
                                <ListItemText>
                                    {title.label}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
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
                    {makeRecipe.length > 0 && (
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
                            <ol>
                            {groceryItem.map((item, i)=>{
                                return (
                                <Grid container>
                                    <Grid>
                                        <li><Typography sx={{fontSize: 20}} key={i}>{item}</Typography></li>
                                    </Grid>
                                </Grid>
                                )
                            })}
                            </ol>
                        </Grid>
                        )}
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Container>
    )
}