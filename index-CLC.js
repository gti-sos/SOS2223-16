let data = [
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

function solution(location, data) {
    let filtro = data.filter(x => x.location == location);
    total = 0;
    filtro.forEach(x => {
        total += x.maxtemp;
    });

    return total / filtro.length;
}

console.log(solution("Cádiz", data))

