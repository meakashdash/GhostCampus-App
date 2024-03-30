import { atom } from 'recoil';

export const tokenState = atom<string>({
    key: 'token',
    default: '',
});

export const userIdState = atom<string>({
    key: 'userIdState',
    default: "",
});