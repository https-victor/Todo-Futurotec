import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { Button, Icon, Input } from 'antd';

const Search = Input.Search;

class Todos extends Component {

  input = null

  state = {
    todos: [],
    searchText: '',
    addBtnTheme: 'filled'
  }

  render() {
    const { searchText, todos, addBtnTheme } = this.state;
    return (
      <div className='container'>
        <div className="header-container">
          <Button
            type='primary'
            size='small'
            onMouseEnter={this.onMouseEnter('add')}
            onMouseLeave={this.onMouseLeave('add')}
            onClick={this.onAdd}><Icon
              type='plus-circle'
              theme={addBtnTheme}
            />
            Add Task
          </Button>
          <Search
            placeholder='Search tags...'
            size='small'
            value={searchText}
            onChange={this.onSearch}
            allowClear
            enterButton
          />
        </div>
        <div className="todo-container">
          {
            todos.filter(item => item.tags.map(tag => tag.value).join().includes(searchText)).map((todo, index) =>
              <TodoItem
                todo={todo}
                idx={index}
                showNewTagInput={this.showNewTagInput}
                onRemove={this.onRemove}
                handleNewTagInputChange={this.handleNewTagInputChange}
                handleNewTagInputConfirm={this.handleNewTagInputConfirm}
                onEdit={this.onEdit}
                onCompletion={this.onCompletion}
                onRemoveTag={this.onRemoveTag}
                onChange={this.onChange}
                toggleTheme={this.toggleTheme}
                saveInputRef={this.saveInputRef}
              />)
          }
        </div>
      </div>
    )
  }

  onChange = (idx, field) => (str) => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos.slice(0, idx),
        { ...todos[idx], [field]: str },
        ...todos.slice(idx + 1)
      ]
    })

  }

  onSearch = (e) => {
    console.log(this)
    this.setState({ searchText: e.target.value });
  };

  onAdd = () => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos,
        {
          id: + new Date(),
          title: `Task ${todos.length + 1}`,
          isComplete: false,
          tags: [],
          newTagInputValue: '',
          newTagInputVisible: false,
          delBtnTheme: '',
        }
      ]
    })
  }

  onRemove = idx => () => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos.slice(0, idx),
        ...todos.slice(idx + 1)
      ]
    })
  }

  handleNewTagInputChange = (idx) => (e) => {
    const { todos } = this.state
    const { editedTodo } = todos[idx]

    this.setState({
      todos: [
        ...todos.slice(0, idx),
        {
          ...editedTodo,
          newTagInputValue: e.target.value
        },
        ...todos.slice(idx + 1)
      ]
    })
  }

  handleNewTagInputConfirm = (idx, newTagInputValue) => () => {
    const { todos } = this.state
    const { editedTodo } = todos[idx]
    const { tags } = editedTodo.tags

    (newTagInputValue && todos.tags.indexOf(newTagInputValue) === -1) && (this.setState({
        todos: [
          ...todos.slice(0, idx),
          {
            ...editedTodo,
            tags: [
              ...tags,
              {
                value: editedTodo.newTagInputValue,
                id: + new Date(),
                tagEditInputValue: '',
                tabEditInputVisible: false,
              }
            ]
          },
          ...todos.slice(idx + 1)
        ]
      })
    )
    this.setState({
      todos: [
        ...todos.slice(0, idx),
        {
          ...editedTodo,
          tags,
          newTagInputValue: '',
          newTagInputVisible: false,
        },
        ...todos.slice(idx + 1)
      ]
    })
  }

  showNewTagInput = (idx) => () => {
    const { todos } = this.state

    this.setState({
      todos: [
        ...todos.slice(0, idx),
        { ...todos[idx],
          newTagInputVisible: true
        },
        ...todos.slice(idx + 1)
      ]
    }/*,() => this.input.focus()*/)
  }

  onRemoveLabel = (idx, idxl) => () => {
    const { todos } = this.state;
    const edited = todos[idx]
    this.setState({
      todos: [
        ...todos.slice(0, idx),
        {
          ...edited,
          tags: [
            ...edited.tags.slice(0, idxl),
            ...edited.tags.slice(idxl + 1)
          ]
        },
        ...todos.slice(idx + 1)
      ]
    })
  }

  onCompletion = idx => () => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos.slice(0, idx),
        { ...todos[idx], isComplete: !todos[idx].isComplete },
        ...todos.slice(idx + 1)
      ]
    })
  }

  toggleTheme = (idx, field, theme) => () => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos.slice(0, idx),
        { ...todos[idx], [`${field}BtnTheme`]: theme },
        ...todos.slice(idx + 1)
      ]
    })
  }

  saveInputRef = input => this.input = input

  onMouseEnter = (field) => () => {
    this.setState({
      [`${field}BtnTheme`]: 'filled'
    })
  }

  onMouseLeave = (field) => () => {
    this.setState({
      [`${field}BtnTheme`]: ''
    })
  }

}


export default Todos;