This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (commit usama 2)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy this Next.js app is using Vercel.

Quick deploy via CLI:

```bash
# install Vercel CLI
npx vercel login

# run an interactive deploy; the command prints the deployment URL
npx vercel --prod
```

Automated GitHub deployment

1. Add the following repository secrets in GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
	- `VERCEL_TOKEN`: create from https://vercel.com/account/tokens
	- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: available from your Vercel project settings (or from the Vercel dashboard URL when viewing the project).
2. Push to `main` (or `master`) — the workflow `.github/workflows/vercel-deploy.yml` will run and deploy to production.

After deploy, the Production URL is shown in the Vercel dashboard and will also be available in the GitHub Action log.

If you'd like, I can also:
- Add a `package.json` script to run `vercel --prod` non-interactively, or
- Help you create the Vercel token and set the GitHub secrets locally (I can't access your Vercel account from here).

