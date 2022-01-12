export default [
    {
        path: "/login",
        name: "login",
        title: 'Login',
        component: () => import("../components/Login")
    },
    {
        path: "/",
        alias: "/home",
        name: "home",
        title: 'Home',
        component: () => import("../views/Home")
    },
    {
        path: "/exhibitions",
        name: "exhibitions",
        title: 'Exhibitions',
        component: () => import("../views/Exhibitions")
    },
    {
        path: "/exhibitions/:id?",
        name: "exhibition",
        title: 'Exhibition',
        component: () => import("../views/Exhibition")
    },
    {
        path: "/apply",
        name: "apply",
        title: 'Apply',
        component: () => import("../views/Apply")
    },
    {
        path: "/adm/applications",
        name: "adm-applications",
        title: 'Applications Administration',
        component: () => import("../views/adm/Applications"),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.user) next();
            else next('');
        },
    },
    {
        path: "/adm/approved",
        name: "adm-approved",
        title: 'Approved Administration',
        component: () => import("../views/adm/Approved"),beforeEnter: (to, from, next) => {
            if (sessionStorage.user) next();
            else next('');
        },
    },
    {
        path: "/adm/rejected",
        name: "adm-rejected",
        title: 'Rejected Administration',
        component: () => import("../views/adm/Rejected"),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.user) next();
            else next('');
        },
    },
    {
        path: "/adm",
        alias: "/adm/exhibitions",
        name: "adm-exhibitions",
        title: 'Exhibitions Administration',
        component: () => import("../views/adm/Exhibitions"),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.user) next();
            else next('');
        },
    },
    {
        path: "/adm/users",
        name: "adm-users",
        title: 'Users Administration',
        component: () => import("../views/adm/Users"),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.user && JSON.parse(sessionStorage.user).isAdmin === 'yes') next();
            else next('');
        },
    },
]
