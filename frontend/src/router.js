import Vue from "vue";
import Router from "vue-router";
import SignupCleint from "./components/signupClient.vue";
import loginClient from "./components/loginClient.vue";
import loginAttorney from "./components/loginAttorney.vue";
import Dashboard from "./components/clientDashboard/dashboard.vue";
import cabinetClient from "./components/clientDashboard/cabinetDashboard.vue";
import updateProfile from "./components/clientDashboard/udpateProfile.vue";
import servicesDashboard from "./components/clientDashboard/servicesDashboard.vue";
import attorneyDasbhoard from "./components/attorneyDashboard/dashboard.vue";
import attorneyCabinet from "./components/attorneyDashboard/cabinetDashboard.vue";
import attorneyClient from "./components/attorneyDashboard/clientChatRoom.vue";
import cabinetServices from "./components/attorneyDashboard/attorneyServices.vue";
import welcomePage from "./components/welcomepage.vue"

Vue.use(Router);
export default new Router({
mode: "history",
routes: [
    {
        path: "/",
        name: "welcomePage",
        component: welcomePage
    },
{
    path: "/signupClient",
    name: "signupClient",
    component: SignupCleint
},
{
    path: "/loginClient",
    name: "loginClient",
    component: loginClient
},
{
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    props: true
},
{
     path: "/clientcabinet/:workspaceId",
     name: "client-cabinet",
     component: cabinetClient
},
{
     path: "/updateprofile",
     name: "update-profile",
     component: updateProfile
},
{
    path: "/dashboardServices",
    name: "services",
    component: servicesDashboard
},
{
    path: "/loginAttorney",
    name: "attorney-login",
    component: loginAttorney
},
{
    path: "/dashboardAttorney",
    name: "attorney-dashboard",
    component: attorneyDasbhoard
},
{
    path: "/dashboardAttorneyCabinet",
    name: "attorney-cabinet",
    component: attorneyCabinet
},
{
    path: "/dashboardAttorneyClient",
    name: "attorney-client",
    component: attorneyClient
} ,
{
    path: "/dashboardAttorneyServices",
    name: "attorney-services",
    component: cabinetServices
}      
]
});