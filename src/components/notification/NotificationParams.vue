<template>
  <v-container class="pa-md4">
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Notification Data
    </v-card-title>
    <v-card-text style="max-width: 720px; margin: auto">
        
        
        
      <p>Name your notification</p>
      <v-text-field v-model="notification.name"
                    :disabled="!canEdit"
                    :rules="nameRule"
                    ref="notificationName"
                    filled
                    label="Name"
                    placeholder="Send discount notification"
                    @input="setNotificationData">
      </v-text-field>

      <p>Fill with your email subject</p>
      <v-text-field v-model="notification.subject"
                    :disabled="!canEdit"
                    :rules="nameRule"
                    ref="notificationName"
                    filled
                    label="Subject"
                    placeholder="New Feature"
                    @input="setNotificationData">
      </v-text-field>


      <p>Fill with your REST-full APIs</p>
      <v-text-field v-model="notification.reciviers"
                    :disabled="!canEdit"
                    :rules="urlRule"
                    ref="name"
                    filled
                    label="URL"
                    placeholder="example: https://example.com/get-users"
                    @input="setNotificationData">
      </v-text-field>

      <p>Fill with your desire email as sender</p>
      <v-text-field v-model="notification.sender"
                    :disabled="!canEdit"
                    :rules="nameRule"
                    ref="name"
                    filled
                    label="Sender"
                    placeholder="example: yourname@example.com"
                    @input="setNotificationData">
      </v-text-field>

      <p>
        Here you you should add the text you want to send to your customers and users.
        You can specify the dynamic variables using %^variable^%.
      </p>
      <v-textarea
          v-model="notification.body_text"
          :disabled="!canEdit"
          :rules="rule"
          ref="caption"
          auto-grow counter
          filled
          label="Notification Text"
          placeholder="Hi dear %^username^%, checkout our site at %^site_url^%."
          @input="setNotificationData">
      </v-textarea>
    </v-card-text>
  </v-container>
</template>

<script>
import isURL from "validator/lib/isURL";
import {mapState} from "vuex";

export default {
  name: "NotificationParams",
  components: {},
  data() {
    return {
      valid: false,
      rule: [
        v => !!v || 'This field is required',
        v => (v || '').length <= 250 || 'Maximum length is over !'
      ],
      nameRule: [
        v => !!v || 'This field is required',
        v => (v || '').length >= 4 || 'Name must be at least 4 character'
      ],
      urlRule: [
        v => !!v || 'This field is required',
        v => isURL(v) || 'Url is invalid'
      ]
    }
  },
  created() {
  },
  methods: {
    setNotificationData: function () {
      const notification = {
        name: this.notification.name,
        body_text: this.notification.body_text,
        subject: this.notification.subject,
        template_team: this.$route.params.workspace,
        reciviers: this.notification.reciviers,
        sender: this.notification.sender
      }
      this.$store.commit('notification/SET_NOTIFICATION_DATA', notification);
    },
  },
  computed: {
    ...mapState('notification', ['owner', 'notification', 'canEdit']),
    date: function () {
      return new Date(this.notification.created_at).toLocaleString('en-En')
    }
  }
}
</script>

<style lang="scss" scoped>
.img-card {
  position: relative;

  .remove-btn {
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    right: 0;
  }
}

.add-img {
  border: dashed 1px #424242;
  border-radius: 5px;

  .add-container {
    height: 100%;
  }
}
</style>