# Orcantra CLI

**Orcantra** is an infrastructure-first TypeScript bootstrapper and development tool.

The `@orcantra/cli` is designed to be highly opinionated and extremely fast, allowing you to instantly scaffold production-grade starter projects equipped with modern standards.

## Installation

You don't need to install anything globally. You can run the CLI directly using \`npx\`:

\`\`\`bash
npx orcantra init <project-name>
\`\`\`

If you prefer to install it globally:
\`\`\`bash
npm install -g @orcantra/cli
orcantra init <project-name>
\`\`\`

## Commands

### \`init <project-name>\`

Scaffolds a new Orcantra project in the current directory.

**What it generates:**

- A comprehensive \`package.json\` pre-configured with ESM (\`"type": "module"\`) and modern build scripts.
- A strict, opinionated \`tsconfig.json\` targeted for \`NodeNext\`.
- A fully-configured \`.gitignore\` for Node environments.
- A functional \`src/index.ts\` entry point to get you coding immediately.
- A customized \`README.md\` for the generated project.

_Example:_
\`\`\`bash
npx orcantra init my-api
cd my-api
npm install
npm run dev
\`\`\`

## Architecture & Stack

The CLI is built with:

- **TypeScript & Node.js 18+**
- **commander** for robust command-line interface routing.
- **tsup** for lightning-fast bundling.
- **chalk** & **ora** for beautiful, responsive terminal output.

## License

[MIT](./LICENSE)
