import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import AddCard from "@/components/ideas/AddCard";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)


describe("Testing AddCard.vue", () => {
  let store, actions, wrapper, actions2
  beforeEach(() => {
    actions = {
      createCard: jest.fn(),
    }
    actions2 = {
      getWorkspaceMembers: jest.fn(() => new Promise(resolve => {
        resolve({
          data: {
            members: []
          }
        })
      }))
    }
    store = new Vuex.Store({
      modules: {
        ideas: {
          namespaced: true,
          actions
        }
      },
      actions: actions2
    })
    const vuetify = new Vuetify({})
    const router = new VueRouter({})
    wrapper = mount(AddCard, {
      localVue,
      store,
      router,
      vuetify,
      propsData: {
        dialog: true
      }
    })
  })

  it('should call createCard method', function () {
    const form = wrapper.findComponent({ref: 'createCardForm'})
    expect(form.exists()).toBeTruthy()
    form.trigger('submit.prevent')
    expect(actions.createCard).toHaveBeenCalled()
  });
  it('should get workspace members on load', function () {
    expect(actions2.getWorkspaceMembers).toHaveBeenCalled()
  });
})