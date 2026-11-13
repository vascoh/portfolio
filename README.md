# Portefólio — Vasco Henriques

Site estático (HTML + CSS + JS, sem build). Para publicar, basta servir esta pasta
(Vercel, Netlify, GitHub Pages…).

## Editar conteúdo

- **Textos**: `index.html` (secções comentadas).
- **Fotografia, GitHub, ligações do projeto FPF, novos projetos, experiência/formação,
  serviço de envio do formulário**: `site.config.js`. Tudo o que estiver vazio fica oculto.
- **Cores / tipografia**: tokens no topo de `styles.css` (`:root` e `[data-theme="dark"]`).

## Formulário

Sem `formEndpoint`, o envio abre o cliente de e-mail com a mensagem preenchida (não simula
envio). Com um endpoint (ex.: Formspree), faz POST JSON e só confirma com resposta 2xx.

## Publicação

Publicado em https://vasco-henriques.vercel.app (projeto Vercel `vasco-henriques`).
Para atualizar: `vercel deploy --prod --yes` nesta pasta.
Se mudar de domínio, atualizar `canonical`, `og:url`, `og:image`, `twitter:image` e o JSON-LD
em `index.html`, mais `sitemap.xml` e `robots.txt`.

## Imagens

`og-image.png` (1200×630), `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`.
Fotografias novas: WebP, ~800×1000 (hero) e 1280×800 (projetos).
