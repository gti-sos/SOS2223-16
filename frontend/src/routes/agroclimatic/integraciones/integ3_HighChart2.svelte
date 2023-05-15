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
    url: 'https://everyearthquake.p.rapidapi.com/earthquakes',
    params: {
        start: '1',
        count: '100',
        type: 'earthquake',
        latitude: '33.962523',
        longitude: '-118.3706975',
        radius: '1000',
        units: 'miles',
        magnitude: '3',
        intensity: '1'
    },
    headers: {
        'X-RapidAPI-Key': 'd8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0',
        'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
    }
    };
// --------

    async function getDatos(){
     //Get api
        try {
            const response = await axios.request(options);
            const data = response.data.data;
            for (let i=0;i<data.length;i++){
                for(let j=0;j<data[i].locationDetails.length;j++){
                    let clave = data[i].locationDetails[j].name;
                    let valor = parseInt(data[i].locationDetails[j].adminLevel);
                    if(valor > 0){
                    dicc[clave] = valor;
                    }
                }
            }
            console.log(dicc);
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
                let valor = datos.map((a) => a.mintemp)[i];
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
        Highcharts.chart("container3", {
            chart: {
                type: "areaspline",
            },
            title: {
                text: `Estadísticas agroclimáticas y Magnitud de terremotos"`,
            },
            subtitle: {
                text: "Gráfica hecha con HighCharts y tipo areaspline",
            },
            xAxis: {
                categories: Object.keys(dicc),
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Valor",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: "Magnitud del terremoto",
                    data: Object.values(dicc),
                },
                {
                    name: "Temperatura Mínima",
                    data: Object.values(dicc2),
                },                
            ],
        });
    }
//-------------------
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container3"></div>
        <p>Se han cogido valores mayores de 0 para las magnitudes</p>
    </figure>
    
</main>
