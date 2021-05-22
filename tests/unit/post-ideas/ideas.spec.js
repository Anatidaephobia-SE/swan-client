import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import VueRouter from 'vue-router'
import Vue from 'vue'
import Ideas from "@/views/Ideas";
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
      getCards: jest.fn(),
    }
    actions2 = {
      getWorkspaceMembers: jest.fn()
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
    wrapper = mount(Ideas, {
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
    expect(actions.getCards).toHaveBeenCalled()
  });
})