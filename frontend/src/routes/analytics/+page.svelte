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

    let API_agric = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API_agric = "http://localhost:8080" + API_agric;

    let datosAg = null;
    let error = null;
    let dataAg = null;
    let responseAg = null;
    let resultAg = "";
    let resultStatusAg = "";

    onMount(async () => {
        await getDatos();
    });

    async function getDatos(){
        resultStatusAg = resultAg = "";
        const res = await fetch(API_agric, {
            method: "GET",
        });
        try{
            const dataAg = await res.json();
            resultAg = JSON.stringify(dataAg, null, 2);
            datosAg = dataAg;
            //-----
            loadChart();
        } catch (error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatusAg = status;
    }

    async function loadChart() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas agroclimáticas",
            },
            subtitle: {
                text: "Gráfica hecha con HighCharts",
            },
            xAxis: {
                categories: datosAg.map((a) => `${a.reg_num}-${a.location}-${a.stations_id}-${a.date}`),
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Grados (ºC)",
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
                    data: datosAg.map(a => a.maxtemp),
                },
                {
                    name: "Min Temperatura",
                    data: datosAg.map(a => a.mintemp),
                },
                {
                    name: "Temperatura Media",
                    data: datosAg.map(a => a.averagetemp),
                },                
            ],
        });
    }

</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <h1 class="highcharts-description">
         Estadísticas agroclimáticas
        </h1>
        <h5>Temperatura máxima por año</h5>
    </figure>
    <div id="Chart"></div>
    
</main>