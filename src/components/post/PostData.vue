<template>
  <v-container v-if="!loading" class="pa-md4">
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Text And Multimedia
    </v-card-title>
    <v-card-text style="max-width: 720px; margin: auto">
      <p>This field is only for you, to find your posts quickly.</p>
      <v-text-field v-model="post.name"
                    :disabled="!canEdit"
                    :rules="nameRule"
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
          auto-grow counter
          filled
          label="Your tweet"
          @input="setPostData">
      </v-textarea>

      <p>You can add multimedia to your post.</p>
      <v-container v-if="post.multimedia.length > 0" class="d-flex flex-wrap">
        <v-card
            v-for="(img, i) in multimedia"
            :key="i"
            class="ma-1 img-card"
            elevation="0"
            outlined>
          <v-img :src="img" max-height="100px" width="200px"></v-img>
          <v-btn class="remove-btn"
                 elevation="0"
                 icon
                 small
                 @click="removeImage(i)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
      </v-container>

      <v-menu bottom offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn
              :disabled="!addImage && !canEdit"
              color="primary"
              depressed
              v-on="on"
              v-bind="attrs">
            Add image
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="(item, i) in addImageMenu"
              :key="i"
              @click="item.func">
            <v-list-item-title>{{item.label}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-file-input
          v-show="false"
          ref="imageInput"
          v-model="image"
          accept="image/*"
          @change="multimediaAdded">
      </v-file-input>

      <v-container v-if="author.email">
        <span>Created By:</span>
        <div class="ma-4 d-flex align-center">
          <v-avatar class="ma-2" size="40px">
            <v-img v-if="author.profile_picture" :src="imageUrl"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <div>
            <span>{{ author.first_name }} {{ author.last_name }}</span>
            <br>
            <span style="font-size: x-small">{{ date }}</span>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "PostData",
  data() {
    return {
      loading: false,
      valid: false,
      image: '',
      addImage: true,
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
      if (this.post.multimedia[0].hasOwnProperty('media')) {
        return this.post.multimedia.map((img) => axios.defaults.baseURL + img.media)
      }
      return this.post.multimedia.map((img) => URL.createObjectURL(img))
    },
    date: function () {
      return new Date(this.post.created_at).toLocaleString('en-En')
    },
    tags: function () {
      return ['-', 'Holiday', 'Sales', 'Ad']
    },
    addImageMenu: function () {
      return [
        {label: 'Upload an image', func: () => this.$refs.imageInput.$refs.input.click()},
        {label: 'Use library', func: () => {}}
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
    background-color: rgba(255, 0, 0, 0.6);
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>