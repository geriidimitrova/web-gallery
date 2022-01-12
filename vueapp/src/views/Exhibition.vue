<template>
  <div class="row container exhibition">
    <div class="card col s12" style="margin-top: 10rem;">
      <div class="card-content">
        <div class="responsive" v-for="item in items" :key="item.id">
          <div class="gallery">
            <a target="_blank" :href="getImage(item)">
              <img :src="getImage(item)" :alt="item.name" width="600" height="400">
            </a>
            <div class="desc">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/index";
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    getImage(app) {
      return `http://localhost:8081/${app.fileName}`;
    },
  },
  mounted() {
    DataService.getItemsByEvent(this.$router.params.id)
      .then((response) => {
          this.items = response.data;
      })
      .catch((e) => {
          console.log(e);
      });
  },
};
</script>

<style scoped>

</style>
