/**
 * Configuração editável do portefólio.
 *
 * Tudo o que estiver vazio ('' ou []) fica OCULTO na página pública.
 * Basta preencher um valor para o elemento correspondente aparecer —
 * não é preciso mexer no HTML.
 */
window.SITE_CONFIG = {
  /* Fotografia profissional do hero (ex.: 'assets/vasco.webp', ~800×1000).
     Vazio → mostra o elemento visual abstrato. */
  photo: '',

  links: {
    /* Perfil GitHub (ex.: 'https://github.com/utilizador').
       Vazio → os botões de GitHub ficam ocultos. */
    github: 'https://github.com/vascoh',
  },

  /* Serviço de envio do formulário (ex.: endpoint Formspree
     'https://formspree.io/f/xxxxxxx'). Tem de aceitar POST JSON e
     responder 2xx em caso de sucesso.
     Vazio → o formulário abre o cliente de e-mail com a mensagem
     preenchida (não é simulado nenhum envio). */
  formEndpoint: '',

  /* Recursos do projeto FPF Sports Intelligence. */
  fpf: {
    image: '', // ex.: 'assets/fpf-dashboard.webp' (16:10)
    imageAlt: 'Captura de ecrã do projeto FPF Sports Intelligence',
    demo: '', // ex.: 'https://…'
    repo: '', // ex.: 'https://github.com/…'
  },

  /* Projetos adicionais. Só aparecem se tiverem pelo menos
     title, description e tags preenchidos. Exemplo:
     {
       title: 'Nome do projeto',
       description: 'Descrição curta e factual.',
       tags: ['Python', 'SQL'],
       image: 'assets/projeto.webp', imageAlt: '…',   // opcional
       demo: 'https://…', repo: 'https://…'           // opcional
     } */
  projects: [],

  /* Experiência e formação. A secção só aparece quando houver
     pelo menos uma entrada. Formato de cada entrada:
     { period: '2024 — Atual', title: 'Cargo / Curso',
       org: 'Empresa / Instituição', description: 'Opcional.' } */
  experience: [],
  education: [],
};
