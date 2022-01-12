<template>
    <div class="container">
        <div class="row">
            <div class="card col s12 m8 l6 offset-m2 offset-l3" style="margin-top: 10rem;">
                <div class="card-content">
                    <div class="card-title">
                        <span>LOGIN</span>
                    </div>
                    <div class="row red-text" v-if="error">{{error}}</div>
                    <div class="row">
                        <div class="input-field col s12" :class="{invalid: $v.email.$error}">
                            <input id="email" v-model="email" @blur="$v.email.$touch()">
                            <label for="email" :class="{active: email}">Email</label>
                        </div>
                        <div class="validator col s12">
                            <div class="red-text" v-if="$v.email.$error">
                                <p v-if="!$v.email.required">Email field must not be empty.</p>
                                <p v-if="!$v.email.email">Email field must be numeric.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" :class="{invalid: $v.password.$error}">
                            <input id="password" type="password" v-model="password" @blur="$v.password.$touch()">
                            <label for="password" :class="{active: password}">Password</label>
                        </div>
                        <div class="validator col s12">
                            <div class="red-text" v-if="$v.password.$error">
                                <p v-if="!$v.password.required">Password field must not be empty.</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" @click="login()">Log in</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
        return {
            email: '',
            password: '',
            loading: false,
            error: ''
        };
  },
    computed: {
        user() {
            return  sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
        },
    },
    validations() {
        const validations = {
            email: {
                required,
                email,
            },
            password: {
                required,
            },
        };
        return validations;
    },
    created() {
        if (sessionStorage.user) {
            this.$router.push('/home');
        }
    },
    methods: {
        login() {
           this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            this.$store.dispatch('login', { 
                email: this.email,
                password: this.password
            })
                .then(() => {
                    location.reload(); 
                })
                .catch((error) => this.error = error);
        }
    }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
