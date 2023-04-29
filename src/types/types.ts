export type JokeResponseType = {
    type: "single",
    joke: string
} | {
    type: "twopart",
    setup: string;
    delivery: string;
};
