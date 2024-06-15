export class Jwt {

  readonly sub: string
  readonly exp: number
  readonly role: string

  constructor(sub: string, exp: number, role: string) {
    this.sub = sub;
    this.exp = exp;
    this.role = role;
  }
}
