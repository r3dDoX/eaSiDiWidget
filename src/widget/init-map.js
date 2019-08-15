import { trailheadsLabels, trailheadsRenderer } from './styling';

export function initArcGis(dojoRequire) {
  dojoRequire([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
  ], function (Map, MapView, FeatureLayer) {

    const map = new Map({
      basemap: 'topo-vector',
    });

    const trailsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });

    map.add(trailsLayer, 0);

    const trailHeads = new FeatureLayer({
      url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0',
      renderer: trailheadsRenderer,
      labelingInfo: [trailheadsLabels],
    });

    map.add(trailHeads);

    new MapView({
      container: 'viewDiv',
      map: map,
      center: [-118.80543,34.02700], // longitude, latitude
      zoom: 13,
    });
  });
}
