<template>
    <mainlayout>
        <v-container>
            <v-layout align-center row fill-height>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-tabs v-model="active" color="grey"  slider-color="yellow">
                            <v-tab v-for="n in 1" :key="n" ripple>{{ operation[n-1] }}</v-tab>
                            <v-tab-item v-for="n in 2" :key="n">
                                <v-layout row justify-space-around>
                                    <v-flex>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field
                                                    label="课程编号"
                                                    v-model="id"
                                                    :rules="notEmptyRules"
                                                />
                                                <v-text-field
                                                    label="课程名称"
                                                    v-model="name"
                                                    :rules="notEmptyRules"
                                                />
                                                <v-text-field
                                                    label="授课教师"
                                                    v-model="teacherName"
                                                    :rules="notEmptyRules"
                                                />
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-layout row justify-space-around>
                                                    <v-btn
                                                        flat
                                                        color="blue"
                                                        @click="submit()"
                                                    >确认提交</v-btn>
                                                </v-layout>
                                            </v-card-actions>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </mainlayout>
</template>

<script>
import mainlayout from "../layout/mainlayout";
export default {
    name: "CreateCourse",
    components: { mainlayout },
    data() {
        return {
            active: 0,
            operation: ["新建课程"],
            notEmptyRules: [v => !!v || "此项不能为空"],
            name: "",
            id: "",
            teacherName: ""
        };
    },
    methods: {
        submit() {
            this.axios
                .post("/api/createCourse", {
                    id: this.id,
                    name: this.name,
                    teacherName: this.teacherName
                })
                .then(res => {
                    if (res.data === "SUCCESS") {
                        this.id = "";
                        this.name = "";
                        this.teacherName = "";
                        alert("新建成功");
                    } else {
                        alert("新建失败");
                    }
                });
        }
    }
};
</script>

<style scoped>
</style>