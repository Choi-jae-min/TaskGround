type HistoryOptions<T> = {
    limit?: number;
    isEqual?: (a: T, b: T) => boolean;
};

export class History<T> {
    private past: T[] = [];
    private future: T[] = [];
    private limit: number;
    private isEqual?: (a: T, b: T) => boolean;

    constructor(options: HistoryOptions<T> = {}) {
        this.limit = options.limit ?? 50;
        this.isEqual = options.isEqual;
    }

    push(snapshot: T, resetRedo = false) {
        const last = this.past[this.past.length - 1];

        if (this.isEqual && last !== undefined && this.isEqual(last, snapshot)) {
            if (resetRedo) this.clearRedo();
            return;
        }

        this.past.push(snapshot);

        if (this.past.length > this.limit) {
            this.past.shift();
        }

        if (resetRedo) this.clearRedo();
    }

    undo(current: T): T | null {
        if (this.past.length === 0) return null;

        const prev = this.past.pop()!;
        this.future.unshift(current);

        if (this.future.length > this.limit) {
            this.future.pop();
        }

        return prev;
    }

    redo(current: T): T | null {
        if (this.future.length === 0) return null;

        const next = this.future.shift()!;
        this.past.push(current);

        if (this.past.length > this.limit) {
            this.past.shift();
        }

        return next;
    }

    clearRedo() {
        this.future = [];
    }

    getPast() {
        return this.past;
    }

    getFuture() {
        return this.future;
    }

    canUndo() {
        return this.past.length > 0;
    }

    canRedo() {
        return this.future.length > 0;
    }
}
