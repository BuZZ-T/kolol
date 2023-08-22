export type CampgroundItem = {
    image: string;
    title: string;
    link: string | null;
}

export type Campground = Array<Array<CampgroundItem | null>>;
