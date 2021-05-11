import {mount, createLocalVue} from "@vue/test-utils";
import LoginForm from "@/components/auth/Login-Form"
import Vuetify from 'vuetify';
import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuetify)
Vue.use(Vuex)
const localVue = createLocalVue()
localVue.use(Vuetify);
localVue.use(Vuex)

describe("Testing Login-Form.vue", () => {
  let store, actions;
  beforeEach(() => {
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
  })


  const wrapper = mount(LoginForm, {
    stubs: ['router-link', 'router-view']
  })
  it('should contain welcome text', function () {
    expect(wrapper.text()).toContain('Welcome back! Please login to your account.')
  });
  it('should trigger login function', function () {
    const loginBtn = wrapper.findComponent({ref: 'login'})
    loginBtn.trigger('click')
    expect(actions.login).toHaveBeenCalled()
  });
})