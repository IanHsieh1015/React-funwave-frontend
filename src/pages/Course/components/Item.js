import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Item = ({ msg, date }) => {
  return (
    <div>
      {/* 留言 */}

      <>
        <div className="row border m-auto mt-3">
          {/* 第一排抬頭 */}
          <div className="d-flex flex-wrap">
            <div className="mt-2 align-self-center">
              {/* 大頭照  */}
              <img
                className="rounded-circle"
                src="https://picsum.photos/id/237/50/50"
                alt=""
                height="50px"
                weight="50px"
              />
            </div>

            {/* 名稱 */}
            <div className="m-3 align-self-center">頭號奈粉</div>

            {/* 星星 */}
            <div className="align-self-center">
              <div className="d-flex">
                <AiFillStar size={20} color="#ff7f6a" />
                <AiFillStar size={20} color="#ff7f6a" />
                <AiFillStar size={20} color="#ff7f6a" />
                <AiFillStar size={20} color="#ff7f6a" />
                <AiOutlineStar size={20} color="#ff7f6a" />
              </div>
            </div>

            <div className=" align-self-center ms-auto">
              <div className="date-4 ">{date}</div>
              {/* <button className="date-4 ">刪除</button> */}
            </div>
          </div>
          {/* 第二排 */}
          <div className="m-3">
            {/* 文字 */}
            <p>{msg}</p>

            {/* 圖片區  */}
            <div className="mt-3 d-flex justify-space-around">
              <img
                src="https://picsum.photos/id/237/50/50"
                className="rounded-3 m-1"
                alt=""
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default Item;