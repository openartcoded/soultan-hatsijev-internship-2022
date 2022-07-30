import * as SQLite from "expo-sqlite";
import { WebSQLDatabase } from "expo-sqlite";

import { DATABASE_NAME } from "../constants/Names";

import User from "../models/UserModel";

export default class UserService {
  initDatabase(): WebSQLDatabase {
    // this.dropDatabase();

    const db = SQLite.openDatabase(DATABASE_NAME);

    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "users(" +
          "first_name TEXT," +
          "last_name TEXT," +
          "goal INTEGER)",
        []
      );
    });

    return db;
  }

  dropDatabase() {
    const db = SQLite.openDatabase(DATABASE_NAME);

    db.transaction((txn) => {
      txn.executeSql("DROP TABLE IF EXISTS users");
    });
  }

  getUser(callback: (result: User | undefined) => void) {
    const db = this.initDatabase();

    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM users", [], (tx, result) => {
        let len = result.rows.length;

        let user: User | undefined = undefined;

        if (len == 1) {
          const res = result.rows.item(0);

          user = new User(res["first_name"], res["last_name"], res["goal"]);

          console.log("User loaded from the database:");
          console.log(user);
        } else if (len > 1) {
          console.log("There is more than one user in the database!");
        } else {
          console.log("There is no users in the database ");
        }

        callback(user);
      });
    });
  }

  saveUser(user: User, callback: (result: boolean) => void) {
    const db = this.initDatabase();

    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM users", [], (txn, result) => {
        console.log("Retrieve item from database");
        console.log(result.rows._array);

        if (result.rows.length == 1) {
          console.log("updating user");
          console.log(user);

          txn.executeSql(
            "UPDATE users SET first_name=?, last_name=?, goal=?",
            [user.firstName, user.lastName, user.goal],
            (tx, rs) => {
              console.log(rs.rowsAffected);
              callback(rs.rowsAffected > 0);
            }
          );
        } else if (result.rows.length == 0) {
          console.log("creating user");
          console.log(user);

          txn.executeSql(
            "INSERT INTO users(first_name, last_name, goal) VALUES(?,?,?)",
            [user.firstName, user.lastName, user.goal],
            (txn, rs) => {
              callback(rs.rowsAffected > 0);
            }
          );
        } else {
          console.log("There is more than one user in the database!");
        }
      });
    });
  }
}
