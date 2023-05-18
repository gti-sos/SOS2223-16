<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import Chart from 'chart.js/auto';

    let API_agroclimatic = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API_agroclimatic = "http://localhost:8080" + API_agroclimatic;

// Letssss
    let datos = null;
    let result = "";
    let resultStatus ="";
    let dicc = {};
// -------

// onMount
    onMount(async () => {
            await getDatos();
    });
// -------

// Get datos
    async function getDatos(){
        // Get agroclimatic api
        resultStatus = result = "";
        const res = await fetch(API_agroclimatic, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            for(let i=0;i<datos.length;i++){
                let clave = datos.map((a) => a.date)[i];
                let valor = datos.map((a) => a.mintemp)[i];
                dicc[clave] = valor;
            };
            loadChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
//-------

//loadChart
    function loadChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
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
                // },{
                //     label: 'Temperatura Mínima anual',
                //     data: Object.values(dicc2),
                //     fill: true,
                //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
                //     borderColor: 'rgb(54, 162, 235)',
                //     pointBackgroundColor: 'rgb(54, 162, 235)',
                //     pointBorderColor: '#fff',
                //     pointHoverBackgroundColor: '#fff',
                //     pointHoverBorderColor: 'rgb(54, 162, 235)'
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