<template>
  <div>
      <Introduction />
      <SocialMedia />
      <Ideas />
      <Calendar />
      <Email />
      <Recommend />
  </div>
</template>

<script>
import Introduction from "@/components/landing/Introduction.vue"
import SocialMedia from "@/components/landing/SocialMedia.vue"
import Ideas from "@/components/landing/Ideas.vue"
import Calendar from "@/components/landing/Calendar.vue"
import Email from '../components/landing/Email.vue'
import Recommend from '../components/landing/Recommend.vue'


export default {
    name: 'Landing',
    components: {Introduction, SocialMedia, Ideas, Calendar, Email, Recommend},
    data() {
        return {}
    }
}
</script>

<style>

</style>