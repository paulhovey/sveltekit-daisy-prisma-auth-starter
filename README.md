# Sveltekit Auth Starter

A [Sveltekit](https://github.com/sveltejs/kit#readme) starter template with built-in authentication and UI using:
- [Lucia Auth](https://lucia-auth.com/)
- [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart) + [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Tailwind CSS](https://tailwindcss.com/) + [Daisy UI](https://daisyui.com/)


Liberally smashed together through examples from:
- [TheCodingAtlas/sveltekit-auth-starter](https://github.com/TheCodingAtlas/sveltekit-auth-starter/)
- [delay/sveltekit-auth-starter](https://github.com/delay/sveltekit-auth-starter)
- [lucia sveltekit examples](https://github.com/pilcrowOnPaper/lucia/tree/main/examples/sveltekit)


### Features

- email/password login/signup
- Auto detecting e-mails across login methods and user linking.
- Logout hook
- Basic route protection system
- profile page (barebones, just for debugging at the moment)
- Prisma ORM
- basic styling (DaisyUI)
- Github OAuth login/signup (commented out)
- Google OAuth login/signup (commented out)


## Getting Started

Clone > install deps > read docs!

|         |                                                                           |
| ------- | ------------------------------------------------------------------------- |
| Clone   | `git clone git@github.com:paulhovey/sveltekit-daisy-prisma-auth-starter ` |
| Install | `pnpm install`                                                            |
| Develop | `pnpm start` (start the dev sever)                                        |
| Build   | `pnpm run build`                                                          |
| Preview | `pnpm run preview` (run the prod version locally)                         |
| ------- | ------------------------------------------------------------------------- |

The project is also setup with a .vscode/launch.json for debugging through Visual Studio Code.

#### Database

Prisma ORM

- Run `npx prisma generate` to generate the files needed to compile the full project.
- In mongodb atlas (or whatever provider you use), make sure a database table exists
- Update PRISMA_URL environment variable to match your provider
- Run `npx prisma db push` to write your schema to your database (or `npx prisma migrate dev --name init` from the [quickstart](https://www.prisma.io/docs/getting-started/quickstart))

### Notable changes

There are some changes made in comparison to Lucia.

- My database tables are plural.
- renamed `user_keys` to `user_providers`. It makes more sense as they talk about OAuth `providers` in their docs.

## Github OAuth keys

**You will need separate OAuth apps for Local/Production!**

1. [Create a Github OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).
2. FIll in details as below including your app name

<img src="tutorials/github-oauth/1.png" />

3. Copy and paste the client id and client secret into your .env file:

```
# .env
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

## Google OAuth keys

**You will need separate OAuth apps for Local/Production!**

[google tutorial](https://support.google.com/cloud/answer/6158849?hl=en)

For local testing you can blast through the setup using the steps below.

If you want to go live you will have to do more setup work.

### OAuth consent setup

#### 1. OAuth consent screen

- Fill in `App name`
- Fill in User `support email`
- Add `Developer contact information email` all the way below

<img src="tutorials/google-oauth/1.png" />

#### 2. Scopes

- Click `add or remove scopes`
- Select the `scopes` as in the img and save

<img src="tutorials/google-oauth/2.png" />

#### 3. Test users

- Add a test user email address so it will allow you to use google OAuth when testing locally.

<img src="tutorials/google-oauth/3.png" />

#### 4. Summary

- nothing special, just click `back to dashboard` button below.

### Create OAuth Key

- Click on the `Credentials` item in the siderbar
- Click `CREATE CREDENTIALS`
- Click `OAuth client ID`

<img src="tutorials/google-oauth/4.png" />

#### 1. App type

- Select `Web application`

<img src="tutorials/google-oauth/5.png" />

#### 2. Details

- App name: `[myapp]-local`
- URL: `http://localhost:5173`
- Redirect url: `http://localhost:5173/login/google/callback`
- Click save

<img src="tutorials/google-oauth/6.png" />

#### 3. Keys

- Copy and paste the `client id` and `client secret` from the popup into your .env file:

<img src="tutorials/google-oauth/7.png" />

```
# .env
GOOGLE_OAUTH_CLIENT_ID="..."
GOOGLE_OAUTH_CLIENT_SECRET="..."
GOOGLE_OAUTH_REDIRECT_URI="..."
```

## Roadmap

**[No roadmap yet]**

Ideas:

TODO:
- Implement lucia's password reset [example](https://lucia-auth.com/guidebook/password-reset-link)
- Email system example for sending out auth emails?
- Deployment documentation for various platforms? deno?
- Use Prisma (& mongodb atlas)
- Use daisyui and tailwindcss

## License

[MIT](LICENSE)
