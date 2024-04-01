# ESDTimez PC Building Service.

## This is the Frontend Customer Facing Side .

### Description

This is the Customer Facing UI where the customers can do the following:

1. Login via Google
2. Handle the entire flow for `Build a PC`
   - Pick parts
   - Add to cart
   - Checkout & Payment
3. View Cart
4. View Past Order
5. Recommendation System (Requires past orders)

### Instructions

1. Delete `node_modules` and `package-lock.json` if they are still there.
2. Run `npm install` to install reinstall the node modules and package-lock file.
3. Run `npm run dev`
4. After running, right click the page & click on `inspect` to bring up the developer tools
5. Go to the `application` tab -> `storage` section -> `Local Storage` -> `http://localhost:517X` (Depends if you started Customer/Employee UI first)
6. Ensure that there is no `AUTH_KEY`, else right click & delete it.
7. When you go to the Login page, you should be able to see the sign-in plugin from Google.

### Contributors

- ALEXANDER LUK WEI HENG
- CLARISSA KOH SHI QI
- GERARD EMMANUEL LOH KAI-JYN
- LOH YEE XUN GABRIEL
- NASHWYN SINGH SANGAH
- SHYAN CHAM
