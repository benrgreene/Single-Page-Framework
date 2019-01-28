/**
 * This is the main script for the front end of the framework. 
 * 
 * Since most of the actually scripting should be in the themes,
 * this script is for support / helping themes 
 */

import 'babel-polyfill';
import { getPosts } from './fetches.js'
import { 
  registeredShortcodes, 
  registerShortcode, 
  processShortcodes, 
  processShortcode 
} from './helpers.js'

module.exports = {  
  getPosts: getPosts,
  registeredShortcodes: registeredShortcodes,
  registerShortcode: registerShortcode,
  processShortcodes: processShortcodes,
  processShortcode: processShortcode
}