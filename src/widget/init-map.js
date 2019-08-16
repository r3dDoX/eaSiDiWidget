export function initArcGis(dojoRequire) {
  dojoRequire([
    'esri/config',
    'esri/Basemap',
    'esri/Map',
    'esri/geometry/Point',
    'esri/layers/WMTSLayer',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/widgets/Sketch',
  ], function (esriConfig, Basemap, Map, Point, WMTSLayer, MapView, FeatureLayer, GraphicsLayer, Sketch) {

    esriConfig.request.trustedServers.push('geo.sbb.ch');

    const graphicsLayer = new GraphicsLayer();

    var wmtsLayer = new WMTSLayer({
      id: 'landeskarten',
      url: 'https://geo.sbb.ch/mapproxy/Landeskarten/wmts',
      activeLayer: {
        id: 'LK_2056',
        imageFormat: 'image/jpg',
        tileMatrixSetId: '2056_27',
      },
    });

    const wmtsBasemap = new Basemap({
      baseLayers: [wmtsLayer],
      title: 'Landeskarte',
      id: 'wmtsBasemap',
    });

    const map = new Map({
      basemap: wmtsBasemap,
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

    const sketch = new Sketch({
      view: view,
      layer: graphicsLayer,
    });

    view.ui.add(sketch, 'top-right');
  });
}
