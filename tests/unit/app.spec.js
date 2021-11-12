import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App.vue'


const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('App.vue', () => {
  it('renders div #app', () => {
    const wrapper = shallowMount(App, {
      localVue,
      router
    })
    expect(wrapper.find('#app')).toBeVisible
  })

  it('renders div home', () => {
    const wrapper = shallowMount(App, {
      localVue,
      router
    })
    expect(wrapper.find('#app').find('.home')).toBeVisible
  })

  it('not renders nav', () => {
    const wrapper = shallowMount(App, {
      localVue,
      router
    })
    expect(wrapper.find('#nav')).not.toBeVisible
  })
})
