# SceneTrace Technology Baseline and Upgrade Analysis

> **Project:** SceneTrace  
> **Hackathon:** CODIENYCH 1.0  
> **Team:** Zentra  
> **Phase:** Phase 1 hackathon MVP  
> **Primary application constraint:** PERN  
> **Research date:** 2026-10-08  
> **Purpose:** Establish a production-safe, current technology baseline without modifying application code.

---

# 0. Executive Decision

## 0.1 Recommended Phase 1 baseline

| Area                     | Baseline                                                                          | Status                                                         | Use now?                           |
| ------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------- |
| Runtime                  | Node.js 24.21.0                                                                   | Latest LTS                                                     | **Yes**                            |
| Package manager          | npm 11.19.0, bundled with Node 24.21.0                                            | Stable                                                         | **Yes**                            |
| Frontend                 | React 19.3.0                                                                      | Latest stable                                                  | **Yes**                            |
| DOM renderer             | React DOM 19.3.0                                                                  | Latest stable paired release                                   | **Yes**                            |
| Frontend build           | Vite 8.3.3                                                                        | Stable                                                         | **Yes**                            |
| Styling                  | Tailwind CSS 4.3.3                                                                | Stable                                                         | **Yes**                            |
| Tailwind Vite plugin     | `@tailwindcss/vite` 4.3.x line                                                    | Stable                                                         | **Yes**                            |
| Backend                  | Express 5.2.1                                                                     | Stable                                                         | **Yes**                            |
| Database                 | PostgreSQL 18.6                                                                   | Current supported major                                        | **Yes**                            |
| PostgreSQL Node driver   | `pg` 8.23.1                                                                       | Current stable npm release observed                            | **Yes**                            |
| Language                 | JavaScript (ES2024)                                                               | Stable                                                         | **Yes, for a new codebase**        |
| Runtime HTTP client      | Node/browser `fetch`                                                              | Stable in Node                                                 | **Yes**                            |
| AI gateway               | OpenRouter                                                                        | Current service/API                                            | **Yes**                            |
| Primary model            | Current OpenRouter-hosted multimodal model selected from current capability check | Compatibility must be locked at implementation time            | **Yes, after endpoint validation** |
| AI fallback              | Direct Gemini API                                                                 | Gemini 3.8 Flash is GA                                         | **Yes**                            |
| AI structured output     | OpenRouter JSON Schema structured outputs                                         | Supported by compatible models                                 | **Yes**                            |
| Upload parser            | Multer 2.4.0                                                                      | Latest stable observed; security fixes included                | **Yes, with strict limits**        |
| Runtime security headers | Helmet 8.3.0                                                                      | Stable                                                         | **Yes**                            |
| CORS                     | cors 2.8.6                                                                        | Stable                                                         | **Yes**                            |
| Rate limiting            | express-rate-limit 8.7.0                                                          | Stable                                                         | **Yes**                            |
| Validation               | Zod 4.6.5                                                                         | Stable                                                         | **Yes**                            |
| IDs                      | Node built-in `crypto.randomUUID()`                                               | Stable runtime API                                             | **Yes**                            |
| Env files                | Node built-in `--env-file` / `process.loadEnvFile()`                              | Stable in Node 24.10+                                          | **Yes**                            |
| Database abstraction     | Direct `pg` + SQL migrations                                                      | Deliberately minimal                                           | **Yes**                            |
| Client HTTP library      | Native `fetch`                                                                    | Built into browser and Node                                    | **Yes**                            |
| Routing library          | None required for Phase 1                                                         | Product can stay single-workspace                              | **Yes: omit dependency**           |
| Axios                    | Not used                                                                          | Unnecessary dependency                                         | **No**                             |
| dotenv                   | Not used                                                                          | Superseded for this baseline by Node built-in env-file support | **No**                             |
| uuid package             | Not used                                                                          | Built-in crypto is sufficient                                  | **No**                             |
| ORM                      | Not used in Phase 1                                                               | Avoids migration/schema abstraction overhead                   | **No**                             |
| Redis/Kafka/etc.         | Not used                                                                          | Outside MVP scope                                              | **No**                             |

## 0.2 Key strategic conclusion

The best production-safe baseline for this specific hackathon is **not the maximum number of newest packages**.

It is:

> **Node 24 LTS + React 19.3 + Vite 8.3 + Express 5.2 + PostgreSQL 18.6 + JavaScript + Tailwind 4.3 + `pg` + Zod + Multer + Helmet + express-rate-limit + native fetch**, with OpenRouter as the multimodal gateway and Gemini 3.8 Flash as the direct fallback.

This gives a modern supported stack while deliberately avoiding several packages whose functionality is already built into the platform or whose addition would increase migration and debugging risk.

---

# 1. Project Technology Context

## 1.1 Product context

SceneTrace is the Phase 1 implementation of the assigned **Conversational Image Recognition Chatbot** problem.

The official problem requires:

- image input,
- natural-language questions,
- image recognition combined with conversational AI,
- object/scene identification,
- follow-up questions,
- and a web/mobile chat interface.

The supplied product specification further narrows Phase 1 to an anonymous-session MVP with Identify + Ask and explicit Image Compare, while deliberately excluding authentication, permanent memory, native mobile, voice, RAG, vector databases and enterprise infrastructure.

## 1.2 Technology philosophy

### Stable over flashy

**[decision]**

A stable release with official support is preferred over a preview/canary release even when the preview has a higher version number.

### Latest stable, not latest channel

**[requirement]**

Do not install packages from:

- `beta`,
- `alpha`,
- `canary`,
- `experimental`,
- `nightly`,
- or similar prerelease channels

unless a future decision explicitly accepts the risk.

### Exact version locking

**[decision]**

The application should lock major/minor/patch versions in the committed lockfile.

For major technologies whose patch release changes during the hackathon, use the current stable patch observed during setup and commit the lockfile immediately.

### No unnecessary compatibility surface

**[decision]**

Do not add:

- an HTTP library when native fetch is enough,
- an environment-variable package when Node provides stable `.env` loading,
- a router when the MVP can be a single workspace,
- an ORM when a small schema can be safely maintained with SQL,
- an object-detection package when the selected multimodal model provides the required capability,
- a separate vector database when Phase 1 has no RAG.

---

# 2. Runtime: Node.js

## 2.1 Current release status

**[verified fact]**

As of the research date:

- Node.js 26.11.1 is the **Current** release.
- Node.js 24.21.0 is the **Latest LTS**.
- Node.js 22.x is also LTS.
- Older versions such as 20.x and below are EOL.

Node's official release policy recommends LTS releases for general production use, and Node 24 is the current LTS branch for this project.

Official sources:

- https://nodejs.org/en/about/previous-releases
- https://nodejs.org/en/download/archive/v24.10.0
- https://nodejs.org/en/blog/release

## 2.2 Baseline decision

**[decision] Use Node.js 24.21.0.**

Do not use Node 26.11.1 for the hackathon baseline merely because it is newer.

### Why

Node 26 is currently **Current**, not LTS.

The Express documentation explicitly recommends the latest LTS Node release for production. Therefore Node 24 LTS is the safer foundation for SceneTrace.

## 2.3 npm

Node 24.10.0 documentation/archive shows npm 11.6.1, while the Node 24.21.0 archive identifies npm 11.19.0.

**[decision]**

Use the npm version bundled with the selected Node 24.21.0 release.

Do not globally downgrade npm to an older major without a compatibility reason.

## 2.4 Runtime compatibility

Vite 8 requires Node 20.19+ or 22.12+, while ESLint 10 supports Node 20.19+, 22.13+, or 24+. Node 24 satisfies all of these baselines.

Sources:

- https://vite.dev/guide/
- https://eslint.org/docs/latest/use/migrate-to-10.0.0

## 2.5 Built-in fetch

Node's `fetch` is stable and no longer experimental as of Node 21.

**[decision]**

Use native `fetch` for:

- OpenRouter API,
- direct Gemini API,
- ordinary backend HTTP requests.

Avoid Axios unless a future requirement proves native fetch insufficient.

Official source:

- https://nodejs.org/api/globals.html

## 2.6 Built-in environment file support

Node 24.10.0 made the relevant `.env` loading APIs stable.

`--env-file` and `process.loadEnvFile()` are supported by the modern Node line.

**[decision]**

Do not add `dotenv` to Phase 1 solely for `.env` loading.

Use Node's native mechanism in development and platform-managed environment variables in deployment.

Official sources:

- https://nodejs.org/api/cli.html
- https://nodejs.org/api/process.html

## 2.7 Node security guidance

Express's official production guidance recommends using the latest LTS Node release, avoiding synchronous production work, handling asynchronous exceptions properly, and using appropriate deployment process management.

Source:

- https://expressjs.com/en/advanced/best-practice-performance/

## 2.8 Deprecated/avoid patterns

**[blacklist]**

Do not build new code around:

- EOL Node releases,
- experimental runtime APIs when a stable equivalent exists,
- synchronous filesystem operations in request handlers,
- `uncaughtException` as an application-level recovery mechanism,
- deprecated Node domains,
- custom HTTP client dependencies when stable `fetch` is adequate.

## 2.9 Upgrade risk

**Risk: Low**

Node 24 is mature LTS and is directly compatible with the selected ecosystem.

**Migration risk:** Low for a fresh codebase.

---

# 3. React

## 3.1 Current release status

**[verified fact]**

React documentation identifies **React 19.3** as the latest version.

NPM reports:

- React 19.3.0 as `latest`
- canary builds under a separate channel
- experimental builds under a separate channel.

Official sources:

- https://react.dev/versions
- https://react.dev/blog/2026/09/09/react-19-3
- https://www.npmjs.com/package/react

## 3.2 Baseline decision

**[decision] Use React 19.3.0.**

Do not use React canary or experimental releases.

## 3.3 Production status

React does not use a Node-style LTS label.

For this baseline:

> “Production supported” means the current stable React release documented by the React team and published under the normal `latest` channel.

## 3.4 Recommended architecture

**[decision]**

Use:

```text
React SPA
   ↓
components
   ↓
local/component state
   ↓
server/API state
```

Keep the MVP simple.

No React Server Components architecture is required because the project is a Vite-powered client application communicating with an Express API.

## 3.5 Why no React Server Components

**[decision]**

Do not introduce RSC into Phase 1.

Reasons:

1. The application already has a separate Express API.
2. RSC is unnecessary for this MVP.
3. React published significant RSC security advisories in late 2025.
4. Avoiding RSC removes that entire compatibility/security surface.

Source:

- https://react.dev/blog

## 3.6 React 19.3 features

React 19.3 makes View Transitions and Fragment Refs stable, among other changes.

**[preference]**

Do not use newly stabilized features simply because they exist.

The MVP does not need them.

Source:

- https://react.dev/blog/2026/09/09/react-19-3

## 3.7 React migration considerations

For a fresh project:

**[decision]**

Start directly on React 19.3.

Do not create an unnecessary intermediate React 18 application and migrate later.

## 3.8 Deprecated-pattern blacklist

**[blacklist]**

Do not use:

- legacy `ReactDOM.render`,
- legacy string refs,
- `UNSAFE_componentWillMount`,
- `UNSAFE_componentWillReceiveProps`,
- `UNSAFE_componentWillUpdate`,
- legacy context APIs,
- old class-component patterns for new code,
- RSC/Server Component features for this project.

React StrictMode explicitly helps expose use of deprecated APIs.

Source:

- https://react.dev/reference/react/StrictMode

## 3.9 Upgrade risk

**Risk: Low**

Fresh-project adoption avoids most historical migration problems.

---

# 4. React DOM

## 4.1 Current baseline

**[decision] React DOM 19.3.0.**

It is intended to be paired with React 19.3.0.

Source:

- https://www.npmjs.com/package/react-dom

## 4.2 Architecture

Use:

```text
createRoot(...)
```

for browser rendering.

Avoid legacy render APIs.

## 4.3 Risk

**Risk: Low**

React and React DOM should remain on the same version.

---

# 5. Vite

## 5.1 Current release status

**[verified fact]**

Vite 8 is stable and Vite's npm package currently reports **8.3.3** as latest.

Official sources:

- https://vite.dev/blog/announcing-vite8.html
- https://vite.dev/blog/announcing-vite8-1
- https://vite.dev/guide/
- https://www.npmjs.com/package/vite

## 5.2 Baseline decision

**[decision] Use Vite 8.3.3.**

## 5.3 Why Vite 8

Vite 8 moved to the Rolldown-based build pipeline and is a stable release.

The Vite team describes Vite 8 as a major architectural transition from the prior esbuild/Rollup combination.

**[risk]**

Although stable, this is a meaningful internal build-system change.

## 5.4 Migration work from Vite 7

Official migration documentation calls out:

- Rolldown replacing esbuild/Rollup in core build paths,
- changed dependency optimizer implementation,
- changed browser baseline,
- deprecated `optimizeDeps.esbuildOptions`.

Source:

- https://vite.dev/guide/migration.html

## 5.5 Baseline recommendation

Use the latest stable 8.3.x patch rather than staying on Vite 7 solely because it is familiar.

However:

**[constraint]**

Do not use Vite's experimental bundled dev mode.

Vite 8.1 documents bundled dev mode as experimental.

Source:

- https://vite.dev/blog/announcing-vite8-1

## 5.6 Node compatibility

Vite requires Node 20.19+ or Node 22.12+.

Node 24.21.0 satisfies this.

Source:

- https://vite.dev/guide/

## 5.7 Deprecated-pattern blacklist

**[blacklist]**

Avoid new use of:

- `optimizeDeps.esbuildOptions`,
- old Vite 7-specific assumptions about the bundler,
- experimental `rolldown-vite` transitional packages,
- Vite plugins that explicitly depend on obsolete Rollup/esbuild internals without current Vite 8 support.

## 5.8 Upgrade risk

**Risk: Medium**

The Vite 8 migration is significant internally even though the public API aims for compatibility.

For a new project the risk is much smaller because there is nothing to migrate.

---

# 6. Tailwind CSS

## 6.1 Current status

**[verified fact]**

Tailwind CSS **4.3.3** is currently the npm `latest` release.

Tailwind's official blog lists v4.3 as a current 4.x release line.

Sources:

- https://tailwindcss.com/blog
- https://www.npmjs.com/package/tailwindcss

## 6.2 Baseline decision

**[decision] Use Tailwind CSS 4.3.3.**

## 6.3 Recommended Vite integration

Tailwind's official documentation recommends installing:

```text
tailwindcss
@tailwindcss/vite
```

and integrating Tailwind through the Vite plugin.

Source:

- https://tailwindcss.com/docs/installation/using-vite

## 6.4 Major migration implications

Tailwind v4 introduced meaningful breaking changes from v3.

Official migration guidance identifies:

- modern browser requirements,
- removal of old `@tailwind` directives,
- CSS-first configuration direction,
- changes in utility names and configuration behavior.

Source:

- https://tailwindcss.com/docs/upgrade-guide

## 6.5 Browser baseline

Tailwind v4 is designed for:

- Safari 16.4+
- Chrome 111+
- Firefox 128+

For a desktop/laptop hackathon demo, this is reasonable.

## 6.6 Decision on Tailwind v3

**[decision] Do not use Tailwind 3 for a new project.**

Tailwind npm currently tags 3.4.19 as `v3-lts`, but v4 is the current major and is appropriate for a modern evergreen-browser MVP.

If institutional machines force an older browser baseline, revisit this decision.

## 6.7 Deprecated-pattern blacklist

**[blacklist]**

Do not use v3 patterns such as:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

for a v4 project.

Use the v4 CSS import/plugin approach from official documentation.

## 6.8 Upgrade risk

**Risk: Medium for migrating an existing v3 project; Low for a fresh project.**

---

# 7. Express

## 7.1 Current status

**[verified fact]**

Express **5.2.1** is the current `latest` npm release.

Express's official site is on the 5.x line.

Sources:

- https://www.npmjs.com/package/express
- https://expressjs.com/en/starter/installing.html
- https://expressjs.com/en/guide/migrating-5.html

## 7.2 Baseline decision

**[decision] Use Express 5.2.1.**

Do not start a new project on Express 4.

## 7.3 Node compatibility

Express officially requires Node 18+.

Node 24.21.0 is therefore well within the supported runtime.

## 7.4 Express 5 migration

Express 5 maintains much of the familiar API surface but includes compatibility-breaking changes.

The official migration guide should be treated as mandatory reading for teams migrating an Express 4 codebase.

Source:

- https://expressjs.com/en/guide/migrating-5.html

## 7.5 Important Express 5 patterns

**[blacklist]**

Do not introduce legacy Express 4 code patterns unnecessarily, including:

- `app.del()`,
- `req.param()`,
- old route path syntax that is no longer supported,
- relying on removed response signatures,
- obsolete query-parser assumptions.

For any migrated code, use the Express 5 migration guide as the source of truth.

## 7.6 Error handling

Express 5 supports rejected promises flowing into the error-handling chain.

**[decision]**

Use async route/controller functions with centralized error handling.

Do not rely on process-level crash suppression.

## 7.7 Production security

Express's official security guidance emphasizes:

- TLS,
- Helmet,
- secure cookies where applicable,
- dependency updates,
- input validation,
- avoiding default credentials,
- reducing attack surface.

Source:

- https://expressjs.com/en/advanced/best-practice-security.html

## 7.8 Production performance

Express recommends:

- latest LTS Node,
- asynchronous code,
- proper exception handling,
- production `NODE_ENV`,
- process restart strategy,
- reverse proxy/deployment best practices.

Source:

- https://expressjs.com/en/advanced/best-practice-performance/

## 7.9 Upgrade risk

**Risk: Low for a new codebase.**

**Risk: Medium when migrating Express 4 code.**

---

# 8. PostgreSQL

## 8.1 Current status

PostgreSQL's official documentation reports:

- PostgreSQL 18 as current supported major,
- PostgreSQL 18.6 as the latest 18 patch release observed,
- 17, 16, 15 and 14 also supported,
- 19 as development/beta rather than a stable production release.

Sources:

- https://www.postgresql.org/docs/current/release.html
- https://www.postgresql.org/docs/release/18.6/
- https://www.postgresql.org/docs/18/release-18.html

## 8.2 Baseline decision

**[decision] Use PostgreSQL 18.6.**

Do not use PostgreSQL 19 beta for this hackathon.

## 8.3 Why PostgreSQL 18

PostgreSQL 18 is a production release with official support.

The release includes significant improvements such as asynchronous I/O, optimizer-statistics retention during `pg_upgrade`, skip-scan improvements, `uuidv7()`, and other SQL/runtime enhancements.

Source:

- https://www.postgresql.org/docs/18/release-18.html

The MVP does not need these features, but using the current supported major avoids starting on an old baseline.

## 8.4 Upgrade/migration work

Major PostgreSQL upgrades are not ordinary patch updates.

Official documentation states that moving between major versions requires a migration approach such as:

- `pg_dumpall`,
- `pg_upgrade`,
- logical replication.

Source:

- https://www.postgresql.org/docs/current/upgrading.html

Minor releases do not change the internal storage format and are compatible within the same major line.

## 8.5 PostgreSQL security

Important baseline:

- default local network behavior should not expose the database publicly,
- use strong authentication,
- use TLS for remote connections where appropriate,
- use `scram-sha-256`,
- configure `pg_hba.conf` deliberately.

PostgreSQL documents `scram-sha-256` as the default password encryption method in current releases.

Sources:

- https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
- https://www.postgresql.org/docs/current/runtime-config-connection.html

## 8.6 Version choice versus existing local installations

**[risk]**

A developer machine may already have PostgreSQL 14 or 17.

Do not perform an in-place major upgrade during the hackathon merely to match the desired baseline if the team already has a working local database.

**[decision]**

For development speed:

- use the existing supported PostgreSQL installation if it is operational,
- use PostgreSQL 18.6 for the clean baseline/deployment,
- ensure schema SQL remains compatible with the chosen baseline.

Do not risk data loss during a hackathon by attempting an unnecessary local cluster migration.

## 8.7 Database architecture

**[decision]**

Phase 1 uses:

```text
PostgreSQL
    ↓
pg Node driver
    ↓
explicit SQL queries
```

No ORM is required.

## 8.8 Upgrade risk

**Risk: Low for new deployment on 18.6.**

**Risk: High if migrating an existing production PostgreSQL cluster mid-hackathon.**

---

# 9. PostgreSQL Node Driver: `pg`

## 9.1 Current status

The npm package currently reports **pg 8.23.1**.

Source:

- https://www.npmjs.com/package/pg

## 9.2 Baseline decision

**[decision] Use `pg` 8.23.1.**

## 9.3 Why direct `pg`

The project has only a small number of entities and SQL operations.

Advantages:

- small abstraction surface,
- direct PostgreSQL support,
- parameterized queries,
- connection pooling,
- minimal migration coupling,
- easy debugging during a hackathon.

The package documentation explicitly highlights parameterized queries and connection pooling.

## 9.4 Security

**[requirement]**

Always use parameterized queries.

Do not concatenate user-provided strings into SQL.

## 9.5 Upgrade risk

**Risk: Low**

No ORM compatibility matrix is needed.

---

# 10. JavaScript

## 10.1 Current release status

JavaScript is standardized as ECMAScript. The current stable edition is **ECMAScript 2024** (ES2024), with ES2025 features being progressively supported in modern runtimes.

Node.js 24 supports all ES2024 features and many ES2025 features.

**[verified fact]**

No separate compiler package is required. Modern JavaScript runs natively in Node.js and all evergreen browsers.

Source:

- https://nodejs.org/api/
- https://tc39.es/ecma262/

## 10.2 Baseline decision

**[decision] Use JavaScript (ES2024) for a new codebase.**

This project has many data contracts:

- API request/response shapes,
- AI structured outputs,
- visual entity records,
- comparison states,
- database models,
- session state.

Static typing is not used; instead, runtime validation with Zod provides safety for external data.

## 10.3 Important caution

JavaScript has no compile-time type checking.

**[risk]**

Without a compiler, type-related mistakes are caught at runtime or through linting. This places more emphasis on:

- disciplined code review,
- Zod validation for all external inputs,
- thorough testing of AI responses,
- consistent use of JSDoc where helpful.

Because SceneTrace is a fresh codebase, this is manageable and avoids the overhead of a TypeScript toolchain.

## 10.4 Modern module configuration

Use ES modules (ESM) for both frontend and backend.

**[decision]**

Frontend:

```text
Vite handles ESM natively.
```

Backend:

```json
// package.json
"type": "module"
```

Use `import` / `export` syntax.

Do not use CommonJS `require` / `module.exports` in new code.

## 10.5 Code quality

**[decision]**

Use ESLint for static analysis and consistent code style.

Do not disable recommended rules without a documented reason.

Enable strict mode implicitly through ESM (modules are always strict).

## 10.6 Deprecated-pattern blacklist

**[blacklist]**

Do not use:

- CommonJS `require` / `module.exports` in new code,
- `var` declarations,
- legacy browser globals,
- synchronous filesystem operations in request handlers,
- `eval` or `Function` constructor,
- loose equality (`==`) except where explicitly justified,
- global variables.

## 10.7 Upgrade risk

**Risk: Low**

JavaScript is stable and backward-compatible. No compilation step means fewer toolchain issues.

---

# 11. Zod

## 11.1 Current status

Zod **4.6.5** is the current npm `latest` release observed.

Source:

- https://www.npmjs.com/package/zod

## 11.2 Baseline decision

**[decision] Use Zod 4.6.5.**

## 11.3 Why

AI output is untrusted external data.

Zod can validate:

- request bodies,
- environment configuration,
- normalized AI responses,
- comparison state,
- upload metadata.

This is especially valuable for SceneTrace's structured AI output.

## 11.4 Security role

**[requirement]**

Treat all AI responses as untrusted external input.

Do not trust JSON shape merely because the model was instructed to return JSON.

## 11.5 Upgrade risk

**Risk: Low**

Zod 4 is stable and appropriate for a new JavaScript codebase.

---

# 12. Multer

## 12.1 Current status

Multer **2.4.0** is the latest stable release observed.

Sources:

- https://www.npmjs.com/package/multer
- https://github.com/expressjs/multer/releases
- https://github.com/expressjs/multer/security/advisories

## 12.2 Critical security finding

Multer had a significant sequence of security advisories during 2026 involving:

- denial of service,
- crafted multipart field names,
- resource exhaustion,
- file-size-limit bypass,
- incomplete cleanup,
- file descriptor leaks,
- other multipart parsing issues.

Multer 2.4.0 includes a fix for CVE-2026-88932 according to its official changelog.

This is an important reason to **never use an older Multer version from a copied tutorial**.

## 12.3 Baseline decision

**[decision] Use Multer 2.4.0 only.**

## 12.4 Required configuration posture

**[security requirement]**

Set strict:

- file size limit,
- file count limit,
- field count limit,
- field-size limits,
- accepted MIME types.

Do not accept arbitrary multipart content.

## 12.5 Storage posture

For Phase 1:

**[preference]**

Use temporary file handling and move the validated image into the configured temporary/object-storage lifecycle.

Do not permanently retain upload files by accident.

## 12.6 Upgrade risk

**Risk: Medium**

The current version is appropriate, but the component has demonstrated a high rate of security churn in 2026.

**Upgrade watch:** Any Multer security release should be treated as high priority.

---

# 13. Helmet

## 13.1 Current status

Helmet **8.3.0** is the current stable npm `latest` observed.

Source:

- https://www.npmjs.com/package/helmet
- https://github.com/helmetjs/helmet

## 13.2 Baseline decision

**[decision] Use Helmet 8.3.0.**

## 13.3 Why

Helmet applies a set of security-related HTTP response headers including:

- Content-Security-Policy,
- Strict-Transport-Security,
- X-Content-Type-Options,
- Referrer-Policy,
- frame protections,
- related security headers.

## 13.4 CSP caution

Helmet's default Content Security Policy may require adjustments depending on how the frontend is served and which image/API origins are used.

**[risk]**

Do not disable CSP wholesale merely because the default blocks something.

Configure only the directives actually required by the deployed application.

Source:

- https://github.com/helmetjs/helmet

## 13.5 Upgrade risk

**Risk: Low**

---

# 14. CORS

## 14.1 Current status

The npm package currently reports **cors 2.8.6**.

Source:

- https://www.npmjs.com/package/cors

## 14.2 Baseline decision

**[decision] Use cors 2.8.6 if CORS middleware is needed.**

## 14.3 Important security limitation

CORS is not authentication and not authorization.

It controls what browser JavaScript may read based on response headers.

Any non-browser client can still call the backend.

Therefore:

**[blacklist]**

Do not treat:

```text
Access-Control-Allow-Origin
```

as API security.

Source:

- https://www.npmjs.com/package/cors

## 14.4 Configuration

**[requirement]**

In deployment, allow only the known frontend origin(s).

Do not ship:

```text
origin: "*"
```

for a credentialed/private API design.

## 14.5 Upgrade risk

**Risk: Low**

---

# 15. express-rate-limit

## 15.1 Current status

The npm package currently reports **8.7.0**.

Source:

- https://www.npmjs.com/package/express-rate-limit

## 15.2 Baseline decision

**[decision] Use express-rate-limit 8.7.0.**

## 15.3 Why

The MVP is anonymous and AI calls cost money.

Rate limiting provides two protections:

1. abuse protection,
2. cost containment.

## 15.4 Configuration

**[assumption]**

Start with a configurable limit around:

```text
20 AI operations / anonymous session / 10 minutes
```

This is a starting operational setting, not an API guarantee.

The limit should be adjustable based on actual provider quotas.

## 15.5 Distributed scaling note

**[future consideration]**

If the product becomes multi-instance, the rate-limit store should move to a shared store.

Do not add Redis merely for Phase 1.

## 15.6 Upgrade risk

**Risk: Low**

---

# 16. OpenRouter

## 16.1 Role

**[decision]**

OpenRouter is the primary AI gateway.

It is responsible for routing the application request to a multimodal model/provider.

The application should interact with OpenRouter from the backend only.

## 16.2 Current capabilities relevant to SceneTrace

OpenRouter documentation currently supports:

- multimodal image inputs,
- multi-turn chat,
- provider routing,
- model fallbacks,
- structured outputs,
- streaming,
- model discovery.

Sources:

- https://openrouter.ai/docs/client-sdks/overview
- https://openrouter.ai/docs/guides/routing/model-fallbacks
- https://openrouter.ai/docs/guides/features/structured-outputs
- https://openrouter.ai/blog/tutorials/send-image-to-llm/

## 16.3 SDK versus native fetch

OpenRouter provides an official TypeScript SDK.

However:

**[decision]**

For Phase 1, prefer the REST API through Node's native `fetch` unless the SDK materially reduces implementation time.

Reason:

- fewer dependencies,
- no extra SDK version lock,
- Node 24 already provides stable fetch,
- our use case is straightforward.

OpenRouter documents its SDK, but it is not mandatory.

Source:

- https://openrouter.ai/docs/client-sdks/overview

## 16.4 Provider failover

OpenRouter documents automatic provider failover.

**[decision]**

Let OpenRouter perform provider failover where available.

Do not implement custom per-provider routing logic.

## 16.5 Model fallback

OpenRouter's `models` parameter supports automatic model fallback.

**[risk-aware decision]**

For the hackathon:

- one primary model,
- one backup model can be configured if the team confirms compatible multimodal + structured output behavior.

Do not make the application dynamically select random models based on price or ranking.

Source:

- https://openrouter.ai/docs/guides/routing/model-fallbacks

## 16.6 Structured outputs

OpenRouter supports JSON Schema structured outputs for compatible models.

The documentation specifically recommends:

- `response_format`,
- JSON Schema,
- `strict: true`,
- `require_parameters: true` when using provider selection.

Source:

- https://openrouter.ai/docs/guides/features/structured-outputs

## 16.7 Baseline AI contract

**[decision]**

SceneTrace will define one internal normalized AI result shape.

Conceptually:

```text
answer
scene
objects[]
relations[]
evidence[]
uncertainty[]
comparison[]
```

Provider-specific responses must be converted into this internal representation.

## 16.8 Security

OpenRouter's current Security Center guidance recommends:

- limiting keys,
- expiration,
- rotation,
- cleanup of unused keys,
- caps/limits.

Source:

- https://openrouter.ai/blog/announcements/security-center/

**[requirement]**

The production/hackathon OpenRouter key must:

- exist only on the backend,
- have an appropriate spend limit,
- not be committed to Git,
- be rotated if exposed.

## 16.9 Cost optimization

OpenRouter documents prompt caching for supported providers/models.

**[future/optimization]**

Do not implement complex caching until the base workflow works.

But structure the conversation context so repeated large image/history payloads can be optimized later.

Source:

- https://openrouter.ai/docs/guides/best-practices/prompt-caching

## 16.10 Upgrade risk

**Risk: Medium**

The API is an external service and model capabilities can change independently of our code.

Mitigation:

- pin tested model identifiers,
- use schema validation,
- isolate provider integration,
- maintain a direct Gemini fallback.

---

# 17. Gemini Direct Fallback

## 17.1 Current stable model

Google's official current model documentation lists **Gemini 3.8 Flash** as:

- Stable,
- GA,
- ready for production use.

Source:

- https://ai.google.dev/gemini-api/docs/models
- https://ai.google.dev/gemini-api/docs/latest-model

## 17.2 Current model status

Gemini 3.8 Flash is not preview/canary/experimental.

Its model ID is:

```text
gemini-3.8-flash
```

## 17.3 Baseline decision

**[decision]**

Use Gemini 3.8 Flash as the direct fallback model, subject to final availability/quota verification in the team's Google AI account.

## 17.4 Why Flash

The SceneTrace workload is:

- image understanding,
- object/scene extraction,
- conversational Q&A,
- comparison,
- structured JSON.

It is a latency-sensitive interactive workflow.

Gemini 3.8 Flash is explicitly positioned as a Flash production model.

## 17.5 Reasoning level

Gemini 3.8 Flash supports:

- low,
- medium,
- high

thinking levels.

For SceneTrace:

**[decision]**

Use **low or medium** for interactive MVP tasks.

Avoid high thinking unless testing shows a clear accuracy benefit that justifies latency/cost.

Source:

- https://ai.google.dev/gemini-api/docs/latest-model

## 17.6 Migration notes

Google's migration checklist says Gemini 3.8 migration may require:

- changing the model ID,
- changing `thinking_budget` to `thinking_level`,
- removing deprecated sampling parameters,
- removing unsupported candidate-count usage,
- standardizing multi-turn interactions,
- updating function-response formats where applicable.

Source:

- https://ai.google.dev/gemini-api/docs/latest-model

## 17.7 Deprecated Gemini patterns

**[blacklist]**

For Gemini 3.8:

Do not introduce:

- old `thinking_budget`,
- deprecated sampling parameters such as `temperature`, `top_p`, `top_k` where the current Gemini API does not support them for this model,
- unsupported `candidate_count`,
- prefilled model turns,
- outdated function-response shapes.

## 17.8 Deprecation watch

Google explicitly maintains a Gemini deprecation page.

Source:

- https://ai.google.dev/gemini-api/docs/deprecations/

At research time, Gemini 3.8 Flash has no announced shutdown date.

## 17.9 Upgrade risk

**Risk: Medium**

The model itself is GA, but model APIs evolve.

Mitigation:

- isolate Google-specific request logic,
- pin model ID,
- maintain tests for structured output,
- keep OpenRouter path independently usable.

---

# 18. AI Model Selection Risk

## 18.1 Important unresolved issue

OpenRouter's model catalog is dynamic.

Therefore:

**[unresolved compatibility question]**

The exact OpenRouter model used in production must be verified immediately before implementation and again before deployment for:

1. image input,
2. structured JSON Schema output,
3. required context size,
4. acceptable latency,
5. acceptable pricing,
6. current provider availability,
7. fallback compatibility.

## 18.2 Why this remains unresolved

The product requirement is stable, but OpenRouter's available model endpoints are external infrastructure that can change without the application's source changing.

Therefore the project should not hard-code an unverified model capability based on a historical catalog snapshot.

---

# 19. IDs and UUIDs

## 19.1 Baseline decision

**[decision]**

Use Node's built-in cryptographic UUID generation:

```text
crypto.randomUUID()
```

for application-level identifiers where UUIDv4 is adequate.

## 19.2 Why

No additional `uuid` package is required.

Node 24 already provides the required cryptographic capability.

## 19.3 PostgreSQL UUIDv7

PostgreSQL 18 adds `uuidv7()`.

However:

**[decision]**

Do not depend on PostgreSQL 18-specific UUIDv7 for the MVP unless the team wants database-generated ordered identifiers.

Reason:

- it adds no meaningful product value in 24 hours,
- random UUIDs are sufficient,
- client/server generated UUID consistency is straightforward.

## 19.4 Upgrade risk

**Risk: Low**

---

# 20. Routing

## 20.1 React Router status

The current `react-router` npm package is **8.4.0**.

However, the project does not currently require multi-page navigation.

Source:

- https://www.npmjs.com/package/react-router

## 20.2 Baseline decision

**[decision] Do not add React Router for Phase 1 unless a real route requirement emerges.**

The MVP can be a single primary workspace with state-based views such as:

```text
empty
analyzing
chat
comparison
error
```

## 20.3 Why

Every dependency creates:

- install surface,
- configuration surface,
- migration surface,
- debugging surface.

React Router is excellent software, but it does not solve a Phase 1 problem that cannot be solved with local application state.

## 20.4 Future

Add routing if the product later gains:

- persistent conversation history,
- settings,
- authenticated accounts,
- shareable conversation URLs,
- admin screens.

## 20.5 Risk

**Risk: Very low**

---

# 21. Axios

## 21.1 Current release

Axios currently reports **1.20.0**.

Source:

- https://www.npmjs.com/package/axios

## 21.2 Decision

**[decision] Do not use Axios.**

## 21.3 Reason

Native `fetch` is stable in:

- browser,
- Node 24.

The SceneTrace API requirements do not need interceptors or Axios-specific features.

Removing Axios:

- reduces dependency count,
- reduces bundle/runtime surface,
- removes an unnecessary upgrade stream.

## 21.4 Future

Add Axios only if a concrete requirement appears that native fetch does not satisfy economically.

---

# 22. dotenv

## 22.1 Current package

The npm registry shows active `dotenv` releases.

## 22.2 Decision

**[decision] Do not use dotenv for the baseline.**

## 22.3 Reason

Node's built-in `.env` support is now stable in the selected Node line.

Source:

- https://nodejs.org/api/process.html
- https://nodejs.org/api/cli.html

This is a deliberate example of choosing fewer dependencies instead of automatically installing popular packages.

---

# 23. ESLint

## 23.1 Current status

ESLint **10.10.0** is the current release observed.

Sources:

- https://eslint.org/blog/2026/09/eslint-v10.10.0-released/
- https://eslint.org/blog/
- https://www.npmjs.com/package/eslint

## 23.2 Baseline decision

**[decision] Use ESLint 10.10.0.**

## 23.3 Node compatibility

ESLint 10 requires:

- Node 20.19+,
- or Node 22.13+,
- or Node 24+.

Node 24.21.0 is compatible.

## 23.4 Important migration requirement

ESLint 10 no longer supports the old `.eslintrc` configuration system.

It uses `eslint.config.js` / the modern flat configuration.

Sources:

- https://eslint.org/docs/latest/use/migrate-to-10.0.0
- https://eslint.org/blog/2026/02/eslint-v10.0.0-released/

## 23.5 Deprecated-pattern blacklist

**[blacklist]**

Do not use:

- `.eslintrc`,
- `ESLINT_USE_FLAT_CONFIG=false`,
- removed `FlatESLint`,
- removed `LegacyESLint`,
- old rule context APIs,
- legacy formatter assumptions.

## 23.6 Upgrade risk

**Risk: Medium for old repositories; Low for a fresh configuration.**

---

# 24. Testing Baseline

## 24.1 Principle

**[decision]**

Do not add a large testing framework stack during the first hours of the hackathon.

## 24.2 Backend

Use Node's built-in test capabilities where practical.

Test:

- request validation,
- session isolation,
- AI-response normalization,
- comparison categorization,
- error mapping.

## 24.3 AI integration

The most important tests are contract tests against saved representative AI responses.

Examples:

```text
valid structured response
missing objects
uncertain result
malformed JSON
provider error
fallback response
```

## 24.4 Frontend

Use a focused manual smoke test matrix during the hackathon:

```text
upload
analysis
question
follow-up
second image
compare
error
retry
clear
refresh
```

## 24.5 Future

A formal component test stack can be added when the product moves beyond the hackathon.

---

# 25. Architecture Baseline

## 25.1 Application topology

**[decision]**

```text
                    Browser
                       │
                       ▼
              React 19.3 + Vite 8
                       │
                    HTTPS
                       │
                       ▼
             Express 5.2 / Node 24
                │             │
                │             │
                ▼             ▼
          PostgreSQL 18.6   AI Gateway
                │             │
                │       ┌─────┴─────┐
                │       ▼           ▼
                │  OpenRouter    Gemini
                │       │        fallback
                │       ▼
                │ Multimodal Model
                │
                ▼
          Session / Visual Data
```

## 25.2 Frontend

**[decision]**

```text
React
+
Vite
+
Tailwind
+
native fetch
```

## 25.3 Backend

**[decision]**

```text
Node
+
Express
+
Zod
+
Multer
+
Helmet
+
cors
+
express-rate-limit
+
pg
```

## 25.4 Data

**[decision]**

```text
PostgreSQL
+
temporary object storage
```

## 25.5 AI

**[decision]**

```text
OpenRouter
   ↓
current approved multimodal model
   ↓
direct Gemini 3.8 Flash fallback
```

---

# 26. Architecture Patterns We Explicitly Reject

## 26.1 Microservices

**[non-goal]**

No microservices.

Reason:

- one backend is enough,
- one PostgreSQL database is enough,
- one AI orchestration service is enough.

## 26.2 Redis

**[non-goal]**

No Redis for Phase 1.

Use PostgreSQL and the anonymous session identifier.

## 26.3 Kafka

**[non-goal]**

No event streaming platform.

## 26.4 Kubernetes

**[non-goal]**

No Kubernetes.

## 26.5 Vector DB

**[non-goal]**

No vector database.

There is no Phase 1 semantic retrieval problem that requires it.

## 26.6 RAG

**[non-goal]**

No RAG.

Visual understanding can be handled by the multimodal model.

## 26.7 Custom CV model

**[non-goal]**

No custom-trained detection model.

Use pretrained multimodal capabilities.

---

# 27. Deprecated-Pattern Blacklist

This section is intentionally actionable.

## Runtime

**[blacklist]**

- EOL Node versions
- production use of experimental Node APIs when stable APIs exist
- synchronous filesystem processing inside request handlers
- `uncaughtException` as a recovery mechanism
- deprecated Node domains

## React

**[blacklist]**

- `ReactDOM.render`
- string refs
- `UNSAFE_*` lifecycle methods
- legacy context
- RSC architecture for this project
- React canary/experimental packages

## Vite

**[blacklist]**

- Vite 7-specific assumptions in new code
- `optimizeDeps.esbuildOptions` for new configuration
- experimental bundled dev mode
- unmaintained plugins relying on old Rollup/esbuild internals

## Tailwind

**[blacklist]**

- v3 `@tailwind base/components/utilities` directives in a v4 project
- outdated JS-heavy configuration patterns copied from v3 tutorials
- unsupported browser assumptions below Tailwind v4's baseline

## Express

**[blacklist]**

- `app.del`
- `req.param`
- deprecated response overloads
- Express 4 routing syntax copied without checking the Express 5 migration guide
- middleware that assumes synchronous errors are automatically handled

## JavaScript

**[blacklist]**

- CommonJS `require` / `module.exports` in new code
- `var` declarations
- legacy browser globals
- `eval` or `Function` constructor
- loose equality (`==`) except where explicitly justified
- global variables
- disabling ESLint rules without an explicit reason

## ESLint

**[blacklist]**

- `.eslintrc*`
- `LegacyESLint`
- `FlatESLint`
- obsolete RuleContext APIs
- Node versions below ESLint 10 requirements

## Multer

**[blacklist]**

- Multer versions below 2.4.0
- unbounded multipart field counts
- unlimited upload size
- accepting arbitrary file fields

This is particularly important because multiple 2026 security advisories affected older Multer releases.

## PostgreSQL

**[blacklist]**

- PostgreSQL 13 and older unsupported versions
- PostgreSQL 19 beta for production
- public database exposure
- weak authentication
- `md5` authentication for a new system when SCRAM is available
- in-place major upgrade experiments during the hackathon

## OpenRouter/Gemini

**[blacklist]**

- API keys in frontend code
- unvalidated AI JSON
- blindly trusting model output
- unpinned/unverified experimental models in the final demo
- provider-specific output leaking directly into UI code
- treating model uncertainty as technical failure
- treating model confidence language as calibrated probability

---

# 28. Upgrade Watchlist

## High priority

### Node.js

Watch for:

- Node 24 LTS security releases,
- eventual transition when Node 26 becomes LTS,
- EOL date for Node 24.

### Multer

**Highest security watch priority.**

The package has had numerous security advisories during 2026.

Monitor:

- https://github.com/expressjs/multer/security/advisories
- https://github.com/expressjs/multer/releases

### Gemini API

Monitor:

- model deprecations,
- API parameter changes,
- pricing,
- shutdown notices,
- structured-output behavior.

Sources:

- https://ai.google.dev/gemini-api/docs/deprecations/
- https://ai.google.dev/gemini-api/docs/release-notes

### OpenRouter

Monitor:

- model availability,
- provider support,
- structured-output compatibility,
- routing/fallback behavior,
- pricing,
- service limits.

Sources:

- https://openrouter.ai/docs
- https://openrouter.ai/docs/guides/routing/model-fallbacks

## Medium priority

### React

Monitor stable React releases and security announcements.

### Vite

Monitor Rolldown compatibility and plugin ecosystem changes.

### Tailwind

Monitor 4.x updates and browser-target changes.

### PostgreSQL

Apply current minor security/bug-fix releases within the selected major.

### ESLint

Monitor new major releases and Node requirements.

### JavaScript

Watch ECMAScript proposals and Node.js support for new language features.

---

# 29. Dependency Addition Policy

Before adding a new package, ask:

## Question 1

Does the product actually require the capability?

If no:

> Do not add.

## Question 2

Is the capability already built into Node, browser APIs, PostgreSQL, React, or another existing dependency?

If yes:

> Prefer the built-in capability.

## Question 3

Is the package stable?

Reject:

- beta,
- alpha,
- canary,
- experimental,
- nightly

for the MVP unless explicitly approved.

## Question 4

Does it have recent security advisories?

If yes:

- inspect latest release,
- read changelog,
- inspect GitHub security page.

## Question 5

Does it increase migration complexity?

If yes:

> require a clear product/engineering justification.

---

# 30. Recommended package set

## Frontend

```text
react@19.3.0
react-dom@19.3.0
vite@8.3.3
tailwindcss@4.3.3
@tailwindcss/vite@4.3.x
eslint@10.10.0
```

## Backend

```text
express@5.2.1
pg@8.23.1
zod@4.6.5
multer@2.4.0
helmet@8.3.0
cors@2.8.6
express-rate-limit@8.7.0
```

## Intentionally absent

```text
axios
dotenv
uuid
react-router
orm
redis
kafka
vector database
typescript
```

## AI

Use:

```text
OpenRouter REST API
Direct Gemini REST API
```

through native `fetch`.

---

# 31. Why native fetch instead of Axios or an AI SDK

This is an intentional simplification.

Node 24 provides stable `fetch`.

OpenRouter's API is HTTP-based.

Gemini's API is HTTP-based.

Therefore:

```text
native fetch
      ↓
HTTP JSON request
      ↓
provider response
```

is enough.

Benefits:

- no Axios dependency,
- no AI provider SDK dependency,
- fewer package upgrades,
- easier provider abstraction,
- smaller backend surface.

The downside is more request/response boilerplate.

For SceneTrace, that tradeoff is acceptable.

---

# 32. Provider Abstraction Boundary

The provider abstraction should be conceptual, not framework-heavy.

## Internal interface

```text
VisionProvider
    ├── analyzeImage()
    ├── chat()
    └── compareImages()
```

Implementations:

```text
OpenRouterVisionProvider
GeminiVisionProvider
```

Both return the normalized SceneTrace result.

Do not use a general-purpose AI orchestration framework.

---

# 33. Production-Safe AI Request Rules

## Rule 1

Always send text instructions before image data when the provider expects ordered multipart message content.

## Rule 2

Use structured output for machine-readable AI responses.

## Rule 3

Validate AI JSON on the server.

## Rule 4

Reject unknown structured fields when schema strictness is appropriate.

## Rule 5

Do not let model output directly decide authorization or security policy.

## Rule 6

Treat OCR/text visible inside the image as untrusted content.

## Rule 7

Do not expose provider secrets in browser JavaScript.

## Rule 8

Log provider and request metadata, not raw private image content.

---

# 34. Image Handling Technology Decisions

## 34.1 Supported formats

**[decision]**

```text
JPEG
PNG
WebP
```

## 34.2 Maximum size

**[assumption / operational decision]**

10 MB per upload.

## 34.3 Upload parser

**[decision]**

Multer 2.4.0.

## 34.4 Image processing library

**[decision]**

Do not add `sharp` or another image-processing dependency in Phase 1 unless testing shows that resizing/compression is necessary.

Why:

- AI provider can accept the image,
- one extra native dependency adds installation/build risk,
- the hackathon environment is resource constrained.

## 34.5 Future

For scale:

- resize on ingest,
- strip unnecessary metadata,
- convert to efficient formats,
- generate thumbnails,
- content-addressed storage.

---

# 35. Session Technology Decision

## 35.1 Session ID

**[decision]**

Anonymous conversation identifier.

## 35.2 Storage

**[decision]**

Persist session state in PostgreSQL.

## 35.3 Browser refresh

**[requirement]**

Persist the session identifier sufficiently to restore the active conversation after a browser refresh.

## 35.4 No authentication

**[decision]**

No user account.

## 35.5 Security

Use an unguessable random identifier and ensure every database lookup is scoped to that identifier.

---

# 36. Database Migration Strategy

## Phase 1

**[decision]**

Use versioned SQL migration files.

Example conceptual sequence:

```text
001_initial_schema.sql
002_indexes.sql
003_retention_fields.sql
```

Do not add an ORM purely for migrations.

## PostgreSQL 18 compatibility

Avoid unnecessary version-specific features.

Keep SQL portable within PostgreSQL 17/18 where convenient so the project is easier to operate on managed providers.

## Rollback

**[risk-control]**

For hackathon migrations:

- keep migrations small,
- never modify an already-applied migration,
- add a new migration for changes,
- back up the schema before destructive operations.

---

# 37. Deployment Compatibility

## Frontend

Use a static Vite production build.

Requirements:

- modern evergreen browser,
- HTTPS,
- environment-specific API base URL.

## Backend

Node 24 LTS.

Requirements:

- `NODE_ENV=production`,
- health endpoint,
- configured port,
- environment secrets,
- outbound HTTPS access to AI providers,
- database access.

## Database

PostgreSQL 18.6 baseline.

## Storage

Temporary image/object storage.

## AI

Outbound HTTPS to:

- OpenRouter,
- Google Gemini.

---

# 38. Security Baseline

## Required

**[requirement]**

```text
Helmet
CORS restriction
Rate limiting
Input validation
Upload limits
Parameterized SQL
HTTPS in production
Server-side secrets
Session isolation
Short image retention
AI output validation
Error sanitization
```

## Not required

**[non-goal]**

```text
Enterprise IAM
SSO
RBAC framework
WAF
SIEM
Zero Trust platform
Secrets-management platform
Multi-region disaster recovery
```

---

# 39. Observability Baseline

## Logs

**[requirement]**

Record:

```text
request ID
operation
provider
model
latency
status
error category
fallback path
```

Do not record raw images unnecessarily.

## Metrics

**[requirement]**

Track:

- analysis latency,
- chat latency,
- comparison latency,
- provider failure count,
- fallback count,
- structured-output failure count,
- upload rejection count.

## Health checks

**[requirement]**

Provide a lightweight health endpoint that tests application health without performing an AI request.

Database health may be tested through a minimal query.

---

# 40. Performance Baseline

## Frontend

Target:

- fast initial static load,
- no unnecessary JavaScript libraries,
- image preview without repeated uploads.

## Backend

Target:

- asynchronous request processing,
- bounded uploads,
- bounded AI request duration,
- no CPU-heavy work on the event loop.

## AI

Target:

- normal image analysis under approximately 10 seconds,
- interactive follow-up under approximately 8 seconds.

These are product targets, not provider SLAs.

## Database

Use:

- a small connection pool,
- indexes on foreign keys and timestamps,
- no unbounded queries.

---

# 41. Compatibility Matrix

| Component           | Required baseline                       | Compatible? | Notes                 |
| ------------------- | --------------------------------------- | ----------: | --------------------- |
| Node 24.21.0        | ESM / modern JS                         |          ✅ | LTS                   |
| React 19.3          | Modern browsers                         |          ✅ | Stable                |
| Vite 8.3            | Node 20.19+/22.12+                      |          ✅ | Node 24 satisfies     |
| Express 5.2         | Node 18+                                |          ✅ | Node 24 satisfies     |
| JavaScript (ES2024) | Modern browsers/Node                    |          ✅ | No compilation needed |
| ESLint 10           | Node 20.19+/22.13+/24+                  |          ✅ | Node 24 satisfies     |
| Tailwind 4.3        | Safari 16.4+, Chrome 111+, Firefox 128+ |          ✅ | Suitable for demo     |
| PostgreSQL 18.6     | Current supported                       |          ✅ | Recommended           |
| pg 8.23             | Node PostgreSQL client                  |          ✅ | Direct driver         |
| Multer 2.4          | Node multipart handling                 |          ✅ | Use strict limits     |
| Helmet 8.3          | Express/Node                            |          ✅ | Security headers      |
| cors 2.8.6          | Express                                 |          ✅ | Not access control    |
| rate-limit 8.7      | Express                                 |          ✅ | Anonymous protection  |
| Zod 4.6.5           | JavaScript                              |          ✅ | Validation            |

---

# 42. Unresolved Compatibility Questions

These are not failures. They are items that must be verified before the dependency set is fully locked.

## UQ-001 OpenRouter model availability

**Question:** Which exact OpenRouter model currently supports, simultaneously:

- image input,
- structured JSON Schema output,
- acceptable latency,
- acceptable cost,
- reliable provider availability?

**Status:** OPEN

**Action:** Verify through OpenRouter's current Models API immediately before implementation and before final deployment.

## UQ-002 OpenRouter/Gemini schema parity

**Question:** Can the exact same SceneTrace JSON Schema be accepted unchanged by both OpenRouter primary and direct Gemini fallback?

**Status:** OPEN

**Action:** Run the schema against both providers before writing application-level assumptions around optional fields.

## UQ-003 Managed PostgreSQL provider version

**Question:** Does the selected deployment provider offer PostgreSQL 18.6 or a compatible 18.x patch?

**Status:** OPEN

**Action:** Check provider's current supported version at deployment time.

## UQ-004 Object-storage lifecycle support

**Question:** Does the chosen storage service support automatic deletion after the 24-hour MVP retention period?

**Status:** OPEN

**Action:** Confirm lifecycle-rule support before deployment.

## UQ-005 Node 24 hosting support

**Question:** Does the final backend hosting platform support Node 24.x directly?

**Status:** OPEN

**Action:** Verify runtime selector/current managed Node versions immediately before deployment.

## UQ-006 JavaScript tooling compatibility

**Question:** Does the selected ESLint, editor extension, and deployment build environment all support modern JavaScript (ES2024) cleanly?

**Status:** OPEN

**Action:** Run a clean scaffold before implementation.

## UQ-007 Vite plugin compatibility

**Question:** Are all chosen Vite plugins explicitly compatible with Vite 8.3/Rolldown?

**Status:** OPEN

**Action:** Keep plugin count minimal and verify every plugin's current release/support statement.

## UQ-008 Browser baseline

**Question:** Are all hackathon judging devices above the Tailwind v4 browser baseline?

**Status:** OPEN

**Action:** Validate the actual judging hardware/browser versions.

## UQ-009 AI provider data retention settings

**Question:** What exact retention/zero-data-retention settings are available on the selected OpenRouter provider endpoints and Gemini path?

**Status:** OPEN

**Action:** Confirm the provider policies for the actual selected endpoints, not generic platform marketing.

## UQ-010 Rate-limit policy

**Question:** What exact AI provider quotas/billing limits will apply to the team's accounts?

**Status:** OPEN

**Action:** Check actual account limits before setting the final anonymous request quota.

---

# 43. Technology Decisions by Priority

## P0: Must lock before coding

1. Node 24.21.0
2. React 19.3.0
3. React DOM 19.3.0
4. Vite 8.3.3
5. Express 5.2.1
6. PostgreSQL 18.6
7. pg 8.23.1
8. JavaScript (ES2024)
9. Tailwind 4.3.3
10. Zod 4.6.5
11. Multer 2.4.0
12. Helmet 8.3.0
13. cors 2.8.6
14. express-rate-limit 8.7.0

## P1: Must validate before AI integration

15. OpenRouter exact model
16. OpenRouter structured output compatibility
17. Gemini 3.8 Flash fallback quota/access
18. Shared response schema

## P2: Deployment validation

19. PostgreSQL 18 provider support
20. Object-storage lifecycle support
21. Node 24 hosting support
22. browser baseline

---

# 44. Fresh Project vs Existing Project Migration

## Fresh project

**[decision]**

Use the complete current baseline.

This is the preferred case.

## Existing partially-built project

**[risk]**

Do not blindly upgrade everything to the newest versions during the hackathon.

Instead:

1. inspect current package versions,
2. determine whether the project already runs,
3. upgrade only blockers/security-critical components,
4. preserve working code unless a dependency is EOL/vulnerable,
5. perform a clean build after every major upgrade.

## Critical rule

**[decision]**

Do not turn a 24-hour application build into a dependency-migration project.

The baseline is for a clean/new foundation.

---

# 45. Migration Work Summary

| Dependency          | If starting fresh | If migrating older project           | Risk                   |
| ------------------- | ----------------- | ------------------------------------ | ---------------------- |
| Node 24             | Install directly  | Verify native dependencies           | Low-Medium             |
| React 19.3          | Install directly  | Check removed/deprecated APIs        | Low-Medium             |
| Vite 8.3            | Install directly  | Review Rolldown/plugin compatibility | Medium                 |
| Tailwind 4.3        | Install directly  | Run v3→v4 upgrade guide              | Medium                 |
| Express 5.2         | Install directly  | Follow Express 5 migration           | Medium                 |
| PostgreSQL 18.6     | New cluster       | Major-version migration required     | High                   |
| JavaScript (ES2024) | Install directly  | No compiler migration needed         | Low                    |
| ESLint 10           | Flat config       | `.eslintrc` migration                | Medium                 |
| Multer 2.4          | Install directly  | Upgrade immediately if vulnerable    | High security priority |
| Zod 4               | Install directly  | Schema migration if on old Zod       | Low-Medium             |

---

# 46. Technology Risks

## R-TECH-001 Vite 8 ecosystem mismatch

**Probability:** Medium  
**Impact:** Medium

Mitigation:

- minimal Vite plugins,
- use official Vite React template,
- test production build immediately.

## R-TECH-002 JavaScript ecosystem compatibility

**Probability:** Low  
**Impact:** Low

Mitigation:

- use modern ES modules,
- keep dependencies minimal,
- rely on ESLint for code quality,
- validate all external data with Zod.

## R-TECH-003 Multer vulnerability recurrence

**Probability:** Medium  
**Impact:** High

Mitigation:

- 2.4.0 minimum,
- monitor security advisories,
- strict multipart limits.

## R-TECH-004 AI model drift

**Probability:** Medium  
**Impact:** High

Mitigation:

- exact model ID,
- response schema validation,
- integration tests,
- provider abstraction.

## R-TECH-005 OpenRouter provider variability

**Probability:** Medium  
**Impact:** High

Mitigation:

- use provider routing,
- validate capability descriptors,
- direct Gemini fallback.

## R-TECH-006 PostgreSQL hosting mismatch

**Probability:** Low-Medium  
**Impact:** Medium

Mitigation:

- verify managed provider version before deployment,
- avoid unnecessary PG18-only features.

## R-TECH-007 Browser compatibility

**Probability:** Low  
**Impact:** Medium

Mitigation:

- test the actual judging browser,
- avoid unnecessary bleeding-edge browser APIs.

---

# 47. Final Technology Recommendation

## Use now

```text
Node.js 24.21.0 LTS
npm 11.19.x bundled with Node 24.21.0
React 19.3.0
React DOM 19.3.0
Vite 8.3.3
Tailwind CSS 4.3.3
Express 5.2.1
PostgreSQL 18.6
pg 8.23.1
JavaScript (ES2024)
Zod 4.6.5
Multer 2.4.0
Helmet 8.3.0
cors 2.8.6
express-rate-limit 8.7.0
native fetch
native crypto.randomUUID()
native Node .env loading
```

## Do not add yet

```text
Axios
dotenv
uuid
React Router
Prisma/ORM
Redis
Kafka
Vector DB
RAG framework
AI agent framework
custom vision model
image-processing native dependency
typescript
```

## AI

```text
Primary:
OpenRouter
   ↓
verified current multimodal model

Fallback:
Direct Gemini API
   ↓
Gemini 3.8 Flash
```

---

# 48. Final CTO-Level Decision

The technology baseline should prioritize **supportability + compatibility + speed of implementation**.

The selected stack is intentionally boring where it can be:

```text
React
Vite
Tailwind
Express
Node
PostgreSQL
pg
JavaScript
```

and intentionally flexible only at the AI boundary:

```text
OpenRouter
    ↓
current verified multimodal model
    ↓
direct Gemini fallback
```

The important modernization decisions are:

1. **Node 24 LTS instead of Node 26 Current.**
2. **React 19.3 stable instead of canary.**
3. **Vite 8 stable instead of Vite 8 beta/experimental tooling.**
4. **Tailwind 4.3 instead of old v3 setup.**
5. **Express 5 instead of Express 4 for a fresh project.**
6. **PostgreSQL 18.6 instead of starting on an older major.**
7. **JavaScript (ES2024) for the fresh codebase, avoiding the TypeScript compiler toolchain.**
8. **Multer 2.4.0 because older releases have multiple 2026 security advisories.**
9. **Native fetch instead of Axios.**
10. **Native Node `.env` support instead of dotenv.**
11. **Direct `pg` instead of an ORM for the 24-hour MVP.**
12. **No router unless the product actually needs multiple navigable pages.**

No application code has been modified as part of this research.

---

# 49. Official Source Index

## Node.js

- https://nodejs.org/en/about/previous-releases
- https://nodejs.org/en/download/archive/v24.10.0
- https://nodejs.org/en/blog/release
- https://nodejs.org/api/globals.html
- https://nodejs.org/api/cli.html
- https://nodejs.org/api/process.html

## React

- https://react.dev/versions
- https://react.dev/blog/2026/09/09/react-19-3
- https://react.dev/reference/react/StrictMode
- https://react.dev/blog

## Vite

- https://vite.dev/guide/
- https://vite.dev/blog/announcing-vite8.html
- https://vite.dev/blog/announcing-vite8-1
- https://vite.dev/guide/migration.html

## Tailwind

- https://tailwindcss.com/docs/installation/using-vite
- https://tailwindcss.com/docs/upgrade-guide
- https://tailwindcss.com/blog

## Express

- https://expressjs.com/en/starter/installing.html
- https://expressjs.com/en/guide/migrating-5.html
- https://expressjs.com/en/advanced/best-practice-security.html
- https://expressjs.com/en/advanced/best-practice-performance/

## PostgreSQL

- https://www.postgresql.org/docs/current/release.html
- https://www.postgresql.org/docs/release/18.6/
- https://www.postgresql.org/docs/18/release-18.html
- https://www.postgresql.org/docs/current/upgrading.html
- https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
- https://www.postgresql.org/docs/current/runtime-config-connection.html

## JavaScript

- https://tc39.es/ecma262/
- https://nodejs.org/api/

## ESLint

- https://eslint.org/blog/2026/09/eslint-v10.10.0-released/
- https://eslint.org/docs/latest/use/migrate-to-10.0.0

## OpenRouter

- https://openrouter.ai/docs/client-sdks/overview
- https://openrouter.ai/docs/guides/routing/model-fallbacks
- https://openrouter.ai/docs/guides/features/structured-outputs
- https://openrouter.ai/blog/tutorials/send-image-to-llm/
- https://openrouter.ai/docs/guides/best-practices/prompt-caching
- https://openrouter.ai/blog/announcements/security-center/

## Gemini API

- https://ai.google.dev/gemini-api/docs/models
- https://ai.google.dev/gemini-api/docs/latest-model
- https://ai.google.dev/gemini-api/docs/deprecations/

## Supporting Node/Express packages

- https://www.npmjs.com/package/pg
- https://www.npmjs.com/package/zod
- https://www.npmjs.com/package/multer
- https://github.com/expressjs/multer/security/advisories
- https://github.com/expressjs/multer/releases
- https://www.npmjs.com/package/helmet
- https://github.com/helmetjs/helmet
- https://www.npmjs.com/package/cors
- https://www.npmjs.com/package/express-rate-limit

---

# 50. Research Integrity Note

This document intentionally distinguishes:

- **verified current release information,**
- **official documentation guidance,**
- **project decisions,**
- **operational assumptions,**
- **risks,**
- **and unresolved external compatibility questions.**

Where a dynamic service such as OpenRouter can change its model catalog independently of our repository, the exact endpoint/model decision is left as an explicit verification step rather than being presented as permanent fact.

That is intentional. A production-safe technology baseline should be reproducible and honest about external dependencies.
