import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import Vue from 'vue'
import PostActions from "@/components/post/PostActions";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing PostActions.vue', function () {
    let actions, state, store, wrapper
    beforeAll(() => {
        actions = {

        }
        state = {
            post: {
                name: '',
                caption: '',
                tag: '',
                team: '',
                multimedia: [],
                status: 'Published',
                created_at: ''
            },
            update: false,
            canEdit: false,
        }
        store = new Vuex.Store({
            modules: {
                post: {
                    namespaced: true,
                    state
                }
            }
        })
        const vuetify = new Vuetify({})
        wrapper = mount(PostActions, {
            localVue,
            store,
            vuetify,
            mocks: {
                $route: {
                    params: {
                        workspace: Math.random()
                    }
                }
            }
        })
    })
});