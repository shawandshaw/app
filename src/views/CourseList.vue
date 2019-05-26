<template>
    <div>
        <mainlayout title="课程列表">
            <div>
                <v-alert
                        :value="showMSG"
                        color="success"
                        icon="check_circle"
                        outline
                >
                    This is a success alert.
                </v-alert>
            </div>
            <v-container fluid grid-list-md>
                <v-data-iterator
                        :items="items"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        content-tag="v-layout"
                        hide-actions
                        row
                        wrap
                >
                    <template v-slot:item="props">
                        <v-flex
                                xs12
                                sm6
                                md4
                                lg3
                        >
                            <v-card @click="selectCourse(props.item.name)">
                                <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>教师名:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.teachername }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>推荐度:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.avg }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>给分情况:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scorelist[0] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>知识深度:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scorelist[1] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>课堂氛围:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scorelist[2] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>作业数量:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scorelist[3] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>考试难度:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scorelist[4] }}</v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </template>
                </v-data-iterator>
            </v-container>
        </mainlayout>
    </div>
</template>

<script>
    import mainlayout from '../layout/mainlayout'
    export default {
        name: "CourseList",
        components:{mainlayout},
        mounted(){

        },
        data: () => ({
            showMSG:true,
            rowsPerPageItems: [4, 8, 12],
            pagination: {
                rowsPerPage: 10000000
            },
            items: [
                {
                    name:"微积分",
                    teachername:"张宇杰",
                    avg:93.7,
                    scorelist:[93,99,95,96,91]
                },
                {
                    name:"离散数学",
                    teachername:"张宇杰",
                    avg:91.7,
                    scorelist:[97,99,65,96,95]
                },
                {
                    name:"线性代数",
                    teachername:"张宇杰",
                    avg:85.3,
                    scorelist:[87,79,65,96,93]
                }
            ]
        }),
        methods:{
            selectCourse(CourseID){
                // console.log(CourseID)
                this.$router.push("/CourseInfo/"+CourseID)
            }
        }

    }
</script>

<style scoped>

</style>