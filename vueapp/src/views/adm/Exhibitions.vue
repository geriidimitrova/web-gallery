<template>
    <div class="container">
        <div class="row">
            <div class="card col s12" style="margin-top: 10rem;">
                <div class="card-content">
                    <div class="card-title">
                        <span>Exhibitions</span>
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
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="es in exhibitions" :key="es.id">
                                <td>{{es.id}}</td>
                                <td>{{es.title}}</td>
                                <td>{{es.description}}</td>
                                <td>{{es.status}}</td>
                                <td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" @click="selected = es, action = 'edit'">Edit</a></td>
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
                            <span v-if="action === 'create'">Create new exhibition</span>
                            <span v-else>Edit exhibition {{selected.title}}</span>
                        </h4>
                        <a class="modal-close waves-effect waves-green btn-flat right">x</a>
                    </div>
                </div>
                <form class="row">
                    <div class="col s12 m11">
                        <span class="red-text" v-if="error"> {{error}}</span>
                        <div class="row">
                            <div class="input-field col s12" :class="{invalid: $v.selected.title.$error}">
                                <input id="title" type="text" v-model="selected.title">
                                <label for="title" :class="{active: selected.title}">Title</label>
                            </div>
                            <div class="validator col s12 offset-m1">
                                <div class="red-text" v-if="$v.selected.title.$error">
                                    <p v-if="!$v.selected.title.required">Title must not be empty.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="description" type="text"  v-model="selected.description">
                                <label for="description" :class="{active: selected.description}">Description</label>
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
import { required } from 'vuelidate/lib/validators';
import DataService from "../../services/index";

export default {
    data() {
        return {
            showEditModal: false,
            selected: {},
            action: '',
            error: '',
            exhibitions: [],
        }
    },
    validations() {
        const validations = {
            selected: {
                title: {
                    required,
                },
            },
        };
        return validations;
    },
    methods: {
        getExhibitions() {
            DataService.getAllEvents()
                .then((response) => {
                    this.exhibitions = response.data;
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
                DataService.createEvent(payload)
                    .then(() => {
                        this.$M.toast({ html: "Exhibition created successfully", classes: 'toast-seccess' });
                    })
                    .catch((error) => { this.error = error.response.data.message; });
            } else {
                DataService.updateEvent(payload.id, payload)
                    .then(() => {
                        this.$M.toast({ html: "User updated successfully", classes: 'toast-seccess' });
                    })
                    .catch((error) => { this.error = error.response.data.message; });
            }
        },
    },
    mounted() {
        this.getExhibitions();
        this.$M.Modal.init(document.querySelector('.modal'));
    },
}
</script>