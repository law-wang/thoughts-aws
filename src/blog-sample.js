// import { DataStore } from '@aws-amplify/datastore';
// import { Blog } from './models';

// await DataStore.save(
//     new Blog({
// 		"name": "Lorem ipsum dolor sit amet",
// 		"posts": []
// 	})
// );

// /* Models in DataStore are immutable. To update a record you must use the copyOf function
//  to apply updates to the item’s fields rather than mutating the instance directly */
//  await DataStore.save(Blog.copyOf(CURRENT_ITEM, item => {
//     // Update the values on {item} variable to update DataStore entry
// }));

// const modelToDelete = await DataStore.query(Blog, 123456789);
// DataStore.delete(modelToDelete);

// const models = await DataStore.query(Blog);
// console.log(models);