import Vue from 'vue'
import VueRouter from 'vue-router'

import SwiperScreen from '../screens/SwiperScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

import TheNavbar from '../components/layout/navbar/TheNavbar'
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
      components: { default: WelcomeScreen},
      meta: { requiresNoPoll: true },
    },
    { path: '/umfrage',
      name: 'umfrage', 
      components: { default: SwiperScreen, header: TheNavbar},
      meta: { requiresAuth: true },
      props: false,
    },
  
    // { path: '/projectsettings', components: {default: ProjectSettingsScreen, footer: TheFooter}}, 
    // { path: '/usersettings', components: {default: UserSettingsScreen, footer: TheFooter}}, 
  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresNoPoll)) {
    getUser().then((data) => {
      if(data.currentPoll) {
        console.log(data.currentPoll)
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
