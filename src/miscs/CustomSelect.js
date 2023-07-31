import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Svg from './svg';

const CustomSelect = () => {
   const handleClickOutside = (e) => {
      if (
         !e.target.classList.contains('select_option') &&
         !e.target.classList.contains('selected_text') &&
         !e.target.classList.contains('custom_svg')
      ) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      setIsOpen(false);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const [isOpen, setIsOpen] = useState(false);
   return (
      <SelectStyle>
         <div onClick={() => setIsOpen(true)} className={`select_input ${isOpen ? `active` : ``}`}>
            <span>select text</span> <Svg name="downarrow" color="lightTextColor" />
         </div>
         {isOpen && (
            <div className="select_option">
               <div className="selected_text">
                  <span>firt text</span>
                  <Svg className="custom_svg" size="13px" name="downarrow" color="lightTextColor" />
               </div>
            </div>
         )}
      </SelectStyle>
   );
};

export default CustomSelect;

const SelectStyle = styled.div`
   width: 250px;
   position: relative;
   user-select: none;
   .select_option {
      position: absolute;
      margin-top: 3px;
      top: 100%;
      left: 0;
      width: 100%;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid ${(props) => props.theme.sectionBorderColor};
      background: ${(props) => props.theme.boxBackground};
      .selected_text {
         padding: 10px;
         cursor: pointer;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .custom_svg {
         }
         &:hover {
            background: ${(props) => props.theme.lightMainColor};
         }
      }
   }
   .select_input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.sectionBorderColor};
      padding: 10px 16px;
      background: ${(props) => props.theme.boxBackground};
      color: ${(props) => props.theme.textColor};
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      box-sizing: border-box;
      font-size: 13px;
   }
   .active {
      border: 2px solid ${(props) => props.theme.mainColor};
      color: ${(props) => props.theme.lightTextColor};
   }
`;
