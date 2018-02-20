"use strict";
const DEBUG = require("debug")("gcapi:lib:mongo-client");
const MongoClient = require("mongodb").MongoClient;
const ASSERT = require("assert");
const mongoUrl = "mongodb://localhost:27017/gcdb";
const ObjectId = require("mongodb").ObjectID;

module.exports = class Mongo {
	constructor () {}

	checkConnection () {
		return MongoClient.connect(mongoUrl).then((err, db) => {
			ASSERT.equal(null, err);
			DEBUG(`Connected to MongoDB: ${mongoUrl}\n`);
			db.close();
			return { success: true, message : "" };
		}).catch((err) => {
			DEBUG(`Could not connect to MongoDB: ${err}\n`);
			return { success:false, message: err };
		});
	}

	/**
	 * getAll returns an array of documents on success,
	 * @param  {string} collection name of collection to retrieve
	 * @param  {object} filter filter object for query
	 * @param  {callback} onSuccess function to call on success
	 * @param  {callback} onError function to call on error
	 */
	query (collection, filter, onSuccess, onError) {
		MongoClient.connect(mongoUrl).then((db) => {
			query(db, collection, filter, (docs) => {
				db.close();
				onSuccess(docs);
			});
		}).catch((err) => {
			DEBUG(err);
			onError(err);
		});
	}

	/**
	 * Inserts an array of objects into the specified collection.
	 * @param  {string} collection The string name of the collection to persist to
	 * @param  {object[]} documents The array of objects to persist
	 * @param  {callback} onSuccess function to call on success
	 * @param  {callback} onError function to call on error
	 */
	insert (collection, documents, onSuccess, onError) {
		MongoClient.connect(mongoUrl).then((db) => {
			documents.forEach((element) => {
				let id = new ObjectId();
				element._id = id.toHexString();
				DEBUG(element);
			});
			insertDocuments(db, collection, documents, (result) => {
				db.close();
				onSuccess(result);
			});
		}).catch((err) => {
			DEBUG(err);
			onError(err);
		});
	}

	/**
	 * Updates an object in the specified collection.
	 * @param  {string} collection The string name of the collection to persist to
	 * @param  {object} doc a single object to update
	 * @param  {callback} onSuccess function to call on success
	 * @param  {callback} onError function to call on error
	 */
	update (collection, doc, onSuccess, onError) {
		MongoClient.connect(mongoUrl).then((db) => {
			updateDocument(db, collection, doc, (result) => {
				db.close();
				onSuccess(result);
			});
		}).catch((err) => {
			DEBUG(err);
			onError(err);
		});
	}

	/**
	 * Deletes an object by Id in the specified collection.
	 * @param  {string} collection The string name of the collection to persist to
	 * @param  {string} id the id of the object to be deleted
	 * @param  {callback} onSuccess function to call on success
	 * @param  {callback} onError function to call on error
	 */
	delete (collection, id, onSuccess, onError) {
		MongoClient.connect(mongoUrl).then((db) => {
			deleteDocument(db, collection, id, (result) => {
				db.close();
				onSuccess(result);
			});
		}).catch((err) => {
			DEBUG(err);
			onError(err);
		});
	}
};

/**
 *
 * Searches for objects based on the filter perameter in the specified collection.
 * @param db {string} collection The string name of the collection to persist to
 * @param collection {string} collection The string name of the collection to persist to
 * @param filter {object}  filter object for query
 * @param callback {callback} onSuccess function to call on success
 * @memberof Mongo
 */
function query (db, collection, filter, callback) {
	let coll = db.collection(collection);
	coll.find(filter).sort({id: 1}).toArray((err, docs) => {
		ASSERT.equal(null, err);
		DEBUG(`Found ${docs.length} in '${collection}' with filter ${JSON.stringify(filter)}`);
		callback(docs);
	});
}

/**
 *
 * @param db {string} collection The string name of the collection to persist to
 * @param collection {string} collection The string name of the collection to persist to
 * @param docs {objects}  objects to insert
 * @param callback {callback} onSuccess function to call on success
 * @memberof Mongo
 */
function insertDocuments (db, collection, docs, callback) {
	let coll = db.collection(collection);
	coll.insertMany(docs, (err, result) => {
		ASSERT.equal(null, err);
		ASSERT.equal(docs.length, result.result.n);
		ASSERT.equal(docs.length, result.ops.length);
		DEBUG(`Inserted ${result.result.n} ${(result.result.n==1) ? 'document' : 'documents'} into '${collection}'`);
		callback(result);
	});
}

/**
 *
 * @param db {string} collection The string name of the collection to persist to
 * @param collection {string} collection The string name of the collection to persist to
 * @param doc {object} doc a single object to update
 * @param callback {callback} onSuccess function to call on success
 * @memberof Mongo
 */
function updateDocument (db, collection, doc, callback) {
	let coll = db.collection(collection);
	let filter = { id: doc.id };
	coll.replaceOne(filter, doc, (err, result) => {
		ASSERT.equal(null, err);
		DEBUG(`Updated ${result.result.n} ${(result.result.n==1) ? 'document' : 'documents'} in '${collection}'`);
		callback(result);
	});
}

/**
 *
 * @param db {string} collection The string name of the collection to persist to
 * @param collection {string} collection The string name of the collection to persist to
 * @param id {string} id the id of the object to be deleted
 * @param callback {callback} onSuccess function to call on success
 * @memberof Mongo
 */
function deleteDocument (db, collection, id, callback) {
	let coll = db.collection(collection);
	coll.deleteOne({ _id: id }, (err, result) => {
		ASSERT.equal(null, err);
		DEBUG(`Deleted ${result.result.n} ${(result.result.n==1) ? 'document' : 'documents'} from '${collection}'`);
		callback(result);
	});
}