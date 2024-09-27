import {Button,Container, Typography, Alert, AlertTitle} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { RecipeCard } from './RecipeCard';

export function Home({addFavorite, foodData, setFoodData, addMakeRecipe, alertFavorite, setAlertFavorite, alertRemove, favorites}) {
    console.log(process.env)

    const handleClick = (cusineType) => {
      console.log("Searching city: ", cusineType, process.env.REACT_APP_API_KEY, process.env.REACT_APP_ID)
      fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&cuisineType=${cusineType}`, {
      })
      .then(response => response.json())
      .then(data =>{
          console.log("My recipe data: ", data);
          setFoodData(data)
      })
      .catch(error => console.error('Error:', error))
    }

    return (
        <Container sx={{paddingTop: '64px'}}>

          <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>

            <Typography
              variant="h3"
              sx={{marginTop: 5, marginBottom: 2}}
            >
              Recipe Search
            </Typography>

            <Grid>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("american")}>American</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("british")}>British</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("caribbean")}>Caribbean</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("chinese")}>Chinese</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("eastern europe")}>Eastern Europe</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("french")}>French</Button>
            </Grid>
            <Grid>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("greek")}>Greek</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("indian")}>Indian</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("italian")}>Italian</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("japanese")}>Japanese</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("korean")}>Korean</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("mediterranean")}>Mediterranean</Button>
            </Grid>
            <Grid>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("mexican")}>Mexican</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("middle eastern")}>Middle Eastern</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("nordic")}>Nordic</Button>
              <Button sx={{margin: 3, backgroundColor: '#3A5B26', fontSize: 18}} variant="contained" onClick={()=>handleClick("south american")}>South American</Button>
            </Grid>

          </Grid>

          {alertFavorite && (
            <Alert
              severity="success"
              onClose={() => setAlertFavorite(false)}
              sx={{
                position: "fixed",
                top: "30px",// 20px from the top of the screen
                left: "50%", //left edge of alert at half the viewport width
                transform: "translateX(-50%)", // moves alert to the left at half the width of the alert box
                width: "auto", // adjust width based on content
                zIndex: 9999 // alert appears above other content
              }}
            >
              <AlertTitle>Success</AlertTitle>
              Recipe added to Favorites!
            </Alert>
          )}
          {alertRemove && (
            <Alert
              severity="warning"
              onClose={() => setAlertFavorite(false)}
              sx={{
                position: "fixed",
                top: "30px",// 20px from the top of the screen
                left: "50%", //left edge of alert at half the viewport width
                transform: "translateX(-50%)", // moves alert to the left at half the width of the alert box
                width: "auto", // adjust width based on content
                zIndex: 9999 // alert appears above other content
              }}
            >
              Removed from Favorites
            </Alert>
          )}
        {foodData && (
            <Grid container justifyContent={"center"} sx={{marginTop: 5}}>
                {foodData.hits.map((hit, index) => {
                    console.log("HIT from foodData.hits:", hit);
                    return (
                    <RecipeCard
                        key={index}
                        recipe={hit.recipe}
                        addFavorite={addFavorite}
                        addMakeRecipe={addMakeRecipe}
                        favorites={favorites}

                    />
                    )
                })}
            </Grid>
        )}
      </Container>

    )
}