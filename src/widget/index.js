import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';
import * as packageConfig from '../../package.json';
import { addArcGisFrame } from './app';

declare(packageConfig.name + '.widget.' + packageConfig.name, [widgetBase], {

  targetQuery: null,

  _srcNodeRef: null,

  constructor: function (params, srcNodeRef) {
    this._srcNodeRef = srcNodeRef;
  },

  update: function (obj, cb) {
    addArcGisFrame(this._srcNodeRef, document.querySelector(this.targetQuery + ' select'));
    cb();
  },

});
