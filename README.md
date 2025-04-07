This is a [Next.js](https://nextjs.org) project.

## My notes

### tech-stack:

- typescript
- Next.js
- Next router (pages)
- React
- bootstrap
- axios
- css (because modern CSS can do most from SCSS :D)

### If time allows

- storybook
- Jest test
- playwright (e2e)
- pipes - build test, vercel github deploy

- Why no Redux?

  - Next.js supports SSR a ISR. I would probably store just authentication.
    I dont see any other use right now.

### Story:

Auth was the worst, always some struggling with Axios and Res/Req from Next.js

- I was having issues with exporting modules -> after at least 15 hours I switched to NPM and sudently it started working

Interesting POC to me this blog.

- I wanted to test Next.js, specially Pages router, because I attended one meeting when presenter was describing this and I liked it.
  He also mentioned that App router is buggy, Pages router not and for small things e.g. blog Page router is simpler&better ... LOL
  Next time I would stick with App router, there it is possible to follow their guide step by step... Not in Page router, specially
  not in authentication where I wanted to enrypt my sesion with 'jose' package.
- once I got used to what is server and what is client side it developming was faster and faster
- it needs strong understanding of getStaticProps, getStaticPaths and getServerSideProps -> ALL OF THESE ARE SERVER SIDE

### Know bugs:

- when session is cleared in browser or it expires, context does not clear username -> navbar contains admin
- refactoring, refactoring ... when I was really struggling I was putting everyting in once place, now it hurts
- when article is created, it can be seen in related articles but when I click it returns 404 -> page refresh helps (ISR issue prob.)

### Ideas:

- axios rozdelit na FE a BE - ne dohromady, pak mozna budu schopen fetchnout session
- ⁠pres get clanku zkusit, co vlastne vraci axios, pokud ma vratit error - jestli tim mym returnem nevratim 200 vzdy
- ⁠get clanku prevest na BE a fetchnout s tim i fotky a na be vratit artickle, kterej bude mit atribut img
- e2e test - prihlasit, vidim “login success”
- ⁠unit test - fetchne clanky
- ⁠createArticle - pokud pridam img, nepujde odeslat form dokud nedam upload img (next step - udelat v jednom - takhle aspon vidim preview)
- ⁠editArticle - nepujde odeslat, pokud se zadna value nezmeni (jeden state - false a na onChange true a pred odeslanim checknout - odeslat muze byt disabled a pod btn text, ze musi byt prvne zmena
