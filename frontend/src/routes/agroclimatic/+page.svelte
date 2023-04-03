<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";

    onMount(async () => {
        getDatos();
    });

    let API = "/api/v1/cadiz-agroclimatic-informations-stats";

    if (dev) API = "http://localhost:8080" + API;

    let datos = [];
    let newDate = "date";
    let newReg_num = "reg_num";
    let newStations_id = "stations_id";
    let newMaxtemp = "maxtemp";
    let newMintemp = "mintemp";
    let newAveragetemp = "averagetemp";
    let newLocation = "location";
    let message = "";

    let result = "";
    let resultStatus = "";

    async function getDatos() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function createDato() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: newDate,
                reg_num: newReg_num,
                stations_id: newStations_id,
                maxtemp: newMaxtemp,
                mintemp: newMintemp,
                averagetemp: newAveragetemp,
                location: newLocation,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getDatos();
        }
    }

    async function deleteDato(reg_num) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + reg_num, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getDatos();
        }
        if(status == 404){
            message = "No está el dato buscado";
        }
    }

    async function deleteTodo() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getDatos();
        }
    }
</script>

<h1>datos</h1>

<Table>
    <thead>
        <tr>
            <th>date</th>
            <th>reg_num</th>
            <th>stations_id</th>
            <th>maxtemp</th>
            <th>mintemp</th>
            <th>averagetemp</th>
            <th>location</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input bind:value={newDate} /></td>
            <td><input bind:value={newReg_num} /></td>
            <td><input bind:value={newStations_id} /></td>
            <td><input bind:value={newMaxtemp} /></td>
            <td><input bind:value={newMintemp} /></td>
            <td><input bind:value={newAveragetemp} /></td>
            <td><input bind:value={newLocation} /></td>
            <td><Button on:click={createDato}>Create</Button></td>
        </tr>

        {#each datos as dato}
            <tr>
                <td>{dato.date}</td>
                <td><a href="/datos/{dato.reg_num}">{dato.reg_num}</a></td>
                <td>{dato.stations_id}</td>
                <td>{dato.maxtemp}</td>
                <td>{dato.mintemp}</td>
                <td>{dato.averagetemp}</td>
                <td>{dato.location}</td>
                <td
                    ><Button on:click={deleteDato(dato.reg_num)}>Delete</Button
                    ></td
                >
            </tr>
        {/each}
        <tr>
            <td><Button on:click={deleteTodo}>DeleteAll</Button></td>
        </tr>
    </tbody>
</Table>

{#if message != ""}
    <h1 style="color:red">{message}</h1>
{/if}

{#if resultStatus != ""}
    <p>Result:</p>
    <pre>
{resultStatus}
{result}
        </pre>
{/if}
