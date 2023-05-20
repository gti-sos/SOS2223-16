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
    //carlos
    let API_agric = "/api/v2/cadiz-agroclimatic-informations-stats";
    if (dev) API_agric = "http://localhost:8080" + API_agric;
    //Marcos
    let API_Civil = "/api/v2/civilwarandalusian-stats";
    if (dev) API_Civil = "http://localhost:8080" + API_Civil;

    let datosAg = null;
    let error = null;
    let dataAg = null;
    let responseAg = null;
    let resultAg = "";
    let resultStatusAg = "";

    let resultcw = "";
    let resultStatuscw = "";
    let datoscw = null;

    onMount(async () => {
        await getDatos();
        await getPhoses();
    });

    //Carlos
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

    //Marcos
    async function getPhoses(){
        resultStatuscw = resultcw = "";
        const res1 = await fetch(API_Civil, {
            method: "GET",
        });
        try{
            const datacw = await res1.json();
            resultAg = JSON.stringify(datacw, null, 2);
            datoscw = datacw;
            //-----
            loadChart();
        } catch (error){
            console.log(`Error parsing result: ${error}`);
        }
        const status1 = await res1.status;
        resultStatuscw = status1;
    }
    
    
    async function loadChart() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas agroclimáticas-Fosas Guerra Civil",
            },
            subtitle: {
                text: "Gráfica hecha con HighCharts",
            },
            xAxis: {
                categories: 
                    datosAg.map((a) => `${a.reg_num}-${a.location}-${a.stations_id}-${a.date}}`) ,
                    crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Grados (ºC)",
                    //text2: "Fosas",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    ['<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>'] ,
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
                {
                    name: "victimas",
                    data: datoscw.map(a => a.victims),
                },
                {
                    name: "Diferencia acontecimiento-actualizacion",
                    data: datoscw.map(a => (a.dates_act-a.dateNumeric)),
                },
                {
                    name: "Identificador",
                    data: datoscw.map(a => a.Id),
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