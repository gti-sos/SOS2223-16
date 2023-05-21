<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table } from "sveltestrap";
    import axios from 'axios';
    
    let API = "/api/v2/civilwarandalusian-stats";
    if (dev) API = "http://localhost:8080" + API;
    
    onMount(async () => {
        getRapidApi();
        getRapidApi2();
        getDato_compañero();
        getDato_compañero2();
    });

    let datos2 = [];
    let datos3 = [];
    let datos4 = [];
    let datos5 = [];
    let data2 = [];



    async function getRapidApi() {
      console.log("API");
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '031e30be2bmsh4012077306f5d0fp169105jsn72f6d2c3886b',
          'X-RapidAPI-Host': 'drinks-digital1.p.rapidapi.com'
        }
      };
      try{
       
        const pprox = await fetch(API+"/proxy/datos",{
                method: 'GET',
                
                });
            const jsonData = await pprox.json();
            datos2 = jsonData;
            console.log(datos2);
        } catch (error) {
          console.error(error);
        }



    }

    async function getRapidApi2() {

              const options1 = {
          method: 'GET',
          url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          headers: {
            'X-RapidAPI-Key': '031e30be2bmsh4012077306f5d0fp169105jsn72f6d2c3886b',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        };

        try {
          const response = await axios.request(options1);
          datos3= response.data;
          console.log(datos3);
        } catch (error) {
          console.error(error);

        }
              
        }

      let Api_compañero = "https://sos2223-12.appspot.com/api/v1/agroclimatic";

    async function getDato_compañero() {

            const res = await fetch(Api_compañero, {
                method: "GET",
            });
            try {
                const rq = await res.json();
                datos4 = rq;
                console.log(rq);
            } catch (error) {
                console.log(`Error parsing result: ${error}`);
            }
        }
       let Api_compañero2 = "https://sos2223-12.appspot.com/api/v1/pollutions";

       async function getDato_compañero2() {
        const res2 = await fetch(Api_compañero2 , {
              method: "GET",
            });
          try {
            
              const rq2 = await res2.json();
              datos5 = rq2;
              console.log(rq2);
          } catch (error) {
              console.log(`Error parsing result: ${error}`);
          }
}

</script>

<main>

    <h1 align="center"><u>Drinks Rapid Api</u></h1>
    <br>
    <Table>
        <thead>
            <tr>
                <th>Identificador</th>
                <th>Categoria</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Tips</th>
                <th>Tipo Alcoholizados</th>
            </tr>
        </thead>
        <tbody>
            {#each datos2 as conjunto}
                <tr>
                    <td>{conjunto["id"]}</td>
                    <td>{conjunto["spirit_id"]}</td>
                    <td>{conjunto["cocktail_name"]}</td>
                    <td>{conjunto["description"]}</td>
                    <td>{conjunto["additional_tips"]}</td>
                    <td>{conjunto["alcoholic"]}</td>
                </tr>
            {/each}
            <br>
        </tbody>
    </Table>
    <h1 align="center"><u>Muscle Days</u></h1>
       
    <br>
    <Table>
        <thead>
            <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>{datos3[0]}</td>
                    <td>{datos3[1]}</td>
                    <td>{datos3[2]}</td>
                    <td>{datos3[3]}</td>
                    <td>{datos3[4]}</td>
                    <td>{datos3[5]}</td>
                </tr>
            
            <br>
        </tbody>
    </Table>


    <h1 align="center"><u>Estadisticas Agroclimaticas API compañero</u></h1>
    <Table>
      <thead>
          <tr>
              <th>provincia</th>
              <th>año</th>
              <th>minima</th>
              <th>maxi</th>
              <th>media</th>
              
          </tr>
      </thead>
      <tbody>
          {#each datos4 as conjunto1}
              <tr>
                  <td>{conjunto1["province"]}</td>
                  <td>{conjunto1["year"]}</td>
                  <td>{conjunto1["maximun_temperature"]}</td>
                  <td>{conjunto1["minimun_temperature"]}</td>
                  <td>{conjunto1["medium_temperature"]}</td>
              </tr>
          {/each}
          <br>
      </tbody>
  </Table>


  <h1 align="center"><u>Estadisticas Contaminantes API compañero2</u></h1>
    <Table>
      <thead>
          <tr>
              <th>province</th>
              <th>year</th>
              <th>NO2</th>
              <th>O3</th>
              <th>SO2</th>
              
          </tr>
      </thead>
      <tbody>
          {#each datos5 as conjunto2}
              <tr>
                  <td>{conjunto2["province"]}</td>
                  <td>{conjunto2["year"]}</td>
                  <td>{conjunto2["NO2"]}</td>
                  <td>{conjunto2["O3"]}</td>
                  <td>{conjunto2["SO2"]}</td>
              </tr>
          {/each}
          <br>
      </tbody>
  </Table>
    
   
</main>