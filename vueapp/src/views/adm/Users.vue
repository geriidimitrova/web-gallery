<template>
    <div class="container">
        <div class="row">
            <div class="card col s12" style="margin-top: 10rem;">
                <div class="card-content">
                    <div class="card-title">
                        <span>Users Administration</span>
                    </div>
                    <a class="waves-effect waves-light btn modal-trigger right"
                        @click="selected = {}, action = 'create'"
                        href="#modal1"
                        style="margin-top: 20px; margin-bottom: 20px;">Add new
                    </a>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is active</th>
                                <th>Is admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.isActive}}</td>
                                <td>{{user.isAdmin}}</td>
                                <td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" @click="selected = user, action = 'edit'">Edit</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <div class="row">
                    <div class="col s12">
                        <h4 class="left">
                            <span v-if="action === 'create'">Create new user</span>
                            <span v-else>Edit {{selected.name}}</span>
                        </h4>
                        <a class="modal-close waves-effect waves-green btn-flat right">
                            <i class="material-icons">close</i>
                        </a>
                    </div>
                </div>
                <form class="row">
                    <div class="col s12 m11">
                        <span class="red-text" v-if="error"> {{error}}</span>
                        <div class="row">
                            <div class="input-field col s12" :class="{invalid: $v.selected.name.$error}">
                                <input id="name" type="text" v-model="selected.name">
                                <label for="name" :class="{active: selected.name}">Name</label>
                            </div>
                            <div class="validator col s12 offset-m1">
                                <div class="red-text" v-if="$v.selected.name.$error">
                                    <p v-if="!$v.selected.name.required">Name must not be empty.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12" :class="{invalid: $v.selected.email.$error}">
                                <input id="email" type="text"  v-model="selected.email">
                                <label for="email" :class="{active: selected.email}">Email</label>
                            </div>
                            <div class="validator col s12 offset-l1 offset-m1">
                                <div class="red-text" v-if="$v.selected.email.$error">
                                    <p v-if="!$v.selected.email.required">Email must not be empty.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="action === 'create'">
                            <div class="input-field col s12" :class="{invalid: $v.selected.password.$error}">
                                <input id="password" type="password"  v-model="selected.password">
                                <label for="password" :class="{active: selected.password}">Password</label>
                            </div>
                            <div class="validator col s12 offset-l1 offset-m1">
                                <div class="red-text" v-if="$v.selected.password.$error">
                                    <p v-if="!$v.selected.password.required">Password must not be empty.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12" :class="{invalid: $v.selected.isActive.$error}">
                                <input id="isActive" type="text"  v-model="selected.isActive">
                                <label for="isActive" :class="{active: selected.isActive}">Is active</label>
                            </div>
                            <div class="validator col s12 offset-l1 offset-m1">
                                <div class="red-text" v-if="$v.selected.isActive.$error">
                                    <p v-if="!$v.selected.isActive.required">Field must not be empty.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12" :class="{invalid: $v.selected.isAdmin.$error}">
                                <input id="isAdmin" type="text"  v-model="selected.isAdmin">
                                <label for="isAdmin" :class="{active: selected.isAdmin}">Is admin</label>
                            </div>
                            <div class="validator col s12 offset-l1 offset-m1">
                                <div class="red-text" v-if="$v.selected.isAdmin.$error">
                                    <p v-if="!$v.selected.isAdmin.required">Field must not be empty.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a class="waves-effect waves-green btn-flat" @click="save()">Save</a>
                <a class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    </div>
</template>


<script>
import { required, email } from 'vuelidate/lib/validators';
import DataService from "../../services/index";

export default {
    data() {
        return {
            showEditModal: false,
            selected: {},
            action: '',
            error: '',
            users: [],
        }
    },
    validations() {
        const validations = {
            selected: {
                name: {
                    required,
                },
                email: {
                    required,
                    email,
                },
                isActive: { 
                    required,
                },
                isAdmin:{ 
                    required, 
                }
            },
        };
        if (this.action === 'create') {
            validations.selected.password = { required }
        }
        return validations;
    },
    methods: {
        getUsers() {
            DataService.getAllUsers()
                .then((response) => {
                    this.users = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        save() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            const payload = { ... this.selected };

            if (this.action === 'create') {
                DataService.createUser(payload)
                    .then(() => {
                        this.$M.toast({ html: "User created successfully", classes: 'toast-seccess' });
                    })
                    .catch((error) => { this.error = error.response.data.message; });
            } else {
                DataService.updateUser(payload.id, payload)
                    .then(() => {
                        this.$M.toast({ html: "User updated successfully", classes: 'toast-seccess' });
                    })
                    .catch((error) => { this.error = error.response.data.message; });
            }
        },
    },
    mounted() {
        this.getUsers();
        this.$M.Modal.init(document.querySelector('.modal'));
    },
}
</script>