import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";

import "../../css/news.css"

export default function NewsCard({ news }) {
    const { t } = useTranslation();
    const splitedNewsImg = news.img.split('.');
    const img_300x170 = splitedNewsImg.slice(0, -1).join('.') + "_300x170." + splitedNewsImg[splitedNewsImg.length - 1];

    return (
        <div className="card__news mb-4">
            <div className="card-img__news">
                <Link className="img" to={"/News/" + news.id}>
                    <img src={news.img} loading="lazy" alt={img_300x170} sizes="" />
                </Link>
            </div>
            <div className="card-body__news">
                <div className="box-news card-header__news">
                    <div className="">
                        <Link to={"/News/" + news.id}>
                            <h4 className="card-title text-dark" style={{ lineHeight: "22px" }}>{news.title}</h4>
                        </Link>
                        <p className="text-header__news">{news.subTitle}</p>
                    </div>
                </div>
                <div className="card-footer__news">
                    <Link to={"/News/" + news.id}>{t("more")}</Link>
                </div>
            </div>
        </div >
    );
}