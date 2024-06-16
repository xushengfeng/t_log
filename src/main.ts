export class tLog {
    private tl: { t: string; n: number }[] = [];
    private name: string;
    constructor(taskName?: string) {
        this.name = taskName || "default";
    }
    l(name: string, time?: number) {
        let now = 0;
        if (time) {
            now = time - (new Date().getTime() - performance.now());
        } else {
            now = performance.now();
        }
        this.tl.push({ t: name, n: now });
        let l: { d: number; n: string; c: number }[] = [];
        for (let i = 1; i < this.tl.length; i++) {
            const d = this.tl[i].n - this.tl[i - 1].n;
            const name = this.tl[i - 1].t;
            let f = l.find((x) => x.n === name);
            if (f) {
                f.c++;
                f.d += d;
            } else l.push({ d: d, n: name, c: 1 });
        }
        const x: string[] = [];
        for (let i of l) {
            const t = i.c > 1 ? `${i.n}x${i.c}` : i.n;
            x.push(`${t} ${i.d}`);
        }
        x.push(this.tl.at(-1).t);
        console.log(`${this.name} ${l.map((i) => i.d).reduce((p, c) => p + c, 0)}ms: `, x.join(" "));
    }
    clear() {
        this.tl = [];
    }
}
