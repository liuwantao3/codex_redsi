import MarkdownIt from 'markdown-it';
import mdHighlight from 'markdown-it-highlightjs';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
//import latex from 'highlight.js/lib/languages/latex';
//import { drawPieChart } from './pie_chart.js';
//import { parse, HtmlGenerator } from 'latex.js';
//import katex from 'katex';

export function renderMarkdown(content) {

    hljs.registerLanguage('html', html);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('js', javascript);
    hljs.registerLanguage('python', python);
    //hljs.registerLanguage('latex', latex);
    const markdown = MarkdownIt({ linkify: true, breaks: true }).use(mdHighlight,{hljs: hljs});
  
    const fence = markdown.renderer.rules.fence;
    markdown.renderer.rules.fence = (...args) => {
      const [tokens, idx] = args;
      const token = tokens[idx];
      const language = token.info.trim();

    if (language === 'latex') {

      // Latex support not working yet -- 2024/6/24

      // let generator = new HtmlGenerator({ hyphenate: false });

      // let doc = parse(token.content, { generator: generator }).htmlDocument();

      // //return katex.renderToString(token.content, {throwOnError: false});
      // return doc;

    }
  
      const rawCode = fence?.(...args);

      if (language !== 'python' && language !== 'javascript' && language !== 'js' && language !== 'html') {
        return rawCode;
      }
  
      return `<div style="position: relative";>
                <div style="display: flex; flex-direction: column; width: 100%; background: #f0f0f0; border-radius: 0px; padding: 4px 8px; font-size: 18px;">
                  <div style="overflow: auto; color: black; min-height: 100px;">${rawCode}</div>
                </div>
              </div>
              `;
    };
  
    return markdown.render(content);
  }