/* eslint-disable no-useless-escape */
/* eslint-disable no-irregular-whitespace */
export const zenkaku_kana_regex = /^[ァ-ヶー　]+$/;
export const email_regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const zipcode_regex = /^\d{3}-\d{4}$/;
export const year_regex = /^\d{4}$/;
export const tel_regex = /^0\d*-\d*-\d*$/;
export const alpha_ex_regex = /^[a-zA-Z]*$/;
export const address_regex = /\d+$/;
export const date_regex = /^\d{4}\/\d{2}\/\d{2}$/;