import { getData } from './sbadptr.js';
import { insertDataFromJSON } from './sbadptr.js';
export async function getPostData(req, res, next) {
  try {
    res.json(await getData());
  } catch (error) {
    next(err);
  }
}

export async function postData(req, res, next) {
  try {
    res.json(await insertDataFromJSON(req));
  } catch (error) {
    next(err);
  }
}