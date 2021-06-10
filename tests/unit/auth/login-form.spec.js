import {createLocalVue, mount} from "@vue/test-utils";
import LoginForm from "@/components/auth/Login-Form"
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from "vue"
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify);
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing Login-Form.vue", () => {
  let store, actions;
  actions = {
    login: jest.fn(),
    register: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        actions
      }
    }
  })
  const router = new VueRouter()
  const wrapper = mount(LoginForm, {
    router,
    localVue,
    store,
    Vuetify
  })
  it('should contain welcome text', function () {
    expect(wrapper.text()).toContain('Welcome back! Please login to your account.')
  });
  it('should form submit trigger login function', async function () {
    const form = wrapper.findComponent({ref: 'loginForm'})
    form.trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(actions.login).toHaveBeenCalled()
  });
  it('should trigger submit event', async function () {
    const loginBtn = wrapper.findComponent({ref: 'login'})
    const form = wrapper.findComponent({ref: 'loginForm'})
    expect(loginBtn.exists()).toBe(true)
    loginBtn.vm.$emit('submit')
    await wrapper.vm.$nextTick()
    expect(
      form.emitted()
    ).toBeTruthy()
  });
  it('should navigate to signup page', async function () {
    const btn = wrapper.findComponent({ref: "signup"})
    expect(btn.exists()).toBeTruthy()
    expect(btn.props('to')).toBe("/sign-up")
  })
})