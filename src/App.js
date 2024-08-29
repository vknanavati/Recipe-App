import {useState} from 'react'
import { Button, Grid2, Container, TextField, Typography} from '@mui/material';


function App() {
  console.log(process.env)

  const [foodType, setFoodType] = useState("")

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Searching city: ", foodType, process.env.REACT_APP_API_KEY, process.env.REACT_APP_ID)
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&cuisineType=${foodType}`, {
    })
    .then(response => response.json())
    .then(data =>{
        console.log("My recipe data: ", data);
    })
    .catch(error => console.error('Error:', error))
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid2 container justifyContent={"center"} direction={"column"} alignItems={"center"}>
          <Typography
            variant="h4"

          >
            Recipe Search
          </Typography>
          <Grid2>
            <TextField
              onChange={e=>setFoodType(e.target.value)}
            >
            </TextField>
          </Grid2>
          <Grid2>
            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}

export default App;
