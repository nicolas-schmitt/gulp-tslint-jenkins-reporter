class Clean {
  private str: string = ''

  constructor() {
    this.str = 'woo'
  }

  public chop(): string {
    const tab = this.str.split('/')
    return tab[0]
  }
}
