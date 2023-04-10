<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    const BASE_API_URL = "/api/v1"
    let API = BASE_API_URL + "/civilwarandalusian-stats";
    if (dev) API = "http://localhost:8080" + API;

    let organisations = [];
    let result = "";
    let resultStatus = "";



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
            const res = await fetch(API, {
                method: 'GET',
            });
            try {
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                organisations = data;
            } catch (error) {
                console.log(error)
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
    const submitNew = async event =>{

        //formdata to json
        const formData = new FormData(event.target)
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);


        console.log(json)
        const res = await fetch(API, {  
                method: 'POST',
                body   : json,
                headers: {
                "Content-Type": "application/json",
                },
            });
        const status = await res.status;
        if(status == 201) {
            getOrganisations();
            alert("nuevo registro creado");
        }else if(status == 409){
            alert("El nuevo registro ya existe");
        }else{
            alert("Error en los datos introducidos");
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
const res = await fetch(API+"/"+object.id, {  
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

</script>
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
<h1>Fosas Comunes</h1>

<ul>
</ul>
<table id="table">
    <tr>
        <th>Fosa comun</th>
        <th>Id</th>
        <th>titulo</th>
        <th>Caracter</th>
        <th>Provincia</th>
        <th>municipio</th>
        <th>fecha</th>
        <th>Foto fosa </th>
        <th>victima </th>
        <th>fecha actualizacion</th>
        <th>Editar</th>
    </tr>
    {#each organisations as organisation}
    <tr>
        <td>{organisation.tittle}</td>
        <td>{organisation.id}</td>
        <td>{organisation.character}</td>
        <td>{organisation.province}</td>
        <td>{organisation.municipality}</td>
        <td>{organisation.dateNumeric}</td>
        <td>{organisation.Photo_PieFosa}</td>
        <td>{organisation.victims}</td>
        <td>{organisation.dates_act}</td>
        <td><button type="button" on:click={() => deleteOrg(organisation.id)}>Borrar</button></td>
        <td><button type="button" on:click={() => editOrg(organisation)}>Editar</button></td>
    </tr>
    {/each}
    
</table>

<div style="text-align:center;">
<button type="button" on:click={initialData}>Insertar datos de prueba</button>
<button type="button" on:click={deleteAllOrgs}>Borrar todos los Registros</button>
{#if !form}
    <button type="button" on:click={openForm}>Crear un nuevo Registro</button>
{/if}
</div>

{#if form}
<div id="form">
    <form on:submit={submitNew}>
        <label for="date">Id:</label>
        <input type="number" id="date" name="id"><br><br>

        <label for="tittle">Titulo:</label>
        <input type="text" id="tittle" name="tittle"><br><br>

        <label for="character">character:</label>
        <input type="text" id="character" name="character"><br><br>

        <label for="province">provincia:</label>
        <input type="text" id="province" name="province"><br><br>

        <label for="municipality">municipio:</label>
        <input type="text" id="phone_number" name="phone_number"><br><br>

        <label for="dateNumeric">Fecha:</label>
        <input type="number" id="dateNumeric" name="dateNumeric"><br><br>

        <label for="Photo_PieFosa">foto fosa:</label>
        <input type="text" id="Photo_PieFosa" name="Photo_PieFosa"><br><br>

        <label for="victims">Victimas:</label>
        <input type="number" id="victims" name="victims"><br><br>

        <label for="dates_act">actualizacion de datos:</label>
        <input type="text" id="dates_act" name="dates_act"><br><br>

        <input type="submit" value="Crear">
    </form><br>
    <button type="button" on:click={openForm}>Cancelar</button>
</div>
{/if}

{#if editForm}
<div id="form">
    <form on:submit={submitEdit}>

        <label for="dateEdit">Id:</label>
        <input type="number" id="id" name="id" value = "{orgEdited.id}"><br><br>

        <input type="hidden" id="IdTitulo" name="registry_number" value = "{orgEdited.registry_number}">

        <label for="tittleEdit">Titulo:</label>
        <input type="text" id="tittleEdit" name="tittle" value = "{orgEdited.tittle}"><br><br>

        <label for="characterEdit">character:</label>
        <input type="text" id="characterEdit" name="character" value = "{orgEdited.character}"><br><br>

        <label for="provinceEdit">provincia:</label>
        <input type="text" id="provinceEdit" name="province" value = "{orgEdited.province}"><br><br>

        <label for="municipalityEdit">municipality:</label>
        <input type="number" id="municipalityEdit" name="municipality" value = "{orgEdited.municipality}"><br><br>

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
