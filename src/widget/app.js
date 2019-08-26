import './index.css';
import htmlTemplate from './index.html';
import { initArcGis } from './map';

export const ARCGIS_FRAME = 'arcGisFrame';
export const BUTTON_ID = 'save';

export function addArcGisFrame(domNode, selectNode) {
  const element = document.createElement('iframe');
  element.src = 'about:blank';
  element.id = ARCGIS_FRAME;
  element.onload = () => loadArcGis(selectNode);
  domNode.appendChild(element);

  const button = document.createElement('button');
  button.id = BUTTON_ID;
  button.innerText = 'Save';
  domNode.appendChild(button);
}

function loadArcGis(selectNode) {
  const frameWindow = document.getElementById(ARCGIS_FRAME).contentWindow;
  /**
   * the content of the iFrame (arcgis) will pass the global require into this function for us to use
   * without messing with the global namespace of our outer document
   */
  frameWindow.initArcGis = (dojoRequire) => initArcGis(dojoRequire, selectNode);

  const frameDocument = frameWindow.document;
  frameDocument.open();
  frameDocument.write(htmlTemplate);
  frameDocument.close();
}
