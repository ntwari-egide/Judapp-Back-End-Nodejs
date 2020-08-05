<template>
    <div class="login-page">
        <router-link class="go-on-other-page" :to="{name: 'loginClient'}"> Login Client &rarr;</router-link>
        <div class="container loginContainer row align-items-center">   
            <div class="login-page-title">
                <h2>LOGIN ATTORNEY</h2>
            </div>
            <div class="form-container" v-if="!submitted">
                <hr class="top-line">
                <input type="email" placeholder="Email " v-model="attorney.email"> <br><br>
                <input type="password" placeholder="Password" v-model="attorney.password"> <br><br>
                <button @click="signupNow">Login Now</button><br>
                <router-link id="loginButton" class="Idont-have" :to="{name: 'attorney-login'}"> I don't have account ,<span>Create account</span></router-link>
                <hr class="bottom-line">
            </div>
            <div v-else>
                <div v-if="notAuthorized">
                    <div class="container danger">Please email or password is incorect .</div>
                    <button @click="loginAgain">login again </button>
                </div>
                <div v-else>
                    <p class="text-success">Logged In </p>                   
                     <li v-for="(attorney, index) in authenticatedAttorney" :key="index">    
                    <button @click="gotoDashboard(attorney._id,attorney.cabinetId)">Continue To Dashboard </button>
                    </li>
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
               attorney:{                
                email:"",                
                password:""
               },
               authenticatedAttorney : this.$session.get("attorney"),
               clientId: "",
               workspaceId: "",
               cabinetId: "",
               submitted: false,
               notAuthorized: false,
               message: ""
           }
       },
       methods:{
            signupNow : async function() {
                var data = {                    
                    email : this.attorney.email,
                    password : this.attorney.password
                }
                 http
                .post("attorneys/login",data)
                .then( async (response)=>{
                    this.message = await response
                      if(response.data.results == 0){
                          this.notAuthorized = true
                      }
                      else{
                           this.authenticatedAttorney = response.data.user
                           this.$session.destroy()
                           this.$session.start()
                           this.$session.set('jwt',response.data.token)
                           axios.create({
                            headers: {
                                  'Authorization': 'Bearer '+ response.data.token             
                               }
                            });  
                            this.$session.set('attorney',response.data.user) 
                      }
                } )


                this.submitted = true
            },
            gotoDashboard : function(attorneyId,cabinetId){
                this.$session.set("attorneyId",attorneyId);  
                this.$session.set("cabinetId",cabinetId);
                router.push("/dashboardAttorney")
            },
            loginAgain: async function(){
                this.submitted = false
                this.notAuthorized = false
            }           
       }
    })
</script>