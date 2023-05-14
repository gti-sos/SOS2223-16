import axios from "axios";

let dicc = {};

const options = {
  method: 'GET',
  url: 'https://myanimelist.p.rapidapi.com/anime/top/bypopularity',
  headers: {
    'X-RapidAPI-Key': 'd8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0',
    'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
  }
};

try {
  const response = await axios.request(options);
  const data = response.data;
  for(let i=0;i<data.length;i++){
    let clave = data[i].title;
    let valor = data[i].members;
    dicc[clave] = valor;
  }
  
  console.log(dicc);
} catch (error) {
  console.error(error);
}

// for (let i=0;i<data.length;i++){
//   for(let j=0;j<data[i].locationDetails.length;j++){
//     let clave = data[i].locationDetails[j].name;
//     let valor = data[i].locationDetails[j].adminLevel;
//     if(valor > 0){
//       dicc[clave] = valor;
//     }
//   }
// }