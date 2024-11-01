import Link from 'next/link';
import React from 'react';
import Translation from '../Translation';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h6 className="text-white text-center pt-2">
          <Translation
            translationKey='HeaderTitle'
            render={(t) => <>{t('title')}</>}
          />
          <span className="ms-2">
            copyright(c) 2020-2024
          </span>
        </h6>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-end">
              <Link target='commerce_law' href="https://www.yamata-youchien.com/commerce_law/">
                <small>
                  <Translation
                    translationKey='FooterDescription'
                    render={(t) => <>{t('commerce_low')}</>}
                  />
                </small>
              </Link>
            </div>
            <div className="col-md-12 text-end">
              <Link className="me-2" target='procareer' href="https://procareer.co.jp/">
                <small>
                  <Translation
                    translationKey='FooterDescription'
                    render={(t) => <>{t('procari_co_ltd')}</>}
                  />
                </small>
              </Link>
              <Link target='procareer' href="https://kuriharagakuen.ac.jp/privacy/">
                <small>
                  [ <Translation
                    translationKey='FooterDescription'
                    render={(t) => <>{t('privacy_policy')}</>}
                  />]
                </small>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
