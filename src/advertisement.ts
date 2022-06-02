export class Advertisement {
  constructor(private tweetURL: string, private expireDate: Date) {
    this.tweetURL = tweetURL;
    this.expireDate = expireDate;
  }

  public getTweetURL(): string {
    return this.tweetURL;
  }

  public getExpireDate(): Date {
    return this.expireDate;
  }

  public async register(): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const credential = Advertisement.credential();
    const spreadsheet = new GoogleSpreadsheet(process.env.SS_FILE_ID);
    spreadsheet.useServiceAccountAuth(credential);

    await spreadsheet.loadInfo();

    const sheet = spreadsheet.sheetsByIndex[0];

    //登録処理を書く
    await sheet.addRow(
      {
        TweetURL: this.tweetURL,
        expireDate: this.expireDate,
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const credential = Advertisement.credential();
    const spreadsheet = new GoogleSpreadsheet(process.env.SS_FILE_ID);
    spreadsheet.useServiceAccountAuth(credential);

    await spreadsheet.loadInfo();

    const sheet = spreadsheet.sheetsByIndex[0];
    const records = await sheet.getRows();

    return records.map(
      (record) =>
        new Advertisement(record.TweetURL, new Date(record.ExpireDate)),
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
