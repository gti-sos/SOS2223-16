<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.js"></script>
    <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.css">
</svelte:head>

<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import bb, {bar} from "billboard.js";



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
    let dicc={};
//----------------

 // onMount
    onMount(async () => {
        await getDatos();
    });
 // -------

// Get datos
    async function getDatos() {
        //Get a mi api
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            for(let i=0;i<datos.length;i++){
                let clave = datos.map((a) => a.date)[i];
                let valor = datos.map((a) => a.maxtemp)[i];
                if(!dicc[clave] || valor>dicc[clave]){
                    dicc[clave] = valor;
                }
            };
            console.log(datos.length);
            loadChart();
            loadBillboard();
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
                text: "Estadísticas agroclimáticas",
            },
            subtitle: {
                text: "Gráfica hecha con HighCharts",
            },
            xAxis: {
                categories: datos.map((a) => `${a.reg_num}-${a.location}-${a.stations_id}`),
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

// loadBillboard()
    async function loadBillboard(){
        bb.generate({
            bindto: "#Chart",
            data:{
                x: "tr",
                columns: [
                    ["tr", ...Object.keys(dicc)],
                    ["Máx Temperatura", ...Object.values(dicc)],
                ],
                type: bar(),
                
            },            
        });
    }
// -----------------
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <h1 class="highcharts-description">
         Estadísticas agroclimáticas
        </h1>
        <h5>Temperatura máxima por año</h5>
        <p>hecho con billboard.js</p>
    </figure>
    <div id="Chart"></div>
    
</main>