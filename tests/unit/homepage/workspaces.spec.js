import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import Workspaces from "@/views/Workspaces";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing workspaces in homepage", () => {
    let store, actions, wrapper
    beforeEach(() => {
        actions = {
            getWorkspaces: jest.fn(() => new Promise((resolve, reject) => {
                const response = {
                    data: []
                }
                resolve(response)
            }))
        }
        store = new Vuex.Store({
            actions
        })
        const vuetify = new Vuetify({})
        const router = new VueRouter({})
        wrapper = mount(Workspaces, {
            router,
            localVue,
            store,
            vuetify
        })
    })

    it('should call getWorkspaces on created', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.getWorkspaces).toHaveBeenCalled()
    });

    it('should show `no workspaces yet!` when no workspace', async function () {
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain("No workspaces yet!")
    });

    it('should not show `no workspaces yet!` when there are workspaces', async function () {
        await wrapper.vm.$nextTick()
        const workspaces = [
            {id: Math.random(), name: 'foo', logo: '', members: 10},
            {id: Math.random(), name: 'foobar', logo: '', members: 3}
        ]
        await wrapper.setData({workspaces: workspaces})
        expect(wrapper.text()).not.toContain("No workspaces yet!")
    });
    it('should open new workspace dialog', async function () {
        const btn = wrapper.findComponent({ref: 'addWorkspace'})
        expect(btn.exists()).toBeTruthy()
        await btn.trigger('click')
        expect(wrapper.vm.$data.newWorkspace).toBeTruthy()
    });
})