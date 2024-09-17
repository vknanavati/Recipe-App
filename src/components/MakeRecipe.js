import { useEffect } from "react";
import { MakeRecipeCard } from "./MakeRecipeCard";
import { FirstRecipe } from "./FirstRecipe";
import Grid from '@mui/material/Grid2';
import {Container, Typography, Drawer, List, ListItemButton, ListItem, ListItemText} from '@mui/material';

export function MakeRecipe({makeRecipe, addGrocery, groceryList, filteredRecipe, setFilteredRecipe}) {

    const selectedRecipe = (choice) => {
        const filtered = makeRecipe.filter(item=>item.label.includes(choice))
        console.log("choice: ", choice)
        setFilteredRecipe(filtered)
        console.log("filtered:", filtered)
      }

    useEffect(() => {
        console.log("filteredRecipe updated: ", JSON.stringify(filteredRecipe));
        console.log("!filteredRecipe.length: ",!filteredRecipe.length);
        console.log("filteredRecipe.length: ",filteredRecipe.length);
      }, [filteredRecipe]);

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
                            <ListItemButton onClick={()=>selectedRecipe(title.label)}>
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
                {filteredRecipe.length === 0 && makeRecipe && (
                    <FirstRecipe
                        makeRecipe={makeRecipe}
                        groceryList={groceryList}
                        addGrocery={addGrocery}
                    />
                )}
                <Grid>
                {filteredRecipe.map((recipe, index)=>(
                    <Grid container>
                        <Grid>
                            <MakeRecipeCard
                                recipe={recipe}
                                addGrocery={addGrocery}
                                key={index}

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
                                {groceryList[recipe.label] && groceryList[recipe.label].length > 0 && (
                                    <ol>
                                        {groceryList[recipe.label].map((item, i)=>{
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
                ))}
                </Grid>
            </Grid>
        </Container>
    )
}