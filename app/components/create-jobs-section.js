import { arrayToString } from 'sync-web/helpers/array-to-string';
import Ember from 'ember';
import NoticeSectionComponent from './notice-section';

export default NoticeSectionComponent.extend({
  buttonAction: 'createJobs',
  buttonLabel: 'Start backup',
  header: 'You\'re all connected!',
  layoutName: 'components/notice-section',
  routing: Ember.inject.service('-routing'),
  sessionsService: Ember.inject.service('sessions'),
  store: Ember.inject.service(),

  init() {
    this._super(false);

    Ember.run.next(() => {
      this.set('loaded', true);
    });
  },

  body: Ember.computed('sessionsService.storages.@each.name', 'sessionsService.sources.@each.name', 'sessionsService.jobs.[]', function() {
    if (!this.get('sessionsService.storages') || !this.get('sessionsService.sourcesWithoutJobs.length')) { return; }

    return `Let\'s start backing up your data from ${arrayToString(this.get('sessionsService.sourcesWithoutJobs').map((source) => source.get('name')))} by copying them as files into your ${arrayToString(this.get('sessionsService.storages').map((storage) => storage.get('name')))} ${this.get('storages.length') > 1 ? 'accounts' : 'account'}.`;
  }),

  actions: {
    createJobs() {
      this.get('segment').trackEvent('Started backup', {
        sourceNames: this.get('sessionsService.sourcesWithoutJobs').map((source) => source.get('name')),
        sources: this.get('sessionsService.sourcesWithoutJobs').map((source) => source.get('id')),
        storageNames: this.get('sessionsService.storages').map((storage) => storage.get('name')),
        storages: this.get('sessionsService.storages').map((storage) => storage.get('id'))
      })

      this.transitionPromise((resolve) => {
        this.get('sessionsService.storages').forEach((storage) => {
          this.get('sessionsService.sourcesWithoutJobs').forEach((source) => {
            var job = this.get('store').createRecord('job', {
              name: 'storeAllItemsForUserStorageSource',
              source: source,
              storage: storage,
              user: this.get('sessionsService.user')
            });

            job.save().then(() => {
              this.get('segment').trackEvent('Created job', {
                jobId: job.get('id'),
                jobName: job.get('name'),
                sourceName: job.get('source.name'),
                storageName: job.get('storage.name')
              })
            });
          });
        });

        resolve();
      });
    }
  }
});
