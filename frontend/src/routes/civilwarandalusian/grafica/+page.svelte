<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>


<script>
     

    //@ts-nocheck
    import  {onMount} from 'svelte';
    import { dev } from "$app/environment";
    
    let API = "/api/v2/civilwarandalusian-stats";
    if (dev) API = "http://localhost:8080" + API;

    onMount(async () =>{
        getAPIDatos();
    });

    async function getAPIDatos() {
        //Get a mi api
        var resultado = {};
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
            for(let i=0;i<datos.length;i++){
                let clave = datos.map((a) => a.province)[i];
                let valor = datos.map((a) => a.victims)[i];
                if(resultado.hasOwnProperty(clave)){
                    resultado[clave] += valor;
                    } else {
                    resultado[clave] = valor;
                    }
                 };
            console.log(datos.length);
            loadChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }


    async function loadChart(){
        var colors = Highcharts.getOptions().colors,
        categories = [
            resultados[clave]
         ],
        data = [
        {
            y: resultados[valor],
            color: colors[2],
            drilldown: {
                name: resultados[clave][0],
                categories: [
                    'Chrome v97.0',
                    'Chrome v96.0',
                    'Chrome v95.0',
                    'Chrome v94.0',
                    'Chrome v93.0',
                    'Chrome v92.0',
                    'Chrome v91.0',
                    'Chrome v90.0',
                    'Chrome v89.0',
                    'Chrome v88.0',
                    'Chrome v87.0',
                    'Chrome v86.0',
                    'Chrome v85.0',
                    'Chrome v84.0',
                    'Chrome v83.0',
                    'Chrome v81.0',
                    'Chrome v89.0',
                    'Chrome v79.0',
                    'Chrome v78.0',
                    'Chrome v76.0',
                    'Chrome v75.0',
                    'Chrome v72.0',
                    'Chrome v70.0',
                    'Chrome v69.0',
                    'Chrome v56.0',
                    'Chrome v49.0'
                ],
                data: [
                    resultados[valor][0]
                ]
            }
        },
        {
            y: 9.47,
            color: colors[3],
            drilldown: {
                name: 'Safari',
                categories: [
                    'Safari v15.3',
                    'Safari v15.2',
                    'Safari v15.1',
                    'Safari v15.0',
                    'Safari v14.1',
                    'Safari v14.0',
                    'Safari v13.1',
                    'Safari v13.0',
                    'Safari v12.1'
                ],
                data: [
                    0.1,
                    2.01,
                    2.29,
                    0.49,
                    2.48,
                    0.64,
                    1.17,
                    0.13,
                    0.16
                ]
            }
        },
        {
            y: 9.32,
            color: colors[5],
            drilldown: {
                name: 'Edge',
                categories: [
                    'Edge v97',
                    'Edge v96',
                    'Edge v95'
                ],
                data: [
                    6.62,
                    2.55,
                    0.15
                ]
            }
        },
        {
            y: 8.15,
            color: colors[1],
            drilldown: {
                name:  resultados[clave][0],
                categories: [
                    'Firefox v96.0',
                    'Firefox v95.0',
                    'Firefox v94.0',
                    'Firefox v91.0',
                    'Firefox v78.0',
                    'Firefox v52.0'
                ],
                data: [
                    4.17,
                    3.33,
                    0.11,
                    0.23,
                    0.16,
                    0.15
                ]
            }
        },
        {
            y: 11.02,
            color: colors[6],
            drilldown: {
                name: 'Other',
                categories: [
                    'Other'
                ],
                data: [
                    11.02
                ]
            }
        }
            ],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

    // add browser data
    browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
    });

    // add version data
    drillDataLen = data[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
            name: data[i].drilldown.categories[j],
            y: data[i].drilldown.data[j],
            color: Highcharts.color(data[i].color).brighten(brightness).get()
        });
    }
}

    // Create the chart
    Highcharts.chart('container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Browser market share, January, 2022',
        align: 'left'
    },
    subtitle: {
        text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
        align: 'left'
    },
    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    series: [{
        name: 'Browsers',
        data: browserData,
        size: '60%',
        dataLabels: {
            formatter: function () {
                return this.y > 5 ? this.point.name : null;
            },
            color: '#ffffff',
            distance: -30
        }
    }, {
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
            formatter: function () {
                // display only if larger than 1
                return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                    this.y + '%' : null;
            }
        },
        id: 'versions'
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                series: [{
                }, {
                    id: 'versions',
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        }]
    }
    });
    }

    


</script>


<main>
    <h1>
        Graph
    </h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            
        </p>
    </figure>
    

</main>

