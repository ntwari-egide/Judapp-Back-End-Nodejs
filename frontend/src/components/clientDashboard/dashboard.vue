<template>
    <div  class="allContainer">      
         <li v-for="(client, index) in this.$session.get('client')" :key="index">  

<!--                            DASHBOARD STARTS HERE -->
<!-- 
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
                            <router-link :to="{name: 'client-cabinet',params: {workspaceId: workspaceId}}">@cabinet</router-link>
                            <li><router-link :to="{name: 'services'}">@services</router-link></li>
                            <li><a href="">@laws</a></li>
                        </ul>
                    </div>
                </div>
                <div class="action-pane center-pane">
                    <p>One of the general messages</p>
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
                            <button @click="sendGeneralMsg(cabinet._id,client._id)">SEND</button>
                      </div>
                </div>
              </div> -->
                <div class="row align-items-center search-container">
                    <div><img src="../../../public/assets/images/Logo.png"></div>
                    <input type="search" placeholder="Search in cabinet">
                </div>
                <div class="row align-items-center dashboard-container ">
                    <div class="nav-bar-container-menu">
                        <div class="profile">
                            <h3 class="cabinet">{{cabinet.cabinetName}}</h3>
                            <p class="name"><input type="radio"> {{client.fullName}}</p>
                        </div>
                        <div class="location">
                            <h2>My Location</h2>
                            <div class="container">
                                <p>{{client.provinceLoc}}</p>
                                <p>{{client.districtLoc}}</p>
                                <p>{{client.sectorLoc}}</p>
                            </div>                            
                        </div>
                        <div class="links"> 
                            <h2>Channels</h2>                               
                             <ul>
                            <li><router-link :to="{name: 'dashboard'}" class="active"> #general</router-link></li>
                            <li><router-link :to="{name: 'client-cabinet',params: {workspaceId: workspaceId}}"># cabinet</router-link></li>
                            <li><router-link :to="{name: 'services'}">#services</router-link></li>
                            <li><a href=""># laws</a></li>
                        </ul>
                        </div>
                        <div class="direct">
                            <h3>Select channel to follow</h3>
                        </div>
                    </div>
                    <div class="dash-bar-container-menu general-content-listing">
                        <div class="cover">
                            <h3>About Channel</h3>
                        </div>
                        <p>Items to be found in general</p>
                        <ul>
                            <li><a @click="getClientGeneral(cabinet._id)" href="#" class="active">? All</a></li>
                            <li><a href="#">? pictires</a></li>
                            <li><a href="#">? text and content</a></li>
                            <li><a href="#">? profile</a></li>
                            <li><a href="#">? files</a></li>
                            <li><a href="#">? others</a></li>
                        </ul>
                    </div>
                    <div class="main-content-container">
                        <div class="channel-disc">
                            <h3># general</h3>
                            <p>Here you find all messages and comments of all cabinet members and their clients </p>
                        </div>
                        <div class="message-container">
                            <div v-if="!startOfConversation" class="all-messages">
                                <div v-for="(msg, index) in generalMsg" :key="index">                                
                                    <div v-for="(sendersDetails, index) in msg.sendersDetails" :key="index">                                
                                        <div v-if="sendersDetails.photo == ''">
                                            <img src="../../../public/assets/images/default prof.png" alt="" class="msg-prof-img">
                                        </div>
                                        <p class="msg-prof-name">{{sendersDetail.fullName}}</p>
                                        <p class="msg-date">{{msg.recordedAt}}</p>
                                         <p class="msg-content">{{msg.messageContent}}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p class="text-danger">Start Of Conversation</p>
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
                workspaceId: this.$session.get("workspaceId"),
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
 