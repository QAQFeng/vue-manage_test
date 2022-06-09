<template>
    <div class="manage">
        <!-- dialog 弹窗 -->
        <!-- 判断是 "新增用户" 还是 "更新用户" 操作 -->
        <el-dialog
            :title="operateType === 'add' ? '新增用户' : '更新用户' "
            :visible.sync="isShow"
        >
            <common-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            ></common-form>
            <!-- 自定义底部 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>

         <!-- 新增 和 搜索 按钮 -->
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <common-form
                :formLabel="formLabel"
                :form="searchFrom"
                :inline="true"
                ref="form"
            >
                <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getList()"
            @edit="editUser"
            @del="delUser"
        ></common-table>
    </div>
</template>

<script>
import CommonForm from '../../src/components/CommonForm.vue'
import CommonTable from '../../src/components/CommonTable.vue'
import { getUser } from '../../api/data'

export default {
    name: 'User',
    components: {
        CommonForm,
        CommonTable
    },
    data() {
        return {
            // 判断是 "新增用户" 还是 "更新用户" 操作，默认为 "新增用户"
            operateType: 'add',
            // 默认弹窗不显示
            isShow: false,
            // form 弹窗配置数据
            operateFormLabel: [
                {
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                },
                {
                    model: 'age',
                    label: '年龄',
                    type: 'input'
               },
                {
                    model: 'sex',
                    label: '性别',
                    type: 'select',
                    opts: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }
                    ]
                },
                {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                },
                {
                    model: 'addr',
                    label: '地址',
                    type: 'input'
                }
            ],
            // form 弹窗双向绑定
            operateForm: {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            },
            // 搜索框配置
            formLabel: [
                {
                    model: "keyword",
                    label: '',
                    type: 'input'
                }
            ],
            // "搜索" 按钮数据双向绑定
            searchFrom: {
                keyword: ''
            },
            // table 数据
            tableData: [],
            // table 标签
            tableLabel: [
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "age",
                    label: "年龄"
                },
                {
                    prop: "sexLabel",
                    label: "性别"
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 320
                }
            ],
            // 分页配置数据
            config: {
                page: 1,
                tatal: 30
            }
        }
    },
    methods: {
        confirm () {
            // 判断是 "新增用户" 还是 "更新用户" 操作
            if (this.operateType === 'edit') {
                this.$http.post('/user/edit', this.operateForm).then(res => {
                    console.log(res)
                    this.isShow = false // 关闭弹窗
                    this.getList() // 更新数据
                })
            } else {
                this.$http.post('/user/add', this.operateForm).then(res => {
                    console.log(res)
                    this.isShow = false // 关闭弹窗
                    this.getList() // 更新数据
                })
            }
        },
        addUser() {
            // 显示弹窗，类型设置为 add(添加用户)，初始化弹窗数据
            this.isShow = true
            this.operateType = 'add'
            this.operateForm = {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            }
        },
        // row 为当前行用户信息
        editUser(row) {
            // 显示弹窗，类型设置为 edit(编辑用户)，回显用户数据
            this.operateType = 'edit'
            this.isShow = true
            this.operateForm = { ...row } // 解构赋值，不影响原数据，在点击确认按钮后才修改用户数据
            // this.operateForm = row  // 直接赋值，在编辑的时候就已经修改了原数据，即使点击 "取消" 按钮，数据依然会被修改
        },
        delUser(row) {
            // 调用 element-ui 中的 MessageBox 弹窗组件的 confirm 方法，点击 "删除" 按钮弹出提示框
            this.$confirm("此操作将永久和删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => { 
                // const body = JSON.parse(config.body)
                // const id = body.params.id
                const id = row.id
                this.$http.post("/user/del", {
                    params: { id }
                }).then(() => { 
                    // 调用 element-ui 中的 Message 弹窗组件的 message 方法，删除成功后弹出提示框
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getList() // 更新数据
                })
            })
            // .catch(()=>{}) // 添加错误捕获
        },
        // name为输入框中的内容
        getList (name = '') {
            // 在vue项目中请求后台接口时，常常会使用 loading 过渡数据的加载时间
            this.config.loading = true
            // 判断传入的 name 是否存在，存在则将当前页置为 1，否则置为空
            name ? (this.config.page = 1) : ''
            getUser({
                page: this.config.page,
                name
            }).then(({ data: res }) => {
                // 上方需要 解构赋值，否则无法显示 用户数据（待解决原因）
                this.tableData = res.list.map(item => {
                    item.sexLabel = item.sex === 0 ? "女" : "男"
                    return item
                })
                this.config.total = res.count
                this.config.loading = false
            })
        }
    },
    // 在模板渲染成 html 前调用 created，在模板渲染成 html 后调用 mounted
    created() {
        // 在进入 "用户管理" 界面时要渲染 table 数据
        this.getList()
    }

}
</script>

<style lang="less" scoped>
.manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center
}
</style>