import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return ['Frankenberry', 'Booberry', 'Count Chocula'];
  }
});
