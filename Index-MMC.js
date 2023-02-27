let datos =[  
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

function solution(province, datos) {
    let filtro = datos.filter(x => x.province == province);
    total = 0;
    filtro.forEach(x => {
        total += x.Id;
    });

    return total / filtro.length;
}

console.log(solution("Cádiz", datos))