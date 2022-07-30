import axios, { AxiosResponse } from "axios";
import Product from "../models/ProductModel";
import ConsumedProduct from "../models/ConsumedProductModel";

import * as SQLite from "expo-sqlite";

import { DATABASE_NAME } from "../constants/Names";
import { WebSQLDatabase } from "expo-sqlite";

export class FoodService {
  async getProduct(barcode: string): Promise<Product | null> {
    let result = await axios.get(
      "https://world.openfoodfacts.org/api/v2/product/" + barcode
    );

    if (result.status != 200) {
      return null;
    }

    let code: string | undefined = result.data["code"];

    if (code === undefined) return null;

    let product = result.data["product"];

    let name =
      product["product_name"] === undefined
        ? "PRODUCT HAS NO NAME REGISTERED"
        : product["product_name"];

    let imgSmallUrl =
      product["image_small_url"] === undefined
        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        : product["image_small_url"];

    let imgUrl =
      product["image_url"] === undefined
        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        : product["image_url"];

    let nutriments = product["nutriments"];

    let energyKj =
      nutriments["energy-kj_100g"] === undefined
        ? 0
        : nutriments["energy-kj_100g"];

    let energyKCal =
      nutriments["energy-kcal_100g"] === undefined
        ? 0
        : nutriments["energy-kcal_100g"];

    let carboHydrates =
      nutriments["carbohydrates_100g"] === undefined
        ? 0
        : nutriments["carbohydrates_100g"];

    let protein =
      nutriments["proteins_100g"] === undefined
        ? 0
        : nutriments["proteins_100g"];

    let fat = nutriments["fat_100g"] === undefined ? 0 : nutriments["fat_100g"];

    let vitaminA =
      nutriments["vitamin-a_100g"] === undefined
        ? 0
        : nutriments["vitamin-a_100g"];

    let vitaminB1 =
      nutriments["vitamin-b1_100g"] === undefined
        ? 0
        : nutriments["vitamin-b1_100g"];

    let vitaminB2 =
      nutriments["vitamin-b2_100g"] === undefined
        ? 0
        : nutriments["vitamin-b2_100g"];

    let vitaminB6 =
      nutriments["vitamin-b6_100g"] === undefined
        ? 0
        : nutriments["vitamin-b6_100g"];

    let vitaminB9 =
      nutriments["vitamin-b9_100g"] === undefined
        ? 0
        : nutriments["vitamin-b9_100g"];

    let vitaminC =
      nutriments["vitamin-c_100g"] === undefined
        ? 0
        : nutriments["vitamin-c_100g"];

    let vitaminD =
      nutriments["vitamin-d_100g"] === undefined
        ? 0
        : nutriments["vitamin-d_100g"];

    let vitaminE =
      nutriments["vitamin-e_100g"] === undefined
        ? 0
        : nutriments["vitamin-e_100g"];

    let vitaminK =
      nutriments["vitamin-k_100g"] === undefined
        ? 0
        : nutriments["vitamin-k_100g"];

    let vitaminPP =
      nutriments["vitamin-pp_100g"] === undefined
        ? 0
        : nutriments["vitamin-pp_100g"];

    let finalProduct = new Product(
      barcode,
      name,
      imgSmallUrl,
      imgUrl,
      carboHydrates,
      protein,
      fat,
      energyKj,
      energyKCal,
      vitaminA,
      vitaminB1,
      vitaminB2,
      vitaminB6,
      vitaminB9,
      vitaminC,
      vitaminD,
      vitaminE,
      vitaminK,
      vitaminPP
    );

    return finalProduct;
  }

  initDatabase(): WebSQLDatabase {
    // this.dropDatabase();

    const db = SQLite.openDatabase(DATABASE_NAME);
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "products(" +
          "barcode TEXT," +
          "name TEXT," +
          "img_small_url TEXT," +
          "img_url TEXT" +
          "carbo_hydrates REAL," +
          "protein REAL," +
          "fat REAL," +
          "energy_kj REAL," +
          "energy_kcal REAL)",
        []
      );

      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "consumed_products(" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "quantity NUMBER," +
          "meal_type VARCHAR(50)," +
          "product_barcode VARCHAR(20)," +
          "consumed_at NUMBER)",
        []
      );
    });

    return db;
  }

  async getConsumedProducts(callback: (result: ConsumedProduct[]) => void) {
    const db = this.initDatabase();

    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM consumed_products",
        [],
        async (_tx, result) => {
          let len = result.rows.length;
          let products: ConsumedProduct[] = [];

          if (len > 0) {
            console.log(len + " consumed products retrieved");

            for (let i = 0; i < result.rows._array.length; i++) {
              console.log("Products loaded");
              console.log(result.rows.item(i));

              const element = result.rows.item(i);

              let productBarcode = element["product_barcode"];

              let product: Product | null = await this.getProduct(
                productBarcode
              );

              const consumedProduct = new ConsumedProduct(
                element["quantity"],
                element["meal_type"],
                element["product_barcode"],
                element["consumed_at"],
                element["id"],
                product!
              );

              console.log("product pushed");
              console.log(consumedProduct);

              products.push(consumedProduct);
            }
          } else {
            console.log("The consumed products list is empty");
            console.log(result.rows._array);
          }

          callback.call(this, products);
        },
        (error) => {
          console.log(
            "An error ocurred while trying to retrieve data from the local database!"
          );
          console.log(error);

          return false;
        }
      );
    });
  }

  dropDatabase() {
    const db = SQLite.openDatabase(DATABASE_NAME);

    db.transaction((txn) => {
      txn.executeSql("DROP TABLE IF EXISTS products");
      txn.executeSql("DROP TABLE IF EXISTS consumed_products");
    });
  }

  saveProduct(product: ConsumedProduct, callback: (result: number) => void) {
    if (product === null || product === undefined) {
      throw new Error("product is null or undefined");
    }

    let db = this.initDatabase();

    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO consumed_products(quantity, meal_type, product_barcode, consumed_at) VALUES (?,?,?,?)",
        [
          product.quantity,
          product.mealType,
          product.productBarcode,
          product.consumedAt,
        ],
        (tx, results) => {
          console.log("Result : " + results.rowsAffected);

          if (results.rowsAffected > 0) {
            console.log("More than one row affected!");

            if (results.insertId != undefined) {
              callback.call(this, results.insertId!);
            } else {
              callback.call(this, 0);
            }
          } else {
            console.log("Product save failed");
            callback.call(this, 0);
          }
        },
        (tx, error) => {
          console.log("An error occurred : " + error);
          callback.call(this, 0);
          return false;
        }
      );
    });
  }
}
