export default class Product {
  barcode: string;
  name: string;
  imgSmallUrl: string;
  imgUrl: string;
  carboHydrates: number;
  protein: number;
  fat: number;
  energyKj: number;
  energyKCal: number;
  vitaminA: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB6: number;
  vitaminB9: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminPP: number;

  /**
   *
   */
  constructor(
    barcode: string,
    name: string,
    imgSmallUrl: string,
    imgUrl: string,
    carboHydrates: number,
    protein: number,
    fat: number,
    energyKj: number,
    energyKCal: number,
    vitaminA: number,
    vitaminB1: number,
    vitaminB2: number,
    vitaminB6: number,
    vitaminB9: number,
    vitaminC: number,
    vitaminD: number,
    vitaminE: number,
    vitaminK: number,
    vitaminPP: number
  ) {
    this.barcode = barcode;
    this.name = name;
    this.imgSmallUrl = imgSmallUrl;
    this.imgUrl = imgUrl;
    this.carboHydrates = carboHydrates;
    this.protein = protein;
    this.fat = fat;
    this.energyKj = energyKj;
    this.energyKCal = energyKCal;
    this.vitaminA = vitaminA;
    this.vitaminB1 = vitaminB1;
    this.vitaminB2 = vitaminB2;
    this.vitaminB6 = vitaminB6;
    this.vitaminB9 = vitaminB9;
    this.vitaminC = vitaminC;
    this.vitaminD = vitaminD;
    this.vitaminE = vitaminE;
    this.vitaminK = vitaminK;
    this.vitaminPP = vitaminPP;
  }

  public static fromJson(json: any): Product {
    return new Product(
      json["barcode"],
      json["name"],
      json["imgSmallUrl"],
      json["imgUrl"],
      json["carboHydrates"],
      json["protein"],
      json["fat"],
      json["energyKj"],
      json["energyKCal"],
      json["vitaminA"],
      json["vitaminB1"],
      json["vitaminB2"],
      json["vitaminB6"],
      json["vitaminB9"],
      json["vitaminC"],
      json["vitaminD"],
      json["vitaminE"],
      json["vitaminK"],
      json["vitaminPP"]
    );
  }
}
