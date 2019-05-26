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
                                    v-model="Username"
                                    prepend-icon="account_circle"
                                    name="username"
                                    label="username"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    @keyup.enter="submit"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="this.$router.push('/register')" flat>
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
// import axios from "@/plugins/axios";
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        submit: function() {
            const password = this.password;
            this.axios
                .post("/api/login", {
                    username: this.username,
                    password: password
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

<style>
</style>
