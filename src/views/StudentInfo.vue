<template>
    <mainlayout title="个人信息">
        <div>
            <v-container>
                <v-layout align-center row fill-height>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card>
                            <v-tabs v-model="active" color="darkcyan" dark slider-color="yellow">
                                <v-tab v-for="n in 2" :key="n" ripple>{{ operation[n-1] }}</v-tab>
                                <v-tab-item v-for="n in 2" :key="n">
                                    <v-layout row justify-space-around>
                                        <v-flex>
                                            <v-card flat v-if="n===1">
                                                <v-card-text>
                                                    <v-text-field
                                                        label="用户名"
                                                        v-model="stuInfo.username"
                                                        readonly
                                                    />
                                                    <v-text-field
                                                        label="学号"
                                                        v-model="stuInfo.studentNumber"
                                                        :rules="notEmptyRules"
                                                    />
                                                    <v-text-field
                                                        label="就读学校"
                                                        v-model="stuInfo.school"
                                                        :rules="notEmptyRules"
                                                    />
                                                    <v-text-field
                                                        label="所在学院"
                                                        v-model="stuInfo.college"
                                                        :rules="notEmptyRules"
                                                    />
                                                    <v-text-field
                                                        label="就读专业"
                                                        v-model="stuInfo.major"
                                                        :rules="notEmptyRules"
                                                    />
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-layout row justify-space-around>
                                                        <v-btn
                                                            flat
                                                            color="orange"
                                                            @click="updateInfo()"
                                                        >确认修改</v-btn>
                                                    </v-layout>
                                                </v-card-actions>
                                            </v-card>
                                            <v-card flat v-if="n===2">
                                                <v-card-text>
                                                    <v-text-field
                                                        label="输入原密码"
                                                        v-model="password"
                                                        type="password"
                                                    />
                                                    <v-text-field
                                                        label="输入新密码"
                                                        v-model="newpassword"
                                                        type="password"
                                                        :rules="passwordRules"
                                                    />
                                                    <v-text-field
                                                        label="确认新密码"
                                                        v-model="newpasswordconfirm"
                                                        type="password"
                                                        :rules="passwordAgainRules"
                                                    />
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-layout row justify-space-around>
                                                        <v-btn
                                                            flat
                                                            color="orange"
                                                            @click="updatePassword()"
                                                        >确认修改</v-btn>
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
        </div>
    </mainlayout>
</template>

<script>
import mainlayout from "../layout/mainlayout";
import Cookies from "js-cookie";
export default {
    name: "StudentInfo",
    components: { mainlayout },
    created() {
        this.axios
            .get("/api/getStudentInfo", {
                params: {
                    username: Cookies.get('username')
                }
            })
            .then(res => {
                if (res.data) {
                    this.stuInfo = res.data;
                } else {
                    alert("获取个人信息失败");
                }
            });
    },
    data() {
        return {
            active: null,
            stuInfo: {
                school: "",
                college: "",
                major: "",
                username: Cookies.get("username"),
                studentNumber: ""
            },
            password: "",
            newpassword: "",
            newpasswordconfirm: "",
            operation: ["信息修改", "密码修改"],
            passwordAgainRules: [
                v => !!v || "password is required",
                v =>
                    (v && v === this.newpassword) ||
                    "Passwords are not the same"
            ],
            passwordRules: [
                v => !!v || "password is required",
                v =>
                    (v && v.length >= 6) ||
                    "Password must be more than 6 characters"
            ],
            notEmptyRules: [v => !!v || "此项不能为空"]
        };
    },
    methods: {
        updateInfo() {
            this.axios
                .post("/api/updateStudentInfo", {
                    username: this.stuInfo.username,
                    studentNumber: this.stuInfo.studentNumber,
                    college: this.stuInfo.college,
                    major: this.stuInfo.major,
                    school: this.stuInfo.school
                })
                .then(res => {
                    if (res.data=== "SUCCESS") {
                    } else {
                        alert("修改失败");
                    }
                });
        },
        updatePassword() {
            this.axios
                .post("/api/updateStudentPassword", {
                    username: this.stuInfo.username,
                    password: this.password,
                    school: this.newpassword
                })
                .then(res => {
                    if (res.data.status === "success") {
                    } else {
                        alert('修改失败');
                    }
                });
        }
    }
};
</script>

<style scoped>
</style>