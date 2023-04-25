import React from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

import { Field } from 'formik';
import { useTranslation } from "react-i18next";

export default function UpdateNews({ form, modelErrors, errors, onChangeModel }) {
    const { t } = useTranslation();
    const textRef = React.useRef();
    const [preview, setPreview] = React.useState(form.img);

    const showPreview = (e, form) => {
        const reader = new FileReader();
        reader.onload = x => {
            setPreview(x.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        form.setFieldValue("fileImg", e.currentTarget.files[0]);
    };
    const _formGroupErrors = (errors) => {
        if (errors) {
            return (<React.Suspense>{
                errors.map((error) =>
                    <React.Suspense key={error}><span>{error}</span><br></br></React.Suspense>
                )}
            </React.Suspense>);
        }
    }

    React.useEffect(() => {
        if (textRef && textRef.current) {
            textRef.current.style.height = "0px";
            const taHeight = textRef.current.scrollHeight;
            textRef.current.style.height = taHeight + "px";
        }
    }, [form]);

    return (
        <React.Suspense>
            <Form.Group style={{ textAlign: "-webkit-center" }}>
                <Form.Control className="p-0 d-none" plaintext readOnly isInvalid={modelErrors ? !!modelErrors : false} />
                <Form.Control.Feedback type="invalid">{modelErrors ? _formGroupErrors(modelErrors) : ""}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group style={{ textAlign: "-webkit-center" }}>
                <Image className="scale card-image m-0 text-center" src={preview} style={{ objectFit: "cover", width: 290 }}></Image>
                <Field name="fileImg">
                {({ form }) => (
                    <Form.Control name="fileImg" type="file" accept=".jpg, .jpeg, .png" style={{ width: 290 }}
                        onChange={e => showPreview(e, form)}
                        isInvalid={!!errors.fileImg} />
                )}
                </Field>
                <Form.Control.Feedback className="m-0" type="invalid">{errors.img}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="pt-3">
                <Form.Label className="mb-0">{t("newsTitleTitle")}</Form.Label><sup>*</sup>
                <Form.Control type="text" name="title"
                    value={form.title ?? ""}
                    onChange={onChangeModel}
                    isInvalid={!!errors.title} />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="pt-3">
                <Form.Label className="mb-0">{t("newsSubTitleTitle")}</Form.Label><sup>*</sup>
                <Form.Control type="text" name="subTitle"
                    value={form.subTitle ?? ""}
                    onChange={onChangeModel}
                    isInvalid={!!errors.subTitle} />
                <Form.Control.Feedback type="invalid">{errors.subTitle}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="pt-3">
                <Form.Label className="mb-0">{t("newsTextTitle")}</Form.Label><sup>*</sup>
                <Form.Control ref={textRef} as="textarea" type="text" name="text"
                    value={form.text ?? ""}
                    onChange={onChangeModel}
                    isInvalid={!!errors.text} />
                <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
            </Form.Group>
        </React.Suspense>
    );
}