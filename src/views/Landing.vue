<template>
  <div>
      <Introduction />
      <SocialMedia />
      <Ideas />
      <Calendar />
  </div>
</template>

<script>
import Introduction from "@/components/landing/Introduction.vue"
import SocialMedia from "@/components/landing/SocialMedia.vue"
import Ideas from "@/components/landing/Ideas.vue"
import Calendar from "@/components/landing/Calendar.vue"

export default {
    name: 'Landing',
    components: {Introduction, SocialMedia, Ideas, Calendar},
    data() {
        return {}
    }
}
</script>

<style>

</style>