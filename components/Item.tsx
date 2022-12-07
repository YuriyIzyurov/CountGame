import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


const Item = ({children, number, position}) => {

    return (
        <div
            css={css`
            display: table;
        `}>
            {children}
            <div
                css={css`
                  position: absolute;
                  top: 30px;
                  left: 37px;
                  color: white;
                  padding-left: .2em;
                  font-size: 65px;
                  z-index: 1;
                  &:before {
                  content: attr(data-text);
                  position: absolute;
                  left: 0;
                  right: 0;
                  padding-left: .2em;
                  -webkit-text-stroke: .17em #242546;
                  z-index: -1;
                  }
                `}
                data-text={number}>{number}</div>
        </div>
    );
};

export default Item;