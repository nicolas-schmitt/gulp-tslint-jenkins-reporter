class Dirty {
    private str = '';

    constructor() {
        this.str = 'woo';
    }

    chop(): string {
        const tab = this.str.split('/');
        return tab[0];
    }
}
