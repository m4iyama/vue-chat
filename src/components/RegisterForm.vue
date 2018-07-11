<template>
  <div>
    <h2>Register</h2>

    <form @submit.prevent="handleSubmit">
      username <input v-model="username" type="text"> <br>
      email <input v-model="email" type="email"> <br>
      password <input v-model="password" type="password"> <br>
      <button type="submit">register</button>
    </form>

    <a @click="handleLinkClick">back to login!</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      handleSubmit() {
        const { username, email, password } = this;

        this.$store.dispatch('login/register', { username, email, password });
      },
      handleLinkClick() {
        this.$store.commit('login/toggleForm');
      },
    },
  };
</script>

<style scoped>

</style>