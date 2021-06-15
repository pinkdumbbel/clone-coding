import { IDM } from '@src/types/db';
import dayjs from 'dayjs';

export interface DateSectionType {
    [date: string]: IDM[];
}

function makeDateSection(chatData: IDM[]) {
    const dateKeysObj: DateSectionType = {};

    chatData.forEach((chat) => {
        const date = dayjs(chat.createdAt).format('YYYY-MM-DD');

        if (Array.isArray(dateKeysObj[date])) {
            dateKeysObj[date].push(chat);
        }
        else {
            dateKeysObj[date] = [chat];
        }
    });

    return dateKeysObj
}

export default makeDateSection;