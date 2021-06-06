<template>
  <div>
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/homepage/NavBar";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {NavBar},
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapState('auth', ['user'])
  }
};
</script>

<style lang="scss" scoped>
</style>
