<template>
  <div class="header">            
    <nav class="top-nav" role="navigation">
      <div class="">
        <ul id="nav-mobile">
          <li>
            <router-link to="/home" :class="{ active: isActive('home') }">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/exhibitions" :class="{ active: isActive('exhibitions') }">
              Exhibitions
            </router-link>
          </li>
          <li>
            <router-link to="/apply" :class="{ active: isActive('apply') }">
              Apply
            </router-link>
          </li>
          <li class="dropdown" v-if="currentUser">
            <a class="dropbtn" :class="{ active: isActive('adm') }">Administration</a>
            <div class="dropdown-content">
              <router-link to="/adm/applications">
                Applications
              </router-link>
              <router-link to="/adm/approved">
                Approved
              </router-link>
              <router-link to="/adm/rejected">
                Rejected
              </router-link>
              <router-link to="/adm/exhibitions">
                Exhibitions
              </router-link>
              <router-link to="/adm/users" v-if="currentUser.isAdmin === 'yes'">
                Users
              </router-link>
            </div>
          </li> 
          <li v-if="!currentUser" class="right">
            <router-link to="/login">
              Log In
            </router-link>
          </li>
          <div v-if="currentUser" class="right">
            <li><b>Welcome {{currentUser.name}}</b></li>
            <li><a @click="logout()"> Log Out </a>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    currentUser() {
      return  sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
    },
  },
  methods: {
    isActive(path) {
      const regexp = RegExp(`^/${path}`);

      if (path === 'home' && this.$route.path === '/'){
        return true;
      }

      return regexp.test(this.$route.path);
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/home');
        })
        .catch((error) => this.error = error);
    }
  }
};
</script>

<style scooped>
.active {
  font-weight: bolder;
}
.dropdown-content {
  display: none;
  position: absolute ;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
  float: none;
  color: white;
  text-decoration: none;
  display: block;
  text-align: left;
  line-height: 40px;
  background-color: #fff3;
}

nav ul a:hover, .dropdown-content a:hover {
  text-decoration: underline;
}

.dropdown:hover .dropdown-content {
  display: block;
}


</style>
