import { useEffect } from "react";
import { MakeRecipeCard } from "./MakeRecipeCard";
import { FirstRecipe } from "./FirstRecipe";
import Grid from '@mui/material/Grid2';
import Textarea from '@mui/joy/Textarea';
import {Container, Typography, Drawer, List, ListItemButton, ListItem, ListItemText, Button } from '@mui/material';

export function MakeRecipe({makeRecipe, addGrocery, groceryList, filteredRecipe, setFilteredRecipe, notes, setNotesList, setNotes, notesList}) {

    const selectedRecipe = (choice) => {
        const filtered = makeRecipe.filter(item => item.label.includes(choice));
        console.log("choice: ", choice);
        setFilteredRecipe(filtered);
        console.log("filtered:", filtered);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const notesObject = {
            id: Math.floor(Math.random() * 1000),
            value: notes
        }

        setNotesList([...notesList, notesObject])

        console.log("Notes Object: ", notesObject)
        console.log("Notes List: ", notesList)

    }

    const handleNoteChange = (e) => {
        const input = e.target.value
        setNotes(input)
        console.log("NOTES: ", notes)
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
                    {makeRecipe && (
                        makeRecipe.map((title, i) => (
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
                        ))
                    )}
                </List>
            </Drawer>

            <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"} sx={{marginTop: 6}}>
                {filteredRecipe.length === 0 && makeRecipe && (
                    <FirstRecipe
                        makeRecipe={makeRecipe}
                        groceryList={groceryList}
                        addGrocery={addGrocery}
                        notes={notes}
                        notesList={notesList}
                        handleSubmit={handleSubmit}
                        handleNoteChange={handleNoteChange}
                    />
                )}
                <Grid>
                    {filteredRecipe.map((recipe, index) => (
                        <Grid container key={index}>
                            <Grid sx={{ marginRight: 10 }}>
                                <MakeRecipeCard
                                    recipe={recipe}
                                    addGrocery={addGrocery}
                                    groceryList={groceryList}
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

                                        <ul>
                                            {notesList.map((notesObject, i) => (
                                                <Grid container key={i}>
                                                    <li><Typography sx={{ fontSize: 20 }}>{notesObject.value}</Typography></li>
                                                </Grid>
                                            ))}
                                        </ul>

                                    </Grid>
                                    <form onSubmit={handleSubmit}>
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
                                            <Textarea
                                                type={"text"}
                                                value={notes}
                                                onChange={(e)=>handleNoteChange(e)}
                                                placeholder="Recipe notes" />
                                            <Button type="submit">Save</Button>
                                        </Grid>
                                    </form>
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}
