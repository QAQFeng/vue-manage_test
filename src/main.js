import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router'
import '../src/assets/less/index.less'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
