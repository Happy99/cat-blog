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

- storybook - I think it is no needed rn, Iam using bootstrap with basic attributes
- Jest test
- playwright (e2e)
- pipes - build test, add Husky - with release build&push to production branch, vercel github deploy

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
- sometimes I use annonymous functions, sometimes I use classic old fashion functions - wanted to test this, specially if there is any miss behaviour, I saw few PRs where someone whas upset about it because it cannot be tested - which I disagree with and I can clearly say, until it is exported or inside variable, there is no issue ... Should be also refactored to use same approach across my project - maybe would be good to lint just arrow functions - I like them more :)
- The longer I code inside Next.js the better the feeling is, I see more code smells and more work to do ...
- different approaches between deleting images and deleting articles - wanted to test the way with Pages router and one way with query in URL - to me it's good POC for both concepts
- With more time I would go again trough whole authentication, I don't really like how I handle session there, how I handle 401 etc. Maybe I would try to create adminContext conext for whole admin dashboard so than it would not be needed to handle in each page like right now. Or implementin high-order component could also help and it will be just in one place.
- pretty interesting thing (https://github.com/Happy99/cat-blog/commit/f025b77fee11de3a74b40fdee8403a2d20546bc3). Did not know that, would be nice to know more about this.

### Know bugs:

- when session is cleared in browser or it expires, context does not clear username -> navbar contains admin
- refactoring, refactoring ... when I was really struggling I was putting everyting in once place, now it hurts
- when article is created, it can be seen in related articles but when I click it returns 404 -> page refresh helps (ISR issue prob.)
- create and edit article are accessible, post cannot be done - think about high order component - middleware is not recommended by Axios
- when creating new article, image is added, than removed trough file explorer upload image stays and image can be uploaded
- removing article without image cause error because of imageId is null - should be handeled and returned that just article was deleted if so
- deleting article with imageId that does not exist in db - images cause error - it needs to be handled so just article will be deleted
- need to revalidate paths to article detail
- hamburger menu does not work after adding bootstrap javascript into document manually
- error handling at all - I tried do it properly in Admin Dashobard but I bet I forgot something somwhere + in need of refactoring, refactoring ...

### Missing:

- markdown for articles
- admin - article table - fancy component (I would bet on ShadCN)
- comments
- paginations
- optionally implement article ordering: I would simple use drag and drop with ShadCN and update article.lastUpdateDate

### Ideas:

- axios rozdelit na FE a BE - ne dohromady, pak mozna budu schopen fetchnout session
- e2e test - prihlasit, vidim “login success”

project id - prj_6bEHBKWjjVMMnKJ5VETp0h3CcoUJ

token (github actions) - Dfbjg69GfSjAZFB6T0Ug8pJP
