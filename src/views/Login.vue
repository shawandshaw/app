<template>
    <v-app id="login">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue-grey darken-2">
                            <v-toolbar-title>SIGN IN</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon large>
                                <v-icon large>code</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="username"
                                    prepend-icon="person"
                                    name="username"
                                    label="用户名"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    @keyup.enter="submit"
                                    prepend-icon="lock"
                                    name="password"
                                    label="密码"
                                    id="password"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="$router.push('/Register')" flat>
                                <v-icon>arrow_back</v-icon>sign up
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue-grey darken-2"
                                class="white--text"
                                @click="submit"
                            >sign in</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import Cookies from "js-cookie";
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        submit: function() {
            this.axios
                .post("/api/login", {
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    if (res.data === "SUCCESS") {
                        if(this.username === "admin"){
                            Cookies.set('username',this.username)
                            this.$router.push("/AdminMain");
                        }
                        else{
                            Cookies.set('username',this.username)
                            this.$router.push("/CourseList");
                        }
                    } else {
                        alert(res.data);
                    }
                });
        }
    }
};
</script>

<style>
</style>
