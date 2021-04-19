<template>
  <v-hover v-slot="{ hover }">
    <v-card @click="$emit('clickedOn')" class="text-capitalize pa-4 ma-2 v-card--hover" outlined width="300">
      <v-card-title>
        {{ post.name }}
      </v-card-title>
      <v-card-subtitle>
        {{date}}
      </v-card-subtitle>
      <v-card-subtitle>
        <v-chip x-small :color="statusColor">{{post.status}}</v-chip>
      </v-card-subtitle>

      <v-img
          v-if="hasImg"
          :aspect-ratio="16/9"
          class="rounded"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgAi_LMISHBg_Jn8jFuMeKJ0lkmkbnkOV5Q&usqp=CAU"
      >
        <v-expand-transition>
          <div
              v-if="hover"
              class="transition-fast-in-fast-out white darken-2 v-card--reveal"
              style="height: 100%;"
          >
            <v-card-text>
              <div class="postText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et, doloribus ut necessitatibus tenetur
                dignissimos libero pariatur excepturi soluta alias reprehenderit eligendi porro minus veniam
                perspiciatis quis tempore nostrum harum commodi autem sint adipisci! Quisquam possimus nisi quia, error
                voluptas saepe! Officia, dolore. Alias perferendis, officia doloribus voluptatibus consectetur aliquam
                tempora, amet, nihil vero sint quia tempore exercitationem veniam incidunt!
              </div>
            </v-card-text>
            <v-card-actions v-if="hasImg">
              <v-spacer></v-spacer>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn icon>
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>See Post</span>
              </v-tooltip>


              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Delete Post</span>
              </v-tooltip>


              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn icon>
                      <v-icon>mdi-message-settings</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Edit Post</span>
              </v-tooltip>
            </v-card-actions>
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text v-else class="mb-11">
        <div class="postText" style="-webkit-line-clamp: 1;">
          {{ post.caption }}
        </div>

      </v-card-text>

      <v-card-actions v-if="!hasImg">
        <v-avatar size="30" class="mr-2">
          <v-img v-if="post.owner.profile_picture" :src="imageUrl"></v-img>
          <v-icon v-else>mdi-account</v-icon>
        </v-avatar> {{post.owner.first_name}} {{post.owner.last_name}}
<!--        <v-spacer></v-spacer>-->
<!--        <v-tooltip bottom>-->
<!--          <template v-slot:activator="{ on }">-->
<!--            <div v-on="on">-->
<!--              <v-btn icon>-->
<!--                <v-icon>mdi-eye</v-icon>-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </template>-->
<!--          <span>See Post</span>-->
<!--        </v-tooltip>-->


<!--        <v-tooltip bottom>-->
<!--          <template v-slot:activator="{ on }">-->
<!--            <div v-on="on">-->
<!--              <v-btn icon>-->
<!--                <v-icon>mdi-delete</v-icon>-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </template>-->
<!--          <span>Delete Post</span>-->
<!--        </v-tooltip>-->


<!--        <v-tooltip bottom>-->
<!--          <template v-slot:activator="{ on }">-->
<!--            <div v-on="on">-->
<!--              <v-btn icon>-->
<!--                <v-icon>mdi-message-settings</v-icon>-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </template>-->
<!--          <span>Edit Post</span>-->
<!--        </v-tooltip>-->
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>

import axios from "axios";

export default {
  name: "Post",
  components: {},
  props: {
    post: Object
  },
  data() {
    return {
      hasImg: false
    }
  },
  computed: {
    date: function () {
      return new Date(this.post.created_at).toLocaleString('en-En',
          {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
    },
    imageUrl: function () {
      return axios.defaults.baseURL + this.post.owner.profile_picture
    },
    statusColor: function () {
      const colors = {
        'Drafts': 'info',
        'Published': 'primary'
      }
      return colors[this.post.status]
    }
  },
  methods: {}
}
</script>

<style>
.postText {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>