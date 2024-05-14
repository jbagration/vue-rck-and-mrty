<template>
  <div>
	<div class="container">
		<EventCard v-for="event in events" :key="event.id" :event="event" />
	</div>

</div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
	name: "CardList",
	components: {
		EventCard
	},
  data() {
    return {
      events: [],
      filteredEvents: [],
      page: 1,
      totalPages: 1,
      hasMorePages: true,
      nameFilter: "",
      statusFilter: ""
    };
  },
  created() {
    this.getPage();
  },
	methods: {
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
		},
    getPage() {
      EventService.getEventsPage(this.page)
        .then((response) => {
          this.events = response.data.results;
          this.hasMorePages = response.data.info.next !== null;
          this.totalPages = response.data.info.pages;
          this.applyFilters();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    applyFilters() {
      this.filteredEvents = this.events.filter((event) => {
        let namePasses = true;
        let statusPasses = true;

        if (this.nameFilter) {
          namePasses = event.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        }

        if (this.statusFilter) {
          statusPasses = event.status === this.statusFilter;
        }

        return namePasses && statusPasses;
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles.scss";

.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 24px;
}

.btn-container {
	display: flex;
	justify-content: center;
	margin-bottom: 20px; 
}

button {
	background-color: #5cc70c;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
	margin: 0 10px; 
}

button:hover {
	background-color: #388e3c;
}

button:disabled {
	background-color: #ccc;
	color: #666;
	cursor: not-allowed;
}
</style>
