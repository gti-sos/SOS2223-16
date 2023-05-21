<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/variable-pie.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script src="https://cdn.zingchart.com/zingchart.min.js"></script>
</svelte:head>


<script>
     //@ts-nocheck
    import  { onMount } from 'svelte';
    import { dev } from "$app/environment";

    let datos = [];
    let provincia = [];
    let victims = [];
    let dateNumeric = [];
    let municipality = [];
    let id =[];
    let character =[];
    let Photo_PieFosa =[];
    let dates_act =[];
    let title =[];
    let result = "";
    let resultStatus = "";
    
     const BASE_API_URL = "/api/v2"
        let API;
        if (dev){
            API = "http://localhost:8080" + BASE_API_URL+ "/civilwarandalusian-stats";
        }else{
            API = BASE_API_URL + "/civilwarandalusian-stats";
        }

    onMount(async () =>{
        getAPIDatos();

    });

    async function getAPIDatos() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            datos.forEach(datos =>{
                        console.log(datos);
                      //  if(!(datos.province in provincia)){
                        provincia.push(datos.province);
                        victims.push(datos["victims"]);
                        dateNumeric.push(datos["dateNumeric"]);
                        municipality.push(datos["municipality"]);
                        id.push(datos.id);
                        character.push(datos["character"]);
                        Photo_PieFosa.push(datos["Photo_PieFosa"]);
                        dates_act.push(datos["dates_act"]);
                        title.push(datos["title"]);

                        
                    });
            console.log(datos.length);
            loadChart();
            loadZChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    


    async function loadChart(){
        Highcharts.chart('container', {
            chart: {
            type: 'variablepie'
                    },
            itle: {
            text: 'Estadisticas fosas comunes',
            align: 'left'
            },
            tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'victimas: <b>{point.y}</b><br/>' +
            'Año acontecimiento: <b>{point.z}</b><br/>'+
            'provincia: <b>{point.m}</b><br/>'+
            'identificador fosa: <b>{point.d}</b><br/>'+
            'titulo: <b>{point.e}</b><br/>'+
            'descripcion : <b>{point.i}</b><br/>'+
            'Enlace foto : <b>{point.o}</b><br/>'+
            'Año actualizacion : <b>{point.u}</b><br/>'
            }, 
    
   
    
            series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'ciudades',
            borderRadius: 5,
            data: [{
            name: municipality[0],
            y: victims[0],
            z: dateNumeric[0],
            m: provincia[0],
            d: id[0],
            e: title[0],
            i: character[0],
            o: Photo_PieFosa[0],
            u: dates_act[0]

        }, {
            name: municipality[1],
            y: victims[1],
            z: dateNumeric[1],
            m: provincia[1],
            d: id[1],
            e: title[1],
            i: character[1],
            o: Photo_PieFosa[1],
            u: dates_act[1]
        }, {
            name: municipality[2],
            y: victims[2],
            z: dateNumeric[2],
            m: provincia[2],
            d: id[2],
            e: title[2],
            i: character[2],
            o: Photo_PieFosa[2],
            u: dates_act[2]
        }, {
            name: municipality[3],
            y: victims[3],
            z: dateNumeric[3],
            m: provincia[3],
            d: id[3],
            e: title[3],
            i: character[3],
            o: Photo_PieFosa[3],
            u: dates_act[3]
        },
        {
            name: municipality[4],
            y: victims[4],
            z: dateNumeric[4],
            m: provincia[4],
            d: id[4],
            e: title[4],
            i: character[4],
            o: Photo_PieFosa[4],
            u: dates_act[4]
        },
        {
            name: municipality[5],
            y: victims[5],
            z: dateNumeric[5],
            m: provincia[5],
            d: id[5],
            e: title[5],
            i: character[5],
            o: Photo_PieFosa[5],
            u: dates_act[5]
        },
        {
            name: municipality[6],
            y: victims[6],
            z: dateNumeric[6],
            m: provincia[6],
            d: id[6],
            e: title[6],
            i: character[6],
            o: Photo_PieFosa[6],
            u: dates_act[6]
        },
        {
            name: municipality[7],
            y: victims[7],
            z: dateNumeric[7],
            m: provincia[7],
            d: id[7],
            e: title[7],
            i: character[7],
            o: Photo_PieFosa[7],
            u: dates_act[7]
        },
        {
            name: municipality[8],
            y: victims[8],
            z: dateNumeric[8],
            m: provincia[8],
            d: id[8],
            e: title[8],
            i: character[8],
            o: Photo_PieFosa[8],
            u: dates_act[8]
        },
        ],
        colors: [
            '#4caefe',
            '#3dc3e8',
            '#2dd9db',
            
        ]
        }]
    });
}
    async function loadZChart(){
        
        let chartConfig = {
        type: 'area',
        title: {
            text: 'Areas en Fosas Comunes ',
            adjustLayout: true,
            fontColor: '#424242',
            marginTop: '15px',
        },
        subtitle: {
            text: 'Por marmorcam',
            adjustLayout: true,
            fontColor: '#616161',
            marginTop: '45px',
        },
        plot: {
            tooltip: {
            visible: false,
            },
            alphaArea: 0.6,
            aspect: 'spline',
            stacked: true,
        },
        plotarea: {
            margin: 'dynamic',
        },
        scaleX: {
            item: {
            fontColor: '#616161',
            paddingTop: '5px',
            },
            label: {
            fontColor: '#616161',
            text: 'Desglose de Fosas Comunes',
            },
            labels: datos.map(a=> a.municipality),
            lineColor: '#AAA5A5',
            tick: {
            lineColor: '#AAA5A5',
            },
        },
        scaleY: {
            guide: {
            lineColor: '#AAA5A5',
            lineStyle: 'dotted',
            },
            item: {
            fontColor: '#616161',
            paddingRight: '5px',
            },
            label: {
            fontColor: '#616161',
            text: 'Quantity',
            },
            lineColor: '#AAA5A5',
            short: true,
            shortUnit: 'k',
            tick: {
            lineColor: '#AAA5A5',
            },
        },
        crosshairX: {
            lineColor: '#AAA5A5',
            plotLabel: {
            backgroundColor: '#EBEBEC',
            borderColor: '#AAA5A5',
            borderRadius: '2px',
            borderWidth: '2px',
            fontColor: '#616161',
            thousandsSeparator: ',',
            },
            scaleLabel: {
            backgroundColor: '#EBEBEC',
            borderColor: '#AAA5A5',
            fontColor: '#424242',
            },
        },
        series: [
            {
            text: 'dateNumeric',
            values: datos.map(a=> a.dateNumeric),
            backgroundColor: '#4CAF50',
            lineColor: '#4CAF50',
            marker: {
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
            },
            },
            {
            text: 'victimas',
            values: datos.map(a=> a.victims),
            backgroundColor: '#E53935',
            lineColor: '#E53935',
            marker: {
                backgroundColor: '#E53935',
                borderColor: '#E53935',
            },
            },
            {
            text: 'datesACt',
            values: datos.map(a=> a.dates_act),
            backgroundColor: '#00BCD4',
            lineColor: '#00BCD4',
            marker: {
                backgroundColor: '#00BCD4',
                borderColor: '#00BCD4',
            },
            },
        ],
        };

        zingchart.render({
        id: 'myChart',
        data: chartConfig,
        height: '100%',
        width: '100%',
        });

    }



</script>
<style>
@import 'https://fonts.googleapis.com/css?family=Montserrat';
@import 'https://fonts.googleapis.com/css?family=Lato:400';

.chart--container {
  height: 100%;
  width: 100%;
  min-height: 530px;
}




    #container {
    height: 500px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 700px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>

<main>
    <h1>
        Grafica Highcharts
    </h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Tipo variablepie
        </p>
    </figure>
    <h5>Grafica zingchart</h5>
        <p>Tipo <area shape="" coords="" href="" alt=""></p>
    <div id="myChart" class="chart--container"></div>
</main>

