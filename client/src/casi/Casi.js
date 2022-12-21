import React, { useState } from 'react';
import Slibar from './../slibar/Slibar'
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import { PlusOutlined } from '@ant-design/icons';
import { Modal as ModalAntd, Upload } from 'antd';
import { UploadMuitiFie } from './../ApiUpload';

import axios from 'axios';
import Header from "../Header/Header"
import './../user/listuser.css';
const Casi = () => {
    const [listdata, setListData] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [idCategory, setidCategory] = useState(0);
    const [formSearch, setFormSearch] = useState({
        name: '',
        IdCategory: ''
    })

    const [editData, setEditData] = useState();
    const [idEdit, setIdEdit] = useState();
    const [showEdit, setShowEdit] = useState(false);

    const [form, setForm] = useState({
        name: '',
        IdCategory: '',
    });

    const [formCasi, setFormCasi] = useState({
        category: '',
        itemCategory: '',
        name: '',
        image: []
    });

    const onChangeFormCasi = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormCasi(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const [listCategory, setListCategory] = useState([]);

    const [callApi, setCallApi] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const token = Cookies.get("cookielogin")
    const SaveCategory = async () => {

        try {
            await axios.post('http://localhost:5000/item-category', form, { headers: { Authorization: `Bearer ${token}` } });
            setShow(false);
            setCallApi(!callApi)
            toast.success(" Thêm Nhóm Nhạc Thành Công");
        } catch (error) {
            return toast.error(error.response.data.error);
        }

        setShow(false)
    }

    const getAllItemCategory = async () => {
        if (idCategory === 0)
            return;

        try {
            const res = await axios.get(`http://localhost:5000/item-category/${idCategory}`, { headers: { Authorization: `Bearer ${token}` } });
            setListData(res.data[0]?.items)
            const item = res.data[0]?.items[1]?.id
            setFormCasi(prev => {
                return {
                    ...prev,
                    itemCategory: item,
                }
            });
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }

    React.useEffect(() => {
        getAllItemCategory()
        return () => {
            getAllItemCategory()
        };
    }, [callApi, idCategory]);

    const getdataCategory = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setForm({ ...form, [name]: value });
    }


    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/item-category/${idDelete}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Xóa Nhóm Nhạc thành công");
            setShowDelete(false)
            setCallApi(!callApi)
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }
    const inputSearch = '';

    const apiSeach = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/search/?email=${inputSearch}`, { headers: { Authorization: `Bearer ${token}` } });
            setListData(res.data)
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }
    const seachData = () => {
        if (inputSearch.length > 0) {
            apiSeach()
        } else {
            getAllItemCategory()
        }
    }

    const getAllCategory = async () => {

        try {
            const res = await axios.get('http://localhost:5000/category', { headers: { Authorization: `Bearer ${token}` } });
            setListCategory(res.data)
            setFormSearch(prev => ({
                ...prev,
                IdCategory: res.data[0].id
            }))
            setidCategory(res.data[0].id)
            setForm({ ...form, IdCategory: res.data[0].id });
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }

    React.useEffect(() => {
        getAllCategory()
        return () => {
            getAllCategory()
        };
    }, [callApi]);


    const formSearchA = (e) => {
        setFormSearch({ ...formSearch, IdCategory: e.target.value })
        setidCategory(e.target.value)
    }

    const EditItemCategory = async () => {
        try {
            await axios.put(`http://localhost:5000/item-category/${idEdit}`, { name: editData }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Sửa Nhóm Nhạc thành công");
            setShowEdit(false)
            setCallApi(!callApi)
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }


    // form upload

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async ({ fileList: newFileList }) => {
        console.log(11111111111, newFileList)
        // const data = await UploadMuitiFie([newFileList?.originFileObj]);
        setFormCasi(prev => ({
            ...prev,
            image: newFileList
        }))
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    )

    const SaveCasi = async () => {
        const data = await UploadMuitiFie(formCasi.image);
        const bodyData = {
            name: formCasi.name,
            image: formCasi.image,
            IdItemCategory: formCasi.itemCategory
        }
        const dataRes = await axios.post(`http://localhost:5000/casi`, bodyData, { headers: { Authorization: `Bearer ${token}` } });
        console.log(data)
    }
    return (
        <div className="ListDeviceTT">
            <Slibar />
            <ToastContainer position="top-right" autoClose={3000} closeOnClick />
            <div className="main-content">
                <Header />
                <div className='form-header-component'>
                    <Button className='button-add' onClick={() => setShow(true)}>Thêm nghe si</Button>
                    <div className='form-seach'>
                        <select name="category" onChange={formSearchA} className='input-search'>
                            {listCategory?.map((item, index) => {
                                return (
                                    <option value={item.id} key={index} >
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>


                        <select name="item-category" onChange={formSearchA} className='input-search'>
                            {listdata?.map((item, index) => {
                                return (
                                    <option value={item.id} key={index} >
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>

                        <Button className='button-add' onClick={() => seachData()}>Seach</Button>
                    </div>
                </div>
                <div className="listdeviceCheck">
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>Ca sĩ</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                            <th>Bài hát của ca sĩ</th>
                        </tr>
                        {
                            listdata === null ? "Chưa có dữ liệu" : listdata?.map((data1, index) => {
                                return (
                                    <tr key={data1?.id}>
                                        <td>{index}</td>
                                        <td>{data1?.name}</td>
                                        <td><Button onClick={() => {
                                            setIdEdit(data1.id)
                                            setEditData(data1.name)
                                            setShowEdit(true)
                                        }}>Sửa</Button></td>

                                        <td><Button onClick={() => {
                                            setIdDelete(data1.id)
                                            setShowDelete(true)
                                        }}>Xóa</Button></td>

                                        <td><Button onClick={() => {
                                            setIdDelete(data1.id)
                                            setShowDelete(true)
                                        }}>Xem</Button></td>

                                    </tr>


                                )
                            })
                        }


                    </table>
                </div>
            </div>

            {/* model add */}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Thêm tài khoản </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicNamethietbi">
                        <label> Chọn  Thể Loại Nhạc Sĩ </label>
                        <select name="category" onChange={onChangeFormCasi} value={formCasi.category}>
                            {listCategory.map((item, index) => {
                                return (
                                    <option value={item.id} key={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>

                        <label> Chọn  Thể Loại Nhạc Sĩ </label>
                        <select name="itemCategory" onChange={onChangeFormCasi} value={formCasi.itemCategory}>
                            {listdata?.map((item, index) => {
                                return (
                                    <option value={item.id} key={index} >
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>

                        <label htmlFor="">Anh ca si </label>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={formCasi.image}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {(formCasi.image).length >= 1 ? null : uploadButton}
                        </Upload>
                        <label htmlFor="">Ten ca si </label>
                        <br />
                        <input placeholder='Ten ca si' className='input-name' name='name' onChange={onChangeFormCasi} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={SaveCasi}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* EDit */}

            <Modal show={showEdit} onHide={() => setShowEdit(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit nhóm nhạc </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicNamethietbi">
                        <Form.Label>Sửa Nhóm Nhạc </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            name="name"
                            value={editData}
                            onChange={(e) => setEditData(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={EditItemCategory}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* delete */}
            <Modal
                show={showDelete}
                onHide={() => setShowDelete(false)}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Bạn có chắc muốn xóa </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteUser}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Casi;
