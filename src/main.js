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
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn
} from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';
// 导入配置文件（CSS）
import '../src/assets/less/index.less'


// 导入路由器（router）文件夹
import router from '../router'
// 导入 store 文件夹（vuex 仓库）
import store from '../store'


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
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
