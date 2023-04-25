import NewsAdminTableItem from './NewsAdminTableItem';

import { ModalWindowCreate, ModalWindowEdit, ModalWindowDelete } from "./ModalWindows";

import TablePreloader from "../TablePreloader.jsx";

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import { useTranslation } from "react-i18next";
import React, { useState } from "react";

export default function NewsAdminTable({ news, loadData }) {
    const { t } = useTranslation();
    const [deleteIdShow, setDeleteId] = useState(null);
    const [updateIdShow, setUpdateId] = useState(null);
    const [editShow, setEditShow] = useState(false);
    const [createShow, setCreateShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const handleEditClose = () => {
        setUpdateId(null);
        setEditShow(false);
    };
    const handleCreateClose = () => {
        setCreateShow(false);
    };
    const handleDeleteClose = () => {
        setDeleteId(null)
        setDeleteShow(false);
    };

    const onClickEdit = (id) => {
        setUpdateId(id);
        setEditShow(true);
    }
    const onClickCreate = () => {
        setCreateShow(true);
    }
    const onClickDelete = (id) => {
        setDeleteId(id);
        setDeleteShow(true);
    }

    if (!news) {
        return <React.Suspense>
            <TablePreloader />
        </React.Suspense>
    }
    else{
        return <Card className="shadow">
            <ModalWindowDelete show={deleteShow} handleClose={handleDeleteClose} id={deleteIdShow} onLoadNews={loadData} />
            <ModalWindowEdit show={editShow} handleClose={handleEditClose} id={updateIdShow} onLoadNews={loadData} />
            <ModalWindowCreate show={createShow} handleClose={handleCreateClose} onLoadNews={loadData} />
            <Table responsive className="mb-0">
                <thead>
                    <tr>
                        <th width="20">№</th>
                        <th>{t("newsTitleTitle")}</th>
                        <th>{t("newsSubTitleTitle")}</th>
                        <th className="text-center" width="80">
                            <Button variant="empty" className="text-success p-0" onClick={() => onClickCreate()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle-fill suc" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </Button >
                        </th>
                    </tr>
                </thead>
                <tbody>{
                    news.map((item, index) =>
                        <NewsAdminTableItem key={item.title} index={index} news={item} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
                    )}
                </tbody>
            </Table>
        </Card>;
    }   
}