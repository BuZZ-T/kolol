export type GuildTrainerData = {
    description: string;
    image: string;
    skills: Array<{
        descriptionId: string;
        id: string;
        image: string;
        isDisabled: boolean;
        level: string;
        meat: string;
        name: string;
    }>
    type: 'trainer';
    name: string;
}
