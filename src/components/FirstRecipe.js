import {Typography, Button, Box} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Grid from '@mui/material/Grid2';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/joy/IconButton';
import { MakeRecipeCard } from "./MakeRecipeCard";


export function FirstRecipe ({makeRecipe, groceryList, addGrocery, notes, notesList, handleSubmit, handleNoteChange, addMakeRecipe}) {

    if (!makeRecipe || makeRecipe.length === 0) {
        return null
    }
    const firstRecipe = makeRecipe[0];
    console.log("firstRecipe: ", firstRecipe)

    return(
        <Grid container>
            <Box display="flex" justifyContent={"flex-end"} sx={{width: '100%'}}>
                <Button
                    variant="contained"
                    sx={{ marginLeft: 'auto', backgroundColor: '#3A5B26' }}
                    onClick={()=>addMakeRecipe(firstRecipe)}
                >
                    Remove Recipe
                </Button>
            </Box>
            <Grid sx={{marginLeft: 20}}>
                <MakeRecipeCard
                    recipe={firstRecipe}
                    addGrocery={addGrocery}
                    key={firstRecipe.label}
                    groceryList={groceryList}
                />
            </Grid>
            {makeRecipe.length > 0 && (
                <Grid>
                    <Grid
                        sm={8}
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
                        <Typography
                            variant="h5"
                            sx={{marginBottom: 3}}
                        >
                            Grocery List
                        </Typography>
                        {groceryList[firstRecipe.label] && groceryList[firstRecipe.label].length > 0 && (
                            <ol>
                                {groceryList[firstRecipe.label].map((item, i)=>{
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

                        {notesList[firstRecipe.label] && notesList[firstRecipe.label].length > 0 && (
                            <ul>
                            {notesList[firstRecipe.label].map((userNote, i) => {
                                return (

                                <Grid container alignItems={"center"}>
                                    <Grid>
                                        <li><Typography sx={{ fontSize: 20}}>{userNote}</Typography></li>
                                    </Grid>
                                    <Grid>
                                        <IconButton onClick={() => console.log("Remove Note", userNote)}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                )
                            })}
                            </ul>
                        )}
                    </Grid>
                        <form onSubmit={(e)=>handleSubmit(e, firstRecipe.label)}>
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
    )
}