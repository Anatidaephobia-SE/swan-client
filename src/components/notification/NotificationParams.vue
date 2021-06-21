<template>
  <v-container class="pa-md4">
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Text And Multimedia
    </v-card-title>
    <v-card-text style="max-width: 720px; margin: auto">
        
        
        
      <p>Name your notification</p>
      <v-text-field v-model="post.name"
                    :disabled="!canEdit"
                    :rules="nameRule"
                    ref="notificationName"
                    filled
                    label="Name"
                    placeholder="Send discount notification"
                    @input="setPostData">
      </v-text-field>


      <p>Fill with your RESTful APIs</p>
      <v-text-field v-model="post.name"
                    :disabled="!canEdit"
                    :rules="nameRule"
                    ref="name"
                    filled
                    label="URL"
                    placeholder="example: https://example.com/get-users"
                    @input="setPostData">
      </v-text-field>

      <p>Enter your notification text with desire variables for sending to your list of users.</p>
      <v-textarea
          v-model="post.caption"
          :disabled="!canEdit"
          :rules="rule"
          ref="caption"
          auto-grow counter
          filled
          label="Notification Test"
          placeholder="Hi dear ${username} we recently set discount for our new T-shirts if you interset checkout our site at ${site_url}."
          @input="setPostData">
      </v-textarea>
    </v-card-text>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
import PhotoPicker from "@/components/post/PhotoPicker";
import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "PostData",
  components: {UserAvatar, PhotoPicker},
  data() {
    return {
      valid: false,
      image: [],
      addImage: true,
      photoGalleryDialog: false,
      rule: [
        v => !!v || 'This field is required',
        v => (v || '').length <= 250 || 'Maximum length is over !'
      ],
      nameRule: [
        v => !!v || 'This field is required',
        v => (v || '').length >= 4 || 'Name must be at least 4 character'
      ]
    }
  },
  created() {
  },
  methods: {
    setPostData: function () {
      const post = {
        name: this.post.name,
        caption: this.post.caption,
        tag: this.post.tag,
        multimedia: this.post.multimedia,
        team: this.$route.params.workspace
      }
      this.$store.commit('post/SET_POST_DATA', post);
    },
    multimediaAdded: function () {
      console.log(this.image)
      this.post.multimedia.push(this.image)
      this.image = ''
      this.setPostData()
    },
    removeImage: function (index) {
      this.post.multimedia.splice(index, 1)
    },
  },
  computed: {
    ...mapState('post', ['author', 'post', 'canEdit']),
    imageUrl: function () {
      return axios.defaults.baseURL + this.author.profile_picture;
    },
    multimedia: function () {
      const media = []
      for (const img of this.post.multimedia) {
        if (img.hasOwnProperty('media')) {
          media.push(axios.defaults.baseURL + img.media)
        } else {
          media.push(URL.createObjectURL(img))
        }
      }
      return media
    },
    date: function () {
      return new Date(this.post.created_at).toLocaleString('en-En')
    },
    tags: function () {
      return ['-', 'Sales', 'Ads', 'Branding', 'News', 'Quote', 'Celebration']
    },
    addImageMenu: function () {
      return [
        {label: 'Upload an image', func: () => this.$refs.imageInput.$refs.input.click()},
        {
          label: 'Use library', func: () => this.photoGalleryDialog = true
        }
      ]
    }
  },
  watch: {
    'post.multimedia': function () {
      this.addImage = this.post.multimedia.length < 4;
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