import { DataStore } from '@aws-amplify/datastore';
import { Post } from './models';

await DataStore.save(
    new Post({
		"title": "Lorem ipsum dolor sit amet",
		"blogID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
		"postDate": "1970-01-01T12:30:23.999Z"
	})
);

/* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */
 await DataStore.save(Post.copyOf(CURRENT_ITEM, item => {
    // Update the values on {item} variable to update DataStore entry
}));

const modelToDelete = await DataStore.query(Post, 123456789);
DataStore.delete(modelToDelete);

const models = await DataStore.query(Post);
console.log(models);