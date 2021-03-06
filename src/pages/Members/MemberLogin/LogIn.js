import React, { useState } from 'react';
import Modal from './Modal';
import { Link, Navigate } from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/auth';
import { API_URL } from '../../../utils/config';
import { ERR_MSG } from '../../../utils/error';
import Swal from 'sweetalert2';
import './memberLogin.scss';
// import GoogleLoginFunwave from './GoogleLoginFunwave';

function Login() {
  const { auth, setAuth } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [close, setClose] = useState('fas fa-eye-slash');
  const [type, setType] = useState('password');
  const [showModal, setshowModal] = useState(false);
  // 切換彈窗
  const openSignUp = () => {
    setshowModal((prev) => !prev);
  };
  const [member, setMember] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  async function logInSubmit(e) {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/auth/login`, member, {
        withCredentials: true, //跨源存取cookie
      });
      console.log('登入時傳送資料:', response.data);

      //token存到localStorage
      // localStorage.setItem('token', 'Bearer ' + response.data.token);

      setAuth(response.data.data); // 把登入後 member 資料存回 context 讓其他地方可以用,auth.js line:115
      setIsLogin(true);
      setMember({ ...member, email: '', password: '' });
      // jwtVerity();
    } catch (e) {
      if (e.response) {
        console.error('測試登入', ERR_MSG[e.response.data.code]);
        setMember({ ...member, email: '', password: '' });
        Swal.fire(`${e.response.data.msg}\n請重新登入`);
      } else {
        console.error(e);
        Swal.fire(`伺服器錯誤`);
      }
    }
  }
  // async function jwtVerity() {
  //   //jwt驗證 送api
  //   try {
  //     let response = await axios.post(
  //       `${API_URL}/auth/jwt-verify`,
  //       {},
  //       {
  //         headers: {
  //           // 'Content-Type': 'application/json',
  //           Authorization: localStorage.getItem('token'),
  //         },
  //       }
  //     );
  //     console.log('jwt驗證', response);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  console.log('登入後auth', auth);
  if (auth) {
    localStorage.setItem('name', auth.member_name);
    localStorage.setItem('member_photo', auth.member_photo);
  }
  if (isLogin) {
    // 轉頁效果
    return <Navigate to="/home" />;
  }
  return (
    <>
      <div className="container-fluid wrapLogin">
        <div className="row gx-0">
          <div className="col-md-7 col-sm-12 p-0 leftSignUp">
            <div className="demo vh-100 d-flex justify-content-center align-items-center">
              <div>
                <h3 className="text-white fw-bold text-center mb-3">
                  加入FUNWAVE會員
                </h3>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary text-white fw-bold signupBtn"
                    onClick={openSignUp}
                  >
                    快速註冊
                  </button>
                </div>
                <div className="text-white fw-bold text-center mt-5">
                  這裡有一群熱情的浪友們，加入FUNWAVE會員，
                  <br />
                  跟我們一起FUN，一起浪！
                </div>
              </div>
            </div>
          </div>
          <Form
            className="col-md-5 col-sm-12 vh-100 d-flex align-items-center justify-content-center"
            onSubmit={logInSubmit}
          >
            <ul className="list-unstyled">
              <li className="d-flex justify-content-center">
                <div className="fs-2 loginTitle">登入會員</div>
              </li>
              <li className="mt-3">
                <label className="fw-bold">電子信箱</label>
                <Form.Control
                  className="form-control mt-1"
                  type="email"
                  name="email"
                  id="email"
                  value={member.email}
                  onChange={handleChange}
                  required
                />
              </li>
              <li className="mt-3">
                <label className="fw-bold">密碼</label>
                <Form.Control
                  className="form-control mt-1"
                  type={type}
                  name="password"
                  id="password"
                  value={member.password}
                  onChange={handleChange}
                  min="3"
                  required
                />
                <i
                  className={`loginEye mt-2 mt-md-3 ml-2 ${close}`}
                  onClick={() => {
                    if (type === 'password') {
                      setType('text');
                      setClose('fas fa-eye');
                    } else {
                      setType('password');
                      setClose('fas fa-eye-slash');
                    }
                  }}
                ></i>

                <div className="d-flex justify-content-between mt-1">
                  <Link to="/" className="forgetPassword mt-2">
                    忘記密碼?
                  </Link>
                  <div>
                    <input
                      className="mt-2 me-1 form-check-input"
                      type="checkbox"
                      name="remember"
                    />
                    <label className="mt-1 form-check-label">記住我</label>
                  </div>
                </div>
              </li>
              <li className="mt-4 d-flex justify-content-center">
                <button className="btn btn-primary text-white loginBtn">
                  登入
                </button>
              </li>
              {/* 第三方登入，沒有功能 */}
              <li className="mt-3">其他登入方式</li>
              <li className="d-flex jjustify-content-evenly">
                <a href="https://www.facebook.com/">
                  <BsFacebook className="mx-2 fbLogin" />
                </a>
                <a href="https://accounts.google.com/signin/v2/identifier?hl=zh-TW&passive=true&continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dgoogle%25E7%2599%25BB%25E5%2585%25A5%26oq%3Dgoogle%25E7%2599%25BB%25E5%2585%25A5%26aqs%3Dchrome..69i57.7639j0j1%26sourceid%3Dchrome%26ie%3DUTF-8&ec=GAZAAQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
                  <FcGoogle className="mx-2 googleLogin" />
                </a>
              </li>
              <li>{/* <GoogleLoginFunwave /> */}</li>
              <Modal showModal={showModal} setshowModal={setshowModal} />
            </ul>
          </Form>
        </div>
      </div>
    </>
  );
}
export default Login;
