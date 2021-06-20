import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import SignUpForm from "@/components/auth/SignUp-Form"
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify);
localVue.use(Vuex)
localVue.use(VueRouter)

describe("Testing signup form", () => {

  let store, actions;
  actions = {
    register: jest.fn(() => new Promise(resolve => {
      resolve({
        data: true
      })
    })),
    updateUserInfo: jest.fn(() => new Promise(resolve => {
      resolve({
        data: true
      })
    }))
  }
  store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        actions
      }
    }
  })
  const vuetify = new Vuetify()
  const router = new VueRouter()
  const wrapper = mount(SignUpForm, {
    localVue,
    router,
    store,
    vuetify
  })
  it('should contain signup text', function () {
    expect(wrapper.text()).toContain("Create a new account now! and gather your team around.")
  });
  it('should call signup function', async function () {
    const form = wrapper.findComponent({ref: "register"})
    await form.trigger("submit.prevent")
    await wrapper.vm.$nextTick()
    expect(actions.register).toHaveBeenCalled()
  });
  it('should call update profile function', async function () {
    const form = wrapper.findComponent({ref: "updateProfile"})
    expect(form.exists()).toBeTruthy()
    form.trigger("submit.prevent")
    expect(actions.updateUserInfo).toHaveBeenCalled()
  });
})