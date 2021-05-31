<template>
  <div>
      <Introduction />
      <SocialMedia />
      <Ideas />
  </div>
</template>

<script>
import Introduction from "@/components/landing/Introduction.vue"
import SocialMedia from "@/components/landing/SocialMedia.vue"
import Ideas from "@/components/landing/Ideas.vue"
export default {
    name: 'Landing',
    components: {Introduction, SocialMedia, Ideas},
    data() {
        return {}
    }
}
</script>

<style>

</style>