import { BUTTON_ID } from './app';
import {
  getBahnplanLayer,
  getHazardFeatureLayer,
  getInvisibleBetriebspunktLayer,
  getLuftbilderBasemap,
} from './layers';

const SBB_PROD_DOMAIN = 'geo.sbb.ch';

export function initArcGis(dojoRequire) {
  dojoRequire([
    'esri/config',
    'esri/Basemap',
    'esri/Map',
    'esri/geometry/Point',
    'esri/layers/WMTSLayer',
    'esri/views/MapView',
    'esri/layers/MapImageLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/widgets/Sketch',
    'esri/widgets/Editor',
    'esri/widgets/Search',
  ], function (esriConfig, Basemap, Map, Point, WMTSLayer, MapView, MapImageLayer, FeatureLayer, GraphicsLayer, Sketch, Editor, Search) {
    configureHttpInterceptors(esriConfig);

    const luftbilderBasemap = getLuftbilderBasemap(WMTSLayer, Basemap);
    const bahnplanLayer = getBahnplanLayer(MapImageLayer);

    const map = new Map({
      basemap: luftbilderBasemap,
      layers: [bahnplanLayer],
    });

    const hazardLayer = getHazardFeatureLayer(FeatureLayer);
    map.add(hazardLayer, 1);

    const betriebsPunktLayer = getInvisibleBetriebspunktLayer(FeatureLayer);
    map.add(betriebsPunktLayer, 0);

    const centerPoint = new Point({
      x: 2681085,
      y: 1248846,
      spatialReference: {
        wkid: 2056,
      },
    });
    const view = new MapView({
      container: 'viewDiv',
      map,
      spatialReference: {
        wkid: 2056,
      },
      center: centerPoint,
      scale: 10000,
    });

    view.when(() => {
      const editor = new Editor({
        layerInfos: [hazardLayer],
        view,
      });

      view.ui.add(editor, 'top-right');

      const searchWidget = new Search({
        view,
        sources: [{
          layer: betriebsPunktLayer,
          searchFields: ['NAME', 'BEZEICHNUNG'],
          displayField: 'BEZEICHNUNG',
          exactMatch: true,
          outFields: ['*'],
          name: 'Betriebspunkt',
          placeholder: 'Beispiel: Altstetten',
          maxResults: 10,
          maxSuggestions: 20,
          suggestionsEnabled: true,
          minSuggestCharacters: 2,
        }],
        includeDefaultSources: false,
      });

      view.ui.add(searchWidget, {
        position: 'bottom-left',
        index: 2,
      });

      const button = document.getElementById(BUTTON_ID);
      button.addEventListener('click', () =>
        view.takeScreenshot({
          format: 'jpg',
          quality: 80,
        }).then(handleDownload),
      );
    });
  });
}

function configureHttpInterceptors(esriConfig) {
  esriConfig.request.trustedServers.push(SBB_PROD_DOMAIN);
  esriConfig.request.interceptors.push({
    before: params => {
      if (params.url.includes(SBB_PROD_DOMAIN)) {
        params.requestOptions.withCredentials = true;
      }
    },
  });
}

function handleDownload(screenshot) {
  const link = document.createElement('a');
  link.download = 'screenshot.jpg';
  link.href = screenshot.dataUrl;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
