import { useEffect } from "react";
import { DisplayFiltered } from "./DisplayFiltered";
import { FirstRecipe } from "./FirstRecipe";
import Grid from '@mui/material/Grid2';
import {Container, Drawer, List, ListItemButton, ListItem, ListItemText} from '@mui/material';

export function MakeRecipe({makeRecipe, addGrocery, groceryList, filteredRecipe, setFilteredRecipe, notes, setNotesList, setNotes, notesList, addMakeRecipe}) {

    useEffect(() => {
        console.log("filteredRecipe updated: ", JSON.stringify(filteredRecipe));
        console.log("filteredRecipe length: ", filteredRecipe.length)
        console.log("notesList: ", notesList)

    }, [filteredRecipe, notesList]);

    //triggered when you click on a recipe in the side drawer
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
                        addMakeRecipe={addMakeRecipe}
                        handleRemoveNote={handleRemoveNote}
                    />
                )}

                {filteredRecipe.length > 0 && makeRecipe && (
                    filteredRecipe.map((makeRecipe, index)=> (
                        <DisplayFiltered
                            makeRecipe={makeRecipe}
                            groceryList={groceryList}
                            addGrocery={addGrocery}
                            notes={notes}
                            notesList={notesList}
                            handleSubmit={handleSubmit}
                            handleNoteChange={handleNoteChange}
                            addMakeRecipe={addMakeRecipe}
                            handleRemoveNote={handleRemoveNote}
                            filteredRecipe={filteredRecipe}
                        />
                    ))


                )}
            </Grid>
        </Container>
    );
}
