import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Admin() {
    const { t } = useTranslation();
    const { user: authUser } = useSelector(x => x.auth);

    return (
        <div>
            <h1 className="text-center">{t("greeting")} {authUser?.firstName}!</h1>
            <Link to="/Admin/News"><h3>{t("changeNewsLink")}</h3></Link>
        </div>
    );
}
