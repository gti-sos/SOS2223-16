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
    let datosId = [];
    let algo = [];
    let fut = [];
    let years = [];
//----------------

 // onMount
    onMount(async () => {
        await getDatos();
    });
 // -------

// Petición API
    // const url = "https://api-football-beta.p.rapidapi.com/leagues";
    // const options = {
    //     method: "GET",
    //     params: { id: "61" }, //id de la leage
    //     headers: {
    //         "X-RapidAPI-Key": "d8479c0b7emsh6dfec3aab4ff8ddp1d8607jsnd7559b94f8d0",
    //         "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
    //     },
    // };
// -----

// Get datos
    async function getDatos() {
        //Le hacemos el get a la API
        // resultStatus2 = result2 = "";
        // const res2 = await fetch(url,options);
        // if(res2.ok){
        //     try{
        //         const data2  = await res2.json();
        //         result2 = JSON.stringify(data2,null,2);
        //         fut = response.data2.response[0].seasons.map(s => s.year);
        //     }catch(error){}
        // }else{
        //     console.log("Error al devolver la gráfica");
        // }
        // const status2 = await res2.status2;
        // resultStatus2 = status2;

        //Get a mi api
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            // algo = [...new Set(datos.map((d) => d.date).sort((a, b) => a - b))];
            // console.log(algo);
            // datosId = [...new Set(datos.map((d) => d.stations_id).sort((a, b) => a - b)),];
            // console.log(datosId);
            console.log(datos.map((a) => a.date));
            loadChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
// ---------------

// loadChart()
    async function loadChart() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Temperaturas por año e id",
            },
            subtitle: {
                text: "Pertenecientes a Cádiz",
            },
            xAxis: {
                categories: datos.map((a) => `${a.date}-${a.stations_id}`),
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Rainfall (mm)",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
                    name: "Máx Temperatura",
                    data: datos.map(a => a.maxtemp),
                },
                {
                    name: "Min Temperatura",
                    data: datos.map(a => a.mintemp),
                },
                {
                    name: "Temperatura Media",
                    data: datos.map(a => a.averagetemp),
                },                
            ],
        });
    }
// -------------------
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
         Gráfica de las temperaturas de Cádiz
        </p>
    </figure>
    <table>
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
    </table>
</main>