<template>
  <div id="app">
    <button @click="goHome" class="button">Home</button>
    <nav class="filter-nav">
      <!-- Форма для фильтрации по имени и статусу -->
      <input type="text" v-model="filters.name" placeholder="Name" class="filter-input">
      <select v-model="filters.status" class="filter-select">
        <option value="">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>
      <button @click="applyFilters" class="filter-button">Apply</button>
    </nav>
    <div class="btn-container">
      <button :disabled="page <= 1" @click="firstPage" class="nav-button">First Page</button>
      <button :disabled="page <= 1" @click="prevPage" class="nav-button">Prev {{ page > 1 ? page - 1 : 1 }}</button>
      <button :disabled="!hasMorePages" @click="nextPage" class="nav-button">Next {{ page + 1 }}</button>
      <button :disabled="!hasMorePages" @click="lastPage" class="nav-button">Last Page</button>
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
  gap: 10px;
}

.filter-input {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.filter-input:focus {
  border-color: #5cc70c;
  box-shadow: 0 0 5px rgba(92, 199, 12, 0.5);
  outline: none;
}

.filter-select {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.filter-select:focus {
  border-color: #5cc70c;
  box-shadow: 0 0 5px rgba(92, 199, 12, 0.5);
  outline: none;
}

.filter-button {
  background-color: #5cc70c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.filter-button:hover {
  background-color: #4aad09;
  transform: translateY(-2px);
}

.btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-button {
  background-color: #5cc70c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:disabled {
  background-color: #ccc;
}

.nav-button:hover:not(:disabled) {
  background-color: #4aad09;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.event-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.event-image {
  width: 100%;
  border-radius: 10px;
}

.status {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.status-icon-r {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-right: 5px;
}

.status-icon-g {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  margin-right: 5px;
}

.loading {
  font-size: 24px;
  color: #5cc70c;
  margin-top: 20px;
  animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
