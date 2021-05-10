import { createWriteStream } from "fs";
import { join } from "path";

import { Serverless, ServerlessOptions } from "#/types/serverless";

export class ServerlessDotenvPlugin {
  public commands!: Record<string, object>;

  public hooks!: Record<string, () => void>;

  public path: string = join(".env");

  public definitions!: Record<string, string>;

  /* istanbul ignore next */
  public constructor(public readonly serverless: Serverless, public readonly options: ServerlessOptions) {
    this.commands = {
      dotenv: {
        commands: {
          write: {
            usage: "Write your custom definitions on a .env file",
            lifecycleEvents: ["prepare", "write", "teardown"],
          },
        },
      },
    };

    this.hooks = {
      "before:deploy:deploy": async (): Promise<void> => {
        return this.serverless.pluginManager.run(["dotenv", "write"]);
      },
      "dotenv:write:prepare": this.prepare.bind(this),
      "dotenv:write:write": this.write.bind(this),
      "dotenv:write:teardown": this.teardown.bind(this),
    };
  }

  public prepare(): void {
    const definitions = this.serverless.service.custom.dotenv;
    const count = Object.keys(definitions).length;

    this.serverless.cli.log(`🕵️  ${String(count)} enviroment variables found`);
    this.definitions = definitions;
  }

  public write(): void {
    this.serverless.cli.log(`✍️  Writing your custom definitions on .env file: ${this.path}`);

    const outputStream = createWriteStream(this.path);

    for (const entry of Object.entries(this.definitions)) {
      const [key, value] = entry;

      outputStream.write(Buffer.from(`${key}=${value}`));

      this.serverless.cli.log(`✅ ${key}`);
    }
  }

  public teardown(): void {
    this.serverless.cli.log(`🥳 All definitions writed with success: ${this.path}`);
  }
}
