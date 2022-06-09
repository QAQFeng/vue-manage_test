<!-- 对 echarts 组件进行封装，优化代码 -->

<template>
    <div ref="echart"></div>
</template>

<script>
import * as echart from 'echarts'

export default {
    props: {
        // 判断是否为饼图（饼图没有 x 轴和 y 轴）
        isAxisChart: {
            type: Boolean,
            default: true // 默认值为 true，不是饼图
        },
        // 接受传入的 option（参数）
        chartData: {
            type: Object,
            default() {
                return {
                    xData: [],
                    series: []
                }
            }
        }
    },
    // 设置事件监听，当传入的数据改变时，需要重新绘制 echarts 图表
    watch: {
        chartData: {
            // 执行 function() 函数，调用 initChart() 方法
            handler: function () {
                this.initChart()
            },
            deep: true // 监听的数据的深度（存在 Object 对象）
            // immediate: true 将立即以表达式的当前值触发回调
        }
    },
    methods: {
        // 初始化 echarts
        initChart() {
            this.initChartData()
            // 渲染 echarts （首先判断 echarts 是否已经渲染）
            if (this.echart) {
                this.echart.setOption(this.options)
            } else {
                this.echart = echart.init(this.$refs.echart)
                this.echart.setOption(this.options)
            }

        },
        initChartData() {
            if (this.isAxisChart) {
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            } else {
                this.normalOption.series = this.chartData.series
            }
        }
    },
    data() {
        return {
            // 柱状图和折线图的基本参数
            axisOption: {
                // 图例文字颜色
                title: { },
                textStyle: {
                    color: "#333",
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: [], // 等待传入参数
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [], // 等待传入参数
            },
            // 饼状图基本参数
            normalOption: {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [], // 等待传入参数
            },
            echart: null            
        }
    },
    computed: {
        options() {
            // isAxisChart 值为 true，是柱状图或折线图，false 为饼图
            return this.isAxisChart ? this.axisOption : this.normalOption
        }
    }
}

</script>
