import Ember from 'ember';
import RouteSessions from '../mixins/route-sessions';

export default Ember.Route.extend(RouteSessions, {
  sessionUserPropertyRedirect: 'userStorageAuths.length:sources'
});