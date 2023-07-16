import { Choice } from '../adventure/adventure.types';

export type AnswerText = {
    type: 'text',
    value: string;
}

export type AnswerLink = {
    type: 'link',
    value: string;
    href: string;
}

export type AnswerImage = {
    type: 'image',
    value: string;
}

export type AnswerUnknown = {
    type: 'unknown',
    node: string;
}

export type EntryContent = AnswerText | AnswerLink | AnswerImage | AnswerUnknown;

export type AnswerEntries = Array<EntryContent>;

export type Answer = {
    type: 'answer';
    title: string;
    entries: Array<AnswerText | AnswerEntries>;
}

export type Notice = Answer | Choice;
