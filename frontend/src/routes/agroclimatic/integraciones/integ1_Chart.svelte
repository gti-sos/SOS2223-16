<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import Chart from 'chart.js/auto';

    let API = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API = "http://localhost:8080" + API;

// Letssss
    let data2 = null;
    let error = null;
    let datos2 = null;
    let datos = null;
    let responsse = null;
    let result2 = "";
    let resultStatus2 ="";
    let result = "";
    let resultStatus ="";
    let dicc = {};
    let dicc2= {};
// -------

// onMount
    onMount(async () => {
            await getDatos();
    });
// -------

// Get datos
    async function getDatos(){
        try{
            const response = await fetch( "https://api-football-beta.p.rapidapi.com/leagues/seasons", {
                headers: {
                    "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
                    "X-RapidAPI-Key":"d8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0",
                },
            });
            const jsonData = await response.json();
            data2 = JSON.stringify(jsonData,null,2);
            datos2=data2;
            const {response:years} = jsonData;
            responsse = years;
            for(let i=0;i<responsse.length;i++){
                let clave = responsse[i];
                if(!dicc[clave]){
                    dicc[clave] = 1;
                }
            };
        } catch(err){
            error = err; 
        }
        const status2 = await result2.status2;
        resultStatus2 = status2;
        // Get a mi api
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            for(let j=0;j<datos.length;j++){
                let clave = datos.map((a) => a.date)[j];
                if(!dicc[clave]){
                    dicc[clave] = null;
                }
            };
            for(let i=0;i<datos.length;i++){
                let clave = datos.map((a) => a.date)[i];
                let valor = datos.map((a) => a.mintemp)[i];
                if(!dicc2[clave] || valor>dicc2[clave]){
                    dicc2[clave] = valor;
                }
            };
            loadChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }


//-------
    function loadChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: Object.keys(dicc),
                datasets: [{
                    label: 'Leage anuales de futbol',
                    data: Object.values(dicc),
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                },{
                    label: 'Temperatura Mínima anual',
                    data: Object.values(dicc2),
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            }
        });
    }
// -------------------

</script>

<main>
    <h5>Estadísticas agroclimáticas y Leage de Fútbol</h5>
    <h5>Gráfica hecha con Chart.js y tipo radar</h5>
    <canvas id="myChart"></canvas>
</main>