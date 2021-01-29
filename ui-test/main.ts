import {afterEach, beforeEach} from 'mocha';
import {BrowserObject, remote} from 'webdriverio';
import * as config from './webdriver.config.json';

const opts: WebdriverIO.RemoteOptions = {
  port: 4723,
  capabilities: config,
};

export let browser: BrowserObject;

beforeEach(async () => {
  browser = await remote(opts);
});

afterEach(async () => {});
