import React, { Component } from "react";

import { Card } from "antd";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render = () => (
    <Card>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
        merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
        quo modo.
      </p>
    </Card>
  );
}

export default Welcome;
