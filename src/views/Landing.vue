<template>
  <div>
      <introduction />
      <SocialMedia />
  </div>
</template>

<script>
import Introduction from "@/components/landing/Introduction.vue"
import SocialMedia from "@/components/landing/SocialMedia.vue"
export default {
    name: 'Landing',
    components: {Introduction, SocialMedia},
    data() {
        return {}
    }
}
</script>

<style>

</style>