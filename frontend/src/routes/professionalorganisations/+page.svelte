<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    const BASE_API_URL = "/api/v2"
    let API = BASE_API_URL + "/professionalorganisations-stats";
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
            alert("Colegio profesional creado con éxito");
        }else if(status == 409){
            alert("El colegio profesional ya existe");
        }else{
            alert("Error en los datos introducidos");
        }
    }

/**
 * Edit organisation
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
const res = await fetch(API+"/"+object.registry_number, {  
        method: 'PUT',
        body   : json,
        headers: {
        "Content-Type": "application/json",
        },
    });
const status = await res.status;
if(status == 200) {
    getOrganisations();
    alert("Colegio profesional editado con éxito");
}else if(status == 404){
    alert("El colegio profesional no existe");
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
<h1>Colegios Porfesionales</h1>

<ul>
</ul>
<table id="table">
    <tr>
        <th>Colegio Profesional</th>
        <th>Fecha</th>
        <th>Numero Registro</th>
        <th>Localización</th>
        <th>Numero Teléfono</th>
        <th>Código Postal</th>
        <th>Dirección</th>
        <th>Borrar</th>
        <th>Editar</th>
    </tr>
    {#each organisations as organisation}
    <tr>
        <td>{organisation.professional_org}</td>
        <td>{organisation.date}</td>
        <td>{organisation.registry_number}</td>
        <td>{organisation.location}</td>
        <td>{organisation.phone_number}</td>
        <td>{organisation.postal_code}</td>
        <td>{organisation.adress}</td>
        <td><button type="button" on:click={() => deleteOrg(organisation.registry_number)}>Borrar</button></td>
        <td><button type="button" on:click={() => editOrg(organisation)}>Editar</button></td>
    </tr>
    {/each}
    
</table>

<div style="text-align:center;">
<button type="button" on:click={initialData}>Insertar datos de prueba</button>
<button type="button" on:click={deleteAllOrgs}>Borrar todos los Colegios Profesionales</button>
{#if !form}
    <button type="button" on:click={openForm}>Crear un nuevo Colegio Profesional</button>
{/if}
</div>

{#if form}
<div id="form">
    <form on:submit={submitNew}>
        <label for="date">Año:</label>
        <input type="number" id="date" name="date"><br><br>

        <label for="registry_number">Numero Registro:</label>
        <input type="number" id="registry_number" name="registry_number"><br><br>

        <label for="professional_org">Colegio Profesional:</label>
        <input type="text" id="professional_org" name="professional_org"><br><br>

        <label for="location">Localización:</label>
        <input type="text" id="location" name="location"><br><br>

        <label for="phone_number">Numero Teléfono:</label>
        <input type="text" id="phone_number" name="phone_number"><br><br>

        <label for="postal_code">Código Postal:</label>
        <input type="number" id="postal_code" name="postal_code"><br><br>

        <label for="adress">Dirección:</label>
        <input type="text" id="adress" name="adress"><br><br>

        <input type="submit" value="Crear">
    </form><br>
    <button type="button" on:click={openForm}>Cancelar</button>
</div>
{/if}

{#if editForm}
<div id="form">
    <form on:submit={submitEdit}>

        <label for="dateEdit">Año:</label>
        <input type="number" id="dateEdit" name="date" value = "{orgEdited.date}"><br><br>

        <input type="hidden" id="registry_numberEdit" name="registry_number" value = "{orgEdited.registry_number}">

        <label for="professional_orgEdit">Colegio Profesional:</label>
        <input type="text" id="professional_orgEdit" name="professional_org" value = "{orgEdited.professional_org}"><br><br>

        <label for="locationEdit">Localización:</label>
        <input type="text" id="locationEdit" name="location" value = "{orgEdited.location}"><br><br>

        <label for="phone_numberEdit">Numero Teléfono:</label>
        <input type="text" id="phone_numberEdit" name="phone_number" value = "{orgEdited.phone_number}"><br><br>

        <label for="postal_codeEdit">Código Postal:</label>
        <input type="number" id="postal_codeEdit" name="postal_code" value = "{orgEdited.postal_code}"><br><br>

        <label for="adressEdit">Dirección:</label>
        <input type="text" id="adressEdit" name="adress" value = "{orgEdited.adress}"><br><br>

        <input type="submit" value="Editar">
    </form><br>
    <button type="button" on:click={editForm}>Cancelar</button>
</div>
{/if}
