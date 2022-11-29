import {
    createRouter,
    createWebHistory
} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import TimelineView from '../views/TimelineView.vue'
import ArticleView from '../views/ArticleView.vue'
import WriteArticleView from '../views/WriteArticleView.vue'
import DraftView from '../views/DraftView.vue'
import EditView from '../views/EditView.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'welcome',
            component: WelcomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: TimelineView
        },
        {
            path: '/articles/:articleId',
            name: 'article',
            component: ArticleView
        },
        {
            path: '/write-article',
            name: 'write-article',
            component: WriteArticleView
        },
        {
            path: '/drafts',
            name: 'drafts',
            component: DraftView
        },
        {
            path: '/edit/:articleId',
            name: 'edit',
            component: EditView
        }
    ]
})

export default router