var map;
require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/InfoTemplate",
    "dojo/domReady!"
], function(Map, GraphicsLayer, Point, PictureMarkerSymbol, Graphic, InfoTemplate) {
    map = new Map("mapDiv", {
        basemap: "topo",
        center: [16.881586, 60.292587],
        zoom: 10
    });


    //Visning av information om aktuell POI: 
    //Färnebofjärden, Gysinge och Hedesundafjärden
    var wayPoint = new GraphicsLayer();
    var gpxPoints = [
        //Färnebofjärden
        { lat: 60.219227, lon: 16.847813,  name: "Brattnäset",      type: "Grillplats",        description: "Här kan man ta en fikapaus och grilla.",                                                                                                                                                                          imageUrl: "Brattnäset.png"},
        { lat: 60.238677, lon: 16.814736,  name: "Bårbyhällan",     type: "Grillplats",        description: "Här kan man ta en fikapaus och grilla.",                                                                                                                                                                          imageUrl: "Bårbyhällan.png"},
        { lat: 60.177689, lon: 16.801658,  name: "Båtsportklubben", type: "Grillplats",        description: "Vid platsen är det stenbotten, 5 m till avlastningsplats och 100 m till parkering.",                                                                                                                              imageUrl: "Båtsportsklubben.png"},
        { lat: 60.14346,  lon: 16.47136,   name: "Dragsheden väst", type: "rastplats",         description: "Vid platsen är det grusbotten och 50 m till avlastningsplats. Observera att vid lågt vattenstånd kan passagen under vägen vara torrlagd.",                                                                        imageUrl: "Dragsheden.png"},
        { lat: 60.14204,  lon: 16.47466,   name: "Dragsheden öst",  type: "rastplats",         description: "Det är stenbotten på platsen. Iläggning kan göras ca 50 m norr om vägtrumman. Observera att vid lågt vattenstånd kan passagen under vägen vara torrlagd och att det är dåligt med parkeringsplatser på platsen.", imageUrl: "Dragsheden öst.png"},
        { lat: 60.197745, lon: 16.748013,  name: "Göknäset",        type: "rastplats",         description: "På platsen är det grusbotten blandat med större stenar.",                                                                                                                                                         imageUrl: "Göknäset.png"},
        { lat: 60.209724, lon: 16.788901,  name: "Sandön",          type: "Grillplats",        description: "Rastplats med eldstad och sittbänkar.",                                                                                                                                                                           imageUrl: "Sandön.png"},
        { lat: 60.212219, lon: 16.849755,  name: "Skekarsbo",       type: "Vindskydd",         description: "Rastplats med vindskydd och eldstad på vägen upp mot utkikstornet.",                                                                                                                                              imageUrl: "Skekarsbo.png"},
        { lat: 60.13012,  lon: 16.47824,   name: "Strångnäs",       type: "Vindskydd",         description: "Rastplats med tillgänglighetsanpassat vindskydd och eldstad. Ligger ca 30 m från parkering.",                                                                                                                     imageUrl: "Strångnäs.png"},
        { lat: 60.10404,  lon: 16.47415,   name: "Östa Camping",    type: "rastplats",         description: "Vid platsen är det stenbotten, 100 m till avlastningsplats och 200 m till parkering.",                                                                                                                            imageUrl: "Östa camping"},
        { lat: 60.173351, lon: 16.791122,  name: "Östa norr",       type: "Vindskydd",         description: "Vid platsen är det stenbotten och 300 m till avlastningsplats och parkering.",                                                                                                                                    imageUrl: "Östa norr.png"},
        { lat: 60.176483, lon: 16.785071,  name: "Östa väst",       type: "rastplats",         description: "Vid platsen är det stenbotten.",                                                                                                                                                                                  imageUrl: "Östa väst.png"},
        
        //Gysinge
        { lat: 60.286982,  lon: 16.880171,  name: "Café Udden",     type: "Café",              description: "Café vackert belägen vid Dalälven som serverar lunch med fin utsikt. ",                                                                                                                                           imageUrl: "Café udden.png"},
        { lat: 60.281196,  lon: 16.805992,  name: "Edsviken",       type: "Badplats",          description: "Platsen sköts av kultur- och fritidsförvaltningen.",                                                                                                                                                              imageUrl: "Edsviken.png"},
        { lat: 60.287094,  lon: 16.885128,  name: "Gysinge",        type: "Naturreservat",     description: "Många besöker Gysingeområdet för att vandra, fiska eller paddla.",                                                                                                                                                imageUrl: "Gysinge.png"},
        { lat: 60.261745,  lon: 16.836784,  name: "Gärdsvekarna",   type: "rastplats",         description: "Landstigning ca 150 m söder om stugan. Det är grusbotten på platsen.",                                                                                                                                            imageUrl: "Gärdsvekarna"},
        { lat: 60.253702,  lon: 16.794437,  name: "Ista",           type: "Naturreservat",     description: "Här kan du grilla vid den iordningställda eldplatsen",                                                                                                                                                            imageUrl: "Ista.png"},
        { lat: 60.26224,   lon: 16.808814,  name: "Karlholmen",     type: "rastplats",         description: "",                                                                                                                                                                                                                imageUrl: ""},

        //Hedesundafjärden
        { lat: 60.19891,  lon: 17.1291,    name: "Festplatsen",    type: "rastplats",          description: "",                                                                                                                                                                                                                imageUrl: ""},
        { lat: 60.20745,  lon: 17.3406,    name: "Gnupe",          type: "Grillplats",         description: "Rastplats med stenbotten och synnerligen svår angöring. Det är 10 m till lastningsplats och parkering.",                                                                                                          imageUrl: "Gnupe.png"},
        { lat: 60.298647, lon: 17.03722,   name: "Hade",           type: "Badplats",           description: "Rast och iläggningsplats med grusbotten. Det är 20 m till lastningsplats och 50 m till parkering.",                                                                                                               imageUrl: "Hade.png"},
        { lat: 60.319739, lon: 17.032853,  name: "Korsnäset",      type: "rastplats",          description: "Rast- och iläggningsplats med sandbotten och 30 m till lastningsplats och parkering.",                                                                                                                            imageUrl: "Korsnäset.png"},
        { lat: 60.22312,  lon: 17.2812,    name: "Kvillanudden",   type: "Vandring",           description: "Här kan du vandra",                                                                                                                                                                                               imageUrl: "Kvillanudden.png"},
        { lat: 60.371665, lon: 17.027328,  name: "Norra sundet",   type: "Badplats",           description: "Här kan du bada med brygga och ta en paus i vardagen.",                                                                                                                                                           imageUrl: "Norra sundet.png"},
        { lat: 60.350155, lon: 17.020365,  name: "Sandsnäsbadet",  type: "Badplats",           description: "Rast- och iläggningsplats med sandbotten och 50 m till lastningsplats och parkering.",                                                                                                                            imageUrl: "Sandsnäsbadet.png"},
        { lat: 60.1872,   lon: 17.2239,    name: "Södra sundet",   type: "rastplats",          description: "Rast och iläggningsplats med grusbotten. Det är 10 m till lastningsplats och 50 m till parkering.",                                                                                                               imageUrl: "Södra sundet.png"},
        { lat: 60.366079, lon: 17.032521,  name: "Åshuvudet",      type: "rastplats",          description: "Det är sandbotten vid platsen.",                                                                                                                                                                                  imageUrl: "Åshuvudet.png"},
        { lat: 60.22987,  lon: 17.5701,    name: "Östveda",        type: "Badplats",           description: "Rastplats vid Gästrikeleden och för paddlare. Vid platsen är det sandbotten, 10 m till lastningsplats och 100 m till parkering",                                                                                  imageUrl: "Östveda.png"},

    ];

    for (var i = 0; i < gpxPoints.length; i++) {
        var point = new Point(gpxPoints[i].lon, gpxPoints[i].lat);
        
        // Anropa getMarkerSymbol-funktionen för att få rätt symbol baserat på platsens typ
        var symbol = getMarkerSymbol(gpxPoints[i].type);
        
        var graphic = new Graphic(point, symbol);
    
        var info = new InfoTemplate(gpxPoints[i].name, 
            "<div style='width: 700px;'>" +
            "<div style='float: left; margin-right: 10px;'><img src='" + gpxPoints[i].imageUrl + "' width='100'></div>" +
            "<div><strong>Typ av plats:</strong> " + gpxPoints[i].type + "</div>" +
            "<div><strong>Beskrivning:</strong> " + gpxPoints[i].description + "</div>" +
            "</div>");
        
        graphic.setInfoTemplate(info);
        wayPoint.add(graphic);
    }
    
    // Symbolgeneratorfunktionen som returnerar rätt symbol baserat på platsens typ
    function getMarkerSymbol(type) {
        switch (type) {
            case "Grillplats":
                return new PictureMarkerSymbol("Grillplats.png", 25, 25);
            case "rastplats":
                return new PictureMarkerSymbol("rastplats.png", 25, 25);
            case "Café":
                return new PictureMarkerSymbol("Café.png", 25, 25);
            case "Badplats":
                return new PictureMarkerSymbol("badplats.png", 25, 25);
            case "Naturreservat":
                return new PictureMarkerSymbol("Naturreservat.png", 25, 25);
            case "Vindskydd":
                return new PictureMarkerSymbol("vindskydd.png", 25, 25);
            case "Vandring":
                return new PictureMarkerSymbol("Vandring.png", 25, 25);
            default:
                return new PictureMarkerSymbol("pin.png", 25, 25); // Standardbild om typen inte matchar
        }
    }    
    map.addLayer(wayPoint);

    map.on("mouse-over", function(evt) {
        if (evt.graphic) {
            map.infoWindow.setContent(evt.graphic.getContent());
            map.infoWindow.setTitle(evt.graphic.getTitle());
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        }
    });

    map.on("mouse-out", function(evt) {
        map.infoWindow.hide();
    });

    /*function searchTrails(query) {
        for (var i = 0; i < gpxPoints.length; i++) {
            var point = new Point(gpxPoints[i].lon, gpxPoints[i].lat);
            var symbol = getMarkerSymbol(gpxPoints[i].type);
    
            if (gpxPoints[i].name.toLowerCase().includes(query.toLowerCase()) || gpxPoints[i].type.toLowerCase() === query.toLowerCase()) {
                var graphic = new Graphic(point, symbol);
                var info = new InfoTemplate(gpxPoints[i].name, "<div><strong>Typ av plats:</strong> " + gpxPoints[i].type + "</div>");
                graphic.setInfoTemplate(info);
                wayPoint.add(graphic);
            }
        }
    }*/

    function searchTrails(query) {
        wayPoint.clear();
    
        for (var i = 0; i < gpxPoints.length; i++) {
            var point = new Point(gpxPoints[i].lon, gpxPoints[i].lat);
            var symbol = getMarkerSymbol(gpxPoints[i].type);
    
            if (gpxPoints[i].name.toLowerCase().includes(query.toLowerCase()) || gpxPoints[i].type.toLowerCase() === query.toLowerCase()) {
                var graphic = new Graphic(point, symbol);
    
                var infoTemplateContent = "<div><strong>Namn:</strong> " + gpxPoints[i].name + "<br>" +
                                          "<strong>Typ av plats:</strong> " + gpxPoints[i].type + "<br>" +
                                          "<strong>Beskrivning:</strong> " + gpxPoints[i].description + "</div>";
    
                if (gpxPoints[i].imageUrl) {
                    infoTemplateContent += "<img src='" + gpxPoints[i].imageUrl + "' width='100'>";
                }
    
                var infoTemplate = new InfoTemplate(gpxPoints[i].name, infoTemplateContent);
                graphic.setInfoTemplate(infoTemplate);
    
                wayPoint.add(graphic); 
            }
        }
    }
    

    function initToolPanel() {
        var searchInput = document.getElementById('searchInput');
        var searchButton = document.getElementById('searchButton');
    
        searchButton.addEventListener('click', function() {
            var query = searchInput.value.trim().toLowerCase();
            searchTrails(query);
        });
    
        searchInput.addEventListener('input', function() {
            var query = searchInput.value.trim().toLowerCase();
            searchTrails(query);
        });
    
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                var query = searchInput.value.trim().toLowerCase();
                searchTrails(query);
            }
        });
    }
    
    window.addEventListener('load', function() {
        initToolPanel();
    });

    /*function addTemporaryPlace() {
        // Lyssna på klickhändelser på kartan
        map.on("click", function(evt) {
            // Hämta koordinaterna för klicket
            var lon = evt.mapPoint.getLongitude();
            var lat = evt.mapPoint.getLatitude();
            
            // Be användaren fylla i information om platsen, t.ex. genom ett prompt-fönster eller ett formulär i HTML
            
            var name = prompt("Ange namn på platsen:");
            var type = prompt("Ange typ av plats:");
            var description = prompt("Ange beskrivning av platsen:");
            
            // Skapa en punktgrafik för den temporära platsen
            var point = new Point(lon, lat);
            var symbol = new PictureMarkerSymbol("temporary.png", 25, 25);
            var graphic = new Graphic(point, symbol);
            
            // Skapa en informationsmall för platsen
            var infoTemplate = new InfoTemplate(name, "<div><strong>Typ:</strong> " + type + "<br><strong>Beskrivning:</strong> " + description + "</div>");
            graphic.setInfoTemplate(infoTemplate);
            
            // Lägg till den temporära platsen på kartan
            map.graphics.add(graphic);
        });
    }*/

    /*var temporaryPlaces = [];
    
    function initAddPlaceMode() {
        map.on('click', function(event) {
            var point = event.mapPoint;
            var symbol = new PictureMarkerSymbol("pin.png", 25, 25);
            var graphic = new Graphic(point, symbol);
            map.graphics.add(graphic);

            temporaryPlaces.push(point);

        });
    }*/

   /* function endAddPlaceMode() {
        // Ta bort klickhändelsen från kartan
        map.on("click", null);
    }
    
    // Händelselyssnare för knappen som aktiverar lägg till plats-läget
    document.getElementById("addPlaceButton").addEventListener("click", function() {
        initAddPlaceMode();
    });
    
    // Händelselyssnare för att avbryta lägg till plats-läget
    document.getElementById("cancelAddPlaceButton").addEventListener("click", function() {
        endAddPlaceMode();
    });*/


    var temporaryPlaceLayer = new GraphicsLayer();
    map.addLayer(temporaryPlaceLayer);

    var temporaryPlaces = [];

    function addTemporaryPlace(coordinates, description, type) {
        var point = new Point(coordinates[0], coordinates[1]);
        var symbol = new PictureMarkerSymbol('pin.png', 25, 25);
        var graphic = new Graphic(point, symbol);


        var infoTemplateContent = "<div><strong>Beskrivning:</strong> " + description + "<br>" +
                           "<strong>Typ av plats:</strong>" + type + "</div>";

        var infoTemplate = new infoTemplate("Ny plats: " + infoTemplateContent);
        graphic.setInfoTemplate(infoTemplate);

        temporaryPlaceLayer.add(graphic);
        temporaryPlaces.push({point: point, description: description, type: type});
    }

    //Ta bort plats
    function removeTemporaryPlaces() {
        temporaryPlaceLayer.clear();
        temporaryPlaces = [];
    }

    map.on('click', function(event) {
        var coordinates = [event.mapPoint.getLongitud(), event.mapPoint.getLatitud()];

        var description = prompt("Ange en beskrivning av platsen: ");
        var type = prompt("Ange typ av plats: ");

        addTemporaryPlace(coordinates, description, type);
    });

    document.getElementById("removePlaceButton").addEventListener('click', function() {
        removeTemporaryPlaces();
    });
        
});
