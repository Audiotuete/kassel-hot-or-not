import Vue from 'vue'
import VueRouter from 'vue-router'

import RegisterUserScreen from '../screens/RegisterUserScreen'
import EnterChallengeScreen from '../screens/EnterChallengeScreen'
import ChallengeInfoScreen from '../screens/ChallengeInfoScreen'

import LoginScreen from '../screens/LoginScreen'
import RegisterProjectScreen from '../screens/RegisterProjectScreen'
import TaskFeedScreen from '../screens/TaskFeedScreen'
import TaskScreen from '../screens/TaskScreen'

<<<<<<< HEAD
import SwiperScreen from '../screens/SwiperScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
=======
>>>>>>> e64ac5db3428fcf1146dfc7e65b77372c18a1a5c

// import TheNavbar from '../components/layout/navbar/TheNavbar'
// import TheFooter from '../components/layout/footer/TheFooter'


// const RegisterUserScreen = () => import('../screens/RegisterUserScreen')
// const EnterChallengeScreen = () => import('../screens/EnterChallengeScreen')
// const LoginScreen = () => import('../screens/LoginScreen')
// const RegisterProjectScreen = () => import('../screens/RegisterProjectScreen')

// const TaskFeedScreen = () => import(/* webpackChunkName: "tasks-group" */ '../screens/TaskFeedScreen')
// const TaskScreen = () => import(/* webpackChunkName: "tasks-group" */ '../screens/TaskScreen')

// const ChallengeInfoScreen = () => import( '../screens/ChallengeInfoScreen')

// const TheNavbar = () => import('../components/navbar/TheNavbar')
// const TheFooter = () => import('../components/footer/TheFooter')

// GraphQL imports for router guards
import { apolloProvider } from '../main'
import CURRENT_USER from '../graphql/users/currentUser.gql'

Vue.use(VueRouter)

export const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', 
<<<<<<< HEAD
      components: { default: WelcomeScreen},
      meta: { requiresNoPoll: true },
    },
    { path: '/umfrage',
      name: 'umfrage', 
      components: { default: SwiperScreen, header: TheHeader},
      meta: { requiresAuth: true, requiresProject: false },
      props: false,
    },
=======
      components: { default: TaskFeedScreen}, 
      meta: { requiresAuth: true, requiresProject: true }},

    { path: '/task/:id', 
      name: 'task', 
      components: { default: TaskScreen },
      props: true,
      meta: { requiresAuth: true, requiresProject: true }},

    { path: '/challengeinfo', 
      components: { default: ChallengeInfoScreen}, 
      meta: { requiresAuth: true, requiresProject: true }},

      { path: '/registerproject', 
      components: { default: RegisterProjectScreen}, 
      meta: { requiresAuth: true }},

      { path: '/enterchallenge', components: { default: EnterChallengeScreen} },
      { path: '/login', components: { default: LoginScreen}}, 
      { path: '/registeruser', components: { default: RegisterUserScreen }},
>>>>>>> e64ac5db3428fcf1146dfc7e65b77372c18a1a5c
  
    // { path: '/projectsettings', components: {default: ProjectSettingsScreen, footer: TheFooter}}, 
    // { path: '/usersettings', components: {default: UserSettingsScreen, footer: TheFooter}}, 
  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresNoPoll)) {
    getUser().then((data) => {
      if(data.currentPoll) {
        next('/umfrage')
      } else {
        next()
      }
    })
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.getItem('YXnk}cg8N{KUSx?')) {
      next('/')
    } else {
      next()
    }    
  } else {
    next()
  }
})
  
async function getUser() {
  let user = await apolloProvider.defaultClient.query({
    query: CURRENT_USER,
    fetchPolicy: 'network-only'
  }).then((data) => {
      return data.data.currentUser
  }).catch((error) => {
      return false
  })
  return user
}
