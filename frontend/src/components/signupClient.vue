<template>
    <div class="login-page">
        <router-link class="go-on-other-page" :to="{name: 'loginClient'}"> Login Client &rarr;</router-link>
        <div class="container loginContainer row align-items-center">
            <div class="login-page-title">
                <h2>SIGNUP CLIENT</h2>
            </div>
            <div class="form-container signup-client" v-if="!submitted">
                <input type="text" placeholder="Full name" v-model="cleint.fullName"> <br><br>
                <input type="text" placeholder="Phone number" v-model="cleint.phoneNumber"> <br><br>
                <input type="text" placeholder="Province" v-model="cleint.provinceLoc"> <br><br>
                <input type="text" placeholder="District" v-model="cleint.districtLoc"> <br><br>
                <input type="text" placeholder="Sector" v-model="cleint.sectorLoc"> <br><br>
                <input type="password" placeholder="Password" v-model="cleint.password"> <br><br>
                <input type="password" placeholder="Confirm Password" v-model="cleint.passwordConfirm"> <br><br>
                <button @click="signupNow">Signup Now</button><br>
                <router-link id="loginButton" class="Idont-have" :to="{name: 'loginClient'}"> <span>I have account , </span> Take me to login</router-link>
            </div>
            <div v-else>               
                <div class="choose-cabinet" v-if="!createdWorkspace">
                     <hr class="another-hr-top">
                    <h3>List of cabinet nearer to your location</h3>
                    <li v-for="(cabinet, index) in cabinets" :key="index">
                      <p> {{index+1}}. {{cabinet.cabinetName}} <span>{{cabinet.sectorLoc}}</span> <span>{{cabinet.districtLoc}}</span>  <button @click="createWorkspace(cabinet._id,clientId)">Join</button></p>
                    </li>
                    <br> <br><br> <br>
                    <router-link id="loginButton" class="Idont-have" :to="{name: 'loginClient'}"> <span>I have account , </span> Take me to login</router-link>
                    <hr class="another-hr-bottom">
                </div>
                <div v-else>
                        Workspace Created now
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import http from "../http-common"
    import router from "../router"
    export default({
       name: "signupClient",
       data(){
           return{
               cleint:{
                fullName:"",
                photo:"",
                phoneNumber:"",
                cabinetId: "",
                provinceLoc:"",
                districtLoc:"",
                sectorLoc:"",
                password:"",
                passwordConfirm:""
               },
               submitted: false,
               message: "",
               cabinets: [],
               cabinet: [],
               clientId: "",
               createdWorkspace: false
           }
       },
       methods:{
            signupNow : async function() {
                var data = {
                    fullName : this.cleint.fullName,
                    photo : "",
                    phoneNumber : this.cleint.phoneNumber,
                    provinceLoc : this.cleint.provinceLoc,
                    districtLoc : this.cleint.districtLoc,
                    sectorLoc : this.cleint.sectorLoc,
                    password : this.cleint.password,
                    passwordConfirm : this.cleint.passwordConfirm
                }
                 http
                .post("clients/signup",data)
                .then( async (response)=>{
                    this.cabinets = await response.data.data
                    this.clientId = await response.data.clientId
                } )


                this.submitted = true
            },
            createWorkspace : async function(cabinetId,clientId){
                var workspace = {
                    cleintId : clientId,
                    cabinetId:  cabinetId
                }

                http
                    .post("workspaces",workspace)

                this.createdWorkspace = true   
                router.push("/loginAttorney")
            }           
       }
    })
</script>