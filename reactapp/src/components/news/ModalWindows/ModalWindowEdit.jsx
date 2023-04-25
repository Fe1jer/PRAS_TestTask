import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UpdateFaculty from "../UpdateNews.jsx";

import NewsService from "../../../services/News.service";
import { NewsValidationSchema } from "../../../validations/News.validation";

import { useTranslation } from "react-i18next";
import { Formik } from 'formik';

import React, { useState } from 'react';

export function ModalWindowEdit({ show, handleClose, onLoadNews, id }) {
    const { t } = useTranslation();
    const [newsTitle, setNewsTitle] = useState(null);
    const [updatedNews, setUpdatedNews] = useState(null);
    const [modelErrors, setModelErrors] = useState();

    const handleSubmit = (values) => {
        onEditNews(values);
    }

    const onEditNews = async (values) => {
        try {
            const form = new FormData();
            form.append("News.Id", values.id);
            form.append("News.Title", values.title);
            form.append("News.SubTitle", values.subTitle);
            form.append("News.Text", values.text);
            form.append("News.Img", values.img);
            form.append("Img", values.fileImg);
            setModelErrors(null);

            await NewsService.httpPut(id, form);
            onLoadNews();
            handleClose();
        }
        catch (err) {
            setModelErrors(JSON.parse(`{${err.message.replace('Error', '"Error"')}}`).Error);
        }
    }
    const getNews = async () => {
        const newsData = await NewsService.httpGetById(id);
        setUpdatedNews(newsData);
        setNewsTitle(newsData.title);
    }
    const onClose = () => {
        setModelErrors(null);
        handleClose();
    }

    React.useEffect(() => {
        if (id) {
            getNews();
        }
        else {
            setUpdatedNews(null);
        }
    }, [id]);

    if (!updatedNews) {
        return (
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("editNewsTitle")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {t("loading")}...
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                    <Button variant="primary">Сохранить</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else {
        return (
            <Modal size="xl" fullscreen="lg-down" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Formik
                    validationSchema={NewsValidationSchema}
                    onSubmit={handleSubmit}
                    initialValues={{ ...updatedNews, fileImg: null }}>
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>{t("editNewsTitle")} <b className="text-success">"{newsTitle}"</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <UpdateFaculty form={values} errors={errors} onChangeModel={handleChange} modelErrors={modelErrors} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={onClose}>Закрыть</Button>
                                <Button type="submit" variant="primary">Сохранить</Button>
                            </Modal.Footer>
                        </Form >
                    )}
                </Formik>
            </Modal>
        );
    }
}
