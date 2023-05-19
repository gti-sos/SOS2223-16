<svelte:head>
    <title>Colegios Profesionales</title>
</svelte:head>

<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";
    const BASE_API_URL = "/api/v2"
    let API;
    if (dev){
        API = "http://localhost:8080" + BASE_API_URL+ "/professionalorganisations-stats";
    }else{
        API = BASE_API_URL + "/professionalorganisations-stats";
    }

    let organisations = [];
    let result = "";
    let resultStatus = "";
    let currentPage=0;
    let numberOfPages=0;
    let numElements=0;
    let filterString = "";
    let message=null;
    let timeoutId=null;
    let messageColor="green";


    
/**
 * Load Initial Data
*/

onMount(async () => {


        getOrganisations();
    });

async function initialData() {
            resultStatus = result = "";
            const res = await fetch(API+"/loadInitialData", {
                method: 'GET',
            });
            const status = await res.status;
            if(status == 201){
                getOrganisations();
                showMessage("Datos añadidos con éxito", true);
            }else{
                showMessage("La base de datos ya contiene datos", false);
            }
}

/**
 * Get all organisations
*/
    async function getOrganisations() {
            resultStatus = result = "";
            const numElementsApi = await fetch(API + "/count-professional-organisations?"+filterString.substring(1) , {
                method: 'GET',
            });
            try {
                const resCount= await numElementsApi.json();
                numElements=resCount.count;
                numberOfPages = Math.ceil(numElements/10);
            } catch (error) {
                console.log(error);
            }

            if(currentPage>numberOfPages-1){
                currentPage=0;
            }
            //pagination
            const res = await fetch(API+"?limit=10&offset="+currentPage*10+filterString, {
                method: 'GET',
            });

            try {
                const data = await res.json();
                
                organisations = data;
            } catch (error) {
                console.log(error);
            }
            const status = await res.status;
            resultStatus = status;
        }


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
                showMessage("Borrado con éxito", true);
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
                showMessage("Borrado con éxito", true);
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
            showMessage("Colegio profesional creado con éxito", true);
        }else if(status == 409){
            showMessage("El colegio profesional ya existe", false);
        }else{
            showMessage("Error en los datos introducidos", false);
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
    showMessage("Colegio profesional editado con éxito", true);
}else if(status == 404){
    showMessage("El colegio profesional no existe", false);
}else{
    showMessage("Error en los datos introducidos", false);
}
}

/**
 * Next Page
*/
function nextPage(){
        currentPage++;
        getOrganisations();
}

/**
 * Previous Page
*/
function previousPage(){
    currentPage--;
    getOrganisations();
}

/**
 * Show message
*/
async function showMessage(msg, success){
    if(timeoutId != null){
        clearTimeout(timeoutId);
    }
    if(success){
        messageColor="green";
    }else{
        messageColor="red";
    } 
    message = msg;
    
    timeoutId= setTimeout(function(){ message = null; }, 3000);
}


/**
 * Filter organisations
*/
const filter = async event =>{
 //formdata to json
    const formData = new FormData(event.target)
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
    filterString="";
    if(object.regNum != "" && object.regNum != undefined){
        filterString += "&registry_number="+object.regNum;
    }if(object.overRegNum != "" && object.overRegNum != undefined){
        filterString += "&registry_number_over="+object.overRegNum;
    }if(object.belowRegNum != "" && object.belowRegNum != undefined){
        filterString += "&registry_number_below="+object.belowRegNum;  
    }if(object.year != "" && object.year != undefined){
        filterString += "&date="+object.year;
    }if(object.overYear != "" && object.overYear != undefined){
        filterString += "&date_over="+object.overYear;
    }if(object.belowYear != "" && object.belowYear != undefined){
        filterString += "&date_below="+object.belowYear;
    }if(object.name != "" && object.name != undefined){
        filterString += "&professional_org="+object.name
    }if(object.location != "" && object.location != undefined){
        filterString += "&location="+object.location;
    }if(object.phoneNumber != "" && object.phoneNumber != undefined){
        filterString += "&phone_number="+object.phoneNumber;
    }if(object.postalCode != "" && object.postalCode != undefined){
        filterString += "&postal_code="+object.postalCode;
    }if(object.overPostalCode != "" && object.overPostalCode != undefined){
        filterString += "&postal_code_over="+object.overPostalCode;
    }if(object.belowPostalCode != "" && object.belowPostalCode != undefined){
        filterString += "&postal_code_below="+object.belowPostalCode;
    }if(object.adress != "" && object.adress != undefined){
        filterString += "&adress="+object.adress;
    }
    getOrganisations();
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

.inputFilter{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

}

.messageGreen{
    text-align: center;
    background-color: #29d407 !important;
    font-size: 25px;
    font-weight: bold;
    margin: 5%;
}

.messageRed{
    text-align: center;
    background-color: #d64242 !important;
    font-size: 25px;
    font-weight: bold;
    margin: 5%;
}

</style>

<h1>Colegios Porfesionales</h1>

<!--Table to filter organisations-->
    <form  on:submit={filter}>
        <table id="table">
            <tr>
            <th>Nombre Colegio Profesional</th>
            <th>Localización</th>
            <th>Numero Teléfono</th>

            <th>Dirección</th>
            <th></th>
            </tr>
            <tr >
                <td><input class="inputFilter" type="text" id="name" name="name" placeholder="filtrar por nombre..."></td>
                <td><input class="inputFilter" type="text" id="location" name="location" placeholder="filtrar por localización..."></td>
                <td><input class="inputFilter" type="text" id="phoneNumber" name="phoneNumber" placeholder="filtrar por número de teléfono..."></td>
                <td><input class="inputFilter" type="text" id="adress" name="adress" placeholder="filtrar por dirección..."></td>
                <td rowspan="0"><input class="inputFilter" type="submit" value="Filtrar"></td>
            </tr>
            <tr>
                <th style="text-align: center;">Numero Registro</th>
                <td><input class="inputFilter" type="text" id="regNum" name="regNum" placeholder="Número exacto"></td>
                <td><input class="inputFilter" type="text" id="overRegNum" name="overRegNum" placeholder="Desde"></td>
                <td><input class="inputFilter" type="text" id="belowRegNum" name="belowRegNum" placeholder="Hasta"></td>
                </tr>
            <tr>
                <th style="text-align: center;">Año</th>
                <td><input class="inputFilter" type="text" id="year" name="year" placeholder="Año exacto"></td>
                <td><input class="inputFilter" type="text" id="overYear" name="overYear" placeholder="Desde"></td>
                <td><input class="inputFilter" type="text" id="belowYear" name="belowYear" placeholder="Hasta"></td>
            </tr>
            <tr>
                <th style="text-align: center;">Código Postal</th>
                <td><input class="inputFilter" type="text" id="postalCode" name="postalCode" placeholder="Cp exacto"></td>
                <td><input class="inputFilter" type="text" id="overPostalCode" name="overPostalCode" placeholder="Desde"></td>
                <td><input class="inputFilter" type="text" id="belowPostalCode" name="belowPostalCode" placeholder="Hasta"></td>
            </tr>
        </table>

    </form>

<!--Table to show organisations-->
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

    {#if message != null}
        {#if messageColor == "green"}
            <tr id="message" class="messageGreen">
                <td colspan="9">{message}</td>
            </tr>
        {/if}
        {#if messageColor == "red"}
            <tr id="message" class="messageRed">
                <td colspan="9">{message}</td>
            </tr>
        {/if}
    {/if}

    {#each organisations as organisation}
    <tr class="organisationRow">
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

    {#if organisations.length == 0}
    <tr>
        <td colspan="9">No se han encontrado registros</td>
    </tr>
    {/if}
</table><br>

<!--Buttons that allow you to go to another page-->
<div style="text-align:center;">
    {#if currentPage>0}
    <button type="button" on:click={previousPage}>Página Anterior</button><br><br>
    {/if}

    {#if currentPage<numberOfPages-1}
    <button type="button" on:click={nextPage}>Página siguiente</button><br><br>
    {/if}
</div>

<!--Buttons to insert test data, delete all data and create a new data-->
<div style="text-align:center;">
<button type="button" on:click={initialData}>Insertar datos de prueba</button>
<button type="button" on:click={deleteAllOrgs}>Borrar todos los Colegios Profesionales</button>
{#if !form}
    <button type="button" on:click={openForm}>Crear un nuevo Colegio Profesional</button><br><br>
{/if}
</div>

<!--Form to create a new organisation-->
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

<!--Form to edit an organisation-->
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

<!--Pagination info-->
<div> Mostrando {organisations.length} de {numElements}  / Pagina {currentPage+1} de  
    {#if numberOfPages==0}
    1
    {/if}
    {#if numberOfPages!=0}
    {numberOfPages} 
    {/if}
</div>