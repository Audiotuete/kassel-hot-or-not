
<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level="1" v-show='!inputIsFocused'>
      Deine Kontaktdaten für die Challenge
    </BaseHeading>
    <BaseParagraph v-show='!inputIsFocused'>Deine Daten werden nicht an Dritte weitergegeben und nach der Challenge automatisch gelöscht!</BaseParagraph>
    <button @click='register()' type='submit' class='register-user-button-send'>Account erstellen</button>
  </div>
</template>

<script>
// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'register-user-screen',
  components: {
  },
  data () {
    return {
      inputIsFocused: false,
      email: '',
    }
  },
  methods: {
    register() {
      // const theUsername = navigator.appVersion
      // const thePassword = navigator.appVersion
      
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          pollId: 9,
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
          this.$router.push('/umfrage')
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

<style scoped lang='scss'>

  .register-user-button-send {
    background: $colorPrimary;
    border: none;
    outline: none;
    width: 60vw;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1rem;
    border-radius: 1vh;
    margin-top: 1rem;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
  }

</style>
