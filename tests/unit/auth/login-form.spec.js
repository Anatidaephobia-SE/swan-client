import {mount, shallowMount, createLocalVue} from "@vue/test-utils";
import LoginForm from "@/components/auth/Login-Form"
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(Vuetify);
localVue.use(Vuex)
localVue.use(VueRouter)



describe("Testing Login-Form.vue", () => {
  let store, actions;
  actions = {
    login: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      auth: {
        actions
      }
    }
  })
  const routes = [
    {path: '/sign-up', name: 'signup'}
  ]
  const router = new VueRouter({routes})
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