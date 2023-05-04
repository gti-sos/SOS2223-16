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

    let API = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API = "http://localhost:8080" + API;

// Letsss
    let resultStatus = "";
    let result = "";
    let resultStatus2 = "";
    let result2 = "";
    let datos = [];
    let fut = [];
    let years = [];
//----------------




// onMount
    onMount(async () =>{
        await getDatos();
    });
// -------    

// Petición API
    const url = "https://api-football-beta.p.rapidapi.com/leagues";
    const options = {
        method: "GET",
        params: { id: "61" }, //id de la leage
        headers: {
            "X-RapidAPI-Key": "d8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0",
            "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
        },
    };
// -----

// Get datos
    async function getDatos(){
        //Le hacemos el get a la API
        resultStatus2 = result2 = "";
        const res2 = await fetch(url,options);
        if(res2.ok){
            try{
                const data2  = await res2.json();
                result2 = JSON.stringify(data2,null,2);
                fut = response.data2.response[0].seasons.map(s => s.year);
            }catch(error){}
        }else{
            console.log("Error al devolver la gráfica");
        }
        const status2 = await res2.status2;
        resultStatus2 = status2;

        //Get a mi api
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try{
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            datos = data;
            loadChart();
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        
    }
// ------

// Total años
function años(y1,y2){
        let t = y1.concat(y2);
        let t2 = t.filter((item, index) => {
            return t.indexOf(item) === index;
        });
        return t2;
    }
    // years = datos.date.sort((a,b) => (a.date) - (b.date));
    // años(fut,years)
// ----------

// loadChart()
    async function loadChart(){
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Temperaturas de Cádiz y las leage de futbol'
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
                    pointStart: fut
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
// -----------
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