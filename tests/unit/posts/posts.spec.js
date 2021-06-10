import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import Posts from "@/views/teams-subpaths/Posts";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Testing views/Posts.vue', function () {
    let actions, store, wrapper
    beforeEach(() => {
        actions = {
            getAllPosts: jest.fn(() => new Promise(resolve => {
                const response = {
                    data: []
                }
                resolve(response)
            }))
        }
        store = new Vuex.Store({
            modules: {
                post: {
                    namespaced: true,
                    actions
                }
            }
        })
        const vuetify = new Vuetify({})
        const router = new VueRouter({})
        const route = {
            param: {
                workspace: Math.random() * 1000
            }
        }
        wrapper = mount(Posts, {
            router,
            localVue,
            store,
            vuetify,
            mocks: {
                $route: route
            }
        })
    })
    it('should get posts for current workspace', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.getAllPosts).toHaveBeenCalled()
    });
    it('should show `It\'s empty here, add a post now!` when no post', async function () {
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain("It's empty here, add a post now!")
    });
    it('show not show `It\'s empty here, add a post now!` when there are posts', async function () {
        const posts = [
            {name: 'foo', caption: 'something'}
        ]
        await wrapper.setData({posts: posts})
        expect(wrapper.text()).not.toContain("It's empty here, add a post now!")
    });
});