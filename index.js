var express = require("express");
var cool = require("cool-ascii-faces");
var app = express();


/** BODY PARSER */
var bodyParser =require("body-parser");
app.use(bodyParser.json())

/**
 * Constants
 */

const PORT = 8080;


/**
 * ROUTES
 */

app.get("/cool", (req,res) => { 
    res.send(cool()); 
    console.log("New request"); 
});

app.get("/samples/CBM", (req,res) => { 
    let result_CBM= CBM_date_mean_by_location("CÁDIZ",data_CBM)
    res.send(`<h1 style="text-align:center;"> The arithmetic mean of the years in which the different professional associations that are in Cádiz were created is ${result_CBM}</h1>`)
});

app.get("/samples/CLC", (req,res) => { 
    let result_CLC= CLC_solution("Cádiz",data_CLC)
    res.send(`<h1 style="text-align:center;"> The arithmetic mean of the maximum temperature in Cádiz is ${result_CLC}</h1>`)
});

app.get("/samples/MMC", (req,res) => { 
    let result_MMC= MMC_solution("Cádiz",data_MMC)
    res.send(`<h1 style="text-align:center;"> The arithmetic mean of the ids in Cádiz is ${result_MMC}</h1>`)
});


/**
 * API ROUTES
 */

require('./APIs/professionalorganisations-stats')(app);
/**
 * Initialization
 */

app.listen(PORT);




/**
 * CBM
 */


let data_CBM =
    [

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

    ]

/**
 * @param {string} location province to filter
 * @param {Array} data   array of professionals Organizations
 * @returns mean of the dates 
 */
function CBM_date_mean_by_location(location,data){

    //filter by location
    let filteredData = data.filter(x => x.location == location);

    //mean calculation
    let total=0;
    filteredData.forEach(x => total = x.date+total)
    let media=total/filteredData.length;

    return media;
}


/**
 * CLC
 */

let data_CLC = [
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

function CLC_solution(location, data) {
    let filtro = data.filter(x => x.location == location);
    total = 0;
    filtro.forEach(x => {
        total += x.maxtemp;
    });

    return total / filtro.length;
}


/**
 * MMC
 */

let data_MMC =[  
    {
        "Id": 135,
        "ttite": "Fosa de Trebujena. Cádiz",
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
        "ttite": "Fosa de Torre Alháquime. Cádiz",
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
        "ttite": "Fosa de Trebujena. Cádiz",
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
        "ttite": "Fosa de Torre Alháquime. Cádiz",
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
        "ttite": "Fosa de Torre Alháquime. Cádiz",
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
        "ttite": "Fosa de Tarifa. Cádiz",
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
        "ttite": "Fosa de La Campana. Sevilla",
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
        "ttite": "Fosa de Villaluenga del Rosario. Cádiz",
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
        "ttite": "Fosa de Ubrique. Cádiz",
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
        "ttite": "Fosa de San Silvestre de Guzmán. Huelva",
        "character": "Cementerio interior",
        "province": "Huelva",
        "municipality": "San Silvestre de Guzmán",
        "dateNumeric": 1936,
        "Photo_PieFosa": "http:\/\/www.juntadeandalucia.es\/presidenciaadministracionlocalymemoriademocratica\/mapadefosas\/images\/provincia_5\/2106601_b.jpg",
        "victims": 8,
        "dates_act": 2005,
     }
    ]
    
    function MMC_solution(province, datos) {
        let filtro = datos.filter(x => x.province == province);
        total = 0;
        filtro.forEach(x => {
            total += x.Id;
        });
    
        return total / filtro.length;
    }