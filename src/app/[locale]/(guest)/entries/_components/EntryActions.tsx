import { Translation } from "@/components";
import { FC } from "react";

const EntryActions: FC = () => {
    return (
        <div className="text-center pt-4">
            <button
                className="btn btn-success"
                type='submit'>
                <Translation translationKey="ButtonTitle" render={t => <>{t('go_to_confirmation_screen_btn')}</>} />
            </button>
        </div>
    );
}
export default EntryActions;