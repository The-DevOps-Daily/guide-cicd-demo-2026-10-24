# guide-cicd-demo

The example repository for the DevOps Daily guide
[Introduction to CI/CD with GitHub Actions](https://devops-daily.com/guides/introduction-to-cicd).
Every run log, timing and error message in the guide comes from the workflows in this repository.

The app is a one-page command cheatsheet: `src/render.js` renders `src/commands.json` into HTML,
`npm test` runs the Node.js test runner, and `npm run build` writes `dist/index.html` and
`dist/version.json`. The site is live at
<https://the-devops-daily.github.io/guide-cicd-demo-2026-10-24/>.

## Workflows

| File                                   | Trigger                                     | What it does                                                                                              | Guide part |
| -------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| `.github/workflows/hello.yml`          | push to `main`, manual                      | Two jobs that pass a message through a job output                                                         | 1 and 2    |
| `.github/workflows/ci.yml`             | pull request, merge queue, called by Deploy | Lint, tests on Linux, Windows, macOS and arm64 with Node.js 22, 24 and 26, build, one `all-checks` result | 3, 4, 7, 8 |
| `.github/workflows/config.yml`         | manual                                      | A configuration variable, a masked secret and the claims of an OIDC token                                 | 5          |
| `.github/workflows/deploy.yml`         | push to `main`, manual                      | Runs CI, packages the site, deploys it to GitHub Pages after an approval, then checks the live version    | 6 and 7    |
| `.github/actions/setup-app/action.yml` | used by CI                                  | Composite action: Node.js with the npm cache, then `npm ci`                                               | 7          |

Every action is pinned to a full commit SHA, with the version in a comment (part 9).

## Use it in your own repository

1. Fork or copy the repository.
2. In **Settings > Pages**, set the source to **GitHub Actions**.
3. Optional: add a required reviewer to the `github-pages` environment in **Settings > Environments**,
   a `SITE_TITLE` variable and a `DEMO_API_TOKEN` secret in **Settings > Secrets and variables > Actions**.
4. Push to `main`.

```bash
npm ci
npm run lint
npm test
npm run build
```
