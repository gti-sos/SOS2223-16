
<script>
        // @ts-nocheck
        import { onMount } from 'svelte';
        import { dev } from "$app/environment";
        import { chart } from 'svelte-apexcharts?client';
        const BASE_API_URL = "/api/v2"
        let API;
        if (dev){
            API = "http://localhost:8080" + BASE_API_URL+ "/professionalorganisations-stats";
        }else{
            API = BASE_API_URL + "/professionalorganisations-stats";
        }
        let options =  {
                    chart: {
                    type: "bar",
                    },
                    series: [
                    {
                        name: "Colegios profesionales",
                        data: [],
                    },
                    ],
                    xaxis: {
                    categories: [],
                    },
                };
    
    /**AwesomeCharting*/
    async function updateTable(){
            const res = await fetch(API+"/yearsTable", {
                    method: 'GET',
            });
            const resJSON= await res.json();
            console.log(res);
            console.log(resJSON);
            options.series[0].data=[];
            options.xaxis.categories=[];
            for (const property in resJSON) {
                options.series[0].data.push(resJSON[property]);
                options.xaxis.categories.push(property);
            }
    }
        onMount(async () => {
            await updateTable();
        });
    
    /**HighChart*/
    async function loadChart(){
            const res = await fetch(API+"/bubbleChart", {
                    method: 'GET',
                });
                const resJSON= await res.json();
                console.log(resJSON);
                Highcharts.chart('container', {
                    chart: {
                        type: 'packedbubble',
                        height: '100%'
                    },
                    title: {
                    text: 'Gráfico de burbujas',
                    align: 'left'
                },
                tooltip: {
                    useHTML: true,
                    pointFormat: '<b>{point.name}:</b> se repite {point.value} veces'
                },
                plotOptions: {
                    packedbubble: {
                        minSize: '20%',
                        maxSize: '100%',
                        zMin: 0,
                        zMax: 100,
                        layoutAlgorithm: {
                            gravitationalConstant: 0.05,
                            splitSeries: true,
                            seriesInteraction: false,
                            dragBetweenSeries: true,
                            parentNodeLimit: true
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            filter: {
                                property: 'y',
                                operator: '>',
                                value: 1
                            },
                            style: {
                                color: 'black',
                                textOutline: 'none',
                                fontWeight: 'normal'
                            }
                        }
                    }
                },
                series: resJSON
            });
        }

        onMount(async () => {
            await loadChart();
        });
</script>


<style>
    .highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
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

<!--Charts-->
<table>
    <tr>
        <td style="width: 50%;">
        <div style="margin-left: 10px;
                    width: 100%;
                    border-radius: 16px;
                    background-image: linear-gradient(131.83deg, #FFFAFA 0%, #FFF7F7 99.21%);">
            <h1>Gráfico que muestra los colegios profesionales por año</h1>
            <br><a href="https://github.com/apexcharts/apexcharts.js">apexcharts.js</a>
            {#if options != null} 
            <div use:chart={options} />
            {/if}
        </div>
        </td>
        <td style="width: 50%;">
        <main style="margin-left: 10px;
                    width: 100%;
                    border-radius: 16px;
                    background-image: linear-gradient(131.83deg, #FFFAFA 0%, #FFF7F7 99.21%);">
            <h1>Campos de estudio de los colegios profesionales</h1>
            <figure class="highcharts-figure">
            <div id="container"></div>
            </figure>
        </main>
        </td>
    </tr>
</table>



