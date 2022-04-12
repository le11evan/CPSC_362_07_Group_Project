import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

export function showmap(db,lat, long){
    var ID = [];

        var map=L.map('map').setView([lat,long],15);

        var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'images/Flushy-Marker-Shadow.png',
            iconSize:     [48, 50],
            shadowSize:   [47, 50],
            iconAnchor:   [22, 40],
            shadowAnchor: [22, 40],
            popupAnchor:  [0, -40]
        }
        });

        var flushyIcon = new LeafIcon({iconUrl: 'images/Flushy-Marker.png'});

        L.icon = function (options) {
        return new L.Icon(options);
        };

        var marker = L.marker([lat, long], {icon: flushyIcon}).addTo(map)
        .bindPopup('You Are Here. <nav id="nav"><ul><a href="#about" id="about-link">Create a review here.</span></a></ul></nav>')
        .openPopup();; // current position
            
        //add maker for all nearbybathroom
        var nearbathroom = nearby(lat,long, map);
            
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=73G3DfyKZkKf9Tzah1qH', 
        {attributes:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',}).addTo(map);

        
        window.googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
        });
        window.googleStreets.addTo(map);

        window.googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
        });
        //window.googleSat.addTo(map); if you want use googleSat
    }

    async function nearby(lat, long, map){
        const q = query(collection(db, "location"), where("latitude", ">=", lat-0.02),where("latitude", "<=", lat+0.02));
        const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {

            let lat1 = doc.data().latitude;
            let long1 = doc.data().longitude;
            if(long1 >= (long-0.02) && long1 <= (long+0.02)){
                var marker = L.marker([lat1, long1]).addTo(map);   // nearby marker
                ID.push(doc.id);
                //console.log(lat1); 
                //console.log(long1);
                //console.log(doc.id, " => ", doc.data());	
        }
        
        });



    return ID;
}
