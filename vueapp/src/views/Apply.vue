<template>
    <div class="container">
        <div class="row">
            <div class="card col s12 m8 offset-m2" style="margin-top: 10rem;">
                <div class="card-content">
                    <div class="card-title">
                        <span>Apply for exhibition</span>
                    </div>
                    <span class="red-text" v-if="error"> {{error}}</span>
                    <div class="row">
                        <div class="input-field col s12" :class="{invalid: $v.application.name.$error}">
                            <input id="name" type="text" v-model="application.name">
                            <label for="name" :class="{active: application.name}">Name</label>
                        </div>
                        <div class="validator col s12 offset-m1">
                            <div class="red-text" v-if="$v.application.name.$error">
                                <p v-if="!$v.application.name.required">Name must not be empty.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="description" type="text" v-model="application.description">
                            <label for="description" :class="{active: application.description}">Description</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" :class="{invalid: $v.application.author.$error}">
                            <input id="birth_date" type="text" v-model="application.author">
                            <label for="birth_date" :class="{active: application.author}">Author</label>
                        </div>
                        <div class="validator col s12 offset-l1 offset-m1">
                            <div class="red-text" v-if="$v.application.author.$error">
                                <p v-if="!$v.application.author.required">Author field must not be empty.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <select v-model="application.eventId">
                                <option v-for="event in events" :key="event.id" :value="event.id">{{ event.title}}</option>
                            </select>
                            <label for="cars" :class="{active: application.eventId}">Exhibition</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="file-field input-field col s12" :class="{invalid: $v.application.file.$error}">
                            <div class="btn">
                                <span>File</span>
                                <input type="file" ref="file" @change="handleFile()"/>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" v-model="application.file">
                            </div>
                        </div>
                        <div class="validator col s12 offset-l1 offset-m1">
                            <div class="red-text" v-if="$v.application.file.$error">
                                <p v-if="!$v.application.file.required">Please upload a file.</p>
                            </div>
                        </div>
                    </div>
                    <div class="btn" @click="send()">
                        Send for approval
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import DataService from "../services/index";
import FormData from 'form-data';

export default {
    data() {
        return {
            application: {},
            events: [],
            file: '',
            error: '',
        }
    },

    validations() {
        const validations = {
            application: {
                eventId: {
                    required,
                },
                name: {
                    required,
                },
                author: {
                    required,
                },
                file: {
                    required,
                },
            },
        };
        return validations;
    },
    methods: {
        handleFile() {
            if (this.$refs.file) {
                [this.file] = this.$refs.file.files;
                console.log(this.file);
            }
        },

        send() {
            var formData = new FormData();
            formData.append("name", this.application.name);
            formData.append("description", this.application.description);
            formData.append("author", this.application.author);
            formData.append("eventId", this.application.eventId);
            formData.append("file",  this.$refs.file.files[0]);
        
            DataService.createItem(formData)
                .then(() => {
                    this.$M.toast({ html: 'Application succesful', classes: 'toast-seccess' });
                })
                .catch((error) => { this.error = error.response.data.message; });
        },
    },
    mounted() {
        this.$M.Modal.init(document.querySelector('.modal'));
        document.addEventListener('DOMContentLoaded', function() {
        this.$M.FormSelect.init(document.querySelectorAll('select'));
  });
        DataService.getAllEvents()
            .then((response) => { this.events = response.data; })
            .catch((e) => { console.log(e);});
    },
}
</script>

<style>
    select {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        border-radius: 0;
        outline: none;
        height: 3rem;
        width: 100%;
        font-size: 16px;
        margin: 0 0 8px 0;
        padding: 0;
        box-shadow: none;
        box-sizing: content-box;
    }
    select:focus {
        outline: none;
    }
</style>