export const build = (n: number) => {
    if (n < 2) return [];

    const stack: {
        memory: { [key: number]: Set<number> };
        cur: number;
        res: number[];
    }[] = [];

    (() => {
        const memory: { [key: number]: Set<number> } = {};
        const res: number[] = [];
        for (let i = 0; i < n; ++i) {
            memory[i] = new Set(
                [...new Array(n)]
                    .map((_, x) => x)
                    .filter((x) => x != i && x != i + 1)
            );

            res.push(i);
        }

        stack.push({
            memory,
            cur: n - 1,
            res,
        });
    })();

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

            if (vb != va) return vb - va;
            return Math.random() - 0.5;
        });

        // console.log(next.map((a) => ({ a, l: memory[a].size })));

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
