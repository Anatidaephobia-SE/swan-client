import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing user profile component", () => {
    let store, actions, wrapper
    beforeEach(() => {
        actions = {
            getUserInfo: jest.fn()
        }
    })
})