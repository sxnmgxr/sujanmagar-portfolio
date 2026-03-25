# sujanmagar.info.np — Next.js Portfolio

A statically exported Next.js 14 portfolio with App Router.
Three pages: Home, Projects (with setup instructions), Blog (with full posts).

---

## Folder structure

```
src/
├── app/
│   ├── layout.jsx          ← root layout (Nav + Footer wraps every page)
│   ├── globals.css         ← all styles (one file, light theme)
│   ├── page.jsx            ← Home page  →  /
│   ├── not-found.jsx       ← 404 page
│   ├── projects/
│   │   └── page.jsx        ← Projects page  →  /projects
│   └── blog/
│       ├── page.jsx        ← Blog list  →  /blog
│       └── [id]/
│           └── page.jsx    ← Individual post  →  /blog/deploy-time
├── components/
│   ├── Nav.jsx             ← sticky nav with active link detection
│   └── Footer.jsx          ← site footer
└── data/
    ├── projects.js         ← ADD / EDIT projects here
    └── posts.js            ← ADD / EDIT blog posts here
```

---

## Step-by-step: run locally

### 1. Install Node.js
Download from https://nodejs.org — install the LTS version (18 or 20).

Verify:
```bash
node -v   # should print v18.x or v20.x
npm -v    # should print 9.x or 10.x
```

### 2. Install dependencies
```bash
cd sujanmagar-nextjs
npm install
```

### 3. Start the dev server
```bash
npm run dev
```

Open http://localhost:3000 — your portfolio is running locally.
Changes you save to any file hot-reload instantly.

---

## How to add / edit content

### Edit your personal info
Open `src/app/page.jsx` — your name, bio, stats, experience, and contact
details are all clearly labelled in the JSX. Change the text and save.

### Add a new blog post
Open `src/data/posts.js` and add a new object to the array:

```js
{
  id: 'my-new-post',          // used in URL: /blog/my-new-post
  date: 'Apr 2026',
  title: 'Your post title',
  excerpt: 'Short summary shown in the blog list.',
  tags: ['Kubernetes', 'AWS'],
  readTime: '5 min read',
  content: `
<p>Your first paragraph here.</p>

<h2>A section heading</h2>
<p>More content.</p>

<pre>
some code block here
</pre>
  `,
},
```

That's it — it automatically appears in the blog list and gets its own page at `/blog/my-new-post`.

### Add a new project
Open `src/data/projects.js` and add a new object:

```js
{
  id: 'my-project',
  name: 'Project name',
  shortDesc: 'One sentence description.',
  year: '2026',
  status: 'live',            // 'live' or 'wip'
  tags: ['Docker', 'AWS'],
  github: 'https://github.com/sujanmagar/myrepo',
  demo: null,                // or 'https://demo-url.com'
  steps: [
    {
      title: 'Step one',
      desc: 'Text description of this step.',
      code: null,
    },
    {
      title: 'Step two — with code',
      desc: null,
      code: `git clone https://github.com/sujanmagar/myrepo
cd myrepo
npm install`,
    },
  ],
},
```

### Edit your CSS colors
Open `src/app/globals.css` — all colors are CSS variables at the top:

```css
:root {
  --accent:        #2563a8;   /* change this to change link/stat color */
  --accent-green:  #1a7a50;   /* live badge color */
  --text:          #1a1917;   /* main text color */
  --muted:         #6b6860;   /* secondary text */
  --border:        #e0ddd8;   /* all dividers */
}
```

---

## Step-by-step: deploy to sujanmagar.info.np

### Option A — Static export + cPanel (simplest)

1. Build the static site:
```bash
npm run build
```
This creates an `out/` folder with plain HTML/CSS/JS files.

2. Upload the entire contents of `out/` to `public_html` on your hosting via cPanel File Manager.

3. Done — visit https://sujanmagar.info.np

### Option B — Netlify (recommended)

1. Push your project to a GitHub repo

2. Go to https://netlify.com → New site → Import from Git → select your repo

3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`

4. Click Deploy

5. Go to Domain settings → Add custom domain → `sujanmagar.info.np`

6. Add the CNAME record Netlify provides to your domain's DNS

### Option C — Vercel (best Next.js support)

1. Push to GitHub

2. Go to https://vercel.com → New Project → Import your repo

3. Vercel auto-detects Next.js — just click Deploy

4. Go to Settings → Domains → Add `sujanmagar.info.np`

5. Add the DNS record Vercel provides

> Note: If using Vercel, remove `output: 'export'` from next.config.js
> for better performance (Vercel handles SSR natively).

---

## Common commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # build for production (creates out/ folder)
npm run start    # serve the production build locally
npm run lint     # check for code issues
```
