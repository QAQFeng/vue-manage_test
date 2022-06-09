<template>
    <div class="tabs">
        <el-tag 
            v-for="(tag, index) in tags"
            :key="tag.name"
            size="medium" 
            :closable="tag.name != 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'" 
            @click="changeMenu(tag)" 
            @close="handleClose(tag, index)"
            >
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
// 导入 store 里的 state，mutations 模块
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'CommonTag',
    data() {
        return {

        }
    },
    computed: {
        // 解构 state
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        // 解构 mutations
        ...mapMutations({
            close: 'closeTag'
        }),
        // 点击 el-tag 标签时切换路由
        changeMenu(item) {
            this.$router.push({name: item.name})
        },
         // 点击 × 时，关闭相应 tag，并跳转到新的 tag ；
        // 同时需要在 tab.js 中构建新方法 closeTag() 删除 state.tabsList[] 数组中的数据并使用 mapMutations 注入
        handleClose(tag, index) {
            const length = this.tags.length - 1
            this.close(tag)
            // 除了导入 mutations 模块再引用，也可以直接使用 this.$store.commit() 导入
            // this.$store.commit('closeTag', tag)
            if (tag.name !== this.$route.name) {
                return;
            }
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    // index 不需要加 1，因为会删除掉当前 tag
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>

.tabs {
    padding: 20px;
    // .el-tag 无效，在前面加上 /deep/
    /deep/ .el-tag {
        margin-right: 15px;
        // 设置光标类型，鼠标指针悬停在元素上显示相应样式
        cursor: pointer;
    }
}
</style>