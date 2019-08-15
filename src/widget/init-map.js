export function initArcGis(dojoRequire) {
  dojoRequire([
    "esri/Map",
    "esri/views/MapView"
  ], function(Map, MapView) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [8.492802, 47.390904], // longitude, latitude
      zoom: 16
    });
  });
}
