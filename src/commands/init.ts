import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs/promises";
import path from "path";

export const initCommand = new Command("init")
  .description("Initialize a new Orcantra project")
  .argument("<project-name>", "Name of the project")
  .action(async (projectName: string) => {
    const spinner = ora("Creating Orcantra TypeScript project...").start();

    try {
      const projectPath = path.join(process.cwd(), projectName);

      // 1. Create directories
      await fs.mkdir(projectPath, { recursive: true });
      await fs.mkdir(path.join(projectPath, "src"), { recursive: true });

      // 2. Create basic package.json
      const packageJsonContent = {
        name: projectName,
        version: "0.1.0",
        private: true,
        type: "module",
        scripts: {
          dev: "tsx watch src/index.ts",
          build: "tsc",
        },
        devDependencies: {
          "@types/node": "^20.0.0",
          typescript: "^5.0.0",
          tsx: "^4.7.0",
        },
      };

      await fs.writeFile(
        path.join(projectPath, "package.json"),
        JSON.stringify(packageJsonContent, null, 2),
      );

      // 3. Create tsconfig.json
      const tsconfigContent = {
        compilerOptions: {
          target: "ESNext",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"],
      };

      await fs.writeFile(
        path.join(projectPath, "tsconfig.json"),
        JSON.stringify(tsconfigContent, null, 2),
      );

      // 4. Create .gitignore
      const gitignoreContent = `node_modules/
dist/
.env`;

      await fs.writeFile(
        path.join(projectPath, ".gitignore"),
        gitignoreContent,
      );

      // 5. Create src/index.ts starter file
      const indexTsContent = `console.log("Welcome to Orcantra 🚀");\n`;

      await fs.writeFile(
        path.join(projectPath, "src", "index.ts"),
        indexTsContent,
      );

      // 6. Create README.md
      const readmeContent = `# ${projectName}

This project was bootstrapped with [\`@orcantra/cli\`](https://www.npmjs.com/package/@orcantra/cli).

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Orcantra Ecosystem
Orcantra scaffolds minimal, opinionated TypeScript starters focused on speed and production readiness.
`;

      await fs.writeFile(path.join(projectPath, "README.md"), readmeContent);

      spinner.succeed(chalk.green("Project setup complete!"));

      console.log("\nNext steps:");
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan("  npm install"));
      console.log(chalk.cyan("  npm run dev\n"));
    } catch (error: any) {
      spinner.fail(chalk.red("Failed to create project."));
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });
