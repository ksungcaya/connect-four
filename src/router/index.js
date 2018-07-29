import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '../components/Game.vue';
import GamesList from '../components/GamesList.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'GamesList',
    component: GamesList,
  }, {
    path: '/games/:game',
    name: 'ShowGame',
    component: Game,
  }],
});
