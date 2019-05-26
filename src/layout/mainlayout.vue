<template>
    <div id="app">
        <v-app id="inspire" dark>
            <v-navigation-drawer
                    clipped
                    fixed
                    v-model="drawer"
                    app
            >
                <v-list dense>
                    <v-list-tile @click="jumpToCourseList">
                        <v-list-tile-action>
                            <v-icon>dashboard</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>课程列表</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="logout">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>退出登录</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>{{title}}</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <slot>

                </slot>
            </v-content>
            <v-footer app fixed>
                <span>&copy; 2017</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        name: "mainlayout",
        data: () => ({
            drawer: false
        }),

        props: {
            source: String,
            title:String
        },
        methods:{
            jumpToCourseList(){
                this.$router.push("/CourseList")
            },
            logout(){

            }
        }
    }
</script>

<style scoped>

</style>