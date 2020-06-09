import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../_actions/user_actions";
import { LoadingOutlined } from "@ant-design/icons";

function LandingPage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  if (userState.info.isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
      </div>
    );
  } else if (userState.info.isAuth) {
    return (
      <div>
        <h1> True</h1>
      </div>
    );
  } else if (!userState.info.isAuth) {
    return (
      <div>
        <h1> False</h1>
      </div>
    );
  }
}

export default LandingPage;
