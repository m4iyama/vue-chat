<template>
  <div>
    <navigation v-if="currentUser"/>
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Navigation from './components/Navigation';

  export default {
    components: {
      Navigation,
    },
    computed: {
      ...mapState({
        currentUser: state => state.login.currentUser,
      }),
    },
  };
</script>

<style>
</style>
