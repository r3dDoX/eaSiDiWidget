export const trailheadsRenderer = {
  type: 'simple',
  symbol: {
    type: 'picture-marker',
    url: 'http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png',
    width: '18px',
    height: '18px',
  },
};

export const trailheadsLabels = {
  symbol: {
    type: 'text',
    color: '#FFFFFF',
    haloColor: '#5E8D74',
    haloSize: '2px',
    font: {
      size: '12px',
      family: 'Noto Sans',
      style: 'italic',
      weight: 'normal',
    },
  },
  labelPlacement: 'above-center',
  labelExpressionInfo: {
    expression: '$feature.TRL_NAME',
  },
};
