export function setFeatureLayerViewFilter(featureLayer, view, expression) {
  view.whenLayerView(featureLayer).then(function (featureLayerView) {
    featureLayerView.filter = {
      where: expression,
    };
  });
}
