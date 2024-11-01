import {
    beingInOptinons,
    entryClassOptions,
    entryWillOptions,
    monthOptions,
    prefectureOptions,
    sexOptions,
    triggerOptions
} from "./options";
/**
 * 構成オブジェクトを保持します。
 */
const config = {
    languages: ['日本語 ', 'English'],
    status: {
        '5': '申込無効',
        '1': '課題提出待ち',
        '2': '課題提出済み',
        '3': '合否判定済み',
        '4': '入園手続き済み',
        '99': '入園辞退',
    },
    result_division: {
        '99': '未判定',
        '1': '合格',
        '2': '不合格',
    },
    tours_guardian_status: {
        '0': "お申込み",
        '1': "キャンセル待ち",
        '9': "キャンセル",
        '2': "参加済み",
        '3': "欠席",
    },
    examination_lanes: ["考査Aレーン", "考査Bレーン","考査Cレーン"],
    entry_form: {
        'guardian_name': {
            'label': 'Guardian Name',
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'guardian_name',
        },
        'guardian_name_kana': {
            'label': 'Guardian Name(Katakana)',
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'guardian_name_kana',
        },
        'child_name': {
            'label': "Child Name",
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'child_name',
        },
        'child_name_kana': {
            'label': "Child Name(Katakana)",
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'child_name_kana',
        },
        'child_name_alp': {
            'label': "Child Name(Alphabet)",
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'child_name_alp',
            'hiden': 'en'
        },
        'child_sex': {
            'label': "Child Gender",
            'must_flg': 1,
            'type': 'radio',
            'width': 4,
            'name': 'child_sex',
            'options': sexOptions,
            'option_translate_key': 'GenderOptions',
        },
        'child_birthday': {
            'label': "Child Birthday",
            'must_flg': 1,
            'type': 'date',
            'width': 3,
            'name': 'child_birthday',
        },
        'zipcode': {
            'label': 'Zipcode',
            'must_flg': 1,
            'type': 'zipcode',
            'prefecture': 'prefecture',
            'address': 'address',
            'width': 3,
            'name': 'zipcode',
        },
        'prefecture': {
            'label': 'Prefecture',
            'must_flg': 1,
            'type': 'select',
            'width': 3,
            'name': 'prefecture',
            'options': prefectureOptions,
            'option_translate_key': 'PrefectureOptions',
        },
        'address': {
            'label': 'Address',
            'must_flg': 1,
            'type': 'text',
            'width': 6,
            'name': 'address',
        },
        'building': {
            'label': 'Building',
            'type': 'text',
            'width': 6,
            'name': 'building',
        },
        'tel': {
            'label': 'Tel',
            'must_flg': 1,
            'type': 'text',
            'width': 3,
            'name': 'tel',
        },
        'email': {
            'label': 'E-Mail',
            'must_flg': 1,
            'type': 'text',
            'width': 4,
            'name': 'email',
        },
        'email_check': {
            'label': 'E-Mail(repeat)',
            'must_flg': 1,
            'type': 'text',
            'width': 4,
            'name': 'email_check',
        },
        'being_in': {
            'label': 'Being_in_the_garden',
            'must_flg': 1,
            'type': 'radio',
            'width': 4,
            'name': 'being_in',
            'options': beingInOptinons,
            'note': "being_in_note",
            'option_translate_key': 'BeingInOptinons',
        },
        'entry_class': {
            'label': 'Preferred Class',
            'must_flg': 1,
            'type': 'select',
            'options': entryClassOptions,
            'width': 3,
            'name': 'entry_class',
            'option_translate_key': 'EntryClassOptions',
        },
        'entry_year': {
            'label': 'Preferred Admission Year',
            'must_flg': 1,
            'type': 'number',
            'before_text': 'entry_year_before_text',
            'width': 4,
            'name': 'entry_year',
            'after_text': 'entry_year_after_text',
        },
        'entry_month': {
            'label': 'Preferred Admission Month',
            'must_flg': 1,
            'type': 'select',
            'options': monthOptions,
            'width': 3,
            'name': 'entry_month',
            'option_translate_key': 'MonthOptions',
        },
        'guardian_id': {
            'must_flg': 0,
            'type': 'hidden',
            'name': 'guardian_id',
        },
        'child_id': {
            'must_flg': 0,
            'type': 'hidden',
            'name': 'child_id',
        },
    },
    tour_form: {
        'tour_id': {
            'label': 'Tour Date',
            'must_flg': 1,
            'type': 'select',
            'width': 4,
            'name': 'tour_id',
            'note': 'tour_id_note',
            'option_translate_key': 'dynamic',
        },
        'guardian_name': {
            'label': 'Guardian Name',
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'guardian_name',
        },
        'guardian_name_kana': {
            'label': 'Guardian Name(Katakana)',
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'guardian_name_kana',
        },
        'child_name': {
            'label': "Child Name",
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'child_name',
        },
        'child_name_kana': {
            'label': "Child Name(Katakana)",
            'must_flg': 1,
            'type': 'name',
            'width': 4,
            'name': 'child_name_kana',
        },
        'child_sex': {
            'label': "Child Gender",
            'must_flg': 1,
            'type': 'radio',
            'width': 4,
            'name': 'child_sex',
            'options': sexOptions,
            'option_translate_key': 'GenderOptions',
        },
        'child_birthday': {
            'label': "Child Birthday",
            'must_flg': 1,
            'type': 'date',
            'width': 3,
            'name': 'child_birthday',
        },
        'zipcode': {
            'label': 'Zipcode',
            'must_flg': 1,
            'type': 'zipcode',
            'prefecture': 'prefecture',
            'address': 'address',
            'width': 3,
            'name': 'zipcode',
        },
        'prefecture': {
            'label': 'Prefecture',
            'must_flg': 1,
            'type': 'select',
            'width': 3,
            'name': 'prefecture',
            'options': prefectureOptions,
            'option_translate_key': 'PrefectureOptions',
        },
        'address': {
            'label': 'Address',
            'must_flg': 1,
            'type': 'text',
            'width': 6,
            'name': 'address',
        },
        'building': {
            'label': 'Building',
            'type': 'text',
            'width': 6,
            'name': 'building',
        },
        'tel': {
            'label': 'Tel',
            'must_flg': 1,
            'type': 'text',
            'width': 4,
            'name': 'tel',
        },
        'email': {
            'label': 'E-Mail',
            'must_flg': 1,
            'type': 'text',
            'width': 4,
            'name': 'email',
        },
        'email_check': {
            'label': 'E-Mail(repeat)',
            'must_flg': 1,
            'type': 'text',
            'width': 4,
            'name': 'email_check',
        },
        'password': {
            'label': 'Password',
            'must_flg': 1,
            'type': 'password',
            'width': 4,
            'name': 'password',
            'note': "password_note",
        },
        'being_in': {
            'label': 'Being_in_the_garden',
            'must_flg': 1,
            'type': 'radio',
            'width': 4,
            'name': 'being_in',
            'options': beingInOptinons,
            'note': 'being_in_note',
            'option_translate_key': 'BeingInOptinons',
        },
        'trigger': {
            'label': 'trigger',
            'must_flg': 1,
            'type': 'select',
            'width': 4,
            'name': 'trigger',
            'options': triggerOptions,
            'option_translate_key': 'TriggerOptions',
        },
        'trigger_other': {
            'label': '',
            'type': 'text',
            'width': 4,
            'before_text': 'trigger_other_before_text',
            'name': 'trigger_other',
        },
        'entry_will': {
            'label': 'entry_will',
            'must_flg': 1,
            'type': 'radio',
            'width': 4,
            'name': 'entry_will',
            'options': entryWillOptions,
            'option_translate_key': 'EntryWillOptions',
        },
        'entry_year': {
            'label': 'Preferred Admission Year',
            'must_flg': 1,
            'type': 'number',
            'before_text': 'entry_year_before_text',
            'width': 4,
            'name': 'entry_year',
            'after_text': 'entry_year_after_text',
        },
        'entry_month': {
            'label': 'Preferred Admission Month',
            'must_flg': 1,
            'type': 'select',
            'options': monthOptions,
            'width': 4,
            'name': 'entry_month',
            'option_translate_key': 'MonthOptions',
        },
        'other_kindy': {
            'label': 'other_kindy',
            'type': 'text',
            'width': 4,
            'note': 'other_kindy_note',
            'name': 'other_kindy',
        },
        'choice_reason': {
            'label': 'choice_reason',
            'type': 'textarea',
            'width': 6,
            'name': 'choice_reason',
        },
        'choice_reason_text': {
            'label': '',
            'type': 'html',
            'width': 9,
            'html': 'choice_reason_text_note',
            'name': 'choice_reason_text',
        },
        'note': {
            'label': 'tour_note',
            'type': 'textarea',
            'width': 6,
            'name': 'tour_note',
        },
    },
    exam_price: 6000,
}

export type TConfig = typeof config;


/**
  * 指定されたキーに基づいて、構成オブジェクトからネストされた値を取得します。
  *
  * @param {string} key - 値を取得するキーは、ピリオドで区切られたネストされたキーにすることができます。
  * @param {any} defaultValue - キーが構成オブジェクト内に見つからない場合に返されるデフォルト値。
  * @return {any} 指定されたキーに対応する値、またはキーが見つからない場合はdefaultValue。
  */
export const getConfig = (key: string, defaultValue?: any): any => {
    const keys = key.split('.');
    let value = config as any;
    for (const key of keys) {
        if (value[key]) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }
    return value;
}
/**
  * 提供されたキーに基づいて構成オブジェクトに値を設定します。
  *
  * @param {string} key - 構成オブジェクトに値を設定するキー。
  * @param {any} value - 構成オブジェクトに設定する値。
  */
export const setConfig = (key: string, value: any) => {
    const keys = key.split('.');
    let obj = config as any;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!obj[key]) {
            obj[key] = {};
        }
        obj = obj[key];
    }
    obj[keys[keys.length - 1]] = value;
}

export default config;