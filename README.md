# Boxlog Web

This repository contains two Next.js projects built from Tailwind CSS "Plus" templates.

- **radiant-ts_:＆:blog/** – Blog site that uses Sanity for content.
- **syntax-ts_docs:/** – Documentation site.

## Installation

Choose the project you want to work on and install its dependencies:

```bash
cd radiant-ts_:＆:blog  # or cd syntax-ts_docs:
npm install
```

## Development commands

Run these commands inside the project directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production app |
| `npm run start` | Run the built app |
| `npm run lint` | Lint the project |

The Radiant blog also provides `npm run typegen` to generate Sanity TypeScript types.

## Sanity environment variables

The blog project requires a Sanity project. Create a `.env.local` file inside `radiant-ts_:＆:blog` with these variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=<your dataset>
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-25
```

These values are used by both the Next.js app and the Sanity CLI.

## Running locally

After setting up the environment variables and installing dependencies, start the development server:

```bash
npm run dev
```

The site will be available at <http://localhost:3000>. When running the blog, Sanity Studio is accessible at <http://localhost:3000/studio>.

