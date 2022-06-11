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
                <el-menu-item @click="(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        menu: []
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
        },
      // item 为 data.menu[] 里的一个路由（元素）
        clickMenu(item) {
        // 点击侧边栏跳转到相应路由
        this.$router.push({
            name: item.name
        }),
        // 点击侧边栏修改标签
        this.$store.commit('selectMenu', item)
      }
    },
    computed: {
        // 判断是否含有子路由，对侧栏 CommonAside 区别渲染
        noChildren() {
            // return this.menu.filter(item => !item.children)
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren() {
            // return this.menu.filter(item => item.children)
            return this.asyncMenu.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        // 获取动态路由更新后的 menu
        asyncMenu() {
            return this.$store.state.tab.menu
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