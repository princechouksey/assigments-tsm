import React, {Component} from "react";

class ClassComp extends Component{
    constructor(props){
        super(props)
        this.state = {
            count : 0,
        }

    }
    incrementCount  = ()=>{
        this.setState ({
            count : this.state.count +1
        })
    }
    render(){
        return (
        <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.incrementCount}>Click me</button>
      </div>
        )
    }
}
export default ClassComp;

