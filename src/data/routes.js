import PublicTemplate from "comp/templates/PublicTemplate";
import Dashboard from "comp/pages/Dashboard";
import Financial from "comp/pages/Financial";

export default {
    ROOT: {
        path: '/',
        groups: ['public'],
        exact: true,
        component: PublicTemplate
    },
    DASHBOARD: {
        path: '/',
        groups: ['private'],
        exact: true,
        component: Dashboard
    },
    Financial: {
        path: '/financial',
        groups: ['private'],
        exact: true,
        component: Financial
    }
}