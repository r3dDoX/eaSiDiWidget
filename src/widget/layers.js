export function getLandeskartenBasemap(WMTSLayer, Basemap) {
  const layer = new WMTSLayer({
    id: 'landeskarten',
    url: 'https://geo.sbb.ch/mapproxy/Landeskarten/wmts',
    activeLayer: {
      id: 'LK_2056',
      imageFormat: 'image/jpg',
      tileMatrixSetId: '2056_27',
    },
  });

  return new Basemap({
    baseLayers: [layer],
    title: 'Landeskarte',
    id: 'wmtsBasemap',
  });
}

export function getLuftbilderBasemap(WMTSLayer, Basemap) {
  const layer = new WMTSLayer({
    id: 'luftbilder',
    url: 'https://geo.sbb.ch/mapproxy/Luftbilder/wmts',
    activeLayer: {
      id: 'SWISSIMAGE_2056',
      imageFormat: 'image/jpg',
      tileMatrixSetId: '2056_28',
    },
  });

  return new Basemap({
    baseLayers: [layer],
    title: 'Luftbilder',
    id: 'wmtsBasemap',
  });
}

export function getBahnplanLayer(MapImageLayer) {
  return new MapImageLayer({
    url: 'https://geo.sbb.ch/site/rest/services/DGP_PUBLIC/Bahnplan_schwarz/MapServer',
  });
}

export function getHazardFeatureLayer(FeatureLayer) {
  const hazardPopup = {
    'title': '{HazardType}',
    'content': '{Description}',
  };

  return new FeatureLayer({
    url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Hazards_Uptown_Charlotte/FeatureServer/0',
    outFields: ['HazardType', 'Description'],
    popupTemplate: hazardPopup,
  });
}

export function getInvisibleBetriebspunktLayer(FeatureLayer) {
  return new FeatureLayer({
    url: 'https://geo.sbb.ch/site/rest/services/DGP_PUBLIC/BS_Streckennetz_1_1_0/FeatureServer/2',
    outFields: ['*'],
    visible: false,
  });
}
