import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs/promises";
import path from "path";

export const initCommand = new Command("init")
  .description("Initialize a new Orcantra project")
  .argument("<project-name>", "Name of the project")
  .action(async (projectName: string) => {
    const spinner = ora("Creating project...").start();

    try {
      const projectPath = path.join(process.cwd(), projectName);

      // 1. Create directory
      await fs.mkdir(projectPath, { recursive: true });

      // 2. Create basic package.json
      const packageJsonContent = {
        name: projectName,
        version: "0.1.0",
        private: true,
        scripts: {
          test: 'echo \"Error: no test specified\" && exit 1',
        },
      };

      await fs.writeFile(
        path.join(projectPath, "package.json"),
        JSON.stringify(packageJsonContent, null, 2),
      );

      spinner.succeed(chalk.green("Project setup complete!"));

      console.log("\nNext steps:");
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan("  npm install\n"));
    } catch (error: any) {
      spinner.fail(chalk.red("Failed to create project."));
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });
