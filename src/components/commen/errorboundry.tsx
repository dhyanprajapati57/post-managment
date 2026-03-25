import { Component, type ReactNode } from "react";


interface Props {
  children: ReactNode;
}

// State interface: tracks whether an error has occurred
interface State {
  hasError: boolean;
}


class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Initialize state: no error initially
    this.state = { hasError: false };
  }

  // This lifecycle method is called when a child component throws an error
  static getDerivedStateFromError() {
    // Update state so the next render shows fallback UI
    return { hasError: true };
  }

  render() {
    // If an error occurred, show fallback UI
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
     //children render otherwise
    return this.props.children;
  }
}

export default ErrorBoundary;