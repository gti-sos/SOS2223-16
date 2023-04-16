<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    import { page } from "$app/stores";
    onMount(async () => {
        getPhose();
    });

    let Id = $page.params.Id;
    let API = "/api/v2/civilwarandalusian-stats/" + Id;

    if (dev) API = "http://localhost:8080" + API;

    let updateId = Id;
    let updateTitle = "Titulo";
    let updateCharacter = "Descripcion";
    let updateProvince = "Provincia";
    let updateMunicipality = "Municipio";
    let updateDateNumeric = "Fecha Suceso";
    let updatePhoto_PieFosa = "Enlace foto fosa";
    let updateVictims = "Victimas";
    let updateDates_act = "Actualizacion";

    let result = "";
    let resultStatus = "";

    async function getPhose() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const war1 = await res.json();
            result = JSON.stringify(war1, null, 2);
            updateId = war1.Id;
            updateTitle = war1.title;
            updateCharacter = war1.character;
            updateProvince = war1.province;
            updateMunicipality = war1.municipality;
            updateDateNumeric = war1.dateNumeric;
            updatePhoto_PieFosa = war1.Photo_PieFosa;
            updateVictims = war1.victims;
            updateDates_act = war1.dates_act;


        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 404) {
            alert(`No existe ningún recurso con el id igual que ${Id}.`);
        } else {
            if (status == 400) {
                message = "Ha habido un error en la petición";
            }
        }
    }

    async function updatePhosa() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id: updateId,
                title: updateTitle,
                character: updateCharacter,
                province: updateProvince,
                municipality: updateMunicipality,
                dateNumeric: updateDateNumeric,
                Photo_PieFosa: updatePhoto_PieFosa,
                victims:updateVictims,
                dates_act:updateDates_act,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getPhose();
            alert("Se ha cambiado el dato correctamente");
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
</script>

{#if resultStatus === 404}
    <h1>La fosa buscada no existe.</h1>
{/if}
{#if resultStatus === 200}
    <h1>Información de la fosa</h1>
    <br />
    <Table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Provincia</th>
                <th>Municipip</th>
                <th>Fecha Suceso</th>
                <th>Enlace foto fosa</th>
                <th>Victimas</th>
                <th>Actualizacion</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateId}</td>
                <td><input bind:value={updateTitle} /></td>
                <td><input bind:value={updateCharacter} /></td>
                <td><input bind:value={updateProvince} /></td>
                <td><input bind:value={updateMunicipality} /></td>
                <td><input bind:value={updateDateNumeric} /></td>
                <td><input bind:value={updatePhoto_PieFosa} /></td>
                <td><input bind:value={updateVictims} /></td>
                <td><input bind:value={updateDates_act} /></td>
                <td><Button on:click={updatePhosa}>Modificar</Button></td>
            </tr>
        </tbody>
    </Table>
{/if}
