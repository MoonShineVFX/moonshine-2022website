import { atom } from 'recoil';

export const formDisplayState = atom({
  key: 'formDisplayState',
  default: false,
});


export const workState = atom({
  key: 'workState',
  default: null,
});

export const formStatusState = atom({
  key: 'formStatusState',
  default: null,
});

export const adminCategoryState = atom({
  key: 'adminCategoryState',
  default: null,
});