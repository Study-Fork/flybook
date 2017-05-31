import React from "react";

import Layout from "../components/layout";

const App = ({ title, toc, contents }) => (
  <Layout className="wrap container-fluid" title={title} toc={toc}>
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  </Layout>
);

module.exports = App;