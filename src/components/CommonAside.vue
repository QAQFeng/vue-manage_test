<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
     background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
     @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
        <!-- 一级菜单栏 -->
        <el-menu-item @click="clickMenu(item)" class="First-level-menu" v-for="item in noChildren" :index="item.path" :key="item.path">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- 二级菜单栏 -->
        <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        menu: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
            {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'MallManage/MallManage'
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                label: '其他',
                icon: 'location',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '页面一',
                        icon: 'setting',
                        url: 'Other/pageOne'
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        label: '页面二',
                        icon: 'setting',
                        url: 'Other/pageTwo'
                    }
                ]
            }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
        this.$router.push({
            name: item.name
        })
      }
    },
    computed: {
        // 判断是否含有子路由，对侧栏 CommonAside 区别渲染
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        hasChildren() {
            return this.menu.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }
    }
  }
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;  
    min-height: 400px;
}

.el-menu {
    height: 100%;
    border: none;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
}
</style>