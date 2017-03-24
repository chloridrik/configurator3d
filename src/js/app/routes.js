/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */


/**
 * The routes
 *
 * @type {object} The routes
 */
export default [{
        path: '/',
        component: require('./views/Home/Home.vue')
    },

    {
        path: '/editor',
        component: require('./views/Editor/Editor.vue')
    },

    //
    // Important : If you modify any routes in <routes></routes>, place it out of the tags.
    //
    //[routes]
    //[/routes]
];