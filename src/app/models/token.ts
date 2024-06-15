export class Token {
  readonly access_token: string
  readonly refresh_token: string

  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
