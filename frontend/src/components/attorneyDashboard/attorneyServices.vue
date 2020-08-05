<template>
    <div>     
         <li v-for="(attorney, index) in this.$session.get('attorney')" :key="index"> 

<!--                            DASHBOARD STARTS HERE -->

             <div class="main-container">
                <div class="action-pane left-pane">
                    <div class="profile">
                        <ul>
                            <li>{{attorney.fullName}}</li>
                        </ul>
                    </div>
                    <div class="location cabinet-credentials">
                        <div class="container">
                            <!-- <h4>{{cabinet._id}}</h4> -->
                            <p>{{cabinet.provinceLoc}}</p>
                            <p>{{cabinet.districtLoc}}</p>
                            <p>{{cabinet.sectorLoc}}</p>     
                        </div>                    
                    </div>
                    <div class="nav-bar">
                        <ul>
                            <li><router-link :to="{name: 'attorney-dashboard'}"> @general</router-link></li>
                            <router-link :to="{name: 'attorney-cabinet'}">@cabinet</router-link>
                            <li><router-link :to="{name: 'attorney-client'}">@client</router-link></li>
                            <li><router-link :to="{name: 'attorney-services'}">@services</router-link></li>
                            <li><a href="">@laws</a></li>
                        </ul>
                    </div>
                </div>
                <div class="action-pane center-pane">
                    <h3>Services We Provide</h3>                  
                        <li><a @click="getServices('representing')" href="#">representing </a></li>
                        <li><a @click="getServices('advising')" href="#">advising </a></li>
                        <li><a @click="getServices('consultation')" href="#">consultation </a></li>
                        <li><a @click="getServices('mediation')" href="#">mediation </a></li>                    
                        <li><a @click="getServices('arbitration')" href="#">arbitration </a></li>
                        <li><a @click="getServices('preparation of document')" href="#">preparation of document</a></li>
                </div>
                <div class="right-pane">
                      <div class="action-pane searchBox"></div>                      
                      <div class="action-pane chat-body-area">
                          <div v-if="viewingService">
                               <div v-if="!notFound">
                                    Services in {{activeService}}
                                    <li v-for="(services, index) in service" :key="index"> 
                                        <label>Service Name : </label>
                                        <p class="text-success">{{services.service.serviceName}}</p>
                                        <label>Service Description : </label>
                                        <p class="text-dark">{{services.service.description}}</p>
                                        <label>Service Type : </label>
                                        <p class="text-success">{{services.service.typeOfService}}</p>
                                        <ul v-for="(attorney, index) in services.AttorneyDetails" :key="index">
                                            <li lass="bg-success">{{attorney.fullName}}</li>
                                        </ul>
                                    </li>
                               </div>
                               <div v-else>
                                    {{message}}
                               </div>
                           </div>
                           <div v-else>
                                    Chooose one of our services you want to be provided
                           </div>
                      </div>
                </div>
              </div>
              <router-view @refreshData="refreshList"></router-view>
              
              
         </li> 
    </div>     
</template>
<script>
    import http from "../../http-common"
    export default ({
        data(){
            return {
                cabinet: [],
                service: [],
                viewingService: false,
                notFound: false,
                message: "",
                activeService: ""
            }
        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                    this.$router.push('/loginAttorney')
            }
        },
        methods: {
            getCabinetCredentials: function(){
                http.get("cabinets/"+this.$session.get("cabinetId"))
                    .then(response => {
                        this.cabinet = response.data.data
                    })
            },
            getServices: function(serviceType){
                this.activeService = serviceType
                this.viewingService = true
                http.get("services/getservicesByType/"+serviceType+"/"+this.$session.get("cabinetId"))
                    .then(response => {
                        if(response.data.message){
                            this.notFound = true
                            this.message = "There is no services yet published in "+serviceType                            
                        }
                        else{
                            this.service = response.data.data
                            this.notFound = false
                        }
                    })  
            }, 
            refreshList: function(){
                this.getCabinetCredentials()
            }          
        },
        mounted() {
            this.refreshList()
        }
    })
</script>
