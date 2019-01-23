<template>
  <div class='main-container'>
    <BaseWhitespace></BaseWhitespace>
    <div class='startscreen-heading'>Mail-Adresse bestätigt!</div>
    <div v-if='success' class='verification-status '><i class='sl-icon icon-check icon-check__true'></i></div>
    <div v-else class='verification-status'><i class='sl-icon icon-check icon-check__false'></i></div>
    <BaseParagraph>Super, dass du dabei bei bist und viel Glück!</BaseParagraph>

    <BaseButton @click='$router.push("/umfrage")'>Zur Umfrage</BaseButton>

  </div>
</template>

<script>
import VERIFY_EMAIL from '../graphql/users/verifyEmail.gql'

export default {
  name: 'VerificationScreen',
  data () {
    return {
      success: false
    }
  },
  methods: {
  },
  mounted() {
    const activation_key = this.$route.params.activation_key

    this.$apollo.mutate({
      mutation: VERIFY_EMAIL,
      variables: {
        activationKey: activation_key
      }
    }).then((data) => {
      setTimeout(() => this.success = data.data.verifyEmail.success, 500)
    }).catch((error) => {
      // Error
      console.error(error)
    })
  }
}
</script>


<style lang="scss" scoped>

.startscreen-heading {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}

.impressum-link {
  margin: 0rem .5rem 0 .5rem;
  font-size: 0.8rem;
  text-align: center;
  color: $colorPrimary;
  line-height: 1.3;
  font-weight: 500;
}

.verification-status {
  margin: 1rem;

  .icon-check {
    font-size: 32vw;

    &__true {
      color: rgba(125, 211, 33, 0.75)
    }

    &__false {
      color: #CDCDCD;
    }
  }


}

</style>
