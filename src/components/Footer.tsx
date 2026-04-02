import { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Hazem</p>
        <p>Lab 1</p>
      </footer>
    );
  }
}

export default Footer;
