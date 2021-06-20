import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import Vue from 'vue'
import PostData from "@/components/post/PostData";


Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing PostData.vue', function () {
    let mutations, state, store, wrapper
    beforeAll(() => {
        mutations = {
            SET_POST_DATA: jest.fn()
        }
        state = {
            author: {
                email: '',
                first_name: '',
                last_name: '',
                profile_picture: ''
            },
            post: {
                name: '',
                caption: '',
                tag: '',
                team: '',
                multimedia: [],
                status: '',
                created_at: ''
            },
            update: false,
            canEdit: true,
        }
        store = new Vuex.Store({
            modules: {
                post: {
                    namespaced: true,
                    mutations,
                    state
                }
            }
        })
        const vuetify = new Vuetify({})
        wrapper = mount(PostData, {
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

    it('should load post data', async function () {
        state.post.name = "FOOPOST"
        state.post.caption = "FOOBAR"
        await wrapper.vm.$nextTick()
        const input = wrapper.findComponent({ref: "name"})
        const caption = wrapper.findComponent({ref: "caption"})
        expect(input.isVisible()).toBeTruthy()
        expect(input.vm.value).toBe(state.post.name)
        expect(caption.vm.value).toBe(state.post.caption)
    });

    it('should call mutation on change', async function () {
        const input = wrapper.findComponent({ref: "name"})
        input.element.value = "Hello"
        await input.vm.$emit('input')
        expect(mutations.SET_POST_DATA).toHaveBeenCalled()
    });
});