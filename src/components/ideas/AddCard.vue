<template>
  <v-dialog
      v-model="dialog"
      max-width="600">
    <v-card>
      <v-card-title>Add a new card</v-card-title>
      <v-divider/>
      <v-form @submit.prevent="createCard">
        <v-card-text class="mt-4">
          <v-text-field
              v-model="card.title"
              :rules="titleRules"
              clearable
              counter
              filled
              label="title"
              placeholder="My Card">

          </v-text-field>
          <v-select
              v-model="card.tag"
              :items="tags"
              chips
              clearable
              filled
              label="Tag"></v-select>
          <v-select
              v-model="card.assignee"
              :item-text="item => item.first_name + ' ' + item.last_name"
              :item-value="item => item.id"
              :items="members"
              append-icon="mdi-account"
              clearable
              filled
              label="Assignee">

          </v-select>
          <v-textarea
              v-model="card.description"
              :rules="descRule"
              auto-grow
              clearable
              counter
              filled
              label="Description"
              rows="3">
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" outlined @click="closeDialog">
            Discard
          </v-btn>
          <v-btn color="primary" depressed type="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "AddCard",
  props: {
    dialog: Boolean,
    board: String
  },
  data() {
    return {
      card: {
        title: '',
        description: '',
        tag: '',
        assignee: ''
      },
      members: [],
      titleRules: [
        v => !!v || 'Please enter a title',
        v => (v || '').length <= 50 || 'The title must not exceed 50 character'
      ],
      descRule: [
        v => (v || '').length <= 250 || 'The description must not exceed 50 character'
      ]
    }
  },
  methods: {
    getWorkspaceMembers: function () {
      const id = this.$route.params.workspace
      this.$store.dispatch('getWorkspaceMembers', id).then(resp => {
        this.members = resp.data.members
      }).catch(err => {
        console.log(err)
      })
    },
    createCard: function () {
      const body = this.card
      body.status = this.board
      body.team = this.$route.params.workspace
      this.$store.dispatch('ideas/createCard', body)
      this.closeDialog()
    },
    closeDialog: function () {
      this.card = {
        title: '',
        description: '',
        tag: '',
        assignee: ''
      }
      this.$emit('close-dialog')
    }
  },
  computed: {
    tags: function () {
      return ['High priority', 'Medium priority', 'Low priority']
    }
  },
  mounted() {
    this.getWorkspaceMembers()
    console.log(this.board)
  }
}
</script>

<style scoped>

</style>