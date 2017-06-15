import PickerSectionComponent from './picker-section';

export default PickerSectionComponent.extend({
  header: 'Where do you want to store copies of your data?',
  layoutName: 'components/picker-section',
  modelName: 'storage',
  submitRoute: 'sources-picker'
});