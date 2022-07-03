export const build = (n: number) => {
    if (n < 2) return [];

    const stack: {
        memory: { [key: number]: Set<number> };
        cur: number;
        res: number[];
    }[] = [];
    for (let i = 1; i < n; ++i) {
        const memory: { [key: number]: Set<number> } = {};
        memory[0] = new Set(
            [...new Array(n)].map((_, x) => x).filter((x) => x !== 0 && x !== i)
        );

        for (let j = 1; j < n; ++j) {
            memory[j] = new Set(
                [...new Array(n)].map((_, x) => x).filter((x) => x !== j)
            );
        }

        stack.push({
            memory,
            cur: i,
            res: [0, i],
        });
    }

    while (stack.length) {
        const top = stack.pop();
        if (!top) continue;

        const { memory, cur, res } = top;

        const is_done =
            Object.values(memory).every((m) => m.size === 0) && cur == 0;

        if (is_done) {
            return res;
        }

        const next = [...memory[cur]].sort((a, b) => {
            const va = memory[a].size;
            const vb = memory[b].size;

            if (va != vb) return va - vb;
            return Math.random() - 0.5;
        });

        for (const nxt of next) {
            const newMemory = Object.assign({}, memory);
            newMemory[cur] = new Set(next.filter((x) => x != nxt));

            const newRes = [...res, nxt];

            stack.push({
                memory: newMemory,
                cur: nxt,
                res: newRes,
            });
        }
    }

    return [];
};
