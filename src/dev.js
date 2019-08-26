import { addArcGisFrame } from './widget/app';

const priorities = ['', 'High', 'Moderate', 'Low'];
const select = document.createElement('select');
select.id = 'sidiSelect';
priorities.forEach(priority => {
  const option = document.createElement('option');
  option.text = priority;
  option.value = `Priority = '${priority}'`;
  select.appendChild(option);
});
document.body.appendChild(select);

const main = document.createElement('main');
document.body.appendChild(main);

addArcGisFrame(main, select);
