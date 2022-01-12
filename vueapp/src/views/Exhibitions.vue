<template>
  <div class="row container">
    <div class="card col s12" style="margin-top: 10rem;">
      <div class="card-content">
        <div class="card-title">
          <span>Apply for exhibition</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ex in exhibitions" :key="ex.id">
              <td>{{ex.title}}</td>
              <td>{{ex.description}}</td>
              <td>
                <router-link :to="'/exhibitions/'+ ex.id" 
                             :class="{ active: isActive('exhibitions') }"
                              class="waves-effect waves-light btn">View
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/index";

export default {
  data() {
    return {
      search: '',
      selected: {},
      exhibitions: [],
    }
  },
  methods: {
    isActive(path) {
      const regexp = RegExp(`^/${path}`);

      if (path === 'home' && this.$route.path === '/'){
        return true;
      }

      return regexp.test(this.$route.path);
    },
    getExhibitions() {
      DataService.getAllEvents()
        .then((response) => {
            this.exhibitions = response.data;
        })
        .catch((e) => {
            console.log(e);
        });
    },
    getImage(app) {
      return `http://localhost:8081/${app.fileName}`;
    },
  },
  mounted() {
    this.getExhibitions();
  },
};
</script>

<style scoped>
.active {
  font-weight: bolder;
}

div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
}
</style>
