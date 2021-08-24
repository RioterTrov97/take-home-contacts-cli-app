#!/usr/bin/node
'use strict';

// External libs
import prompt from 'prompt';

// Initialise the DB. Ignore 'never read' warnings
import db from './database/database.js';
import action, { ACTION_SHOW_MENU } from './controllers/controller.js';

try {
  /**
   * The self invoking main function for the application.
   */
  (async () => {
    // Start the user input utility
    prompt.start();

    // Clear the cli
    console.clear();

    // Show the initial menu
    action(ACTION_SHOW_MENU);
  })();
} catch (err) {
  // Handle global errors
  // Let the user know something broke
  console.error('Something went wrong:', err);

  // Let the shell know that something broke
  process.exit(-1);
}
