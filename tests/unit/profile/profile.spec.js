import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import UserInfo from "@/components/profile/UserInfo";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing user profile component", () => {
    let store, actions, wrapper, state
    beforeEach(() => {
        actions = {
            getUserInfo: jest.fn(() => new Promise((resolve, reject) => {
                const response = {
                    data: {
                        email: 'foo@gmail.com',
                        profile_picture: '',
                        first_name: 'Foo',
                        last_name: 'bar'
                    }
                }
                resolve(response)
            })),
            updateUserInfo: jest.fn(() => new Promise((resolve, reject) => {
                resolve({
                    data: {
                        email: 'foo@gmail.com',
                        profile_picture: '',
                        first_name: 'Foo',
                        last_name: 'bar'
                    }
                })
            }))
        }
        state = {
            user: {
                email: '',
                first_name: '',
                last_name: '',
                profile_picture: ''
            }
        }
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state,
                    actions
                }
            }
        })
        const vuetify = new Vuetify({})
        const router = new VueRouter({})
        wrapper = mount(UserInfo, {
            router,
            localVue,
            store,
            vuetify
        })
    })

    it('should edit button be visible', function () {
        const btn = wrapper.findComponent({ref: 'editBtn'})
        expect(btn.exists()).toBeTruthy()
        expect(btn.isVisible()).toBeTruthy()
        const saveBtn = wrapper.findComponent({ref: 'saveBtn'})
        expect(saveBtn.exists()).toBeFalsy()
    });
    it('should save & discard button become visible after click on edit', async function () {
        const btn = wrapper.findComponent({ref: 'editBtn'})
        await btn.trigger('click')
        await wrapper.vm.$nextTick()
        const saveBtn = wrapper.findComponent({ref: 'saveBtn'})
        expect(saveBtn.exists()).toBeTruthy()
    });
    it('should call updateUserInfo function', async function () {
        wrapper.setData({editMode: true})
        await wrapper.vm.$nextTick()
        const saveBtn = wrapper.findComponent({ref: 'saveBtn'})
        await saveBtn.trigger('click')
        expect(actions.updateUserInfo).toHaveBeenCalled()
    });
    it('should discard changes', async function () {
        await wrapper.setData({editMode: true})
        const discardBtn = wrapper.findComponent({ref: 'discardBtn'})
        await discardBtn.trigger('click')
        expect(actions.getUserInfo).toHaveBeenCalled()
    });
})