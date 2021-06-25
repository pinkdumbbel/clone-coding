import styled from '@emotion/styled';

export const FileCheck = styled.div`
    width: 100%;
    height: 50px;

    & button{
        margin-bottom: 12px;
        width: 49%;
        color: #fff;
        background-color: #4a154b;
        border: none;
        font-size: 18px;
        font-weight: 900;
        height: 44px;
        min-width: 96px;
        padding: 0 16px 3px;
        transition: all 80ms linear;
        user-select: none;
        outline: none;
        cursor: pointer;
        border-radius: 4px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        &:hover {
            background-color: rgba(74, 21, 75, 0.9);
            border: none;
        }
        &:focus {
            --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
            box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
        }

        &:last-child{
            margin-left:5px;
        }
    }
`

export const FileList = styled.ul`
    text-align: left;
`