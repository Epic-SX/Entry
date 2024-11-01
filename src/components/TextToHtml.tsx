import React, { FC } from 'react'
type Props = {
    text: string;
    element?: keyof JSX.IntrinsicElements;
    restProps?: any;
}
const TextToHtml: FC<Props> = ({ text, element, restProps }) => {
    if (!element) {
        return (
            <div dangerouslySetInnerHTML={{ __html: text }} />
        )
    } else {
        return React.createElement(
            element,
            { ...restProps },
            text)
    }
}

export default TextToHtml;