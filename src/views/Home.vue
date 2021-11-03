<template>
  <div class="container">
    <div class="card-group">
      <!-- card componnet -->
      <card
        v-for="{ id, title, activity, points, participants } in activities"
        :key="id"
      >
        <template v-slot:card-image>
          <div class="content-image">
            <img :src="JSON.parse(activity).image[0]" alt="" />
          </div>
        </template>

        <template v-slot:card-title>
          <div class="content-middle">
            <h1>{{ title }}</h1>
            <template v-if="participants === 1">
              <icon class="icon-peron" name="person" />
            </template>
            <template v-else-if="participants === 2">
              <icon class="icon-person" name="persons" />
            </template>
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
var parse = require("parse-link-header");
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
.container {
  margin-top: 5%;
  margin-left: 13%;
  margin-right: 13%;
  @media (max-width: 850px) {
    margin-left: 5%;
    margin-right: 5%;
  }
}
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
</style>
