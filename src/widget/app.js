import { loadModules } from 'esri-loader';
import './index.css';
import { trailheadsLabels, trailheadsRenderer } from './styling';

export const arcGisId = 'arcGisFrame';

export function addArcGisFrame(domNode) {
  const element = document.createElement('main');
  element.id = arcGisId;
  domNode.appendChild(element);
  initArcGis();
}

export function initArcGis() {
  loadModules([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/widgets/Sketch',
  ])
    .then(([Map, MapView, FeatureLayer, GraphicsLayer, Sketch]) => {
      console.log(Map);
      const graphicsLayer = new GraphicsLayer();

      const map = new Map({
        basemap: 'topo-vector',
        layers: [graphicsLayer],
      });

      const trailsLayer = new FeatureLayer({
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0',
      });

      map.add(trailsLayer, 0);

      const trailHeads = new FeatureLayer({
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0',
        renderer: trailheadsRenderer,
        labelingInfo: [trailheadsLabels],
      });

      map.add(trailHeads);

      const view = new MapView({
        container: arcGisId,
        map: map,
        center: [-118.80543, 34.02700], // longitude, latitude
        zoom: 13,
      });

      const sketch = new Sketch({
        view: view,
        layer: graphicsLayer,
      });

      view.ui.add(sketch, 'top-right');
    })
    .catch(console.error);
}
