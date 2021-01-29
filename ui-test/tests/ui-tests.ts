import * as fs from 'fs';
import {logger} from '../Logger';
import {browser} from '../main';

describe('App', () => {
  it('should add todoItems when click add button', async () => {
    try {
      await browser.startRecordingScreen({videoType: 'mpeg4'});

      await browser.$('~newButton').then((b) => b.click());
    } catch (error) {
      logger.error(error);
      throw error;
    } finally {
      // await browser.pause(1000);
      const videoBase64 = await browser.stopRecordingScreen();

      fs.writeFile(
        './videos/app-add-new-item.mkv',
        videoBase64,
        'base64',
        (err) => {
          logger.log(err);
        },
      );
    }
  });
});
