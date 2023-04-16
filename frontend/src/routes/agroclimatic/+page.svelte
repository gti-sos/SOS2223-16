<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";

    onMount(async () => {
        getDatos();
    });

    let API = "/api/v2/cadiz-agroclimatic-informations-stats";

    if (dev) API = "http://localhost:8080" + API;

    let datos = [];
    let newDate = "Año";
    let newReg_num = "Número de registro";
    let newStations_id = "Id";
    let newMaxtemp = "Temp max";
    let newMintemp = "Temp min";
    let newAveragetemp = "Temp media";
    let newLocation = "Localidad";


    let result = "";
    let resultStatus = "";

    let desde = "";
    let hasta = "";
    let limit = "";
    let offset = "";


    async function dosAños() {
        resultStatus = result = "";
        const params = new URLSearchParams();
        if (desde) params.append("from", desde);
        if (hasta) params.append("to", hasta);
        if(hasta<desde){
            alert("El año final es menor que el año inicial");
            status == 404;
        }

        const res = await fetch(`${API}?${params.toString()}`, { method: "GET" });
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

    async function offLim() {
        resultStatus = result = "";
        const params = new URLSearchParams();
        if (off) params.append("from", off);
        if (limit) params.append("to", lim);
        if(hasta<desde){
            alert("El año final es menor que el año inicial");
            status == 404;
        }

        const res = await fetch(`${API}?${params.toString()}`, { method: "GET" });
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

    async function initialData() {
        resultStatus = result = "";
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        if (status == 201) {
            getDatos();
            alert("Datos añadidos con éxito");
        } else {
            alert("La base de datos ya contiene datos");
        }
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
            alert("Dato creado, mire la tabla");
            getDatos();
        }
        if (status == 409) {
            alert(
                "El dato no es único, revise que el registro del número no coincida con el resto"
            );
        }
        if (status == 400) {
            alert(
                "Los datos se han introducido mal, reviselos y vuelva a introducirlos"
            );
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
            alert("Se ha eliminado el dato");
        }
        if (status == 404) {
            alert("No está el dato buscado");
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
            alert("Todos los datos han sido borrados");
        }
    }

    async function prevPage() {
        if (offset >= 10) {
            offset = offset - limit;
        }
        getDatos();
    }

    async function nextPage() {
        if (offset + limit > datos.length) {
        } else {
            offset = offset + limit;
            getDatos();
        }
        console.log(offset);
        console.log(limit);
        console.log(datos.length);
    }
</script>

{#if resultStatus === 404}
    <h1>Página no disponible, acceda al Menu principal</h1>
{/if}
<h1>Estadísticas agroclimáticas de Cádiz</h1>

<br />
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
        {#each datos as dato}
            <tr>
                <td>{dato.date}</td>
                <td
                    ><a href="/agroclimatic/{dato.reg_num}">{dato.reg_num}</a
                    ></td
                >
                <td>{dato.stations_id}</td>
                <td>{dato.maxtemp}</td>
                <td>{dato.mintemp}</td>
                <td>{dato.averagetemp}</td>
                <td>{dato.location}</td>
                <td
                    ><Button on:click={deleteDato(dato.reg_num)}
                        >Eliminar</Button
                    ></td
                >
            </tr>
        {/each}
        <tr>
            <td><input bind:value={newDate} /></td>
            <td><input bind:value={newReg_num} /></td>
            <td><input bind:value={newStations_id} /></td>
            <td><input bind:value={newMaxtemp} /></td>
            <td><input bind:value={newMintemp} /></td>
            <td><input bind:value={newAveragetemp} /></td>
            <td><input bind:value={newLocation} /></td>
            <td><Button on:click={createDato}>Crear</Button></td>
        </tr>
    </tbody>
</Table>
<br />
<p>
    La tabla solo muestra un total de 10 datos, para ver otros datos pulse el
    botón "siguiente" o "Anterior"
</p>
<button type="button" on:click={initialData}>Insertar datos de prueba</button>
<button type="button" on:click={deleteTodo}>Eliminar todo</button>
<button type="button" on:click={prevPage}>Anterior</button>
<button type="button" on:click={nextPage}>Siguiente</button>
<br />
<br />

<h2>Buscar Estadísticas Agroclimáticas</h2>

<form on:submit|preventDefault={dosAños}>
    <label>
        Buscar por año:
        <input type="number" bind:value={desde} min="1900" max="2023" />
        a
        <input type="number" bind:value={hasta} min="1900" max="2023" />
    </label>
    <button type="submit">Buscar</button>
</form>
{#if dosAños.length > 0}
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
            {#each dosAños as dato}
                <tr>
                    <td>{dato.date}</td>
                    <td
                        ><a href="/agroclimatic/{dato.reg_num}"
                            >{dato.reg_num}</a
                        ></td
                    >
                    <td>{dato.stations_id}</td>
                    <td>{dato.maxtemp}</td>
                    <td>{dato.mintemp}</td>
                    <td>{dato.averagetemp}</td>
                    <td>{dato.location}</td>                    
                </tr>
            {/each}
        </tbody>
    </Table>
{/if}
