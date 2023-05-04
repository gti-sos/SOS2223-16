<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from 'svelte';
    import { dev } from "$app/environment";


    let API = "/api/v2/cadiz-agroclimatic-informations-stats";

    if (dev) API = "http://localhost:8080" + API;
    let datos = [];
    let result = "";
    let resultStatus="";
    let fut = [];


    onMount(async () =>{
        await getDatos();
    })

    const url= 'https://api-football-beta.p.rapidapi.com/leagues';
    const options = {
        method: 'GET',
        params: {id: '61'}, //id de la leage
        headers: {
            'X-RapidAPI-Key': 'd8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    const res2 = await fetch(url,options);

    async function getDatos() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            datos.sort((a,b) => new DataTransfer(a.date) - new Date(b.date));
            const data2 = await res2.json();
            fut=data2;
            console.log(data2);
            loadChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }



    async function loadChart(){
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Temperaturas de Cádiz y las leage'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 60,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            },
            yAxis: {
                title: {
                    text: 'Temperatura (ºC)'
                }
            },
            plotOptions: {
                series: {
                    pointStart: Math.min(...datos.map(d => new Date(d.date)))
                },
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Temperatura máxima',
                data: datos.map(dato => dato.maxtemp)
            }, {
                name: 'Temperatura mínima',
                data: datos.map(dato => dato.mintemp)
            }, {
                name: 'Temperatura media',
                data: datos.map(dato => dato.averagetemp)
            }]
        });

        
    }
    
    
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Un pequeño ejemplo en highchart.

        </p>
    </figure>
    <!-- <table>
        <thead>
            <tr>
                <th>Año</th>
                <th>Número de registro</th>
                <th>Id</th>
                <th>Temp máxima</th>
                <th>Temp mínima</th>
                <th>Temp media</th>
                <th>Localidad</th>
            </tr>
        </thead>
        <tbody>
            {#each datos as dato}
                <tr>                
                    <td>{dato.date}</td>
                    <td><a href="/agroclimatic/{dato.reg_num}">{dato.reg_num}</a></td>
                    <td>{dato.stations_id}</td>
                    <td>{dato.maxtemp}</td>
                    <td>{dato.mintemp}</td>
                    <td>{dato.averagetemp}</td>
                    <td>{dato.location}</td>
                </tr>
            {/each}
        </tbody>
    </table> -->
</main>