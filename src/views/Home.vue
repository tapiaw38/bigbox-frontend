<template>
  <div class="container">
    <div class="card-group" v-if="activities.length !== 0">
      <!-- card componnet -->
      <card v-for="{ id, title, activity, points } in activities" :key="id">
        <template v-slot:card-image>
          <router-link
            :to="{
              name: 'detail',
              params: { id: id, allActivities: activities },
            }"
          >
            <div class="content-image">
              <img :src="JSON.parse(activity).image[0]" alt="" />
            </div>
          </router-link>
        </template>

        <template v-slot:card-title>
          <div class="content-middle">
            <h1>{{ title }}</h1>

            <icon
              v-if="JSON.parse(activity).participants === 1"
              class="icon-person"
              name="person"
            />
            <icon v-else class="icon-person" name="persons" />
          </div>
        </template>

        <template v-slot:card-location>
          <div
            class="content-location"
            v-for="(location, index) in JSON.parse(activity).locations"
            :key="index"
          >
            <icon class="icon-location" name="location" />
            <p>{{ location.address }}, {{ location.province }}</p>
          </div>
        </template>

        <template v-slot:card-description>
          <p>{{ JSON.parse(activity).category }}</p>
        </template>

        <template v-slot:card-pointer>
          <h2 class="pointer">{{ points }} Puntos</h2>
        </template>
      </card>
    </div>
    <div v-else class="loader-content">
      <div class="loader"></div>
    </div>
    <!-- Pagination -->
    <Pagination
      :page="page"
      :cutPage="cutPage"
      :pageActive="pageActive"
      :firstPage="firstPage"
      :lastPage="lastPage"
      :listPages="listPages"
      :selectPage="selectPage"
      :changePage="changePage"
    />
  </div>
</template>

<script>
//components
import Card from "@/components/Card.vue";
import Pagination from "@/components/Pagination.vue";
// api
import bigboxApi from "../api/bigboxApi";
// parser links
let parse = require("parse-link-header");
//icons
import Icon from "../components/icons/Icon.vue";
export default {
  name: "Home",
  components: {
    Card,
    Pagination,
    //icons
    Icon,
  },
  data() {
    return {
      activities: [],
      page: 1,
      pages: 9,
      limitSlices: 6,
      listPages: [],
      firstPage: 1,
      lastPage: 1,
      linkHeader: null,
      pageActive: 1,
    };
  },
  methods: {
    // get activities function
    async getActivity(
      url = `activity?_page=${this.page}&_limit=${this.pages}`
    ) {
      try {
        let res;
        res = await bigboxApi.get(url);
        this.activities = res.data;

        // load link header
        this.linkHeader = res.headers.link;

        // parse link header
        this.lastPage = Number(parse(this.linkHeader).last._page);

        // load array list pages
        if (this.listPages.length === 0) {
          for (let i = 1; i <= this.lastPage - 1; i++) {
            this.listPages.push(i);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // changed page function
    changePage(option) {
      let parsed = parse(this.linkHeader);
      switch (option) {
        case "first":
          this.getActivity(parsed.first.url);
          this.page = 1;
          this.pageActive = 1;
          break;
        case "last":
          this.getActivity(parsed.last.url);
          this.page = parsed.last._page - 7;
          this.pageActive = Number(parsed.last._page);
          break;
        case "next":
          if (!parsed.next) {
            return;
          }
          this.getActivity(parsed.next.url);
          this.pageActive = Number(parsed.next._page);
          if (parsed.next._page >= this.cutPage) {
            this.page++;
          }
          break;
        case "preview":
          if (!parsed.prev) {
            return;
          }
          this.getActivity(parsed.prev.url);
          this.pageActive = Number(parsed.prev._page);
          if (parsed.prev._page <= this.cutPage - 1 && this.page > 1) {
            this.page--;
          }
          break;
        default:
          break;
      }
    },
    //page link
    selectPage(index) {
      this.pageActive = index;

      let url = `activity?_page=${index}&_limit=${this.pages}`;

      if (index >= this.cutPage) {
        this.page++;
      } else if (index <= this.cutPage - 1 && this.page > 1) {
        this.page--;
      }

      this.getActivity(url);
    },
  },

  mounted() {
    this.getActivity();
  },
  computed: {
    cutPage() {
      return this.page + this.limitSlices;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-group {
  @include grid(3);
  gap: 1em;
  @media (max-width: 750px) {
    @include grid(1);
  }
  h1,
  p {
    text-align: left;
    font-size: 0.8em;
    font-weight: lighter;
    margin: 2%;
  }
  h1 {
    font-size: 0.9em;
    font-weight: bold;
  }

  img {
    width: 100%;
    object-fit: cover;
    height: max(2rem, 30vh);
  }
}
.content-image {
  background-color: #f5f5f5;
  height: max(2rem, 30vh);
}
.pointer {
  margin-left: 2%;
  padding-bottom: 5%;
  font-size: 0.9em;
  font-weight: bolder;
  text-align: left;
}
.content-middle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  .icon-person {
    margin-top: 3%;
  }
}
.content-location {
  display: flex;
  align-items: center;
  .icon-location {
    margin-left: 2%;
    margin-right: 1%;
  }
}

.loader-content {
  transform: translateY(30%);
  align-content: center;
  justify-content: center;
  display: flex;
  margin: 0 auto;
  width: 100vh;
  height: 100vh;
}
.loader {
  border: 16px solid $secondary; /* Light grey */
  border-top: 16px solid $primary; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
