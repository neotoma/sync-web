import Ember from 'ember';
import RouteSessions from '../mixins/route-sessions';

export default Ember.Route.extend(RouteSessions, {
  sessionUserRequired: true,
  sessionUserPropertyRedirect: '!userStorageAuths.length:storages'
});