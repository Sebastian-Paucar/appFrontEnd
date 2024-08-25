import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from '../../../services/markdown.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styles: [`/* Estilos básicos para Markdown */
  .markdown-content {
    line-height: 1.6;
  }

  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3 {
    color: #333;
  }

  .markdown-content code {
    background: #f4f4f4;
    padding: 2px 4px;
    border-radius: 4px;
  }

  .markdown-content pre code {
    background: #f4f4f4;
    display: block;
    padding: 10px;
    border-radius: 4px;
  }

  .markdown-content blockquote {
    border-left: 4px solid #ddd;
    padding-left: 10px;
    color: #666;
  }

  .markdown-content ul,
  .markdown-content ol {
    padding-left: 20px;
  }
  `]
})
export class HomeComponent implements OnInit {

  @Input() markdownUrl: string = 'README.md'; // Asegúrate de que `markdownUrl` siempre sea un string
  content!: SafeHtml;

  constructor(
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {

  }


}
