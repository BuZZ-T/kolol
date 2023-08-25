type ItemPath = 'itemimages' | 'otherimages';

type ImageUrl = `https://d2uyhvukfffg5a.cloudfront.net/${ItemPath}/${string}.${string}`;

export const imageToAbsolute = (image: string, path: ItemPath = 'itemimages', extension = 'gif'): ImageUrl =>
  `https://d2uyhvukfffg5a.cloudfront.net/${path}/${image}.${extension}`;
