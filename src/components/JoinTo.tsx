import React, { FC, Fragment } from 'react';

type Props = {
    delimiter?: string;
    values: string[];
    element?: keyof JSX.IntrinsicElements;
    classNameElement?: string;
}

const JoinTo: FC<Props> = ({ delimiter, values, element, classNameElement }) => {

    if (delimiter) {
        return (
            <React.Fragment>
                {values.map((item, index) => {
                    if (element) {
                        return React.createElement(
                            element,
                            { key: index, className: classNameElement },
                            item ?? '' + (index < values.length - 1 ? delimiter : '')
                        );
                    } else {
                        return <Fragment key={index}>{item ?? ''}{index < values.length - 1 ? delimiter : ''}</Fragment>
                    }
                })}
            </React.Fragment>
        );
    } else {
        return (
            <Fragment>
                {values.map((item, index) => {
                    if (!item || item.includes('undefined')) {
                        return <Fragment key={index}>{''}</Fragment>
                    }
                    if (element) {
                        return React.createElement(
                            element,
                            { key: index, className: classNameElement },
                            item ?? '' + (index < values.length - 1 ? ' ' : '')
                        );
                    } else {
                        return <Fragment key={index}>{item ?? ''}{index < values.length - 1 ? ' ' : ''}</Fragment>
                    }
                })}
            </Fragment>
        );
    }
}

export default JoinTo;