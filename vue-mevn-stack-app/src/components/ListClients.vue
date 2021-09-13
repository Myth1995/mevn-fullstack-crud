<template>
    <div class="row list-client">
        <div class="col-md-12">
            <div class="d-flex justify-content-between" style="margin-bottom: 20px;">
                <span style="font-size: 20px; color: cadetblue;">Clients</span>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createModal">
                    Create Clients
                </button>
            </div>

            <!-- This is Create Modal-->
            <div class="modal fade" id="createModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                  
                    <!-- Modal Header -->
                    <div class="modal-header">
                      <h4 class="modal-title">New Client</h4>
                      <!-- <button type="button" class="close" data-dismiss="modal">×</button> -->
                    </div>
                    
                    <!-- Modal body -->
                    <div class="modal-body">
                      <div class="row justify-content-center">
                        <div class="col-md-9">
                            <div class="form-group">
                                <label class="modal-form-label">Name:</label>
                                <input type="text" class="form-control" v-model="client.name" required>
                            </div>

                            <div class="form-group">
                                <label class="modal-form-label">Email:</label>
                                <input type="email" class="form-control" v-model="client.email" required>
                            </div>

                            <div class="form-group">
                                <label class="modal-form-label">Phone:</label>
                                <input type="text" class="form-control" v-model="client.phone" required>
                            </div>

                            <div class="form-group">
                                <label class="modal-form-label">Providers:</label>
                                <input type="text" class="form-control" v-model="provider_value" required>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-8" style="border-style: groove; border-radius: 5px; height: 200px;">
                                    <div v-for="data in Providers" class="form-group" :key="data.id" style="display: flex;">
                                        <input type="checkbox" name="check" :id="'checkbox'+data.id" style="margin-top: 5px; margin-right: 20px;" disabled />
                                        <span style="cursor: pointer; margin-right: 30px;" @click="onClick(data.id, data._id)">{{data.name}}</span>
                                        <!-- <img :src="editSVG" width="25" style="margin-right: 30px; cursor: pointer;" @click="onEdit(data.id)"/> -->
                                        <img :src="deleteSVG" width="20" style="cursor: pointer;" @click="onDelete(data._id)"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button class="btn btn-info" v-on:click="handleSubmitForm">Create</button>
                        <button class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    
                  </div>
                </div>
            </div>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Providers</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="client in Clients" :key="client._id">
                        <td>{{ client.name }}</td>
                        <td>{{ client.email }}</td>
                        <td>{{ client.phone }}</td>
                        <td>{{ client.providers_string}}
                        <td>
                            <router-link :to="{name: 'edit', params: { id: client._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteClient(client._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
 
    export default {
        data() {
            return {
                Clients: [],
                Providers:[], 
                client: {
                   name: '',
                   email: '',
                   phone: '',
                   providers: [],
                },

                provider_value: '',
                editSVG: require('../edit-solid.svg'),
                deleteSVG: require('../trash-alt-solid.svg'),
            }
        },
        created() {
            //Get provider list from database
            let apiURL = 'http://localhost:4000/api/provider';
            axios.get(apiURL).then(res => {
                this.Providers = res.data;
            }).catch(error => {
                console.log(error)
            });

            apiURL = 'http://localhost:4000/api';
            // Get client list from database
            axios.get(apiURL).then(res => {
                this.Clients = res.data;
            }).catch(error => {
                console.log(error)
            });

            
        },
        methods: {
            onDelete(id) {
                let indexOfArrayItem = this.Providers.findIndex(i => i._id === id);

                let apiURL = `http://localhost:4000/api/delete-provider/${id}`;

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Providers.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            onEdit(id) {
                let indexOfArrayItem = this.Providers.findIndex(i => i._id === id);
                let _id = indexOfArrayItem._id;
                let apiURL = `http://localhost:4000/api/update-provider/${_id}`;
                
                axios.put(apiURL, id).then((res) => {
                    console.log(res)
                    
                }).catch(error => {
                    console.log(error)
                });
            },
            onClick(id, _id) {
                let val = document.getElementById("checkbox"+id).checked;
                document.getElementById("checkbox"+id).checked = !val;
                let indexOfArrayItem = this.Providers.findIndex(i => i._id === _id);
                if(val)
                {
                    this.provider_value = this.provider_value.replace(this.Providers[indexOfArrayItem].name+" ", "");
                    this.client.providers.splice(this.client.providers.indexOf({"id": id})-1, 1);
                }
                else
                {
                    this.provider_value += (this.Providers[indexOfArrayItem].name + " ");
                    this.client.providers.push({"id": id});
                }
            },
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/api/create-client';
                this.client.providers_string = this.provider_value;
                axios.post(apiURL, this.client).then(() => {
                    apiURL = 'http://localhost:4000/api';
                    // Get client list from database
                    axios.get(apiURL).then(res => {
                        this.Clients = res.data;
                    }).catch(error => {
                        console.log(error)
                    });
                  this.client = {
                    name: '',
                    email: '',
                    phone: '',
                    providers: []
                  }
                  this.provider_value = ''
                }).catch(error => {
                    console.log(error)
                });
            },
            deleteClient(id){
                let apiURL = `http://localhost:4000/api/delete-client/${id}`;
                let indexOfArrayItem = this.Clients.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Clients.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }

    .create-form {
        display: flex;
    }

    .modal-form-label {
        margin-right: 10px;
        text-align: right;
        width: 30%;
    }

    .list-client .form-group {
        display: flex;
    }
</style>