<template>
  <div id="app">
    <button @click="goHome" class="button">Home</button>
    <nav class="filter-nav">
      <!-- Форма для фильтрации по имени и статусу -->
      <input type="text" v-model="filters.name" placeholder="Name">
      <select v-model="filters.status">
        <option value="">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>
      <button @click="applyFilters">Apply</button>
    </nav>
    <div class="btn-container">
      <button :disabled="page <= 1" @click="firstPage">First Page</button>
      <button :disabled="page <= 1" @click="prevPage">Prev {{ page > 1 ? page - 1 : 1 }}</button>
      <button :disabled="!hasMorePages" @click="nextPage">Next {{ page + 1 }}</button>
      <button :disabled="!hasMorePages" @click="lastPage">Last Page</button>
    </div>
    <div class="container">
      <router-link
        v-for="event in events"
        :key="event.id"
        :to="{ name: 'EventDetails', params: { id: event.id }}"
        class="event-link"
      >
        <div class="event-card">
          <img :src="event.image" />
          <h4>{{ event.name }}</h4>
          <div class="status">
            <span v-if="event.status === 'Dead'" class="status-icon-r"></span>
            <span v-else-if="event.status === 'Alive'" class="status-icon-g"></span>
            <span>Status: {{ event.status }}</span>
          </div>
        </div>
      </router-link>
<router-view :results="results" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filters: {
        name: "",
        status: ""
      },
      events: [],
      page: 1,
      totalPages: 1,
      hasMorePages: true,
      loading: false // Add loading state
    };
  },
  methods: {
    async applyFilters() {
      this.page = 1;
      this.getPage();
    },
    async getPage() {
      this.loading = true; // Set loading to true before fetching data
      try {
        const response = await axios.get("https://rickandmortyapi.com/api/character", {
          params: {
            name: this.filters.name,
            status: this.filters.status,
            page: this.page
          }
        });

        this.events = response.data.results.map(character => ({
          id: character.id,
          name: character.name,
          status: character.status,
          image: character.image
        }));
        this.totalPages = response.data.info.pages;
        this.hasMorePages = this.page < this.totalPages;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false; // Set loading to false after fetching data
      }
    },
    goHome() {
      this.$router.push({ name: 'CardList' });
    },
    nextPage() {
      if (this.hasMorePages) {
        this.page++;
        this.getPage();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.getPage();
      }
    },
    firstPage() {
      if (this.page > 1) {
        this.page = 1;
        this.getPage();
      }
    },
    lastPage() {
      if (this.hasMorePages) {
        this.page = this.totalPages;
        this.getPage();
      }
    }
  }
};
</script>

<style>
#app {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	text-align: center;
	color: #333;
	background-color: #e7e8e6;
	padding: 20px;
}

.filter-nav {
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.filter-form {
	display: flex;
	align-items: center;
}

.filter-input,
.filter-select,
.filter-button {
	padding: 8px 16px;
	border-radius: 4px;
	font-size: 14px;
}

.filter-input,
.filter-select {
	border: 1px solid #ccc;
	margin-right: 10px;
}

.btn-container {
	margin-top: 20px;
}

.prev-button,
.next-button {
	background-color: #5cc70c;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
	margin: 0 10px;
}

</style>
