
<template>
  <div>
    <Whitespace/>
    <Heading :level="1" v-show='!inputIsFocused'>
      Deine Kontaktdaten für die Challenge
    </Heading>
    <Paragraph v-show='!inputIsFocused'>Deine Daten werden nicht an Dritte weitergegeben und nach der Challenge automatisch gelöscht!</Paragraph>
    <button @click='register()' type='submit' class='register-user-button-send'>Account erstellen</button>
  </div>
</template>

<script>
import Heading from '../components/atoms/Heading'
import Paragraph from '../components/atoms/Paragraph'
import FormLabel from '../components/atoms/FormLabel'
import Whitespace from '../components/layout/Whitespace'

// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'register-user-screen',
  components: {
    Heading,
    Paragraph,
    FormLabel,  
    Whitespace
  },
  data () {
    return {
      inputIsFocused: false,
      username: 'mastermind',
      email: '',
      password: 'asdjflkjasdlöfkj',
      passwordRepeat: 'asdjflkjasdlöfkj'
    }
  },
  methods: {
    register() {
      const theUsername = this.username
      const thePassword = this.password
      
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          pollId: 8,
          username: theUsername,
          password: thePassword,
        }
      }).then((data) => {
        console.log('User created')

        this.login()

      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    login() {
      const theUsername = this.username
      const thePassword = this.password
      
      this.$apollo.mutate({
        mutation: GET_TOKEN,
        variables: {
          username: theUsername,
          password: thePassword
        }
      }).then((data) => {
        // Result
        const token = data.data.tokenAuth.token
        localStorage.setItem('YXnk}cg8N{KUSx?', token)
        if (localStorage.getItem('YXnk}cg8N{KUSx?')) {
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
