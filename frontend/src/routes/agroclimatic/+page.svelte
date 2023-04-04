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
    let newDate = 'date';
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
                reg_num: 55,
                stations_id: 55,
                maxtemp: 342.34,
                mintemp: 2345.23,
                averagetemp: 23.2,
                location: "Cádiz",                
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            message = "Dato creado, mire la tabla";
            getDatos();
        }
        if (status == 409){
            message = "El dato no es único, revise que el registro del número no coincida con el resto";
        }
        if (status == 400){
            message = "Los datos se han introducido mal, reviselos y vuelva a introducirlos";
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
            //getDatos();
            message = 'Se ha eliminado el dato con la propiedad "reg_num" igual a '+reg_num;
        }
        if (status == 404) {
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
            message = "Todos los datos han sido borrados";
        }
    }
</script>

<h1>Tabla sobre las estadísticas agroclimáticas de Cádiz</h1>

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
            <td>
                <label for="newDate">Año:</label>
                <input id="newDate" bind:value={newDate} />
            </td>
            <td>
                <label for="newReg_num">Nº del registro:</label>
                <input id="newReg_num" bind:value={newReg_num} />
            </td>
            <td>
                <label for="newDate">ID:</label>
                <input id="newDate" bind:value={newStations_id} />
            </td>
            <td>
                <label for="newDate">Temperatura máxima:</label>
                <input id="newDate" bind:value={newMaxtemp} />
            </td>
            <td>
                <label for="newDate">Temperatura mínima:</label>
                <input id="newDate" bind:value={newMintemp} />
            </td>
            <td>
                <label for="newDate">Temperatura media:</label>
                <input id="newDate" bind:value={newAveragetemp} />
            </td>
            <td>
                <label for="newDate">Localidad:</label>
                <input id="newDate" bind:value={newLocation} />
            </td>
            <!-- <td><input bind:value={newDate} /></td>
            <td><input bind:value={newReg_num} /></td>
            <td><input bind:value={newStations_id} /></td>
            <td><input bind:value={newMaxtemp} /></td>
            <td><input bind:value={newMintemp} /></td>
            <td><input bind:value={newAveragetemp} /></td>
            <td><input bind:value={newLocation} /></td>
            <td><Button on:click={createDato}>Crear</Button></td> -->
        </tr>

        {#each datos as dato}
            <tr>
                <td>{dato.date}</td>
                <td><a href="/agroclimatic/{dato.reg_num}">{dato.reg_num}</a></td>
                <td>{dato.stations_id}</td>
                <td>{dato.maxtemp}</td>
                <td>{dato.mintemp}</td>
                <td>{dato.averagetemp}</td>
                <td>{dato.location}</td>
                <td><Button on:click={deleteDato(dato.reg_num)}>Eliminar</Button></td>
            </tr>
        {/each}
        <tr>
            <td><Button on:click={deleteTodo}>Eliminar todo</Button></td>
        </tr>
    </tbody>
</Table>
<br>
<h2>Los cambios que realizes aparecerán a continuación:</h2>
<br>
{#if message != ""}
    <h5>{message}</h5>
{/if}

<!-- 
{#if resultStatus != ""}
    <p>Result:</p>
    <pre>
{resultStatus}
{result}
        </pre>
{/if} -->
