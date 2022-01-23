import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {


  const [Results,setResults] = useState([])

  useEffect( ()=>{
       getLocation()
      // console.log('got results',results);
  },[])

  function getLocation() {
    if (navigator.geolocation) {
     const results =  navigator.geolocation.getCurrentPosition(showPosition)
    console.log('results',results);
     return results
    } else {
      // x.innerHTML = "Geolocation is not supported by this browser.";
    console.log('geo location api didnt work');
    }
  }

  function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;

    const lat = position.coords.latitude
    const long = position.coords.longitude

    console.log('position',position.coords);
    
    axios.get(`/GetNearByTouristPlaces/?lat=${lat}&long=${long}`).then((res)=>{
      console.log('response',res.data.results)
      setResults(res.data.results)
        
    }).catch((err)=>{
      console.log('response',err.response);
    })
    // return position
  }

  return (
    <div className="App">
   
<div className=""  style={{display:'flex' , height : '100vh' ,width : 100 + '%' ,overflow:'scroll' , }} >


{Results.length > 0 && Results.map((ER)=>{

  return  <div className=""  >
   
   <Card sx={{ minWidth: 275 ,width: 400 + 'px!important ' ,height : 'auto' ,margin : 1 + 'rem' }}>
   <CardContent>
   
     <Typography variant="body2">
 
     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
   <Grid item xs={6} sx={{ textAlign: 'left' }} >
   Id
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }} >
   {ER.id} 
   </Grid>
   <Grid item xs={6}sx={{ textAlign: 'left' }} >
   Place Name
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }}>
   {ER.poi.name} 
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }}>
   Coordinates
   </Grid>
   <Grid item xs={6}sx={{ textAlign: 'left' }} >
   lat {ER.position.lat}  , long {ER.position.lon}
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }}>
   Address
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }}>
   {ER.address.freeformAddress}
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }}>
   StreetName
   </Grid>
   <Grid item xs={6} sx={{ textAlign: 'left' }}>
   {ER.address.streetName}
   </Grid>
 </Grid>
     </Typography>
   
   </CardContent>
   
   <CardActions>
   
   </CardActions>
   </Card>
   </div>

  
  
      })}

</div>

    </div>
  );
}

export default App;
