// const puppeteer = require('puppeteer');
// const cheerio = require("cheerio");
// const { MongoClient } = require("mongodb");
// const levenshteinModule = await import("levenshtein-edit-distance");
// const levenshtein = levenshteinModule.default;

import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { MongoClient } from 'mongodb';
import stringSimilarity from 'string-similarity';

const PAGE_URL = 'https://www.amazon.com/s?k=core+i5-14400f+desktop+processor+10+cores+%286+p-cores+%2B+4+e-cores%29+up+to+4.7+ghz&i=computers&crid=2JG9MREWEXQU9&sprefix=%2Ccomputers%2C352&ref=nb_sb_ss_recent_2_0_recent';
const SEARCH_STRING = "core i5-14400f desktop processor 10 cores (6 p-cores + 4 e-cores) up to 4.7 ghz";

function calculateSimilarity(str1, str2) {
  return stringSimilarity.compareTwoStrings(str1, str2);
}

async function connectToMongoDB() {
    const uri = "mongodb://localhost:27017/scraperDB";
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      return client;
    } catch (e) {
      console.error("Connection to MongoDB failed", e);
    }
  }

async function saveToMongoDB(client, products) {
    
    if (!client) {
      console.log("Could not connect to MongoDB, skipping save");
      return;
    }
    
    try {
      const database = client.db("RAW");
      const collection = database.collection("RAW");
      
      const result = await collection.insertMany(products);
      console.log(`${result.insertedCount} items inserted`);
    } catch (e) {
      console.error("Error inserting items", e);
    } 
  }
  
async function saveSearchAndAverage(client, search, averagePrice) {
    const database = client.db("PROCESSED");
    const collection = database.collection("PROCESSED");
    
    const result = await collection.insertOne({
      search,
      averagePrice
    });
    
    console.log(`Search and average price saved with id: ${result.insertedId}`);
  }
  

const main = async () => {
    const client = await connectToMongoDB();
    if (!client) {
      console.log("Could not connect to MongoDB, exiting.");
      return;
    }
    
    let browser;
    
    try {
      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
  
      await page.goto(PAGE_URL);
  
      const html = await page.content();
      const $ = cheerio.load(html);
      const products = [];
  
      $('.s-result-item').each((i, element) => {
        const titleElement = $(element).find('h2 .a-link-normal.a-text-normal');
        const priceElement = $(element).find('.a-price-whole');
  
        const title = titleElement.text().trim();
        const priceStr = priceElement.text().trim().replace(/[,$]/g, '');
        const price = priceStr ? parseFloat(priceStr) : null;
  
        if (title && price !== null) {
          products.push({
            title,
            price,
            priceInDollarFormat: `$${price.toFixed(2)}`,
          });
        }
      });
      
     
      products.forEach(product => {
        product.similarity = calculateSimilarity(product.title, SEARCH_STRING);
      });
      const sortedProducts = products.sort((a, b) => a.similarity - b.similarity);
      
    
      const topProducts = sortedProducts.slice(0, 5);
      console.log("Top Products to Insert:", topProducts); 
      await saveToMongoDB(client, topProducts);
  
      const averagePrice = topProducts.reduce((sum, product) => sum + product.price, 0) / topProducts.length;
      console.log("Search String and Average Price to Insert:", { search: SEARCH_STRING, averagePrice });
      if (!client) {
        console.log("Could not connect to MongoDB, exiting.");
        return;
      }
      await saveSearchAndAverage(client, SEARCH_STRING, averagePrice);
    } catch (e) {
      console.error("An error occurred during scraping and saving data", e);
    } finally {
      if (browser) {
        await browser.close();
      }
      await client.close();
    }
  };
  
  main();
  