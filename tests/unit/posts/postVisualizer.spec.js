import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import Vue from 'vue'
import PostVisualizer from "@/components/post/PostVisualizer";


Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)


describe('Testing PostVisualizer.vue', function () {
    let state, actions, store, wrapper
    beforeAll(() => {
        state = {
            post: {
                name: '',
                caption: 'hello',
                tag: '',
                team: '',
                multimedia: [],
                status: '',
                created_at: ''
            }
        }
        actions = {
            getTwitterAccount: jest.fn(() => new Promise(resolve => {
                resolve({data: []})
            }))
        }
        store = new Vuex.Store({
            actions,
            modules: {
                post: {
                    namespaced: true,
                    state
                }
            }
        })
        const vuetify = new Vuetify({})
        wrapper = mount(PostVisualizer, {
            localVue,
            vuetify,
            store,
            mocks: {
                $route: {
                    params: {
                        workspace: Math.random()
                    }
                }
            }
        })
    })

    it('should load twitter info', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.getTwitterAccount).toHaveBeenCalled()
    });

    it('should show post when updated', async function () {
        await wrapper.vm.$nextTick()
        const p = wrapper.findComponent({ref: "caption"})
        expect(p.isVisible()).toBeTruthy()
        expect(p.text()).toContain(state.post.caption)
        state.post.caption = "Hello This is good"
        await wrapper.vm.$nextTick()
        expect(p.text()).toContain(state.post.caption)
    });
});