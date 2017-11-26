module.exports = id => {
  var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }),
    latlng = L.latLng(24.799556, 120.978998)

  var map = L.map(id, {center: latlng, zoom: 13, layers: [tiles]})

  var markers = L.markerClusterGroup()

  for (var i = 0; i < addressPoints.length; i++) {
    var a = addressPoints[i]
    var title = a[2]
    var content = a[3]
    console.log('0:' + a[0] + ' 1:' + a[1] + ' 2:' + a[2])
    var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title })
    marker.bindPopup('<b>' + title + '</b>' + '<br>' + content)
    markers.addLayer(marker)
  }

  map.addLayer(markers)
}
