import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomeScreen from '../screens/WelcomeScreen'
import TutorialScreen from '../screens/TutorialScreen'
import SwiperScreen from '../screens/SwiperScreen'
import VerificationScreen from '../screens/VerificationScreen'

// Webpack Chunk import syntax
// const RegisterUserScreen = () => import('../screens/RegisterUserScreen')

// GraphQL imports for router guards
import { apolloProvider } from '../main'
import CURRENT_USER from '../graphql/users/currentUser.gql'

Vue.use(VueRouter)

export const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', 
      components: { default: WelcomeScreen },
      meta: { requiresNoPoll: true }
    },
    { path: '/tutorial',
    components: { default: TutorialScreen, },
    meta: { requiresAuth: true },
    },
    { path: '/umfrage',
      components: { default: SwiperScreen },
      meta: { requiresAuth: true },
    },
    { path: '/verify/:activation_key',
      components: { default: VerificationScreen },
      meta: { requiresAuth: false },
    },
  
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
    getUser().then((data) => {
      if(!data.currentPoll) {
        next('/')
      } else {
        next()
      }
    })     
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
