import NewsCard from './NewsCard';

import NewsService from "../../services/News.service";

import Button from 'react-bootstrap/Button';

import { useTranslation } from "react-i18next";
import React, { useState } from 'react';

export default function NewsPage() {
    const { t } = useTranslation();
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageLimit, setPageLimit] = React.useState(2);
    const [loading, setLoading] = React.useState(true);
    const [canAddNews, setCanAddNews] = React.useState(true);

    const loadData = async () => {
        var newsData = await NewsService.httpGet(currentPage, pageLimit);
        if (newsData.length < pageLimit) {
            setCanAddNews(false);
        }
        var allNews = news.concat(newsData);
        setNews(allNews);
        setLoading(false);
    }

    const onClickAdd = () => {
        setCurrentPage(currentPage + 1 * pageLimit);
    }

    React.useEffect(() => {
        loadData();
    }, [currentPage])

    if (loading) {
        return (
            <div className="">
            </div>
        );
    }
    else {
        return (
            <React.Suspense>
                <h1>{t("newsPageTitle")}</h1>{
                news.map((item) =>
                    <NewsCard key={item.title} news={item} />
                )}
                {canAddNews ? <Button variant="primary" onClick={() => onClickAdd()}>{t("loading")}</Button> : null}
            </React.Suspense>
        );
    }
}