import Ember from 'ember';
import RouteSessions from '../mixins/route-sessions';

export function initialize(/* application */) {
  Ember.Route.reopen(RouteSessions);
}

export default {
  name: 'route-sessions',
  initialize
};
