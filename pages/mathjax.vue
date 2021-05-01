<template>
  <client-only>
    <v-row>
      <v-col>
        <v-card elevation="2">
          <v-card-text>
            <v-virtual-scroll
                    :bench="0"
                    :items="questions.O"
                    height="900"
                    item-height="800"
            >
              <template v-slot:default="{ item }">
                <question :item="item" :topics="getTopics(item.P.topics)" />
              </template>
            </v-virtual-scroll>
          </v-card-text>
          <v-card-actions>
            <v-btn
                    depressed
                    color="primary"
                    @click="getMonta"
            >
              گرفتن
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
  import montaQuestions from '~/assets/montaQuestions'
  import montaTree from '~/assets/montaTree'

  import topic from '~/components/topic.vue'

  import Question from "../components/Question";

  // require('mathjax')
  // require('mathjax').init({
  //   loader: {load: ['input/tex', 'output/svg']}
  // })

  export default {
    asyncData() {
      return { renderedOn: 'client' }
    },
    computed: {
      questions() {
        return montaQuestions
      },
      markdown () {
        return md
      }
    },
    components: {
      topic,
      Question
    },
    data() {
      return {
        expanModel: 0
      }
    },
    methods: {
      loadParentList (parentList, topic) {
        if (!topic.parentTopic) {
          return
        }

        parentList.push(topic)
        this.loadParentList(parentList, topic.parentTopic)
      },
      getParentList (topic) {
        let parentList = []
        this.loadParentList (parentList, topic)

        return parentList
      },
      getTopics (topics) {
        const idList = (!topics) ? [] : JSON.parse(topics).idList
        let topicList = []
        idList.forEach( item => {
          let targetTopic = this.getTopic(item.id)
          this.loadParentTopics(targetTopic)
          this.loadTopicModule(targetTopic)
          topicList.push(targetTopic)
        })

        return topicList
      },
      loadParentTopics (topic) {
        const parentTopic = this.getParentTopic(topic)
        topic.parentTopic = parentTopic
        if (!parentTopic) {
          return
        }
        this.loadParentTopics(parentTopic)
      },
      getParentTopic(topic) {
        if (!topic.parentTopicId) {
          return
        }
        let parentTopic = this.getTopic(topic.parentTopicId)
        if (!parentTopic) {
          return
        }

        return parentTopic
      },
      getModule (moduleId) {
        return montaTree.module.find( item => item.id.toString() === moduleId.toString())
      },
      loadTopicModule (topic) {
        topic.module = this.getModule(topic.moduleId)
        this.loadTopicModuleGroup(topic)
        this.loadModuleMajor(topic.module)
        this.loadModuleGrade(topic.module)
      },
      getModuleGroup (moduleGroupId) {
        return montaTree.moduleGroup.find( item => item.id.toString() === moduleGroupId.toString())
      },
      loadTopicModuleGroup (topic) {
        if (!topic.module) {
          return
        }
        topic.module.moduleGroup = this.getModuleGroup(topic.module.moduleGroupId)
      },
      getModuleMajor (moduleId) {
        const target = montaTree.majorModuleGrade.find( item => item.moduleId.toString() === moduleId.toString())
        if (!target) {
          return null
        }

        return montaTree.major.find( item => item.id.toString() === target.majorId.toString())
      },
      loadModuleMajor (module) {
        const moduleMajor = this.getModuleMajor(module.id)
        module.major = moduleMajor
      },
      getModuleGrade (moduleId) {
        const majorModuleGrade = montaTree.majorModuleGrade
        const target = majorModuleGrade.find( item => item.moduleId.toString() === moduleId.toString())
        if (!target) {
          return null
        }

        return montaTree.grade.find( item => item.id.toString() === target.grade.toString())
      },
      loadModuleGrade (module) {
        const moduleGrade = this.getModuleGrade(module.id)
        module.grade = moduleGrade
      },
      getTopic (topicId) {
        const targetTopic = montaTree.topic.find( item => item.id.toString() === topicId.toString())
        if (!targetTopic) {
          return {
            deph: null,
            id: null,
            isDisabled: null,
            moduleId: null,
            name: null,
            order: null,
            parentTopicId: null
          }
        } else {
          return targetTopic
        }
      },
      convertToMarkdownKatex (string) {

        // if(window.MathJax) {
        //   window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
        // }

        return string
      },
      getMonta () {
        console.log('montaQuestions', montaQuestions)
        console.log('montaTree', montaTree)
      }
    }
  }
</script>

<style lang="scss">
  /*@import "~katex/dist/katex.css";*/
  //https://github.com/sindresorhus/github-markdown-css
  /*@import "~github-markdown-css/github-markdown.css";*/


  .renderedPanel {
    direction: rtl;

    p:first-child {
      display: inline-block;
    }

    &.ltr {
      direction: ltr;
    }

    &.choice {
      display: flex;
      flex-direction: row;
    }

    img {
      max-width: 100%;
    }

    .katex {
      direction: ltr;
      display: inline-block;

      .katex-html {
        .accent {
          background-color: unset !important;
          border-color: unset !important;
        }
      }
    }

    strong > strong > s {
      text-decoration: underline;
      text-underline-position: under;
    }

    .beit {
      display: inline-block;
      width: 100%;

      .mesra {
        width: 50%;
        float: right;
      }
    }

    .mesra {
      width: 50%;
      float: right;
    }

    td, th {
      text-align: center;
      padding: 10px 20px;
      border: 1px solid black;
    }

    th {
      border-bottom: 2px solid #000;
    }

    table {
      border-collapse: collapse;
    }

    @media only screen and (max-width: 800px) {
      .mesra {
        width: 100%;
        float: none;
      }
    }
  }

</style>
