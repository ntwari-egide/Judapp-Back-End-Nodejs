<template>
    <div class="login-page">
        <router-link class="go-on-other-page" :to="{name: 'attorney-login'}"> Login Attorney &rarr;</router-link>
        <div class="container loginContainer row align-items-center">            
            <div class="login-page-title">
                <h2>LOGIN CLIENT</h2>
            </div>
            <div class="form-container" v-if="!submitted">
                <hr class="top-line">
                <input type="text" placeholder="Phone number" v-model="cleint.phoneNumber"> <br><br>
                <input type="password" placeholder="Password" v-model="cleint.password"> <br><br>
                <button @click="signupNow">Login Now</button><br>
                  <router-link id="loginButton" class="Idont-have" :to="{name: 'signupClient'}"> I don't have account ,<span>Create account</span></router-link>
                <hr class="bottom-line">
            </div>
            <div  v-if="submitted">
                <div class="continueToDashbord" v-if="notAuthorized">
                    <p class="text-danger">Please , your login credentials are not correct</p>
                    <button @click="loginAgain">login again </button>
                </div>
                <div class="continueToDashbord" v-else>
                    <p class="text-success">Authenticated now</p>
                    <li v-for="(works, index) in workspace" :key="index" style="display: none">
                       {{workspaceId = works._id}}
                       {{ cabinetId = works.cabinetId}}
                    </li> 
                     <li v-for="(client, index) in authenticatedClient" :key="index" style="display: none">
                       {{ clientId = client._id}}                       
                    </li>
                    <button @click="gotoDashboard(clientId,workspaceId,cabinetId)">Continue To Dashboard </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import http from "../http-common"
    import axios from "axios";
    import router from "../router"
    export default({
       name: "signupClient",
       data(){
           return{
               cleint:{                
                phoneNumber:"",                
                password:""
               },
               authenticatedClient : this.$session.get("client"),
               clientId: "",
               workspaceId: "",
               cabinetId: "",
               workspace : this.$session.get("workspaces"),
               submitted: false,
               notAuthorized: false,
               message: ""
           }
       },
       methods:{
            signupNow : async function() {
                var data = {                    
                    phoneNumber : this.cleint.phoneNumber,
                    password : this.cleint.password
                }
                 http
                .post("clients/login",data)
                .then( async (response)=>{
                    this.message = await response
                      if(response.data.results == '0'){
                          this.notAuthorized = true
                      }
                      else{
                           this.authenticatedClient = response.data.user
                           this.$session.destroy()
                           this.$session.start()
                           this.$session.set('jwt',response.data.token)
                           axios.create({
                            headers: {
                                  'Authorization': 'Bearer '+ response.data.token             
                               }
                            });  
                            this.$session.set('client',response.data.user) 

                            http.get("/workspaces/workspaceByClientId/5eb5f68fbc4f9fc89c5f1c88")
                                .then( (response) => {
                                    this.workspace = response.data.data
                                    this.$session.set("workspaces",response.data.data)                                    
                                })   
                      }
                } )


                this.submitted = true
            },
            gotoDashboard : function(clientId,workspaceId,cabinetId){
                this.$session.set("clientId",clientId);  
                this.$session.set("workspaceId",workspaceId);
                this.$session.set("cabinetId",cabinetId);
                router.push("/dashboard")
            },
            loginAgain: async function(){
                this.submitted = false
                this.notAuthorized = false
            }           
       }
    })
</script>