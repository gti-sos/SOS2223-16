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
    let mensaje = "";

    let desde = "";
    let hasta = "";
    let offset = 0;
    let limit = 10;
    let añoInt;
    let reg_numInt;
    let stations_idInt;
    let maxtempInt;
    let mintempInt;
    let averagetempInt;
    let locationInt;
    let añoInt_over;
    let reg_numInt_over;
    let stations_idInt_over;
    let maxtempInt_over;
    let mintempInt_over;
    let averagetempInt_over;
    let añoInt_below;
    let reg_numInt_below;
    let stations_idInt_below;
    let maxtempInt_below;
    let mintempInt_below;
    let averagetempInt_below;

    async function dosAños() {
        resultStatus = result = "";
        const params = new URLSearchParams();
        if (desde) params.append("from", desde);
        if (hasta) params.append("to", hasta);
        if (hasta < desde) {
            alert("El año final es menor que el año inicial");
            status == 404;
        }

        const res = await fetch(`${API}?${params.toString()}`, {
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

    async function getDatos() {
        resultStatus = result = "";
        const params = new URLSearchParams();
        if (desde) params.append("from", desde);
        if (hasta) params.append("to", hasta);
        if (añoInt) params.append("date", añoInt);
        if (reg_numInt) params.append("reg_num", reg_numInt);
        if (stations_idInt) params.append("stations_id", stations_idInt);
        if (maxtempInt) params.append("maxtemp", maxtempInt);
        if (mintempInt) params.append("mintemp", mintempInt);
        if (averagetempInt) params.append("averagetemp", averatempInt);
        if (locationInt) params.append("location", locationInt);
        if (añoInt_over) params.append("date_over", añoInt_over);
        if (reg_numInt_over) params.append("reg_num_over", reg_numInt_over);
        if (stations_idInt_over)
            params.append("stations_id_over", stations_idInt_over);
        if (maxtempInt_over) params.append("maxtemp_over", maxtempInt_over);
        if (mintempInt_over) params.append("mintemp_over", mintempInt_over);
        if (averagetempInt_over)
            params.append("averagetemp_over", averatempInt_over);
        if (añoInt_below) params.append("date_below", añoInt_below);
        if (reg_numInt_below) params.append("reg_num_below", reg_numInt_below);
        if (stations_idInt_below)
            params.append("stations_id_below", stations_idInt_below);
        if (maxtempInt_below) params.append("maxtemp_below", maxtempInt_below);
        if (mintempInt_below) params.append("mintemp_below", mintempInt_below);
        if (averagetempInt_below)
            params.append("averagetemp_below", averatempInt_below);
        if (hasta < desde) {
            alert("El año final es menor que el año inicial");
            resultStatus = 404;
            return;
        }
        params.append("offset", offset);
        params.append("limit", limit);

        const res = await fetch(API + "?" + params.toString(), {
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
        offset = offset-10;
        getDatos();
    }

    async function nextPage() {
        offset = offset+10;
        getDatos();
    }
</script>

{#if resultStatus === 404}
    <h1>Página no disponible, acceda al Menu principal</h1>
{/if}

{#if mensaje === 40}
    <h1>No hay ningún dato que coincida</h1>
{/if}
<title>Estadísticas agroclimáticas de Cádiz</title>

<br />

<Table striped bordered hover>
    <thead>
        <tr>
            <th>Año</th>
            <th>Número de registro</th>
            <th>Id</th>
            <th>Temp máxima</th>
            <th>Temp mínima</th>
            <th>Temp media</th>
            <th>Localidad</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each datos as dato}
            <tr>                
                <td>{dato.date}</td>
                <td><a href="/agroclimatic/{dato.reg_num}">{dato.reg_num}</a></td>
                <td>{dato.stations_id}</td>
                <td>{dato.maxtemp}</td>
                <td>{dato.mintemp}</td>
                <td>{dato.averagetemp}</td>
                <td>{dato.location}</td>
                <td
                    ><Button
                        color="danger"
                        on:click={() => deleteDato(dato.reg_num)}
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
    La tabla solo muestra un total de 10 datos como máximo, para ver otros datos
    pulse el botón "siguiente" o "Anterior"
</p>
<button type="button" on:click={initialData}>Insertar datos de prueba</button>
<button type="button" on:click={deleteTodo}>Eliminar todo</button>
{#if offset > 0}
<button type="button" on:click={prevPage}>Anterior</button>
{/if}
{#if (offset+10) <= datos.length}
<button type="button" on:click={nextPage}>Siguiente</button>
{/if}
<br />
<br />

<h2>Buscar Estadísticas Agroclimáticas</h2>

<form on:submit|preventDefault={dosAños}>
    <p>Buscar por año:</p>
    <label>
        Desde
        <input type="number" bind:value={desde} />
        Hasta
        <input type="number" bind:value={hasta} />
    </label>
    <button type="submit">Buscar</button>
</form>

<br />
<br />
<form on:submit|preventDefault={getDatos}>
    <label>
        Temperatura máxima establecida como mínima:
        <input type="number" bind:value={maxtempInt} />
    </label>
    <button type="submit">Buscar</button>
</form>
<br />
<br />
<form on:submit|preventDefault={getDatos}>
    <label>
        Temperatura média establecida como máxima:
        <input type="number" bind:value={averagetempInt} />
    </label>
    <button type="submit">Buscar</button>
</form>
<br />
<br />
<h2>Buscar un registro en concreto a partir de uno de sus valores en concreto</h2>
<br>
<form on:submit|preventDefault={getDatos}>
    <label>Año: <input bind:value={añoInt} /><br />
        <br />Número de registro: <input bind:value={reg_numInt} /><br />
        <br />Id: <input bind:value={stations_idInt} /><br />
        <br />Temp máxima: <input bind:value={maxtempInt} /><br />
        <br />Temp mínima: <input bind:value={mintempInt} /><br />
        <br />Temp media: <input bind:value={averagetempInt} /><br />
        <br />Localidadl: <input bind:value={locationInt} /><br />
        <br /><button type="submit">Buscar</button>
    </label>
</form>
<br />
<br />
<h2>Buscar un conjunto de registros a partir de un establecido como mínimo</h2>
<br>
<form on:submit|preventDefault={getDatos}>
    <label>Año: <input bind:value={añoInt_over} /><br />
        <br />Número de registro: <input bind:value={reg_numInt_over} /><br />
        <br />Id: <input bind:value={stations_idInt_over} /><br />
        <br />Temp máxima: <input bind:value={maxtempInt_over} /><br />
        <br />Temp mínima: <input bind:value={mintempInt_over} /><br />
        <br />Temp media: <input bind:value={averagetempInt_over} /><br />
        <br /><button type="submit">Buscar</button>
    </label>
</form>

<br />
<br />
<h2>Buscar un conjunto de registros a partir de un establecido como máximo</h2>
<form on:submit|preventDefault={getDatos}>
    <label>Año: <input bind:value={añoInt_below} /><br />
        <br />Número de registro: <input bind:value={reg_numInt_below} /><br />
        <br />Id: <input bind:value={stations_idInt_below} /><br />
        <br />Temp máxima: <input bind:value={maxtempInt_below} /><br />
        <br />Temp mínima: <input bind:value={mintempInt_below} /><br />
        <br />Temp media: <input bind:value={averagetempInt_below} /><br />
        <br /><button type="submit">Buscar</button>
    </label>
</form>


