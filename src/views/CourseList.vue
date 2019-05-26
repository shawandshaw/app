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
                        :items="courses"
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
                            <v-card @click="selectCourse(props.item.id)" >
                                <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>教师名:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.teacherName }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>给分情况:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scoreList[0] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>知识深度:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scoreList[1] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>课堂氛围:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scoreList[2] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>作业数量:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scoreList[3] }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>考试难度:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.scoreList[4] }}</v-list-tile-content>
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
import Cookies from "js-cookie";

    export default {
        name: "CourseList",
        components:{mainlayout},
        mounted(){

        },
        created(){
            this.axios.get('/api/getCourses',{
                params:{
                    username:Cookies.get('username')
                }
            })
             .then(res => {
                        if (res.data.length) {
                            this.courses=res.data;
                            this.sort()
                        } else {
                            alert('获取课程列表失败');
                        }
                    });
            
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
            courses: [
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
                    this.courses.sort((c1,c2)=>{
                        if(c1.scoreList[code]>c2.scoreList[code])return -1;
                        else return 1;
                    })

                    // for(let i=0;i<this.courses.length;i++){

                    //     for (let j=i;j<this.courses.length;j++){
                    //         if(this.courses[i].scoreList[code]<this.courses[j].scoreList[code]){

                    //             let k = this.courses[i]
                    //             this.courses[i] = this.courses[j]
                    //             this.courses[j] = k

                    //         }
                    //     }
                    // }

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