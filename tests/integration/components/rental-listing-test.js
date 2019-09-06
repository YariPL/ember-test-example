import Service from '@ember/service';

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

/* Ember components are commonly tested with component integration tests.
Component integration tests verify the behavior of a component within the context of
Ember's rendering engine. When running in an integration test, the component goes through
its regular render lifecycle, and has access to dependent objects, loaded through Ember's resolver. */


let StubMapsService = Service.extend({
  getMapElement() {
    return Promise.resolve(document.createElement('div'));
  }
});

module('Integration | Component | rental-listing', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:map-element', StubMapsService);
    // fake object to test
    this.rental = EmberObject.create({
      image: 'fake.png',
      title: 'test-title',
      owner: 'test-owner',
      type: 'test-type',
      city: 'test-city',
      bedrooms: 3
    });
  });


  test('should display rental details', async function (assert) {
    // render fake object
    await render(hbs`<RentalListing @rental={{this.rental}} />`);
    assert.equal(this.element.querySelector('.listing h3').textContent.trim(), 'test-title', 'Title: test-title');
    assert.equal(this.element.querySelector('.listing .owner').textContent.trim(), 'Owner: test-owner', 'Owner: test-owner');
  });

  test('should toggle wide class on click', async function (assert) {
    await render(hbs`<RentalListing @rental={{this.rental}} />`);
    // not wide
    assert.notOk(this.element.querySelector('.image.wide'), 'initially rendered small');
    await click('.image');
    // wide
    assert.ok(this.element.querySelector('.image.wide'), 'rendered wide after click');
    await click('.image');
    // not wide
    assert.notOk(this.element.querySelector('.image.wide'), 'rendered small after second click');
  });

});
