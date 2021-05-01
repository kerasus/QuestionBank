<template>
    <v-card :key="item.Y" elevation="3" class="mr-2 ml-2 mt-2">
        <v-card-text class="renderedText">
            <v-card v-if="item.P.question">
                <v-card-text v-html="item.P.question" />
            </v-card>
            <v-list dense>
                <v-list-item-group color="primary">
                    <v-list-item v-if="item.P.choiceDescription1">
                        <v-list-item-content>
                            <v-list-item-title v-html="'الف)' + item.P.choiceDescription1"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.P.choiceDescription2">
                        <v-list-item-content>
                            <v-list-item-title v-html="'ب)' + item.P.choiceDescription2"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.P.choiceDescription3">
                        <v-list-item-content>
                            <v-list-item-title v-html="'ج)' + item.P.choiceDescription3"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.P.choiceDescription4">
                        <v-list-item-content>
                            <v-list-item-title v-html="'د)' + item.P.choiceDescription4"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-expansion-panels v-model="expanModel">
                <v-expansion-panel v-if="item.P.answer">
                    <v-expansion-panel-header>
                        پاسخ
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div v-html="item.P.answer" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
            <v-list dense>
                <v-list-item
                        v-for="(topic, i) in topics"
                        :key="i"
                >
                    <v-list-item-content>
                          <span>
                            <v-chip v-if="topic.module && topic.module.grade" dark color="purple darken-4">
                              {{ topic.module.grade.name }}
                            </v-chip>
                            <v-chip v-if="topic.module && topic.module.major" dark color="purple darken-3">
                              {{ topic.module.major.name }}
                            </v-chip>
                            <v-chip v-if="topic.module && topic.module.moduleGroup" dark color="purple darken-2">
                              {{ topic.module.moduleGroup.name }}
                            </v-chip>
                            <v-chip v-if="topic.module" dark color="purple darken-1">
                              {{ topic.module.name }}
                            </v-chip>
                            <topic :topic="topic"/>
                          </span>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'Question',
        props: ['item', 'topics'],
        data() {
            return {
                expanModel: 0
            }
        },
        mounted() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub])
        }
    }
</script>

<style scoped>

</style>
