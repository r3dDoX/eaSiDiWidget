import { BUTTON_ID } from './app';

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

    esriConfig.request.trustedServers.push(SBB_PROD_DOMAIN);
    esriConfig.request.interceptors.push({
      before: params => {
        if (params.url.includes(SBB_PROD_DOMAIN)) {
          params.requestOptions.withCredentials = true;
        }
      },
    });

    const graphicsLayer = new GraphicsLayer();

    const landeskartenLayer = new WMTSLayer({
      id: 'landeskarten',
      url: 'https://geo.sbb.ch/mapproxy/Landeskarten/wmts',
      activeLayer: {
        id: 'LK_2056',
        imageFormat: 'image/jpg',
        tileMatrixSetId: '2056_27',
      },
    });

    const landeskartenBasemap = new Basemap({
      baseLayers: [landeskartenLayer],
      title: 'Landeskarte',
      id: 'wmtsBasemap',
    });

    const luftbilderLayer = new WMTSLayer({
      id: 'luftbilder',
      url: 'https://geo.sbb.ch/mapproxy/Luftbilder/wmts',
      activeLayer: {
        id: 'SWISSIMAGE_2056',
        imageFormat: 'image/jpg',
        tileMatrixSetId: '2056_28',
      },
    });

    const luftbilderBasemap = new Basemap({
      baseLayers: [luftbilderLayer],
      title: 'Luftbilder',
      id: 'wmtsBasemap',
    });

    const map = new Map({
      basemap: luftbilderBasemap,
      layers: [graphicsLayer],
    });

    const bahnplanLayer = new MapImageLayer({
      url: 'https://geo.sbb.ch/site/rest/services/DGP_PUBLIC/Bahnplan_schwarz/MapServer',
    });

    map.add(bahnplanLayer, 0);

    const centerPoint = new Point({
      x: 2681085,
      y: 1248846,
      spatialReference: {
        wkid: 2056,
      },
    });

    const hazardPopup = {
      'title': '{HazardType}',
      'content': '{Description}',
    };

    const hazardLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Hazards_Uptown_Charlotte/FeatureServer/0',
      outFields: ['HazardType', 'Description'],
      popupTemplate: hazardPopup,
    });

    map.add(hazardLayer, 0);

    const betriebsPunkLayer = new FeatureLayer({
      url: 'https://geo.sbb.ch/site/rest/services/DGP_PUBLIC/BS_Streckennetz_1_1_0/FeatureServer/2',
      outFields: ['*'],
    });

    map.add(betriebsPunkLayer, 0);

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
          layer: betriebsPunkLayer,
          searchFields: ['NAME', 'BEZEICHNUNG'],
          displayField: 'BEZEICHNUNG',
          exactMatch: true,
          outFields: ['*'],
          name: 'Betriebspunkt',
          placeholder: 'Beispiel: Altstetten',
          maxResults: 6,
          maxSuggestions: 6,
          suggestionsEnabled: true,
          minSuggestCharacters: 0,
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
          format: 'png',
          quality: 70,
        })
          .then(screenshot => {
            const link = document.createElement('a');
            link.download = 'screenshot.png';
            link.href = screenshot.dataUrl;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }),
      );
    });
  });
}
