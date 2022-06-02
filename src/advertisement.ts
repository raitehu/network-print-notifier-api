import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment, { Moment } from 'moment-timezone';

export class Advertisement {
  constructor(private tweetURL: string, private expireDate: Moment) {
    this.tweetURL = tweetURL;
    this.expireDate = expireDate;
  }

  public getTweetURL(): string {
    return this.tweetURL;
  }

  public getExpireDate(): Moment {
    return this.expireDate;
  }

  public validate(): boolean {
    const urlArray = this.tweetURL.split('/');
    return (
      urlArray[0] === 'https:' && //* はじまりが https://twitter.com であること
      urlArray[1] === '' && //* はじまりが https://twitter.com であること
      urlArray[2] === 'twitter.com' && //* はじまりが https://twitter.com であること
      /[a-zA-Z0-9]+/.test(urlArray[3]) && //* ユーザ名が英数字の大文字小文字アンダースコアのみであること
      5 <= urlArray[3].length && //* ユーザ名が5文字以上であること
      urlArray[3].length <= 15 && //* ユーザ名が15文字以内であること
      urlArray[4] === 'status' && //* 次がstatusであること
      /[0-9]+/.test(urlArray[5]) //* ツイートのIDが数字のみであること
    );
  }

  public async register(): Promise<boolean> {
    const credential = Advertisement.credential();
    const spreadsheet = new GoogleSpreadsheet(process.env.SS_FILE_ID);
    spreadsheet.useServiceAccountAuth(credential);
    await spreadsheet.loadInfo();
    const sheet = spreadsheet.sheetsByIndex[0];

    // 最終行にレコードを追加
    await sheet.addRow(
      {
        TweetURL: this.tweetURL,
        ExpireDate: this.expireDate
          .tz('Asia/Tokyo')
          .format('YYYY/MM/DD HH:mm:ss'),
      },
      function (err) {
        if (err) {
        console.error(err);
        return false;
        }
      },
    );
    return true;
  }

  static async all(): Promise<Array<Advertisement>> {
    const credential = Advertisement.credential();
    const spreadsheet = new GoogleSpreadsheet(process.env.SS_FILE_ID);
    spreadsheet.useServiceAccountAuth(credential);

    await spreadsheet.loadInfo();

    const sheet = spreadsheet.sheetsByIndex[0];
    const records = await sheet.getRows();

    return records.map(
      (record) => new Advertisement(record.TweetURL, moment(record.ExpireDate)),
    );
  }

  public async getTest(): Promise<string> {
    return '';
  }

  private static credential(): object {
    return {
      type: process.env.SS_TYPE,
      project_id: process.env.SS_PROJECT_ID,
      private_key_id: process.env.SS_PRIVATE_KEY_ID,
      private_key: process.env.SS_PRIVATE_KEY,
      client_email: process.env.SS_CLIENT_EMAIL,
      client_id: process.env.SS_CLIENT_ID,
      auth_uri: process.env.SS_AUTH_URI,
      token_uri: process.env.SS_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.SS_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.SS_CLIENT_X509_CERT_URL,
    };
  }
}
