<template>
    <v-container class="pd-md-4">
        <v-card 
            class="mx-auto ma-4"
            :max-width="width">
            <v-toolbar :max-width="width"
                color="primary"
                dark
                dense
                flat
                >
                <v-toolbar-title class="body-3" style="color: white;">
                    Post Analytics
                </v-toolbar-title>
            </v-toolbar>
            <v-spacer></v-spacer>
            <br>
            <v-row class="pa-2" style="margin-left: 10px;">
                <v-icon>mdi-comment-outline</v-icon>
                <span v-if="width >= 220" style="margin-left: 7px;">Replies Number: </span>
                <span style="margin-left: 7px;">{{this.tweet_info.reply_count}}</span>
            </v-row>

            <v-row class="pa-2" style="margin-left: 10px;">
                <v-icon color="blue">mdi-repeat</v-icon>
                <span v-if="width >= 220" style="margin-left: 7px;">Retweets Number: </span>
                <span style="margin-left: 7px;">{{this.tweet_info.retweet_count}}</span>
            </v-row>

            <v-row class="pa-2" style="margin-left: 10px;">
                <v-icon color="red">mdi-heart-outline</v-icon>
                <span v-if="width >= 220" style="margin-left: 7px;">Likes Number: </span>
                <span style="margin-left: 7px;">{{this.tweet_info.like_count}}</span>
            </v-row>

            <v-row class="pa-2" style="margin-left: 10px;">
                <v-icon color="green">mdi-pencil</v-icon>
                <span v-if="width >= 220" style="margin-left: 7px;">Quotes Number: </span>
                <span style="margin-left: 7px;">{{this.tweet_info.qoute_count}}</span>
            </v-row>

        </v-card>

    </v-container>
</template>


<script>
import axios from "axios";
export default {
    name: "TweetInfo",
    props: ['width', 'post_id'],
    data() {
        return {
            tweet_info: {},
            show_reply: false,
            show_like: false,
            show_retweet: false,
            show_qoute: false

        }
    },

    mounted() {
        // this.tweet_info = {
        //                 'reply_count' : 25,
        //                 'retweet_count' : 14,
        //                 'qoute_count' : 7,
        //                 'like_count' : 21
        //                 }
        // this.width = 700;
        this.getTweetInfo();
    },

    methods: {
        showReply: function() {
            this.show_reply = true;
        },
        disapearReply: function() {
            this.show_reply = false;
        },
        getTweetInfo: function() {
            axios.get(`api/v1.1.0/socialmedia/twitter/tweet/?post_id=${this.post_id}`).then(
                resp => {
                    this.tweet_info = resp;
                }
            )
        }

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

</style>