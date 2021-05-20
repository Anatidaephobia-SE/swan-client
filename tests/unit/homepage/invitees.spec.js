import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import Invitation from "@/components/homepage/Invitation";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify);
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing invitation.vue", () => {
  let wrapper, store, actions;
  beforeEach(() => {
    actions = {
      acceptInvite: jest.fn(),
      rejectInvite: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
    const vuetify = new Vuetify()
    const router = new VueRouter()
    wrapper = mount(Invitation, {
      localVue,
      router,
      store,
      vuetify,
      propsData: {
        workspace: {
          id: 1,
          name: 'foo',
          logo: '',
          head_name: 'foobar'
        }
      }
    })
  })
  it('should contain <... invited you>', function () {
    expect(wrapper.text()).toContain("foobar invited you!")
  });
  it('should accept invite', async function () {
    const accept = wrapper.findComponent({ref: 'accept'})
    expect(accept.exists()).toBeTruthy()
    await accept.trigger("click")
    expect(actions.acceptInvite).toHaveBeenCalled()
  });
  it('should reject invite', async function () {
    const accept = wrapper.findComponent({ref: 'reject'})
    expect(accept.exists()).toBeTruthy()
    await accept.trigger("click")
    expect(actions.rejectInvite).toHaveBeenCalled()
  });
})