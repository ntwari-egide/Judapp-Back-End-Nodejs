<template>
    <div>           
         <ul v-for="(client, index) in this.$session.get('client')" :key="index">         
                           <p  style="display: none">{{clientId = client._id}}</p>

<!--                            DASHBOARD STARTS HERE 
                    "_id": "5eb5f68fbc4f9fc89c5f1c88",
            "fullName": "gipunda jules",
            "photo": "",
            "phoneNumber": "0788348443",
            "cabinetId": "5eb52533c59afe3b2a92a41d",
            "provinceLoc": "west",
            "districtLoc": "nyabihu",
            "sectorLoc": "mukamiras",
            "password": "$2a$12$aj8id8bYbP22Qe9KJbEtNuBlK2g/DWzXqpu3xmKJhyDz2ob1Lrr.O", -->
             
              {{client}}  
              <h2>Update your profile</h2>
              <label for="name">FullName: {{client.fullName}}</label><br><br>
              <input type="text" id="name" v-model="clientInfo.fullName" placeholder="Full Name"><br><br>



              <input type="text" id="name" v-model="clientInfo.fullName" placeholder="Full Name"><br><br>

              <label for="name">FullName: {{client.fullName}}</label><br><br>
              <input type="text" id="name" v-model="clientInfo.fullName" placeholder="Full Name"><br><br>

              <label for="name">FullName: {{client.fullName}}</label><br><br>
              <input type="text" id="name" v-model="clientInfo.fullName" placeholder="Full Name"><br><br>

         </ul> 
    </div>     
</template>
<script>
   // import http from "../../http-common"
    export default ({
        data(){
            return {
                clientId: "",                
                workspace: this.$session.get('workspaces'),
                clientInfo: {
                    fullName: "",
                    photo: "",
                    phoneNumber: "",
                    cabinetId: "",
                    provinceLoc: "",
                    districtLoc: "",
                    sectorLoc: "",
                    password: ""
                }
            }
        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                    this.$router.push('/loginClient')
            }
        },
        methods: {

        }
    })
</script>