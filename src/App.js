import React, {Component} from 'react';
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: '',
            item: [],
            btn:'submit',
            updateId:-1
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        if (this.state.updateId>=0)
        {
            this.state.item[this.state.updateId]=this.state.todo;
            this.setState({
                updateId:-1,
                todo:'',
                btn:'submit'
            })
        }
       else
        {
            this.setState(prevState => (
                {
                    item: [...prevState.item, this.state.todo],
                    todo: ''
                }
            ))
            // console.log(this.state.item)
            return this.state.item;
        }
    }
    removeItem = (val) => {
        this.setState({
            item: this.state.item.filter((it) => {
                return it !== val
            }),
            todo:''
        })
    }
    editItem =(val,index)=>
    {
        this.setState({
            todo:val,
            btn:'update',
            updateId:index
        })
        this.nameInput.focus()
    }

    render() {
        return (
            <div className={"App"}>
                <form onSubmit={this.handleClick}>
                    <input type="text" value={this.state.todo} autoFocus
                           ref={(input) => { this.nameInput = input; }}
                           onChange={(e) => this.setState({todo: e.target.value})}/>
                    <button type={"submit"}>{this.state.btn}</button>
                    {
                        this.state.item.map((it, index) => {
                            if (it !== "") {
                                return <div key={index}>
                                    <p>{it}
                                        <button type={"button"} style={{marginLeft: '50px'}} onClick={() => this.removeItem(it)}>X
                                        </button>
                                        <button type={"button"} style={{marginLeft: '30px'}}
                                                onClick={() => this.editItem(it, index)}>edit
                                        </button>
                                    </p>
                                </div>
                            }
                        })
                    }
                </form>
            </div>
        );
    }
}

export default App;
