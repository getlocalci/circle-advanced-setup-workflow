/**
 * External dependencies
 */
import { getDocument, queries } from 'pptr-testing-library';

/**
 * WordPress dependencies
 */
import { visitAdminPage } from '@wordpress/e2e-test-utils';

describe('example', () => {
  it('can create new post', async () => {
    await visitAdminPage('post-new.php');
    await queries.findAllByText(await getDocument(page), /publish/i);
  });
});
