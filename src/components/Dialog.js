import React from "react";
import {
  Root,
  Portal,
  Content,
  Overlay,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

const DialogCustom = ({
  children,
  open,
  padding,
  onCancel,
  title,
  width = 500,
  // drawer = false,
  // depth = 1,
}) => {
  return (
    //modal false ued select uud zugeer
    <Root
      open={open}
      onOpenChange={onCancel}
      // defaultOpen={defaultOpen}
      modal={true}
    >
      <Portal>
        <DialogOverlay />
        <DialogContent
          padding={padding}
          width={width}
          asChild
          // drawer={drawer ? drawer.toString() : null}
          // depth={depth}
        >
          {/* data-radix-focus-guard */}
          <div>
            <div className="dialog_head">
              <Title className="dialog_title">{title ?? ""}</Title>
              <Close asChild>
                <button className="IconButton">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </Close>
            </div>
            <div className="body_content">{children}</div>
          </div>
        </DialogContent>
      </Portal>
    </Root>
  );
};

export default DialogCustom;

const contentShow = keyframes`
    0% { opacity: 0; transform: translate(-50%, -50%) scale(1.035); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const contentShow2 = keyframes`
    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.020); }
`;

const zIndex = 1001;

const DialogOverlay = styled(Overlay)`
  background-color: ${(props) => props.theme.maskBackground};
  position: fixed;
  z-index: ${zIndex + 1};
  inset: 0;
`;

const DialogContent = styled(Content)`
  background-color: ${(props) => props.theme.boxBackground};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  z-index: ${zIndex + 2};
  width: ${(props) => `${props.width}px`};
  &[data-state="open"] {
    animation: ${contentShow} 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: ${contentShow2} 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:focus {
    outline: none;
  }
  .body_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${(props) => props.padding ?? `25px`};
    max-height: 96dvh;
    max-width: 90dwh;
    .main{
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      width:100%;
      scroll-behavior: smooth;
      position: relative;
      display: flex;
      flex-direction: column;
      max-height: 62dvh;
    }
    .footer {
      border-radius: 0px 0px 4px 4px;
      border-top: 1px solid ${(props) => props.theme.sectionBorderColor};
      background: ${(props) => props.theme.boxBackground};
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .addition {
        display: flex;
        gap: 20px;
        align-items: center;
      }
    }
  }
  .dialog_head {
    height: 47px;
    padding: 0px 25px;
    // padding: 18px 30px 10px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom: 1px solid ${(props) => props.theme.sectionBorderColor};
    .dialog_title {
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
      width: 100%;
      font-size: 13px;
      color: ${(props) => props.theme.textColor};
      font-weight: 500;
    }
    .IconButton {
      border: 1px solid ${(props) => props.theme.sectionBorderColor};
      cursor: pointer;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px;
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: ${(props) => props.theme.bgHover};
      svg {
        width: 16px;
        height: 16px;
        color: ${(props) => props.theme.lightTextColor};
      }
      &:hover {
        background-color: ${(props) => props.theme.bgHover};
        svg {
          color: ${(props) => props.theme.textColor};
        }
      }
    }
  }
`;
