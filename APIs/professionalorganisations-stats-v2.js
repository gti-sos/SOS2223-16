import axios from 'axios';
import datastore from 'nedb';
import request from "request";

const db = new datastore();
const BASE_API_URL = "/api/v2"

function loadBackend_professionalorganisations_v2(app) {


    /** PROXY  */
    app.use("/api/v2/professionalorganisations-stats/proxy", function (req, res) {
        let urlHost = "https://api.languagetoolplus.com/v2/";
        let url = urlHost + req.url;
        console.log('piped: proxy ' + req.url);
        req.pipe(request(url)).pipe(res);
    });

    app.get(BASE_API_URL + "/professionalorganisations-stats/docs", (req, res) => {

        res.redirect('https://documenter.getpostman.com/view/26011834/2s93JzM1BX');

    });

    const INITIAL_DATA = [

        {
            "date": 2007,
            "registry_number": 14,
            "professional_org": "FARMACÉUTICOS DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956212277",
            "postal_code": 11004,
            "adress": "C\/ ISABEL LA CATÓLICA, 22"
        },
        {
            "date": 2011,
            "registry_number": 119,
            "professional_org": "ABOGADOS DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956287611",
            "postal_code": 11007,
            "adress": "TAMARINDOS, 17 Y 19"
        },
        {
            "date": 2008,
            "registry_number": 44,
            "professional_org": "AGENTES COMERCIALES DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956255011",
            "postal_code": 11004,
            "adress": "C\/ SANTA ELENA, 2-2º B"
        },
        {
            "date": 2009,
            "registry_number": 90,
            "professional_org": "APAREJADORES Y ARQUITECTOS TÉCNICOS DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956272566",
            "postal_code": 11009,
            "adress": "ANA DE VIYA, 5-3º . EDIFICIO NEREIDA"
        },
        {
            "date": 2009,
            "registry_number": 106,
            "professional_org": "DENTISTAS DE CÁDIZ",
            "location": "La línea de la Concepción (CÁDIZ)",
            "phone_number": "956170950",
            "postal_code": 11300,
            "adress": "C\/ ISABEL LA CATÓLICA, 22"
        },
        {
            "date": 2008,
            "registry_number": 41,
            "professional_org": "AGENTES DE LA PROPIEDAD INMOBILIARIA DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956212338",
            "postal_code": 11004,
            "adress": "C\/ COLUMELA, 33 1º"
        },
        {
            "date": 2009,
            "registry_number": 84,
            "professional_org": "ABOGADOS DE JEREZ DE LA FRONTERA",
            "location": "Jerez de la Frontera (CÁDIZ)",
            "phone_number": "956328793",
            "postal_code": 11402,
            "adress": "SEVILLA, 37"
        },
        {
            "date": 2009,
            "registry_number": 69,
            "professional_org": "AGENTES COMERCIALES DE JEREZ DE LA FRONTERA",
            "location": "Jerez de la Frontera (CÁDIZ)",
            "phone_number": "956341734",
            "postal_code": 11401,
            "adress": "CARTUJA, 6 1º A"
        },
        {
            "date": 2008,
            "registry_number": 25,
            "professional_org": "ARQUITECTOS DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956807052",
            "postal_code": 11404,
            "adress": "PLAZA DE LA MINA, 16"
        },
        {
            "date": 2007,
            "registry_number": 9,
            "professional_org": "DIPLOMADOS EN TRABAJO SOCIAL Y ASISTENTES SOCIALES DE CÁDIZ",
            "location": "CÁDIZ",
            "phone_number": "956275601",
            "postal_code": 11007,
            "adress": "C\/ SANTA CRUZ DE TENERIFE, 5- 2º - OFICINA 22"
        }

    ];


    /** GET ALL */
    app.get(BASE_API_URL + "/professionalorganisations-stats/loadInitialData", (req, res) => {

        db.count({}, function (err, count) {
            if (count == 0) {
                db.insert(INITIAL_DATA, function (err, newDoc) {
                    res.sendStatus(201);
                });
            } else {
                res.status(400).send("Data is not empty");
            }
        });

    });

    /** Pokemon API */
    app.get(BASE_API_URL + "/professionalorganisations-stats/pokemon", (req, res) => {
        const options = {
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
        };

        axios.request(options).then(function (response) {
            let pikachuStatsArray = [];
            const pikachuTotal = response.data.stats.reduce((total, objeto) => total + objeto.base_stat, 0);
            response.data.stats.forEach(element => {
                pikachuStatsArray.push({
                    "name": element.stat.name,
                    "y": element.base_stat * 100 / pikachuTotal,
                    "drilldown": element.stat.name
                });
            });
            res.send(pikachuStatsArray);

        }).catch(function (error) {
            console.error(error);
            res.status(400);

        });

    });

    /** Spotify API */
    app.get(BASE_API_URL + "/professionalorganisations-stats/spotify", (req, res) => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: 'pop',
                type: 'albums',
                offset: '0',
                limit: '100',
                numberOfTopResults: '5'
            },
            headers: {
                'X-RapidAPI-Key': 'b58e867985mshf07d32cb259174cp1f8199jsn4f949cac1e2c',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            let musicArray = [];
            let professionalOrgArray = [];
            response.data.albums.items.forEach(album => {
                const year = album.data.date.year;
                if (musicArray.find(x => x[0] == year) != undefined) {
                    musicArray.find(x => x[0] == year)[1] += 1;
                } else {
                    musicArray.push([
                        year,
                        1
                    ]);
                }
            });
            db.find({}, function (err, professionalorganisations) {
                professionalorganisations.forEach(element => {
                    const date = element.date;
                    if (professionalOrgArray.find(x => x[0] == date) != undefined) {
                        professionalOrgArray.find(x => x[0] == date)[1] += 1;
                    } else {
                        professionalOrgArray.push([
                            date,
                            1
                        ]);
                    }
                });
                res.send({ "spotify": musicArray, "professionalorganisations": professionalOrgArray });
            });


        }).catch(function (error) {
            res.status(400);
        });
    });

    /** Movies API */
    app.get(BASE_API_URL + "/professionalorganisations-stats/movies", (req, res) => {
        const options = {
            method: 'GET',
            url: 'https://movies-tv-shows-database.p.rapidapi.com/',
            params: {
                title: 'Harry Potter'
            },
            headers: {
                Type: 'get-movies-by-title',
                'X-RapidAPI-Key': 'b58e867985mshf07d32cb259174cp1f8199jsn4f949cac1e2c',
                'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            let moviesArray = [];
            let professionalOrgArray = [];
            response.data.movie_results.forEach(movie => {
                const year = movie.year;
                if (moviesArray.find(x => x.year == year) != undefined) {
                    moviesArray.find(x => x.year == year)[1] += 1;
                } else {
                    moviesArray.push([
                        year,
                        1
                    ]);
                }
            });
            db.find({}, function (err, professionalorganisations) {
                professionalorganisations.forEach(element => {
                    const date = element.date;
                    if (professionalOrgArray.find(x => x[0] == date) != undefined) {
                        professionalOrgArray.find(x => x[0] == date)[1] += 1;
                    } else {
                        professionalOrgArray.push([
                            date,
                            1
                        ]);
                    }
                });
                res.send({ "HarryPotter": moviesArray, "professionalorganisations": professionalOrgArray });
            });


        }).catch(function (error) {
            console.log(error);
            res.status(400);
        });
    });

    /** Call for the year chart, this will return all the professional organisations grouped by year */

    app.get(BASE_API_URL + "/professionalorganisations-stats/yearsTable", (req, res) => {
        db.find({}, function (err, professionalorganisations) {
            let yearsProfessionalOrganisationsDict = {};
            professionalorganisations.forEach(element => {
                if (element.date in yearsProfessionalOrganisationsDict) {
                    yearsProfessionalOrganisationsDict[element.date] += 1;
                } else {
                    yearsProfessionalOrganisationsDict[element.date] = 1;
                }
            });
            res.status(200).send(yearsProfessionalOrganisationsDict);
        });
    });


    /** llamada para el grafo de burbujas, devolverá todos los datos agrupados por campos */
    app.get(BASE_API_URL + "/professionalorganisations-stats/bubbleChart", (req, res) => {
        let response = [];
        let yearsBubble = {
            name: 'Años',
            data: []
        };
        let registryBubble = {
            name: 'Numero de registro',
            data: []
        };
        let professionalOrgBubble = {
            name: 'Colegio Profesional',
            data: []
        };
        let locationBubble = {
            name: 'Localización',
            data: []
        };
        let PhoneBubble = {
            name: 'Número de teléfono',
            data: []
        };
        let PostalCodeBubble = {
            name: 'Código postal',
            data: []
        };
        let AdressBubble = {
            name: 'Calle',
            data: []
        };



        db.find({}, function (err, professionalorganisations) {
            professionalorganisations.forEach(element => {
                if (yearsBubble.data.find(x => x.name == element.date.toString()) != undefined) {
                    yearsBubble.data.find(x => x.name == element.date.toString()).value += 1;
                } else {
                    yearsBubble.data.push({
                        name: element.date.toString(),
                        value: 1
                    })
                }

                if (registryBubble.data.find(x => x.name == element.registry_number.toString()) != undefined) {
                    registryBubble.data.find(x => x.name == element.registry_number.toString()).value += 1;
                } else {
                    registryBubble.data.push({
                        name: element.registry_number.toString(),
                        value: 1
                    })
                }

                if (professionalOrgBubble.data.find(x => x.name == element.professional_org) != undefined) {
                    professionalOrgBubble.data.find(x => x.name == element.professional_org).value += 1;
                } else {
                    professionalOrgBubble.data.push({
                        name: element.professional_org,
                        value: 1
                    })
                }

                if (locationBubble.data.find(x => x.name == element.location) != undefined) {
                    locationBubble.data.find(x => x.name == element.location).value += 1;
                } else {
                    locationBubble.data.push({
                        name: element.location,
                        value: 1
                    })
                }

                if (PhoneBubble.data.find(x => x.name == element.phone_number) != undefined) {
                    PhoneBubble.data.find(x => x.name == element.phone_number).value += 1;
                } else {
                    PhoneBubble.data.push({
                        name: element.phone_number,
                        value: 1
                    })
                }

                if (PostalCodeBubble.data.find(x => x.name == element.postal_code.toString()) != undefined) {
                    PostalCodeBubble.data.find(x => x.name == element.postal_code.toString()).value += 1;
                } else {
                    PostalCodeBubble.data.push({
                        name: element.postal_code.toString(),
                        value: 1
                    })
                }

                if (AdressBubble.data.find(x => x.name == element.adress) != undefined) {
                    AdressBubble.data.find(x => x.name == element.adress).value += 1;
                } else {
                    AdressBubble.data.push({
                        name: element.adress,
                        value: 1
                    })
                }
            });

            response.push(yearsBubble);
            response.push(registryBubble);
            response.push(professionalOrgBubble);
            response.push(locationBubble);
            response.push(PhoneBubble);
            response.push(PostalCodeBubble);
            response.push(AdressBubble);
            res.status(200).send(response);

        });
    });

    /** Count the number of Professional Organisations */
    app.get(BASE_API_URL + "/professionalorganisations-stats/count-professional-organisations", function (req, res) {
        //search
        let query = {};

        if (req.query.professional_org) {
            query.professional_org = req.query.professional_org;
        }
        if (req.query.location) {
            query.location = req.query.location;
        }
        if (req.query.phone_number) {
            query.phone_number = req.query.phone_number;
        }
        if (req.query.adress) {
            query.adress = req.query.adress;
        }

        //numerics search

        //registry_number
        if (req.query.registry_number_over) {
            query.registry_number = { $gte: parseInt(req.query.registry_number_over) };
        }
        if (req.query.registry_number_below) {
            if (query.registry_number != undefined) {
                Object.assign(query.registry_number, { $lte: parseInt(req.query.registry_number_below) });
            } else {
                query.registry_number = { $lte: parseInt(req.query.registry_number_below) };
            }
        }
        if (req.query.registry_number) {
            query.registry_number = parseInt(req.query.registry_number);
        }

        //date
        if (req.query.date_over) {
            query.date = { $gte: parseInt(req.query.date_over) };
        }
        if (req.query.date_below) {
            if (query.date != undefined) {
                Object.assign(query.date, { $lte: parseInt(req.query.date_below) });
            } else {
                query.date = { $lte: parseInt(req.query.date_below) };
            }
        }
        if (req.query.date) {
            query.date = parseInt(req.query.date);
        }

        //postal_code
        if (req.query.postal_code_over) {
            query.postal_code = { $gte: parseInt(req.query.postal_code_over) };
        }
        if (req.query.postal_code_below) {
            if (query.postal_code != undefined) {
                Object.assign(query.postal_code, { $lte: parseInt(req.query.postal_code_below) });
            } else {
                query.date = { $lte: parseInt(req.query.postal_code_below) };
            }
        }
        if (req.query.postal_code) {
            query.postal_code = parseInt(req.query.postal_code);
        }

        db.count(query, function (err, count) {
            res.status(200).send({ "count": count });
        });
    });


    app.get(BASE_API_URL + "/professionalorganisations-stats", (req, res) => {

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

        if (req.query.professional_org) {
            query.professional_org = req.query.professional_org;
        }
        if (req.query.location) {
            query.location = req.query.location;
        }
        if (req.query.phone_number) {
            query.phone_number = req.query.phone_number;
        }
        if (req.query.adress) {
            query.adress = req.query.adress;
        }

        //numerics search

        //registry_number
        if (req.query.registry_number_over) {
            query.registry_number = { $gte: parseInt(req.query.registry_number_over) };
        }
        if (req.query.registry_number_below) {
            if (query.registry_number != undefined) {
                Object.assign(query.registry_number, { $lte: parseInt(req.query.registry_number_below) });
            } else {
                query.registry_number = { $lte: parseInt(req.query.registry_number_below) };
            }
        }
        if (req.query.registry_number) {
            query.registry_number = parseInt(req.query.registry_number);
        }

        //date
        if (req.query.date_over) {
            query.date = { $gte: parseInt(req.query.date_over) };
        }
        if (req.query.date_below) {
            if (query.date != undefined) {
                Object.assign(query.date, { $lte: parseInt(req.query.date_below) });
            } else {
                query.date = { $lte: parseInt(req.query.date_below) };
            }
        }
        if (req.query.date) {
            query.date = parseInt(req.query.date);
        }

        //postal_code
        if (req.query.postal_code_over) {
            query.postal_code = { $gte: parseInt(req.query.postal_code_over) };
        }
        if (req.query.postal_code_below) {
            if (query.postal_code != undefined) {
                Object.assign(query.postal_code, { $lte: parseInt(req.query.postal_code_below) });
            } else {
                query.date = { $lte: parseInt(req.query.postal_code_below) };
            }
        }
        if (req.query.postal_code) {
            query.postal_code = parseInt(req.query.postal_code);
        }

        db.find(query).sort({ registry_number: req.body.registry_number }).skip(offset).limit(limit).exec(function (err, docs) {
            res.send(remove_internal_id(docs));
        });

    });


    /** POST ALL */
    app.post(BASE_API_URL + "/professionalorganisations-stats", (req, res) => {
        let newProfessionalOrganisation = req.body;
        if (validate_professionalorganisations(newProfessionalOrganisation)) {
            //check if resource previusly exists.
            db.findOne({ registry_number: req.body.registry_number }, function (err, exisistingProfessionalOrganisation) {
                if (exisistingProfessionalOrganisation != undefined) {
                    res.sendStatus(409);
                    return;
                };

                db.insert(newProfessionalOrganisation, function (err, newDoc) {
                    res.sendStatus(201);
                });
            })
        } else {
            res.sendStatus(400);
        };
    });

    /** function to validate that the post method is correctly done */

    function validate_professionalorganisations(professionalorganisation) {

        //Object length is 7
        if (Object.keys(professionalorganisation).length != 7) {
            return false;
        }

        //date is a number
        if (!Number.isInteger(Number(professionalorganisation.date)) || professionalorganisation.date.length == 0) {
            return false;
        } else {
            professionalorganisation.date = Number(professionalorganisation.date)
        }

        //registry_number is a number
        if (!Number.isInteger(Number(professionalorganisation.registry_number)) || professionalorganisation.registry_number.length == 0) {
            return false;
        } else {
            professionalorganisation.registry_number = Number(professionalorganisation.registry_number)
        }

        //rofessional_org is a string
        if (typeof professionalorganisation.professional_org != "string" || professionalorganisation.professional_org.trim().length == 0) {
            return false;
        }

        //location is a string
        if (typeof professionalorganisation.location != "string" || professionalorganisation.location.trim().length == 0) {
            return false;
        }

        //phone_number is a string
        if (typeof professionalorganisation.phone_number != "string" || professionalorganisation.phone_number.trim().length == 0) {
            return false;
        }

        //postal_code is a number
        if (!Number.isInteger(Number(professionalorganisation.postal_code)) || professionalorganisation.postal_code.length == 0) {
            return false;
        } else {
            professionalorganisation.postal_code = Number(professionalorganisation.postal_code)
        }

        //adress is a string
        if (typeof professionalorganisation.adress != "string" || professionalorganisation.adress.trim().length == 0) {
            return false;
        }
        return true;

    }

    /** DELETE ALL */
    app.delete(BASE_API_URL + "/professionalorganisations-stats", (req, res) => {
        db.remove({}, { multi: true }, function (err, numRemoved) {
            res.sendStatus(200);
        });
    });

    /** PUT ALL */
    app.put(BASE_API_URL + "/professionalorganisations-stats", (req, res) => {
        res.sendStatus(405);
    });


    /** GET by ID (Registry number) */
    app.get(BASE_API_URL + "/professionalorganisations-stats/:registry_number", function (req, res) {
        db.findOne({ registry_number: parseInt(req.params.registry_number) }, function (err, professionalorganisation) {
            if (professionalorganisation == undefined) {
                res.sendStatus(404);
            } else {
                res.status(200).send(remove_internal_id(professionalorganisation));
            }
        });
    });

    //** PUT by ID */
    app.put(BASE_API_URL + "/professionalorganisations-stats/:registry_number", (req, res) => {
        //check if exist
        db.findOne({ registry_number: parseInt(req.params.registry_number) }, function (err, professionalorganisation) {
            if (professionalorganisation == undefined) {
                res.sendStatus(404);
                return;
            }
            //check if registy_number is the same in object and url 
            if (req.params.registry_number != req.body.registry_number) {
                res.sendStatus(400);
                return;
            }
            //validate modify professionalOrganisation object with req params
            if (!validate_professionalorganisations(req.body)) {
                res.sendStatus(400);
                return;
            }


            db.update({ registry_number: parseInt(req.params.registry_number) }, { $set: req.body }, function (err, numReplaced) {
                res.sendStatus(200);
            });
        });

    });


    /** DELETE by ID */
    app.delete(BASE_API_URL + "/professionalorganisations-stats/:registry_number", (req, res) => {

        //check if exist
        db.findOne({ registry_number: parseInt(req.params.registry_number) }, function (err, professionalorganisation) {
            if (professionalorganisation == undefined) {
                res.sendStatus(404);
            } else {
                db.remove({ registry_number: parseInt(req.params.registry_number) }, { multi: true }, function (err, numRemoved) {
                    res.sendStatus(200);
                });
            }
        });
    });

    /** POST by ID */
    app.post(BASE_API_URL + "/professionalorganisations-stats/:registry_number", (req, res) => {
        res.sendStatus(405);
    });


    /** Auxiliary function to remove _id from the object or array*/
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

export { loadBackend_professionalorganisations_v2 };

