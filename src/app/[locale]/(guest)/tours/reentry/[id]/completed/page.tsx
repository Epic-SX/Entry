import { NavigationLink, Translation } from '@/components';
import React, { FC } from 'react';

type Props = {
  searchParams: {
    type: string;
    key_transaltion: string;
  }
}

const validKey = ['tours_reentry_success', 'tours_reentry_full'];
const validType = ['success', 'warning'];

const TourRentryCompleted: FC<Props> = ({ searchParams: { type, key_transaltion } }) => {
  const invalidAccess = !type || !key_transaltion || !validKey.includes(key_transaltion) || !validType.includes(type);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 pt-4">
          <div className="card text-center">
            <div className="card-body">
              {
                invalidAccess
                  ? (
                    <div className="alert alert-warning">
                      <Translation
                        translationKey='ErrorMessage'
                        render={t => <>{t('invalid_page')}</>}
                      />
                    </div>
                  )
                  : (<>
                    <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-warning'}`} role="alert">
                      <Translation
                        translationKey='Pages.tours.reentry'
                        render={t => <>{t(key_transaltion)}</>}
                      />
                    </div>
                  </>)
                }
                <NavigationLink href="https://www.yamata-youchien.com/" className="btn btn-success">
                  <Translation
                      translationKey='ButtonTitle'
                      render={t => <>{t('return_to_site_btn')}</>}
                  />
                </NavigationLink>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourRentryCompleted;