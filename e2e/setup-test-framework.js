/**
 * Forked from Gutenberg, with only minor changes.
 *
 * @see https://github.com/WordPress/gutenberg/blob/df2b096185818f89b2c1668d22a848990acb2799/packages/e2e-tests/config/setup-test-framework.js
 */

/**
 * WordPress dependencies
 */
import {
  enablePageDialogAccept,
  setBrowserViewport,
} from '@wordpress/e2e-test-utils';

/**
 * Timeout, in seconds, that the test should be allowed to run.
 *
 * @type {string|undefined}
 */
const PUPPETEER_TIMEOUT = process.env.PUPPETEER_TIMEOUT;

// The Jest timeout is increased because these tests are a bit slow
jest.setTimeout( PUPPETEER_TIMEOUT || 100000 );

async function setupBrowser() {
  await setBrowserViewport( 'large' );
}


// Before every test suite run, delete all content created by the test. This ensures
// other posts/comments/etc. aren't dirtying tests and tests don't depend on
// each other's side-effects.
beforeAll( async () => {
  capturePageEventsForTearDown();
  enablePageDialogAccept();
  await setupBrowser();
} );

afterEach( async () => {
  await setupBrowser();
} );

afterAll( async () => {
  removePageEvents();
} );
