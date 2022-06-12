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
                <el-card style="height: 280px">
                    <!-- 设置 DOM 元素 echarts，通过 this.$refs 引用 DOM 元素 -->
                    <!-- <div style="height: 280px" ref="echarts"></div> -->
                    <echart :chartData="echartData.order" style="height: 280px"/>
                </el-card>
                <div class="graph">
                    <el-card style="height: 265px">
                        <!-- <div style="height: 240px" ref="userEcharts"></div> -->
                        <echart :chartData="echartData.user" style="height: 240px"/>
                    </el-card>
                    <el-card style="height: 265px">
                        <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
                        <echart :chartData="echartData.video" style="height: 240px" :isAxisChart="false" />
                    </el-card>
                </div>
            </div>
            
        </el-col>
    </el-row>
    
</template>

<script>
// 导入 echarts
// import * as echarts from 'echarts'

import { getData } from '../../api/data.js'

import Echart from '../../src/components/Echarts.vue'


export default {
    name: 'home',
    components: {
        Echart
    },
    data() {
        return {
            userImg: require('../../src/assets/images/user.png'),
            // 表单数据
            tableData: [],
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
            ],
            echartData: {
                order: {
                    title: { text: '销量' },
                    xData: [],
                    series: []
                },
                user: {
                    // title: { text: '销量' },
                    xData: [],
                    series: []
                },
                video: {
                    // title: { text: '销量' },
                    series: []
                }
            }
        }
    },
    mounted() {
        console.log(this.echartData.order)
        getData().then(res => {
            const { code, data } = res.data
            if (code === 20000) {
                // 首页左侧表单数据
                this.tableData = data.tableData

                // 首页右侧折线图
                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0]) // 使用 Object.keys() 方法获取 key 值
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })

                })
                // const option = {
                //     title: { text: '销量' },
                //     // 当 trigger 为 item 时只会显示该点的数据，为 axis 时显示该列下所有坐标轴所对应的数据。
                //     tooltip: {
                //          trigger: "axis",
                //     },
                //     legend: {
                //         data: keyArray
                //     },
                //     xAxis: {
                //         data: xData
                //     },
                //     yAxis: {},
                //     series
                // }
                // // 基于准备好的dom，初始化echarts实例
                // const E = echarts.init(this.$refs.echarts)
                // // const E = echarts.init(document.getElementById('echarts'));
                // // 使用刚指定的配置项和数据显示图表。
                // E.setOption(option)
                this.echartData.order.xData = xData
                this.echartData.order.series = series

                // // 首页右侧折线图
                // const userOption = {
                //     title: { text: '' },
                //     tooltip: {
                //          trigger: "axis",
                //     },
                //     legend: {},
                //     xAxis: {
                //         data: data.userData.map(item => item.date)
                //     },
                //     yAxis: {},
                //     color: ["#2ec7c9", "#b6a2de"],
                //     grid: {
                //         left: "18%",
                //     },
                //     series: [
                //         {
                //             name: '新增用户',
                //             data: data.userData.map(item => item.new),
                //             type: 'bar'
                //         },
                //         {
                //             name: '活跃用户',
                //             data: data.userData.map(item => item.active),
                //             type: 'bar'
                //         }
                //     ]
                // }
                // const U = echarts.init(this.$refs.userEcharts)
                // U.setOption(userOption)

                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series = [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        }
                    ]


                // // 首页右侧饼图
                // const videoOption = {
                //     title: { text: '市场份额' },
                //     color: [
                //         "#0f78f4",
                //         "#dd536b",
                //         "#9462e5",
                //         "#a6a6a6",
                //         "#e1bb22",
                //         "#39c362",
                //         "#3ed1cf",
                //     ],
                //     tooltip: {
                //          trigger: "item",
                //     },
                //     series: [
                //         {
                //             type: 'pie',
                //             data: data.videoData
                //         }
                //     ]
                // }
                // const V = echarts.init(this.$refs.videoEcharts)
                // V.setOption(videoOption)

                this.echartData.video.series = [
                        {
                            type: 'pie',
                            data: data.videoData
                        }
                    ]
            }
            console.log(res, 'home-res')
        })
    }
}
</script>
