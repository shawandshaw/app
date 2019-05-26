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
                                                        v-model="username"
                                                        readonly
                                                    />
                                                    <v-text-field
                                                        label="学号"
                                                        v-model="studentNumber"
                                                        :rules="notEmptyRules"
                                                    />
                                                    <v-text-field
                                                        label="就读学校"
                                                        v-model="school"
                                                        :rules="notEmptyRules"
                                                    />
                                                    <v-text-field
                                                        label="所在学院"
                                                        v-model="college"
                                                        :rules="notEmptyRules"
                                                    />
                                                    <v-text-field
                                                        label="就读专业"
                                                        v-model="major"
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
export default {
    name: "StudentInfo",
    components: { mainlayout },
    mounted() {
        this.axios
            .post("/api/getStudentInfo", {
                username: this.username
            })
            .then(res => {
                if (res.data.status === "success") {
                    alert("hhh");
                } else {
                    alert(res.data.message);
                }
            });
    },
    data() {
        return {
            active: null,
            school: "test",
            college: "testc",
            major: "tesmt",
            username: "123",
            studentNumber: "123123131",
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
                    username: this.username,
                    studentNumber: this.studentNumber,
                    college: this.college,
                    major: this.major,
                    school: this.school
                })
                .then(res => {
                    if (res.data.status === "success") {
                        alert("hhh");
                    } else {
                        alert(res.data.message);
                    }
                });
        },
        updatePassword() {
            this.axios
                .post("/api/updateStudentPassword", {
                    username: this.username,
                    password: this.password,
                    school: this.newpassword
                })
                .then(res => {
                    if (res.data.status === "success") {
                        alert("hhh");
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    }
};
</script>

<style scoped>
</style>