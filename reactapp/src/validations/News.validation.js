import * as yup from 'yup';

export const NewsValidationSchema = yup.object().shape({
    id: yup.number(),
    title: yup.string().required('Введите заголовок'),
    subTitle: yup.string().required('Введите подзаголовок'),
    text: yup.string().required('Введите текст'),
    img: yup.string().default("\\img\\News\\Default.jpg"),
    fileImg: yup.mixed().nullable(true),
});