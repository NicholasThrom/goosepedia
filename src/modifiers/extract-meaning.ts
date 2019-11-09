export function extractMeaning(text: string) {
    const filteredText = text
        .replace(
            /<style>.*<\/style>/gis,
            "",
        )
        .replace(
            /<[^>]*>/gis,
            "",
        );

    const nouns = properNouns(filteredText);
    return {
        nouns,
    };
}

function properNouns(text: string) {
    const eventNames = new Set();
    const placeNames = new Set();
    const others = new Set();

    const nounPhrases = text.match(/ [a-z]+ ([A-Z][a-z]*(?: [A-Z][a-z]*)*)/g);

    if (nounPhrases) {
        nounPhrases.forEach((nounPhrase) => {
            const matchEventName = nounPhrase.match(/ (?:during) ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/);
            if (matchEventName) {
                eventNames.add(matchEventName[1]);
                return;
            }

            const matchPlaceName = nounPhrase.match(/ (?:of|in|from) ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/);
            if (matchPlaceName) {
                placeNames.add(matchPlaceName[1]);
                return;
            }

            const otherName = nounPhrase.match(/ [a-z]+ ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/);
            if (otherName) {
                others.add(otherName[1]);
                return;
            }
        });
    }

    return {
        eventNames,
        placeNames,
        others,
    };
}
