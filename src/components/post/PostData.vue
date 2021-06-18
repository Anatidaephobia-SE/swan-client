<template>
  <v-container class="pa-md4">
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Text And Multimedia
    </v-card-title>
    <v-card-text style="max-width: 720px; margin: auto">
      <p>This field is only for you, to find your posts quickly.</p>
      <v-text-field v-model="post.name"
                    :disabled="!canEdit"
                    :rules="nameRule"
                    ref="name"
                    filled
                    label="Name"
                    placeholder="My First Post"
                    @input="setPostData">
      </v-text-field>

      <p>Set a tag for your post, it makes them organized and easy to find.</p>
      <v-select
          v-model="post.tag"
          :disabled="!canEdit"
          :items="tags"
          filled
          label="Tag"
          @input="setPostData"
      ></v-select>

      <p>Please enter the caption you want to post, then click on the "next" button.</p>
      <v-textarea
          v-model="post.caption"
          :disabled="!canEdit"
          :rules="rule"
          ref="caption"
          auto-grow counter
          filled
          label="Your tweet"
          @input="setPostData">
      </v-textarea>

      <p>You can add multimedia to your post.</p>
      <div class="d-flex flex-wrap">
        <div v-if="post.multimedia.length > 0" class="d-flex flex-wrap">
          <v-card
              v-for="(img, i) in multimedia"
              :key="i"
              class="ma-1 img-card"
              elevation="0"
              outlined>
            <v-img :src="img" height="100px" width="200px"></v-img>
            <v-btn
                v-if="canEdit"
                class="remove-btn rounded"
                elevation="0"
                icon
                small
                tile
                @click="removeImage(i)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card>
        </div>


        <v-menu bottom offset-y>
          <template v-slot:activator="{on, attrs}">
            <v-card
                v-if="addImage && canEdit"
                v-bind="attrs"
                v-on="on"
                class="ma-1 add-img"
                height="100px"
                hover
                outlined
                width="200px">
              <v-container
                  class="d-flex justify-center align-center flex-column add-container"
                  fluid>
                <v-icon>mdi-camera-plus</v-icon>
                <span>Add Image</span>
              </v-container>
            </v-card>
          </template>

          <v-list>
            <v-list-item
                v-for="(item, i) in addImageMenu"
                :key="i"
                @click="item.func">
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <PhotoPicker :dialog="photoGalleryDialog" @close-dialog="photoGalleryDialog = false"/>

      <v-file-input
          v-show="false"
          ref="imageInput"
          v-model="image"
          accept="image/*"
          @change="multimediaAdded">
      </v-file-input>
    </v-card-text>

    <v-container v-if="author.email">
      <span>Created By:</span>
      <div class="ma-4 d-flex align-center">
        <UserAvatar
            :alt="author.first_name"
            :image="author.profile_picture"
            :size="40"
            class="mr-2">
        </UserAvatar>

        <div>
          <span>{{ author.first_name }} {{ author.last_name }}</span>
          <br>
          <span style="font-size: x-small">{{ date }}</span>
        </div>
      </div>
    </v-container>
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