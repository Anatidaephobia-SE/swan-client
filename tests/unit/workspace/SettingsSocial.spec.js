import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import Vue from 'vue'
import SettingsSocial from "@/components/workspaces/SettingsSocial";


Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)


describe('Testing SettingsSocial.vue', function () {
    let actions, store, wrapper
    beforeAll(() => {
        actions = {
            getTwitterAccount: jest.fn(() => new Promise(resolve => {
                const response = {
                    data: {
                        screen_name: 'foobar',
                        name: 'foo'
                    }
                }
                resolve(response)
            })),
            requestConnectionTwitter: jest.fn(() => new Promise(resolve => {
                const response = {
                    data: {
                        address: '.'
                    }
                }
                resolve(response)
            }))
        }
        store = new Vuex.Store({
            actions
        })
        const vuetify = new Vuetify({})
        wrapper = mount(SettingsSocial, {
            localVue,
            vuetify,
            store,
            mocks: {
                $route: {
                    params: {
                        workspace: Math.random() * 1000
                    },
                    query: {}
                }
            }
        })
    })

    it('should get twitter account', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.getTwitterAccount).toHaveBeenCalled()
        expect(wrapper.text()).toContain("Connected")
    });

    it('should call request connection', async function () {
        await wrapper.vm.$nextTick()
        const btn = wrapper.findComponent({ref: "requestConnection"})
        expect(btn.exists()).toBeTruthy()
        expect(btn.isVisible()).toBeTruthy()
        await btn.trigger('click')
        expect(actions.requestConnectionTwitter).toHaveBeenCalled()
    });
});

describe('Testing SettingsSocial.vue after achieving token', function () {
    let actions, store, wrapper
    beforeAll(() => {
        actions = {
            sendTokensTwitter: jest.fn(() => new Promise(resolve => {
                const response = {
                    data: {
                        param: 'Hello'
                    }
                }
                resolve(response)
            })),
            getTwitterAccount: jest.fn(() => new Promise(resolve => {
                const response = {
                    data: {
                        screen_name: 'foobar',
                        name: 'foo'
                    }
                }
                resolve(response)
            })),
        }
        store = new Vuex.Store({
            actions
        })
        const vuetify = new Vuetify({})
        wrapper = mount(SettingsSocial, {
            localVue,
            vuetify,
            store,
            mocks: {
                $route: {
                    path: './',
                    params: {
                        workspace: Math.random() * 1000
                    },
                    query: {
                        oauth_token: 'Hello',
                        oauth_verifier: 'Foo'
                    }
                }
            }
        })
    })
    it('should send token if loaded with query params', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.sendTokensTwitter).toHaveBeenCalled()
        expect(actions.getTwitterAccount).toHaveBeenCalled()
    });
});