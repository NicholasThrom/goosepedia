const caselessReplacements = [
    ["people", "geese"],
    ["men", "gander"],
    ["man", "gander"],
    ["women", "geese"],
    ["woman", "goose"],
    ["science", "goose math"],
    ["technology", "goose surveillance"],
    ["art", "goose drawing"],
    ["philosophy", "goose thinking"],
    ["finance", "goose counting"],
    ["culture", "goose collecting"],
    ["education", "goose raising"],
    ["game", "goosey activity"],
    ["evil", "anti-goose"],
    ["good", "goosey"],
    ["wrong", "ungooseable"],
];

export const replacements = [
    ...caselessReplacements,
    ...(caselessReplacements.map(([from, to]) => [`${from.slice(0, 1).toUpperCase()}${from.slice(1)}`, `${to.slice(0, 1).toUpperCase()}${to.slice(1)}`])),
];
