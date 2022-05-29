import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

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
    //登録処理を書く
    return false;
  }

  static async all(): Promise<Array<Advertisement>> {
    const file = process.env.SS_FILE_ID;
    const key = process.env.SS_API_KEY;
    const sheet = process.env.SS_SHEET_NAME;
    const axios = new HttpService();
    const Url = `https://sheets.googleapis.com/v4/spreadsheets/${file}/values/${sheet}/?key=${key}`;

    const records = await lastValueFrom(
      axios.get(Url).pipe(
        map((response) => {
          return response.data.values;
        }),
      ),
    );

    return records.map(
      (record) => new Advertisement(record[1], new Date(record[0])),
    );
  }

  public async getTest(): Promise<string> {
    return '';
  }
}
