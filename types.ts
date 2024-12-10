export type cell = { row: number; col: number }
export type startNode = {
    f: number;
    g: number;
    h: number;
    parent: startNode | null;
    row: number | null;
    col: number | null;
}

export type SpotType = {
    f: number
    g: number
    h: number
}