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

    const average = arr => {
        if(arr.length === 0) return 0;
        return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
    };

    let dataAg = null;
    let dataCw = null;
    let dataprofessionalOrg = null;
    let responseAg = null;
    let resultAg = "";
    let resultStatusAg = "";
    let resultcw = "";
    let resultStatuscw = "";
    let resultprofessionalOrg = "";
    let resultStatusprofessionalOrg = "";
    let years = new Set();

    onMount(async () => {
        
        await getProfessionalOrg();   
        await getAgro();
        await getPhoses();
        await loadChart();

    });

    //Carlos
    async function getAgro(){
        let API_agric = "/api/v2/cadiz-agroclimatic-informations-stats";
        if (dev) API_agric = "http://localhost:8080" + API_agric;
        const res = await fetch(API_agric, {
            method: "GET",
        });
        try{
            dataAg= await res.json();
            dataAg.forEach((a) => {
                years.add(a.date);
            });

        } catch (error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatusAg = status;
    }

    //Marcos
    async function getPhoses(){
        resultStatuscw = resultcw = "";
        let API_civil = "/api/v2/civilwarandalusian-stats";
        if (dev) API_civil = "http://localhost:8080" + API_civil;
        const res = await fetch(API_civil, {
            method: "GET",
        });
        try{
            dataCw= await res.json();
            dataCw.forEach((a) => {
                years.add(a.dates_act);
            });

        } catch (error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatusAg = status;
    }

    //Carolina
    async function getProfessionalOrg(){
        let API_professionalOrg = "/api/v2/professionalorganisations-stats";
        if (dev) API_professionalOrg = "http://localhost:8080" + API_professionalOrg;
        const res = await fetch(API_professionalOrg, {
            method: "GET",
        });
        try{
            dataprofessionalOrg= await res.json();
            dataprofessionalOrg.forEach((a) => {
                years.add(a.date);
            });

        } catch (error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatusprofessionalOrg = status;
    }
    
    
    async function loadChart() {
        let tempMediaSeries=[];
        let tempMaxSeries=[];
        let tempMinSeries=[];
        let victimDocSeries=[];
        let victimSeries=[];
        let victimIdSeries=[];
        let ProfessionalOrgIdSeries=[];
        let ProfessionalOrgCpSeries=[];
        let ProfessionalOrgCount=[];

        //set to array
        years=[...years].sort();
        years.forEach((year) => {
            let dataAgYear = dataAg.filter((a) => a.date === year);
            let dataCWYear = dataCw.filter((a) => a.dates_act === year);
            let dataCWVictimYear = dataCw.filter((a) => a.dateNumeric === year);
            let dataProfessionalOrgYear = dataprofessionalOrg.filter((a) => a.date === year);

            //Carlos
            tempMediaSeries.push(average(dataAgYear.map((a) => a.averagetemp)));
            tempMaxSeries.push(average(dataAgYear.map((a) => a.maxtemp)));
            tempMinSeries.push(average(dataAgYear.map((a) => a.mintemp)));

            //Marcos
            victimDocSeries.push(average(dataCWYear.map((a) => a.victims)));
            victimSeries.push(average(dataCWVictimYear.map((a) => a.victims)));
            victimIdSeries.push(average(dataCWYear.map((a) => a.Id)));

            //Carolina
            ProfessionalOrgIdSeries.push(average(dataProfessionalOrgYear.map((a) => a.registry_number)));
            ProfessionalOrgCpSeries.push(average(dataProfessionalOrgYear.map((a) => a.postal_code/1000)));
            ProfessionalOrgCount.push(dataProfessionalOrgYear.length);

        });


        console.log(years);
        console.log(tempMediaSeries);
        console.log(victimSeries);

        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas conjuntas",
            },
            subtitle: {
                text: "Gráfica hecha con HighCharts",
            },
            xAxis: {
                categories: 
                    years ,
                    crosshair: true,
            },
            yAxis: {
                min: 0
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: "Temperatura máxima media por año",
                    data: tempMaxSeries,
                },
                {
                    name: "Temperatura minima media por año",
                    data: tempMinSeries,
                },
                {
                    name: "Temperatura media por año",
                    data: tempMediaSeries,
                },
                {
                    name: "Victimas medias por año (fecha del documento)",
                    data: victimDocSeries,
                },
                {
                    name: "Victimas medias por año (fecha del hecho)",
                    data: victimSeries,
                },
                {
                    name: "Id media de documento de victima por año",
                    data: victimIdSeries,
                },
                {
                    name: "Id media de colegios profesionales por año",
                    data: ProfessionalOrgIdSeries,
                },
                {
                    name: "Media de los códigos postales (dos primeros dígitos) de los colegios profesionales por año",
                    data: ProfessionalOrgCpSeries,
                },
                {
                    name: "Numero de los colegios profesionales por año",
                    data: ProfessionalOrgCount,
                }
                
            ],
        });
    }

</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <div id="Chart"></div>
    
</main>