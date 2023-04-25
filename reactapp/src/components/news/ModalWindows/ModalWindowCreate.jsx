import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UpdateNews from "../UpdateNews.jsx";

import NewsService from "../../../services/News.service";
import { NewsValidationSchema } from "../../../validations/News.validation";

import { useTranslation } from "react-i18next";
import { Formik } from 'formik';

import React, { useState } from 'react';

export function ModalWindowCreate({ show, handleClose, onLoadNews }) {
    const { t } = useTranslation();
    const defaultNews = {
        id: 0,
        title: "",
        subTitle: "",
        text: "",
        img: "\\img\\News\\Default.jpg"
    }
    const [modelErrors, setModelErrors] = useState(null);

    const handleSubmit = (values) => {
        onCreateNews(values);
    }

    const onCreateNews = async (values) => {
        try {
            console.log(values);
            const form = new FormData();
            form.append("News.Title", values.title);
            form.append("News.SubTitle", values.subTitle);
            form.append("News.Text", values.text);
            form.append("News.Img", values.img);
            form.append("Img", values.fileImg);
            setModelErrors(null);

            await NewsService.httpPost(form);
            onLoadNews();
            handleClose();
        }
        catch (err) {
            setModelErrors(JSON.parse(`{${err.message.replace('Error', '"Error"')}}`).Error);
        }
    }

    return (
        <Modal size="xl" fullscreen="lg-down" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Formik
                validationSchema={NewsValidationSchema}
                onSubmit={handleSubmit}
                initialValues={{ ...defaultNews, fileImg: null }}>
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>{t("createNewsTitle")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <UpdateNews form={values} errors={errors} onChangeModel={handleChange} modelErrors={modelErrors} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                            <Button type="submit" variant="primary">Сохранить</Button>
                        </Modal.Footer>
                    </Form >
                )}
            </Formik>
        </Modal>
    );
}
