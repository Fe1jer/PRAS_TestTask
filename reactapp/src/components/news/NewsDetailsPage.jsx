
import NewsService from "../../services/News.service";

import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function NewsDetailsPage() {
    const params = useParams();
    const id = params.id;

    const [news, setNews] = useState(null);

    const getNews = async () => {
        const newsData = await NewsService.httpGetById(id);
        setNews(newsData);
    }

    React.useEffect(() => {
        getNews();
    }, []);

    if (!news) {
        return null;
    }
    else {
        return <React.Suspense>
            <h1 className="text-center">{news.title}</h1>
            <h3 className="text-center">{news.subTitle}</h3>
            <div className="row">
                <div className="w-100 text-center">
                    <img height={350} width="75%" style={{ objectFit: "cover" }} src={news.img} alt={news.img} />
                </div>
                <p className="mt-3">{news.text}</p>
            </div>
        </React.Suspense>;
    }
}