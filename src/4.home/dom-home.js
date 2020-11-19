import view from "./home.html";
import "./estilos-home.css";
import "../firebase-functions/firebaseConfig";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;
  
  const templateModal = divElement.querySelector("#modal");
  const clon = templateModal.content.cloneNode(true)
  divElement.appendChild(clon)
  
  const modal = divElement.querySelector('.modal-prueba');
  const span = divElement.querySelector('.close');
  modal.style.display = "block";


  span.onclick = function() {
    modal.style.display = "none";
    buttonLocation.style.display = 'block';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      buttonLocation.style.display = 'block';
    }
  }


  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAT78gncEo1UtEQc9MbWmvRyWlHT_Wp4EY&callback=initMap';

  script.defer = true;

  window.initMap = function() {
    let coord = {lat:4.7110 ,lng: -74.0721};
    let map = new google.maps.Map(document.getElementById('map'),{
      zoom: 20,
      center: coord,
    });

  let places = [
    {
      id: 0,
      type: "safePlace",
      location: {
        lat: 4.7102, 
        lng: -74.0574
      },
      details: {
        title: "Casa de Pau",
        description: "Este es un lugar ",
        icon: {
          url:'https://image.flaticon.com/icons/svg/1161/1161388.svg',
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        } 
      }
    },
    {
      id: 1,
      type: "safePlace",
      location: {
        lat: 4.711, 
        lng: -74.0723,
      },
      details: {
        title: "Consecionario",
        description: "Este es un lugar ",
        icon: {
          url:'https://image.flaticon.com/icons/svg/2660/2660211.svg',
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        } 
      }
    },
    {
      id: 2,
      type: "safePlace",
      location: {
        lat:4.6383, 
        lng:-74.0885  
      },
      details: {
        title: "",
        description: "Este es un lugar ",
        icon:{
          url:'https://image.flaticon.com/icons/svg/564/564619.svg',
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        } 
      }
    },
    {
      id: 3,
      type: "dangerPlace",
      location: {
        lat:4.7096, 
        lng:-74.0619
      },
      details: {
        title: "Oracle",
        description: "Este es un lugar malvado ",
        icon: {
          url:'https://image.flaticon.com/icons/svg/3231/3231588.svg',
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        } 
      }
    },
    {
      id: 4,
      type: "dangerPlace",
      location: {
        lat: 4.7115, 
        lng: -74.0706 
      },
      details: {
        title: "Bulevar Niza",
        description: "Este es un lugar malvado ",
        icon: {
          url:/* " ../images/alert.png", */'https://image.flaticon.com/icons/svg/3231/3231588.svg',
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        }
      }
    }  
  ]


      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(map);
    
      const calcularRuta = document.querySelector('.calc');
      calcularRuta.addEventListener('click',calcRoute)
    
    function calcRoute() {
      modal.style.display = "none";
      var start = places[3].location;
      var end = places[4].location;
      var request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
      };
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
        }
    }); 

  }
  

   // Add marker
  let marker = new google.maps.Marker({
    position:{lat: 4.71071, lng: -74.067756},
    map:map,
    icon:places[2].details.icon
  });

let contentString = 
`<div class="container-alerts">
<h2 class="title">Zona Insegura</h2>
<div class="container-safe">
<div class="user-info">
<img src="https://image.flaticon.com/icons/svg/149/149070.svg" alt="user" class="user-photo" />
<h3 class="user-name">Ana</h3>
</div>
<p class="description">Esta calle es poco iluminada y me he sentido insegura</p>
</div>
<div class="container-safe">
<div class="user-info">
  <img src="https://image.flaticon.com/icons/svg/149/149070.svg" alt="user" class="user-photo" />
  <h3 class="user-name">Tatiana</h3>
</div>
  <p class="description">Un día estaba caminando con mis amigas y nos robaron</p>
</div>
</div>`

let infowindow = new google.maps.InfoWindow({
content: contentString
});

console.log(infowindow)
marker.addListener('click', function() {
infowindow.open(map, marker);
});

let markeS = new google.maps.Marker({
position:{
  lat: 4.7097, 
  lng: -74.065585
},
map:map,
icon: places[1].details.icon
});

let contentStringS = 
`<div class="container-alerts">
<h2 class="title-friend">Mujer Segura</h2>
<div class="container-safe">
<div class="user-info-friend">
<img src="https://image.flaticon.com/icons/svg/149/149070.svg" alt="user" class="user-photo" />
<h3 class="user-name">Alejandra</h3>
</div>
<p class="description">Está a 50 mts de ti, si te sientes en peligro </p>
</div>
<button class="btn-help">Pedir ayuda</button>
</div>`

let infowindowS = new google.maps.InfoWindow({
content: contentStringS
});

markeS.addListener('click', function() {
infowindowS.open(map, markeS);
});

let markeT = new google.maps.Marker({
position:{
  lat:4.7096, 
  lng:-74.0619
},
map:map,
icon:places[0].details.icon
});

let contentStringT = 
`<div class="container-alerts">
<h2 class="titleT">Zona Segura</h2>
<div class="container-safe">
<div class="user-infoT">
<h3 class="user-name">Drogueria Niza</h3>
<b>Calle 127 #56-20</b>
</div>
<p class="description">En este lugar puedes sentirte segura y buscar ayuda si lo necesitas.</p>
</div>`

let infowindowT = new google.maps.InfoWindow({
content: contentStringT
});

markeT.addListener('click', function() {
infowindowT.open(map, markeT);
});

let markerP = new google.maps.Marker({
  position:{lat: 4.814649, lng: -74.078386},
  map:map,
  icon:places[3].details.icon
});

let markerS= new google.maps.Marker({
  position:{lat: 4.7078924, lng: -74.0736305},
  map:map,
  icon:places[2].details.icon
});

let markerD = new google.maps.Marker({
  position:{lat: 4.7109262, lng: -74.0658375},
  map:map,
  icon:places[4].details.icon
});

let markerA = new google.maps.Marker({
  position:{lat: 4.513134, lng: -74.0695315},
  map:map,
  icon:places[2].details.icon
});

let markerB = new google.maps.Marker({
  position:{lat: 4.6055097, lng: -74.062922},
  map:map,
  icon:places[1].details.icon
});

let markerC= new google.maps.Marker({
  position:{lat: 4.7039272, lng: -74.075883},
  map:map,
  icon:places[0].details.icon
});
let markerE = new google.maps.Marker({
  position:{lat: 4.655097, lng: -74.062922},
  map:map,
  icon:places[1].details.icon
});

let markerf = new google.maps.Marker({
  position:{lat: 4.711748, lng: -74.068666},
  map:map,
  icon:places[0].details.icon
});
let markerG = new google.maps.Marker({
  position:{lat: 4.511748, lng: -74.0058666},
  map:map,
  icon:places[0].details.icon
});
}

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
  
  return divElement;
};
