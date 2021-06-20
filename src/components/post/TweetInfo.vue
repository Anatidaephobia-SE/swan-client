<template>
  <v-container class="pd-md-4">

    <v-card-title>
      <v-icon class="mr-2">
        mdi-information-outline
      </v-icon>
      Post Analytics
    </v-card-title>
    <v-card-text>

      <v-expansion-panels flat>
        <v-expansion-panel
            v-for="(item,i) in socialMedia"
            :key="i">
          <v-expansion-panel-header>
            <div>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
              {{ item.label }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container class="justify-center d-flex">
              <div class="text-center mx-2">
                <v-icon
                    class="mx-2">mdi-heart
                </v-icon>
                <span>{{ tweet_info.like_count }}</span>
              </div>
              <div class="text-center mx-2">
                <v-icon
                    class="mx-2">mdi-comment
                </v-icon>
                <span>{{ tweet_info.reply_count }}</span>
              </div>
              <div class="text-center mx-2">
                <v-icon
                    class="mx-2"
                >mdi-format-quote-open
                </v-icon>
                <span>{{ tweet_info.quote_count }}</span>
              </div>
              <div class="text-center mx-2">
                <v-icon
                    class="mx-2"
                >mdi-repeat
                </v-icon>
                <span>{{ tweet_info.retweet_count }}</span>
              </div>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card-text>
  </v-container>
</template>


<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "TweetInfo",
  data() {
    return {
      tweet_info: {}
    }
  },

  mounted() {
    if (this.post.status === 'Published') {
      this.getTweetInfo();
    }
  },

  methods: {
    getTweetInfo: function () {
      const postId = this.$route.query.pID;
      axios.get(`api/v1/socialmedia/twitter/tweet/?post_id=${postId}`).then(
          resp => {
            this.tweet_info = resp.data;
          }
      )
    }
  },
  computed: {
    ...mapState('post', ['post']),
    socialMedia: () => [
      {label: 'Twitter', icon: 'mdi-twitter', color: 'blue'}
    ],
  }
}
</script>

<style scoped>

.dialog {
  background-color: #e1e8e4;
  width: 25px;
  height: 5px;
  border-radius: 5px;
  font-size: 5px;
  padding: 5px;
}

.number {
  margin-left: 30px;
  font-size: 22px;
}

</style>