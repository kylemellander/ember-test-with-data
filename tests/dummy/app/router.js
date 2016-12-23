import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('link-to');
  this.route('auto-tag');
  this.route('override');
  this.route('iterating');
  this.route('context');
});

export default Router;
