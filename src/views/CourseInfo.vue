<template>
    <div>
        <mainlayout title="课程信息">
            <v-container align-center justify-space-around row fill-height>
                <v-layout row wrap fill-height>
                    <v-flex xs12 sm12>
                        <v-card>
                            <v-card-title>
                                <h4>{{ courseInfo.name }}</h4>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="courseInfo.collect?cancelCollect():collect()">
                                    <v-icon :color="courseInfo.collect?'yellow':'white'">star</v-icon>
                                    <h4>{{courseInfo.collect?'取消收藏':'收藏'}}</h4>
                                </v-btn>
                                <v-btn flat @click="originComment={};dialog=true">
                                    <v-icon>comment</v-icon>
                                    <h4>评论</h4>
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-container>
                                <v-layout>
                                    <v-flex>
                                        <v-list dense>
                                            <v-list-tile>
                                                <v-list-tile-content>教师名:</v-list-tile-content>
                                                <v-list-tile-content
                                                    class="align-end"
                                                >{{ courseInfo.teacherName }}</v-list-tile-content>
                                            </v-list-tile>

                                            <v-list-tile>
                                                <v-list-tile-content>给分情况:</v-list-tile-content>
                                                <v-list-tile-content
                                                    class="align-end"
                                                >{{ courseInfo.scoreList[0] }}</v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>知识深度:</v-list-tile-content>
                                                <v-list-tile-content
                                                    class="align-end"
                                                >{{ courseInfo.scoreList[1] }}</v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>课堂氛围:</v-list-tile-content>
                                                <v-list-tile-content
                                                    class="align-end"
                                                >{{ courseInfo.scoreList[2] }}</v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>作业数量:</v-list-tile-content>
                                                <v-list-tile-content
                                                    class="align-end"
                                                >{{ courseInfo.scoreList[3] }}</v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>考试难度:</v-list-tile-content>
                                                <v-list-tile-content
                                                    class="align-end"
                                                >{{ courseInfo.scoreList[4] }}</v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>

                                    <v-flex>
                                        <v-layout justify-center>
                                            <div id="card" style="width: 300px;height: 300px "></div>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex>
                                        <h4>课程评论</h4>
                                        <v-list three-line>
                                            <v-list-group
                                                v-for="(comment, index) in comments"
                                                :key="index"
                                                v-model="comment.active"
                                                no-action
                                            >
                                                <v-divider></v-divider>

                                                <template v-slot:activator>
                                                    <v-list-tile
                                                        :key="index"
                                                        avatar
                                                        @click="originComment=comment"
                                                    >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title>{{comment.commenter}}@{{comment.time}}</v-list-tile-title>
                                                            <v-list-tile-sub-title>{{comment.content}}</v-list-tile-sub-title>
                                                        </v-list-tile-content>
                                                        <v-list-tile-content></v-list-tile-content>

                                                        <v-list-tile-action>
                                                            <v-btn
                                                                icon
                                                                @click.stop="dialog=true;originComment=comment"
                                                            >回复</v-btn>
                                                            <v-btn
                                                                icon
                                                                @click.stop="likeOrDislike(comment)"
                                                            >
                                                                <v-icon
                                                                    :color="comment.like?'red':'white'"
                                                                >thumb_up</v-icon>
                                                                {{comment.likes||'赞'}}
                                                            </v-btn>
                                                        </v-list-tile-action>
                                                    </v-list-tile>
                                                </template>
                                                <div>
                                                    <v-layout
                                                        align-center
                                                        v-for="(score,sindex) in comment.scoreList"
                                                        :key="sindex"
                                                    >
                                                        <span>{{scoreTable[sindex]}}</span>
                                                        <v-rating
                                                            readonly
                                                            background-color="blue-grey"
                                                            color="lime"
                                                            small
                                                            half-increments
                                                            :value="score"
                                                        ></v-rating>
                                                        <span>{{score}}</span>
                                                    </v-layout>
                                                </div>
                                                <v-list-tile
                                                    v-for="(reply,index) in comment.replies"
                                                    :key="index"
                                                    @click="dialog=true;originComment=reply"
                                                >
                                                    <v-list-tile-content>
                                                        <v-list-tile-title>{{reply.commenter}}回复{{originComments.find(c=>c.id==reply.answerTo).commenter}}@{{reply.time}}</v-list-tile-title>
                                                        <v-list-tile-sub-title>{{reply.content}}</v-list-tile-sub-title>
                                                    </v-list-tile-content>

                                                    <v-list-tile-action>
                                                        <v-btn
                                                            icon
                                                            @click="dialog=true;originComment=reply"
                                                        >回复</v-btn>

                                                        <v-btn icon>
                                                            <v-icon
                                                                :color="reply.like?'red':'white'"
                                                                @click.stop="likeOrDislike(reply)"
                                                            >thumb_up</v-icon>
                                                            {{reply.likes||'赞'}}
                                                        </v-btn>
                                                    </v-list-tile-action>
                                                </v-list-tile>
                                            </v-list-group>
                                        </v-list>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-title v-if="originComment.content">回复评论</v-card-title>
                    <v-card-title v-else>评论课程{{courseInfo.name}}</v-card-title>
                    <v-list-tile v-if="originComment.content">
                        <v-list-tile-content>
                            <v-list-tile-title>{{originComment.commenter}}@{{originComment.time}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{originComment.content}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-else>
                        <v-list-tile-content>
                            <v-list-tile-title>{{courseInfo.name}}By{{courseInfo.teacherName}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-card-text>
                        <div v-if="!originComment.content">
                            <v-layout
                                align-center
                                v-for="(score,sindex) in editingComment.scoreList"
                                :key="sindex"
                            >
                                <span>{{scoreTable[sindex]}}</span>
                                <v-rating
                                    background-color="blue-grey"
                                    color="lime"
                                    small
                                    half-increments
                                    v-model="editingComment.scoreList[sindex]"
                                ></v-rating>
                                <span>{{score}}</span>
                            </v-layout>
                        </div>
                        <v-textarea outline label="在此写下你的评论或者回复" v-model="editingComment.content"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="dialog=false">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="originComment.content" @click="dialog=false;sendReply()">回复</v-btn>
                        <v-btn v-else @click="dialog=false;sendComment()">评论</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </mainlayout>
    </div>
</template>

<script>
import mainlayout from "../layout/mainlayout";
import Cookies from "js-cookie";
import { constants } from "crypto";
import { copyFile } from "fs";
export default {
    name: "CourseInfo",
    components: { mainlayout },
    mounted() {
        this.setChart();
    },
    created() {
        this.axios
            .get("/api/getCourseById", {
                params: {
                    id: this.CourseID,
                    username: Cookies.get("username")
                }
            })
            .then(res => {
                if (res.data) this.courseInfo = res.data;
                this.setChart();
            });
        this.axios
            .get("/api/getCourseComment", {
                params: {
                    courseId: this.CourseID,
                    username: Cookies.get("username")
                }
            })
            .then(res => {
                if (res.data && res.data != "FAILURE")
                    this.originComments = res.data;
                this.sortComments();
            });
        // this.sortComments();
    },
    props: ["CourseID"],
    data: () => ({
        dialog: false,
        originComment: {},
        editingComment: {
            scoreList: [5, 5, 5, 5, 5]
        },
        courseInfo: {
            id: 123456,
            name: "线性代数",
            teacherName: "张宇杰",
            avg: 85.3,
            scoreList: [1, 2, 5, 3, 3],
            collect: true
        },
        scoreTable: [
            "给分情况",
            "知识深度",
            "课堂氛围",
            "作业数量",
            "考试难度"
        ],
        originComments: [
            {
                id: 1,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "这门课非常nice!!!!",
                answerTo: -1,
                likes: 100,
                time: "2018-08-08",
                scoreList: [79, 31, 67, 9, 18]
            },
            {
                id: 2,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "这门课非常nice!!!!",
                answerTo: -1,
                likes: 100,
                time: "2018-08-09",
                scoreList: [79, 31, 67, 9, 18]
            },
            {
                id: 3,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "这门课非常nice!!!!",
                answerTo: -1,
                likes: 100,
                time: "2018-08-10",
                scoreList: [79, 31, 67, 9, 18]
            },
            {
                id: 4,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "这门课非常nice!!!!",
                answerTo: -1,
                likes: 100,
                time: "2018-08-11",
                scoreList: [79, 31, 67, 9, 18]
            },
            {
                id: 5,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "回复!",
                answerTo: 1,
                likes: 100,
                time: "2018-08-09",
                scoreList: [0, 0, 0, 0, 0]
            },
            {
                id: 6,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "回复!",
                answerTo: 5,
                likes: 100,
                time: "2018-08-10",
                scoreList: [0, 0, 0, 0, 0]
            },
            {
                id: 7,
                courseId: "10405",
                commenter: "乔洋",
                like: true,
                content: "回复!",
                answerTo: 2,
                likes: 100,
                time: "2018-08-08",
                scoreList: [0, 0, 0, 0, 0]
            }
        ],
        comments: []
    }),
    methods: {
        setChart() {
            let myChart = this.$echarts.init(document.getElementById("card"));
            myChart.setOption({
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: "#fff",
                            backgroundColor: "#999",
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: "给分情况", max: 5 },
                        { name: "知识深度", max: 5 },
                        { name: "课堂氛围", max: 5 },
                        { name: "作业数量", max: 5 },
                        { name: "考试难度", max: 5 }
                    ]
                },
                series: [
                    {
                        name: "课程信息",
                        type: "radar",
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: this.courseInfo.scoreList,
                                name: "五维分布"
                            }
                        ]
                    }
                ]
            });
        },
        sortComments() {
            // this.originComments.sort((c1,c2)=>{
            //     if(c1.time<c2.time)return 1;
            //     else return -1;
            // })
            for (let i = 0; i < this.originComments.length; i++) {
                const comment = this.originComments[i];
                if (comment.answerTo == -1) {
                    this.comments.push(comment);
                }
            }
            for (let i = 0; i < this.originComments.length; i++) {
                const reply = this.originComments[i];
                let replies = new Set();
                let r = reply;
                while (r.answerTo > 0) {
                    replies.add(r);
                    r = this.originComments.find(c => c.id == r.answerTo);
                }
                let comment = r;
                if (comment == reply) {
                    comment.replies = new Set(); //如果是顶级评论, 看下一个
                    continue;
                }
                if (!comment.replies) comment.replies = new Set();
                comment.replies.add(...replies);
            }
            for (const comment of this.comments) {
                let set = comment.replies;
                comment.replies = [...set].sort((c1, c2) => {
                    if (c1.time < c2.time) return -1;
                    else return 1;
                });
            }
            this.comments.sort((c1, c2) => {
                    if (c1.likes > c2.likes) return -1;
                    else return 1;
                })
        },
        sendComment() {
            const toSendComment = {
                courseId: this.courseInfo.id,
                commentId: this.originComment.id,
                commenter: Cookies.get("username"),
                answerTo: -1,
                content: this.editingComment.content,
                scoreList: this.editingComment.scoreList,
                time: new Date().toLocaleString
            };
            this.axios
                .post("/api/comment", toSendComment)
                .then(res => {
                    if (res.data == "SUCCESS") {
                        this.comments.push(toSendComment);
                    } else {
                        console.log(res.data);
                    }
                    this.editingComment = {
                        scoreList: [0, 0, 0, 0, 0]
                    };
                })
                .catch(err => {
                    console.log(err);
                    this.editingComment = {
                        scoreList: [0, 0, 0, 0, 0]
                    };
                });
        },
        sendReply() {
            const toSendComment = {
                courseId: this.courseInfo.id,
                commentId: this.originComment.id,
                commenter: Cookies.get("username"),
                answerTo: this.originComment.id,
                content: this.editingComment.content,
                scoreList: this.editingComment.scoreList,
                time: new Date().toLocaleString
            };
            this.axios.post("/api/comment", toSendComment).then(res => {
                if (res.data == "SUCCESS") {
                    let parentComment=this.originComment;
                    while(parentComment.answerTo!=-1){
                        parentComment=this.originComments.find(c=>c.id=parentComment.answerTo)
                    }
                    if(!parentComment.replies)parentComment.replies=[];
                    parentComment.replies.push(toSendComment);
                }
            });
            this.editingComment = {
                scoreList: [0, 0, 0, 0, 0]
            };
        },
        likeOrDislike(comment) {
            if (!comment.like) this.like(comment);
            else this.cancelLike(comment);
        },
        like(comment) {
            this.axios.post("/api/like", {
                commentId:comment.id,
                username: Cookies.get("username")
            }).then(res=>{
                if(res.data=='SUCCESS'){
                    comment.like=true;
                    comment.likes++;
                }
            })
        },
        cancelLike(comment) {
            this.axios.post("/api/cancelLike", {
                commentId:comment.id,
                username: Cookies.get("username")
            }).then(res=>{
                if(res.data=='SUCCESS'){
                    comment.like=false;
                    comment.likes--;
                }
            })
        },
        collect() {
            this.axios
                .post("/api/collect", {
                    courseId: this.courseInfo.id,
                    username: Cookies.get("username")
                })
                .then(res => {
                    if (res.data === "SUCCESS") this.courseInfo.collect = true;
                });
        },
        cancelCollect() {
            this.axios
                .post("/api/cancelCollect", {
                    courseId: this.courseInfo.id,
                    username: Cookies.get("username")
                })
                .then(res => {
                    this.courseInfo.collect = false;
                });
        }
    }
};
</script>

<style scoped>
</style>