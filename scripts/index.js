/**
 * This is the main script for the front end of the framework. 
 * 
 * Since most of the actually scripting should be in the themes,
 * this script is for support / helping themes 
 */

import 'babel-polyfill';
import { baseURL, getPosts } from './helpers.js'

module.exports = {
  baseURL: baseURL,
  getPosts: getPosts
}