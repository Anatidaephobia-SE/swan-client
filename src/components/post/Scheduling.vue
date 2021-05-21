<template>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="show"
        max-width="1000"
        
    >

        <v-card>
            <v-card-title>
                <v-icon class="mr-2">mdi-clock</v-icon>
                Select A Time To Schedule
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="pa-md-4">
            
            <v-row>
                <v-col>
                    <v-card-title>
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

            <v-card-text v-if="this.selected_date != null && this.selected_time != null">
                <span style="font-size: 20px">Post will publish on {{this.selected_date.toString()}} {{this.selected_time.toString()}}</span>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    depressed
                    color="primary"
                >
                    Schedule
                </v-btn>
            </v-card-actions>
        </v-container>
                
        </v-card>

    </v-dialog>
</template>

<script>

export default {
    name: "Scheduling",
    data() {
        return {
            selected_time: Date,
            selected_date: new Date().toISOString().substr(0, 10),
            show: true,
            now: Date.now()
        }
    },

    mounted() {
        this.selected_time = null;
        this.selected_date = null;
    },

    methods: {

    }
}
</script>

<style scoped>
v-dialog {
    height: fit-content;
}
</style>