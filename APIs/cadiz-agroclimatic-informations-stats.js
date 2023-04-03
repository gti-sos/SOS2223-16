import Datastore from 'nedb';
const db = new Datastore();

function loadBackend_agroclimatic(app) {

    app.get("/api/v1/cadiz-agroclimatic-informations-stats/docs", (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/26036256/2s93K1oJuV');
    });


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
    ];

    let cadizAgroclimaticInformations_stats = [];

    /*----------------------- GET -----------------------*/
    /*
    app.get("/api/v1/cadiz-agroclimatic-informations-stats/loadInitialData", (req, res) => {
        db.count({}, function (err, count) {
            if (count == 0) {
                /*
                INITIAL_DATA.forEach((c) => {
                    delete c._id;
                })
                */
               /*
                db.insert(INITIAL_DATA);
                res.sendStatus(201);
                console.log(`Se insertan los ${INITIAL_DATA.length} datos iniciales.`);
            } else {
                res.status(400).send("Data is not empty");
                console.log("Hay datos mostrándose.");
            }
        });
    });
    */
   db.insert(INITIAL_DATA);

    app.get("/api/v1/cadiz-agroclimatic-informations-stats", (req, res) => {
        // Paginación
        let limit = 0;
        let offset = 0;
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        let query = {};
        if (req.query.date) {
            query.date = parseInt(req.query.date);
        }

        if (req.query.reg_num) {
            query.reg_num = parseInt(req.query.reg_num);
        }

        if (req.query.stations_id) {
            query.stations_id = parseInt(req.query.stations_id);
        }

        if (req.query.maxtemp) {
            query.maxtemp = parseFloat(req.query.maxtemp);
        }

        if (req.query.mintemp) {
            query.mintemp = parseFloat(req.query.mintemp);
        }

        if (req.query.averagetemp) {
            query.averagetemp = parseFloat(req.query.averagetemp);
        }

        if (req.query.location) {
            query.location = req.query.location;
        }

        // if (req.params[7])

        //dato
        if (req.query.date_over) {
            query.date = { $gte: parseInt(req.query.date_over) };
        }

        if (req.query.date_below) {
            query.date = { $lte: parseInt(req.query.date_below) };
        }

        //datos entre fechas
        if (req.query.from && req.query.to) {
            query.date = { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) };
        }

        //reg num
        if (req.query.reg_num_over) {
            query.reg_num = { $gte: parseInt(req.query.reg_num_over) };
        }
        if (req.query.reg_num_below) {
            query.reg_num = { $lte: parseInt(req.query.reg_num_below) };
        }

        //stations_id
        if (req.query.stations_id_over) {
            query.stations_id = { $gte: parseInt(req.query.stations_id_over) };
        }

        if (req.query.stations_id_below) {
            query.stations_id = { $lte: parseInt(req.query.stations_id_below) };
        }

        //maxtemp
        if (req.query.maxtemp_over) {
            query.maxtemp = { $gte: parseInt(req.query.maxtemp_over) };
        }

        if (req.query.maxtemp_below) {
            query.maxtemp = { $lte: parseInt(req.query.maxtemp_below) };
        }

        //mintemp
        if (req.query.mintemp_over) {
            query.mintemp = { $gte: parseInt(req.query.mintemp_over) };
        }

        if (req.query.mintemp_below) {
            query.mintemp = { $lte: parseInt(req.query.mintemp_below) };
        }

        //averagetemp
        if (req.query.averagetemp_over) {
            query.averagetemp = { $gte: parseInt(req.query.averagetemp_over) };
        }

        if (req.query.averagetemp_below) {
            query.averagetemp = { $lte: parseInt(req.query.averagetemp_below) };
        }

        db.find(query).sort({ reg_num: req.body.reg_num }).skip(offset)
            .limit(limit).exec(function (err, docs) {

                res.send(docs.map((c) => {
                    delete c._id;
                    return c;
                }));
                console.log(`Se muestra un total de ${docs.length} datos.`);
            });
    });

    /*----------------------- POST -----------------------*/
    app.post("/api/v1/cadiz-agroclimatic-informations-stats", (req, res) => {
        let newCadizAgroclimaticInformation = req.body;

        db.findOne({ reg_num: req.body.reg_num }, function (err, existingcadizagroclimaticinformation) {
            if (existingcadizagroclimaticinformation != undefined) {
                res.sendStatus(409);
                console.log("No es único.");
                return;
            }
            if (validate_cadizAgroclimaticInformations(newCadizAgroclimaticInformation)) {
                delete newCadizAgroclimaticInformation._id;
                db.insert(newCadizAgroclimaticInformation);
                res.sendStatus(201);
                console.log("Se ha creado correctamente.");
                return;
            } else {
                res.sendStatus(400);
                console.log("se han introducido mal los datos.");
                return;
            }
        });
    });

    /** funciones para validar que el post esta hecho correctamente */

    function validate_cadizAgroclimaticInformations(cadizAgroclimaticInformation) {
        /** debe medir 7 */
        if (Object.keys(cadizAgroclimaticInformation).length != 7) {
            return false;
        }

        /** date es numérico */
        if (typeof cadizAgroclimaticInformation.date != "number") {
            return false;
        }

        /** reg_num es numérico */
        if (typeof cadizAgroclimaticInformation.reg_num != "number") {
            return false;
        }

        /** stations_id es numérico */
        if (typeof cadizAgroclimaticInformation.stations_id != "number") {
            return false;
        }

        /** maxtemp es numérico */
        if (typeof cadizAgroclimaticInformation.maxtemp != "number") {
            return false
        }

        /** mintemp es numérico */
        if (typeof cadizAgroclimaticInformation.mintemp != "number") {
            return false
        }

        /** averagetemp es numérico */
        if (typeof cadizAgroclimaticInformation.averagetemp != "number") {
            return false
        }

        /** stations_id es un string */
        if (typeof cadizAgroclimaticInformation.location != "string") {
            return false
        }

        return true;
    };

    /*** Eliminar los datos de INITIAL_DATA */
    app.delete("/api/v1/cadiz-agroclimatic-informations-stats/loadInitialData", (req, res) => {
        const regNums = [17104, 34, 22804, 37800, 30496, 22820, 23390, 30450, 38295, 38830];
      
        const searchCriteria = regNums.map(regNum => ({ reg_num: parseInt(regNum) }));
      
        db.remove({ $or: searchCriteria }, { multi: true }, function (err, numRemoved) {
      
          if (numRemoved === 0) {
            res.sendStatus(404);
            console.log("No se encontraron datos para borrar.");
          } else {
            res.sendStatus(200);
            console.log(`${numRemoved} datos borrados.`);
          }
        });
      });
      
    /** Eliminar todo */
    app.delete("/api/v1/cadiz-agroclimatic-informations-stats", (req, res) => {
        db.remove({}, { multi: true }, function (err, numRemoved) {
            res.sendStatus(200);
            console.log("Se han eliminado todos los datos.");
        });
    });

    /** PUT a todo */
    app.put("/api/v1/cadiz-agroclimatic-informations-stats", (req, res) => {
        res.sendStatus(405);
        console.log("Método no permitido.");
    });


    /** Get con un ID */
    app.get("/api/v1/cadiz-agroclimatic-informations-stats/:reg_num", function (req, res) {
        const reg_num = parseInt(req.params.reg_num);
        let busqueda = { reg_num: reg_num };
        db.findOne(busqueda, function (err, cadizAgroclimaticInformation) {
            if (cadizAgroclimaticInformation == undefined) {
                res.sendStatus(404);
                console.log("No se encontró el dato buscado.");
                return;
            } else {
                delete cadizAgroclimaticInformation._id;
                res.status(200).send(cadizAgroclimaticInformation);
                console.log("Se ha mostrado el dato pedido.");
            }
        });

    });

    /** Delete con un ID */
    app.delete("/api/v1/cadiz-agroclimatic-informations-stats/:reg_num", function (req, res) {

        const reg_num = parseInt(req.params.reg_num);

        let busqueda = { reg_num: reg_num };

        db.findOne(busqueda, function (err, cadizAgroclimaticInformation) {
            if (cadizAgroclimaticInformation == undefined) {
                res.sendStatus(404);
                console.log("No está el dato buscado.");
                return;
            } else {
                db.remove(busqueda, { multi: true },
                    function (err, cadizAgroclimaticInformation) {
                        res.sendStatus(200);
                        console.log("Dato borrado.");
                    });
            }
        });
    });


    /** Put con un ID (reg_num) */
    app.put("/api/v1/cadiz-agroclimatic-informations-stats/:reg_num", function (req, res) {
        const reg_num = parseInt(req.params.reg_num);

        let busqueda = { reg_num: reg_num };

        db.findOne(busqueda, function (err, cadizAgroclimaticInformation) {
            if (cadizAgroclimaticInformation == 0) {
                res.sendStatus(400);
                console.log("Datos no encontrados.");
                return;
            }

            if (!validate_cadizAgroclimaticInformations(req.body)) {
                res.sendStatus(400);
                console.log("Datos no válidos.");
                return;
            }

            db.update(busqueda, { $set: req.body });
            res.sendStatus(200);
        });
    });




    /** Post con un ID (reg_num) */
    app.post("/api/v1/cadiz-agroclimatic-informations-stats/:reg_num", (req, res) => {
        res.sendStatus(405);
        console.log("Método no disponible.");
    });
};

export {loadBackend_agroclimatic};