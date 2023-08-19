type ImageUrl = `https://d2uyhvukfffg5a.cloudfront.net/itemimages/${string}.${string}`;

export const imageToAbsolute = (image: string, extension = 'gif'): ImageUrl => `https://d2uyhvukfffg5a.cloudfront.net/itemimages/${image}.${extension}`;
