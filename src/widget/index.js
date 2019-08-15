import './config';
import './index.css';

import declare from 'dojoBaseDeclare';
import MapView from 'esri/views/MapView';
import widgetBase from 'widgetBase';
import * as packageConfig from '../../package.json';


declare(packageConfig.name + '.widget.' + packageConfig.name, [widgetBase], {

  constructor: function (params, srcNodeRef) {
    this.domNode = srcNodeRef;
    const element = document.createElement('div');
    element.id = 'viewDiv';
    this.domNode.appendChild(element);

    import('./app').then(({ map }) => {
      const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [8.492802, 47.390904], // longitude, latitude
        zoom: 16
      });
    });
  },

  update: function (obj, cb) {
    cb();
  },

});
