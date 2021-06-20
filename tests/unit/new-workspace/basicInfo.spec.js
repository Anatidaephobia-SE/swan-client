import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import BasicInfo from "@/components/new-workspace/BasicInfo"
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)

describe("Testing workspace info on create", () => {
  let store, actions, wrapper
  beforeEach(() => {
    actions = {
      createWorkspace: jest.fn(() => new Promise(resolve => {
        resolve({
          data: {
            team: {
              id: Math.random()
            }
          }
        })
      }))
    }
    store = new Vuex.Store({
      actions
    })
    const vuetify = new Vuetify({})
    const router = new VueRouter({})
    wrapper = mount(BasicInfo, {
      localVue,
      store,
      router,
      vuetify
    })
  })
  it("Should call create workspace", () => {
    const form = wrapper.find(".form")
    expect(form.exists()).toBeTruthy()
    form.trigger('submit.prevent')
    expect(actions.createWorkspace).toHaveBeenCalled()
  })
})