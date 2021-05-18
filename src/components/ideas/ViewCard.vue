<template>
  <v-dialog
      v-model="dialog" max-width="700">
    <v-card>
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-subtitle>
        {{ date }}
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            {{ card.description }}
            <div v-if="card.description.length === 0">
              <span >No description available.</span>
              <br>
              <v-icon x-large>mdi-text</v-icon>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="ma-2">
              <v-chip :color="tagColor" x-small>{{ card.tag }}</v-chip>
            </div>
            <v-divider/>
            <div class="ma-2">
              <UserAvatar :alt="card.assignee.first_name" :image="card.assignee.profile_picture" :size="30"/>
              <span class="ml-2">{{ card.assignee.first_name }} {{ card.assignee.last_name }}</span>
            </div>
            <v-divider/>
            <div class="ma-2">
              <b>Actions</b>
              <br>
              <v-btn
                  color="red"
                  icon
              @click="removeCard">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="primary"
            outlined
            @click="$emit('close-dialog')">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserAvatar from "@/components/shared/UserAvatar";
import {mapActions} from "vuex";

export default {
  name: "ViewCard",
  components: {UserAvatar},
  props: {
    dialog: Boolean,
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
    date: function () {
      const date = this.card.created_at
      const options = {
        year: 'numeric', month: 'long',
        day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false
      }
      return new Date(date).toLocaleString('en-US', options)
    }
  },
  methods: {
    ...mapActions('ideas', ['deleteCard', 'getCards']),
    removeCard: async function () {
      try {
        await this.deleteCard(this.card.id)
        await this.getCards(this.$route.params.workspace)
        this.$emit('close-dialog')
        const message = "Card deleted!"
        await this.$store.dispatch('showMessage', {message, color: 'success'})
      } catch (err) {
        const message = err.response.data.message || 'There is something wrong, try again please'
        await this.$store.dispatch('showMessage', {message, color: 'error'})
      }
    }
  }
}
</script>

<style scoped>

</style>