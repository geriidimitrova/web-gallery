<template>
  <div class="row container exhibition">
    <div class="card col s12" style="margin-top: 10rem;">
      <div class="card-content">
        <div class="row">
          <div class="responsive" v-for="item in items" :key="item.id">
            <div class="gallery">
              <a target="_blank" :href="getImage(item)">
                <img :src="getImage(item)" :alt="item.name" width="600" height="400">
              </a>
              <div class="desc">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <!-- <span v-else>Sorry, but there is still no photos for this exhibition</span> -->
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
  beforeCreate() {
    DataService.findItemByEvent(this.$route.params.id)
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
div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 200px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  object-fit: cover;
  width: 200px;
  height: 200px;
}

div.desc {
  padding: 15px;
  text-align: center;
}
</style>
