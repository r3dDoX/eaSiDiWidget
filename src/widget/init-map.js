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
  ], function (esriConfig, Basemap, Map, Point, WMTSLayer, MapView, MapImageLayer, FeatureLayer, GraphicsLayer, Sketch, Editor) {

    esriConfig.request.trustedServers.push('geo.sbb.ch');

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

    /*const trailsLayer = new FeatureLayer({
      url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0',
    });

    map.add(trailsLayer, 0);

    const trailHeads = new FeatureLayer({
      url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0',
      renderer: trailheadsRenderer,
      labelingInfo: [trailheadsLabels],
    });

    map.add(trailHeads);*/

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
    });
  });
}
