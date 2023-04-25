import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import NewsService from "../../../services/News.service";

import { useTranslation } from "react-i18next";
import React, { useState } from 'react';

export function ModalWindowDelete({ show, handleClose, id, onLoadNews }) {
    const { t } = useTranslation();
    const [news, setNews] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onDeleteNews(id);
    }
    const onDeleteNews = async (id) => {
        await NewsService.httpDelete(id);
        handleClose();
        onLoadNews();
    }
    const getNews = async () => {
        const newsData = await NewsService.httpGetById(id);
        setNews(newsData);
    }

    React.useEffect(() => {
        if (id) {
            getNews();
        }
        else {
            setNews(null);
        }
    }, [id]);

    if (!news) {
        return (
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("deleteNewsTitle")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {t("loading")}...
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                    <Button variant="outline-danger">Удалить</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else {
        return (
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t("deleteNewsTitle")} <b className="text-success">{news.title}</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {t("deletionConfirmation")} {t("newsLink")}?
                            <br />
                            {t("newsLink")} <b className="text-success">"{news.title}"</b> {t("deletionConsent")}.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                        <Button type="submit" variant="outline-danger">Удалить</Button>
                    </Modal.Footer>
                </Form >
            </Modal>
        );
    }
}
