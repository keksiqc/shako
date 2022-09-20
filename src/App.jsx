import { useEffect, useState } from "react";

import User from "./components/User";
import LinkContainer from "./components/LinkContainer";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState();

  const userID = "527147599942385674";

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  if (!data) return null;

  return (
    <div className="h-full min-h-full text-center items-center justify-center">
      <User data={data} />
      <LinkContainer />
      <Footer />
    </div>
  );
}

export default App;
