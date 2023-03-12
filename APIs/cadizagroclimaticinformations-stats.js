module.exports = function (app) {


    const INITIAL_DATA = [
        {
            "date": 2005,
            "reg_num": 17104,
            "stations_id": 4,
            "maxtemp": 36.46,
            "mintemp": 17.63,
            "averagetemp": 27.24,
            "location": "Cádiz"
        },

        {
            "date": 2000,
            "reg_num": 34,
            "stations_id": 1,
            "maxtemp": 20.06,
            "mintemp": 7.02,
            "averagetemp": 13.29,
            "location": "Cádiz"
        },

        {
            "date": 2008,
            "reg_num": 22804,
            "stations_id": 5,
            "maxtemp": 25.45,
            "mintemp": 9.62,
            "averagetemp": 18.26,
            "location": "Cádiz"
        },

        {
            "date": 2004,
            "reg_num": 37800,
            "stations_id": 9,
            "maxtemp": 30.46,
            "mintemp": 15.85,
            "averagetemp": 24.15,
            "location": "Cádiz"
        },

        {
            "date": 2004,
            "reg_num": 30496,
            "stations_id": 7,
            "maxtemp": 14.54,
            "mintemp": 9.66,
            "averagetemp": 11.85,
            "location": "Cádiz"
        },

        {
            "date": 2008,
            "reg_num": 22820,
            "stations_id": 5,
            "maxtemp": 21.09,
            "mintemp": 14.62,
            "averagetemp": 17.51,
            "location": "Cádiz"
        },

        {
            "date": 2009,
            "reg_num": 23390,
            "stations_id": 5,
            "maxtemp": 20.56,
            "mintemp": 6.939,
            "averagetemp": 14.34,
            "location": "Cádiz"
        },

        {
            "date": 2004,
            "reg_num": 30450,
            "stations_id": 7,
            "maxtemp": 19.29,
            "mintemp": 6.648,
            "averagetemp": 12.98,
            "location": "Cádiz"
        },

        {
            "date": 2005,
            "reg_num": 38295,
            "stations_id": 9,
            "maxtemp": 18.18,
            "mintemp": 80.5,
            "averagetemp": 12.61,
            "location": "Cádiz"
        },

        {
            "date": 2007,
            "reg_num": 38830,
            "stations_id": 9,
            "maxtemp": 21.84,
            "mintemp": 15.86,
            "averagetemp": 18.86,
            "location": "Cádiz"
        },
    ]

    let cadizAgroclimaticInformations_stats = [];

    /*----------------------- GET -----------------------*/
    app.get("/api/v1/cadizagroclimaticinformations-stats/loadInitialData", (req, res) => {
        if (cadizAgroclimaticInformations_stats.length == 0) {
            cadizAgroclimaticInformations_stats = INITIAL_DATA;
            res.sendStatus(201);
        } else {
            res.status(400).send("Data is not empty")
        }
    });

    app.get("/api/v1/cadizagroclimaticinformations-stats", (req, res) => {
        res.send(cadizAgroclimaticInformations_stats);
    });


    /*----------------------- POST -----------------------*/
    app.post("/api/v1/cadizagroclimaticinformations-stats", (req, res) => {
        let newCadizAgroclimaticInformation = req.body;

        let cadizAgroclimaticInformation = cadizAgroclimaticInformations_stats.find(x => x.reg_num == req.body.reg_num);
        if (cadizAgroclimaticInformation != undefined) {
            res.sendStatus(409);
        }

        if(validate_cadizAgroclimaticInformations(newCadizAgroclimaticInformation)){
            cadizAgroclimaticInformations_stats.push(newCadizAgroclimaticInformation);
            res.sendStatus(201);
        }else{
            res.sendStatus(400);
        }

    });

    /** funciones para validar que el post esta hecho correctamente */

    function validate_cadizAgroclimaticInformations(cadizAgroclimaticInformation){
        /** debe medir 7 */
        if(Object.keys(cadizAgroclimaticInformation).length!=7){
            return false;
        }

        /** date es numérico */
        if(typeof cadizAgroclimaticInformation.date != "number"){
            return false;
        }

        /** reg_num es numérico */
        if(typeof cadizAgroclimaticInformation.reg_num != "number"){
            return false;
        }

        /** stations_id es numérico */        
        if(typeof cadizAgroclimaticInformation.stations_id != "number"){
            return false;
        }

        /** maxtemp es numérico */  
        if(typeof cadizAgroclimaticInformation.maxtemp != "number"){
            return false
        }

        /** mintemp es numérico */  
        if(typeof cadizAgroclimaticInformation.mintemp != "number"){
            return false
        }

        /** averagetemp es numérico */  
        if(typeof cadizAgroclimaticInformation.averagetemp != "number"){
            return false
        }

        /** stations_id es un string */  
        if(typeof cadizAgroclimaticInformation.location != "string"){
            return false
        }

        return true;
    }


    /** Eliminar todo */
    app.delete("/api/v1/cadizagroclimaticinformations-stats", (req, res) => {
        cadizAgroclimaticInformations_stats = [];
        res.sendStatus(200);
    });

    /** PUT a todo */
    app.put("/api/v1/cadizagroclimaticinformations-stats", (req, res) => {
        res.sendStatus(405);
    });

    /** Get con un ID (reg_num) */
    app.get("/api/v1/cadizagroclimaticinformations-stats/:reg_num", function(req,res) {
        let cadizAgroclimaticInformation = cadizAgroclimaticInformations_stats.find(x => x.reg_num == req.params.reg_num);
        if(cadizAgroclimaticInformation == undefined){
            res.sendStatus(404);
        }else{
            res.status(200).send(cadizAgroclimaticInformation);
        }
    });

    /** Delete con un ID (reg_num) */
    app.delete("/api/v1/cadizagroclimaticinformations-stats/:reg_num", (req,res) => { 

        //check if exist
        let exist = cadizAgroclimaticInformations_stats.find(x=>x.reg_num == req.params.reg_num)
        if(exist == undefined){
            res.sendStatus(404);
        }else{
            cadizAgroclimaticInformations_stats = cadizAgroclimaticInformations_stats.filter(x=> x.reg_num != req.params.reg_num);
            res.sendStatus(200);
        }
    });



    /** Put con un ID (reg_num) */
    app.put("/api/v1/cadizagroclimaticinformations-stats/:reg_num", (req,res) => {
        let exist = cadizAgroclimaticInformations_stats.find(x=>x.reg_num == req.params.reg_num)
        if(exist==undefined){
            res.sendStatus(404);
        }
        if(req.params.reg_num != req.body.reg_num){
            res.sendStatus(400);
        }
        if(!validate_cadizAgroclimaticInformations(req.body)){
            res.sendStatus(400);
        }
        exist.date=req.body.date;
        exist.reg_num=req.body.reg_num;
        exist.stations_id=req.body.stations_id;
        exist.maxtemp=req.body.maxtemp;
        exist.mintemp=req.body.mintemp;
        exist.averagetemp=req.body.averagetemp;
        exist.location=req.body.location;
        res.sendStatus(200);
    });

    /** Post con un ID (reg_num) */
    app.post("/api/v1/cadizagroclimaticinformations-stats/:reg_num", (req,res) => {
        res.sendStatus(405);
    });
}