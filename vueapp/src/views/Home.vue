<template>
  <div class="home">
    <div id="hero-image">
      <div class="wrapper center">
        <h2 class="banner-name">Web Gallery</h2>
        <router-link to="/exhibitions" class="button banner-btn">View Exhibitions</router-link>
      </div>
    </div>
    <div class="container row">
      <span class="center col s12 banner-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis turpis ac libero interdum, 
        id fringilla purus feugiat. Etiam malesuada mattis nibh at bibendum.</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.banner-name{
  text-align: center;
  margin-top: 420px;
  margin-bottom: 4px;
  color: white;
  font-size: 100px;
}
.banner-btn {
  color: white;
  font-size: 20px;
  text-decoration: underline;
}  
.banner-text {
  margin-top: 60px;
  color: white;
}
</style>
