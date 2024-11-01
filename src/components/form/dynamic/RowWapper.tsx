import Translation from "@/components/Translation";
import { FC, ReactNode } from "react";

type RowWapperProps<C = any> = {
    children: ReactNode;
    config?: C;
}

const RowWapper: FC<RowWapperProps> = ({ config, children }) => {
    return (
        <div className="row align-items-center">
            {children}
            <div className="col-md">
                {(config && config['note'])
                    && (
                        <small className="text-secondary">
                            <Translation translationKey="FormTitle" render={t => <>{t(config['note'])}</>} />
                        </small>
                    )}
            </div>
        </div>
    );
}

export default RowWapper;