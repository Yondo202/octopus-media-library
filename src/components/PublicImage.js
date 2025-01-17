import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useLoad } from "../context/MediaCtx";
import MediaPlayer from "./MediaPlayer";
import Svg from "../miscs/svg";

const toColumns = (photos, columns) => {
  photos = photos?.reverse();
  let response = [];
  for (let i = 0, l = photos?.length; i < l; i++) {
    let j = i % columns;
    response[j] = response[j] || [];
    response[j].push(photos[i]);
  }
  return response;
};

const PublicImage = ({ Header, headerProps, setImage, page, type }) => {
  const { useLoading } = useLoad();
  const [photos, setPhotos] = useState({});
  const [videos, setVideos] = useState({});
  const [searchVal, setSearchVal] = useState({ type: "image", input: null });
  const [size, setSize] = React.useState(30);

  const fetch = async (props) => {
    useLoading(true);
    const token = {
      headers: {
        Authorization: `563492ad6f91700001000001e555f8233a7245d59bc1d48f59e167fc`,
      },
    };
    try {
      if (props.type === "image") {
        const res = await axios.get(
          `https://api.pexels.com/v1/search?query=${props.input}&per_page=${size}&page=1`,
          token
        );
        setPhotos({
          ...res.data,
          photos: toColumns(res.data?.photos, page ? 6 : 5),
        });
      } else {
        //video search
        const res = await axios.get(
          `https://api.pexels.com/videos/search?query=${props.input}&per_page=${size}&page=1`,
          token
        );
        setVideos({ ...res.data, videos: toColumns(res.data?.videos, 5) });
        // setVideos(res.data);
      }
    } catch (err) {
      // console.log(err, "err");
      return
    } finally {
      useLoading(false);
    }
  };

  useEffect(() => {
    setSearchVal({ type: type, input: null });
  }, [type]);

  // "https://api.pexels.com/v1/search/?page=2&per_page=16&query=human"

  useEffect(() => {
    if (searchVal.input === "" || searchVal.input === null) {
      fetch({ type: searchVal.type, input: "design" });
    } else {
      fetch(searchVal);
    }
  }, [searchVal.type, size]);

  const searchHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(searchVal);
  };

  const onChangeHandle = (e) => {
    setSearchVal((prev) => ({ ...prev, input: e.target.value }));
    if (e.target.value === "" || searchVal.input === null) {
      fetch({ type: searchVal.type, input: "design" });
    }
  };

  const SVG = ({ name }) => <Svg name={name} color="#666687" size="1.3rem" />;

  const PublicHeader = () => {
    const input = useRef();
    useEffect(() => {
      if (searchVal.input !== null) {
        input.current?.focus();
      }
    }, [searchVal.input]);

    return (
      <PublicHeadStyle>
        <div className="handle_header">
          <div className="type_select">
            {searchVal.type === "video" ? (
              <SVG name="image_holder" />
            ) : (
              <SVG name="video" />
            )}
            <span className="type_text">
              {searchVal.type === "video" ? `Видео` : `Зураг`}
            </span>
            <div className="select_par">
              <div
                onClick={() =>
                  setSearchVal((prev) => ({ ...prev, type: "image" }))
                }
                className="items"
              >
                <SVG name="image_holder" />{" "}
                <span className="text_item">Зураг</span>
              </div>
              <div
                onClick={() =>
                  setSearchVal((prev) => ({ ...prev, type: "video" }))
                }
                className="items"
              >
                <SVG name="video" /> <span className="text_item">Видео</span>
              </div>
            </div>
          </div>

          <form onSubmit={searchHandle} className="search">
            <input
              ref={input}
              value={searchVal.input ?? ""}
              onChange={onChangeHandle}
              required
              type="search"
              placeholder="Зураг хайх..."
            />
            <div className="search_svg">
              <Svg name="search" color="#666687" size="1rem" />
            </div>
          </form>
        </div>
      </PublicHeadStyle>
    );
  };

  const selectImageHandle = (item) => {
    setImage?.({
      alt: item.alt,
      title: item.alt,
      name: item.alt,
      url: item?.src.original ?? item?.src.medium,
    });
  };

  return (
    <>
      <Header {...headerProps} Render={PublicHeader} />
      <Container>
        <div className={`${!headerProps.page && `main`}`}>
          <div className="public_body">
            {searchVal.type === "video"
              ? videos?.videos?.map((item, index) => {
                  return (
                    <div className="columns" key={index}>
                      {item.map((el, ind) => {
                        return (
                          <MediaPlayer
                            setImage={setImage}
                            key={ind}
                            data={el}
                          />
                        );
                      })}
                    </div>
                  );
                })
              : photos?.photos?.map((item, index) => {
                  return (
                    <div className="columns" key={index}>
                      {item.map((el, ind) => {
                        return (
                          <div
                            onClick={() => selectImageHandle(el)}
                            key={ind}
                            className="image_box"
                          >
                            <img
                              loading="lazy"
                              className="img"
                              src={el?.src?.medium}
                              alt={el.photographer}
                            />
                            <div className="ghost_div">
                              {/* <div className="download_img">
                                <Svg color="#000" name="download" />
                              </div> */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
          </div>
          {size < 100 && (
            <StyledButton
              onClick={() => setSize((prev) => (prev > 100 ? prev : prev + 30))}
            >
              <button>Цааш үзэх</button>
            </StyledButton>
          )}
        </div>
      </Container>
    </>
  );
};

export default PublicImage;

const StyledButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  button {
    border: 1px solid ${(props) => props.theme.sectionBorderColor};
    padding: 12px 0px;
    border-radius: 10px;
    width: 300px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: ${(props) => props.theme.mainColor};
    }
  }
`;

const animate = keyframes`
    0% { transform:scale(0.8); opacity:0;  }
    100% { transform:scale(1); opacity:1; }
`;

const PublicHeadStyle = styled.div`
  // padding 0px 40px;

  .handle_header {
    display: flex;
    background-color: ${(props) => props.theme.bodyBackground};
    width: fit-content;
    border-radius: 8px;
    padding: 0px 0px;
    .type_select {
      display: flex;
      align-items: center;
      padding: 1px 25px;
      gap: 10px;
      cursor: pointer;
      position: relative;
      border: 1px solid ${(props) => props.theme.bodyBackground};
      border-radius: 8px;
      .select_par {
        position: absolute;
        top: 105%;
        width: 100%;
        left: 0;
        border: 1px solid ${(props) => props.theme.sectionBorderColor};
        border-radius: 8px;
        padding: 10px 0px;
        z-index: 100;
        box-shadow: 1px 1px 10px -5px;
        display: none;
        background-color: ${(props) => props.theme.bodyBackground};
        .items {
          display: flex;
          padding: 10px;
          gap: 10px;
          align-items: center;
          color: ${(props) => props.theme.lightTextColor};
          .text_item {
            color: ${(props) => props.theme.lightTextColor};
          }
          svg {
            fill: ${(props) => props.theme.lightTextColor};
            color: ${(props) => props.theme.lightTextColor};
          }
          &:hover {
            background-color: ${(props) => props.theme.bodyBackground};
          }
        }
      }
      border: 1px solid ${(props) => props.theme.sectionBorderColor};
      &:hover {
        .type_text {
          color: ${(props) => props.theme.mainColor};
        }
        .select_par {
          display: block;
        }
      }
    }
    .search {
      border-left: 1px solid ${(props) => props.theme.sectionBorderColor};
      padding-left: 10px;
      display: flex;
      input {
        padding: 12px 10px;
        border: none;
        background-color: ${(props) => props.theme.bgHover};
        // outline:none;
        width: 300px;
        &:hover {
          background-color: ${(props) => props.theme.lightMainColor};
        }
      }
      .search_svg {
        outline: none;
        border: none;
        cursor: pointer;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 10px;
        border-left: 1px solid ${(props) => props.theme.sectionBorderColor};
      }
    }
  }
`;

const Container = styled.div`
  color: ${(props) => props.theme.lightTextColor};
  .main {
    max-height: 530px !important;
  }
  .public_body {
    padding: 50px 40px;
    padding-top: 30px;
    display: flex;
    gap: 28px;
    .columns {
      width: 25%;
      display: flex;
      flex-direction: column;
      gap: 28px;
      .image_box {
        cursor: pointer;
        animation: ${animate} 0.15s ease;
        position: relative;
        .ghost_div {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 98%;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          border-radius: 8px;
          .download_img {
            background-color: #fff;
            display: flex;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
            margin-right: 10px;
            display: none;
          }
        }
        .img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          transition: all 0.3s ease;
          transform: scale(1);
        }
        &:hover {
          .ghost_div {
            background-color: rgba(0, 0, 0, 0.2);
            .download_img {
              display: block;
            }
          }
          .img {
            // transform:scale(1.1)
          }
        }
      }
    }
  }
`;
