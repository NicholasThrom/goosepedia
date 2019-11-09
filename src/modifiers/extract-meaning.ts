import { timingSafeEqual } from "crypto";

export interface Meaning {
    nouns: {
        eventNames: Set<string>;
        placeNames: Set<string>;
        thingNames: Set<string>;
        personNames: Set<string>;
    };
}

export function extractMeaning(text: string): Meaning {
    const filteredText = filterText(text);

    const nouns = properNouns(filteredText);
    return {
        nouns,
    };
}

function filterText(text: string) {
    return text
    .replace(
        /<style>.*<\/style>/gis,
        "",
    )
    .replace(
        /<[^>]*>/gis,
        "",
    );
}

const personIndicators = new Set([
    "son",
    "sons",
    "daughter",
    "daughters",
    "child",
    "children",
    "uncle",
    "uncles",
    "father",
    "mother",
    "brother",
    "brothers",
    "sister",
    "sisters",
    "sibling",
    "siblings",
    "grandfather",
    "grandmother",
    "grandparent",
    "grandparents",
]);

const placeIndicators = new Set([
    "in",
    "at",
    "from",
]);

const eventIndicators = new Set([
    "during",
    "of",
    "the",
]);

const thingIndicators = new Set([
    "the",
]);

const months = new Set([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]);

function properNouns(text: string) {
    const eventNames: Set<string> = new Set(["World War"]);
    const placeNames: Set<string> = new Set(["Canada"]);
    const personNames: Set<string> = new Set(["Justin Trudeau"]);
    const thingNames: Set<string> = new Set(["White House"]);

    const nounPhrases = text.match(/ ([a-z]+) ([A-Z][a-z]*(?: [A-Z][a-z]*)*)( |\.|'s)/g);

    const nounInfo = new Map<string, { context: { preceding: string, following: string }[] }>();

    if (nounPhrases) {
        nounPhrases.forEach((nounPhrase) => {
            const match = nounPhrase.match(/ ([a-z]+) ([A-Z][a-z]*(?: [A-Z][a-z]*)*)( |\.|'s)/);
            if (!match) { return; }

            const preceding = match[1];
            const word = match[2];
            const following = match[3];

            if (!nounInfo.has(word)) { nounInfo.set(word, { context: [] }); }

            nounInfo.get(word)!.context.push({ preceding, following });
        });
    }

    Array.from(nounInfo.keys()).forEach((key) => {
        let eventScore = 0;
        let placeScore = 0;
        let personScore = 0;
        let thingScore = 1;

        nounInfo.get(key)!.context.forEach(({ preceding, following }) => {
            if (months.has(key)) { eventScore += 1000; }
            if (personIndicators.has(preceding)) { personScore += 20; }
            if (following === "'s") { personScore += 2; }
            if (placeIndicators.has(preceding)) { placeScore += 1; }
            if (eventIndicators.has(preceding)) { eventScore += 1; }
            if (thingIndicators.has(preceding)) { thingScore += 1; }
        });

        if (eventScore > thingScore && eventScore > placeScore && eventScore > personScore) {
            eventNames.add(key);
        } else if (placeScore > thingScore && placeScore > personScore) {
            placeNames.add(key);
        } else if (personScore > thingScore) {
            personNames.add(key);
        } else {
            thingNames.add(key);
        }
    });

    return {
        eventNames,
        placeNames,
        thingNames,
        personNames,
    };
}
