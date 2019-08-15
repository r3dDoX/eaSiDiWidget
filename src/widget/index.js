import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';
import * as packageConfig from '../../package.json';
import { addArcGisFrame } from './app';
import './index.css';

declare(packageConfig.name + '.widget.' + packageConfig.name, [widgetBase], {

  constructor: function (params, srcNodeRef) {
    addArcGisFrame(srcNodeRef);
  },

  update: function (obj, cb) {
    cb();
  },

});
