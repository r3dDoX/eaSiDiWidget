import './index.css';
import htmlTemplate from './index.html';
import { initArcGis } from './init-map';

const arcGisId = 'arcGisFrame';

export function addArcGisFrame(domNode) {
  const element = document.createElement('iframe');
  element.src = 'about:blank';
  element.id = arcGisId;
  element.onload = loadArcGis;
  domNode.appendChild(element);
}

function loadArcGis() {
  const frameWindow = document.getElementById(arcGisId).contentWindow;
  frameWindow.initArcGis = initArcGis;

  const frameDocument = frameWindow.document;
  frameDocument.open();
  frameDocument.write(htmlTemplate);
  frameDocument.close();
}
