# Portefólio — Vasco Henriques

Site estático (HTML + CSS + JS, sem build). Para publicar, basta servir esta pasta
(Vercel, Netlify, GitHub Pages…).

## Editar conteúdo

- **Textos**: `index.html` (secções comentadas).
- **Fotografia, GitHub, ligações do projeto FPF, novos projetos, experiência/formação,
  serviço de envio do formulário**: `site.config.js`. Tudo o que estiver vazio fica oculto.
- **Cores / tipografia**: tokens no topo de `styles.css` (`:root` e `[data-theme="dark"]`).

## Formulário

Sem `formEndpoint` válido, o botão diz «Abrir aplicação de e-mail», uma indicação junto ao
botão explica que o envio se conclui nessa aplicação, e o clique abre um `mailto:` com a
mensagem preenchida (não simula envio nem afirma que a aplicação abriu). Com um endpoint
HTTP(S) ou caminho relativo (ex.: Formspree), o botão diz «Enviar mensagem», faz POST JSON e só
confirma com resposta 2xx; em erro mantém o texto. `mailto:` não conta como endpoint.
Sem JavaScript, o botão fica desativado e é mostrado o e-mail direto (nenhum dado vai para o URL).

## Proveniência do conteúdo — FPF Sports Intelligence

O cartão do projeto FPF resume um **protótipo pessoal e independente** (Portugal no EURO 2024,
StatsBomb Open Data). Não é um sistema oficial da FPF nem usa dados da federação. Os factos e
números do cartão (51 jogos, 9 tabelas Parquet, 23 regras de qualidade, 6 páginas, 99 medidas
DAX, decisões técnicas e limites) vêm do repositório local `fpf-sports-intelligence`:
`README.md`, `docs/GUIA_DO_PROJECTO.md`, `docs/data_quality_report.md`,
`python/run_pipeline.py`, `python/validate_project.py` e `tests/test_transform_data.py`
(validação e testes executados a 2026-11-13). Se o protótipo mudar, voltar a correr
`python/validate_project.py` e atualizar os números. O esquema do cartão é a arquitetura do
protótipo em HTML/CSS, não uma captura do relatório; `fpf.image` substitui-o quando houver uma
captura real deste protótipo. `fpf.demo`/`fpf.repo` só com URL público confirmado.

## Publicação

Publicado em https://vasco-henriques.vercel.app (projeto Vercel `vasco-henriques`).
Repositório: https://github.com/vascoh/portfolio (público). Cada push para `main` publica
automaticamente em produção; outros ramos geram URLs de pré-visualização.
Se mudar de domínio, atualizar `canonical`, `og:url`, `og:image`, `twitter:image` e o JSON-LD
em `index.html`, mais `sitemap.xml` e `robots.txt`.

## Imagens

`og-image.png` (1200×630), `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`.
Fotografias novas: WebP, ~800×1000 (hero) e 1280×800 (projetos).
