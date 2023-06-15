export type MapTile = {
    image: string;
    url: string;
}

/**
 * 3x3 with one splitted tile = 10 Tiles
 */
export type Map = [
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
]
