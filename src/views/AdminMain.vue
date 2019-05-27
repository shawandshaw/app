<template>
    <adminlayout>
        <div class="text-xs-center" v-if="dialog">
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-title class="headline blue lighten-2" primary-title>审核确认</v-card-title>

                    <v-card-text v-if="loc>=0">
                        课程编号：{{items[loc].id}}
                        课程名称：{{items[loc].name}}
                        教师姓名：{{items[loc].teacherName}}
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="confirm()">确定</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-toolbar color="pink" dark>
                            <v-toolbar-side-icon></v-toolbar-side-icon>
                            <v-toolbar-title>待审核列表</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-list two-line no-data-text="暂无数据">
                            <template v-for="(item, index) in items">
                                <v-list-tile :key="index" avatar ripple @click="handleClick(index)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>课程编码：{{ item.id }} 课程名称：{{ item.name }} 教师姓名：{{ item.teacherName }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider
                                    v-if="index + 1 < items.length"
                                    :key="`divider-${index}`"
                                ></v-divider>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </adminlayout>
</template>

<script>
import adminlayout from "../layout/adminlayout";
export default {
    name: "AdminMain",
    components: { adminlayout },
    created() {
        this.axios.get("/api/getUnconfirmList").then(res => {
            this.items = res.data;
        });
    },
    data() {
        return {
            items: [
                // {
                //     id: "123321",
                //     name: "微积分",
                //     teacherName: "张宇杰"
                // },
                // {
                //     id: "123324",
                //     name: "离散数学",
                //     teacherName: "张宇杰"
                // },
                // {
                //     id: "123325",
                //     name: "线性代数",
                //     teacherName: "张宇杰"
                // }
            ],
            dialog: false,
            loc: 0
        };
    },
    methods: {
        handleClick(index) {
            this.loc = index;
            this.dialog = true;
        },
        confirm() {
            this.axios
                .get("/api/confirmCourse", {
                    params: {
                        id: this.items[this.loc].id
                    }
                })
                .then(res => {
                    if ((res.data = "SUCCESS")) {
                        this.dialog = false;
                        this.items.splice(this.loc, 1);
                        this.loc = -1;
                    }
                });
        }
    }
};
</script>

<style scoped>
</style>