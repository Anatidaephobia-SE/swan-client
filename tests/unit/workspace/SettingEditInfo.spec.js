import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import SettingEditInfo from "@/components/workspaces/SettingEditInfo";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Testing Settings.vue', function () {
    let actions, store, wrapper
    beforeAll(() => {
        actions = {
            getWorkspaceInfo: jest.fn(() => new Promise((resolve) => {
                const response = {
                    data: {
                        team: {
                            id: Math.random() * 100,
                            name: 'foo',
                            logo: ''
                        },
                        can_edit: false
                    }
                }
                resolve(response)
            })),
            editWorkspaceInfo: jest.fn(() => new Promise(resolve => {
                resolve(true)
            }))
        }
        store = new Vuex.Store({
            actions
        })
        const vuetify = new Vuetify({})
        const router = new VueRouter({})
        const $route = {
            params: {
                workspace: Math.random() * 1000
            }
        }
        wrapper = mount(SettingEditInfo, {
            router,
            localVue,
            store,
            vuetify,
            mocks: {
                $route
            }
        })
    })
    it('should get workspace info', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.getWorkspaceInfo).toHaveBeenCalled()
    });
    it('should not show edit button', async function () {
        let btn = wrapper.findComponent({ref: 'editBtn'})
        expect(btn.exists()).toBeFalsy()
        await wrapper.setData({canEdit: true})
        btn = wrapper.findComponent({ref: 'editBtn'})
        expect(btn.exists()).toBeTruthy()
    });
    it('should switch to edit mode', async function () {
        await wrapper.setData({canEdit: true})
        const btn = wrapper.findComponent({ref: 'editBtn'})
        await btn.trigger('click')
        const saveBtn = wrapper.findComponent({ref: 'saveBtn'})
        expect(saveBtn.exists()).toBeTruthy()
    });
    it('should call update workspace info', async function () {
        await wrapper.setData({
            canEdit: true,
            editMode: true
        })
        const saveBtn = wrapper.findComponent({ref: 'saveBtn'})
        await saveBtn.trigger('click')
        expect(actions.editWorkspaceInfo).toHaveBeenCalled()
    });
    it('should discard changes', async function () {
        await wrapper.setData({
            canEdit: true,
            editMode: true
        })
        const saveBtn = wrapper.findComponent({ref: 'discardBtn'})
        await saveBtn.trigger('click')
        expect(actions.getWorkspaceInfo).toHaveBeenCalled()
    });
});