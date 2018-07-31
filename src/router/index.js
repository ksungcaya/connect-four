import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '../components/Game.vue';
import GamesList from '../components/GamesList.vue';
import NotFound from '../components/NotFound.vue';
import GameLocked from '../components/GameLocked.vue';

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
  }, {
    path: '/not-found',
    component: NotFound,
  }, {
    path: '/game-locked',
    component: GameLocked,
  }, {
    path: '*',
    redirect: '/not-found',
  }],
});
