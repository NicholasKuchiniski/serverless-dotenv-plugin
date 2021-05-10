import * as fs from "fs";

import { expect } from "chai";
import { internet } from "faker";
import { SinonStub, spy, stub } from "sinon";

import { ServerlessDotenvPluginSubject } from "tests/src/index-subject";

describe("ServerlessDotenvPlugin", () => {
  describe(".prepare", () => {
    it("should set the actual definitions from serverless.yaml", () => {
      // given
      const definitions = {
        API_URL: internet.url(),
      };
      const subject = new ServerlessDotenvPluginSubject().withDefinitions(definitions);
      const plugin = subject.createPlugin();

      // when
      plugin.prepare();

      // then
      expect(plugin.definitions).to.be.equal(definitions);
    });
  });

  describe(".write", () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let createWriteStream!: SinonStub;

    beforeEach(() => {
      createWriteStream = stub(fs, "createWriteStream");
    });

    afterEach(() => {
      createWriteStream.restore();
    });

    it("should write definitions on .env file", () => {
      // given
      const definitions = {
        API_URL: internet.url(),
      };
      const subject = new ServerlessDotenvPluginSubject().withDefinitions(definitions);
      const plugin = subject.createPlugin();

      const write = spy();

      createWriteStream.returns({
        write,
      });

      // when
      plugin.prepare();
      plugin.write();

      // then
      expect(write.calledWith(Buffer.from(`API_URL=${definitions.API_URL}\n`))).to.be.true;
    });
  });

  describe(".teardown", () => {
    it("should log the succes", () => {
      // given
      const log = spy();
      const subject = new ServerlessDotenvPluginSubject().withLog(log);
      const plugin = subject.createPlugin();

      // when
      plugin.teardown();

      // then
      expect(log.called).to.be.true;
    });
  });
});
