import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

class Page404 extends React.Component {
  render() {
    return (
      <div className="text-center">
        <h1 className="display-1 font-weight-bold">404</h1>
        <p className="h1">Vui lòng đăng nhập trước khi vào trang Web!</p>
        <Link to="/auth/sign-in">
          <Button color="primary" size="lg">
            Quay lại trang đăng nhập
          </Button>
        </Link>
      </div>
    );
  }
}

export default Page404;
