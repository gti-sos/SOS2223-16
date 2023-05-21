import datastore from 'nedb';
import request from "request";
const db = new datastore();
const BASE_API_URL = "/api/v1"

function loadBackend_civilwarandalusian(app) {
    
    /** PROXY  */
    app.use("/api/v2/civilwarandalusian-stats/proxy",function(req,res){
        let urlHost = "https://drinks-digital1.p.rapidapi.com";
        let url = urlHost + req.url;
        console.log('piped: proxy' + req.url);
        console.log(url);
        req.pipe(request(url)).pipe(res);
    });

    app.get(BASE_API_URL + "civilwarandalusian-stats/docs", (req, res) => {

        res.redirect('https://documenter.getpostman.com/view/7223889/2s93RQTZjp');

    });

    const INITIAL_DATA = [

        {
            "Id": 135,
            "title": "Fosa de Trebujena. Cádiz",
            "character": "Carretera\/Camino",
            "province": "Cádiz",
            "municipality": "Trebujena",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103701.jpg",
            "victims": 1,
            "dates_act": 1970
        },
        {
            "Id": 141,
            "title": "Fosa de Torre Alháquime. Cádiz",
            "character": "Zona edificada",
            "province": "Cádiz",
            "municipality": "Torre_Alháquime",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103601.jpg",
            "victims": 1,
            "dates_act": 2000
        },
        {
            "Id": 134,
            "title": "Fosa de Trebujena. Cádiz",
            "character": "Cementerio interior",
            "province": "Cádiz",
            "municipality": "Trebujena",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103702.jpg",
            "victims": 24,
            "dates_act": 2005
        },
        {
            "Id": 137,
            "title": "Fosa de Torre Alháquime. Cádiz",
            "character": "Otros",
            "province": "Cádiz",
            "municipality": "Torre Alháquime",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103606_b.jpg",
            "victims": 1,
            "dates_act": 2002
        },
        {
            "Id": 139,
            "title": "Fosa de Torre Alháquime. Cádiz",
            "character": "Otros",
            "province": "Cádiz",
            "municipality": "Torre Alháquime",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103604_b.jpg",
            "victims": 10,
            "dates_act": 1988,
        },
        {
            "Id": 142,
            "title": "Fosa de Tarifa. Cádiz",
            "character": "Cementerio interior",
            "province": "Cádiz",
            "municipality": "Tarifa",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103505_b.jpg",
            "victims": 5,
            "dates_act": 1995,
        },
        {
            "Id": 143,
            "title": "Fosa de La Campana. Sevilla",
            "character": "Cementerio interior",
            "province": "Sevilla",
            "municipality": "La Campana",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_8\/4102201_b.jpg",
            "victims": 250,
            "dates_act": 2005,
        },
        {
            "Id": 129,
            "title": "Fosa de Villaluenga del Rosario. Cádiz",
            "character": "Cementerio interior",
            "province": "Cádiz",
            "municipality": "Villaluenga del Rosario",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1104002_b.jpg",
            "victims": 14,
            "dates_act": 1990,
        },
        {
            "Id": 131,
            "title": "Fosa de Ubrique. Cádiz",
            "character": "Cementerio interior",
            "province": "Cádiz",
            "municipality": "Ubrique",
            "dateNumeric": 1937,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_2\/1103802_b.jpg",
            "victims": 19,
            "dates_act": 1990,
        },
        {
            "Id": 133,
            "title": "Fosa de San Silvestre de Guzmán. Huelva",
            "character": "Cementerio interior",
            "province": "Huelva",
            "municipality": "San Silvestre de Guzmán",
            "dateNumeric": 1936,
            "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_5\/2106601_b.jpg",
            "victims": 8,
            "dates_act": 2005,
        }

    ];


    let civilWarAndalusian_stats = [];

    app.get("/api/v1/civilwarandalusian-stats/loadInitialData", (req, res) => {
        db.count({}, function (err, count) {
            if (count == 0) {
                db.insert(INITIAL_DATA);
                res.sendStatus(201);
                console.log(`Se insertan los ${INITIAL_DATA.length} datos iniciales.`);
            } else {
                res.status(400).send("Data is not empty");
            }
        });

    });


    app.get("/api/v1/civilwarandalusian-stats", (req, res) => {

        //paginating
        let offset = 0;
        let limit = 0;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        //search
        let query = {};
        if (req.query.Id) {
            query.Id = parseInt(req.query.Id);
        }
        if (req.query.title) {
            query.title = req.query.title;
        }
        if (req.query.character) {
            query.character = req.query.character;
        }
        if (req.query.province) {
            query.province = req.query.province;
        }
        if (req.query.municipality) {
            query.municipality = req.query.municipality;
        }
        if (req.query.dateNumeric) {
            query.dateNumeric = parseInt(req.query.dateNumeric);
        }
        if (req.query.Photo_PieFosa) {
            query.Photo_PieFosa = req.query.Photo_PieFosa;
        }
        if (req.query.victims) {
            query.victims = parseInt(req.query.victims);
        }
        if (req.query.dates_act) {
            query.dates_act = parseInt(req.query.dates_act);
        }
        //numeric search

        //Id
        if (req.query.Id_over) {
            query.Id = { $gte: parseInt(req.query.Id_over) };
        }
        if (req.query.Id_below) {
            query.Id = { $lte: parseInt(req.query.Id_below) };
        }

        //dateNumeric
        if (req.query.dateNumeric_over) {
            query.dateNumeric = { $gte: parseInt(req.query.dateNumeric_over) };
        }
        if (req.query.dateNumeric_below) {
            query.dateNumeric = { $lte: parseInt(req.query.dateNumeric_below) };
        }

        //victims
        if (req.query.victims_over) {
            query.victims = { $gte: parseInt(req.query.victims_over) };
        }
        if (req.query.victims_below) {
            query.victims = { $lte: parseInt(req.query.victims_below) };
        }
        //dates_act
        if (req.query.dates_act_over) {
            query.dates_act = { $gte: parseInt(req.query.dates_act_over) };
        }
        if (req.query.dates_act_below) {
            query.dates_act = { $lte: parseInt(req.query.dates_act_below) };
        }


        db.find(query).sort({ Id: req.body.Id }).skip(offset).limit(limit).exec(function (err, docs) {
            res.send(remove_internal_id(docs));
        });

    });


    /** POST ALL */
    app.post("/api/v1/civilwarandalusian-stats", (req, res) => {
        let newCivilWarAndalusian = req.body;

        //check if resource previusly exists.
        db.findOne({ Id: req.body.Id }, function (err, exisistingCivilWarAndalusiann) {
            if (exisistingCivilWarAndalusiann != undefined) {
                res.sendStatus(409);
                return;
            };
            if (validate_civilWarAndalusian(newCivilWarAndalusian)) {
                db.insert(newCivilWarAndalusian);
                res.sendStatus(201);

            } else {
                res.sendStatus(400);
            }

        });




    });



    /** function to validate that the post method is correctly done */

    function validate_civilWarAndalusian(civilwarandalusian) {


        //Object length is 8
        if (Object.keys(civilwarandalusian).length != 9) {
            return false;
        }

       //Id is a number
       if (!Number.isInteger(Number(civilwarandalusian.Id)) || civilwarandalusian.Id.length == 0) {
        return false;
        } else {
        civilwarandalusian.Id = Number(civilwarandalusian.Id)
    }
    //title string
    if (typeof civilwarandalusian.title != "string" || civilwarandalusian.title.trim().length == 0) {
        return false;
    }
    //character string
    if (typeof civilwarandalusian.character != "string" || civilwarandalusian.character.trim().length == 0) {
        return false;
    }
    //province string
    if (typeof civilwarandalusian.province != "string" || civilwarandalusian.province.trim().length == 0) {
        return false;
    }
    //municipality string
    if (typeof civilwarandalusian.municipality != "string" || civilwarandalusian.municipality.trim().length == 0) {
        return false;
    }
    //datenumeric is a number
    if (!Number.isInteger(Number(civilwarandalusian.dateNumeric)) || civilwarandalusian.dateNumeric.length == 0) {
        return false;
    } else {
        civilwarandalusian.dateNumeric = Number(civilwarandalusian.dateNumeric)
    }

    //Photo_PieFosa is a string
    if (typeof civilwarandalusian.Photo_PieFosa != "string" || civilwarandalusian.Photo_PieFosa.trim().length == 0) {
        return false;
    }
    //victims is a number
    if (!Number.isInteger(Number(civilwarandalusian.victims)) || civilwarandalusian.victims.length == 0) {
        return false;
    } else {
        civilwarandalusian.victims = Number(civilwarandalusian.victims)
    }
    //dates_act number
    if (!Number.isInteger(Number(civilwarandalusian.dates_act)) || civilwarandalusian.dates_act.length == 0) {
        return false;
    } else {
        civilwarandalusian.dates_act = Number(civilwarandalusian.dates_act)
    }
    return true;


}
    // delete all

    app.delete("/api/v1/civilwarandalusian-stats", (req, res) => {
        db.remove({}, { multi: true }, function (err, numRemoved) {
            res.sendStatus(200);
        });
    });

    app.delete("/api/v1/civilwarandalusian-stats/loadInitialData", (req, res) => {
        const ids = [135, 141, 134, 137, 139, 142, 143, 129, 131, 133];

        const searchXid = ids.map(Id => ({ Id: parseInt(Id) }));

        db.remove({ $or: searchXid }, { multi: true }, function (err, numRemoved) {

            if (numRemoved === 0) {
                res.sendStatus(404);
                console.log("No se encontraron datos para borrar.");
            } else {
                res.sendStatus(200);
                console.log(`${numRemoved} datos borrados.`);
            }
        });
    });

    /** PUT ALL */
    app.put("/api/v1/civilwarandalusian-stats", (req, res) => {
        res.sendStatus(405);
    });


    /** GET by ID (ID) */
   // app.get("/api/v1/civilwarandalusian-stats/:Id", function (req, res) {

     //   db.findOne({ Id: parseInt(req.params.Id) }, function (err, civilwarandalusian) {
       //     if (civilwarandalusian == undefined) {
         //       res.sendStatus(404);
           // } else {
             //   res.status(200).send(remove_internal_id(civilwarandalusian));
            //}
        //});
    //});
    
    /** Get con un ID */
    app.get("/api/v1/civilwarandalusian-stats/:Id", function (req, res) {
        const Id = parseInt(req.params.Id);
        let busqueda = { Id: Id };
        db.findOne(busqueda, function (err, civilwarandalusian) {
            if (civilwarandalusian == undefined) {
                res.sendStatus(404);
                console.log("No se encontró el dato buscado.");
                return;
            } else {
                res.status(200).send(remove_internal_id(civilwarandalusian));
                console.log("Se ha mostrado el dato pedido.");
            }
        });

    });

    //** PUT by ID */


    app.put("/api/v1/civilwarandalusian-stats/:Id", (req, res) => {
        //check if exist
        db.findOne({ Id: parseInt(req.params.Id) }, function (err, civilwarandalusian) {
            if (civilwarandalusian == undefined) {
                res.sendStatus(404);
                return;
            }
            //check if registy_number is the same in object and url 
            if (req.params.civilwarandalusian != req.body.civilwarandalusian) {
                res.sendStatus(400);
                return;
            }
            //validate modify professionalOrganisation object with req params
            if (!validate_civilWarAndalusian(req.body)) {
                res.sendStatus(400);
                return;
            }


            db.update({ Id: parseInt(req.params.Id) }, { $set: req.body }, function (err, numReplaced) {
                res.sendStatus(200);
            });
        });

    });


    /** DELETE by ID */
    app.delete("/api/v1/civilwarandalusian-stats/:Id", (req, res) => {

        //check if exist
        db.findOne({ Id: parseInt(req.params.Id) }, function (err, civilWarAndalusian) {
            if (civilWarAndalusian == undefined) {
                res.sendStatus(404);
            } else {
                db.remove({ Id: parseInt(req.params.Id) }, { multi: true }, function (err, numRemoved) {
                    res.sendStatus(200);
                });
            }
        });
    });

    /** POST by ID */
    app.post("/api/v1/civilwarandalusian-stats/:Id", (req, res) => {
        res.sendStatus(405);
    });



    function remove_internal_id(element) {
        if (Array.isArray(element)) {
            return element.map(m => {
                delete m._id;
                return m;
            });
        } else {
            delete element._id;
            return element;
        }
    }
}

export { loadBackend_civilwarandalusian };