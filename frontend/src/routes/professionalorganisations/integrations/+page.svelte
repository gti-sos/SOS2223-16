

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

    
    
    onMount(async () => {
            await languagesAPI();
            await pokemonAPI();
            await spotifyAPI();
            await MovieAPI();

        });

/**Lenguages API*/
async function languagesAPI(){
        console.log("API")
        const res = await fetch(API+"/proxy/languages", {
            method: 'GET',
        });
        const resJSON= await res.json();

        console.log(resJSON);

        let languagesArray = [];
        resJSON.forEach(element => {
            let existingLanguage = languagesArray.find(x => x.name === element.name);
            if (existingLanguage !== undefined) {
                    existingLanguage.weight += 1;
                } else {
                    languagesArray.push({
                        name: element.name,
                        weight: 1
                    });
                }
            });
        
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
                    data: languagesArray,
                    name: 'Occurrences'
                }],
                    title: {
                        text: 'Idiomas del mundo',
                        align: 'left'
                    },
                    subtitle: {
                        text: 'uso de proxy para acceder a la API',
                        align: 'left'
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
                    }
                
        });
    }


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

    /**Spotify API*/
    async function spotifyAPI(){
        const res = await fetch(API+"/spotify", {
            method: 'GET',
        });
        const resJSON= await res.json();
        Highcharts.chart('container3', {
            title: {
            text: 'Integración entre dos APIs: Spotify y Colegios Profesionales'
            },
        yAxis: {
            min: 0
        },
        series: [
            {
                type: 'scatter',
                name: 'Nuevos Colegios Profesionales',
                data: resJSON.professionalorganisations,
                marker: {
                    radius: 6
                },      
            }, 
            {
                type: 'scatter',
                name: 'Álbumes de Spotify de género pop publicados',
                data: resJSON.spotify,
                marker: {
                    radius: 4
                }
            }]
        });
    }

    /**Movie API*/
    async function MovieAPI(){
        const res = await fetch(API+"/movies", {
            method: 'GET',
        });
        const resJSON= await res.json();
        var chart = Highcharts.chart('container4', {
            chart: {
            type: 'column'
            },

            title: {
            text: 'Integración entre dos APIs: Películas de Harry Potter y Colegios Profesionales'
            },

            subtitle: {
            text: 'Haz click en los botones para cambiar el tamaño del gráfico'
            },

            legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
            },

            xAxis: {
            categories: resJSON.HarryPotter[0],
            labels: {
                x: -10
            }
            },

            yAxis: {
            allowDecimals: false,
            title: {
                text: 'Amount'
            }
            },

            series: [{
            name: 'Películas de Harry Potter',
            data: resJSON.HarryPotter,
            }, {
            name: 'Colegios Profesionales',
            data: resJSON.professionalorganisations,
            }],

            responsive: {
            rules: [{
                condition: {
                maxWidth: 500
                },
                chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                    },
                    title: {
                    text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
                }
            }]
            }
});

document.getElementById('small').addEventListener('click', function () {
chart.setSize(400);
});

document.getElementById('large').addEventListener('click', function () {
chart.setSize(600);
});

document.getElementById('auto').addEventListener('click', function () {
chart.setSize(null);
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
    <figure class="highcharts-figure">
        <div id="container3"></div>
    </figure>
    <figure class="highcharts-figure">
        <div id="container4"></div>
        <button id="small">Pequeño</button>
        <button id="large">Mediano</button>
        <button id="auto">Grande</button>
</main>