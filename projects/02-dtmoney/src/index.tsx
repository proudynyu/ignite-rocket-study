import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model.extend({} as TransactionsProps),
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Seed",
          value: 200,
          category: "Seeder",
          transactionType: "deposit",
          createdAt: new Date("2021-02-12 09:00:00"),
        },
        {
          id: 2,
          title: "Seed2",
          value: 200,
          category: "Seeder",
          transactionType: "deposit",
          createdAt: new Date("2021-02-14 09:00:00"),
        },
        {
          id: 3,
          title: "Seed3",
          value: 200,
          category: "Seeder",
          transactionType: "withdraw",
          createdAt: new Date("2021-02-15 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", (schema) => {
      return schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
