<template>
    <v-container class="pa-md4">
        
        <v-card-title>
            <v-icon class="mr-2" role="img" aria-hidden="false" >mdi-tie</v-icon>
            Select A Country To Get Trend Hashtags
        </v-card-title>

        <v-card-text class="text">
            <v-select
                class="select"
                :items="available_countries"
                v-model="selected"
                placeholder="Choose a country"
                
                >
            </v-select>
            <v-btn
                class="button"
                color="primary"
                :loading="loading"
                :disabled="selected == null"
                depressed
                @click="getHashtags"
                >
            Get Hashtags
            </v-btn>
            <div class="lists">
                <v-list nav dense class="hashtag-list" v-if="this.hashtags.length != 0">
                    <v-subheader style="font-size: 20px">Trends On {{this.selected}}</v-subheader>
                    
                    <v-list-item-group color="primary">

                        <v-list-item color="#68b3e8" v-for="hashtag in this.hashtags1" :key="hashtag">                        
                            <a :href="`https://twitter.com/search?q=%23${hashtag.replace('#', '')}&src=typed_query`" target="_blank">{{hashtag}}</a>
                            <v-icon @click="addToPost(hashtag)" style="margin-left: auto">mdi-plus</v-icon>
                            
                        </v-list-item>

                    </v-list-item-group>

                </v-list>
            </div>

        </v-card-text>

    </v-container>
</template>



<script>
import { mdiTrendingUp } from '@mdi/js';
import axios from "axios";
import PostDataVue from '../post/PostData.vue';

export default {
    name: "RetrieveHashtags",
    data() {
        return {
            available_countries: ['Iran', 'United States', 'Canada'],
            selected: null,
            icons: {
                mdiTrendingUp
            },
            hashtags1: [],
            hashtags2: [],
            hashtags: [],
            hashtag: '',
            loading: false
        };
    },

    methods: {
        getHashtags: function () {
            this.loading = true;
            axios.get(`api/v1.0.0/socialmedia/twitter/get_trends?location=${this.selected}`)
            .then(
                response => {
                    this.hashtags = response.data.trends;
                    var half_length = Math.ceil(this.hashtags.length / 2);
                    this.hashtags1 = this.hashtags.splice(0, half_length);
                    this.hashtags2 = this.hashtags.splice(half_length, this.hashtags.length);
                }
            )
            .finally(
                () => this.loading = false
            );

        },
        addToPost: function (hashtag) {
            const currentPost = this.$store.getters.getNewPost;
            this.$store.dispatch('setCaption', `${currentPost.caption}\n${hashtag}`);
        }
    }
};
</script>

<style scoped>

.text {
    max-width: 720px;
    margin: auto;
}
.hashtag-list {
    background: rgb(240, 236, 236);
    border-radius: 10px;
    margin-top: 20px;
}



</style>