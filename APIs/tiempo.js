import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api-football-beta.p.rapidapi.com/leagues',
  params: { id: '61' }, //id de la leage
  headers: {
    'X-RapidAPI-Key': 'd8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0',
    'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
  }
};

try {
  const response = await axios.request(options);
  console.log(response.data);
  const d = response.data.response[0].seasons.map(s => s.year);
  const l = response.data.results;
  
  console.log(l);
} catch (error) {
  console.error(error);
}
