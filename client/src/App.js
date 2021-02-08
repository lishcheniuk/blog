import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "./routes";
import { Navbar } from "./components/Navbar";
import { autoLogin } from "./store/actions/auth.action";
import { Message } from "./components/Message";

function App() {
  const dispatch = useDispatch();
  const { token, message } = useSelector((state) => state.auth);
  const routes = useRouter(token);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(autoLogin(token));
  }, [dispatch]);

  return (
    <div className="App" style={{ marginLeft: showMenu && "25%" }}>	
      <Message message={message} />
      <Navbar
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(!showMenu)}
        isToken={token}
      />
      <div className="container">{routes}</div>
    </div>
  );
}

export default App;
