import React, { useState } from 'react';
import Slibar from './../slibar/Slibar'
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from 'axios';
import Header from "../Header/Header"
import './listuser.css';
const ListUser = () => {
    const [listdata, setListData] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [listRole, setListRole] = useState([{
        role: 'user'
    }, {
        role: 'admin'
    }])



    const [inputSearch, setInputSearch] = useState(null);

    const [form, setForm] = useState({
        email: '',
        password: '',
        role: 'user',
        active: 'true'
    })

    const [callApi, setCallApi] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const token = Cookies.get("cookielogin")
    const SaveUser = async () => {

        try {
            await axios.post('http://localhost:5000/user', form, { headers: { Authorization: `Bearer ${token}` } });
            setShow(false);
            setCallApi(!callApi)
            toast.success(" Thêm tài khoản thành công ");
        } catch (error) {
            return toast.error(error.response.data.error);
        }

        setShow(false)
    }

    const getAllUser = async () => {

        try {
            const res = await axios.get('http://localhost:5000/user', { headers: { Authorization: `Bearer ${token}` } });
            setListData(res.data)
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }



    React.useEffect(() => {
        getAllUser()
        return () => {
            getAllUser()
        };
    }, [callApi]);

 
    const getdatadevice = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setForm({ ...form, [name]: value });
    }


    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/user/${idDelete}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Xóa user thành công");
            setShowDelete(false)
            setCallApi(!callApi)
        } catch (error) {
            return toast.error(error.response.data.error);
        }
    }

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
            getAllUser()
        }
    }

    return (
        <div className="ListDeviceTT">
            <Slibar />
            <ToastContainer position="top-right" autoClose={3000} closeOnClick />
            <div className="main-content">
                <Header />
                <div className='form-header-component'>
                    <Button className='button-add' onClick={() => setShow(true)}>Thêm user</Button>
                    <div className='form-seach'>
                        <input type='text' className='input-search' placeholder='email' onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} />
                        <Button className='button-add' onClick={() => seachData()}>Seach</Button>
                    </div>
                </div>
                <div className="listdeviceCheck">
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Xóa user</th>
                        </tr>
                        {
                            listdata === null ? "Chưa có dữ liệu" : listdata.map((data1, index) => {
                                return (
                                    <tr key={data1?.id}>
                                        <td>{index}</td>
                                        <td>{data1?.email}</td>
                                        <td>{data1?.active}</td>
                                        <td><Button onClick={() => {
                                            setIdDelete(data1.id)
                                            setShowDelete(true)
                                        }}>Xóa</Button></td>

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
                        <Form.Label>Tài khoản email </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={getdatadevice}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicNamethietbi">
                        <Form.Label> Password </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={getdatadevice}
                        />
                    </Form.Group>

                    <label> Chọn Quyền Quản Trị </label>
                    <select name="role" onChange={getdatadevice} value={form.role}>
                        {/* <option value="0" disabled selected hidden>
                            Chọn Quyền Quản Trị
                        </option> */}
                        {listRole.map((item, index) => {
                            return (
                                <option value={item.role} key={index}>
                                    {item.role}
                                </option>
                            );
                        })}
                    </select>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={SaveUser}>
                        Save
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

export default ListUser;
