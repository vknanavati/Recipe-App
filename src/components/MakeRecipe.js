import { useEffect } from "react";
import { MakeRecipeCard } from "./MakeRecipeCard";
import { FirstRecipe } from "./FirstRecipe";
import Grid from '@mui/material/Grid2';
import Textarea from '@mui/joy/Textarea';
import {Container, Typography, Drawer, List, ListItemButton, ListItem, ListItemText, Button } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/joy/IconButton';

export function MakeRecipe({makeRecipe, addGrocery, groceryList, filteredRecipe, setFilteredRecipe, notes, setNotesList, setNotes, notesList}) {

    useEffect(() => {
        console.log("filteredRecipe updated: ", JSON.stringify(filteredRecipe));
        console.log(filteredRecipe.length)
        console.log("notesList: ", notesList)

    }, [filteredRecipe, notesList]);

    const selectedRecipe = (choice) => {
        const filtered = makeRecipe.filter(item => item.label.includes(choice));
        console.log("choice: ", choice);
        setFilteredRecipe(filtered);
        console.log("filtered:", filtered);
    }

    const handleNoteChange = (e) => {
        const input = e.target.value
        setNotes(input)
        console.log("NOTES: ", notes)
    }
    // recipe is the recipe name
    const handleSubmit = (e, recipe) => {
        e.preventDefault();
        setNotes("");

        setNotesList((notesObject) => {
            //currentNotes is the value for the key recipe
            //this checks if recipe exists in notesObject. If yes it returns the value if not truthy it sets value to empty brackets
            const currentNotes = notesObject[recipe] || [];
            console.log("currentNotes: ", currentNotes);
            console.log("notesObject", notesObject)
            console.log("recipe passed to handleSubmit: ", recipe)

            return {...notesObject, [recipe] : [...currentNotes, notes]}
        })
    }

    const handleRemoveNote = (note, recipe) =>{

     setNotesList((notesObject)=>{
        const currentNotes = notesObject[recipe] || [];
        //create new array of notes without the note to be deleted
        const updatedNotes = currentNotes.filter((item)=> item !== note)
        //set updatedNotes for the recipe passed through function
        return {...notesObject, [recipe]: updatedNotes}

     })
    }


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
                            {JSON.stringify(recipe)}
                            <Grid sx={{ marginRight: 10 }}>
                                <MakeRecipeCard
                                    recipe={recipe}
                                    addGrocery={addGrocery}
                                    groceryList={groceryList}
                                />
                            </Grid>
                            {makeRecipe.length > 0 && (
                                <Grid>
                                    <Grid sm={8} sx={{
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

                                        {notesList[recipe.label] && notesList[recipe.label].length > 0 && (
                                            <ul>
                                            {notesList[recipe.label].map((userNote, i) => {
                                                return (

                                                <Grid container alignItems={"center"}>
                                                    <Grid>
                                                        <li><Typography sx={{ fontSize: 20}}>{userNote}</Typography></li>
                                                    </Grid>
                                                    <Grid>
                                                        <IconButton onClick={() => handleRemoveNote(userNote, recipe.label)}>
                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                                )
                                            })}
                                            </ul>
                                        )}


                                    </Grid>
                                    {filteredRecipe.map((recipe, index)=> (

                                    <form onSubmit={(e)=>handleSubmit(e, recipe.label)}>
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
                                    ))}
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}
