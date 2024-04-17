import mssql from "mssql";
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

const sqlQuery = await inquirer.prompt({
  name: "user",
  type: "input",
  message: chalk.yellow("Enter your SQL Query"),
  prefix:""
});

const config = {
  user: "sa",
  password: "sap123",
  server: "MUBEEN-LENOVO-V",
  database: "SBODemo",
  // port: 1433,
  options: { encrypt: false },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 15000,
  },
};

async function connectAndQuery() {
  try {
    const pool = await mssql.connect(config);

    const result = await pool.request().query(sqlQuery.user);
    const spinner = createSpinner(
      `Connecting to ${config.database} SQL Database`
    ).start();

    setTimeout(() => {
      spinner.success();
    }, 2000);

    setTimeout(() => {
      console.log(chalk.green("Connected to SQL Server"));
    }, 2000);

    setTimeout(() => {
      console.log("Query results:", result.recordset);
    }, 3000);
  } catch (err) {
    console.error(chalk.red("Error:", err));
  }
}

connectAndQuery();
