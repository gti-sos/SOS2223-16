module.exports = function(app){

    const INITIAL_DATA=[
    
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
    
    
    let civilWarAndalusian_stats=[];
    
    app.get("/api/v1/civilWarAndalusian-stats/loadInitialData", (req,res) => { 
        if(civilWarAndalusian_stats.length==0){
            civilWarAndalusian_stats=INITIAL_DATA;
            res.sendStatus(201);
        }else{
            res.status(400).send("Data is not empty")
        }
        
    });
    
    
    
    app.get("/api/v1/civilWarAndalusian-stats", (req,res) => { 
        res.send(civilWarAndalusian_stats); 
    });
    
    
    app.post("/api/v1/civilWarAndalusian-stats", (req,res) => { 
        console.log(req.body);
        let newcivilWarAndalusian=req.body;
    
        if(validate_civilWarAndalusian(newcivilWarAndalusian)){
            civilWarAndalusian_stats.push(newcivilWarAndalusian);
            res.sendStatus(201);
    
        }else{
            res.status(400).send("civilWarAndalusian is wrong")
        }
    
    
    
    });
    
    
        /** function to validate that the post method is correctly done */
    
    function validate_civilWarAndalusian(civilWarAndalusian){
    
    
        //Object length is 8
        if(Object.keys(civilWarAndalusian).length!=9){
            return false;
        }
    
        //id is a number
        if(typeof civilWarAndalusian.Id != "number"){
            return false;
        }
    
        //title is a string
        if(typeof civilWarAndalusian.title != "string"){
            return false;
        }
    
        //character is a string
        if(typeof civilWarAndalusian.character != "string"){
            return false;
        }
    
        //province is a string
        if(typeof civilWarAndalusian.province != "string"){
            return false;
        }
    
        //municipality is a string
        if(typeof civilWarAndalusian.municipality != "string"){
            return false;
        }
    
        //dateNumeric is a number
        if(typeof civilWarAndalusian.dateNumeric != "number"){
            return false;
        }
    
        //Photo_PieFosa is a string
       if(typeof civilWarAndalusian.Photo_PieFosa != "string"){
            return false;
    
        }
        //victims is a number
        if(typeof civilWarAndalusian.victims != "number"){
            return false;
    
        }
        //dates_act is a number
        if(typeof civilWarAndalusian.dates_act != "number"){
            return false;
    
        }
        return true;
    
    }
    
    app.delete("/api/v1/civilWarAndalusian-stats", (req,res) => { 
        civilWarAndalusian_stats = [];
        res.sendStatus(200);
    });
    
    }
    