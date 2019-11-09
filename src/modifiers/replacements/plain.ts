const caselessReplacements = [
    ["people", "geese"],
    ["men", "gander"],
    ["man", "gander"],
    ["women", "geese"],
    ["woman", "goose"],
];

export const replacements = [
    ...caselessReplacements,
    ...(caselessReplacements.map(([from, to]) => [`${from.slice(0, 1).toUpperCase()}${from.slice(1)}`, `${to.slice(0, 1).toUpperCase()}${to.slice(1)}`])),
];
