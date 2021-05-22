import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import AddMember from "@/components/new-workspace/AddMember"

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing adding members to workspace", () => {
    let store, actions, wrapper
    beforeEach(() => {
        actions = {
            addUserToWorkspace: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
        const vuetify = new Vuetify({})
        const router = new VueRouter({})
        wrapper = shallowMount(AddMember, {
            localVue,
            store,
            router,
            vuetify,
            propsData: {
                id: 1
            }
        })
    })
    it("Should call add function", () => {
        const form = wrapper.findComponent({ref: 'userForm'})
        expect(form.exists()).toBeTruthy()
        form.trigger('submit.prevent')
        expect(actions.addUserToWorkspace).toHaveBeenCalled()
    })
})