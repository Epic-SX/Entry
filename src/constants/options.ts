export interface Option {
  value: string;
  label: string;
}
export const monthOptions: Option[] = [
  { value: '1', label: 'January' },
  { value: '2', label: 'Fabruary' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];
export const triggerOptions: Option[] = [
  { value: '1', label: 'google' },
  { value: '2', label: 'yahoo' },
  { value: '3', label: 'vitamin' },
  { value: '4', label: 'beeno' },
  { value: '6', label: 'ward-office' },
  { value: '7', label: 'see-bus' },
  { value: '8', label: 'from-friend' },
  { value: '9', label: 'from-child' },
  { value: '10', label: 'train-vision' },
  { value: '11', label: 'train-announce' },
  { value: '12', label: 'station-ad' },
  { value: '14', label: 'digital-signage' },
  { value: '13', label: 'trigger-other' },
];
export const prefectureOptions: Option[] = [
  { value: '1', label: '北海道' },
  { value: '2', label: '青森県' },
  { value: '3', label: '岩手県' },
  { value: '4', label: '宮城県' },
  { value: '5', label: '秋田県' },
  { value: '6', label: '山形県' },
  { value: '7', label: '福島県' },
  { value: '8', label: '茨城県' },
  { value: '9', label: '栃木県' },
  { value: '10', label: '群馬県' },
  { value: '11', label: '埼玉県' },
  { value: '12', label: '千葉県' },
  { value: '13', label: '東京都' },
  { value: '14', label: '神奈川県' },
  { value: '15', label: '新潟県' },
  { value: '16', label: '富山県' },
  { value: '17', label: '石川県' },
  { value: '18', label: '福井県' },
  { value: '19', label: '山梨県' },
  { value: '20', label: '長野県' },
  { value: '21', label: '岐阜県' },
  { value: '22', label: '静岡県' },
  { value: '23', label: '愛知県' },
  { value: '24', label: '三重県' },
  { value: '25', label: '滋賀県' },
  { value: '26', label: '京都府' },
  { value: '27', label: '大阪府' },
  { value: '28', label: '兵庫県' },
  { value: '29', label: '奈良県' },
  { value: '30', label: '和歌山県' },
  { value: '31', label: '鳥取県' },
  { value: '32', label: '島根県' },
  { value: '33', label: '岡山県' },
  { value: '34', label: '広島県' },
  { value: '35', label: '山口県' },
  { value: '36', label: '徳島県' },
  { value: '37', label: '香川県' },
  { value: '38', label: '愛媛県' },
  { value: '39', label: '高知県' },
  { value: '40', label: '福岡県' },
  { value: '41', label: '佐賀県' },
  { value: '42', label: '長崎県' },
  { value: '43', label: '熊本県' },
  { value: '44', label: '大分県' },
  { value: '45', label: '宮崎県' },
  { value: '46', label: '鹿児島県' },
  { value: '47', label: '沖縄県' },
];
export const sexOptions: Option[] = [
  { value: '1', label: 'male' },
  { value: '2', label: 'female' },
];
export const beingInOptinons = [
  { value: '0', label: 'not_being_in' },
  { value: '2', label: 'being_in' },
  { value: '3', label: 'graduated' },
];
export const entryWillOptions: Option[] = [
  { value: '1', label: 'willing' },
  { value: '2', label: 'considering' },
];
export const entryClassOptions = [
  { value: '2', label: 'Mebae' },
  { value: '3', label: 'Futaba' },
  { value: '1', label: 'Younger' },
  //{ value: '4', label: 'Pre-Futaba' },
  { value: '99', label: 'other' },
];
export const futabaClassOptions = [
  { value: '4', label: 'Pre' },
  { value: '5', label: 'A Class' },
  { value: '6', label: 'B Class' },
  { value: '7', label: 'C Class' },
];

export const entryClassOptionsMap: Record<string, Option[]> = {
  '1': [],
  '2': [],
  '3': futabaClassOptions,
  '4': [],
  '99': [],
};

export const statusOptions: Option[] = [
  {
    value: '3',
    label: '合否判定済み',
  },
  {
    value: '4',
    label: '入園手続き済み',
  },
  {
    value: '99',
    label: '入園辞退',
  },
];
