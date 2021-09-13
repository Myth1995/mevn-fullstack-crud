<template>
    <div class="row justify-content-center list-edit">
        <div class="col-md-6">
            <h3 class="text-center">Edit Client</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label class="modal-form-label">Name:</label>
                    <input class="form-control" v-model="edit_client.name" required />
                </div>

                <div class="form-group">
                    <label class="modal-form-label">Email:</label>
                    <input type="email" class="form-control" v-model="edit_client.email" required>
                </div>

                <div class="form-group">
                    <label class="modal-form-label">Phone:</label>
                    <input type="text" class="form-control" v-model="edit_client.phone" required>
                </div>

                <div class="form-group">
                    <label class="modal-form-label">Providers:</label>
                    <input type="text" class="form-control" v-model="provider_edit_value" required>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6" style="border-style: groove; border-radius: 5px; height: 200px;">
                        <div v-for="data in Providers" class="form-group" :key="data.id" style="display: flex;">
                            <input type="checkbox" name="check" :id="'checkbox'+data.id" style="margin-top: 5px; margin-right: 20px;" disabled />
                            <span style="cursor: pointer; margin-right: 30px;" @click="onProviderClick(data.id, data._id)">{{data.name}}</span>
                            <!-- <img :src="editSVG" width="25" style="margin-right: 30px; cursor: pointer;" @click="onEdit(data.id)"/> -->
                            <img :src="deleteSVG" width="20" style="cursor: pointer;" @click="onDelete(data._id)"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            Providers:[], 
            edit_client: {
                name: '',
                email: '',
                phone: '',
                providers: []
            },
            checked_list:[],
            provider_edit_value: '',
            editSVG: require('../edit-solid.svg'),
            deleteSVG: require('../trash-alt-solid.svg'),
        }
    },
    // beforeMounted() {
    //     for(let i = 0; i < this.checked_list.length; i++) {
    //         document.getElementById("checkbox"+this.checked_list[i]).checked = true
    //     }
    // },
    created() {
        let apiURL = 'http://localhost:4000/api/provider';
        axios.get(apiURL).then(res => {
            this.Providers = res.data;
        }).catch(error => {
            console.log(error)
        });

        apiURL = `http://localhost:4000/api/edit-client/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.edit_client = res.data;
            console.log(this.edit_client.name+":"+this.edit_client.email+":"+this.edit_client.providers.length)
            this.provider_edit_value = this.edit_client.providers_string;
            for(let i = 0; i < this.edit_client.providers.length; i++) {
                let el = this.edit_client.providers[i];
                // this.checked_list.push(el.id);
                document.getElementById("checkbox"+el.id).checked = true;
            }
        })
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
        onProviderClick(id, _id) {
            let val = document.getElementById("checkbox"+id).checked;
            document.getElementById("checkbox"+id).checked = !val;
            let indexOfArrayItem = this.Providers.findIndex(i => i._id === _id);
            if(val)
            {
                this.provider_edit_value = this.provider_edit_value.replace(this.Providers[indexOfArrayItem].name+" ", "");
                this.client.providers.splice(this.edit_client.providers.indexOf({"id": id})-1, 1);
            }
            else
            {
                if(!this.provider_edit_value.includes(this.Providers[indexOfArrayItem].name))
                {
                    this.provider_edit_value += (this.Providers[indexOfArrayItem].name + " ");
                    this.edit_client.providers.push({"id": id});
                }
            }
        },
        handleUpdateForm() {
            this.edit_client.providers_string = this.provider_edit_value;
            let apiURL = `http://localhost:4000/api/update-client/${this.$route.params.id}`;

            axios.put(apiURL, this.edit_client).then((res) => {
                console.log(res)
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
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

    .list-edit .form-group {
        display: flex;
    }
</style>