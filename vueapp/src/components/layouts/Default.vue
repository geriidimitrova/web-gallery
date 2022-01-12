<template>
  <div class="page" :class="{ 'sidenav-control': sidenavControl === false }">
    <Header />
    <main>
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    sidenavControl() {
      return this.$store.state.sidenav;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/styles";
</style>
