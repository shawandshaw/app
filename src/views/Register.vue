<template>
    <v-app id="register">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue-grey darken-2">
                            <v-toolbar-title>SIGN UP</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon large>
                                <v-icon large>code</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form_student" lazy-validation>
                                <v-text-field
                                    prepend-icon="person"
                                    v-model="student.username"
                                    :rules="notEmptyRules"
                                    required
                                    name="username"
                                    label="用户名"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="home"
                                    v-model="student.school"
                                    :rules="notEmptyRules"
                                    required
                                    name="school"
                                    label="学校"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="home"
                                    v-model="student.college"
                                    :rules="notEmptyRules"
                                    required
                                    name="school"
                                    label="学院"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="home"
                                    v-model="student.major"
                                    :rules="notEmptyRules"
                                    required
                                    name="school"
                                    label="专业"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="contact_mail"
                                    v-model="student.studentNumber"
                                    :rules="notEmptyRules"
                                    required
                                    name="studentNumber"
                                    label="学号"
                                    type="text"
                                ></v-text-field>

                                <v-text-field
                                    v-model="student.password"
                                    :rules="passwordRules"
                                    prepend-icon="lock"
                                    name="password"
                                    label="密码"
                                    type="password"
                                ></v-text-field>
                                <v-text-field
                                    @keyup.enter="submit"
                                    prepend-icon="lock"
                                    v-model="student.passwordAgain"
                                    :rules="student.passwordAgainRules"
                                    name="passwordAgain"
                                    label="重复密码"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="$router.push('/')" flat>
                                <v-icon>arrow_back</v-icon>sign in
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue-grey darken-2"
                                @click="studentSignUP"
                                class="white--text"
                            >sign up</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            showMap: false,
            student: {
                studentNumber: "",
                username: "",
                school: "",
                college: "",
                major: "",
                password: "",
                passwordAgain: "",
                passwordAgainRules: [
                    v => !!v || "password is required",
                    v =>
                        (v && v === this.student.password) ||
                        "Passwords are not the same"
                ]
            },
            notEmptyRules: [v => !!v || "此项不能为空"],
            passwordRules: [
                v => !!v || "password is required",
                v =>
                    (v && v.length >= 6) ||
                    "Password must be more than 6 characters"
            ]
        };
    },
    methods: {
        studentSignUP() {
            if (this.$refs.form_student.validate()) {
                // Native form submission is not yet supported
                this.axios
                    .post("/api/register", {
                        studentNumber: this.student.studentNumber,
                        username: this.student.username,
                        school: this.student.school,
                        college: this.student.college,
                        major: this.student.major,
                        password: this.student.password
                    })
                    .then(res => {
                        if (res.data === "SUCCESS") {
                            this.$router.push("/");
                        } else {
                            alert('注册失败');
                        }
                    });
            }
        }
    }
};
</script>

<style>
</style>
