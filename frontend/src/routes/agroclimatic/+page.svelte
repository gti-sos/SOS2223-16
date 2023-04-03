<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        
        let API = '/api/v1/cadiz-agroclimatic-informations-stats';
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let datos = [];
    
        let result = "";
        let resultStatus = "";
    
        async function getdatos () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                datos = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
    
    
    
    
        onMount(async () => {
            getdatos();
        });
    
    </script>
    <h1> Datos</h1>
    <ul>
        {#each datos as dato}
            <li>{dato.reg_num}</li>
        {/each}        
    </ul>
    
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
    {resultStatus}
    {result}
        </pre>
    {/if}
    