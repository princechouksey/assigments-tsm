import React, { Component } from 'react';

class DataFetcher extends Component {
  // 1. First to run: Initialize state
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isLoading: true,
      time: 0,
    };
    console.log('CONSTRUCTOR: Component is being created.');
  }

  // 3. Runs AFTER the component is rendered to the DOM
  componentDidMount() {
    console.log('COMPONENT DID MOUNT: Component is now on the screen.');
    this.fetchPostData();

    // Example of setting up something that needs cleanup
    this.timerID = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  }

  // 4. Runs whenever props or state change
  componentDidUpdate(prevProps, prevState) {
    console.log('COMPONENT DID UPDATE: Component has been updated.');
    // IMPORTANT: Always compare props to prevent infinite loops!
    if (this.props.postId !== prevProps.postId) {
      console.log(`Post ID changed from ${prevProps.postId} to ${this.props.postId}. Re-fetching data.`);
      this.fetchPostData();
    }
  }

  // 5. Runs right before the component is removed from the DOM
  componentWillUnmount() {
    console.log('COMPONENT WILL UNMOUNT: Cleaning up before component is removed.');
    // Cleanup: Stop the timer to prevent memory leaks
    clearInterval(this.timerID);
  }

  // Helper function to simulate fetching data
  fetchPostData = () => {
    this.setState({ isLoading: true });
    // Simulate a network request
    setTimeout(() => {
      this.setState({
        post: `Here is the data for post #${this.props.postId}`,
        isLoading: false,
      });
      console.log('Data has been "fetched".');
    }, 1500); // 1.5 second delay
  };

  // 2. Runs after constructor, describes the UI
  render() {
    console.log('RENDER: Creating the component UI.');
    const { isLoading, post, time } = this.state;

    if (isLoading) {
      return <div>Loading data for post #{this.props.postId}...</div>;
    }

    return (
      <div>
        <h1>{post}</h1>
        <p>Component has been visible for {time} seconds.</p>
      </div>
    );
  }
}

export default DataFetcher;