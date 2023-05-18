<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>

</svelte:head>

<script>
    // @ts-nocheck
        import { onMount } from 'svelte';
        import { dev } from "$app/environment";
        const BASE_API_URL = "/api/v2"
        let API;
        if (dev){
            API = "http://localhost:8080" + BASE_API_URL+ "/professionalorganisations-stats";
        }else{
            API = BASE_API_URL + "/professionalorganisations-stats";
        }

    /**Lenguages API*/
    async function languagesAPI(){
        const res = await fetch(API+"/languages", {
            method: 'GET',
        });
        const resJSON= await res.json();
        console.log(resJSON);
        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
                beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
                },
                series: [{
                    type: 'wordcloud',
                    data: resJSON,
                    name: 'Occurrences'
                }],
                    title: {
                        text: 'Idiomas del mundo',
                        align: 'left'
                    },
                    subtitle: {
                        text: 'según paises',
                        align: 'left'
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
                    }
                
        });
    
    }
    onMount(async () => {
            await languagesAPI();
            await pokemonAPI();

        });


    /**Pokemon API*/
    async function pokemonAPI(){
        const res = await fetch(API+"/pokemon", {
            method: 'GET',
        });
        const resJSON= await res.json();
            Highcharts.chart('container2', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Estadísticas del pokémon Pikachu',
            align: 'left'
        },


        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: {
            series: {
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [
        {
            name: 'Browsers',
            colorByPoint: true,
            data: resJSON
        }]
    }); 
    }
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

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

    <figure class="highcharts-figure">
        <div id="container2"></div>
    </figure>
</main>