<template>
  <div class="container">
    <div class="event-card">
      <h4>{{ event ? event.name : "" }}</h4>
      <div class="status">
        <span
          :class="
            statusColor === 'Unknown'
              ? ''
              : statusColor === 'Alive'
              ? 'statusGreen'
              : 'statusRed'
          "
        ></span>
        <span>Status: {{ event ? event.status : "" }}</span>
      </div>
      <img :src="event ? event.image : ''" alt="Character Image" />
      <nav class="nav-details">
        <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
          <button type="button" class="button">Details</button>
        </router-link>
        <router-link :to="{ name: 'EventLocation', params: { id: event.id } }">
          <button type="button" class="button">Location</button>
        </router-link>
      </nav>
      <router-view :event="event" />
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: ["id"],
  data() {
    return {
      event: null,
      statusColor: null
    };
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data;
        this.statusColor = this.event.status;
      })
      .catch(error => {
        console.log(error);
        this.$router.push({
          name: "404Resource",
          params: { resource: "event" }
        });
      });
  }
};
</script>
<style scoped>
.event-card {
    font-family: Arial, sans-serif; 
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; 
}

.statusGreen,
.statusRed {
    margin: auto 0;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.375rem;
    background: rgb(214, 61, 46);
    border-radius: 50%;
    transition: background 0.3s ease; 
}

.statusGreen {
    background: rgb(92 199 12);
}
</style>
