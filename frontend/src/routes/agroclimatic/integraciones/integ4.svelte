<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import axios from "axios";
    import uPlot from 'uplot';


    let API = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API = "http://localhost:8080" + API;

    let data2 = null;
    let error = null;
    let datos2 = null;
    let datos = null;
    let data = null;
    let responsse = null;
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
            for(let i = 0; i< datos.length;i++){
                let clave = datos.map((a)=>a.date)[i];
                let valor = null;
                if(!dicc[clave] || valor > dicc[clave]){
                    dicc[clave] = valor;
                }
            }

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
        const data = datos.map((d) => [new Date(d.date).getTime(), d.maxtemp]);
    const opts = {
        title: "Temperatura máxima",
        scales: {
            x: {
                time: true,
                auto: true,
            },
            y: {
                auto: true,
            },
        },
        series: [
            {},
        ],
    };
    const uplot = new uPlot(opts, [data], document.getElementById("chart"));
    };

   
// -------------------
</script>

<main>
    <div id="chart"></div>
    
</main>