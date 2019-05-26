<template>
    <div>
        <mainlayout title="课程列表">



            <v-container fluid grid-list-md v-if="ifshow">
                <div>
                    <v-alert
                            :value="showMSG"
                            color="success"
                            icon="check_circle"
                            outline
                    >
                        修改排序方式成功
                    </v-alert>
                    <br>
                </div>
                <v-toolbar
                        class="mb-2"
                        color="lightgrey darken-5"
                        dark
                        flat
                >
                    <v-flex xs12 sm2 d-flex>
                        <v-select
                                :items="order"
                                label="排序方式"
                                v-model="sortType"
                                @change="sort()"
                        ></v-select>
                    </v-flex>

                </v-toolbar>
                <v-data-iterator
                        :items="items"
                        :rows-per-page-items="rowsPerPageItems"
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
                            <v-card @click="selectCourse(props.item.name)" >
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
            ifshow:true,
            sortType:"推荐优先",
            showMSG:false,
            rowsPerPageItems: [4, 8, 12],
            pagination: {
                rowsPerPage: 10000000
            },
            order:["推荐优先","给分情况优先","知识深度优先","课堂氛围优先","作业数量优先","考试难度优先"],
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
            ],
            preList : [],
        }),
        methods:{
            selectCourse(CourseID){
                // console.log(CourseID)
                this.$router.push("/CourseInfo/"+CourseID)
            },
            sort(){
                let code = -1;
                this.ifshow=false;
                switch (this.sortType){
                    case this.order[1]:{
                        code = 0
                        break;
                    }
                    case this.order[2]:{
                        code = 1
                        break;
                    }
                    case this.order[3]:{
                        code = 2
                        break;
                    }
                    case this.order[4]:{
                        code = 3
                        break;
                    }
                    case this.order[5]:{
                        code = 4
                        break;
                    }
                }
                if(code>-1){

                    for(let i=0;i<this.items.length;i++){

                        for (let j=i;j<this.items.length;j++){
                            if(this.items[i].scorelist[code]<this.items[j].scorelist[code]){

                                let k = this.items[i]
                                this.items[i] = this.items[j]
                                this.items[j] = k

                            }
                        }
                    }

                }
                this.$nextTick(() => {
                    this.ifshow=true;
                })

            }
        }

    }
</script>

<style scoped>

</style>