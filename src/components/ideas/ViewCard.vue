<template>
  <v-dialog
      v-model="dialog"
      max-width="700">
    <v-card>
      <v-row class="ma-2">
        <v-col cols="12" md="8">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>
            {{ date }}
            <v-chip :color="tagColor" class="ml-2" x-small>{{ card.tag }}</v-chip>
          </v-card-subtitle>
          <v-card-text>
            {{ card.description }}
            <div v-if="card.description.length === 0">
              <span>No description available.</span>
              <br>
              <v-icon x-large>mdi-text</v-icon>
            </div>
          </v-card-text>
        </v-col>

        <v-col cols="12" md="4">

          <div class="mx-2 my-4 d-flex" v-if="card.assignee">
            <UserAvatar :alt="card.assignee.first_name" :image="card.assignee.profile_picture" :size="45"/>
            <div class="ml-2">
              <span>{{ card.assignee.first_name }} {{ card.assignee.last_name }}</span>
              <br>
              <small style="font-size: xx-small">{{ card.assignee.email }}</small>
            </div>
          </div>

          <v-divider/>
          <div class="ma-2">
            <v-list shaped >

              <v-list-item @click="removeCard">
                <v-list-item-avatar>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                  Delete card
                </v-list-item-title>
              </v-list-item>


              <v-menu>
                <template v-slot:activator="{on, attrs}">
                  <v-list-item
                      v-bind="attrs"
                      v-on="on">
                    <v-list-item-avatar>
                      <v-icon>
                        mdi-transfer
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>
                      Move card
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <v-list dense>
                  <v-list-item
                      v-for="(list, i) in lists"
                      :key="i"
                      @click="changeCardList(list.list)">
                    <v-list-item-title>{{ list.label }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-list>

          </div>
        </v-col>
      </v-row>
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
import {mapActions, mapMutations} from "vuex";

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
    },
    lists: function () {
      const lists = [
        {label: 'To Do', list: 'todo'},
        {label: 'In Progress', list: 'inProgress'},
        {label: 'Done', list: 'done'}
      ]
      return lists.filter((l) => l.list !== this.card.status)
    }
  },
  methods: {
    ...mapMutations({
      addCard: 'ideas/ADD_CARD',
      removeFromList: 'ideas/REMOVE_CARD'
    }),
    ...mapActions('ideas', ['deleteCard', 'getCards', "moveCard"]),
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
    },
    changeCardList: async function (newList) {
      try {
        this.removeFromList(this.card)
        const newCard = this.card
        newCard.status = newList
        await this.moveCard(newCard)
        this.addCard(newCard)
        const message = "Card moved!"
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