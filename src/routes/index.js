import index from 'views/index';
import description from 'views/description';
import users from 'views/users';
import video from 'views/video';
import notice from 'views/notice';
import app from 'views/app';
import login from 'views/login';
import level from 'views/level';
import loglist from 'views/logList';
import serviceQQ from 'views/serviceQQ';

export default [{
  path: '/',
  component: app,
  children: [{
    name: 'index',
    path: '/index',
    component: index,
  }, {
    name: 'description',
    path: '/description',
    component: description,
  }, {
    name: 'users',
    path: '/users',
    component: users,
  }, {
    name: 'video',
    path: '/video',
    component: video,
  }, {
    name: 'notice',
    path: '/notice',
    component: notice,
  }, {
    path: '/level',
    name: '/level',
    component: level,
  }, {
    path: '/loglist',
    name: '/loglist',
    component: loglist,
  }, {
    path: 'serviceQQ',
    name: '/serviceQQ',
    component: serviceQQ,
  }, {
    path: '/',
    component: index,
  }, {
    path: '',
    component: index,
  }],
}, {
  name: 'login',
  path: '/login',
  component: login,
}];
