import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import Invitations from "@/components/homepage/Invitations";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify);
localVue.use(Vuex)
localVue.use(VueRouter)

describe("Testing Invitations.vue", () => {
  let wrapper, store, actions;
  beforeEach(() => {
    actions = {
      getInvites: jest.fn(),
    }
    store = new Vuex.Store({
      actions
    })
    const vuetify = new Vuetify()
    const router = new VueRouter()
    wrapper = mount(Invitations, {
      localVue,
      router,
      store,
      vuetify,
    })
  })
  it('should get invites when mounted', function () {
    expect(actions.getInvites).toHaveBeenCalled()
  });
  it('should have no new invitations', function () {
    expect(wrapper.text()).toContain("No new invitation!")
  });
  it('should have an invite', async function () {
    const invites = [
      {
        id: 1,
        name: 'foo',
        logo: '',
        head_name: 'foobar'
      },
      {
        id: 2,
        name: 'bar',
        logo: '',
        head_name: 'foobar'
      }
    ]
    await wrapper.setData({invitees: invites})
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain("No new invitation!")
    expect(wrapper.vm.$data.invitees.length).toBe(2)
  });
})