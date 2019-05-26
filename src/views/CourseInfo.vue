<template>
    <div>
        <mainlayout title="课程信息">
            <v-content>
                <v-container align-center justify-space-around row fill-height>
                    <v-layout>
                    <v-flex xs12 sm6 offset-sm5>
                        <v-card>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                                    <!--<div></div>-->
                                    <div id="card" style="width: 300px;height: 500px "></div>
                                </div>
                            </v-card-title>

                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </mainlayout>
    </div>
</template>

<script>
import mainlayout from '../layout/mainlayout'

    export default {

        name: "CourseInfo",
        components:{mainlayout},
        mounted(){
            let myChart = this.$echarts.init(document.getElementById('card'));
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {},
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '给分情况', max: 100},
                        { name: '知识深度', max: 100},
                        { name: '课堂氛围', max: 100},
                        { name: '作业数量', max: 100},
                        { name: '考试难度', max: 100},
                    ]
                },
                series: [{
                    name: '课程信息',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : [43, 10, 28, 30, 50],
                            name : '五维分布'
                        }
                    ]
                }]
            })

        },
        props:[
          'CourseID'
        ],
        data: () => ({

        }),
        methods:{

        }
    }
</script>

<style scoped>

</style>