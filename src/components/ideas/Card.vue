<template>
  <v-card elevation="1" class="ma-1" @click="dialog = true">
    <v-card-title>{{card.title}}</v-card-title>
    <v-card-subtitle v-if="card.tag">
      <v-chip x-small :color="tagColor">{{card.tag}}</v-chip>
    </v-card-subtitle>
    <v-card-text v-if="card.description">
      {{truncatedContext}}
    </v-card-text>
    <v-card-actions v-if="card.assignee">
      <UserAvatar
          :size="25"
          :image="card.assignee.profile_picture"
          :alt="card.assignee.first_name" />
      <v-spacer/>
    </v-card-actions>

    <ViewCard :dialog="dialog" :card="card" @close-dialog="dialog = false"/>
  </v-card>
</template>

<script>
import UserAvatar from "@/components/shared/UserAvatar";
import ViewCard from "@/components/ideas/ViewCard";
export default {
  name: "Card",
  components: {ViewCard, UserAvatar},
  data() {
    return {
      dialog: false
    }
  },
  props: {
    card: Object
  },
  computed: {
    tagColor: function () {
      const tags = {
        'High priority': 'red',
        'Medium priority': 'primary',
        'Low priority': 'info'
      }
      return tags[this.card.tag]
    },
    truncatedContext: function () {
      if (this.card.description.length <= 50) {
        return this.card.description
      }
      return this.card.description.substr(0, 50) + '...'
    }
  }
}
</script>

<style scoped>

</style>