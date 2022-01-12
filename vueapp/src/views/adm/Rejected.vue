<template>
    <div class="container">
        <div class="row">
            <div class="card col s12" style="margin-top: 10rem;">
                <div class="card-content">
                    <div class="card-title">
                        <span>Rejected Applications</span>
                    </div>
                    <table class="responsive-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Exhibition</th>
                                <th>Image</th>
                                <th>Rejected By</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="app in applications" :key="app.id">
                                <td>{{app.name}}</td>
                                <td>{{app.description}}</td>
                                <td>{{app.author}}</td>
                                <td>{{app.event.title}}</td>
                                <td><a :href="getImage(app)" target="_blank">View Image</a></td>
                                <td>{{app.userId}}</td>
                                <td>
                                    <a class="waves-effect waves-light btn modal-trigger" 
                                        @click="approve(app.id)">Approve
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import DataService from "../../services/index";

export default {
    data() {
        return {
            error: '',
            applications: [],
        }
    },
    methods: {
        getImage(app) {
            return `http://localhost:8081/${app.fileName}`;
        },
        getApplications() {
            DataService.getRejected()
                .then((response) => {
                    this.applications = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        approve(id) {
            DataService.approve(id)
                .then(() => {
                    this.$M.toast({ html: "Approved", classes: 'toast-seccess' });
                })
                .catch((error) => { this.error = error.response.data.message; });
        },
    },
    mounted() {
        this.getApplications();
    },
}
</script>