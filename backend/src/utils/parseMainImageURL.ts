export function parseMainImageURL(content: string) {
    const imageRegex = /\!\[[^\]]*\]\([^\)]+\)/;
    const imageText = imageRegex.exec(content);
    if (!imageText) {
        return null;
    }
    const splits = imageText[0].slice(0, -1).split('(');
    const mainImageURL = splits[splits.length - 1];
    return mainImageURL;
}
