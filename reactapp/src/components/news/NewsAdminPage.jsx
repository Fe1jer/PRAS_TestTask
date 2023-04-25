import NewsAdminTable from './NewsAdminTable';

import NewsService from "../../services/News.service";

import { useTranslation } from "react-i18next";
import React, { useState } from 'react';

export default function NewsAdminPage() {
    const { t } = useTranslation();
    const [news, setNews] = useState(null);

    const loadData = async () => {
        var newsData = await NewsService.httpGet(0, 0);
        setNews(newsData);
    }

    React.useEffect(() => {
        loadData();
    }, [])

    return (
        <React.Suspense>
            <h1>{t("newsPageTitle")}</h1>
            <NewsAdminTable news={news} loadData={loadData} />
        </React.Suspense>
    );
}