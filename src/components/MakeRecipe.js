import { useEffect } from "react";
import { MakeRecipeCard } from "./MakeRecipeCard";
import { FirstRecipe } from "./FirstRecipe";
import Grid from '@mui/material/Grid2';
import Textarea from '@mui/joy/Textarea';
import {Container, Typography, Drawer, List, ListItemButton, ListItem, ListItemText, } from '@mui/material';

export function MakeRecipe({makeRecipe, addGrocery, groceryList, filteredRecipe, setFilteredRecipe}) {

    const selectedRecipe = (choice) => {
        const filtered = makeRecipe.filter(item => item.label.includes(choice));
        console.log("choice: ", choice);
        setFilteredRecipe(filtered);
        console.log("filtered:", filtered);
    }

    useEffect(() => {
        console.log("filteredRecipe updated: ", JSON.stringify(filteredRecipe));
    }, [filteredRecipe]);

    return (
        <Container sx={{ paddingTop: '64px' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        marginTop: '64px',
                        height: 'calc(100% - 64px)',
                        backgroundColor: '#D0D59D'
                    }
                }}
            >
                <List>
                    {makeRecipe.map((title, i) => (
                        <ListItem key={i}>
                            <ListItemButton
                                sx={{
                                    backgroundColor: '#3A5B26',
                                    borderRadius: 3,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#3A5B26',
                                        border: '1px solid #000',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    }
                                }}
                                onClick={() => selectedRecipe(title.label)}>
                                <ListItemText>
                                    {title.label}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>
                <Grid>
                    <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 5 }}>
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
                    {filteredRecipe.map((recipe, index) => (
                        <Grid container key={index}>
                            <Grid sx={{ marginRight: 10 }}>
                                <MakeRecipeCard
                                    recipe={recipe}
                                    addGrocery={addGrocery}
                                />
                            </Grid>
                            {makeRecipe.length > 0 && (
                                <Grid>
                                    <Grid item sm={8} sx={{
                                        boxShadow: 6,
                                        padding: 2,
                                        textAlign: "center",
                                        width: "370px",
                                        height: "auto",
                                        marginLeft: 20,
                                        marginTop: 4,
                                        marginBottom: 10,
                                        borderRadius: 3
                                    }}>
                                        <Typography variant="h5" sx={{ marginBottom: 3 }}>
                                            Grocery List
                                        </Typography>
                                        {groceryList[recipe.label] && groceryList[recipe.label].length > 0 && (
                                            <ol>
                                                {groceryList[recipe.label].map((item, i) => (
                                                    <Grid container key={i}>
                                                        <Grid>
                                                            <li><Typography sx={{ fontSize: 20 }}>{item}</Typography></li>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </ol>
                                        )}
                                    </Grid>
                                    <Grid
                                        sx={{
                                            boxShadow: 6,
                                            padding: 2,
                                            textAlign: "center",
                                            width: "370px",
                                            height: "auto",
                                            marginLeft: 20,
                                            marginTop: 4,
                                            marginBottom: 10,
                                            borderRadius: 3
                                        }}
                                    >
                                        <Typography variant="h5" sx={{ marginBottom: 2 }}>Notes</Typography>
                                        <Textarea placeholder="Recipe notes" />
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}
