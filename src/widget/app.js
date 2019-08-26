import './index.css';
import htmlTemplate from './index.html';
import { initArcGis } from './map';

export const ARCGIS_FRAME = 'arcGisFrame';
export const BUTTON_ID = 'save';

export function addArcGisFrame(domNode) {
  const element = document.createElement('iframe');
  element.src = 'about:blank';
  element.id = ARCGIS_FRAME;
  element.onload = loadArcGis;
  domNode.appendChild(element);

  const button = document.createElement('button');
  button.id = BUTTON_ID;
  button.innerText = 'Save';
  domNode.appendChild(button);
}

function loadArcGis() {
  const frameWindow = document.getElementById(ARCGIS_FRAME).contentWindow;
  frameWindow.initArcGis = initArcGis;

  const frameDocument = frameWindow.document;
  frameDocument.open();
  frameDocument.write(htmlTemplate);
  frameDocument.close();
}
