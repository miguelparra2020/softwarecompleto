import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Socio - políticos y económicos',
      links: [
        // {
        //   text: '👉 CIBERNÉTICA de las Elecciones y del Desastre Nacional.',
        //   // href: getPermalink('/landing/saas'),
        //   href:'#'
        // },
        // {
        //   text: '👉 Convocatoria a la Intelectualidad Colombiana',
        //   href:'#'
        // },
        {
          text: '👉 Los planos de la paz',
          href:'/losplanosdelapaz'
        },
        {
          text: '👉 Revolución científico tecnológica para el desarrollo nacional',
          href:'/revolucioncientificotecnologica'
        },
        {
          text: '👉 Decálogo de la paz',
          href:'/decalogodelapaz'
        },
        // {
        //   text: '👉 La Realización Personal o la Felicidad en un Nuevo Contrato Social',
        //   href:'#'
        // },
        // {
        //   text: '👉 Plan de Salvación Nacional',
        //   href:'#'
        // },
        // {
        //   text: '👉 Ideología del Libertador para la Segunda Independencia de América latina',
        //   href:'#'
        // },
        // {
        //   text: '👉 Temática libre',
        //   href:'#'
        // },
        {
          text: '👉 Libros',
          href:'/libro'
        },
      ],
    },
    {
      text: '📰Blog',
      href: getPermalink('/blog'),
    },
    {
      text: '🎙️Podcast',
      href: getPermalink('/tag/podcast'),
    },
    {
      text: '📽️Reels',
      href: getPermalink('/blog'),
    },
    {
      text: '📚Libros',
      href: '/libro',
    },
  ],
};
  
export const footerData = {
  links: [
  {
    title: 'Podcast/Blog:',
    links: [
      { text: 'Publicaciones', href: getPermalink('/blog') },
    ],
  },
  {
    title: 'Libros:',
    links: [
      { text: 'Libros', href: '/libro' },
    ],
  },
],
  secondaryLinks: [
    { text: 'Política de privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/sistemas_autoorganizados' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/sitemasautoorganizados' },
    { ariaLabel: 'RSS', icon: 'tabler:brand-spotify', href: 'https://podcasters.spotify.com/pod/show/sistemas-autoorgani' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://softwarehelpcenter.vercel.app/" target="_blank"> Software help center</a> · All rights reserved.
  `,
};
