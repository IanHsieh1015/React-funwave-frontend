// 使用套件
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AuthContext } from './context/auth';
import { FavContext } from './context/fav';
import './App.scss';
// import './styles/global.scss';
import axios from 'axios';
import { API_URL } from './utils/config';
import { ERR_MSG } from './utils/error';

// 頁面用元件(路由組件)
//首頁
import Home from './pages/Home/Home';
//scss示範頁
import HomeTry from './pages/HomeTry/';

//資訊
import Information from './pages/Information/Information';
import InformationDetails from './pages/Information/InformationDetails';

//會員
import LogIn from './pages/Members/MemberLogin/LogIn';
import Member from './pages/Members/Member';
import MemberOrder from './pages/Members/MemberOrder';
import MemberOrderDetails from './pages/Members/MemberOrderDetails';
import MemberCollect from './pages/Members/MemberCollect';
import MemberCoupon from './pages/Members/MemberCoupon';
import MemberInfo from './pages/Members/MemberInfo';
import MemberMessage from './pages/Members/MemberMessage';
import MemberPoint from './pages/Members/MemberPoint';
import MemberShoppingGold from './pages/Members/MemberShoppingGold';
import MemberCourseOrder from './pages/Members/MemberCourseOrder';
import MemberCourseOrderDetails from './pages/Members/MemberCourseOrderDetails';
//課程

import CourseCart from './pages/Course/CourseCart';
import CourseCart01 from './pages/Course/CourseCart01';
import CourseCart02 from './pages/Course/CourseCart02';
import CourseCart03 from './pages/Course/CourseCart03';
import CourseContent from './pages/Course/CourseContent';
import CourseEvaluate from './pages/Course/components/CourseEvaluate';
import Courses from './pages/Course/Courses';

//商城
import ProductDetails from './pages/Products/ProductDetails';
import Products from './pages/Products/Products';
//購物車
import ProductCart01 from './pages/Products/Cart/ProductCart01';
import ProductCart02 from './pages/Products/Cart/ProductCart02';
import ProductCart03 from './pages/Products/Cart/ProductCart03';
//收藏
import Collect from './pages/Products/Collect';

//客製化浪板
import Customized from './pages/Customized/Customized';
import CustomizedDetails from './pages/Customized/CustomizedDetails';
//浪點
import SurfSpot from './pages/SurfSpot/SurfSpot';
// import SurfSpotDetails from './pages/SurfSpot/SurfSpotDetails';

// 組合用元件(一般組件)
// import Breadcrumb from './components/Breadcrumb';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
// import MainContent from './components/MainContent';
// import SideBar from './components/SideBar';
import NotFound from './components/NotFound';
import FavoriteStar from './components/FavoriteStar';

function App() {
  const [auth, setAuth] = useState(null);
  const [fav, setFav] = useState({
    // status: false,
    wishID: [],
  });
  // 初始化就要抓localStorage裡有加入收藏的wishID
  useEffect(() => {
    let wishProduct = JSON.parse(localStorage.getItem('likeID')) || [];
    setFav({ ...fav, wishID: wishProduct });
  }, []);

  // console.log('App2', auth);
  useEffect(() => {
    const checklogIn = async () => {
      try {
        let response = await axios.get(`${API_URL}/auth/checklogin`, {
          withCredentials: true,
        });
        setAuth(response.data);
        console.log('App', auth);
      } catch (e) {
        console.error({ ERR_MSG });
      }
    };
    if (!auth) {
      checklogIn();
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <FavContext.Provider value={{ fav, setFav }}>
          {/* <div className="routesApp"> */}
          <Header />
          <ScrollToTop />
          {/* <Breadcrumb /> */}
          <FavoriteStar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/home-try" element={<HomeTry />} /> */}
            <Route path="/information" element={<><Information /><Footer /></>}></Route>
            <Route path="/information" element={<><InformationDetails /><Footer /></>}>
              <Route path=":info_no" element={<><InformationDetails /><Footer /></>}></Route>
            </Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="/surfspot" element={<><SurfSpot /><Footer /></>} />
            <Route path="/products/:product_group" element={<><ProductDetails /><Footer /></>}>
              <Route path=":product_id" element={<><ProductDetails /><Footer /></>} />
            </Route>
            <Route path="/products" element={<><Products /><Footer /></>}>
              <Route path=":currentPage" element={<><Products /><Footer /></>} />
            </Route>
            <Route path="/product-cart01" element={<><ProductCart01 /><Footer /></>} />
            <Route path="/product-cart02" element={<><ProductCart02 /><Footer /></>} />
            <Route path="/product-cart03" element={<><ProductCart03 /><Footer /></>} />
            <Route path="/collect" element={<><Collect /><Footer /></>} />
            <Route
              path="/customized/customized-details"
              element={<><CustomizedDetails /><Footer /></>}
            />
            <Route path="/customized" element={<><Customized /><Footer /></>} />
            <Route
              path="/member/member-courseorder/:id"
              element={<><MemberCourseOrderDetails /><Footer /></>}
            />
            <Route
              path="/member/member-order/:order_id"
              element={<><MemberOrderDetails /><Footer /></>}
            />
            <Route
              path="/member/member-shopping-gold"
              element={<><MemberShoppingGold /><Footer /></>}
            />
            <Route
              path="/member/member-courseorder"
              element={<><MemberCourseOrder /><Footer /></>}
            />
            <Route path="/member/member-collect" element={<MemberCollect />} />
            <Route path="/member/member-message" element={<MemberMessage />} />
            <Route path="/member/member-coupon" element={<MemberCoupon />} />
            <Route path="/member/member-point" element={<MemberPoint />} />
            <Route path="/member/member-info" element={<MemberInfo />} />
            <Route path="/member/member-order" element={<MemberOrder />} />
            <Route path="/member" element={<Member />} />
            <Route path="/course" element={<><Courses /><Footer /></>} />
            <Route path="/course/course-content" element={<><CourseContent /><Footer /></>} />
            <Route path="/course/course-cart01" element={<><CourseCart01 /><Footer /></>} />
            <Route path="/course/course-cart02" element={<><CourseCart02 /><Footer /></>} />
            <Route path="/course/course-cart03" element={<><CourseCart03 /><Footer /></>} />
            <Route path="/course/course-cart" element={<><CourseCart /><Footer /></>} />
            <Route path="/course/course-evaluate" element={<><CourseEvaluate /><Footer /></>}>
              <Route path=":currentPage" element={<><CourseEvaluate /><Footer /></>} />
            </Route>
            <Route path="*" element={<><NotFound /><Footer /></>} />
          </Routes>

            {/* <div className="footerApp"> */}
              {/* <Footer  /> */}
            {/* </div>
        </div> */}
        </FavContext.Provider>
      </AuthContext.Provider>
      {/* <Footer /> */}
      {/* 試著把footer換位置，看會不會就不會露白，但還是露白 */}
    </>
  );
}

export default App;
