module.exports = function(app){

const INITIAL_DATA=[

    {
        "date": 2007,
        "registry_number": 14,
        "professional_org": "FARMACÉUTICOS DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 212 277",
        "postal_code": 11004,
        "adress": "C\/ ISABEL LA CATÓLICA, 22"
    },
    {
        "date": 2011,
        "registry_number": 119,
        "professional_org": "ABOGADOS DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 28 76 11",
        "postal_code": 11007,
        "adress": "TAMARINDOS, 17 Y 19"
    },
    {
        "date": 2008,
        "registry_number": 44,
        "professional_org": "AGENTES COMERCIALES DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 25 50 11",
        "postal_code": 11004,
        "adress": "C\/ SANTA ELENA, 2-2º B"
    },
    {
        "date": 2009,
        "registry_number": 90,
        "professional_org": "APAREJADORES Y ARQUITECTOS TÉCNICOS DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 27 25 66",
        "postal_code": 11009,
        "adress": "ANA DE VIYA, 5-3º . EDIFICIO NEREIDA"
    },
    {
        "date": 2009,
        "registry_number": 106,
        "professional_org": "DENTISTAS DE CÁDIZ",
        "location": "La línea de la Concepción (CÁDIZ)",
        "phone_number": "956 17 09 50",
        "postal_code": 11300,
        "adress": "C\/ ISABEL LA CATÓLICA, 22"
    },
    {
        "date": 2008,
        "registry_number": 41,
        "professional_org": "AGENTES DE LA PROPIEDAD INMOBILIARIA DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 21 23 38",
        "postal_code": 11004,
        "adress": "C\/ COLUMELA, 33 1º"
    },
    {
        "date": 2009,
        "registry_number": 84,
        "professional_org": "ABOGADOS DE JEREZ DE LA FRONTERA",
        "location": "Jerez de la Frontera (CÁDIZ)",
        "phone_number": "956 32 87 93",
        "postal_code": 11402,
        "adress": "SEVILLA, 37"
    },
    {
        "date": 2009,
        "registry_number": 69,
        "professional_org": "AGENTES COMERCIALES DE JEREZ DE LA FRONTERA",
        "location": "Jerez de la Frontera (CÁDIZ)",
        "phone_number": "956 34 17 34",
        "postal_code": 11401,
        "adress": "CARTUJA, 6 1º A"
    },
    {
        "date": 2008,
        "registry_number": 25,
        "professional_org": "ARQUITECTOS DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 80 70 52",
        "postal_code": 11404,
        "adress": "PLAZA DE LA MINA, 16"
    },
    {
        "date": 2007,
        "registry_number": 9,
        "professional_org": "DIPLOMADOS EN TRABAJO SOCIAL Y ASISTENTES SOCIALES DE CÁDIZ",
        "location": "CÁDIZ",
        "phone_number": "956 27 56 01",
        "postal_code": 11007,
        "adress": "C\/ SANTA CRUZ DE TENERIFE, 5- 2º - OFICINA 22"
    }

];


let professionalorganisations_stats=[];

/** GET ALL */
app.get("/api/v1/professionalorganisations-stats/loadInitialData", (req,res) => { 
    if(professionalorganisations_stats.length==0){
        professionalorganisations_stats=INITIAL_DATA;
        res.sendStatus(201);
    }else{
        res.status(400).send("Data is not empty");
    }
    
});

app.get("/api/v1/professionalorganisations-stats", (req,res) => { 
    res.send(professionalorganisations_stats); 
});


/** POST ALL */
app.post("/api/v1/professionalorganisations-stats", (req,res) => { 
    let newProfessionalOrganisation=req.body;

    //check if resource previusly exists.
    let professionalOrganisation = professionalorganisations_stats.find(x=> x.registry_number == req.body.registry_number);
        if(professionalOrganisation != undefined){
            res.sendStatus(409);
        }

    if(validate_professionalorganisations(newProfessionalOrganisation)){
        professionalorganisations_stats.push(newProfessionalOrganisation);
        res.sendStatus(201);

    }else{
        res.sendStatus(400);
    }



});


    /** function to validate that the post method is correctly done */

function validate_professionalorganisations(professionalorganisation){


    //Object length is 7
    if(Object.keys(professionalorganisation).length!=7){
        return false;
    }

    //date is a number
    if(typeof professionalorganisation.date != "number"){
        return false;
    }

    //registry_number is a number
    if(typeof professionalorganisation.registry_number != "number"){
        return false;
    }

    //rofessional_org is a string
    if(typeof professionalorganisation.professional_org != "string"){
        return false;
    }

    //location is a string
    if(typeof professionalorganisation.location != "string"){
        return false;
    }

    //phone_number is a string
    if(typeof professionalorganisation.phone_number != "string"){
        return false;
    }

    //postal_code is a number
    if(typeof professionalorganisation.postal_code != "number"){
        return false;
    }

    //adress is a string
   if(typeof professionalorganisation.adress != "string"){
        return false;

    }

    return true;

}

/** DELETE ALL */
app.delete("/api/v1/professionalorganisations-stats", (req,res) => { 
    professionalorganisations_stats = [];
    res.sendStatus(200);
});

/** PUT ALL */
app.put("/api/v1/professionalorganisations-stats", (req,res) => { 
    res.sendStatus(405);
});


/** GET by ID (Registry number) */
app.get("/api/v1/professionalorganisations-stats/:registry_number", function(req, res) {

    let professionalorganisation = professionalorganisations_stats.find(x=> x.registry_number == req.params.registry_number);
    if(professionalorganisation == undefined){
        res.sendStatus(404);
    }else{
        res.status(200).send(professionalorganisation);
    }
});

//** PUT by ID */


app.put("/api/v1/professionalorganisations-stats/:registry_number", (req,res) => { 
    //check if exist
    let exist = professionalorganisations_stats.find(x=>x.registry_number == req.params.registry_number)
    if(exist == undefined){
        res.sendStatus(404);
    }
    //check if registy_number is the same in object and url 
    if(req.params.registry_number != req.body.registry_number){
        res.sendStatus(400);
    }
    //validate modify professionalOrganisation object with req params
    if(!validate_professionalorganisations(req.body)){
        res.sendStatus(400);
    }
    /** Update the data */
    exist.date=req.body.date;
    exist.professional_org=req.body.professional_org;
    exist.location=req.body.location;
    exist.phone_number=req.body.phone_number;
    exist.postal_code=req.body.postal_code;
    exist.adress=req.body.adress;
    res.sendStatus(200);


});


/** DELETE by ID */
app.delete("/api/v1/professionalorganisations-stats/:registry_number", (req,res) => { 

    //check if exist
    let exist = professionalorganisations_stats.find(x=>x.registry_number == req.params.registry_number)
    if(exist == undefined){
        res.sendStatus(404);
    }else{
        professionalorganisations_stats = professionalorganisations_stats.filter(x=> x.registry_number != req.params.registry_number);
        res.sendStatus(200);
    }

});

/** POST by ID */
app.post("/api/v1/professionalorganisations-stats/:registry_number", (req,res) => { 
    res.sendStatus(405);
});


}
