import htmlTemplate from './index.html';
import './index.css';

const arcGisId = 'arcGisFrame';

export function addArcGisFrame(domNode) {
  const element = document.createElement('iframe');
  element.src = 'about:blank';
  element.id = arcGisId;
  element.onload = initiateArcGIS;
  domNode.appendChild(element);
}

function initiateArcGIS() {
  let frameDocument = document.getElementById(arcGisId).contentWindow.document;
  frameDocument.open();
  frameDocument.write(htmlTemplate);
  frameDocument.close();
}


/**
 * Due to Mendix loading dojo and arcGIS trying to load modules with dojo too we get a config conflict of these two globals
 * arcGIS has a webpack build which is giving errors on the webpack part for compiling wasm currently.
 * see: https://github.com/webpack/webpack/issues/7352
 * For the sake of simplicity and speed the iFrame solution was chosen for this prototype.
 */

/*
import './config';

import MapView from 'esri/views/MapView';
import widgetBase from 'widgetBase';

this.domNode = srcNodeRef;
const element = document.createElement('div');
element.id = 'viewDiv';
this.domNode.appendChild(element);

import('./app')
  .then(({ map }) => {
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [8.492802, 47.390904], // longitude, latitude
      zoom: 16
    });
  });
 */
