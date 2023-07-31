import styled from 'styled-components'
import React from 'react'

const svgs = {
    add: (color, size) => <SvgStyled color={color} xmlns="http://www.w3.org/2000/svg" width={size ?? "1rem"} height={size ?? "1rem"} fill="none" viewBox="0 0 24 24"><path d="M24 13.604a.3.3 0 0 1-.3.3h-9.795V23.7a.3.3 0 0 1-.3.3h-3.21a.3.3 0 0 1-.3-.3v-9.795H.3a.3.3 0 0 1-.3-.3v-3.21a.3.3 0 0 1 .3-.3h9.795V.3a.3.3 0 0 1 .3-.3h3.21a.3.3 0 0 1 .3.3v9.795H23.7a.3.3 0 0 1 .3.3v3.21Z"></path></SvgStyled>,
    close: (color, size) => <SvgStyled color={color} stroke="currentColor" viewBox="0 0 1024 1024" width={size ?? "1rem"} height={size ?? "1rem"} xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></SvgStyled>,
    prev: (color, size) => <SvgStyled color={color} viewBox="64 64 896 896" focusable="false" data-icon="left" width={size ?? "1rem"} height={size ?? "1rem"} aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></SvgStyled>,
    next: (color, size) => <SvgStyled color={color} viewBox="64 64 896 896" focusable="false" data-icon="right" width={size ?? "1rem"} height={size ?? "1rem"} aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></SvgStyled>,
    folder: (color, size) => <SvgStyled color={color} stroke="currentColor" viewBox="0 0 1024 1024" width={size ?? "1rem"} height={size ?? "1rem"} xmlns="http://www.w3.org/2000/svg"><path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z"></path></SvgStyled>,
    check: (color, size) => <SvgStyled color={color} stroke={color ?? `currentColor`} viewBox="0 0 16 16" width={size ?? "1rem"} height={size ?? "1rem"} xmlns="http://www.w3.org/2000/svg"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></SvgStyled>,
    edit: (color, size) => <SvgStyled color={color} stroke="currentColor" viewBox="0 0 24 24" width={size ?? "1rem"} height={size ?? "1rem"} xmlns="http://www.w3.org/2000/svg"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></SvgStyled>,
    grid: (color, size) => <SvgStyled color={color} xmlns="http://www.w3.org/2000/svg" width={size ?? "1rem"} height={size ?? "1rem"} fill="none" viewBox="0 0 12 12" aria-hidden="true"><path d="M.67 5.33h4a.67.67 0 0 0 .66-.66v-4A.67.67 0 0 0 4.67 0h-4A.67.67 0 0 0 0 .67v4a.67.67 0 0 0 .67.66Zm6.66 0h4a.67.67 0 0 0 .67-.66v-4a.67.67 0 0 0-.67-.67h-4a.67.67 0 0 0-.66.67v4a.67.67 0 0 0 .66.66ZM.67 12h4a.67.67 0 0 0 .66-.67v-4a.67.67 0 0 0-.66-.66h-4a.67.67 0 0 0-.67.66v4a.67.67 0 0 0 .67.67Zm6.66 0h4a.67.67 0 0 0 .67-.67v-4a.67.67 0 0 0-.67-.66h-4a.67.67 0 0 0-.66.66v4a.67.67 0 0 0 .66.67Z"></path></SvgStyled>,
    setting: (color, size) => <SvgStyled color={color} stroke="currentColor" viewBox="0 0 1024 1024" width={size ?? "1rem"} height={size ?? "1rem"} xmlns="http://www.w3.org/2000/svg"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"></path></SvgStyled>,
    search: (color, size) => <SvgStyled color={color} xmlns="http://www.w3.org/2000/svg" width={size ?? "1rem"} height={size ?? "1rem"} fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="m23.813 20.163-5.3-5.367a9.792 9.792 0 0 0 1.312-4.867C19.825 4.455 15.375 0 9.913 0 4.45 0 0 4.455 0 9.929c0 5.473 4.45 9.928 9.912 9.928a9.757 9.757 0 0 0 5.007-1.4l5.275 5.35a.634.634 0 0 0 .913 0l2.706-2.737a.641.641 0 0 0 0-.907ZM9.91 3.867c3.338 0 6.05 2.718 6.05 6.061s-2.712 6.061-6.05 6.061c-3.337 0-6.05-2.718-6.05-6.06 0-3.344 2.713-6.062 6.05-6.062Z"></path></SvgStyled>,
    list: (color, size) => <SvgStyled color={color} xmlns="http://www.w3.org/2000/svg" width={size ?? "1rem"} height={size ?? "1rem"} fill="none" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="m2.4.1.1-.1h9.4l.1.1v2.2l-.1.1H2.5l-.1-.1V.1ZM0 4.9l.1-.1h9.4l.1.1v2.2l-.1.1H.1L0 7.1V4.9Zm2.5 4.7-.1.1v2.2l.1.1h9.4l.1-.1V9.7l-.1-.1H2.5Z"></path></SvgStyled>,
    downarrow:(color, size, className) => <SvgStyled className={className} color={color} xmlns="http://www.w3.org/2000/svg" width={size ?? "1rem"} height={size ?? "1rem"} fill="none" viewBox="0 0 14 8"><path className={className} fill="#32324D" fillRule="evenodd" d="M14 .889a.86.86 0 0 1-.26.625L7.615 7.736A.834.834 0 0 1 7 8a.834.834 0 0 1-.615-.264L.26 1.514A.861.861 0 0 1 0 .889c0-.24.087-.45.26-.625A.834.834 0 0 1 .875 0h12.25c.237 0 .442.088.615.264a.86.86 0 0 1 .26.625Z" clipRule="evenodd"></path></SvgStyled>
}

const svg = ({ name, color, size, className }) => {
    return(
        svgs[name](color, size, className)
    )
}


export default svg

const SvgStyled = styled.svg`
   path{
    color:${props=>props.color ? props.theme[props.color] ?? props.color : props.theme.mainColor};
    fill:${props=>props.color ? props.theme[props.color] ?? props.color : props.theme.mainColor};
   }
`
