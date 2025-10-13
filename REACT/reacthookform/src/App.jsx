import React from "react";
import RegistrationForm from "./RegistrationForm";
import DataFetcher from "./DataFetcher";
import ClassComp from "./ClassComp";
import FetchProducts from "./FetchProducts";
import ChildtoParent from "./ChildtoParent";
import CombinedEventHandlers from "./CombinedEventHandlers";
import Carts from "./Carts";
import Memoization from "./Memoization";

import CallBack from "./CallBack";
import ErrorBoundries from "./ErrorBoundries";
import ErrorBoundary from "./errors";
import Portals from "./Portals";

const App = () => {
  return (
    <div className="w-full h-full ">
      {/* <RegistrationForm /> */}
      {/* <DataFetcher /> */}
      {/* <ClassComp /> */}
      {/* <FetchProducts /> */}
      {/* <ChildtoParent /> */}
      {/* <CombinedEventHandlers /> */}
      {/* <Carts /> */}
      {/* <Memoization /> */}
      {/* <CallBack /> */}

      {/* <ErrorBoundary>
        <ErrorBoundries />
      </ErrorBoundary> */}

      <Portals />
    </div>
  );
};

export default App;
