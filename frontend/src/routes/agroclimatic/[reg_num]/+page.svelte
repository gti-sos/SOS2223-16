<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    import { page } from "$app/stores";
    onMount(async () => {
        getDato();
    });

    let reg_num = $page.params.reg_num;
    let API = "/api/v1/cadiz-agroclimatic-informations-stats/" + reg_num;

    if (dev) API = "http://localhost:8080" + API;

    let updateReg_num = reg_num;
    let updateDate = "date";
    let updateStations_id = "stations_id";
    let updateMaxtemp = "maxtemp";
    let updateMintemp = "mintemp";
    let updateAveragetemp = "averagetemp";
    let updateLocation = "location";
    let message = "";

    let result = "";
    let resultStatus = "";

    async function getDato() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            updateReg_num = data.reg_num;
            updateDate = data.date;
            updateStations_id = data.Stations_id;
            updateMaxtemp = data.maxtemp;
            updateMintemp=data.mintemp;
            updateAveragetemp=data.averaetemp;
            updateLocation=data.location;

        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function updateDato() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reg_num: updateReg_num,
                date: updateDate,
                stations_id: updateStations_id,
                maxtemp: updateMaxtemp,
                mintemp: updateMintemp,
                averagetemp: updateAveragetemp,
                location: updateLocation,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getDato();
            message = "Se ha cambiado el dato correctamente";
        }
        if (status == 409){
            message = "El dato no es único, revise que el registro del número no coincida con el resto";
        }
        if (status == 400){
            message = "Los datos se han introducido mal, reviselos y vuelva a introducirlos";
        }
    }
</script>

<h1>Contact Details</h1>

<Table>
    <thead>
        <tr>
            <th>Año</th>
            <th>Nº del registro</th>
            <th>ID</th>
            <th>Temperatura máxima</th>
            <th>Temperatura mínima</th>
            <th>Temperatura media</th>
            <th>Localidad</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input bind:value={updateDate} /></td>
            <td>{updateReg_num}</td>            
            <td><input bind:value={updateStations_id} /></td>
            <td><input bind:value={updateMaxtemp} /></td>
            <td><input bind:value={updateMintemp} /></td>
            <td><input bind:value={updateAveragetemp} /></td>
            <td><input bind:value={updateLocation} /></td>
            <td><Button on:click={updateDato}>Modificar</Button></td>
        </tr>
    </tbody>
</Table>

{#if message != ""}
    <h5>{message}</h5>
{/if}
