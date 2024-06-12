import MarkdownIt from 'markdown-it';
import mdHighlight from 'markdown-it-highlightjs';
import hljs from 'highlight.js/lib/core';
import html from 'highlight.js/lib/languages/xml.js';
import { drawPieChart } from './pie_chart.js';

export function renderMarkdown(content) {

    hljs.registerLanguage('html', html);
    const markdown = MarkdownIt({ linkify: true, breaks: true }).use(mdHighlight,{hljs: hljs});
  
    const fence = markdown.renderer.rules.fence;
    console.log('Fence:', fence);
    markdown.renderer.rules.fence = (...args) => {
      const [tokens, idx] = args;
      const token = tokens[idx];
      const language = token.info.trim();
  
      const rawCode = fence?.(...args);

      if (language !== 'python' && language !== 'javascript' && language !== 'js' && language !== 'html') {
        return rawCode;
      }
  
      return `<div style="position: relative";>
                <div style="display: flex; flex-direction: column; width: 100%; background: #f0f0f0; border-radius: 0px; padding: 4px 8px; font-size: 18px;">
                  <div style="overflow: auto; color: black; min-height: 100px;">${rawCode}</div>
                  </div>
                </div>
              </div>
              `;
    };
  
    return markdown.render(content);
  }