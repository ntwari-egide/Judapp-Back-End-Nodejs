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
                    <p>People in chat with cabinet </p>
                    <li v-for="(attorneys, index) in cabinetAttorney" :key="index"> 
                        <a @click="getChatWithAttorney(attorneys._id,attorney._id)" href="#">{{attorneys.fullName}}</a>
                    </li>
                </div>
                <div class="right-pane">
                      <div class="action-pane searchBox"></div>                      
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
                            <button @click="sendInboxChat(attorney._id)">SEND</button>
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
                cabinetAttorney: [],
                getMyChat : [], 
                startOfChat: false,  
                getAttorneyChat: [],  
                chatingWith: "",           
                startedChat: false,
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
            getCabinetInChat: function(){
                http.get("attorneys/byCabinetId/"+this.$session.get("cabinetId"))
                    .then( response => {
                        this.cabinetAttorney = response.data.data
                    })

            },
            getChatWithAttorney: function(attorneyId,myId){
                this.chatingWith = attorneyId
                this.startedChat = true  
                // message of the client
                http.get("messages/getChat/"+attorneyId+"/"+myId)
                    .then(response => {
                        if(response.data.message){
                            this.getMyChat = ""
                            this.startOfChat = true
                        }
                        else{
                            this.getMyChat = response.data.data
                            this.startOfChat = false
                        }
                    })
            },
            sendInboxChat: function(myId){
                if(this.msg != ""){
                        let data = {
                            general :false,
                            sendersId: myId,
                            receiversId: this.chatingWith,
                            messageContent: this.msg
                        }

                        http.post("messages",data)
                        this.msg = ""

                        this.getChatWithAttorney(this.chatingWith,myId)
                }
            },    
            refreshList: function(){
                this.getCabinetCredentials()
                this.getCabinetInChat()
            }          
        },
        mounted() {
            this.refreshList()
        }
    })
</script>
