<template>
  <router-link
    class="event-link"
    :to="{
      name: 'EventDetails',
      params: { id: event.id }
    }"
  >
    <div class="event-card">
      <img :src="event.image" />

      <h4>{{ event.name }}</h4>
      <div class="status">
        <span v-if="statusColorR" class="status-icon-r"></span>
        <span v-else-if="statusColorG" class="status-icon-g"></span>
        <span>Status: {{ event.status }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusColorR() {
      return this.event.status === "Dead";
    },
    statusColorG() {
      return this.event.status === "Alive";
    }
  }
};
</script>

<style>
.event-card {
	width: 280px;
	height: auto;
	min-height: 400px;
	background: #37946a;
	border-radius: 15px;
	overflow: hidden;
	padding: 15px;
	margin-bottom: 20px;
	margin-right: 10px;
	transition: all 0.2s linear;
	cursor: pointer;
	color: white;
}

.status {
	display: flex;
	justify-content: center;
	margin-top: 8px;
}

.status-icon-r,
.status-icon-g {
	margin: auto 0;
	height: 0.5rem;
	width: 0.5rem;
	margin-right: 0.375rem;
	background: rgb(214, 61, 46);
	border-radius: 50%;
}

.status-icon-g {
	background: rgb(92 199 12);
}

img {
	margin-top: 10px;
	width: 100%;
	border-radius: 10px;
}

.event-card:hover {
	transform: scale(1.05);
	box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.3), 0 2px 15px 0 rgba(0, 0, 0, 0.29);
}

.event-card > .title {
	margin: 15px 0;
	font-size: 18px;
}

.event-link {
	color: #333;
	text-decoration: none;
	font-weight: bold;
}
</style>
