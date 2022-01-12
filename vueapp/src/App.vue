<template>
  <div id="app">
    <div class="page">
      <Header />
      <main>
        <transition
          :name="transitionName"
          mode="out-in">
          <slot/>
          <router-view />
        </transition>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

const DEFAULT_TRANSITION = 'fade';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      defaultTitle: document.title,
    };
  },
  methods: {
    getTitle(route) {
      if (typeof route.meta.title === 'function') {
        return route.meta.title(this.$route.params);
      }
      return route.meta.title;
    },
  },
  watch: {
    $route(to) {
      
      if (to.meta.title) {
        document.title = `${this.getTitle(to)} | ${this.defaultTitle}`;
      }
    },
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },
}

</script>

<style>
  @import "./assets/css/styles.css"; 
  html,body { height: 100%; margin: 0px; padding: 0px; }
  #app { height: 100%; }
  .page {
    background-image: url('./assets/background.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;  
    background-size: cover;
    height: 100%;
  }
</style>
