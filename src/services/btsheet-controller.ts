import { atom } from 'recoil';

interface btSheetTypes {
    width:number,
    height:number,
    bomb:number,
}

export const btSheetState = atom<btSheetTypes>({
    key: 'btSheetContent',
    default: {
        width:8,
        height:8,
        bomb:4,
    }
});

