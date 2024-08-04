# mt-task

## 0.1 initial commit setting up tsc and npm

## 0.2 classes, add item, return cart

## 0.3 adding a discount price and quantity counter to the Product

- The idea here is that when we add our item to our cart, we can compare the count of
  this product in our cart with the number required for a discount.

## 0.4 adding Map for key lookups

- Since dealing with many additions of the same key, better to use a map to get count of all products with same key

## 0.5 can remove items based on key

## 0.6 simple campaign offer based on current cart total

## 0.7 basic test cases - end time

### npm package - https://www.npmjs.com/package/mt-task-checkout-system

### My thoughts

My initial thought process was to make sure to adhere to the principles of OOP and benefiting from them by creating the Cart and Product classes in away that allows for encasulation, inheritance and abstraction.

In order to tackle the individual product offer (buying X or more of Y you get a discount of Z) I decided to attach the optional parameters qty and discount to each Product object in order to quickly check if any offer conditions were met on item addition (or broken on item removal).

By creating an array I could easily add/delete items, but when it came to counting the number of products that share the same key, I realized that it would not be so efficient, so I added an extra Map to do the counting.

I only added a simple campaign offer, which is customizable in a limited way (only 2 conditions -> price goal and discount offer) and could expand on this due to lack of time.

### Things I could do better:

- The final campaign discount is checked upon only when we call the checkCampaignDiscount() function. Ideally, this would run every time we add/remove an item to/from our cart, similarly to every checkout system online.
- Campaign offer is limited - could perhaps add a Date object and check for time offers (similar to limited time offers online, or food products about to go expired at the end of the day in a super market)
- Design -> Right now there is no frontend whatsoever. Just a few objects and some public functions to set and play with them. I tried to keep this as barebones as possible (better to get something bad looking working, than something fancy not doing the job), but I'm afraid it might be too barebones.
