import {createLocalVue, mount} from "@vue/test-utils";
import Vuetify from 'vuetify';
import Vuex from "vuex"
import Vue from 'vue'
import SettingMembers from "@/components/workspaces/SettingMembers";


Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing SettingMember.vue', function () {
    let actions, store, wrapper
    beforeAll(() => {
        actions = {
            getWorkspaceMembers: jest.fn(() => new Promise(resolve => {
                const response = {
                    data: {
                        members: [
                            {
                                email: 'foo@foo.com',
                                first_name: 'foo',
                                last_name: 'foobar',
                                profile_picture: '',
                                is_head: false
                            },
                            {
                                email: 'foo@bar.com',
                                first_name: 'bar',
                                last_name: 'foobar',
                                profile_picture: '',
                                is_head: true
                            },
                            {
                                email: 'foo@foo.com',
                                first_name: 'foo',
                                last_name: 'foobar',
                                profile_picture: '',
                                is_head: false
                            }
                        ],
                        can_edit: true
                    }
                }
                resolve(response)
            })),
            removeUser: jest.fn(() => new Promise(resolve => {
                resolve(1)
            }))
        }
        store = new Vuex.Store({
            actions
        })
        const vuetify = new Vuetify({})
        wrapper = mount(SettingMembers, {
            localVue,
            store,
            vuetify,
            mocks: {
                $route: {
                    params: {
                        workspace: Math.random() * 1000
                    }
                }
            }
        })
    })
    it('should get members on load', async function () {
        await wrapper.vm.$nextTick()
        expect(actions.getWorkspaceMembers).toHaveBeenCalled()
    });
    it('should ask for confirmation when removing user', async function () {
        await wrapper.setData({showRemoveDialog: true})
        const dialog = wrapper.findComponent({ref: 'confirm'})
        expect(dialog.isVisible()).toBeTruthy()
    });
    it('should call remove user', async function () {
        await wrapper.setData({showRemoveDialog: true})
        const dialog = wrapper.findComponent({ref: 'confirm'})
        await dialog.vm.$emit('close-dialog', true)
        expect(actions.removeUser).toHaveBeenCalled()
        expect(actions.getWorkspaceMembers).toHaveBeenCalled()
    });
});