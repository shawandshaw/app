<template>
    <div>
        <mainlayout>
            <v-content>
                <v-container fluid fill-height>

                </v-container>
            </v-content>
        </mainlayout>
    </div>
</template>

<script>
import mainlayout from '../layout/mainlayout'

    export default {

        name: "CourseInfo",
        components:{mainlayout},
        mounted(){

        },
        props:[
          'CourseID'
        ],
        data: () => ({
            CourseID:-1,

        }),
        methods:{

        }
    }
</script>

<style scoped>

</style>