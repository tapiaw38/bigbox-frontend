<template>
  <div class="pagination">
    <a class="pagination-change" @click="changePage('preview')">&lt;</a>
    <a @click="changePage('first')" :class="[pageActive == 1 && 'active']">{{
      firstPage
    }}</a>

    <a
      v-for="(pageLink, index) in listPages.slice(page, cutPage)"
      :key="index"
      @click="selectPage(pageLink)"
      :class="[pageActive == pageLink && 'active']"
      >{{ pageLink }}</a
    >

    <a
      @click="changePage('last')"
      :class="[pageActive == lastPage && 'active']"
      >{{ lastPage }}</a
    >
    <a class="pagination-change" @click="changePage('next')">&gt;</a>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    cutPage: {
      type: Number,
    },
    pageActive: {
      type: Number,
      default: 1,
    },
    firstPage: {
      type: Number,
      default: 1,
    },
    lastPage: {
      type: Number,
      default: 1,
    },
    listPages: {
      type: Array,
      default: () => [],
    },
    selectPage: {
      type: Function,
    },
    changePage: {
      type: Function,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  justify-content: center;
  margin-top: 2%;
  display: inline-block;

  a {
    color: $black;
    float: left;
    padding: 9px 13px;
    text-decoration: none;
    margin-left: 0.5em;
    margin-right: 0.5em;
    font-size: 0.8em;
    cursor: pointer;
  }
  a.active {
    background-color: $primary;
    color: white;
    border-radius: 50%;
  }
  a:hover:not(.active) {
    background-color: $secondary;
    border-radius: 50%;
  }
  .pagination-change {
    background-color: $primary;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5em;
    font-size: 0.8em;
    &:hover {
      background-color: $secondary;
      border-radius: 50%;
      color: $black;
    }
  }
  @media (max-width: 750px) {
    a {
      font-size: 0.7em;
      margin-left: 0.18em;
      margin-right: 0.18em;
      padding: 8px 11px;
    }
  }
}
</style>
