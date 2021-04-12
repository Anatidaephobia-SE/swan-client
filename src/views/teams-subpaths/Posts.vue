<template>
    <v-container>
        <v-row>
            <v-col v-for="i in 20" :key="i" cols="12" xl="3" lg="3" md="4" sm="6">
                <Post />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Post from "@/components/workspaces/team/Post"

export default {
    name: "Posts",
    components: {
        Post
    }

}
</script>

<style>

</style>