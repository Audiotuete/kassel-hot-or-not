
<template>
  <div class='main-container'>
    <BaseWhitespace></BaseWhitespace>
    <div class='startscreen-heading'>Deine Meinung zählt!</div>
    <BaseParagraph>Mobilität im Stadtteil Vorderer Westen.</BaseParagraph>
    <div :style='background' class='image'></div>
    <span class='call-to-action-text'>Jetzt mitmachen und Gutscheine für Läden und Gastronomie im Vorderen Westen gewinnen!</span>
    <BaseButton @click='register()'>Umfrage starten</BaseButton>
  </div>
</template>

<script>
// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'wellcome-screen',
  data () {
    return {
      background: {
        backgroundImage: 'url(' + 'https://www.kassel-live.de/wp-content/uploads/2016/08/nach-oben-1-e1472211917982.jpg' + ')'
      }
    }
  },
  methods: {
    register() {
      // const theUsername = navigator.appVersion
      // const thePassword = navigator.appVersion
      
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          // pollId: 2
          pollId: process.env.POLL_ID
        }
      }).then((data) => {
        this.login(data.data.createUser.user.username)

      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    login(username) {
      this.$apollo.mutate({
        mutation: GET_TOKEN,
        variables: {
          username: username,
          password: process.env.USER_PASSWORD
        }
      }).then((data) => {
        // Result
        const token = data.data.tokenAuth.token
        localStorage.setItem(process.env.TOKEN_KEY, token)
        if (localStorage.getItem(process.env.TOKEN_KEY)) {
          this.$router.push('/tutorial')
        }
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
      })
    },
  }
}
</script>

<style lang='scss'>

  .call-to-action-text {
    text-align: center;
    font-size: 1rem;
    width: 70vw;
  }

  .startscreen-heading {
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }

  .image {
    margin-top: 1rem;
    margin-bottom: 1rem;
    position: relative;
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center; 
    display: flex;
    width: 85vw;
    height: 40vh;
    border-radius: 4px;
    background-size: 384px 260px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

</style>
