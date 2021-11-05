<template>
  <div class="container">
    <div class="content">
      <div class="back-arrow">
        <router-link :to="{ name: 'home' }">
          <icon class="close" name="arrow-left" />
        </router-link>
      </div>
      <!--slider-->
      <div class="slider">
        <Slider :images="activity.image" />
      </div>

      <!-- title description -->
      <div class="content-description">
        <h1>{{ activity.name }}</h1>
        <p class="description">
          {{ activity.description }}
        </p>
        <div class="participants" v-if="activity.participants === 1">
          <icon class="person" name="person" />
          <p>Para {{ activity.participants }} persona</p>
        </div>

        <div class="participants" v-else>
          <icon class="person" name="persons" />
          <p>Para {{ activity.participants }} personas</p>
        </div>

        <div
          class="participants"
          v-for="(location, index) in activity.locations"
          :key="index"
        >
          <icon class="location" name="location" />
          <p>{{ location.address }}, {{ location.province }}</p>
        </div>

        <p class="point">{{ data.points }} Puntos</p>
      </div>

      <!--box description -->
      <div class="box-description">
        <h1>¿Qué incluye?</h1>
        <hr />

        <div>
          <div class="benefits" v-html="activity.benefits"></div>

          <div class="box-rules">
            <icon class="rules" name="rules" />
            <h1>Reglas:</h1>
          </div>

          <p>
            {{ activity.small_print }}
          </p>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div class="box-activities">
        <h1>Otras actividades similares:</h1>
        <div class="carousel">
          <Carousel :cards="getActivityByType" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// api
import bigboxApi from "../api/bigboxApi";
//icons
import Icon from "../components/icons/Icon.vue";
//componentes

export default {
  name: "detail",
  components: {
    Slider: () => import("../containers/Slider.vue"),
    Carousel: () => import("../containers/Carousel.vue"),
    Icon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    allActivities: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: {},
      activity: [],
      settingsCarousel: {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
      },
    };
  },
  methods: {
    async getActivity() {
      let { data } = await bigboxApi.get(`activity/${this.id}`);

      this.data = data;
      this.activity = JSON.parse(data.activity);
    },
  },
  mounted() {
    this.getActivity();
  },
  computed: {
    getActivityByType: function () {
      return this.allActivities.filter(
        (activity) =>
          activity.activity_type === this.data.activity_type &&
          activity.id !== this.data.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
/* content styles */

.content {
  @include grid(2);
  grid-template-rows: 2% auto auto auto auto;
  gap: 1em;
  height: auto;
  margin-bottom: 10%;
  @media (max-width: 750px) {
    .slider {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .content-description {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }

  .back-arrow {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    @media (max-width: 750px) {
    }

    .close {
      display: flex;
      float: left;
      cursor: pointer;
    }
  }
}

/* description styles */

.content-description {
  text-align: left;
  margin-left: 0.5em;
  h1 {
    margin: 0;
    font-size: 1.4em;
  }
  p {
    color: $gray;
    font-weight: lighter;
  }
  .description {
    font-size: 0.9em;
    text-align: justify;
  }
  .point {
    margin-top: 10%;
    font-size: 1.1em;
  }
  .participants {
    width: 100%;
    display: flex;
    text-align: center;
    vertical-align: baseline;
    position: relative;
    margin-bottom: 1em;
    p {
      display: flex;
      margin: 0;
    }
  }
}

/* icons styles */

.person,
.location {
  margin-right: 3%;
  filter: invert(50%);
}
.rules {
  filter: invert(30%);
}

/* box description styles */
.box-description {
  margin-top: 0;
  div {
    color: $gray;
    text-align: left;
  }
  h1 {
    margin-left: 0.5em;
    margin-bottom: 0;
    font-size: 1.1em;
    text-align: left;
  }
  hr {
    margin-left: 0%;
    text-align: left;
    border: 0;
    height: 2px;
    width: 8.6em;
    background-color: $primary;
  }
  p {
    font-size: 1em;
    margin-top: 2.2em;
  }
}

/* box rules styles */
.box-rules {
  margin-top: 3em;
  width: 100%;
  display: flex;
  text-align: center;
  vertical-align: baseline;
  position: relative;
  margin-bottom: 1em;
  h1 {
    @include title;
  }
}

/* activities styles */
.box-activities {
  grid-column: 1 / 3;

  h1 {
    @include title;
    text-align: left;
    margin-bottom: 0%;
  }
  .carousel {
    width: 100%;
  }
}

/* carousel */
</style>
