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
                <v-card :key="item.Y" elevation="3" class="mr-2 ml-2 mt-2">
                  <v-card-text class="renderedText">
                    <v-card v-if="item.P.question">
                      <v-card-text v-html="convertToMarkdownKatex(item.P.question)" />
                    </v-card>
                    <v-list dense>
                      <v-list-item-group color="primary">
                        <v-list-item v-if="item.P.choiceDescription1">
                          <v-list-item-content>
                            <v-list-item-title v-html="'الف)' + convertToMarkdownKatex(item.P.choiceDescription1)"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.P.choiceDescription2">
                          <v-list-item-content>
                            <v-list-item-title v-html="'ب)' + convertToMarkdownKatex(item.P.choiceDescription2)"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.P.choiceDescription3">
                          <v-list-item-content>
                            <v-list-item-title v-html="'ج)' + convertToMarkdownKatex(item.P.choiceDescription3)"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.P.choiceDescription4">
                          <v-list-item-content>
                            <v-list-item-title v-html="'د)' + convertToMarkdownKatex(item.P.choiceDescription4)"></v-list-item-title>
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
                          <div v-html="convertToMarkdownKatex(item.P.answer)" />
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card-text>
                  <v-card-actions>
                    <v-list dense>
                      <v-list-item
                              v-for="(topic, i) in getTopics(item.P.topics)"
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
  import '~/assets/markdownKatex.scss'
  // import 'katex/dist/katex.css'
  // import 'github-markdown-css/github-markdown.css'
  var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  })
  // const md = md1.use(require('markdown-it-html-entities'))
  // https://www.npmjs.com/package/markdown-it-new-katex
  // https://katex.org/docs/options.html
  md.use(require('markdown-it-new-katex'), {trust: true, strict: false, throwOnError: false, maxExpand: 99999})
  md.disable('entity');
  // md.use(require('markdown-it-container'), 'mesra')
  // md.use(require('markdown-it-container'), 'beit', {
  //   validate: function(params) {
  //     return params.trim().match(/^beit\s+(.*)--\*mesra\*--(.*)$/)
  //   },
  //   render: function (tokens, idx) {
  //     let m = tokens[idx].info.trim().match(/^beit\s+(.*)--\*mesra\*--(.*)$/)
  //     if (m && m[1] && m[2] && tokens[idx].nesting === 1) {
  //       let mesra1 = md.render(md.utils.escapeHtml(m[1].toString()))
  //       let mesra2 = md.render(md.utils.escapeHtml(m[2].toString()))
  //       // opening tag
  //       return '<div class="beit"><div class="mesra">' + mesra1 + '</div><div class="mesra">'+ mesra2 +'</div>\n';
  //     } else {
  //       // closing tag
  //       return '</div>\n';
  //     }
  //   }
  // });

  // const TurndownService = require('turndown/lib/turndown.browser.umd');
  import TurndownService from 'turndown/lib/turndown.browser.umd'

  import montaQuestions from 'assets/montaQuestions'
  import montaTree from 'assets/montaTree'

  import topic from '~/components/topic.vue'

  export default {
    computed: {
      questions() {
        return montaQuestions
      },
      markdown () {
        return md
      }
    },
    components: {
      topic
    },
    data() {
      return {
        expanModel: 0,
        gwtRequestAddress: '/monta/gwtRequest'
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
        TurndownService.prototype.escape = function (string) {
          let escapes = [
            [/\s\$/g, '$'],
            [/\$\s/g, '$'],
            [/\{align\*\}/g, '{cases}'],
            // [/\\/g, '\\\\'],
            // [/\*/g, '\\*'],
            // [/^-/g, '\\-'],
            // [/^\+ /g, '\\+ '],
            // [/^(=+)/g, '\\$1'],
            // [/^(#{1,6}) /g, '\\$1 '],
            // [/`/g, '\\`'],
            // [/^~~~/g, '\\~~~'],
            // [/\[/g, '\\['],
            // [/\]/g, '\\]'],
            // [/^>/g, '\\>'],
            // [/_/g, '\\_'],
            // [/^(\d+)\. /g, '$1\\. ']
          ];
          return escapes.reduce(function (accumulator, escape) {
            return accumulator.replace(escape[0], escape[1])
          }, string)
        }
        // create an instance of Turndown service
        const turndownService = new TurndownService({
          // rules: COMMONMARK_RULES,
          headingStyle: 'setext',
          hr: '* * *',
          bulletListMarker: '*',
          codeBlockStyle: 'indented',
          fence: '```',
          emDelimiter: '_',
          strongDelimiter: '**',
          linkStyle: 'inlined',
          linkReferenceStyle: 'full',
          br: '  ',
          blankReplacement: function (content, node) {
            return node.isBlock ? '\n\n' : ''
          },
          keepReplacement: function (content, node) {
            return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
          },
          defaultReplacement: function (content, node) {
            return node.isBlock ? '\n\n' + content + '\n\n' : content
          }
        })
        // turndownService.keep(['$'])

        // convert HTML to Markdown
        const markdown = turndownService.turndown(string)
        // return string
        // return markdown


        // return this.markdown.render(string.replace('<div class="question" dir="rtl">', ''))
        return this.markdown.render(markdown)
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
