<<<<<<< HEAD
# boxlog
Self-management tool for reflecting, planning and acting
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 4ed774f (feat: create next.js app with tailwind + typescript)

# Catalyst UI Kit

Catalyst is a modern application UI kit built with [Tailwind CSS](https://tailwindcss.com) and [React](https://react.dev/), designed and built by the Tailwind CSS team and included as part of [Tailwind Plus](https://tailwindcss.com/plus).

## Getting started

To get started, first copy the component files included in the downloaded ZIP file into wherever you keep components in your own project. The components are provided in both TypeScript and plain JavaScript, pick whichever set you prefer.

Next, install the dependencies used by the components in Catalyst:

```sh
npm install @headlessui/react framer-motion clsx
```

Catalyst is also designed for the latest version of Tailwind CSS, which is currently Tailwind CSS v4.0. To make sure that you are on the latest version of Tailwind, update it via npm:

```sh
npm install tailwindcss@latest
```

Now you're ready to start using the components in your project — just import them from wherever you're keeping your components and start using them like any of your other React components:

```jsx
import { Input } from './components/input'
import { Field, FieldGroup, Label } from './components/fieldset'
import { Button } from './components/button'

export default function SettingsForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Label>Name</Label>
          <Input name="name" />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </Field>
        <Button type="submit">Save changes</Button>
      </FieldGroup>
    </form>
  )
}
```

Additional installation instructions can be found in the Catalyst documentation.

## Documentation

You can find the Catalyst documentation at https://catalyst.tailwindui.com/docs.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [React](https://react.dev) - the official React documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [clsx](https://github.com/lukeed/clsx) - the GitHub repo for the `clsx` helper
