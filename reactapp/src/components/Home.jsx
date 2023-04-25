import NewsCard from './news/NewsCard';

import NewsService from "../services/News.service";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export default function Home() {
    const { t } = useTranslation();
    const [news, setNews] = useState([]);
    const loadData = async () => {
        var newsData = await NewsService.httpGet(0, 3);
        setNews(newsData);
    }

    useEffect(() => {
        loadData();
    }, []);

    if (news) {
        return (
            <div>
                <h1 className="text-center" >{t("homePageTitle")}</h1>
                <h3>{t("homeNewsTitle")}</h3>{
                    news.map((item) =>
                        <NewsCard key={item.title} news={item} />
                    )}
            </div>
        );
    }
}
