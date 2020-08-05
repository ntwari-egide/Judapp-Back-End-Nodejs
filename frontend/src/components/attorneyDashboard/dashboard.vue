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
                            <li><router-link :to="{name: 'services'}">@services</router-link></li>
                            <li><a href="">@laws</a></li>
                        </ul>
                    </div>
                </div>
                <div class="action-pane center-pane">
                    <p>One of the general messages</p>
                    <li><a @click="getCabinetGeneral(cabinet._id)" href="#">cabinet general </a></li>
                    <li><a @click="getClientGeneral(cabinet._id)" href="#">client general </a></li>
                </div>
                <div class="right-pane">
                      <div class="action-pane searchBox"></div>                      
                      <div class="action-pane chat-body-area">
                           <div v-if="!startOfConversation">
                               <li v-for="(msg, index) in generalMsg" :key="index">                                
                                    <p>{{msg.message.messageContent}}</p>
                                    <ul v-for="(sendersDetails, index) in msg.sendersDetails" :key="index">
                                        <li class="text-success">{{sendersDetails.fullName}}</li>
                                    </ul>
                                </li>
                           </div>
                           <div v-else>
                               <p class="text-danger">Start Of Conversation</p>
                           </div>
                      </div>
                      <div class="action-pane chat-input-area">
                            <textarea v-model="msg" cols="100" rows="2" placeholder="send message generally"></textarea>
                            <button @click="sendGeneralMsg(cabinet._id,attorney._id)">SEND</button>
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
                generalMsg: [],
                startOfConversation: false,
                generalClient : false,
                msg: ""
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
            getClientGeneral: function(cabinetId){
                http.get("messages/getClientGeneral/"+cabinetId)
                .then(response => {
                        if(response.data.message){
                            this.startOfConversation = true
                        }
                        else{
                            this.startOfConversation = false
                            this.generalMsg = response.data.data
                        }                        
                    })

                    this.generalClient = true    
            },

            getCabinetGeneral: function(cabinetId){
                http.get("messages/getCabinetGeneral/"+cabinetId)
                .then(response => {
                        if(response.data.message){
                            this.startOfConversation = true
                        }
                        else{
                            this.startOfConversation = false
                            this.generalMsg = response.data.data
                        }                        
                    })

                    this.generalClient = false    
            },
            sendGeneralMsg: function(cabinetId,attorneyId){
                if(this.msg != ""){
                        if(this.generalClient){
                        let data = {
                            clientGeneral: true,
                            cabinetId: cabinetId,
                            sendersId: attorneyId,
                            messageContent: this.msg
                        }
                        http.post("messages",data)
                        this.msg = ""

                        this.getClientGeneral(cabinetId)
                    }
                    else{
                        var data = {
                            cabinetGeneral: true,
                            cabinetId: cabinetId,
                            sendersId: attorneyId,
                            messageContent: this.msg
                        }
                        http.post("messages",data)
                        this.msg = ""

                        this.getCabinetGeneral(cabinetId)
                    }
                }
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

