<template>
    <div>
        <li v-for="(works, index) in workspace" :key="index"   style="display: none">   
            <p>{{cabinetId = works.cabinetId}}</p>  
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
                            <li><a href="#">@cabinet</a></li>
                            <router-link :to="{name: 'services'}">@services</router-link>
                            <li><a href="#">@laws</a></li>
                        </ul>
                    </div>
                </div>
                <div class="action-pane center-pane">
                    <h3>Please one attorney among others</h3>
                    <li v-for="(attorney, index) in allAttorneys" :key="index">                    
                        <a @click="getChatMessageFromClient(clientId,attorney._id)" class="attorney" href="#">{{attorney.fullName}} </a>
                    </li>         
                </div> 
                <div class="right-pane">
                      <div class="action-pane searchBox">
                            <router-link :to="{name: 'update-profile'}"> update profile</router-link>
                      </div>                      
                       <div class="action-pane chat-body-area">
                           <div v-if="startedChat">
                               <div v-if="!startOfChat">
                                    <ul v-for="(msg, index) in getMyChat" :key="index"> 
                                        <li class="text-success">{{msg.message.messageContent}}</li>
                                        <ul v-for="(sender, index) in msg.sendersDetails" :key="index"> 
                                            <li class="bg-info">{{sender.fullName}}</li>
                                        </ul>
                                </ul>
                               </div>
                               <div v-else>
                                     <h3 class="text-success">Start Of Conversation</h3>
                                     <p class="text-warning">Chat in order to activate the message </p>
                               </div>
                           </div>
                           <div v-else>
                                    you should choose the one to chat with
                           </div>
                      </div>
                      <div class="action-pane chat-input-area">
                            <textarea v-model="msg" cols="100" rows="2" placeholder="send message generally"></textarea>
                            <button @click="sendInBoxMsg()">SEND</button>
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
                workspace: this.$session.get('workspaces'),
                allAttorneys : [],
                getMyChat : [], 
                startOfChat: false,  
                getAttorneyChat: [],  
                chatingWith: "",   
                msg: "",        
                startedChat: false
            }
        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                    this.$router.push('/loginClient')
            }
        },
        methods: {
            getAttorneyInCabinet: function(){
                 http.get("/attorneys/byCabinetId/"+this.$session.get("cabinetId"))
                    .then( response => {
                        this.allAttorneys = response.data.data
                    })  
            },
            getChatMessageFromClient: function(clientId,attorneyId){
                this.chatingWith = attorneyId
                this.startedChat = true  
                // message of the client
                http.get("messages/getChat/"+clientId+"/"+attorneyId)
                    .then(response => {
                        if(response.data.message){
                            this.getMyChat = ""
                            this.startOfChat = true
                        }
                        else{
                            this.getMyChat = response.data.data
                            this.startOfChat = true
                        }
                    })
                
            },
            sendInBoxMsg: function(){
                if(this.msg != ""){
                     var data = {
                        workspaceId: this.$session.get("workspaceId"),
                        general :false,
                        sendersId: this.$session.get("clientId"),
                        receiversId: this.chatingWith,
                        messageContent: this.msg
                        }

                        http.post("messages",data)
                        this.msg = ""
                        this.getChatMessageFromClient(this.$session.get("clientId"),this.chatingWith)
                }   
             
            },
            refreshList: function(){
                this.getAttorneyInCabinet()
            }           
        },
        mounted() {
            this.getAttorneyInCabinet()
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