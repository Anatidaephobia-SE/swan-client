<template>
  <v-hover v-slot="{ hover }">
    <v-card class="text-capitalize pa-4 ma-2 v-card--hover" outlined width="300">
        <v-card-title>
            Sample-title
        </v-card-title>

         <v-img
            v-if="hasImg"
            :aspect-ratio="16/9"
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et, doloribus ut necessitatibus tenetur dignissimos libero pariatur excepturi soluta alias reprehenderit eligendi porro minus veniam perspiciatis quis tempore nostrum harum commodi autem sint adipisci! Quisquam possimus nisi quia, error voluptas saepe! Officia, dolore. Alias perferendis, officia doloribus voluptatibus consectetur aliquam tempora, amet, nihil vero sint quia tempore exercitationem veniam incidunt!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati harum commodi sequi temporibus quidem nobis? Molestias ipsa provident deleniti dolores illum optio nesciunt magni impedit ipsum doloremque praesentium culpa voluptates modi error, vel mollitia quas, tempora ab asperiores odio eius nihil soluta? Quo aspernatur eos, quaerat, libero labore culpa deserunt illo autem corporis, ipsam voluptatibus. Doloribus incidunt saepe blanditiis similique.
            </div>
        </v-card-text>
        <v-card-actions v-if="!hasImg">
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

    </v-card>
  </v-hover>
</template>

<script>
export default {
    name: "Post",
    data() {
        return {
            hasImg: true
        }
    },
    created() {
        this.hasImg =  Math.random() < 0.5;
    }
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