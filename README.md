This is a [Next.js](https://nextjs.org) project.

### Running the Application

#### Prerequisites

- Node.js (version 20 or higher)
- npm (comes with Node.js)

#### Development Mode

To run the application in development mode with hot reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Build

To create a production build:

```bash
npm run build
```

This command will:

1. Run the test suite
2. Create an optimized production build

#### Production Start

To start the application in production mode:

```bash
npm run start
```

#### Testing

To run the test suite:

```bash
npm run test
```

#### Additional Commands

- Linting: `npm run lint`
- Format code: `npm run format`
- Check code formatting: `npm run format:check`

### Credentials to test admin dashboard

```bash
I will sent those trough email to Simon.
```

### Story:

Auth was the worst. Seriously, always some struggling with Axios and Res/Req from Next.js — it never just worked. I was also having issues with exporting modules. Tried everything I could think of... and after at least 15 hours of banging my head against the wall, searching trough every stackoverlow thread I switched to NPM and it all started working. Of course than I found bun is not well supported ... yes, I did not think that also.

This blog was an interesting POC for me. I mainly wanted to test Next.js, specially the Pages router, because I attended one dev meetup where the presenter was talking about it. He explained it kinda well, and I liked it — it made sense to me. He also mentioned that App router is buggy, Pages router is not, and that for small things like a blog, Page router is actually simpler and better... LOL. But honestly, next time I would probably stick with App router. There at least it’s possible to follow their guide step by step. Not the case in Pages router, specially not when doing authentication, where I wanted to encrypt my session using the jose package.

Once I got used to what runs server-side and what runs client-side, development started to flow — it was faster and more enjoyable. But still, it really needs a strong understanding of getStaticProps, getStaticPaths, and getServerSideProps. ALL OF THESE ARE SERVER SIDE — sounds obvious, but until you get it, it's a mess.

Sometimes I use anonymous functions, sometimes classic old-fashioned ones — wanted to test both styles, specially to see if there's any difference or potential misbehavior. Because mostly I set strict rule inside prettier and this is not an option to try both. I remember seeing a few PRs where someone was upset about anonymous functions, claiming they can't be tested properly — which I totally disagree with. I can clearly say: unless it’s exported weirdly or wrapped in a mess, there’s no problem. But yeah, I should probably refactor things a bit and use the same approach everywhere. Would be nice to lint for just arrow functions — I like them more anyway :)

The longer I code inside Next.js, the better the feeling gets. I start to notice more code smells, more little things to fix or clean up. For example, I tested two different approaches — one for deleting images, one for deleting articles. One uses Pages router, the other uses query params in URL. To me, it’s a solid POC for comparing both ideas.

If I had more time, I’d definitely go over the whole authentication setup again. I don’t like how I’m handling sessions right now, or how I return 401 errors — it’s messy. Maybe I’d try to create an adminContext for the whole admin dashboard, so I don’t have to deal with auth on every single page like I’m doing now. Or maybe implementing a higher-order component would help — everything handled in one place, clean and simple.

Also once I moved articles to backend, I found out that I cannot fetch data trough my API because my server is not running (https://github.com/Happy99/cat-blog/commit/f025b77fee11de3a74b40fdee8403a2d20546bc3). Didn’t know about that — would be really cool to learn more about it. Not even sure if it really true, it make sense, but really I would like to dive into this much more.

And yeah… refactoring, refactoring. When I was really struggling, I just dumped everything into one place to make it work. Now? It hurts. A lot. Same with file and folder naming...
Sorry for that, trust me, this is not something I would really do :D.

### Know bugs:

- when session is cleared in browser or it expires, context does not clear username -> navbar contains admin thingies
- when article is created, it can be seen in related articles but when I click it returns 404, I have to wait 60 seconds -> need to revalidate paths, no time to adjust that anymore
- removing article without image cause error because of imageId is null - should be handeled and just article should be removed
- need to revalidate paths to articles & article detail
- hamburger menu does not work after adding bootstrap javascript into document manually
- error handling at all - I tried do it properly in Admin Dashobard but even there I see I failed multiple times + in need of refactoring, refactoring ...
- missmatch between file and folder naming, please trust me, I really would love to refactor those. This was my first real next.js app so many times I struggled and was trying different methods
- large images cannot be uploaded, need to handle error there and shouw some toast to user about that
- I implemented perrex into new & edit article => from my point of view, it should be there so we do not randomply slice it

### Missing - for those I ran out of time:

- markdown for articles - I would implement this NPM package, it's quite populate and last publish is a month ago - https://www.npmjs.com/package/react-markdown
- admin - article table - fancy component (I would bet on ShadCN)
- comments - tried trough postman and was getting 500 error, maybe I was missing something - unfortunately not time to try that agian
- paginations - I would add paggination because /articles can have two parameters - limit&offset - on frontend I would display two buttons next and prev and with those I would be adjusting offset via URL and refetching the data
- optionally implement article ordering: I would simple use drag and drop with ShadCN and update article.lastUpdateDate

### Ideas:

- divide setuping axios instances between FE a BE. With that approach I should be able to add authorization token from session - maybe eve trough URL I'm comming from it could wokr, no time, did not try unfortunately ...
- e2e test (playwright) - I wanted to test if user can see articles and login page, no time ... maybe I can try trough AI.
- storybook - not implemented, bootstrap is used with simple HTML elemets attributes - but may be nice with some components

### tech-stack:

- typescript
- Next.js
- Next router (pages)
- React
- Bootstrap
- Axios
- CSS (because modern CSS can do most from SCSS :D)

- Jest test - just one, generated trough Cursor, not much time to give it some love
- pipelines - build test
- husky - when commit message contains "RELEASE" it merge from master into production - from there I build Vercel app

- Why no Redux?
  - Next.js supports SSR a ISR. I would probably store just authentication.
    I dont see any other use right now.
