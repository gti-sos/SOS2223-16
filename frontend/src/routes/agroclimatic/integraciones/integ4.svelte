<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import axios from "axios";
    import * as anychart from 'anychart';


    let API = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API = "http://localhost:8080" + API;

    let error = null;
    let datos = null;
    let data = null;
    let result2 = "";
    let resultStatus2 = "";
    let result = "";
    let resultStatus = "";
    let dicc = {};
    let dicc2 = {};


// onMount
    onMount(async () => {
        await getDatos();
    });
// -------

// Petición
    const options = {
        method: 'GET',
        url: 'https://myanimelist.p.rapidapi.com/anime/top/bypopularity',
        headers: {
            'X-RapidAPI-Key': 'd8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0',
            'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
        }
    };
// --------

    async function getDatos(){
     //Get api
        try {
            const response = await axios.request(options);
            const data = response.data;
            for(let i=0;i<data.length;i++){
                let clave = data[i].title;
                let valor = data[i].members;
                dicc[clave] = valor;
            }
        } catch (err) {
            error = err;
        }
        const status2 = await result2.status2;
        resultStatus2 = status2;
     // -----------------------
     // Get a mi api
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            datos = data;
            console.log(dicc);

            for(let i = 0; i< datos.length;i++){
                let clave = datos.map((a)=>a.date)[i];
                let valor = datos.map((a) => a.maxtemp)[i];
                if(!dicc2[clave] || valor > dicc2[clave]){
                    dicc2[clave] = valor;
                }
            }
            loadChart();
        }catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
     // ------------
    }

// loadChart()
async function loadChart() {
  const chartData = [];
  for (const [clave, valor] of Object.entries(dicc2)){
    chartData.push([clave, valor]);
  }
  for (const [clave, valor] of Object.entries(dicc)) {
    chartData.push([clave, valor]);
  }
  const chart = anychart.bar();
  var series = chart.splineArea(data);
  chart.data(chartData);
  chart.yAxis().title("Valor");
  chart.yAxis().labels();
  chart.container("chart-container");
  chart.draw();
}
// -------------------
</script>

<main>
    <h1>Máximas temperaturas anuales y número de espectadores de anime</h1>
    <h4>Integración hecha con anychart</h4>
    <div id="chart-container" style="width: 600px; height: 700px;"></div>
</main>