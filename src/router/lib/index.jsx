import routes from "@/router";
import LayoutView from "@/layout/App.jsx";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./index.scss";

const buildRouter = ({ path, Component, children }, key) => {
  if (children) {
    return children.map((item, index) => {
      return buildRouter(item, `${key}_${index}`);
    });
  } else {
    return (
      <Route
        exact
        key={key}
        path={path}
        render={(props) => {
          return <Component {...props} />;
        }}
      ></Route>
    );
  }
};

const BuildRoutes = () => {
  let layoutRoutes = [];
  let noLayoutRoutes = [];
  routes.forEach(({ layout = "DEFAULT", ...item }, index) => {
    if (layout === "DEFAULT") {
      layoutRoutes.push(buildRouter(item, index));
    } else {
      noLayoutRoutes.push(buildRouter(item, index));
    }
  });
  return (
    <Switch>
      {noLayoutRoutes}
      <Route
        path="/"
        render={(props) => (
          <LayoutView
            {...props}
            routes={
              <Suspense fallback={<div className="loadBox"></div>}>
                <Switch>{layoutRoutes}</Switch>
              </Suspense>
            }
          />
        )}
      />
    </Switch>
  );
};

const RouterView = () => {
  return (
    <Router>
      <Suspense fallback={<div className="loadBox"></div>}>
        <BuildRoutes />
      </Suspense>
    </Router>
  );
};

export default RouterView;
