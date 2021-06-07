import React from "react";
import GitHubButton from "react-github-btn";

const Navbar = () => (
  <nav>
    <h2>
      <a href="https://github.com/ishan-chhabra/use-screen-recorder">
        use-screen-recorder
      </a>
      <GitHubButton
        href="https://github.com/ishan-chhabra/use-screen-recorder"
        data-show-count="true"
        aria-label="Star ishan-chhabra/use-screen-recorder on GitHub"
      >
        Star
      </GitHubButton>
      <GitHubButton
        href="https://github.com/ishan-chhabra"
        data-show-count="true"
        aria-label="Follow @ishan-chhabra on GitHub"
      >
        Follow @ishan-chhabra
      </GitHubButton>
    </h2>
    <a href="https://ishanchhabra.com">
      <img src="https://ishanchhabra.com/logo.svg" />
    </a>
  </nav>
);

export default Navbar;
