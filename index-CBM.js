

// Data inicialization
let data =
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
function date_mean_by_location(location,data){

    //filter by location
    let filteredData = data.filter(x => x.location == location);

    //mean calculation
    let total=0;
    filteredData.forEach(x => total = x.date+total)
    let media=total/filteredData.length;

    return media;
}



console.log(date_mean_by_location("CÁDIZ",data))