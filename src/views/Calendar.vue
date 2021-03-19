<template>
  <v-calendar
      ref="calendar"
      v-model="focus"
      color="primary"
      :events="events"
      :event-color="getEventColor"
      :type="type"
      @click:event="showEvent"
      @click:more="viewDay"
      @click:date="viewDay"
      @change="updateRange"
  ></v-calendar>
</template>

<script>
export default {
name: "Calendar"
}
</script>

<style scoped>

</style>