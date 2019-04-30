import React from 'react'

import { Typography, Checkbox, Button, Icon, Tag, Tooltip, Input } from 'antd';

const { Paragraph } = Typography;



const TodoItem = ({
    todo,
    idx,
    saveInputRef,
    onCompletion,
    onRemove,
    onRemoveTag,
    showNewTagInput,
    onChange,
    toggleTheme,
    handleNewTagInputChange,
    handleNewTagInputConfirm
}) => {
    const {
        isComplete,
        title,
        newTagInputValue,
        newTagInputVisible,
        tags,
        delBtnTheme } = todo
    return (
        <div className='todo-item'>
            <div className='todo-header'>
                <Checkbox disabled={title === ''} onChange={onCompletion(idx)} checked={isComplete} />
                <div className="todo-title-wrapper">
                    <Paragraph
                        delete={isComplete}
                        editable={{ onChange: str => { onChange(idx, 'title')(str) } }}
                    >
                        {title}
                    </Paragraph>
                </div>
                <Button type='danger' shape='circle' onMouseEnter={toggleTheme(idx, 'del', 'filled')} onMouseLeave={toggleTheme(idx, 'del', '')} onClick={onRemove(idx)}><Icon type='delete' theme={delBtnTheme} /></Button>
            </div>
            <div className="todo-main">

                {tags.map((tag, idxTag) => {
                    const isLongTag = tag.length > 15;
                    const tagElem = (
                        <Tag
                            key={tag.id}
                            closable={true}
                            onClose={onRemoveTag(idx, idxTag)}
                        >
                            {isLongTag ? `${tag.value.slice(0, 15)}...` : tag.value}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag.value} key={tag.value}>{tagElem}</Tooltip> : tagElem;
                })}
                {newTagInputVisible && (
                    <Input
                        ref={saveInputRef}
                        type='text'
                        size='small'
                        style={{ width: 78 }}
                        value={newTagInputValue }
                        onChange={handleNewTagInputChange(idx)}
                        onBlur={handleNewTagInputConfirm(idx, newTagInputValue)}
                        onPressEnter={handleNewTagInputConfirm(idx, newTagInputValue)}
                    />

                )}
                {!newTagInputVisible && (
                    <Tag
                        onClick={showNewTagInput(idx)}
                        style={{ background: '#fff', borderstyle: 'dashed' }}
                    >
                        <Icon type='plus' />New Tag
                    </Tag>
                )}
            </div>
        </div>
    )
}

export default TodoItem;