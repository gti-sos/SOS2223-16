<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    const BASE_API_URL = "/api/v2"
    let API = BASE_API_URL + "/civilwarandalusian-stats";
    if (dev) API = "http://localhost:8080" + API;

    let wars = [];
    let newId = 'Id';
    let newTitle = "title";
    let newCharacter = "character";
    let newProvince = "province";
    let newMunicipality = "municipality";
    let newDateNumeric = "dateNumeric";
    let newPhoto_PieFosa = "Photo_PieFosa";
    let newVictims = "victims";
    let newDates_act = "dates_act";
    let result = "";
    let resultStatus = "";
    let mensaje = "";
    let desde = "";
    let hasta = "";
    let offset = 0;
    let limit = 10;
    let idInt;
    let dateNumInt;
    let dates_actInt;
    let victimsInt;



    /**
 * Calcular fecha entre dos años 
*/
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
            wars = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }




/**
 * Load Initial Data
*/
async function initialData() {
            resultStatus = result = "";
            const res = await fetch(API+"/loadInitialData", {
                method: 'GET',
            });
            const status = await res.status;
            if(status == 201){
                getOrganisations();
                alert("Datos añadidos con éxito");

            }else{
                alert("La base de datos ya contiene datos");
            }
}

/**
 * Get all organisations
*/

async function getOrganisations() {
        resultStatus = result = "";
        const params = new URLSearchParams();
        if (desde) params.append("from", desde);
        if (hasta) params.append("to", hasta);
        if (dateNumInt) params.append("dateNumeric_over", dateNumInt)
        if (dates_actInt) params.append("dates_act_below", dates_actInt)
        if (victimsInt) params.append("victims_over", victimsInt)
        if (idInt) params.append("Id_below", idInt);
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
            wars = data;
            
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    onMount(async () => {
        getOrganisations();
    });


    let form = false;
    function openForm() {
        form = !form;
        editForm = false;
    }

/**
 * Delete all organisations
*/
    async function deleteAllOrgs() {
            resultStatus = result = "";
            const res = await fetch(API, {  
                method: 'DELETE',
            });
            const status = await res.status;
            if(status == 200) {
                getOrganisations();
                alert("Borrado con éxito");

            }
        }


/**
 * Delete one organisation
*/
/**
        async function deleteOrg(org) {
            resultStatus = result = "";
            const res = await fetch(API+"/"+org, {  
                method: 'DELETE',
            });
            const status = await res.status;
            if(status == 200) {
                getOrganisations();
                alert("Borrado con éxito");

            }
        }  
*/
        async function deleteDato(Id) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + Id, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getOrganisations();
            alert('Se ha eliminado el dato');
        }
        if (status == 404) {
            alert("No está el dato buscado");
        }
    }

/**
 * Edit one organisation
*/

var editForm = false;
var orgEdited = null;
function editOrg(org) {
    form = false;
    editForm = !editForm;
    if(editForm == false){
        return;
    }
    orgEdited = org;
}

/**
 * Submit new organisation
*/
    async function createDato() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id:newId,
                title: newTitle,
                character: newCharacter,
                province: newProvince,
                municipality: newMunicipality,
                dateNumeric: newDateNumeric,  
                Photo_PieFosa: newPhoto_PieFosa,
                victims: newVictims,
                dates_act: newDates_act,               
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            alert("Dato creado, mire la tabla");
            getOrganisations();
        }
        if (status == 409){
            alert("El dato no es único, revise que el registro del número no coincida con el resto");
        }
        if (status == 400){
            alert("Los datos se han introducido mal, reviselos y vuelva a introducirlos");
        }
    }

/**
 * Edit organisation id
*/
const submitEdit = async event =>{

//formdata to json
const formData = new FormData(event.target)
var object = {};
formData.forEach(function(value, key){
    object[key] = value;
});
var json = JSON.stringify(object);


console.log(object)
const res = await fetch(API+"/"+object.Id, {  
        method: 'PUT',
        body   : json,
        headers: {
        "Content-Type": "application/json",
        },
    });
const status = await res.status;
if(status == 200) {
    getOrganisations();
    alert("Registro editado con éxito");
}else if(status == 404){
    alert("El Registro no existe");
}else{
    alert("Error en los datos introducidos");
}
}
async function prevPage() {
        if (offset >= limit) {
            offset -= limit;
        }
        getOrganisations();
    }

    async function nextPage() {
        if (offset + limit < wars.length) {
            offset += limit;
        }
        getOrganisations();
    }
</script>
<!--
<style>
#table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 90%;
    margin: 5%;
}

#table td, #table th {
    border: 1px solid #ddd;
    padding: 8px;
}
#table tr:nth-child(even){background-color: #f2f2f2;}

#table tr:hover {background-color: #ddd;}

#table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #2395c5;
    color: white;
}
#form {
    margin: 5%;
    text-align: center;
    border: #2395c5;

}
</style>
-->

{#if resultStatus === 404}
    <h1>Página no disponible, acceda al Menu principal</h1>
{/if}

{#if mensaje === 40}
<h1> No hay ningún dato que coincida</h1>
{/if}
<h1>Fosas Comunes</h1>
<br>
<!-- svelte-ignore missing-declaration -->
<Table striped bordered hover>
    <thead>
        <tr>
            <th>Id</th>
            <th>titulo</th>
            <th>Caracter</th>
            <th>Provincia</th>
            <th>municipio</th>
            <th>fecha</th>
            <th>Foto fosa </th>
            <th>victima </th>
            <th>fecha actualizacion</th>
            <th>acción</th>
        </tr>
    </thead>
    <tbody>
        

        {#each wars as war}
        <tr>
            <td><a href="/civilwarandalusian/{war.Id}">{war.Id}</a></td>
            <td>{war.title}</td>
            <td>{war.character}</td>
            <td>{war.province}</td>
            <td>{war.municipality}</td>
            <td>{war.dateNumeric}</td>
            <td>{war.Photo_PieFosa}</td>
            <td>{war.victims}</td>
            <td>{war.dates_act}</td>
            <td><Button on:click={deleteDato(war.Id)}>Borrar</Button></td>
            <td><Button on:click={deleteOrg(war.Id)}>editar</Button></td>
          <!--  <td><button type="button" on:click={() => deleteOrg(war.Id)}>Borrar</button></td>
            <td><button type="button" on:click={() => editOrg(war)}>Editar</button></td>-->
        </tr>
        {/each}
        <tr> 
            <td><input bind:value={newId} /></td>
            <td><input bind:value={newTitle} /></td>
            <td><input bind:value={newCharacter} /></td>
            <td><input bind:value={newProvince} /></td>
            <td><input bind:value={newMunicipality} /></td>
            <td><input bind:value={newDateNumeric} /></td>
            <td><input bind:value={newPhoto_PieFosa} /></td>
            <td><input bind:value={newVictims} /></td>
            <td><input bind:value={newDates_act} /></td>
            <td><Button on:click={createDato}>Crear</Button></td>
        </tr>
    </tbody>
</Table>
<br />
<p>
    Pulse el botón "siguiente" o "Anterior" para mas registros.
</p>
<br>
<div style="text-align:center;">
    <button type="button" on:click={initialData}>Insertar datos de prueba</button>
    <button type="button" on:click={deleteAllOrgs}>Borrar todos los Registros</button>
    <button type="button" on:click={prevPage}>Anterior</button>
    <button type="button" on:click={nextPage}>Siguiente</button>
<br>
<br>


</div>
<h2>Buscar fosas de la guerra civil entre dos fechas</h2>

<form on:submit|preventDefault={dosAños}>
    <p>Buscar por año de la guerra:</p>
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
<form on:submit|preventDefault={getOrganisations}>
    <label>
        Desplazamiento:
        <input type="number" bind:value={offset} />
        Límite:
        <input type="number" bind:value={limit} />
    </label>
    <button type="submit">Buscar</button>
</form>
<br />
<br />
<form on:submit|preventDefault={getOrganisations}>
    <label>
        Año máximo establecida como mínimo:
        <input type="number" bind:value={dateNumInt} />        
    </label>
    <button type="submit">Buscar</button>
</form>
<br />
<br />
<form on:submit|preventDefault={getOrganisations}>
    <label>
        Año actualizacion establecida como máximo:
        <input type="number" bind:value={dates_actInt} />        
    </label>
    <button type="submit">Buscar</button>
</form>
<br />
<br />
<form on:submit|preventDefault={getOrganisations}>
    <label>
        Nº victimas mínnimo:
        <input type="number" bind:value={victimsInt} />        
    </label>
    <button type="submit">Buscar</button>
</form>
<br />
<br />
<form on:submit|preventDefault={getOrganisations}>
    <label>
        Nº Id maximo:
        <input type="number" bind:value={idInt} />        
    </label>
    <button type="submit">Buscar</button>
</form>
<!-- 
{#if editForm}
<div id="form">
    <form on:submit={submitEdit}>

        <label for="dateEdit">Id:</label>
        <input type="number" id="id" name="id" value = "{orgEdited.Id}"><br><br>

        <label for="tittleEdit">Titulo:</label>
        <input type="text" id="tittleEdit" name="tittle" value = "{orgEdited.tittle}"><br><br>

        <label for="characterEdit">character:</label>
        <input type="text" id="characterEdit" name="character" value = "{orgEdited.character}"><br><br>

        <label for="provinceEdit">provincia:</label>
        <input type="text" id="provinceEdit" name="province" value = "{orgEdited.province}"><br><br>

        <label for="municipalityEdit">municipality:</label>
        <input type="text" id="municipalityEdit" name="municipality" value = "{orgEdited.municipality}"><br><br>

        <label for="Photo_PieFosaEdit">Dirección:</label>
        <input type="text" id="Photo_PieFosaEdit" name="Photo_PieFosa" value = "{orgEdited.Photo_PieFosa}"><br><br>

        <label for="victimsEdit">victimas:</label>
        <input type="number" id="victimsEdit" name="victims" value = "{orgEdited.victims}"><br><br>

        <label for="dates_actEdit">Dirección:</label>
        <input type="text" id="dates_actEdit" name="dates_act" value = "{orgEdited.dates_act}"><br><br>

        <input type="submit" value="Editar">
    </form><br>
    <button type="button" on:click={editForm}>Cancelar</button>
</div>
{/if}
 -->