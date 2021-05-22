<template>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="displayDialpg"
        max-width="1000"
        
    >

        <v-card>
            <v-card-title>
                Select A Time To Schedule
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="pa-md-4">
            
            <v-row>
                <v-col>
                    <v-card-title>
                        <v-icon style="margin-right: 8px">mdi-calendar</v-icon>
                        Select Date:
                    </v-card-title>
                    <v-date-picker
                        color="primary"
                        :min="this.now.toString()"
                    >
                    </v-date-picker>
                </v-col>

                <v-col>
                    <v-card-title>
                        <v-icon style="margin-right: 8px">mdi-clock</v-icon>
                        Select Time:
                    </v-card-title>
                    <v-time-picker
                        format="24hr"
                        color="primary"
                        v-model="selected_time"
                        
                    >
                    </v-time-picker>
                </v-col>

            </v-row>

            <v-card-text v-if="this.selected_time.length < 7">
                <span style="font-size: 20px">Post will publish on {{this.selected_date.toString()}} - {{this.selected_time.toString()}}</span>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    depressed
                    color="accent"
                    @click="updatePost"
                >
                    Schedule
                </v-btn>
            </v-card-actions>
        </v-container>
                
        </v-card>

    </v-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Scheduling",
    props: {
        showScheduling: Boolean
    },
    data() {
        return {
            selected_time: new Date(),
            selected_date: new Date().toISOString().substr(0, 10),
            now: Date.now(),
            displayDialpg: false,
            schedule_time: ''
        }
    },

    mounted() {

    },

    computed: {
        ...mapState('post', ['post', 'to_schedule_id'])
    },

    methods: {
        schedulePost: function() {
            this.post.status = 'Drafts'
            this.createPost()
            this.updatePost()
        },
        updatePost: function () {
            this.displayDialpg = false
            this.post.status = 'Schedule';
            this.post.schedule_time = this.selected_date.toString() + " " + this.selected_time.toString() + ":00";
            console.log(this.post.schedule_time)
            this.$store.dispatch('post/updatePost').then(() => {
                const message = "Post scheduled successfully";
                this.$store.dispatch('showMessage', {message, color: 'success'});
            }).catch(err => {
                const message = err.response.data.error;
                console.log(err.response.data)
                this.$store.dispatch('showMessage', {message, color: 'error'});
            })
        },
        createPost: function () {
            this.$store.dispatch('post/createNewPost').then(() => {
                const message = "new post created successfully";
                this.$store.dispatch('showMessage', {message, color: 'success'});
            }).catch(err => {
                const message = err.response.data.error;
                this.$store.dispatch('showMessage', {message, color: 'error'});
            }).finally(() => {
            })
        }

    },

    watch: {
        showScheduling(val) {
            this.displayDialpg = val;
        },
        schedule_time(val) {
            post.schedule_time = val;
        }
    }
}
</script>

<style scoped>
v-dialog {
    height: fit-content;
}
</style>