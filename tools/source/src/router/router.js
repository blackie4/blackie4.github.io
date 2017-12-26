import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/json',
        redirect: { name: 'Qr-generate' }
    },
    {
        name: 'Json-format',
        path: '/json/format',
        component: function(resolve) {
            require(['../views/json-format.vue'], resolve);
        }
    },
    {
        path: '/js',
        redirect: { name: 'Js-format' }
    },
    {

        name: 'Js-format',
        path: '/js/format',
        component: function(resolve) {
            require(['../views/js-format.vue'], resolve);
        }
    },
    {

        name: 'Qr-generate',
        path: '/qr/generate',
        component: function(resolve) {
            require(['../views/qr-generate.vue'], resolve);
        }
    },
    {
        path: '*', // 其他页面跳转到首页
        redirect: '/json/format'
    }
];

const router = new VueRouter({
    routes
});

router.afterEach((route, from) => {
    // console.log('afterEach');
});

export default router;
