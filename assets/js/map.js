class Map {
    constructor(mapContainer) {
        this.jcDecauxApiUrl = 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=df9fc65114cc5552acd0c736edc5e25448cf4e35';
        this.mapContainer = mapContainer;
        this.map = null;

        this.initialize();
        this.getDataFromApi(this.jcDecauxApiUrl, this.createMarkers);
    };

    initialize() {
        L.mapquest.key = '4KF1orY5arGvZfIlu17Yce7a9E40fONe';

        this.map = L.mapquest.map(this.mapContainer, {
            center: [45.75, 4.85],
            layers: L.mapquest.tileLayer('map'),
            zoom: 12
        });
        this.green;
        this.map.addControl(L.mapquest.control());
    };

    // requete XML HTTP
    getDataFromApi(url, callback) {
        const req = new XMLHttpRequest();
        const mapContainer = this.map;

        req.open("GET", url, true);

        req.addEventListener("load", function() {
            req.status >= 200 && req.status < 400 ? callback(req.responseText, mapContainer) : console.log(req.status + " " + req.statusText + " " + url);
        });

        req.addEventListener("error", function() {
            console.error(`Erreur réseau avec l'URL ${url}`);
        });

        req.send(null);
    };

    /*Callback*/
    createMarkers(data, mapContainer) {
        let parsedStations = JSON.parse(data);
        let markers = L.markerClusterGroup();

        const greenCrossRes = document.getElementById('greenCrossRes');

        greenCrossRes.addEventListener("click", function(event) {
            aside.style.display = "none";
            canvasWindow.style.visibility = "hidden";
        });

        for (let i = 0; i < parsedStations.length; i++) {
            let marker = L.marker([parsedStations[i].position.lat, parsedStations[i].position.lng], {
                icon: L.mapquest.icons.marker(),
                draggable: false
            });

            marker.addEventListener("click", async function(event) {
                aside.style.display = "block";
                canvasWindow.style.visibility = "hidden";

                document.getElementById("address").innerHTML = parsedStations[i].address;
                document.getElementById('available_bike_stands').innerHTML = parsedStations[i].available_bike_stands;
                document.getElementById('available_bikes').innerHTML = parsedStations[i].available_bikes;
                document.getElementById('name').innerHTML = parsedStations[i].name;
                document.getElementById('status').innerHTML = parsedStations[i].status;

                if (parsedStations[i].status === "OPEN") {
                    document.getElementById('status').innerHTML = "Station ouverte";
                    document.getElementById('status').style.color = "#74c214";

                } else if (parsedStations[i].status === "CLOSED") {
                    document.getElementById('status').innerHTML = "Station fermée";
                    document.getElementById('status').style.color = "#ff5733";
                };

                if (parsedStations[i].address === "") {
                    document.getElementById('address').innerHTML = "non définie";
                    document.getElementById("addressRes").innerHTML = "non définie";
                };

                if (localStorage.nom !== undefined && localStorage.prenom !== undefined) {
                    document.getElementById('nom').value = localStorage.nom;
                    document.getElementById('prenom').value = localStorage.prenom;
                };
            });

            markers.addLayer(marker);
            mapContainer.addLayer(markers);
        };
    };
};