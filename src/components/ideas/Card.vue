<template>
  <v-card elevation="1" class="ma-1">
    <v-card-title>{{card.title}}</v-card-title>
    <v-card-subtitle v-if="card.tag">
      <v-chip x-small :color="tagColor">{{card.tag}}</v-chip>
    </v-card-subtitle>
    <v-card-text v-if="card.context">
      {{truncatedContext}}
    </v-card-text>
    <v-card-actions v-if="card.assignee">
      <UserAvatar
          size="25"
          :image="card.assignee.profile_picture"
          :alt="card.assignee.first_name" />
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserAvatar from "@/components/shared/UserAvatar";
export default {
  name: "Card",
  components: {UserAvatar},
  props: {
    card: Object
  },
  computed: {
    tagColor: function () {
      const tags = {
        'High Priority': 'red',
        'Medium Priority': 'primary',
        'Low Priority': 'info'
      }
      return tags[this.card.tag]
    },
    truncatedContext: function () {
      if (this.card.context.length <= 50) {
        return this.card.context
      }
      return this.card.context.substr(0, 50) + '...'
    }
  }
}
</script>

<style scoped>

</style>