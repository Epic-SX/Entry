import Translation from "@/components/Translation";
import { BaseProps } from ".";
import { FC } from "react";

type HtmlTextProps = Pick<BaseProps<any, any>, 'config'>;
const HtmlText: FC<HtmlTextProps> = ({ config }) => {
    return (
        <div>
            <small className="text-secondary">
                <Translation translationKey="FormTitle" render={t => <>{t(config['html'])}</>}/>
            </small>
        </div>
    );
}

export default HtmlText;