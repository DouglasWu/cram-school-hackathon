var tiles = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}),
  latlng = L.latLng(24.799556, 120.978998);

var map = L.map('map', {center: latlng, zoom: 15, layers: [tiles]});

var markers = L.markerClusterGroup();

for (var i = 0; i < addressPoints.length; i++) {
  var a = addressPoints[i];
  var title = a[2];
  var tel = "<br>"+a[3];
  var subject = "<br>"+a[4];
  if(a[3]==""){
    tel = "";
  }
  if(a[4]=""){
    subject = "";
  }
  var illegal = "";
  if(a[5]==true){
    illegal = "<br>"+"<span style=\"display: inline-block; background-color: #f7d639; font-size: 12px; padding: 4px 6px; border-radius: 3px;\">有違規紀錄</span>";
    if(a[6]=="體育類"){
      illegal = "<br>"+"<span style=\"display: inline-block; background-color: #f7d639; font-size: 12px; padding: 4px 6px; border-radius: 3px;\">水質不合格</span>";
    }
  }
  var link = "<br>"+"<a href={../../School.html?name="+title+"} style=\"display: inline-block; border: 1px solid #333; color: #333; text-decoration: none; border-radius: 3px; padding: 3px 6px;\">瞭解更多</a>";
  var marker = L.marker(L.latLng(a[0], a[1]), { title: title });
  marker.bindPopup("<b>"+title+"</b>"+tel+subject+illegal+link);
  markers.addLayer(marker);
}

map.addLayer(markers);
