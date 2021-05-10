import { SinonSpy, spy } from "sinon";

import { ServerlessDotenvPlugin } from "#/serverless-dotnenv-plugin";

console.log(ServerlessDotenvPlugin);

export class ServerlessDotenvPluginSubject {
  public log: SinonSpy = spy();

  private definitions!: Record<string, string>;

  public createPlugin(): ServerlessDotenvPlugin {
    return new ServerlessDotenvPlugin(
      {
        cli: {
          log: this.log,
        },
        service: {
          custom: {
            dotenv: this.definitions,
          },
        },
        pluginManager: {
          run: spy(),
        },
      },
      {},
    );
  }

  public withLog(log: SinonSpy): ServerlessDotenvPluginSubject {
    this.log = log;

    return this;
  }

  public withDefinitions(definitions: Record<string, string>): ServerlessDotenvPluginSubject {
    this.definitions = definitions;

    return this;
  }
}
