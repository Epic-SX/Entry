'use client';
import React, { FC, useState } from 'react';
import { HttpService } from '@/services';

interface StatusSendmail {
  [key: string]: string;
}

interface HandleFunction {
  [key: string]: () => Promise<any>;
}

interface InfoMail {
  mail_subject?: string;
  mail_body?: string;
}

interface ButtonProps {
  sendMail: string;
}

const SendMailTest: FC = () => {
  const [status, setStatus] = useState<StatusSendmail>({});
  const [mailTo, setMailTo] = useState<string>('');
  const btn: ButtonProps = {
    sendMail: 'Send Mail',
  };

  /**
   * Set comment info mail
   */
  const getMailInfo = (): InfoMail => {
    const mailInfo: InfoMail = {};

    if (process.env.NEXT_PUBLIC_MAIL_TEST_SUBJECT) {
      mailInfo.mail_subject = process.env.NEXT_PUBLIC_MAIL_TEST_SUBJECT;
    }

    if (process.env.NEXT_PUBLIC_MAIL_TEST_BODY) {
      mailInfo.mail_body = process.env.NEXT_PUBLIC_MAIL_TEST_BODY;
    }

    return mailInfo;
  };

  const handleFunction: HandleFunction = {
    sendMail: async (): Promise<any> => {
      const payload = {
        ...getMailInfo(),
        mail_to: mailTo,
      };

      return await HttpService.post('/test/e2e/send-mail1', payload);
    },
  };

  /**
   * Process send mail test to server
   * @param btnKey
   * @param event
   */
  const onSendMailTest = async (btnKey: keyof StatusSendmail, event: React.MouseEvent<HTMLButtonElement>): Promise<any> => {
    event.preventDefault();

    setStatus((prevState) => ({ ...prevState, [btnKey]: 'sending' }));

    return await handleFunction[btnKey as keyof HandleFunction]()
      .then((res) => {
        const status = res?.status || '';
        if (status === 'success') {
          setStatus((prevState) => ({ ...prevState, [btnKey]: 'success' }));
        } else {
          setStatus((prevState) => ({ ...prevState, [btnKey]: 'failed' }));
        }
      }).catch((e) => {
        setStatus((prevState) => ({ ...prevState, [btnKey]: 'failed' }));
      });
  };

  return <>
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6 col-xs-12 offset-md-3">
          <div className="card">
            <div className="card-header">
              Form send mail
            </div>
            <div className="card-body">
              <form className="form-inline">
                <div className="form-group">
                  <input type="text" className="form-control" name="email" value={mailTo}
                         onChange={(e) => setMailTo(e.target.value)} />
                  {status['sendMail'] && status['sendMail'] !== 'sending' ? (
                    <div id={`send-status`} className="text-primary">{status['sendMail']}</div>) : (<></>)}
                </div>
                <div className="form-group mt-2">
                  <button className="btn btn-primary" disabled={status['sendMail'] === 'sending'}
                          onClick={(e) => onSendMailTest('sendMail', e)}>
                    {btn.sendMail}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default SendMailTest;