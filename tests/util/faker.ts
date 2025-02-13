import { faker } from "@faker-js/faker";

interface Product {
  title: string;
  description: string;
  image: string;
  regular_price: number;
  sale_price: number;
  sku: string;
  barcode: string;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
}

export const generateProduct = (): Product => {
  const regular_price = faker.number.float({
    min: 10,
    max: 500,
    fractionDigits: 2,
  });
  const sale_price = faker.number.float({
    min: 5,
    max: regular_price,
    fractionDigits: 2,
  });

  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    regular_price,
    sale_price,
    sku: faker.string.alphanumeric(10),
    barcode: faker.string.numeric(12),
    weight: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }),
    dimensions: {
      height: faker.number.float({ min: 5, max: 50, fractionDigits: 1 }),
      width: faker.number.float({ min: 5, max: 50, fractionDigits: 1 }),
      length: faker.number.float({ min: 5, max: 50, fractionDigits: 1 }),
    },
  };
};

console.log(generateProduct());
