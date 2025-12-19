import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mantine/core";
import ContentEditable from "react-contenteditable";
import {focusBlock, getCaretOffsetInElement, hasSelection} from "@/utility/utility";

const initBlock = {
    id: "b1",
    html: "<b>Hello <i>World</i></b>",
    tag: "p",
    flag: 0,
};

const Block = () => {
    const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [blocks, setBlocks] = useState([initBlock]);

    const handleChange = (value: string, index: number) => {
        setBlocks((prevState) => {
            const next = [...prevState];
            next[index] = {
                ...next[index],
                html: value,
            };
            return next;
        });
    };
    const addBlockAfter= (index : number) =>{
        setBlocks((prev) => {
            const next = [...prev];
            const newBlock = {
                id: `b`+ Math.random() * Math.random(),
                html: "",
                tag: "p",
                flag: 0,
            };
            next.splice(index + 1, 0, newBlock);
            return next;
        });
    }
    const deleteBlockCurr = (index : number) => {
        setBlocks((prev) => {
            const next = [...prev];
            next.splice(index,1);
            return next;
        });
    }
    const deleteBlockCurrPushToPrevEl = (index: number) => {
        setBlocks((prev) => {
            if (index <= 0) return prev;
            const next = prev.map((b) => ({ ...b }));
            const curr = next[index];
            const prevBlock = next[index - 1];

            if (curr.html && curr.html.trim() !== "") {
                prevBlock.html = prevBlock.html + curr.html;
            }

            next.splice(index, 1);
            return next;
        });
    };

    const handleKeyDown = (event:React.KeyboardEvent<HTMLDivElement> , index : number) => {
        if(event.key === 'Enter'){
            if (event.shiftKey) {
                return;
            }
            event.preventDefault();
            addBlockAfter(index);
            return setTimeout(() => {focusBlock(index + 1 , blockRefs);}, 0);
        }
        if(event.key === 'Backspace' && blocks[index].html === '' && blocks.length > 1){
            event.preventDefault();
            deleteBlockCurr(index);
            return setTimeout(() => {focusBlock(index - 1, blockRefs);}, 0);
        }
        if(event.key === 'Backspace'){
            if (hasSelection()) return;
            const el = blockRefs.current[index];
            const offset = getCaretOffsetInElement(el!);
            if(offset === 0) {
                event.preventDefault();
                deleteBlockCurrPushToPrevEl(index);
                return setTimeout(() => {
                    const el = blockRefs.current[index - 1];
                    if (!el) return;
                    el.focus();
                    const range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);

                    const sel = window.getSelection();
                    sel?.removeAllRanges();
                    sel?.addRange(range);}, 0);
            }
            return ;
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (index < blocks.length - 1) focusBlock(index + 1, blockRefs);
            return;
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (index > 0) focusBlock(index - 1, blockRefs);
            return;
        }
    }

    return (
        <Container>
            {blocks.map(({ id, html, tag, flag }, index) => (
                <div key={id} style={{ marginBottom: 8 }}>
                    <ContentEditable
                        className={'editable focus:outline-none'}
                        placeholder={`${index === blocks.length -1 ? '내용을 입력하세요..' : ''}`}
                        html={html}
                        onChange={(event) => {
                            const value = event.currentTarget.innerHTML;
                            handleChange(value, index);
                        }}
                        onKeyDown={(e:React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, index)}
                        innerRef={(el: HTMLDivElement) => {
                            blockRefs.current[index] = el;
                        }}
                    />
                </div>
            ))}
        </Container>
    );
};

export default Block;
