'use client';
import { FC } from 'react';
import { getEntrySchema } from '@/schemas';
import { z } from 'zod';
import { Translation } from '@/components';
import { useLocale } from 'next-intl';
import { JP_LOCALE } from '@/constants';

type EntryFormFields = z.infer<ReturnType<typeof getEntrySchema>>;

type Props = {
  data: EntryFormFields;
};

const FormConfirm: FC<Props> = ({ data }) => {
  const locale = useLocale();
  const getFieldValue = (
    fieldName: keyof EntryFormFields,
  ): string | undefined =>
    fieldName in data ? (data[fieldName] as string) : undefined;
  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="row">
            <div className="fw-bold col-md-3">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('guardian_name')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.last_guardian_name}</span>{' '}
              <span className="text-muted">{data.first_guardian_name}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="fw-bold col-md-3">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('guardian_name_kana')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.last_guardian_name_kana}</span>{' '}
              <span className="text-muted">
                {data.first_guardian_name_kana}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="fw-bold col-md-3">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_name')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.last_child_name}</span>{' '}
              <span className="text-muted">{data.first_child_name}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="fw-bold col-md-3">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_name_kana')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.last_child_name_kana}</span>{' '}
              <span className="text-muted">{data.first_child_name_kana}</span>
            </div>
          </div>
        </li>
        {locale === JP_LOCALE && (
          <li className="list-group-item">
            <div className="row">
              <div className="fw-bold col-md-3">
                <Translation
                  translationKey="FormTitle"
                  render={(t) => <>{t('child_name_alp')}</>}
                />
              </div>
              <div className="col-md-9">
                <span className="text-muted">
                  {getFieldValue('last_child_name_alp' as any)}
                </span>{' '}
                <span className="text-muted">
                  {getFieldValue('first_child_name_alp' as any)}
                </span>
              </div>
            </div>
          </li>
        )}
        <li className="list-group-item">
          <div className="row">
            <div className="fw-bold col-md-3">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_sex')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">
                <Translation
                  translationKey={'GenderOptions'}
                  render={(t) => t(data.child_sex)}
                />
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_birthday')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.child_birthday}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('zipcode')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.zipcode}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('prefecture')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">
                <Translation
                  translationKey="PrefectureOptions"
                  render={(t) => t(data.prefecture)}
                />
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('address')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.address}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('building')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.building}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('tel')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.tel}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('email')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">{data.email}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('being_in')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">
                <Translation
                  translationKey={'BeingInOptinons'}
                  render={(t) => t(data.being_in)}
                />
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('entry_class')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">
                {data.entry_class_sub && (data.entry_class === '3') ? (
                  <>
                   <Translation
                    translationKey="EntryClassOptions"
                    render={(t) => t(data.entry_class)}
                  />{" "}
                  <Translation
                    translationKey="EntryClassOptionsMap"
                    render={(t) => t(data.entry_class_sub)}
                  />
                  </>
                ) : (
                  <Translation
                    translationKey="EntryClassOptions"
                    render={(t) => t(data.entry_class)}
                  />
                )}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('entry_year')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">
                {data.entry_year}{' '}
                <Translation
                  translationKey="FormTitle"
                  render={(t) => <>{t('entry_year_after_text')}</>}
                />
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-3 fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('entry_month')}</>}
              />
            </div>
            <div className="col-md-9">
              <span className="text-muted">
                <Translation
                  translationKey="MonthOptions"
                  render={(t) => t(data.entry_month)}
                />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FormConfirm;
