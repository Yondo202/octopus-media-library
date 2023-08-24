import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

let array = [0, 5, 10];
// let slice = 3

const PublicImage = ({ page }) => {
  const [photos, setPhotos] = useState({});
  const fetch = async () => {
    const token = {
      headers: {
        Authorization: `563492ad6f91700001000001e555f8233a7245d59bc1d48f59e167fc`,
      },
    };
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=apple`,
        token
      );
      console.log(res, "---------->");
      setPhotos(res.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <div className="public_head">
        <div className="type_select">
          <select>
            <option>Зураг</option>
            <option>Видео</option>
          </select>
        </div>
        <div className="search">
          <input type="search" />
        </div>
      </div>
      <div className={`${!page && `main`}`}>
        <div className="public_body">
          {array.map((el, index) => {
            return (
              <div className="columns" key={index}>
                {photos?.photos?.slice(el, el + 5).map((item, ind) => {
                  return (
                    <div key={ind} className="image_box">
                      <img className="img" src={item?.src?.medium} alt={item.photographer} />
                    </div>
                  );
                })}
              </div>
            );
          })}
          {}
        </div>
      </div>
    </Container>
  );
};

export default PublicImage;

const Container = styled.div`
    // height:100%;
    // overflow-y:scroll;
    .public_head{
      padding 15px 40px;
    }
    .public_body{
      padding: 50px 40px;
      padding-top:30px;
      display:flex;
      gap:28px;
      .columns{
        width:34%;
        display:flex;
        flex-direction:column;
        gap:28px;
        .image_box{
          cursor:pointer;
          .img{
            width:100%;
            border-radius:10px;
          }
        }
      }
    }
`;
