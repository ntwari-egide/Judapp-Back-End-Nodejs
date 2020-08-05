<template>
    <div>
        <li v-for="(works, index) in workspace" :key="index"   style="display: none">   
            <p>{{cabinetId = works.cabinetId}}</p>  
            <p>{{workspaceId = works._id}}</p>  
        </li>         
         <li v-for="(client, index) in this.$session.get('client')" :key="index">         
                           <p  style="display: none">{{clientId = client._id}}</p>

<!--                            DASHBOARD STARTS HERE -->

             <div class="main-container">
                <div class="action-pane left-pane">
                    <div class="profile">
                        <ul>
                            <li>{{client.fullName}}</li>                           
                        </ul>
                    </div>
                    <div class="location">
                        <ul>
                            <li>{{client.provinceLoc}}  </li>    
                            <li>{{client.districtLoc}}  </li> 
                            <li>{{client.sectorLoc}}  </li>                 
                        </ul>
                    </div>
                    <div class="nav-bar">
                        <ul>
                            <li><router-link :to="{name: 'dashboard'}"> @general</router-link></li>
                            <li><router-link :to="{name: 'client-cabinet',params: {workspaceId: workspaceId}}">@cabinet</router-link></li>
                            <router-link :to="{name: 'services'}">@services</router-link>
                            <li><a href="#">@laws</a></li>
                        </ul>
                    </div>
                </div>
                <div class="action-pane center-pane">
                    <h3>Services We Provide</h3>                  
                        <li><a @click="getServices('representing',cabinetId)" href="#">representing </a></li>
                        <li><a @click="getServices('advising',cabinetId)" href="#">advising </a></li>
                        <li><a @click="getServices('consultation',cabinetId)" href="#">consultation </a></li>
                        <li><a @click="getServices('mediation',cabinetId)" href="#">mediation </a></li>                    
                        <li><a @click="getServices('arbitration',cabinetId)" href="#">arbitration </a></li>
                        <li><a @click="getServices('preparation of document',cabinetId)" href="#">preparation of document</a></li>
                </div> 
                <div class="right-pane">
                      <div class="action-pane searchBox">
                      </div>                      
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
                clientId: "",  
                workspaceId: "",              
                workspace: this.$session.get('workspaces'),
                service: [],
                viewingService: false,
                notFound: false,
                message: "",
                activeService: ""
            }
        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                    this.$router.push('/loginClient')
            }
        },
        methods: {
            getServices: function(serviceType,cabinetId){
                this.activeService = serviceType
                this.viewingService = true
                http.get("services/getservicesByType/"+serviceType+"/"+cabinetId)
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
                this.getAttorneyInCabinet()
            }           
        }
    })
</script>
<style>
    h3
    ,a{
        color: white;
        font-size: 14px;
    }
    .attorney:hover{
        color: blue;
        cursor: pointer;
    }
    .attorney:active{
        color: white;
        background: blue;
    }
</style>