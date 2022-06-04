<template>
    
    <!-- 栅格间隔为 20 -->
    <el-row class="home" :gutter="20">

        <!-- 左侧区域，这一栅格占 8 列 -->
        <el-col :span="8" style="margin-top: 20px">
            <!-- 个人信息区域，鼠标移动到 el-card 上显示阴影 -->
            <el-card shadow="hover">
                <div class="user">
                    <img class="img" :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">系统管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2022-06-03</span></p>
                    <p>上次登录地点：<span>海口</span></p>
                </div>
            </el-card>

            <!-- 表单区域 -->
            <el-card style="margin-top: 20px; height: 460px;">
                <el-table :data="tableData">
                    <el-table-column
                        v-for="(val, key) in tableLabel"
                        :key="key"
                        :prop="key"
                        :label="val"
                    >

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>

        <!-- 右侧区域 -->
        <el-col :span="16" style="margin-top: 20px">
            <!-- 订单数据 -->
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>

            <!-- echart 表格 -->
            <div>
                <el-card style="height: 280px"></el-card>
                <div class="graph">
                    <el-card style="height: 260px"></el-card>
                    <el-card style="height: 260px"></el-card>
                </div>
            </div>
            
        </el-col>
    </el-row>
    
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            userImg: require('../../src/assets/images/user.png'),
            tableData: [
                 {
                    name: 'oppo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: 'vivo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '苹果',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '小米',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '三星',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '魅族',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                }
            ],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ]


        }
    }

}
</script>

<style>

</style>